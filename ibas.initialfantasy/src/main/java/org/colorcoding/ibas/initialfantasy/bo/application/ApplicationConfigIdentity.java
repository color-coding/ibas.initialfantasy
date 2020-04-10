package org.colorcoding.ibas.initialfantasy.bo.application;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.mapping.BusinessObjectUnit;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 应用程序配置-身份
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = ApplicationConfigIdentity.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = ApplicationConfigIdentity.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@BusinessObjectUnit(code = ApplicationConfigIdentity.BUSINESS_OBJECT_CODE)
public class ApplicationConfigIdentity extends BusinessObject<ApplicationConfigIdentity>
		implements IApplicationConfigIdentity {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = -6168411798137150504L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = ApplicationConfigIdentity.class;

	/**
	 * 数据库表
	 */
	public static final String DB_TABLE_NAME = "${Company}_SYS_CONFIG1";

	/**
	 * 业务对象编码
	 */
	public static final String BUSINESS_OBJECT_CODE = "${Company}_SYS_CONFIDENTITY";

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "ApplicationConfigIdentity";

	/**
	 * 属性名称-角色标识
	 */
	private static final String PROPERTY_ROLECODE_NAME = "RoleCode";

	/**
	 * 角色标识 属性
	 */
	@DbField(name = "RoleCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_ROLECODE = registerProperty(PROPERTY_ROLECODE_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-角色标识
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ROLECODE_NAME)
	public final String getRoleCode() {
		return this.getProperty(PROPERTY_ROLECODE);
	}

	/**
	 * 设置-角色标识
	 * 
	 * @param value 值
	 */
	public final void setRoleCode(String value) {
		this.setProperty(PROPERTY_ROLECODE, value);
	}

	/**
	 * 属性名称-身份标识
	 */
	private static final String PROPERTY_IDENTITYCODE_NAME = "IdentityCode";

	/**
	 * 身份标识 属性
	 */
	@DbField(name = "IdentityCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_IDENTITYCODE = registerProperty(PROPERTY_IDENTITYCODE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-身份标识
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_IDENTITYCODE_NAME)
	public final String getIdentityCode() {
		return this.getProperty(PROPERTY_IDENTITYCODE);
	}

	/**
	 * 设置-身份标识
	 * 
	 * @param value 值
	 */
	public final void setIdentityCode(String value) {
		this.setProperty(PROPERTY_IDENTITYCODE, value);
	}

	/**
	 * 属性名称-配置组
	 */
	private static final String PROPERTY_CONFIGGROUP_NAME = "ConfigGroup";

	/**
	 * 配置组 属性
	 */
	@DbField(name = "ConfigGroup", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_CONFIGGROUP = registerProperty(PROPERTY_CONFIGGROUP_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-配置组
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CONFIGGROUP_NAME)
	public final String getConfigGroup() {
		return this.getProperty(PROPERTY_CONFIGGROUP);
	}

	/**
	 * 设置-配置组
	 * 
	 * @param value 值
	 */
	public final void setConfigGroup(String value) {
		this.setProperty(PROPERTY_CONFIGGROUP, value);
	}

	/**
	 * 属性名称-配置项
	 */
	private static final String PROPERTY_CONFIGKEY_NAME = "ConfigKey";

	/**
	 * 配置项 属性
	 */
	@DbField(name = "ConfigKey", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_CONFIGKEY = registerProperty(PROPERTY_CONFIGKEY_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-配置项
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CONFIGKEY_NAME)
	public final String getConfigKey() {
		return this.getProperty(PROPERTY_CONFIGKEY);
	}

	/**
	 * 设置-配置项
	 * 
	 * @param value 值
	 */
	public final void setConfigKey(String value) {
		this.setProperty(PROPERTY_CONFIGKEY, value);
	}

	/**
	 * 属性名称-配置值
	 */
	private static final String PROPERTY_CONFIGVALUE_NAME = "ConfigValue";

	/**
	 * 配置值 属性
	 */
	@DbField(name = "ConfigValue", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_CONFIGVALUE = registerProperty(PROPERTY_CONFIGVALUE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-配置值
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CONFIGVALUE_NAME)
	public final String getConfigValue() {
		return this.getProperty(PROPERTY_CONFIGVALUE);
	}

	/**
	 * 设置-配置值
	 * 
	 * @param value 值
	 */
	public final void setConfigValue(String value) {
		this.setProperty(PROPERTY_CONFIGVALUE, value);
	}

	/**
	 * 属性名称-对象键值
	 */
	private static final String PROPERTY_OBJECTKEY_NAME = "ObjectKey";

	/**
	 * 对象键值 属性
	 */
	@DbField(name = "ObjectKey", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<Integer> PROPERTY_OBJECTKEY = registerProperty(PROPERTY_OBJECTKEY_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-对象键值
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_OBJECTKEY_NAME)
	public final Integer getObjectKey() {
		return this.getProperty(PROPERTY_OBJECTKEY);
	}

	/**
	 * 设置-对象键值
	 * 
	 * @param value 值
	 */
	public final void setObjectKey(Integer value) {
		this.setProperty(PROPERTY_OBJECTKEY, value);
	}

	/**
	 * 属性名称-对象类型
	 */
	private static final String PROPERTY_OBJECTCODE_NAME = "ObjectCode";

	/**
	 * 对象类型 属性
	 */
	@DbField(name = "ObjectCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_OBJECTCODE = registerProperty(PROPERTY_OBJECTCODE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-对象类型
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_OBJECTCODE_NAME)
	public final String getObjectCode() {
		return this.getProperty(PROPERTY_OBJECTCODE);
	}

	/**
	 * 设置-对象类型
	 * 
	 * @param value 值
	 */
	public final void setObjectCode(String value) {
		this.setProperty(PROPERTY_OBJECTCODE, value);
	}

	/**
	 * 属性名称-数据源
	 */
	private static final String PROPERTY_DATASOURCE_NAME = "DataSource";

	/**
	 * 数据源 属性
	 */
	@DbField(name = "DataSource", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_DATASOURCE = registerProperty(PROPERTY_DATASOURCE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-数据源
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_DATASOURCE_NAME)
	public final String getDataSource() {
		return this.getProperty(PROPERTY_DATASOURCE);
	}

	/**
	 * 设置-数据源
	 * 
	 * @param value 值
	 */
	public final void setDataSource(String value) {
		this.setProperty(PROPERTY_DATASOURCE, value);
	}

	/**
	 * 属性名称-创建日期
	 */
	private static final String PROPERTY_CREATEDATE_NAME = "CreateDate";

	/**
	 * 创建日期 属性
	 */
	@DbField(name = "CreateDate", type = DbFieldType.DATE, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<DateTime> PROPERTY_CREATEDATE = registerProperty(PROPERTY_CREATEDATE_NAME,
			DateTime.class, MY_CLASS);

	/**
	 * 获取-创建日期
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CREATEDATE_NAME)
	public final DateTime getCreateDate() {
		return this.getProperty(PROPERTY_CREATEDATE);
	}

	/**
	 * 设置-创建日期
	 * 
	 * @param value 值
	 */
	public final void setCreateDate(DateTime value) {
		this.setProperty(PROPERTY_CREATEDATE, value);
	}

	/**
	 * 属性名称-创建时间
	 */
	private static final String PROPERTY_CREATETIME_NAME = "CreateTime";

	/**
	 * 创建时间 属性
	 */
	@DbField(name = "CreateTime", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Short> PROPERTY_CREATETIME = registerProperty(PROPERTY_CREATETIME_NAME,
			Short.class, MY_CLASS);

	/**
	 * 获取-创建时间
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CREATETIME_NAME)
	public final Short getCreateTime() {
		return this.getProperty(PROPERTY_CREATETIME);
	}

	/**
	 * 设置-创建时间
	 * 
	 * @param value 值
	 */
	public final void setCreateTime(Short value) {
		this.setProperty(PROPERTY_CREATETIME, value);
	}

	/**
	 * 属性名称-修改日期
	 */
	private static final String PROPERTY_UPDATEDATE_NAME = "UpdateDate";

	/**
	 * 修改日期 属性
	 */
	@DbField(name = "UpdateDate", type = DbFieldType.DATE, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<DateTime> PROPERTY_UPDATEDATE = registerProperty(PROPERTY_UPDATEDATE_NAME,
			DateTime.class, MY_CLASS);

	/**
	 * 获取-修改日期
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATEDATE_NAME)
	public final DateTime getUpdateDate() {
		return this.getProperty(PROPERTY_UPDATEDATE);
	}

	/**
	 * 设置-修改日期
	 * 
	 * @param value 值
	 */
	public final void setUpdateDate(DateTime value) {
		this.setProperty(PROPERTY_UPDATEDATE, value);
	}

	/**
	 * 属性名称-修改时间
	 */
	private static final String PROPERTY_UPDATETIME_NAME = "UpdateTime";

	/**
	 * 修改时间 属性
	 */
	@DbField(name = "UpdateTime", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Short> PROPERTY_UPDATETIME = registerProperty(PROPERTY_UPDATETIME_NAME,
			Short.class, MY_CLASS);

	/**
	 * 获取-修改时间
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATETIME_NAME)
	public final Short getUpdateTime() {
		return this.getProperty(PROPERTY_UPDATETIME);
	}

	/**
	 * 设置-修改时间
	 * 
	 * @param value 值
	 */
	public final void setUpdateTime(Short value) {
		this.setProperty(PROPERTY_UPDATETIME, value);
	}

	/**
	 * 属性名称-创建动作标识
	 */
	private static final String PROPERTY_CREATEACTIONID_NAME = "CreateActionId";

	/**
	 * 创建动作标识 属性
	 */
	@DbField(name = "CreateActId", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_CREATEACTIONID = registerProperty(PROPERTY_CREATEACTIONID_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-创建动作标识
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CREATEACTIONID_NAME)
	public final String getCreateActionId() {
		return this.getProperty(PROPERTY_CREATEACTIONID);
	}

	/**
	 * 设置-创建动作标识
	 * 
	 * @param value 值
	 */
	public final void setCreateActionId(String value) {
		this.setProperty(PROPERTY_CREATEACTIONID, value);
	}

	/**
	 * 属性名称-更新动作标识
	 */
	private static final String PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";

	/**
	 * 更新动作标识 属性
	 */
	@DbField(name = "UpdateActId", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_UPDATEACTIONID = registerProperty(PROPERTY_UPDATEACTIONID_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-更新动作标识
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATEACTIONID_NAME)
	public final String getUpdateActionId() {
		return this.getProperty(PROPERTY_UPDATEACTIONID);
	}

	/**
	 * 设置-更新动作标识
	 * 
	 * @param value 值
	 */
	public final void setUpdateActionId(String value) {
		this.setProperty(PROPERTY_UPDATEACTIONID, value);
	}

	/**
	 * 属性名称-实例号（版本）
	 */
	private static final String PROPERTY_LOGINST_NAME = "LogInst";

	/**
	 * 实例号（版本） 属性
	 */
	@DbField(name = "LogInst", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_LOGINST = registerProperty(PROPERTY_LOGINST_NAME, Integer.class,
			MY_CLASS);

	/**
	 * 获取-实例号（版本）
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_LOGINST_NAME)
	public final Integer getLogInst() {
		return this.getProperty(PROPERTY_LOGINST);
	}

	/**
	 * 设置-实例号（版本）
	 * 
	 * @param value 值
	 */
	public final void setLogInst(Integer value) {
		this.setProperty(PROPERTY_LOGINST, value);
	}

	/**
	 * 属性名称-创建用户
	 */
	private static final String PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";

	/**
	 * 创建用户 属性
	 */
	@DbField(name = "Creator", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_CREATEUSERSIGN = registerProperty(PROPERTY_CREATEUSERSIGN_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-创建用户
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CREATEUSERSIGN_NAME)
	public final Integer getCreateUserSign() {
		return this.getProperty(PROPERTY_CREATEUSERSIGN);
	}

	/**
	 * 设置-创建用户
	 * 
	 * @param value 值
	 */
	public final void setCreateUserSign(Integer value) {
		this.setProperty(PROPERTY_CREATEUSERSIGN, value);
	}

	/**
	 * 属性名称-修改用户
	 */
	private static final String PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";

	/**
	 * 修改用户 属性
	 */
	@DbField(name = "Updator", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_UPDATEUSERSIGN = registerProperty(PROPERTY_UPDATEUSERSIGN_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-修改用户
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATEUSERSIGN_NAME)
	public final Integer getUpdateUserSign() {
		return this.getProperty(PROPERTY_UPDATEUSERSIGN);
	}

	/**
	 * 设置-修改用户
	 * 
	 * @param value 值
	 */
	public final void setUpdateUserSign(Integer value) {
		this.setProperty(PROPERTY_UPDATEUSERSIGN, value);
	}

	/**
	 * 初始化数据
	 */
	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
		this.setObjectCode(MyConfiguration.applyVariables(BUSINESS_OBJECT_CODE));

	}

}
