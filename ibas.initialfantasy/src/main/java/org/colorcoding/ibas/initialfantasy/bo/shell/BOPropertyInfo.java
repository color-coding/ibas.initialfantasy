package org.colorcoding.ibas.initialfantasy.bo.shell;

import java.util.ArrayList;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.emAuthoriseType;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.serialization.Serializable;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.IBOPropertyInformation;
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
public class BOPropertyInfo extends Serializable {

	private static final long serialVersionUID = 4495322357468284953L;

	public static BOPropertyInfo create(IBOPropertyInformation propertyItem) {
		BOPropertyInfo propertyInfo = new BOPropertyInfo();
		propertyInfo.setProperty(propertyItem.getPropertyName());
		propertyInfo.setSearched(propertyItem.getSearched() == emYesNo.YES ? true : false);
		propertyInfo.setAuthorised(propertyItem.getAuthorised());
		propertyInfo.setDescription(propertyItem.getDescription());
		ArrayList<BOPropertyValue> propertyValues = new ArrayList<>();
		for (IBOPropertyValue propertyValue : propertyItem.getBOPropertyValues()) {
			propertyValues.add(BOPropertyValue.create(propertyValue));
		}
		propertyInfo.setValues(propertyValues.toArray(new BOPropertyValue[] {}));
		return propertyInfo;
	}

	private String property;

	@XmlElement(name = "Property")
	public String getProperty() {
		return property;
	}

	public void setProperty(String property) {
		this.property = property;
	}

	private String description;

	@XmlElement(name = "Description")
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	/** 查询 */
	private boolean searched;

	@XmlElement(name = "Searched")
	public boolean isSearched() {
		return searched;
	}

	public void setSearched(boolean searched) {
		this.searched = searched;
	}

	private emAuthoriseType authorised;

	@XmlElement(name = "Authorised")
	public emAuthoriseType getAuthorised() {
		return authorised;
	}

	public void setAuthorised(emAuthoriseType authorised) {
		this.authorised = authorised;
	}

	private BOPropertyValue[] values;

	@XmlElementWrapper(name = "Values")
	@XmlElement(name = "Value", type = BOPropertyValue.class)
	public BOPropertyValue[] getValues() {
		return values;
	}

	public void setValues(BOPropertyValue[] values) {
		this.values = values;
	}

	@Override
	public String toString() {
		return String.format("{propertyinfo: %s}", this.getProperty());
	}
}
