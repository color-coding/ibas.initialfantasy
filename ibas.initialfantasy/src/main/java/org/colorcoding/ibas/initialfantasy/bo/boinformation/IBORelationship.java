package org.colorcoding.ibas.initialfantasy.bo.boinformation;

import org.colorcoding.ibas.bobas.bo.IBusinessObject;

/**
 * 业务对象关系 接口
 * 
 */
public interface IBORelationship extends IBusinessObject {

	/**
	 * 获取-编码
	 * 
	 * @return 值
	 */
	String getCode();

	/**
	 * 设置-编码
	 * 
	 * @param value 值
	 */
	void setCode(String value);

	/**
	 * 获取-目标对象
	 * 
	 * @return 值
	 */
	String getTarget();

	/**
	 * 设置-目标对象
	 * 
	 * @param value 值
	 */
	void setTarget(String value);

	/**
	 * 获取-关系
	 * 
	 * @return 值
	 */
	String getRelation();

	/**
	 * 设置-关系
	 * 
	 * @param value 值
	 */
	void setRelation(String value);

	/**
	 * 获取-关联的属性
	 * 
	 * @return 值
	 */
	String getAssociatedProperty();

	/**
	 * 设置-关联的属性
	 * 
	 * @param value 值
	 */
	void setAssociatedProperty(String value);

	/**
	 * 获取-描述
	 * 
	 * @return 值
	 */
	String getDescription();

	/**
	 * 设置-描述
	 * 
	 * @param value 值
	 */
	void setDescription(String value);

}
