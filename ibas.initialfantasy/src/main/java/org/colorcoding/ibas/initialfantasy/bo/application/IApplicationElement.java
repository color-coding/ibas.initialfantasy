package org.colorcoding.ibas.initialfantasy.bo.application;

import org.colorcoding.ibas.bobas.bo.IBOSimple;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.initialfantasy.data.emElementType;

/**
 * 应用程序元素 接口
 * 
 */
public interface IApplicationElement extends IBOSimple {

	/**
	 * 获取-模块标识
	 * 
	 * @return 值
	 */
	String getModuleId();

	/**
	 * 设置-模块标识
	 * 
	 * @param value
	 *            值
	 */
	void setModuleId(String value);

	/**
	 * 获取-元素标识
	 * 
	 * @return 值
	 */
	String getElementId();

	/**
	 * 设置-元素标识
	 * 
	 * @param value
	 *            值
	 */
	void setElementId(String value);

	/**
	 * 获取-元素名称
	 * 
	 * @return 值
	 */
	String getElementName();

	/**
	 * 设置-元素名称
	 * 
	 * @param value
	 *            值
	 */
	void setElementName(String value);

	/**
	 * 获取-元素类型
	 * 
	 * @return 值
	 */
	emElementType getElementType();

	/**
	 * 设置-元素类型
	 * 
	 * @param value
	 *            值
	 */
	void setElementType(emElementType value);

	/**
	 * 获取-对象键值
	 * 
	 * @return 值
	 */
	Integer getObjectKey();

	/**
	 * 设置-对象键值
	 * 
	 * @param value
	 *            值
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
	 * @param value
	 *            值
	 */
	void setObjectCode(String value);

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

}
