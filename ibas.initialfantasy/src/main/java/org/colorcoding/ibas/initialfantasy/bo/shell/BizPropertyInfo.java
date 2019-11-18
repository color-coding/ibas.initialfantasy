package org.colorcoding.ibas.initialfantasy.bo.shell;

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

/**
 * 业务对象属性信息
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "BizPropertyInfo")
@XmlRootElement(name = "BizPropertyInfo")
public class BizPropertyInfo extends Serializable {

	private static final long serialVersionUID = 2986192380423488008L;

	public static BizPropertyInfo create(IBOPropertyInformation propertyItem) {
		BizPropertyInfo propertyInfo = new BizPropertyInfo();
		propertyInfo.setName(propertyItem.getPropertyName());
		propertyInfo.setDescription(propertyItem.getDescription());
		propertyInfo.setAlias(propertyItem.getMapped());
		propertyInfo.setDataType(propertyItem.getDataType());
		propertyInfo.setEditType(propertyItem.getEditType());
		propertyInfo.setEditSize(propertyItem.getEditSize());
		propertyInfo.setSearched(propertyItem.getSearched() == emYesNo.YES ? true : false);
		propertyInfo.setSystemed(propertyItem.getSystemed() == emYesNo.YES ? true : false);
		BizPropertyValue[] propertyValues = new BizPropertyValue[propertyItem.getBOPropertyValues().size()];
		for (int i = 0; i < propertyValues.length; i++) {
			propertyValues[i] = BizPropertyValue.create(propertyItem.getBOPropertyValues().get(i));
		}
		propertyInfo.setValues(propertyValues);
		return propertyInfo;
	}

	private String name;

	@XmlElement(name = "Name")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	private String description;

	@XmlElement(name = "Description")
	public final String getDescription() {
		return description;
	}

	public final void setDescription(String description) {
		this.description = description;
	}

	private String dataType;

	@XmlElement(name = "DataType")
	public final String getDataType() {
		return dataType;
	}

	public final void setDataType(String dataType) {
		this.dataType = dataType;
	}

	private String editType;

	@XmlElement(name = "EditType")
	public final String getEditType() {
		return editType;
	}

	public final void setEditType(String editType) {
		this.editType = editType;
	}

	private Integer editSize;

	@XmlElement(name = "EditSize")
	public final Integer getEditSize() {
		return editSize;
	}

	public final void setEditSize(Integer editSize) {
		this.editSize = editSize;
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

	private boolean systemed;

	@XmlElement(name = "Systemed")
	public final boolean isSystemed() {
		return systemed;
	}

	public final void setSystemed(boolean systemed) {
		this.systemed = systemed;
	}

	private emAuthoriseType authorised;

	@XmlElement(name = "Authorised")
	public emAuthoriseType getAuthorised() {
		return authorised;
	}

	public void setAuthorised(emAuthoriseType authorised) {
		this.authorised = authorised;
	}

	private String alias;

	@XmlElement(name = "Alias")
	public final String getAlias() {
		return alias;
	}

	public final void setAlias(String alias) {
		this.alias = alias;
	}

	private int position;

	@XmlElement(name = "Position")
	public final int getPosition() {
		return position;
	}

	public final void setPosition(int position) {
		this.position = position;
	}

	private BizPropertyValue[] values;

	@XmlElementWrapper(name = "Values")
	@XmlElement(name = "Value", type = BizPropertyValue.class)
	public BizPropertyValue[] getValues() {
		return values;
	}

	public void setValues(BizPropertyValue[] values) {
		this.values = values;
	}

	@Override
	public String toString() {
		return String.format("{propertyInfo: %s}", this.getName());
	}
}
