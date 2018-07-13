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
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 获取-业务对象信息
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = BOInformation.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = BOInformation.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
public class BOInformation extends BusinessObject<BOInformation> implements IBOInformation, IBOCustomKey {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = -5064977199603554134L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = BOInformation.class;

	/**
	 * 数据库表
	 */
	public static final String DB_TABLE_NAME = "${Company}_SYS_OBOI";

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "BOInformation";

	/**
	 * 属性名称-编码
	 */
	private static final String PROPERTY_CODE_NAME = "Code";

	/**
	 * 编码 属性
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
	 * @param value
	 *            值
	 */
	public final void setCode(String value) {
		this.setProperty(PROPERTY_CODE, value);
	}

	/**
	 * 属性名称-名称
	 */
	private static final String PROPERTY_NAME_NAME = "Name";

	/**
	 * 名称 属性
	 */
	@DbField(name = "Name", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_NAME = registerProperty(PROPERTY_NAME_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-名称
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_NAME_NAME)
	public final String getName() {
		return this.getProperty(PROPERTY_NAME);
	}

	/**
	 * 设置-名称
	 * 
	 * @param value
	 *            值
	 */
	public final void setName(String value) {
		this.setProperty(PROPERTY_NAME, value);
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
	 * @param value
	 *            值
	 */
	public final void setDescription(String value) {
		this.setProperty(PROPERTY_DESCRIPTION, value);
	}

	/**
	 * 属性名称-映射（表）
	 */
	private static final String PROPERTY_MAPPED_NAME = "Mapped";

	/**
	 * 映射（表） 属性
	 */
	@DbField(name = "Mapped", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_MAPPED = registerProperty(PROPERTY_MAPPED_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-映射（表）
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_MAPPED_NAME)
	public final String getMapped() {
		return this.getProperty(PROPERTY_MAPPED);
	}

	/**
	 * 设置-映射（表）
	 * 
	 * @param value
	 *            值
	 */
	public final void setMapped(String value) {
		this.setProperty(PROPERTY_MAPPED, value);
	}

	/**
	 * 属性名称-对象类型
	 */
	private static final String PROPERTY_OBJECTTYPE_NAME = "ObjectType";

	/**
	 * 对象类型 属性
	 */
	@DbField(name = "ObjectType", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_OBJECTTYPE = registerProperty(PROPERTY_OBJECTTYPE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-对象类型
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_OBJECTTYPE_NAME)
	public final String getObjectType() {
		return this.getProperty(PROPERTY_OBJECTTYPE);
	}

	/**
	 * 设置-对象类型
	 * 
	 * @param value
	 *            值
	 */
	public final void setObjectType(String value) {
		this.setProperty(PROPERTY_OBJECTTYPE, value);
	}

	/**
	 * 属性名称-业务对象属性信息
	 */
	private static final String PROPERTY_BOPROPERTYINFORMATIONS_NAME = "BOPropertyInformations";

	/**
	 * 业务对象属性信息的集合属性
	 * 
	 */
	public static final IPropertyInfo<IBOPropertyInformations> PROPERTY_BOPROPERTYINFORMATIONS = registerProperty(
			PROPERTY_BOPROPERTYINFORMATIONS_NAME, IBOPropertyInformations.class, MY_CLASS);

	/**
	 * 获取-业务对象属性信息集合
	 * 
	 * @return 值
	 */
	@XmlElementWrapper(name = PROPERTY_BOPROPERTYINFORMATIONS_NAME)
	@XmlElement(name = BOPropertyInformation.BUSINESS_OBJECT_NAME, type = BOPropertyInformation.class)
	public final IBOPropertyInformations getBOPropertyInformations() {
		return this.getProperty(PROPERTY_BOPROPERTYINFORMATIONS);
	}

	/**
	 * 设置-业务对象属性信息集合
	 * 
	 * @param value
	 *            值
	 */
	public final void setBOPropertyInformations(IBOPropertyInformations value) {
		this.setProperty(PROPERTY_BOPROPERTYINFORMATIONS, value);
	}

	/**
	 * 初始化数据
	 */
	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
		this.setBOPropertyInformations(new BOPropertyInformations(this));

	}

}
