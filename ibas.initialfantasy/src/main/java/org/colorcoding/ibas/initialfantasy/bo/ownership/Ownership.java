package org.colorcoding.ibas.initialfantasy.bo.ownership;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emAuthoriseType;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.mapping.BOCode;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;
import org.colorcoding.ibas.initialfantasy.MyConsts;

/**
 * 获取-数据权限
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = Ownership.BUSINESS_OBJECT_NAME, namespace = MyConsts.NAMESPACE_BO)
@XmlRootElement(name = Ownership.BUSINESS_OBJECT_NAME, namespace = MyConsts.NAMESPACE_BO)
@BOCode(Ownership.BUSINESS_OBJECT_CODE)
public class Ownership extends BusinessObject<Ownership> implements IOwnership {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 3886336465444964233L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = Ownership.class;

	/**
	 * 数据库表
	 */
	public static final String DB_TABLE_NAME = "${Company}_SYS_OWNERSHIP";

	/**
	 * 业务对象编码
	 */
	public static final String BUSINESS_OBJECT_CODE = "${Company}_SYS_OWNERSHIP";

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "Ownership";

	/**
	 * 属性名称-用户编码
	 */
	private static final String PROPERTY_USERCODE_NAME = "UserCode";

	/**
	 * 用户编码 属性
	 */
	@DbField(name = "UserCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_USERCODE = registerProperty(PROPERTY_USERCODE_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-用户编码
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_USERCODE_NAME)
	public final String getUserCode() {
		return this.getProperty(PROPERTY_USERCODE);
	}

	/**
	 * 设置-用户编码
	 * 
	 * @param value
	 *            值
	 */
	public final void setUserCode(String value) {
		this.setProperty(PROPERTY_USERCODE, value);
	}

	/**
	 * 属性名称-对象编码
	 */
	private static final String PROPERTY_BOCODE_NAME = "BOCode";

	/**
	 * 对象编码 属性
	 */
	@DbField(name = "BOCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_BOCODE = registerProperty(PROPERTY_BOCODE_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-对象编码
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_BOCODE_NAME)
	public final String getBOCode() {
		return this.getProperty(PROPERTY_BOCODE);
	}

	/**
	 * 设置-对象编码
	 * 
	 * @param value
	 *            值
	 */
	public final void setBOCode(String value) {
		this.setProperty(PROPERTY_BOCODE, value);
	}

	/**
	 * 属性名称-激活
	 */
	private static final String PROPERTY_ACTIVATED_NAME = "Activated";

	/**
	 * 激活 属性
	 */
	@DbField(name = "Activated", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emYesNo> PROPERTY_ACTIVATED = registerProperty(PROPERTY_ACTIVATED_NAME,
			emYesNo.class, MY_CLASS);

	/**
	 * 获取-激活
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ACTIVATED_NAME)
	public final emYesNo getActivated() {
		return this.getProperty(PROPERTY_ACTIVATED);
	}

	/**
	 * 设置-激活
	 * 
	 * @param value
	 *            值
	 */
	public final void setActivated(emYesNo value) {
		this.setProperty(PROPERTY_ACTIVATED, value);
	}

	/**
	 * 属性名称-自身权限
	 */
	private static final String PROPERTY_SELF_NAME = "Self";

	/**
	 * 自身权限 属性
	 */
	@DbField(name = "Self", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emAuthoriseType> PROPERTY_SELF = registerProperty(PROPERTY_SELF_NAME,
			emAuthoriseType.class, MY_CLASS);

	/**
	 * 获取-自身权限
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SELF_NAME)
	public final emAuthoriseType getSelf() {
		return this.getProperty(PROPERTY_SELF);
	}

	/**
	 * 设置-自身权限
	 * 
	 * @param value
	 *            值
	 */
	public final void setSelf(emAuthoriseType value) {
		this.setProperty(PROPERTY_SELF, value);
	}

	/**
	 * 属性名称-部门-下级权限
	 */
	private static final String PROPERTY_LOWERLEVEL_NAME = "LowerLevel";

	/**
	 * 部门-下级权限 属性
	 */
	@DbField(name = "LowerLevel", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emAuthoriseType> PROPERTY_LOWERLEVEL = registerProperty(PROPERTY_LOWERLEVEL_NAME,
			emAuthoriseType.class, MY_CLASS);

	/**
	 * 获取-部门-下级权限
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_LOWERLEVEL_NAME)
	public final emAuthoriseType getLowerLevel() {
		return this.getProperty(PROPERTY_LOWERLEVEL);
	}

	/**
	 * 设置-部门-下级权限
	 * 
	 * @param value
	 *            值
	 */
	public final void setLowerLevel(emAuthoriseType value) {
		this.setProperty(PROPERTY_LOWERLEVEL, value);
	}

	/**
	 * 属性名称-部门-同级权限
	 */
	private static final String PROPERTY_EQUALLEVEL_NAME = "EqualLevel";

	/**
	 * 部门-同级权限 属性
	 */
	@DbField(name = "EqualLevel", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emAuthoriseType> PROPERTY_EQUALLEVEL = registerProperty(PROPERTY_EQUALLEVEL_NAME,
			emAuthoriseType.class, MY_CLASS);

	/**
	 * 获取-部门-同级权限
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_EQUALLEVEL_NAME)
	public final emAuthoriseType getEqualLevel() {
		return this.getProperty(PROPERTY_EQUALLEVEL);
	}

	/**
	 * 设置-部门-同级权限
	 * 
	 * @param value
	 *            值
	 */
	public final void setEqualLevel(emAuthoriseType value) {
		this.setProperty(PROPERTY_EQUALLEVEL, value);
	}

	/**
	 * 属性名称-部门-上级权限
	 */
	private static final String PROPERTY_HIGHERLEVEL_NAME = "HigherLevel";

	/**
	 * 部门-上级权限 属性
	 */
	@DbField(name = "HigherLevel", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emAuthoriseType> PROPERTY_HIGHERLEVEL = registerProperty(
			PROPERTY_HIGHERLEVEL_NAME, emAuthoriseType.class, MY_CLASS);

	/**
	 * 获取-部门-上级权限
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_HIGHERLEVEL_NAME)
	public final emAuthoriseType getHigherLevel() {
		return this.getProperty(PROPERTY_HIGHERLEVEL);
	}

	/**
	 * 设置-部门-上级权限
	 * 
	 * @param value
	 *            值
	 */
	public final void setHigherLevel(emAuthoriseType value) {
		this.setProperty(PROPERTY_HIGHERLEVEL, value);
	}

	/**
	 * 属性名称-团队权限
	 */
	private static final String PROPERTY_TEAMS_NAME = "Teams";

	/**
	 * 团队权限 属性
	 */
	@DbField(name = "Teams", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emAuthoriseType> PROPERTY_TEAMS = registerProperty(PROPERTY_TEAMS_NAME,
			emAuthoriseType.class, MY_CLASS);

	/**
	 * 获取-团队权限
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_TEAMS_NAME)
	public final emAuthoriseType getTeams() {
		return this.getProperty(PROPERTY_TEAMS);
	}

	/**
	 * 设置-团队权限
	 * 
	 * @param value
	 *            值
	 */
	public final void setTeams(emAuthoriseType value) {
		this.setProperty(PROPERTY_TEAMS, value);
	}

	/**
	 * 属性名称-其他情况权限
	 */
	private static final String PROPERTY_OTHERS_NAME = "Others";

	/**
	 * 其他情况权限 属性
	 */
	@DbField(name = "Others", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emAuthoriseType> PROPERTY_OTHERS = registerProperty(PROPERTY_OTHERS_NAME,
			emAuthoriseType.class, MY_CLASS);

	/**
	 * 获取-其他情况权限
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_OTHERS_NAME)
	public final emAuthoriseType getOthers() {
		return this.getProperty(PROPERTY_OTHERS);
	}

	/**
	 * 设置-其他情况权限
	 * 
	 * @param value
	 *            值
	 */
	public final void setOthers(emAuthoriseType value) {
		this.setProperty(PROPERTY_OTHERS, value);
	}

	/**
	 * 属性名称-对象编号
	 */
	private static final String PROPERTY_OBJECTKEY_NAME = "ObjectKey";

	/**
	 * 对象编号 属性
	 */
	@DbField(name = "ObjectKey", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<Integer> PROPERTY_OBJECTKEY = registerProperty(PROPERTY_OBJECTKEY_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-对象编号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_OBJECTKEY_NAME)
	public final Integer getObjectKey() {
		return this.getProperty(PROPERTY_OBJECTKEY);
	}

	/**
	 * 设置-对象编号
	 * 
	 * @param value
	 *            值
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
	 * @param value
	 *            值
	 */
	public final void setObjectCode(String value) {
		this.setProperty(PROPERTY_OBJECTCODE, value);
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
	 */
	public final void setUpdateTime(Short value) {
		this.setProperty(PROPERTY_UPDATETIME, value);
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
	 * @param value
	 *            值
	 */
	public final void setLogInst(Integer value) {
		this.setProperty(PROPERTY_LOGINST, value);
	}

	/**
	 * 属性名称-服务系列
	 */
	private static final String PROPERTY_SERIES_NAME = "Series";

	/**
	 * 服务系列 属性
	 */
	@DbField(name = "Series", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_SERIES = registerProperty(PROPERTY_SERIES_NAME, Integer.class,
			MY_CLASS);

	/**
	 * 获取-服务系列
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SERIES_NAME)
	public final Integer getSeries() {
		return this.getProperty(PROPERTY_SERIES);
	}

	/**
	 * 设置-服务系列
	 * 
	 * @param value
	 *            值
	 */
	public final void setSeries(Integer value) {
		this.setProperty(PROPERTY_SERIES, value);
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
	 * @param value
	 *            值
	 */
	public final void setDataSource(String value) {
		this.setProperty(PROPERTY_DATASOURCE, value);
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
	 */
	public final void setUpdateUserSign(Integer value) {
		this.setProperty(PROPERTY_UPDATEUSERSIGN, value);
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
	 * @param value
	 *            值
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
	 * @param value
	 *            值
	 */
	public final void setUpdateActionId(String value) {
		this.setProperty(PROPERTY_UPDATEACTIONID, value);
	}

	/**
	 * 初始化数据
	 */
	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
		this.setObjectCode(MyConfiguration.applyVariables(BUSINESS_OBJECT_CODE));
		this.setActivated(emYesNo.YES);

	}

}
