package org.colorcoding.ibas.initialfantasy.routing;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.xml.bind.JAXBException;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.List;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.serialization.ISerializer;
import org.colorcoding.ibas.bobas.serialization.SerializationException;
import org.colorcoding.ibas.bobas.serialization.SerializerFactory;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;
import org.colorcoding.ibas.initialfantasy.bo.shell.UserModule;

/**
 * 分配有效的服务
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "ServiceRouting", namespace = MyConfiguration.NAMESPACE_SERVICE)
@XmlRootElement(name = "ServiceRouting", namespace = MyConfiguration.NAMESPACE_SERVICE)
@XmlSeeAlso({ ServiceInformation.class, ServiceProvider.class })
public class ServiceRouting {
	public static final String MSG_SERVICE_ROUTING_LOAD_CONFIG = "routing: load config [%s].";
	public static final String MSG_SERVICE_ROUTING_ADDRESS = "routing: module [%s - %s].\n  data: [%s].\n  view: [%s].";

	private ServiceRouting() {
		this.services = new ArrayList<>();
	}

	private volatile static ServiceRouting instance;

	public static ServiceRouting create() {
		if (instance == null) {
			synchronized (ServiceRouting.class) {
				if (instance == null) {
					instance = new ServiceRouting();
					instance.initialize();
				}
			}
		}
		return instance;
	}

	private String runtime;

	/**
	 * 获取-运行时
	 * 
	 */
	public String getRuntime() {
		return runtime;
	}

	/**
	 * 设置-运行时
	 * 
	 */
	public void setRuntime(String runtime) {
		this.runtime = runtime;
	}

	@XmlElement(name = "ServiceInformation", type = ServiceInformation.class)
	private List<ServiceInformation> services;

	protected List<ServiceInformation> getServices() {
		if (this.services == null) {
			this.services = new ArrayList<>();
		}
		return services;
	}

	private String workFolder;

	public String getWorkFolder() {
		if (workFolder == null) {
			workFolder = MyConfiguration.getStartupFolder();
		}
		return workFolder;
	}

	public void setWorkFolder(String workFolder) {
		this.workFolder = workFolder;
	}

	private static String FILE_NAME_SERVICE_INFORMATIONS = "service_routing.xml";

	private String getServiceFilePath() {
		String separator = System.getProperty("file.separator");
		if (!this.getWorkFolder().endsWith(separator)) {
			this.setWorkFolder(this.getWorkFolder() + separator);
		}
		return this.getWorkFolder() + FILE_NAME_SERVICE_INFORMATIONS;
	}

	public void save(ServiceRouting routing) throws IOException, JAXBException {
		if (routing == null) {
			return;
		}
		File file = new File(this.getServiceFilePath());
		if (file.exists()) {
			file.delete();
		}
		ISerializer<?> serializer = SerializerFactory.create().createManager().create("xml");
		serializer.serialize(routing, new FileOutputStream(file));
	}

	public void load() throws JAXBException, SerializationException, FileNotFoundException {
		File file = new File(this.getServiceFilePath());
		if (!file.exists()) {
			return;
		}
		ISerializer<?> serializer = SerializerFactory.create().createManager().create("xml");
		Object object = serializer.deserialize(new FileInputStream(file), ServiceRouting.class);
		if (object instanceof ServiceRouting) {
			ServiceRouting routing = (ServiceRouting) object;
			for (ServiceInformation item : routing.getServices()) {
				if (item.getRuntime() == null || item.getRuntime().isEmpty()) {
					item.setRuntime(this.getRuntime());
				}
				this.getServices().add(item);
			}
			this.services = routing.getServices();
			Logger.log(MSG_SERVICE_ROUTING_LOAD_CONFIG, file.getPath());
		}
	}

	protected void initialize() {
		try {
			this.setRuntime(Long.toString(DateTime.getNow().getTime()));
			File file = new File(this.getServiceFilePath());
			if (!file.exists()) {
				ServiceRouting routing = new ServiceRouting();
				ServiceInformation information = new ServiceInformation();
				information.setId("0000-0000-0000-0000");
				information.setName("demo");
				information.setDescription("just for demo.");
				ServiceProvider provider = new ServiceProvider();
				provider.setAddress("http://localhost/demo");
				provider.setType(ServiceType.ALL);
				provider.setEnabled(true);
				information.addProvider(provider);
				routing.getServices().add(information);
				this.save(routing);
			}
			this.load();
		} catch (Exception e) {
			Logger.log(e);
		}
	}

	/**
	 * 路由服务
	 * 
	 * @param module
	 *            模块
	 * @return 是否成功路由
	 */
	public boolean routing(UserModule module) {
		boolean done = false;
		if (module == null || module.getId() == null) {
			return done;
		}
		for (ServiceInformation service : this.getServices()) {
			if (!module.getId().equals(service.getId())) {
				// 相同的模块ID
				continue;
			}
			module.setRuntime(service.getRuntime());
			for (ServiceProvider provider : service.getProviders()) {
				if (!provider.check()) {
					// 无效的服务
					continue;
				}
				// 判断服务类型并设置
				if (provider.getType() == ServiceType.ALL) {
					module.setRepository(provider.getAddress());
					module.setAddress(provider.getAddress());
				} else if ((module.getRepository() == null || module.getRepository().isEmpty())
						&& provider.getType() == ServiceType.DATA) {
					module.setRepository(provider.getAddress());
				} else if ((module.getAddress() == null || module.getAddress().isEmpty())
						&& provider.getType() == ServiceType.VIEW) {
					module.setAddress(provider.getAddress());
				}
			}
		}
		// 判断模块是否可用
		if ((module.getRepository() != null && !module.getRepository().isEmpty())
				&& (module.getAddress() != null && !module.getAddress().isEmpty())) {
			done = true;
			Logger.log(MSG_SERVICE_ROUTING_ADDRESS, module.getId(), module.getName(), module.getRepository(),
					module.getAddress());
		}
		return done;
	}
}
