package org.colorcoding.ibas.initialfantasy.bo.approvaltemplate;

import org.colorcoding.ibas.bobas.bo.IBOSimpleLine;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emConditionOperation;
import org.colorcoding.ibas.bobas.data.emConditionRelationship;
import org.colorcoding.ibas.initialfantasy.data.emApprovalConditionType;

/**
 * 审批模板步骤条件 接口
 * 
 */
public interface IApprovalTemplateStepCondition extends IBOSimpleLine {

	/**
	 * 获取-编号
	 * 
	 * @return 值
	 */
	Integer getObjectKey();

	/**
	 * 设置-编号
	 * 
	 * @param value
	 *            值
	 */
	void setObjectKey(Integer value);

	/**
	 * 获取-类型
	 * 
	 * @return 值
	 */
	String getObjectCode();

	/**
	 * 设置-类型
	 * 
	 * @param value
	 *            值
	 */
	void setObjectCode(String value);

	/**
	 * 获取-行号
	 * 
	 * @return 值
	 */
	Integer getLineId();

	/**
	 * 设置-行号
	 * 
	 * @param value
	 *            值
	 */
	void setLineId(Integer value);

	/**
	 * 获取-步骤行号
	 * 
	 * @return 值
	 */
	Integer getStepLineId();

	/**
	 * 设置-步骤行号
	 * 
	 * @param value
	 *            值
	 */
	void setStepLineId(Integer value);

	/**
	 * 获取-实例号（版本）
	 * 
	 * @return 值
	 */
	Integer getLogInst();

	/**
	 * 设置-实例号（版本）
	 * 
	 * @param value
	 *            值
	 */
	void setLogInst(Integer value);

	/**
	 * 获取-数据源
	 * 
	 * @return 值
	 */
	String getDataSource();

	/**
	 * 设置-数据源
	 * 
	 * @param value
	 *            值
	 */
	void setDataSource(String value);

	/**
	 * 获取-创建日期
	 * 
	 * @return 值
	 */
	DateTime getCreateDate();

	/**
	 * 设置-创建日期
	 * 
	 * @param value
	 *            值
	 */
	void setCreateDate(DateTime value);

	/**
	 * 获取-创建时间
	 * 
	 * @return 值
	 */
	Short getCreateTime();

	/**
	 * 设置-创建时间
	 * 
	 * @param value
	 *            值
	 */
	void setCreateTime(Short value);

	/**
	 * 获取-修改日期
	 * 
	 * @return 值
	 */
	DateTime getUpdateDate();

	/**
	 * 设置-修改日期
	 * 
	 * @param value
	 *            值
	 */
	void setUpdateDate(DateTime value);

	/**
	 * 获取-修改时间
	 * 
	 * @return 值
	 */
	Short getUpdateTime();

	/**
	 * 设置-修改时间
	 * 
	 * @param value
	 *            值
	 */
	void setUpdateTime(Short value);

	/**
	 * 获取-创建用户
	 * 
	 * @return 值
	 */
	Integer getCreateUserSign();

	/**
	 * 设置-创建用户
	 * 
	 * @param value
	 *            值
	 */
	void setCreateUserSign(Integer value);

	/**
	 * 获取-修改用户
	 * 
	 * @return 值
	 */
	Integer getUpdateUserSign();

	/**
	 * 设置-修改用户
	 * 
	 * @param value
	 *            值
	 */
	void setUpdateUserSign(Integer value);

	/**
	 * 获取-创建动作标识
	 * 
	 * @return 值
	 */
	String getCreateActionId();

	/**
	 * 设置-创建动作标识
	 * 
	 * @param value
	 *            值
	 */
	void setCreateActionId(String value);

	/**
	 * 获取-更新动作标识
	 * 
	 * @return 值
	 */
	String getUpdateActionId();

	/**
	 * 设置-更新动作标识
	 * 
	 * @param value
	 *            值
	 */
	void setUpdateActionId(String value);

	/**
	 * 获取-参考1
	 * 
	 * @return 值
	 */
	String getReference1();

	/**
	 * 设置-参考1
	 * 
	 * @param value
	 *            值
	 */
	void setReference1(String value);

	/**
	 * 获取-参考2
	 * 
	 * @return 值
	 */
	String getReference2();

	/**
	 * 设置-参考2
	 * 
	 * @param value
	 *            值
	 */
	void setReference2(String value);

	/**
	 * 获取-比较的类型
	 * 
	 * @return 值
	 */
	emApprovalConditionType getConditionType();

	/**
	 * 设置-比较的类型
	 * 
	 * @param value
	 *            值
	 */
	void setConditionType(emApprovalConditionType value);

	/**
	 * 获取-取值属性
	 * 
	 * @return 值
	 */
	String getPropertyName();

	/**
	 * 设置-取值属性
	 * 
	 * @param value
	 *            值
	 */
	void setPropertyName(String value);

	/**
	 * 设置-取值属性
	 * 
	 * @param value
	 *            值
	 */
	void setPropertyName(IPropertyInfo<?> property);

	/**
	 * 获取-比较的值
	 * 
	 * @return 值
	 */
	String getConditionValue();

	/**
	 * 设置-比较的值
	 * 
	 * @param value
	 *            值
	 */
	void setConditionValue(String value);

	/**
	 * 设置-比较的值
	 * 
	 * @param value
	 *            值
	 */
	void setConditionValue(Object value);

	/**
	 * 获取-比较的方法
	 * 
	 * @return 值
	 */
	emConditionOperation getOperation();

	/**
	 * 设置-比较的方法
	 * 
	 * @param value
	 *            值
	 */
	void setOperation(emConditionOperation value);

	/**
	 * 获取-与上一个条件的关系
	 * 
	 * @return 值
	 */
	emConditionRelationship getRelationship();

	/**
	 * 设置-与上一个条件的关系
	 * 
	 * @param value
	 *            值
	 */
	void setRelationship(emConditionRelationship value);

	/**
	 * 获取-开括号数
	 * 
	 * @return 值
	 */
	Integer getBracketOpen();

	/**
	 * 设置-开括号数
	 * 
	 * @param value
	 *            值
	 */
	void setBracketOpen(Integer value);

	/**
	 * 获取-闭括号数
	 * 
	 * @return 值
	 */
	Integer getBracketClose();

	/**
	 * 设置-闭括号数
	 * 
	 * @param value
	 *            值
	 */
	void setBracketClose(Integer value);
}
