package org.colorcoding.ibas.initialfantasy.routing;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.initialfantasy.MyConsts;

/**
 * 服务信息
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "ServiceInformation", namespace = MyConsts.NAMESPACE_SERVICE)
@XmlRootElement(name = "ServiceInformation", namespace = MyConsts.NAMESPACE_SERVICE)
public class ServiceInformation {
	private String id;

	/**
	 * 获取-服务标记
	 * 
	 * @return
	 */
	@XmlElement(name = "Id")
	public String getId() {
		return id;
	}

	/**
	 * 设置-服务标记
	 * 
	 */
	public void setId(String id) {
		this.id = id;
	}

	private String name;

	/**
	 * 获取-服务名称
	 * 
	 * @return
	 */
	@XmlElement(name = "Name")
	public String getName() {
		return name;
	}

	/**
	 * 设置-服务名称
	 * 
	 */
	public void setName(String name) {
		this.name = name;
	}

	private String description;

	/**
	 * 获取-服务描述
	 * 
	 * @return
	 */
	@XmlElement(name = "Description")
	public String getDescription() {
		return description;
	}

	/**
	 * 设置-服务描述
	 * 
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	@XmlElementWrapper(name = "Providers")
	@XmlElement(name = "Provider", type = ServiceProvider.class)
	private ServiceProvider[] providers;

	/**
	 * 获取-服务提供者
	 * 
	 * @return
	 */
	public ServiceProvider[] getProviders() {
		if (providers == null) {
			this.providers = new ServiceProvider[] {};
		}
		return providers;
	}

	/**
	 * 添加-服务提供者
	 * 
	 * public void setProviders(ServiceProvider[] providers) { this.providers =
	 * providers; }
	 * 
	 */

	public void addProvider(ServiceProvider provider) {
		int index = 0;
		if (this.providers == null || this.providers.length == 0) {
			this.providers = new ServiceProvider[1];
			index = 0;
		} else {
			ServiceProvider[] newProviders = new ServiceProvider[this.providers.length + 1];
			for (int i = 0; i < providers.length - 1; i++) {
				newProviders[i] = this.providers[i];
			}
			this.providers = newProviders;
		}
		this.providers[index] = provider;
	}
}
