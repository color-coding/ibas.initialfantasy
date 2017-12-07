package org.colorcoding.ibas.initialfantasy.routing;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.serialization.Serializable;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 服务提供者
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "ServiceProvider", namespace = MyConfiguration.NAMESPACE_SERVICE)
@XmlRootElement(name = "ServiceProvider", namespace = MyConfiguration.NAMESPACE_SERVICE)
public class ServiceProvider extends Serializable {

	private static final long serialVersionUID = 7029656941489076190L;

	public ServiceProvider() {
		this.setEnabled(true);
	}

	private String address;

	/**
	 * 获取-服务地址
	 * 
	 * @return
	 */
	@XmlElement(name = "Address")
	public String getAddress() {
		return address;
	}

	/**
	 * 设置-服务地址
	 * 
	 */
	public void setAddress(String address) {
		this.address = address;
	}

	private ServiceType type;

	/**
	 * 获取-服务类型
	 * 
	 * @return
	 */
	@XmlElement(name = "Type")
	public ServiceType getType() {
		return type;
	}

	/**
	 * 设置-服务类型
	 * 
	 */
	public void setType(ServiceType type) {
		this.type = type;
	}

	private boolean enabled;

	/**
	 * 获取-是否开启
	 * 
	 * @return
	 */
	@XmlElement(name = "Enabled")
	public boolean isEnabled() {
		return enabled;
	}

	/**
	 * 设置-是否开启
	 * 
	 */
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	/**
	 * 检查是否有效
	 * 
	 * @return
	 */
	public boolean check() {
		if (!this.isEnabled()) {
			return false;
		}
		return true;
	}
}
