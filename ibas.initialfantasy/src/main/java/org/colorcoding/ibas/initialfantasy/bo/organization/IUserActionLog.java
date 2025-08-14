package org.colorcoding.ibas.initialfantasy.bo.organization;

import org.colorcoding.ibas.bobas.bo.IBOSimple;
import org.colorcoding.ibas.bobas.data.DateTime;

/**
* 用户动作日志 接口
* 
*/
public interface IUserActionLog extends IBOSimple {

	/**
	* 获取-对象编号
	* 
	* @return 值
	*/
	Integer getObjectKey();

	/**
	* 设置-对象编号
	* 
	* @param value 值
	*/
	void setObjectKey(Integer value);

	/**
	* 获取-对象类型
	* 
	* @return 值
	*/
	String getObjectCode();

	/**
	* 设置-对象类型
	* 
	* @param value 值
	*/
	void setObjectCode(String value);

	/**
	* 获取-实例号
	* 
	* @return 值
	*/
	Integer getLogInst();

	/**
	* 设置-实例号
	* 
	* @param value 值
	*/
	void setLogInst(Integer value);

	/**
	* 获取-服务系列
	* 
	* @return 值
	*/
	Integer getSeries();

	/**
	* 设置-服务系列
	* 
	* @param value 值
	*/
	void setSeries(Integer value);

	/**
	* 获取-数据源
	* 
	* @return 值
	*/
	String getDataSource();

	/**
	* 设置-数据源
	* 
	* @param value 值
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
	* @param value 值
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
	* @param value 值
	*/
	void setCreateTime(Short value);

	/**
	* 获取-更新日期
	* 
	* @return 值
	*/
	DateTime getUpdateDate();

	/**
	* 设置-更新日期
	* 
	* @param value 值
	*/
	void setUpdateDate(DateTime value);

	/**
	* 获取-更新时间
	* 
	* @return 值
	*/
	Short getUpdateTime();

	/**
	* 设置-更新时间
	* 
	* @param value 值
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
	* @param value 值
	*/
	void setCreateUserSign(Integer value);

	/**
	* 获取-更新用户
	* 
	* @return 值
	*/
	Integer getUpdateUserSign();

	/**
	* 设置-更新用户
	* 
	* @param value 值
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
	* @param value 值
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
	* @param value 值
	*/
	void setUpdateActionId(String value);

	/**
	* 获取-数据所有者
	* 
	* @return 值
	*/
	Integer getDataOwner();

	/**
	* 设置-数据所有者
	* 
	* @param value 值
	*/
	void setDataOwner(Integer value);

	/**
	* 获取-动作
	* 
	* @return 值
	*/
	String getAction();

	/**
	* 设置-动作
	* 
	* @param value 值
	*/
	void setAction(String value);

	/**
	* 获取-用户编号
	* 
	* @return 值
	*/
	Integer getUserId();

	/**
	* 设置-用户编号
	* 
	* @param value 值
	*/
	void setUserId(Integer value);

	/**
	* 获取-用户名称
	* 
	* @return 值
	*/
	String getUserName();

	/**
	* 设置-用户名称
	* 
	* @param value 值
	*/
	void setUserName(String value);

	/**
	* 获取-开始日期
	* 
	* @return 值
	*/
	DateTime getStartDate();

	/**
	* 设置-开始日期
	* 
	* @param value 值
	*/
	void setStartDate(DateTime value);

	/**
	* 获取-开始时间
	* 
	* @return 值
	*/
	Short getStartTime();

	/**
	* 设置-开始时间
	* 
	* @param value 值
	*/
	void setStartTime(Short value);

	/**
	* 获取-结束日期
	* 
	* @return 值
	*/
	DateTime getEndDate();

	/**
	* 设置-结束日期
	* 
	* @param value 值
	*/
	void setEndDate(DateTime value);

	/**
	* 获取-结束时间
	* 
	* @return 值
	*/
	Short getEndTime();

	/**
	* 设置-结束时间
	* 
	* @param value 值
	*/
	void setEndTime(Short value);

	/**
	* 获取-内容
	* 
	* @return 值
	*/
	String getContent();

	/**
	* 设置-内容
	* 
	* @param value 值
	*/
	void setContent(String value);

}
