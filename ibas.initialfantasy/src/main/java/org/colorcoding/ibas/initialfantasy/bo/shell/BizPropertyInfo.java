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
		propertyInfo.setLinkedObject(propertyItem.getLinkedObject());
		propertyInfo.setValueChooseType(propertyItem.getValueChooseType());
		propertyInfo.setTriggerByProperty(propertyItem.getTriggerByProperty());
		BizPropertyValue[] propertyValues = new BizPropertyValue[propertyItem.getBOPropertyValues().size()];
		for (int i = 0; i < propertyValues.length; i++) {
			propertyValues[i] = BizPropertyValue.create(propertyItem.getBOPropertyValues().get(i));
		}
		propertyInfo.setValues(propertyValues);
		return propertyInfo;
	}

	private String name;

	@XmlElement(name = "Name")
	public final String getName() {
		return name;
	}

	public final void setName(String name) {
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
	private Boolean searched;

	@XmlElement(name = "Searched")
	public final Boolean isSearched() {
		return searched;
	}

	public final void setSearched(Boolean searched) {
		this.searched = searched;
	}

	private Boolean systemed;

	@XmlElement(name = "Systemed")
	public final Boolean isSystemed() {
		return systemed;
	}

	public final void setSystemed(Boolean systemed) {
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

	private Integer position;

	@XmlElement(name = "Position")
	public final Integer getPosition() {
		return position;
	}

	public final void setPosition(Integer position) {
		this.position = position;
	}

	private String linkedObject;

	@XmlElement(name = "LinkedObject")
	public final String getLinkedObject() {
		return linkedObject;
	}

	public final void setLinkedObject(String linkedObject) {
		this.linkedObject = linkedObject;
	}

	/** 必填 */
	private Boolean required;

	@XmlElement(name = "Required")
	public final Boolean getRequired() {
		return required;
	}

	public final void setRequired(Boolean required) {
		this.required = required;
	}

	@XmlElement(name = "ValueChooseType")
	private String valueChooseType;

	public final String getValueChooseType() {
		return valueChooseType;
	}

	public final void setValueChooseType(String valueChooseType) {
		this.valueChooseType = valueChooseType;
	}

	@XmlElement(name = "TriggerByProperty")
	private String triggerByProperty;

	public final String getTriggerByProperty() {
		return triggerByProperty;
	}

	public final void setTriggerByProperty(String triggerByProperty) {
		this.triggerByProperty = triggerByProperty;
	}

	private BizPropertyValue[] values;

	@XmlElementWrapper(name = "Values")
	@XmlElement(name = "Value", type = BizPropertyValue.class)
	public final BizPropertyValue[] getValues() {
		return values;
	}

	public final void setValues(BizPropertyValue[] values) {
		this.values = values;
	}

	@XmlElement(name = "Width")
	private String width;

	public final String getWidth() {
		return width;
	}

	public final void setWidth(String width) {
		this.width = width;
	}

	@Override
	public final String toString() {
		return String.format("{propertyInfo: %s}", this.getName());
	}
}
