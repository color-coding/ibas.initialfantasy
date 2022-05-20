package org.colorcoding.ibas.initialfantasy.bo.boinformation;

import org.colorcoding.ibas.bobas.bo.IBOSimple;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.initialfantasy.data.emAuthorisedValue;
import org.colorcoding.ibas.initialfantasy.data.emRequiredValue;
import org.colorcoding.ibas.initialfantasy.data.emSearchedValue;

/**
 * 业务对象属性设置 接口
 * 
 */
public interface IBOPropertySetting extends IBOSimple {

	/**
	 * 获取-对象
	 * 
	 * @return 值
	 */
	String getBOCode();

	/**
	 * 设置-对象
	 * 
	 * @param value 值
	 */
	void setBOCode(String value);

	/**
	 * 获取-属性
	 * 
	 * @return 值
	 */
	String getPropertyCode();

	/**
	 * 设置-属性
	 * 
	 * @param value 值
	 */
	void setPropertyCode(String value);

	/**
	 * 获取-身份
	 * 
	 * @return 值
	 */
	String getIdentityCode();

	/**
	 * 设置-身份
	 * 
	 * @param value 值
	 */
	void setIdentityCode(String value);

	/**
	 * 获取-位置
	 * 
	 * @return 值
	 */
	Integer getPosition();

	/**
	 * 设置-位置
	 * 
	 * @param value 值
	 */
	void setPosition(Integer value);

	/**
	 * 获取-检索的
	 * 
	 * @return 值
	 */
	emSearchedValue getSearched();

	/**
	 * 设置-检索的
	 * 
	 * @param value 值
	 */
	void setSearched(emSearchedValue value);

	/**
	 * 获取-权限
	 * 
	 * @return 值
	 */
	emAuthorisedValue getAuthorised();

	/**
	 * 设置-权限
	 * 
	 * @param value 值
	 */
	void setAuthorised(emAuthorisedValue value);

	/**
	 * 获取-必填
	 * 
	 * @return 值
	 */
	emRequiredValue getRequired();

	/**
	 * 设置-必填
	 * 
	 * @param value 值
	 */
	void setRequired(emRequiredValue value);

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
	 * 获取-修改日期
	 * 
	 * @return 值
	 */
	DateTime getUpdateDate();

	/**
	 * 设置-修改日期
	 * 
	 * @param value 值
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
	 * @param value 值
	 */
	void setUpdateTime(Short value);

	/**
	 * 获取-实例号（版本）
	 * 
	 * @return 值
	 */
	Integer getLogInst();

	/**
	 * 设置-实例号（版本）
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
	 * 获取-修改用户
	 * 
	 * @return 值
	 */
	Integer getUpdateUserSign();

	/**
	 * 设置-修改用户
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

}
