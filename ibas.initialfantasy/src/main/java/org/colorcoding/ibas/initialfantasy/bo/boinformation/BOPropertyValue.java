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
 * 获取-业务对象属性值
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = BOPropertyValue.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = BOPropertyValue.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@BusinessObjectUnit(code = BOPropertyValue.BUSINESS_OBJECT_CODE)
public class BOPropertyValue extends BusinessObject<BOPropertyValue> implements IBOPropertyValue, IBOCustomKey {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = -569064678131099616L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = BOPropertyValue.class;

	/**
	 * 数据库表
	 */
	public static final String DB_TABLE_NAME = "${Company}_SYS_BOI2";

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "BOPropertyValue";
	/**
	 * 业务对象编码
	 */
	public static final String BUSINESS_OBJECT_CODE = "${Company}_SYS_BOPRTYVALUE";

	/**
	 * 属性名称-编码
	 */
	private static final String PROPERTY_CODE_NAME = "Code";

	/**
	 * 名称 属性
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
	 * 属性名称-属性名称
	 */
	private static final String PROPERTY_PROPERTY_NAME = "Property"; // 保持前端一致

	/**
	 * 属性名称 属性
	 */
	@DbField(name = "Property", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<String> PROPERTY_PROPERTY = registerProperty(PROPERTY_PROPERTY_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-属性名称
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_PROPERTY_NAME)
	public final String getPropertyName() {
		return this.getProperty(PROPERTY_PROPERTY);
	}

	/**
	 * 设置-属性名称
	 * 
	 * @param value 值
	 */
	public final void setPropertyName(String value) {
		this.setProperty(PROPERTY_PROPERTY, value);
	}

	/**
	 * 属性名称-值
	 */
	private static final String PROPERTY_VALUE_NAME = "Value";

	/**
	 * 值 属性
	 */
	@DbField(name = "Value", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<String> PROPERTY_VALUE = registerProperty(PROPERTY_VALUE_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-值
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_VALUE_NAME)
	public final String getValue() {
		return this.getProperty(PROPERTY_VALUE);
	}

	/**
	 * 设置-值
	 * 
	 * @param value 值
	 */
	public final void setValue(String value) {
		this.setProperty(PROPERTY_VALUE, value);
	}

	/**
	 * 属性名称-描述
	 */
	private static final String PROPERTY_DESCRIPTION_NAME = "Description";

	/**
	 * 描述 属性
	 */
	@DbField(name = "Descrp", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
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
	 * 重写查询，始终使用主键查询
	 */
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

	/**
	 * 初始化数据
	 */
	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
	}

}
