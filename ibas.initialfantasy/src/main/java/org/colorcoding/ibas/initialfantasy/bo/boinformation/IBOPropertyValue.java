package org.colorcoding.ibas.initialfantasy.bo.boinformation;

import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.data.emYesNo;

/**
 * 业务对象属性值 接口
 * 
 */
public interface IBOPropertyValue extends IBusinessObject {

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
	 * 获取-属性名称
	 * 
	 * @return 值
	 */
	String getPropertyName();

	/**
	 * 设置-属性名称
	 * 
	 * @param value 值
	 */
	void setPropertyName(String value);

	/**
	 * 获取-值
	 * 
	 * @return 值
	 */
	String getValue();

	/**
	 * 设置-值
	 * 
	 * @param value 值
	 */
	void setValue(String value);

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

	/**
	 * 获取-默认值
	 * 
	 * @return 值
	 */
	emYesNo getDefault();

	/**
	 * 设置-默认值
	 * 
	 * @param value 值
	 */
	void setDefault(emYesNo value);

	/**
	 * 获取-显示顺序
	 * 
	 * @return 值
	 */
	Integer getVisOrder();

	/**
	 * 设置-显示顺序
	 * 
	 * @param value 值
	 */
	void setVisOrder(Integer value);
}
