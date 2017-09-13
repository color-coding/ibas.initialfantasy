package org.colorcoding.ibas.initialfantasy.bo.shells;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.IBOPropertyInformation;

/**
 * 业务对象属性信息
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "BOPropertyInfo")
@XmlRootElement(name = "BOPropertyInfo")
public class BOPropertyInfo {

	public static BOPropertyInfo create(IBOPropertyInformation propertyItem) {
		BOPropertyInfo propertyInfo = new BOPropertyInfo();
		propertyInfo.setProperty(propertyItem.getProperty());
		propertyInfo.setSearched(propertyItem.getSearched() == emYesNo.YES ? true : false);
		propertyInfo.setEditable(propertyItem.getEditable() == emYesNo.YES ? true : false);
		propertyInfo.setDescription(propertyItem.getDescription());
		return propertyInfo;
	}

	/** 属性 */
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

	/** 可编辑的 */
	private boolean editable;

	@XmlElement(name = "Editable")
	public boolean isEditable() {
		return editable;
	}

	public void setEditable(boolean editable) {
		this.editable = editable;
	}

	@Override
	public String toString() {
		return String.format("{propertyinfo: %s}", this.getProperty());
	}
}
