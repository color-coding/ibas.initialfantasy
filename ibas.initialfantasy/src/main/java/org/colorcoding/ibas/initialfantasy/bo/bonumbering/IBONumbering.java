package org.colorcoding.ibas.initialfantasy.bo.bonumbering;

import org.colorcoding.ibas.bobas.bo.IBusinessObject;

/**
 * 业务对象编号方式 接口
 * 
 */
public interface IBONumbering extends IBusinessObject {

	/**
	 * 获取-对象编码
	 * 
	 * @return 值
	 */
	String getObjectCode();

	/**
	 * 设置-对象编码
	 * 
	 * @param value 值
	 */
	void setObjectCode(String value);

	/**
	 * 获取-自动序号
	 * 
	 * @return 值
	 */
	Integer getAutoKey();

	/**
	 * 设置-自动序号
	 * 
	 * @param value 值
	 */
	void setAutoKey(Integer value);

}
