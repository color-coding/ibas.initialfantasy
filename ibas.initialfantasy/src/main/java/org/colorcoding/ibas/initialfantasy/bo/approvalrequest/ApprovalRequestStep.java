package org.colorcoding.ibas.initialfantasy.bo.approvalrequest;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emApprovalStepStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;
import org.colorcoding.ibas.initialfantasy.MyConsts;

/**
 * 获取-审批请求步骤
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = ApprovalRequestStep.BUSINESS_OBJECT_NAME, namespace = MyConsts.NAMESPACE_BO)
public class ApprovalRequestStep extends BusinessObject<ApprovalRequestStep> implements IApprovalRequestStep {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 4783147811069146869L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = ApprovalRequestStep.class;

	/**
	 * 数据库表
	 */
	public static final String DB_TABLE_NAME = "${Company}_AP_ARQ1";

	/**
	 * 业务对象编码
	 */
	public static final String BUSINESS_OBJECT_CODE = "${Company}_AP_APPROVALREQU";

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "ApprovalRequestStep";

	/**
	 * 属性名称-编号
	 */
	private static final String PROPERTY_OBJECTKEY_NAME = "ObjectKey";

	/**
	 * 编号 属性
	 */
	@DbField(name = "ObjectKey", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<Integer> PROPERTY_OBJECTKEY = registerProperty(PROPERTY_OBJECTKEY_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-编号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_OBJECTKEY_NAME)
	public final Integer getObjectKey() {
		return this.getProperty(PROPERTY_OBJECTKEY);
	}

	/**
	 * 设置-编号
	 * 
	 * @param value
	 *            值
	 */
	public final void setObjectKey(Integer value) {
		this.setProperty(PROPERTY_OBJECTKEY, value);
	}

	/**
	 * 属性名称-类型
	 */
	private static final String PROPERTY_OBJECTCODE_NAME = "ObjectCode";

	/**
	 * 类型 属性
	 */
	@DbField(name = "Object", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_OBJECTCODE = registerProperty(PROPERTY_OBJECTCODE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-类型
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_OBJECTCODE_NAME)
	public final String getObjectCode() {
		return this.getProperty(PROPERTY_OBJECTCODE);
	}

	/**
	 * 设置-类型
	 * 
	 * @param value
	 *            值
	 */
	public final void setObjectCode(String value) {
		this.setProperty(PROPERTY_OBJECTCODE, value);
	}

	/**
	 * 属性名称-行号
	 */
	private static final String PROPERTY_LINEID_NAME = "LineId";

	/**
	 * 行号 属性
	 */
	@DbField(name = "LineId", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<Integer> PROPERTY_LINEID = registerProperty(PROPERTY_LINEID_NAME, Integer.class,
			MY_CLASS);

	/**
	 * 获取-行号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_LINEID_NAME)
	public final Integer getLineId() {
		return this.getProperty(PROPERTY_LINEID);
	}

	/**
	 * 设置-行号
	 * 
	 * @param value
	 *            值
	 */
	public final void setLineId(Integer value) {
		this.setProperty(PROPERTY_LINEID, value);
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
	 * 属性名称-参考1
	 */
	private static final String PROPERTY_REFERENCE1_NAME = "Reference1";

	/**
	 * 参考1 属性
	 */
	@DbField(name = "Ref1", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_REFERENCE1 = registerProperty(PROPERTY_REFERENCE1_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-参考1
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_REFERENCE1_NAME)
	public final String getReference1() {
		return this.getProperty(PROPERTY_REFERENCE1);
	}

	/**
	 * 设置-参考1
	 * 
	 * @param value
	 *            值
	 */
	public final void setReference1(String value) {
		this.setProperty(PROPERTY_REFERENCE1, value);
	}

	/**
	 * 属性名称-参考2
	 */
	private static final String PROPERTY_REFERENCE2_NAME = "Reference2";

	/**
	 * 参考2 属性
	 */
	@DbField(name = "Ref2", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_REFERENCE2 = registerProperty(PROPERTY_REFERENCE2_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-参考2
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_REFERENCE2_NAME)
	public final String getReference2() {
		return this.getProperty(PROPERTY_REFERENCE2);
	}

	/**
	 * 设置-参考2
	 * 
	 * @param value
	 *            值
	 */
	public final void setReference2(String value) {
		this.setProperty(PROPERTY_REFERENCE2, value);
	}

	/**
	 * 属性名称-步骤名称
	 */
	private static final String PROPERTY_STEPNAME_NAME = "StepName";

	/**
	 * 步骤名称 属性
	 */
	@DbField(name = "StepName", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_STEPNAME = registerProperty(PROPERTY_STEPNAME_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-步骤名称
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_STEPNAME_NAME)
	public final String getStepName() {
		return this.getProperty(PROPERTY_STEPNAME);
	}

	/**
	 * 设置-步骤名称
	 * 
	 * @param value
	 *            值
	 */
	public final void setStepName(String value) {
		this.setProperty(PROPERTY_STEPNAME, value);
	}

	/**
	 * 属性名称-步骤所有者
	 */
	private static final String PROPERTY_STEPOWNER_NAME = "StepOwner";

	/**
	 * 步骤所有者 属性
	 */
	@DbField(name = "StepOwner", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_STEPOWNER = registerProperty(PROPERTY_STEPOWNER_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-步骤所有者
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_STEPOWNER_NAME)
	public final Integer getStepOwner() {
		return this.getProperty(PROPERTY_STEPOWNER);
	}

	/**
	 * 设置-步骤所有者
	 * 
	 * @param value
	 *            值
	 */
	public final void setStepOwner(Integer value) {
		this.setProperty(PROPERTY_STEPOWNER, value);
	}

	/**
	 * 属性名称-步骤执行顺序
	 */
	private static final String PROPERTY_STEPORDER_NAME = "StepOrder";

	/**
	 * 步骤执行顺序 属性
	 */
	@DbField(name = "StepOrder", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_STEPORDER = registerProperty(PROPERTY_STEPORDER_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-步骤执行顺序
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_STEPORDER_NAME)
	public final Integer getStepOrder() {
		return this.getProperty(PROPERTY_STEPORDER);
	}

	/**
	 * 设置-步骤执行顺序
	 * 
	 * @param value
	 *            值
	 */
	public final void setStepOrder(Integer value) {
		this.setProperty(PROPERTY_STEPORDER, value);
	}

	/**
	 * 属性名称-步骤状态
	 */
	private static final String PROPERTY_STEPSTATUS_NAME = "StepStatus";

	/**
	 * 步骤状态 属性
	 */
	@DbField(name = "StepStatus", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emApprovalStepStatus> PROPERTY_STEPSTATUS = registerProperty(
			PROPERTY_STEPSTATUS_NAME, emApprovalStepStatus.class, MY_CLASS);

	/**
	 * 获取-步骤状态
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_STEPSTATUS_NAME)
	public final emApprovalStepStatus getStepStatus() {
		return this.getProperty(PROPERTY_STEPSTATUS);
	}

	/**
	 * 设置-步骤状态
	 * 
	 * @param value
	 *            值
	 */
	public final void setStepStatus(emApprovalStepStatus value) {
		this.setProperty(PROPERTY_STEPSTATUS, value);
	}

	/**
	 * 属性名称-步骤条件
	 */
	private static final String PROPERTY_STEPCONDITIONS_NAME = "StepConditions";

	/**
	 * 步骤条件 属性
	 */
	@DbField(name = "StepConditions", type = DbFieldType.MEMO, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_STEPCONDITIONS = registerProperty(PROPERTY_STEPCONDITIONS_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-步骤条件
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_STEPCONDITIONS_NAME)
	public final String getStepConditions() {
		return this.getProperty(PROPERTY_STEPCONDITIONS);
	}

	/**
	 * 设置-步骤条件
	 * 
	 * @param value
	 *            值
	 */
	public final void setStepConditions(String value) {
		this.setProperty(PROPERTY_STEPCONDITIONS, value);
	}

	/**
	 * 属性名称-开始时间
	 */
	private static final String PROPERTY_STARTEDTIME_NAME = "StartedTime";

	/**
	 * 开始时间 属性
	 */
	@DbField(name = "StartTime", type = DbFieldType.DATE, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<DateTime> PROPERTY_STARTEDTIME = registerProperty(PROPERTY_STARTEDTIME_NAME,
			DateTime.class, MY_CLASS);

	/**
	 * 获取-开始时间
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_STARTEDTIME_NAME)
	public final DateTime getStartedTime() {
		return this.getProperty(PROPERTY_STARTEDTIME);
	}

	/**
	 * 设置-开始时间
	 * 
	 * @param value
	 *            值
	 */
	public final void setStartedTime(DateTime value) {
		this.setProperty(PROPERTY_STARTEDTIME, value);
	}

	/**
	 * 属性名称-结束时间
	 */
	private static final String PROPERTY_FINISHEDTIME_NAME = "FinishedTime";

	/**
	 * 结束时间 属性
	 */
	@DbField(name = "FinishTime", type = DbFieldType.DATE, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<DateTime> PROPERTY_FINISHEDTIME = registerProperty(PROPERTY_FINISHEDTIME_NAME,
			DateTime.class, MY_CLASS);

	/**
	 * 获取-结束时间
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_FINISHEDTIME_NAME)
	public final DateTime getFinishedTime() {
		return this.getProperty(PROPERTY_FINISHEDTIME);
	}

	/**
	 * 设置-结束时间
	 * 
	 * @param value
	 *            值
	 */
	public final void setFinishedTime(DateTime value) {
		this.setProperty(PROPERTY_FINISHEDTIME, value);
	}

	/**
	 * 属性名称-审批意见
	 */
	private static final String PROPERTY_JUDGMENT_NAME = "Judgment";

	/**
	 * 审批意见 属性
	 */
	@DbField(name = "Judgment", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_JUDGMENT = registerProperty(PROPERTY_JUDGMENT_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-审批意见
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_JUDGMENT_NAME)
	public final String getJudgment() {
		return this.getProperty(PROPERTY_JUDGMENT);
	}

	/**
	 * 设置-审批意见
	 * 
	 * @param value
	 *            值
	 */
	public final void setJudgment(String value) {
		this.setProperty(PROPERTY_JUDGMENT, value);
	}

	/**
	 * 属性名称-步骤所有者可修改
	 */
	private static final String PROPERTY_STEPCANMODIFY_NAME = "StepCanModify";

	/**
	 * 步骤所有者可修改 属性
	 */
	@DbField(name = "StepModify", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emYesNo> PROPERTY_STEPCANMODIFY = registerProperty(PROPERTY_STEPCANMODIFY_NAME,
			emYesNo.class, MY_CLASS);

	/**
	 * 获取-步骤所有者可修改
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_STEPCANMODIFY_NAME)
	public final emYesNo getStepCanModify() {
		return this.getProperty(PROPERTY_STEPCANMODIFY);
	}

	/**
	 * 设置-步骤所有者可修改
	 * 
	 * @param value
	 *            值
	 */
	public final void setStepCanModify(emYesNo value) {
		this.setProperty(PROPERTY_STEPCANMODIFY, value);
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
