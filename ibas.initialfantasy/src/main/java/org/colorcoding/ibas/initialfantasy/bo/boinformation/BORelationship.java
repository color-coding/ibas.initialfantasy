package org.colorcoding.ibas.initialfantasy.bo.boinformation;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.bo.IBOCustomKey;
import org.colorcoding.ibas.bobas.bo.IBOStorageTag;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.core.fields.IFieldData;
import org.colorcoding.ibas.bobas.mapping.BusinessObjectUnit;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 业务对象关系
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = BORelationship.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = BORelationship.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@BusinessObjectUnit(code = BORelationship.BUSINESS_OBJECT_CODE)
public class BORelationship extends BusinessObject<BORelationship> implements IBORelationship, IBOCustomKey {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 1281423074582087635L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = BORelationship.class;

	/**
	 * 数据库表
	 */
	public static final String DB_TABLE_NAME = "${Company}_SYS_BOI3";

	/**
	 * 业务对象编码
	 */
	public static final String BUSINESS_OBJECT_CODE = "${Company}_SYS_BORELATIONSHIP";

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "BORelationship";

	/**
	 * 属性名称-编码
	 */
	private static final String PROPERTY_CODE_NAME = "Code";

	/**
	 * 编码 属性
	 */
	@DbField(name = "Code", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<String> PROPERTY_CODE = registerProperty(PROPERTY_CODE_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-编码
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CODE_NAME)
	public final String getCode() {
		return this.getProperty(PROPERTY_CODE);
	}

	/**
	 * 设置-编码
	 * 
	 * @param value 值
	 */
	public final void setCode(String value) {
		this.setProperty(PROPERTY_CODE, value);
	}

	/**
	 * 属性名称-目标对象
	 */
	private static final String PROPERTY_TARGET_NAME = "Target";

	/**
	 * 目标对象 属性
	 */
	@DbField(name = "Target", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<String> PROPERTY_TARGET = registerProperty(PROPERTY_TARGET_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-目标对象
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_TARGET_NAME)
	public final String getTarget() {
		return this.getProperty(PROPERTY_TARGET);
	}

	/**
	 * 设置-目标对象
	 * 
	 * @param value 值
	 */
	public final void setTarget(String value) {
		this.setProperty(PROPERTY_TARGET, value);
	}

	/**
	 * 属性名称-关系
	 */
	private static final String PROPERTY_RELATION_NAME = "Relation";

	/**
	 * 关系 属性
	 */
	@DbField(name = "Relation", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<String> PROPERTY_RELATION = registerProperty(PROPERTY_RELATION_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-关系
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_RELATION_NAME)
	public final String getRelation() {
		return this.getProperty(PROPERTY_RELATION);
	}

	/**
	 * 设置-关系
	 * 
	 * @param value 值
	 */
	public final void setRelation(String value) {
		this.setProperty(PROPERTY_RELATION, value);
	}

	/**
	 * 属性名称-关联的属性
	 */
	private static final String PROPERTY_ASSOCIATEDPROPERTY_NAME = "AssociatedProperty";

	/**
	 * 关联的属性 属性
	 */
	@DbField(name = "Associated", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_ASSOCIATEDPROPERTY = registerProperty(
			PROPERTY_ASSOCIATEDPROPERTY_NAME, String.class, MY_CLASS);

	/**
	 * 获取-关联的属性
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ASSOCIATEDPROPERTY_NAME)
	public final String getAssociatedProperty() {
		return this.getProperty(PROPERTY_ASSOCIATEDPROPERTY);
	}

	/**
	 * 设置-关联的属性
	 * 
	 * @param value 值
	 */
	public final void setAssociatedProperty(String value) {
		this.setProperty(PROPERTY_ASSOCIATEDPROPERTY, value);
	}

	/**
	 * 属性名称-描述
	 */
	private static final String PROPERTY_DESCRIPTION_NAME = "Description";

	/**
	 * 描述 属性
	 */
	@DbField(name = "Descrp", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_DESCRIPTION = registerProperty(PROPERTY_DESCRIPTION_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-描述
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_DESCRIPTION_NAME)
	public final String getDescription() {
		return this.getProperty(PROPERTY_DESCRIPTION);
	}

	/**
	 * 设置-描述
	 * 
	 * @param value 值
	 */
	public final void setDescription(String value) {
		this.setProperty(PROPERTY_DESCRIPTION, value);
	}

	/**
	 * 初始化数据
	 */
	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
	}

	@Override
	public ICriteria getCriteria() {
		Criteria criteria = new Criteria();
		if (this instanceof IBOStorageTag) {
			IBOStorageTag tagBO = (IBOStorageTag) this;
			criteria.setBusinessObject(tagBO.getObjectCode());
		}
		for (IFieldData item : this.getFields(c -> c.isPrimaryKey())) {
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(item.getName());
			condition.setValue(item.getValue());
		}
		if (criteria.getConditions().isEmpty()) {
			// 没有条件，返回空
			return null;
		}
		return criteria;
	}

}
