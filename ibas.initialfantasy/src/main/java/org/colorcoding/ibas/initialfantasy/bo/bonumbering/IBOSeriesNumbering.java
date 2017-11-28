package org.colorcoding.ibas.initialfantasy.bo.bonumbering;

import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.data.emYesNo;

/**
 * 业务对象序列编号方式 接口
 * 
 */
public interface IBOSeriesNumbering extends IBusinessObject {

	/**
	 * 获取-对象编码
	 * 
	 * @return 值
	 */
	String getObjectCode();

	/**
	 * 设置-对象编码
	 * 
	 * @param value
	 *            值
	 */
	void setObjectCode(String value);

	/**
	 * 获取-序列
	 * 
	 * @return 值
	 */
	Integer getSeries();

	/**
	 * 设置-序列
	 * 
	 * @param value
	 *            值
	 */
	void setSeries(Integer value);

	/**
	 * 获取-序列名称
	 * 
	 * @return 值
	 */
	String getSeriesName();

	/**
	 * 设置-序列名称
	 * 
	 * @param value
	 *            值
	 */
	void setSeriesName(String value);

	/**
	 * 获取-下一个序号
	 * 
	 * @return 值
	 */
	Integer getNextNumber();

	/**
	 * 设置-下一个序号
	 * 
	 * @param value
	 *            值
	 */
	void setNextNumber(Integer value);

	/**
	 * 获取-已锁定
	 * 
	 * @return 值
	 */
	emYesNo getLocked();

	/**
	 * 设置-已锁定
	 * 
	 * @param value
	 *            值
	 */
	void setLocked(emYesNo value);

	/**
	 * 获取-模板
	 * 
	 * @return 值
	 */
	String getTemplate();

	/**
	 * 设置-模板
	 * 
	 * @param value
	 *            值
	 */
	void setTemplate(String value);

}
