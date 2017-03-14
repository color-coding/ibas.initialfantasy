package org.colorcoding.ibas.initialfantasy.bo.applications;

import org.colorcoding.ibas.bobas.bo.IBOSimple;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emYesNo;

/**
 * 应用程序模块 接口
 * 
 */
public interface IApplicationModule extends IBOSimple {

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
	 * 获取-平台标识
	 * 
	 * @return 值
	 */
	String getPlatformId();

	/**
	 * 设置-平台标识
	 * 
	 * @param value
	 *            值
	 */
	void setPlatformId(String value);

	/**
	 * 获取-模块名称
	 * 
	 * @return 值
	 */
	String getModuleName();

	/**
	 * 设置-模块名称
	 * 
	 * @param value
	 *            值
	 */
	void setModuleName(String value);

	/**
	 * 获取-模块类别
	 * 
	 * @return 值
	 */
	String getModuleCategory();

	/**
	 * 设置-模块类别
	 * 
	 * @param value
	 *            值
	 */
	void setModuleCategory(String value);

	/**
	 * 获取-是否可用
	 * 
	 * @return 值
	 */
	emYesNo getActivated();

	/**
	 * 设置-是否可用
	 * 
	 * @param value
	 *            值
	 */
	void setActivated(emYesNo value);

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
