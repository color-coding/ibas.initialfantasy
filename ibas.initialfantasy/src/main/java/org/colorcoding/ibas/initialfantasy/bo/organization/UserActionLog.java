package org.colorcoding.ibas.initialfantasy.bo.organization;

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
* 用户动作日志
* 
*/
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = UserActionLog.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = UserActionLog.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@BusinessObjectUnit(code = UserActionLog.BUSINESS_OBJECT_CODE)
public class UserActionLog extends BusinessObject<UserActionLog> implements IUserActionLog {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 9066864717127585567L;

	/**
	* 当前类型
	*/
	private static final Class<?> MY_CLASS = UserActionLog.class;

	/**
	* 数据库表
	*/
	public static final String DB_TABLE_NAME = "${Company}_SYS_USERACTLOG";

	/**
	* 业务对象编码
	*/
	public static final String BUSINESS_OBJECT_CODE = "${Company}_SYS_USERACTLOG";

	/**
	* 业务对象名称
	*/
	public static final String BUSINESS_OBJECT_NAME = "UserActionLog";

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
	@DbField(name = "ObjectCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
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
	* 属性名称-实例号
	*/
	private static final String PROPERTY_LOGINST_NAME = "LogInst";

	/**
	* 实例号 属性
	*/
	@DbField(name = "LogInst", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<Integer> PROPERTY_LOGINST = registerProperty(PROPERTY_LOGINST_NAME, Integer.class,
			MY_CLASS);

	/**
	* 获取-实例号
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_LOGINST_NAME)
	public final Integer getLogInst() {
		return this.getProperty(PROPERTY_LOGINST);
	}

	/**
	* 设置-实例号
	* 
	* @param value 值
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
	@DbField(name = "Series", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
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
	* @param value 值
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
	@DbField(name = "DataSource", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
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
	@DbField(name = "CreateDate", type = DbFieldType.DATE, table = DB_TABLE_NAME)
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
	@DbField(name = "CreateTime", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
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
	* 属性名称-更新日期
	*/
	private static final String PROPERTY_UPDATEDATE_NAME = "UpdateDate";

	/**
	* 更新日期 属性
	*/
	@DbField(name = "UpdateDate", type = DbFieldType.DATE, table = DB_TABLE_NAME)
	public static final IPropertyInfo<DateTime> PROPERTY_UPDATEDATE = registerProperty(PROPERTY_UPDATEDATE_NAME,
			DateTime.class, MY_CLASS);

	/**
	* 获取-更新日期
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_UPDATEDATE_NAME)
	public final DateTime getUpdateDate() {
		return this.getProperty(PROPERTY_UPDATEDATE);
	}

	/**
	* 设置-更新日期
	* 
	* @param value 值
	*/
	public final void setUpdateDate(DateTime value) {
		this.setProperty(PROPERTY_UPDATEDATE, value);
	}

	/**
	* 属性名称-更新时间
	*/
	private static final String PROPERTY_UPDATETIME_NAME = "UpdateTime";

	/**
	* 更新时间 属性
	*/
	@DbField(name = "UpdateTime", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<Short> PROPERTY_UPDATETIME = registerProperty(PROPERTY_UPDATETIME_NAME,
			Short.class, MY_CLASS);

	/**
	* 获取-更新时间
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_UPDATETIME_NAME)
	public final Short getUpdateTime() {
		return this.getProperty(PROPERTY_UPDATETIME);
	}

	/**
	* 设置-更新时间
	* 
	* @param value 值
	*/
	public final void setUpdateTime(Short value) {
		this.setProperty(PROPERTY_UPDATETIME, value);
	}

	/**
	* 属性名称-创建用户
	*/
	private static final String PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";

	/**
	* 创建用户 属性
	*/
	@DbField(name = "Creator", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
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
	* 属性名称-更新用户
	*/
	private static final String PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";

	/**
	* 更新用户 属性
	*/
	@DbField(name = "Updator", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<Integer> PROPERTY_UPDATEUSERSIGN = registerProperty(PROPERTY_UPDATEUSERSIGN_NAME,
			Integer.class, MY_CLASS);

	/**
	* 获取-更新用户
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_UPDATEUSERSIGN_NAME)
	public final Integer getUpdateUserSign() {
		return this.getProperty(PROPERTY_UPDATEUSERSIGN);
	}

	/**
	* 设置-更新用户
	* 
	* @param value 值
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
	@DbField(name = "CreateActId", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
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
	@DbField(name = "UpdateActId", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
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
	* 属性名称-数据所有者
	*/
	private static final String PROPERTY_DATAOWNER_NAME = "DataOwner";

	/**
	* 数据所有者 属性
	*/
	@DbField(name = "DataOwner", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<Integer> PROPERTY_DATAOWNER = registerProperty(PROPERTY_DATAOWNER_NAME,
			Integer.class, MY_CLASS);

	/**
	* 获取-数据所有者
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_DATAOWNER_NAME)
	public final Integer getDataOwner() {
		return this.getProperty(PROPERTY_DATAOWNER);
	}

	/**
	* 设置-数据所有者
	* 
	* @param value 值
	*/
	public final void setDataOwner(Integer value) {
		this.setProperty(PROPERTY_DATAOWNER, value);
	}

	/**
	* 属性名称-动作
	*/
	private static final String PROPERTY_ACTION_NAME = "Action";

	/**
	* 动作 属性
	*/
	@DbField(name = "Action", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_ACTION = registerProperty(PROPERTY_ACTION_NAME, String.class,
			MY_CLASS);

	/**
	* 获取-动作
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_ACTION_NAME)
	public final String getAction() {
		return this.getProperty(PROPERTY_ACTION);
	}

	/**
	* 设置-动作
	* 
	* @param value 值
	*/
	public final void setAction(String value) {
		this.setProperty(PROPERTY_ACTION, value);
	}

	/**
	* 属性名称-用户编号
	*/
	private static final String PROPERTY_USERID_NAME = "UserId";

	/**
	* 用户编号 属性
	*/
	@DbField(name = "UserId", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<Integer> PROPERTY_USERID = registerProperty(PROPERTY_USERID_NAME, Integer.class,
			MY_CLASS);

	/**
	* 获取-用户编号
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_USERID_NAME)
	public final Integer getUserId() {
		return this.getProperty(PROPERTY_USERID);
	}

	/**
	* 设置-用户编号
	* 
	* @param value 值
	*/
	public final void setUserId(Integer value) {
		this.setProperty(PROPERTY_USERID, value);
	}

	/**
	* 属性名称-用户名称
	*/
	private static final String PROPERTY_USERNAME_NAME = "UserName";

	/**
	* 用户名称 属性
	*/
	@DbField(name = "UserName", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_USERNAME = registerProperty(PROPERTY_USERNAME_NAME, String.class,
			MY_CLASS);

	/**
	* 获取-用户名称
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_USERNAME_NAME)
	public final String getUserName() {
		return this.getProperty(PROPERTY_USERNAME);
	}

	/**
	* 设置-用户名称
	* 
	* @param value 值
	*/
	public final void setUserName(String value) {
		this.setProperty(PROPERTY_USERNAME, value);
	}

	/**
	* 属性名称-开始日期
	*/
	private static final String PROPERTY_STARTDATE_NAME = "StartDate";

	/**
	* 开始日期 属性
	*/
	@DbField(name = "StartDate", type = DbFieldType.DATE, table = DB_TABLE_NAME)
	public static final IPropertyInfo<DateTime> PROPERTY_STARTDATE = registerProperty(PROPERTY_STARTDATE_NAME,
			DateTime.class, MY_CLASS);

	/**
	* 获取-开始日期
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_STARTDATE_NAME)
	public final DateTime getStartDate() {
		return this.getProperty(PROPERTY_STARTDATE);
	}

	/**
	* 设置-开始日期
	* 
	* @param value 值
	*/
	public final void setStartDate(DateTime value) {
		this.setProperty(PROPERTY_STARTDATE, value);
	}

	/**
	* 属性名称-开始时间
	*/
	private static final String PROPERTY_STARTTIME_NAME = "StartTime";

	/**
	* 开始时间 属性
	*/
	@DbField(name = "StartTime", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<Short> PROPERTY_STARTTIME = registerProperty(PROPERTY_STARTTIME_NAME, Short.class,
			MY_CLASS);

	/**
	* 获取-开始时间
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_STARTTIME_NAME)
	public final Short getStartTime() {
		return this.getProperty(PROPERTY_STARTTIME);
	}

	/**
	* 设置-开始时间
	* 
	* @param value 值
	*/
	public final void setStartTime(Short value) {
		this.setProperty(PROPERTY_STARTTIME, value);
	}

	/**
	* 属性名称-结束日期
	*/
	private static final String PROPERTY_ENDDATE_NAME = "EndDate";

	/**
	* 结束日期 属性
	*/
	@DbField(name = "EndDate", type = DbFieldType.DATE, table = DB_TABLE_NAME)
	public static final IPropertyInfo<DateTime> PROPERTY_ENDDATE = registerProperty(PROPERTY_ENDDATE_NAME,
			DateTime.class, MY_CLASS);

	/**
	* 获取-结束日期
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_ENDDATE_NAME)
	public final DateTime getEndDate() {
		return this.getProperty(PROPERTY_ENDDATE);
	}

	/**
	* 设置-结束日期
	* 
	* @param value 值
	*/
	public final void setEndDate(DateTime value) {
		this.setProperty(PROPERTY_ENDDATE, value);
	}

	/**
	* 属性名称-结束时间
	*/
	private static final String PROPERTY_ENDTIME_NAME = "EndTime";

	/**
	* 结束时间 属性
	*/
	@DbField(name = "EndTime", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<Short> PROPERTY_ENDTIME = registerProperty(PROPERTY_ENDTIME_NAME, Short.class,
			MY_CLASS);

	/**
	* 获取-结束时间
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_ENDTIME_NAME)
	public final Short getEndTime() {
		return this.getProperty(PROPERTY_ENDTIME);
	}

	/**
	* 设置-结束时间
	* 
	* @param value 值
	*/
	public final void setEndTime(Short value) {
		this.setProperty(PROPERTY_ENDTIME, value);
	}

	/**
	* 属性名称-内容
	*/
	private static final String PROPERTY_CONTENT_NAME = "Content";

	/**
	* 内容 属性
	*/
	@DbField(name = "Content", type = DbFieldType.MEMO, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_CONTENT = registerProperty(PROPERTY_CONTENT_NAME, String.class,
			MY_CLASS);

	/**
	* 获取-内容
	* 
	* @return 值
	*/
	@XmlElement(name = PROPERTY_CONTENT_NAME)
	public final String getContent() {
		return this.getProperty(PROPERTY_CONTENT);
	}

	/**
	* 设置-内容
	* 
	* @param value 值
	*/
	public final void setContent(String value) {
		this.setProperty(PROPERTY_CONTENT, value);
	}

	/**
	* 初始化数据
	*/
	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
		this.setObjectCode(MyConfiguration.applyVariables(BUSINESS_OBJECT_CODE));
		this.setStartDate(DateTime.getToday());
		this.setStartTime(Short.valueOf(DateTime.getNow().toString("HHmm")));
	}

}
