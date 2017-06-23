package org.colorcoding.ibas.initialfantasy.bo.boinformation;

import org.colorcoding.ibas.bobas.bo.IBusinessObject;

/**
 * 业务对象信息 接口
 * 
 */
public interface IBOInformation extends IBusinessObject {

	/**
	 * 获取-编码
	 * 
	 * @return 值
	 */
	String getCode();

	/**
	 * 设置-编码
	 * 
	 * @param value
	 *            值
	 */
	void setCode(String value);

	/**
	 * 获取-名称
	 * 
	 * @return 值
	 */
	String getName();

	/**
	 * 设置-名称
	 * 
	 * @param value
	 *            值
	 */
	void setName(String value);

	/**
	 * 获取-描述
	 * 
	 * @return 值
	 */
	String getDescription();

	/**
	 * 设置-描述
	 * 
	 * @param value
	 *            值
	 */
	void setDescription(String value);

	/**
	 * 获取-映射（表）
	 * 
	 * @return 值
	 */
	String getMapped();

	/**
	 * 设置-映射（表）
	 * 
	 * @param value
	 *            值
	 */
	void setMapped(String value);

	/**
	 * 获取-对象类型
	 * 
	 * @return 值
	 */
	String getObjectType();

	/**
	 * 设置-对象类型
	 * 
	 * @param value
	 *            值
	 */
	void setObjectType(String value);

	/**
	 * 获取-业务对象属性信息集合
	 * 
	 * @return 值
	 */
	IBOPropertyInformations getBOPropertyInformations();

	/**
	 * 设置-业务对象属性信息集合
	 * 
	 * @param value
	 *            值
	 */
	void setBOPropertyInformations(IBOPropertyInformations value);

}
