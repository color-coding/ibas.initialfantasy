package org.colorcoding.ibas.initialfantasy.bo.ownership;

import org.colorcoding.ibas.bobas.bo.IBOSimple;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emAuthoriseType;
import org.colorcoding.ibas.bobas.data.emYesNo;

/**
 * 数据权限 接口
 * 
 */
public interface IOwnership extends IBOSimple {

	/**
	 * 获取-用户编码
	 * 
	 * @return 值
	 */
	String getUserCode();

	/**
	 * 设置-用户编码
	 * 
	 * @param value
	 *            值
	 */
	void setUserCode(String value);

	/**
	 * 获取-对象编码
	 * 
	 * @return 值
	 */
	String getBOCode();

	/**
	 * 设置-对象编码
	 * 
	 * @param value
	 *            值
	 */
	void setBOCode(String value);

	/**
	 * 获取-激活
	 * 
	 * @return 值
	 */
	emYesNo getActivated();

	/**
	 * 设置-激活
	 * 
	 * @param value
	 *            值
	 */
	void setActivated(emYesNo value);

	/**
	 * 获取-自身权限
	 * 
	 * @return 值
	 */
	emAuthoriseType getSelf();

	/**
	 * 设置-自身权限
	 * 
	 * @param value
	 *            值
	 */
	void setSelf(emAuthoriseType value);

	/**
	 * 获取-部门-下级权限
	 * 
	 * @return 值
	 */
	emAuthoriseType getLowerLevel();

	/**
	 * 设置-部门-下级权限
	 * 
	 * @param value
	 *            值
	 */
	void setLowerLevel(emAuthoriseType value);

	/**
	 * 获取-部门-同级权限
	 * 
	 * @return 值
	 */
	emAuthoriseType getEqualLevel();

	/**
	 * 设置-部门-同级权限
	 * 
	 * @param value
	 *            值
	 */
	void setEqualLevel(emAuthoriseType value);

	/**
	 * 获取-部门-上级权限
	 * 
	 * @return 值
	 */
	emAuthoriseType getHigherLevel();

	/**
	 * 设置-部门-上级权限
	 * 
	 * @param value
	 *            值
	 */
	void setHigherLevel(emAuthoriseType value);

	/**
	 * 获取-团队权限
	 * 
	 * @return 值
	 */
	emAuthoriseType getTeams();

	/**
	 * 设置-团队权限
	 * 
	 * @param value
	 *            值
	 */
	void setTeams(emAuthoriseType value);

	/**
	 * 获取-角色权限
	 * 
	 * @return 值
	 */
	emAuthoriseType getRules();

	/**
	 * 设置-角色权限
	 * 
	 * @param value
	 *            值
	 */
	void setRules(emAuthoriseType value);

	/**
	 * 获取-角色编码
	 * 
	 * @return 值
	 */
	String getRuleCodes();

	/**
	 * 设置-角色编码
	 * 
	 * @param value
	 *            值
	 */
	void setRuleCodes(String value);

	/**
	 * 获取-其他情况权限
	 * 
	 * @return 值
	 */
	emAuthoriseType getOthers();

	/**
	 * 设置-其他情况权限
	 * 
	 * @param value
	 *            值
	 */
	void setOthers(emAuthoriseType value);

	/**
	 * 获取-对象编号
	 * 
	 * @return 值
	 */
	Integer getObjectKey();

	/**
	 * 设置-对象编号
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
	 * 获取-服务系列
	 * 
	 * @return 值
	 */
	Integer getSeries();

	/**
	 * 设置-服务系列
	 * 
	 * @param value
	 *            值
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
	 * @param value
	 *            值
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

}
