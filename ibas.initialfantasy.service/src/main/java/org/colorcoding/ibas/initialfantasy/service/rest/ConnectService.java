package org.colorcoding.ibas.initialfantasy.service.rest;

import java.net.URLDecoder;
import java.util.Base64;

import javax.ws.rs.BeanParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;

import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;
import org.colorcoding.ibas.initialfantasy.data.DataConvert;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasyShell;
import org.glassfish.jersey.media.multipart.BodyPart;
import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataMultiPart;

/**
 * InitialFantasy 数据服务JSON
 */
@Path("data")
public class ConnectService extends BORepositoryInitialFantasyShell {

	/** 配置项目-启用登录验证 */
	private final static String CONFIG_ITEM_ENABLE_LOGIN_VERIFICATION = "EnableLoginVerification";

	/**
	 * 用户口令登录
	 * 
	 * @param token 用户口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("tokenConnect")
	public OperationResult<org.colorcoding.ibas.initialfantasy.bo.shell.User> tokenConnect(
			@QueryParam("token") String token) {
		return super.tokenConnect(token);
	}

	/**
	 * 用户密码登录
	 * 
	 * @param user     用户
	 * @param passwrod 密码
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("userConnect")
	public OperationResult<org.colorcoding.ibas.initialfantasy.bo.shell.User> userConnect(
			@QueryParam("user") String user, @QueryParam("password") String password,
			@QueryParam("verification") String verification) {
		try {
			if (MyConfiguration.getConfigValue(CONFIG_ITEM_ENABLE_LOGIN_VERIFICATION, false)) {
				if (!DataConvert.isNullOrEmpty(verification)) {
					String[] values = URLDecoder.decode(this.atob(verification), "UTF-8").split("=");
					if (values.length == 2) {
						if (!VerificationService.check(values[0], Integer.valueOf(values[1]))) {
							throw new Exception(I18N.prop("msg_if_user_verification_code_invalid"));
						}
					} else {
						throw new Exception(I18N.prop("msg_if_user_verification_code_invalid"));
					}
				} else {
					throw new Exception(I18N.prop("msg_if_user_verification_code_invalid"));
				}
			}
			return super.userConnect(user, URLDecoder.decode(this.atob(password), "UTF-8"));
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	@POST
	@Path("userConnect")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public OperationResult<org.colorcoding.ibas.initialfantasy.bo.shell.User> userConnect(FormDataMultiPart formData) {
		try {
			UserInfo userInfo = new UserInfo();
			for (BodyPart item : formData.getBodyParts()) {
				FormDataBodyPart bodyPart = (FormDataBodyPart) item;
				if (bodyPart.getName().equalsIgnoreCase("user")) {
					userInfo.user = bodyPart.getValue();
				} else if (bodyPart.getName().equalsIgnoreCase("password")) {
					userInfo.password = bodyPart.getValue();
				} else if (bodyPart.getName().equalsIgnoreCase("verification")) {
					userInfo.verification = bodyPart.getValue();
				}
			}
			return this.userConnect(userInfo);
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	@POST
	@Path("userConnect")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public OperationResult<org.colorcoding.ibas.initialfantasy.bo.shell.User> userConnect(
			@BeanParam UserInfo userInfo) {
		try {
			return this.userConnect(userInfo.user, userInfo.password, userInfo.verification);
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	protected String atob(String value) {
		if (value == null) {
			return null;
		}
		try {
			byte[] decodedBytes = Base64.getDecoder().decode(value);
			return new String(decodedBytes, "utf-8");
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}
	}
}

class UserInfo {
	@FormParam("user")
	public String user;
	@FormParam("password")
	public String password;
	@FormParam("verification")
	public String verification;
}
