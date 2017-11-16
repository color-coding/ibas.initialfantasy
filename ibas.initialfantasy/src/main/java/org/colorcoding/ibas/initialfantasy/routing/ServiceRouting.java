package org.colorcoding.ibas.initialfantasy.routing;

import java.io.File;
import java.io.IOException;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.message.Logger;
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
@XmlSeeAlso({ ServiceInformation.class, ServiceProvider.class, ServiceInformations.class })
public class ServiceRouting {
	public static final String MSG_SERVICE_ROUTING_LOAD_CONFIG = "routing: load config [%s].";
	public static final String MSG_SERVICE_ROUTING_ADDRESS = "routing: module [%s - %s].\n  data: [%s].\n  view: [%s].";

	private ServiceRouting() {

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

	@XmlElement(name = "ServiceInformation", type = ServiceInformation.class)
	private ServiceInformations services;

	protected ServiceInformations getServices() {
		if (this.services == null) {
			this.services = new ServiceInformations();
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
		file.createNewFile();
		try {
			JAXBContext context = JAXBContext.newInstance(ServiceRouting.class);
			Marshaller marshaller = context.createMarshaller();
			marshaller.setProperty(Marshaller.JAXB_ENCODING, "UTF-8");// //编码格式
			marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);// 是否格式化生成的xml串
			marshaller.marshal(routing, file);
		} catch (JAXBException e) {
			file.delete();
			throw e;
		}
	}

	public void load() throws JAXBException {
		File file = new File(this.getServiceFilePath());
		if (!file.exists()) {
			return;
		}
		JAXBContext context = JAXBContext.newInstance(ServiceRouting.class);
		Unmarshaller unmarshaller = context.createUnmarshaller();
		Object object = unmarshaller.unmarshal(file);
		if (object instanceof ServiceRouting) {
			ServiceRouting routing = (ServiceRouting) object;
			this.services = routing.getServices();
			Logger.log(MSG_SERVICE_ROUTING_LOAD_CONFIG, file.getPath());
		}
	}

	protected void initialize() {
		try {
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
		} catch (JAXBException | IOException e) {
			e.printStackTrace();
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
		for (int i = 0; i < services.size(); i++) {
			ServiceInformation service = services.get(i);
			if (!module.getId().equals(service.getId())) {
				// 相同的模块ID
				continue;
			}
			for (int j = 0; j < service.getProviders().length; j++) {
				ServiceProvider provider = service.getProviders()[j];
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
