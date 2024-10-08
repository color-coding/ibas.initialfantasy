package org.colorcoding.ibas.initialfantasy.bo.boinformation;

import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.data.emYesNo;

/**
 * 业务对象属性信息 接口
 * 
 */
public interface IBOPropertyInformation extends IBusinessObject {

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
	 * 获取-映射（字段）
	 * 
	 * @return 值
	 */
	String getMapped();

	/**
	 * 设置-映射（字段）
	 * 
	 * @param value 值
	 */
	void setMapped(String value);

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
	 * 获取-数据类型
	 * 
	 * @return 值
	 */
	String getDataType();

	/**
	 * 设置-数据类型
	 * 
	 * @param value 值
	 */
	void setDataType(String value);

	/**
	 * 获取-编辑类型
	 * 
	 * @return 值
	 */
	String getEditType();

	/**
	 * 设置-编辑类型
	 * 
	 * @param value 值
	 */
	void setEditType(String value);

	/**
	 * 获取-编辑大小
	 * 
	 * @return 值
	 */
	Integer getEditSize();

	/**
	 * 设置-编辑大小
	 * 
	 * @param value 值
	 */
	void setEditSize(Integer value);

	/**
	 * 获取-检索的
	 * 
	 * @return 值
	 */
	emYesNo getSearched();

	/**
	 * 设置-检索的
	 * 
	 * @param value 值
	 */
	void setSearched(emYesNo value);

	/**
	 * 获取-系统的
	 * 
	 * @return 值
	 */
	emYesNo getSystemed();

	/**
	 * 设置-系统的
	 * 
	 * @param value 值
	 */
	void setSystemed(emYesNo value);

	/**
	 * 获取-链接的对象
	 * 
	 * @return 值
	 */
	String getLinkedObject();

	/**
	 * 设置-链接的对象
	 * 
	 * @param value 值
	 */
	void setLinkedObject(String value);

	/**
	 * 获取-值选择方式
	 * 
	 * @return 值
	 */
	String getValueChooseType();

	/**
	 * 设置-值选择方式
	 * 
	 * @param value 值
	 */
	void setValueChooseType(String value);

	/**
	* 获取-触发属性
	* 
	* @return 值
	*/
	String getTriggerByProperty();

	/**
	* 设置-触发属性
	* 
	* @param value 值
	*/
	void setTriggerByProperty(String value);

	/**
	 * 获取-业务对象属性值集合
	 * 
	 * @return 值
	 */
	IBOPropertyValues getBOPropertyValues();

	/**
	 * 设置-业务对象属性值集合
	 * 
	 * @param value 值
	 */
	void setBOPropertyValues(IBOPropertyValues value);
}
