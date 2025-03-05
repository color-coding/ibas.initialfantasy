package org.colorcoding.ibas.initialfantasy.service.rest;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.colorcoding.ibas.bobas.core.Daemon;
import org.colorcoding.ibas.bobas.core.IDaemonTask;
import org.colorcoding.ibas.bobas.core.InvalidDaemonTaskException;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

@Path("verify")
public class VerificationService {

	static {
		File folder = new File(MyConfiguration.getTempFolder(), "verify");
		if (!folder.isDirectory() || !folder.exists()) {
			folder.mkdirs();
		}
		WORK_FOLDER = folder.getPath();
		RESULTS = new ConcurrentHashMap<>(128);
		try {
			Daemon.register(new IDaemonTask() {

				@Override
				public void run() {
					Result result;
					long nowTime = DateTime.getNow().getTime();
					for (String key : RESULTS.keySet()) {
						result = RESULTS.get(key);
						// 大于3分钟的释放
						if (Math.abs(nowTime - result.time) / 1000 > 180) {
							// 清除结果
							RESULTS.remove(key);
						}
					}
				}

				@Override
				public boolean isActivated() {
					return true;
				}

				@Override
				public String getName() {
					return "clean verification results";
				}

				@Override
				public long getInterval() {
					return 300;
				}
			});
		} catch (InvalidDaemonTaskException e) {
			Logger.log(e);
		}
	}

	public final static String WORK_FOLDER;

	public final static Map<String, Result> RESULTS;

	public static boolean check(String key, Integer result) {
		if (!RESULTS.containsKey(key)) {
			return false;
		}
		Result value = RESULTS.get(key);
		if (value == null) {
			return false;
		}
		// 大于三分钟的无效
		if (Math.abs(DateTime.getNow().getTime() - value.time) / 1000 > 180) {
			// 清除结果
			RESULTS.remove(key);
			return false;
		}
		// 结果值不对无效
		if (Integer.compare(result, value.result) != 0) {
			value.errorCount += 1;
			// 错误次数过多
			if (value.errorCount >= 5) {
				RESULTS.remove(key);
			}
			return false;
		}
		// 匹配了,清除结果
		RESULTS.remove(key);
		return true;
	}

	@GET
	@Path("{image}")
	public void resource(@PathParam("image") @DefaultValue("") String resource, @Context HttpServletResponse response) {
		long nowTime = DateTime.getNow().getTime();
		if (RESULTS.containsKey(resource)) {
			Result result = RESULTS.get(resource);
			if (Math.abs((nowTime - result.time)) / 1000 > 180) {
				RESULTS.remove(resource);
				this.resource(resource, response);
			} else {
				File file = new File(WORK_FOLDER, result.name);
				if (file.isFile() && file.exists()) {
					try {
						// 设置内容类型
						response.setContentType(MediaType.APPLICATION_OCTET_STREAM);
						// 写入响应输出流
						OutputStream os = response.getOutputStream();
						try (FileInputStream inputStream = new FileInputStream(file)) {
							int bytesRead;
							byte[] buffer = new byte[1024];
							while ((bytesRead = inputStream.read(buffer)) != -1) {
								os.write(buffer, 0, bytesRead);
							}
							os.flush();
						}
					} catch (Exception e) {
						throw new WebApplicationException(e);
					}
				} else {
					RESULTS.remove(resource);
					this.resource(resource, response);
				}
			}
		} else {
			int value1 = random.nextInt(10) + 1;
			int value2 = random.nextInt(10) + 1;
			Operator operator = Operator.values()[random.nextInt(3)];
			int vResult = 0;
			if (operator == Operator.ADD) {
				vResult = value1 + value2;
			} else if (operator == Operator.MINUS) {
				if (value1 < value2) {
					operator = Operator.ADD;
					vResult = value1 + value2;
				} else {
					vResult = value1 - value2;
				}
			} else if (operator == Operator.MULTIPLY) {
				vResult = value1 * value2;
			}
			Result result = new Result();
			result.result = vResult;
			result.name = String.format("%s_%s_%s", operator, value1, value2);
			RESULTS.put(resource, result);
			File file = new File(WORK_FOLDER, result.name);
			// 文件存在超120分钟，则删除新建
			if (file.isFile() && file.canRead() && Math.abs((nowTime - result.time)) / 1000 / 60 > 120) {
				if (file.canWrite()) {
					file.delete();
				}
			}
			if (!file.exists()) {
				// 使用Java的Graphics2D生成算式图片
				BufferedImage image = new BufferedImage(WIDTH, HEIGHT, BufferedImage.TYPE_INT_RGB);
				Graphics2D gaphics = image.createGraphics();
				// 设置背景
				gaphics.setColor(getRandomLightColor());
				gaphics.fillRect(0, 0, WIDTH, HEIGHT);
				// 添加干扰元素
				addInterference(gaphics);
				// 绘制算式
				drawExpression(gaphics, String.format("%s %s %s = ?", value1, Operator.toSign(operator), value2));
				// 保存文件
				try (OutputStream outputStream = new FileOutputStream(file)) {
					boolean done = ImageIO.write(image, "JPEG", outputStream);
					if (!done) {
						throw new WebApplicationException(503);
					}
					outputStream.flush();
					Logger.log(String.format("verify: create a image, %s", file.getPath()));
				} catch (Exception e) {
					throw new WebApplicationException(e);
				}
			}
			this.resource(resource, response);
		}
	}

	private static final int WIDTH = 160;
	private static final int HEIGHT = 20;
	private static final Random random = new Random();

	private static void drawExpression(Graphics2D g2d, String text) {
		// 设置字体
		Font font = new Font("Arial", Font.BOLD, 14);
		g2d.setFont(font);

		// 文字扭曲参数
		double xPeriod = random.nextDouble() * 3 + 5;
		double yPeriod = random.nextDouble() * 5 + 3;
		double yAmp = random.nextDouble() * 4 + 2;

		// 绘制每个字符
		for (int i = 0; i < text.length(); i++) {
			char c = text.charAt(i);

			// 随机颜色
			g2d.setColor(getRandomDarkColor());

			// 位置计算
			int x = 20 + i * 15;
			int y = 15;

			// 添加扭曲
			double yOffset = yAmp * Math.sin(i / xPeriod * Math.PI);
			double xOffset = yAmp * Math.cos(i / yPeriod * Math.PI);

			// 随机旋转
			AffineTransform affineTransform = new AffineTransform();
			affineTransform.rotate(Math.toRadians(random.nextDouble() * 8 - 4), x + xOffset, y + yOffset);

			// 绘制字符
			Font rotatedFont = font.deriveFont(affineTransform);
			g2d.setFont(rotatedFont);
			g2d.drawString(String.valueOf(c), (int) (x + xOffset), (int) (y + yOffset));
		}
	}

	private static void addInterference(Graphics2D g2d) {
		// 干扰线
		g2d.setStroke(new BasicStroke(1.5f));
		for (int i = 0; i < 5; i++) {
			g2d.setColor(getRandomColor());
			int x1 = random.nextInt(WIDTH);
			int y1 = random.nextInt(HEIGHT);
			int x2 = random.nextInt(WIDTH);
			int y2 = random.nextInt(HEIGHT);
			g2d.drawLine(x1, y1, x2, y2);
		}
	}

	private static Color getRandomColor() {
		return new Color(random.nextInt(256), random.nextInt(256), random.nextInt(256));
	}

	private static Color getRandomLightColor() {
		return new Color(200 + random.nextInt(55), 200 + random.nextInt(55), 200 + random.nextInt(55));
	}

	private static Color getRandomDarkColor() {
		return new Color(random.nextInt(100), random.nextInt(100), random.nextInt(100));
	}

	private enum Operator {
		ADD, MINUS, MULTIPLY;

		public static String toSign(Operator value) {
			if (value == Operator.ADD) {
				return "+";
			} else if (value == Operator.MINUS) {
				return "-";
			} else if (value == Operator.MULTIPLY) {
				return "×";
			}
			return "?";
		}
	}

	private class Result {
		public Result() {
			this.time = DateTime.getNow().getTime();
		}

		public long time;
		public String name;
		public int result;
		public short errorCount;
	}
}
