package org.colorcoding.ibas.initialfantasy.bo.shells;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.initialfantasy.bo.applications.IApplicationModule;

/**
 * 用户应用模块
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "UserModule")
@XmlRootElement(name = "UserModule")
public class UserModule {
	public static UserModule create(IApplicationModule applicationModule) {
		UserModule userApplicationModule = new UserModule();
		userApplicationModule.setId(applicationModule.getModuleId());
		userApplicationModule.setName(applicationModule.getModuleName());

		userApplicationModule.setRepository("");
		userApplicationModule.setAddress("");
		return userApplicationModule;
	}

	/** 唯一标识 */
	private String id;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	/** 名称 */
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	/** 类别 */
	private String category;

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	/** 地址 */
	private String address;

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	/** 仓库地址 */
	private String repository;

	public String getRepository() {
		return repository;
	}

	public void setRepository(String repository) {
		this.repository = repository;
	}

}
