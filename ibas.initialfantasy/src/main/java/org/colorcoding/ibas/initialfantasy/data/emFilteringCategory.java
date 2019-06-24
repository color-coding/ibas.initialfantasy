package org.colorcoding.ibas.initialfantasy.data;

import org.colorcoding.ibas.bobas.mapping.Value;

/**
 * 筛选的种类
 * 
 * @author Niuren.Zhu
 *
 */
public enum emFilteringCategory {
	/**
	 * 读取
	 */
	@Value(value = "R")
	READ,
	/**
	 * 写入
	 */
	@Value(value = "S")
	SAVE
}
