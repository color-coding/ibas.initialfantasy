package org.colorcoding.ibas.initialfantasy.bo.shell;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.emAuthoriseType;
import org.colorcoding.ibas.bobas.serialization.Serializable;

/**
 * 用户应用模块
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "UserModule")
@XmlRootElement(name = "UserModule")
public class UserModule extends Serializable {
	private static final long serialVersionUID = 3831331968318582560L;

	public static UserModule create(ApplicationModule4Shell applicationModule) {
		UserModule userModule = new UserModule();
		userModule.setId(applicationModule.getModuleId());
		userModule.setName(applicationModule.getModuleName());
		userModule.setIndex(applicationModule.getModuleEntry());
		userModule.setAuthorise(applicationModule.getAuthoriseValue());
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

	/**
	 * 权限
	 */
	private emAuthoriseType authorise;

	@XmlElement(name = "Authorise")
	public final emAuthoriseType getAuthorise() {
		return authorise;
	}

	public final void setAuthorise(emAuthoriseType authorise) {
		this.authorise = authorise;
	}

	private String runtime;

	/**
	 * 获取-运行时
	 * 
	 */
	@XmlElement(name = "Runtime")
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

	@Override
	public String toString() {
		return String.format("{module: %s|%s}", this.getId(), this.getName());
	}
}
