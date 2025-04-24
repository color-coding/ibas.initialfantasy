package org.colorcoding.ibas.initialfantasy.bo.shell;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.core.Serializable;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.IBOPropertyValue;

/**
 * 业务对象属性信息
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "BizPropertyValue")
@XmlRootElement(name = "BizPropertyValue")
public class BizPropertyValue extends Serializable {

	private static final long serialVersionUID = -3148876335057118663L;

	public static BizPropertyValue create(IBOPropertyValue propertyValue) {
		BizPropertyValue propertyInfo = new BizPropertyValue();
		propertyInfo.setValue(propertyValue.getValue());
		propertyInfo.setDescription(propertyValue.getDescription());
		if (propertyValue.getDefault() == emYesNo.YES) {
			propertyInfo.setDefault(true);
		}
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

	private boolean _default;

	@XmlElement(name = "Default")
	public final boolean isDefault() {
		return _default;
	}

	public final void setDefault(boolean value) {
		this._default = value;
	}

	@Override
	public String toString() {
		return String.format("{propertyValue: %s}", this.getValue());
	}
}
