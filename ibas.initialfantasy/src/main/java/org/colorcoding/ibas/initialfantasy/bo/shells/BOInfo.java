package org.colorcoding.ibas.initialfantasy.bo.shells;

import java.util.ArrayList;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.initialfantasy.bo.boinformation.IBOInformation;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.IBOPropertyInformation;

/**
 * 业务对象信息
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "BOInfo")
@XmlRootElement(name = "BOInfo")
public class BOInfo {

	public static BOInfo create(IBOInformation boItem) {
		BOInfo boInfo = new BOInfo();
		boInfo.setCode(boItem.getCode());
		boInfo.setName(boItem.getName());
		boInfo.setType(boItem.getObjectType());
		ArrayList<BOPropertyInfo> propertyInfos = new ArrayList<>();
		for (IBOPropertyInformation propertyItem : boItem.getBOPropertyInformations()) {
			propertyInfos.add(BOPropertyInfo.create(propertyItem));
		}
		boInfo.setProperties(propertyInfos.toArray(new BOPropertyInfo[] {}));
		return boInfo;
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

	/** 编码 */
	private String code;

	@XmlElement(name = "Code")
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	/** 类型 */
	private String type;

	@XmlElement(name = "Type")
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	/** 属性集合 */
	private BOPropertyInfo[] properties;

	@XmlElementWrapper(name = "Properties")
	@XmlElement(name = "Properties", type = BOPropertyInfo.class)
	public BOPropertyInfo[] getProperties() {
		return properties;
	}

	public void setProperties(BOPropertyInfo[] properties) {
		this.properties = properties;
	}
}
