package org.colorcoding.ibas.initialfantasy.bo.bologst;

import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.data.DateTime;

/**
 * 业务对象日志 接口
 * 
 */
public interface IBOLogst extends IBusinessObject {

	/**
	 * 获取-类型
	 * 
	 * @return 值
	 */
	String getBOCode();

	/**
	 * 设置-类型
	 * 
	 * @param value 值
	 */
	void setBOCode(String value);

	/**
	 * 获取-主键值
	 * 
	 * @return 值
	 */
	String getBOKeys();

	/**
	 * 设置-主键值
	 * 
	 * @param value 值
	 */
	void setBOKeys(String value);

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
	 * 获取-修改用户
	 * 
	 * @return 值
	 */
	Integer getModifyUser();

	/**
	 * 设置-修改用户
	 * 
	 * @param value 值
	 */
	void setModifyUser(Integer value);

	/**
	 * 获取-修改日期
	 * 
	 * @return 值
	 */
	DateTime getModifyDate();

	/**
	 * 设置-修改日期
	 * 
	 * @param value 值
	 */
	void setModifyDate(DateTime value);

	/**
	 * 获取-修改时间
	 * 
	 * @return 值
	 */
	Short getModifyTime();

	/**
	 * 设置-修改时间
	 * 
	 * @param value 值
	 */
	void setModifyTime(Short value);

	/**
	 * 获取-事务标识
	 * 
	 * @return 值
	 */
	String getTransationId();

	/**
	 * 设置-事务标识
	 * 
	 * @param value 值
	 */
	void setTransationId(String value);

	/**
	 * 获取-动机
	 * 
	 * @return 值
	 */
	String getCause();

	/**
	 * 设置-动机
	 * 
	 * @param value 值
	 */
	void setCause(String value);

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
