package org.colorcoding.ibas.initialfantasy.bo.shells;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
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
		UserModule userModule = new UserModule();
		userModule.setId(applicationModule.getModuleId());
		userModule.setName(applicationModule.getModuleName());
		userModule.setIndex(applicationModule.getModuleEntry());
		userModule.setRepository("");
		userModule.setAddress("");
		return userModule;
	}

	/** 唯一标识 */
	private String id;

	@XmlElement(name = "Id")
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	/** 名称 */
	private String name;

	@XmlElement(name = "Name")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	/** 类别 */
	private String category;

	@XmlElement(name = "Category")
	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	/** 地址 */
	private String address;

	@XmlElement(name = "Address")
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	/** 仓库地址 */
	private String repository;

	@XmlElement(name = "Repository")
	public String getRepository() {
		return repository;
	}

	public void setRepository(String repository) {
		this.repository = repository;
	}

	/**
	 * 索引
	 */
	private String index;

	@XmlElement(name = "Index")
	public String getIndex() {
		return index;
	}

	public void setIndex(String index) {
		this.index = index;
	}

	@Override
	public String toString() {
		return String.format("{module: %s|%s}", this.getId(), this.getName());
	}
}
