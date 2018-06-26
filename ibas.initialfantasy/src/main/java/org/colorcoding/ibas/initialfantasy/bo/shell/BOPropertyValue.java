package org.colorcoding.ibas.initialfantasy.bo.shell;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.serialization.Serializable;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.IBOPropertyValue;

/**
 * 业务对象属性信息
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "BOPropertyInfo")
@XmlRootElement(name = "BOPropertyInfo")
public class BOPropertyValue extends Serializable {

	private static final long serialVersionUID = 4495333357468284953L;

	public static BOPropertyValue create(IBOPropertyValue propertyValue) {
		BOPropertyValue propertyInfo = new BOPropertyValue();
		propertyInfo.setValue(propertyValue.getValue());
		propertyInfo.setDescription(propertyValue.getDescription());
		return propertyInfo;
	}

	private String value;

	@XmlElement(name = "Value")
	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	private String description;

	@XmlElement(name = "Description")
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return String.format("{propertyvalue: %s}", this.getValue());
	}
}
