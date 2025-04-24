package org.colorcoding.ibas.initialfantasy.bo.shell;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.core.Serializable;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.IBOInformation;

/**
 * 业务对象信息
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "BizObjectInfo")
@XmlRootElement(name = "BizObjectInfo")
public class BizObjectInfo extends Serializable {

	private static final long serialVersionUID = 5211690516678551238L;

	public static BizObjectInfo create(IBOInformation boItem) {
		BizObjectInfo boInfo = new BizObjectInfo();
		boInfo.setCode(boItem.getCode());
		boInfo.setName(boItem.getName());
		boInfo.setType(boItem.getObjectType());
		BizPropertyInfo[] propertyInfos = new BizPropertyInfo[boItem.getBOPropertyInformations().size()];
		for (int i = 0; i < propertyInfos.length; i++) {
			propertyInfos[i] = BizPropertyInfo.create(boItem.getBOPropertyInformations().get(i));
		}
		boInfo.setProperties(propertyInfos);
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
	private BizPropertyInfo[] properties;

	@XmlElementWrapper(name = "Properties")
	@XmlElement(name = "Property", type = BizPropertyInfo.class)
	public BizPropertyInfo[] getProperties() {
		return properties;
	}

	public void setProperties(BizPropertyInfo[] properties) {
		this.properties = properties;
	}

	@Override
	public String toString() {
		return String.format("{objectInfo: %s %s}", this.getName(), this.getType());
	}
}
