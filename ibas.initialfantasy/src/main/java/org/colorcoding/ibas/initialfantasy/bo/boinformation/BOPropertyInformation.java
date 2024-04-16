package org.colorcoding.ibas.initialfantasy.bo.boinformation;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.bo.IBOCustomKey;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 获取-业务对象属性信息
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name = BOPropertyInformation.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlType(name = BOPropertyInformation.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
public class BOPropertyInformation extends BusinessObject<BOPropertyInformation>
		implements IBOPropertyInformation, IBOCustomKey {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = -5689644858131099616L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = BOPropertyInformation.class;

	/**
	 * 数据库表
	 */
	public static final String DB_TABLE_NAME = "${Company}_SYS_BOI1";

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "BOPropertyInformation";

	/**
	 * 属性名称-编码
	 */
	private static final String PROPERTY_CODE_NAME = "Code";

	/**
	 * 名称 属性
	 */
	@DbField(name = "Code", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = true, uniqueKey = true)
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
	@DbField(name = "Property", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = true, uniqueKey = true)
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
	 * 属性名称-映射（字段）
	 */
	private static final String PROPERTY_MAPPED_NAME = "Mapped";

	/**
	 * 映射（字段） 属性
	 */
	@DbField(name = "Mapped", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_MAPPED = registerProperty(PROPERTY_MAPPED_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-映射（字段）
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_MAPPED_NAME)
	public final String getMapped() {
		return this.getProperty(PROPERTY_MAPPED);
	}

	/**
	 * 设置-映射（字段）
	 * 
	 * @param value 值
	 */
	public final void setMapped(String value) {
		this.setProperty(PROPERTY_MAPPED, value);
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
	 * 属性名称-数据类型
	 */
	private static final String PROPERTY_DATATYPE_NAME = "DataType";

	/**
	 * 数据类型 属性
	 */
	@DbField(name = "DataType", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_DATATYPE = registerProperty(PROPERTY_DATATYPE_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-数据类型
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_DATATYPE_NAME)
	public final String getDataType() {
		return this.getProperty(PROPERTY_DATATYPE);
	}

	/**
	 * 设置-数据类型
	 * 
	 * @param value 值
	 */
	public final void setDataType(String value) {
		this.setProperty(PROPERTY_DATATYPE, value);
	}

	/**
	 * 属性名称-编辑类型
	 */
	private static final String PROPERTY_EDITTYPE_NAME = "EditType";

	/**
	 * 编辑类型 属性
	 */
	@DbField(name = "EditType", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_EDITTYPE = registerProperty(PROPERTY_EDITTYPE_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-编辑类型
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_EDITTYPE_NAME)
	public final String getEditType() {
		return this.getProperty(PROPERTY_EDITTYPE);
	}

	/**
	 * 设置-编辑类型
	 * 
	 * @param value 值
	 */
	public final void setEditType(String value) {
		this.setProperty(PROPERTY_EDITTYPE, value);
	}

	/**
	 * 属性名称-编辑大小
	 */
	private static final String PROPERTY_EDITSIZE_NAME = "EditSize";

	/**
	 * 编辑大小 属性
	 */
	@DbField(name = "EditSize", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_EDITSIZE = registerProperty(PROPERTY_EDITSIZE_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-编辑大小
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_EDITSIZE_NAME)
	public final Integer getEditSize() {
		return this.getProperty(PROPERTY_EDITSIZE);
	}

	/**
	 * 设置-编辑大小
	 * 
	 * @param value 值
	 */
	public final void setEditSize(Integer value) {
		this.setProperty(PROPERTY_EDITSIZE, value);
	}

	/**
	 * 属性名称-检索的
	 */
	private static final String PROPERTY_SEARCHED_NAME = "Searched";

	/**
	 * 检索的 属性
	 */
	@DbField(name = "Searched", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emYesNo> PROPERTY_SEARCHED = registerProperty(PROPERTY_SEARCHED_NAME,
			emYesNo.class, MY_CLASS);

	/**
	 * 获取-检索的
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SEARCHED_NAME)
	public final emYesNo getSearched() {
		return this.getProperty(PROPERTY_SEARCHED);
	}

	/**
	 * 设置-检索的
	 * 
	 * @param value 值
	 */
	public final void setSearched(emYesNo value) {
		this.setProperty(PROPERTY_SEARCHED, value);
	}

	/**
	 * 属性名称-系统的
	 */
	private static final String PROPERTY_SYSTEMED_NAME = "Systemed";

	/**
	 * 系统的 属性
	 */
	@DbField(name = "Systemed", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emYesNo> PROPERTY_SYSTEMED = registerProperty(PROPERTY_SYSTEMED_NAME,
			emYesNo.class, MY_CLASS);

	/**
	 * 获取-系统的
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SYSTEMED_NAME)
	public final emYesNo getSystemed() {
		return this.getProperty(PROPERTY_SYSTEMED);
	}

	/**
	 * 设置-系统的
	 * 
	 * @param value 值
	 */
	public final void setSystemed(emYesNo value) {
		this.setProperty(PROPERTY_SYSTEMED, value);
	}

	/**
	 * 属性名称-链接的对象
	 */
	private static final String PROPERTY_LINKEDOBJECT_NAME = "LinkedObject";

	/**
	 * 链接的对象 属性
	 */
	@DbField(name = "LinkedObject", type = DbFieldType.MEMO, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_LINKEDOBJECT = registerProperty(PROPERTY_LINKEDOBJECT_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-链接的对象
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_LINKEDOBJECT_NAME)
	public final String getLinkedObject() {
		return this.getProperty(PROPERTY_LINKEDOBJECT);
	}

	/**
	 * 设置-链接的对象
	 * 
	 * @param value 值
	 */
	public final void setLinkedObject(String value) {
		this.setProperty(PROPERTY_LINKEDOBJECT, value);
	}

	/**
	 * 属性名称-值选择方式
	 */
	private static final String PROPERTY_VALUECHOOSETYPE_NAME = "ValueChooseType";

	/**
	 * 值选择方式 属性
	 */
	@DbField(name = "VChosType", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_VALUECHOOSETYPE = registerProperty(PROPERTY_VALUECHOOSETYPE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-值选择方式
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_VALUECHOOSETYPE_NAME)
	public final String getValueChooseType() {
		return this.getProperty(PROPERTY_VALUECHOOSETYPE);
	}

	/**
	 * 设置-值选择方式
	 * 
	 * @param value 值
	 */
	public final void setValueChooseType(String value) {
		this.setProperty(PROPERTY_VALUECHOOSETYPE, value);
	}

	/**
	 * 属性名称-业务对象属性信息
	 */
	private static final String PROPERTY_BOPROPERTYVALUES_NAME = "BOPropertyValues";

	/**
	 * 业务对象属性信息的集合属性
	 * 
	 */
	public static final IPropertyInfo<IBOPropertyValues> PROPERTY_BOPROPERTYVALUES = registerProperty(
			PROPERTY_BOPROPERTYVALUES_NAME, IBOPropertyValues.class, MY_CLASS);

	/**
	 * 获取-业务对象属性值集合
	 * 
	 * @return 值
	 */
	@XmlElementWrapper(name = PROPERTY_BOPROPERTYVALUES_NAME)
	@XmlElement(name = BOPropertyValue.BUSINESS_OBJECT_NAME, type = BOPropertyValue.class)
	public final IBOPropertyValues getBOPropertyValues() {
		return this.getProperty(PROPERTY_BOPROPERTYVALUES);
	}

	/**
	 * 设置-业务对象属性值集合
	 * 
	 * @param value 值
	 */
	public final void setBOPropertyValues(IBOPropertyValues value) {
		this.setProperty(PROPERTY_BOPROPERTYVALUES, value);
	}

	/**
	 * 初始化数据
	 */
	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
		this.setBOPropertyValues(new BOPropertyValues(this));

	}

}
