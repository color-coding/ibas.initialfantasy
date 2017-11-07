package org.colorcoding.ibas.initialfantasy.data;

import org.colorcoding.ibas.bobas.mapping.Value;

/**
 * 筛选类型
 * 
 * @author Niuren.Zhu
 *
 */
public enum emFilteringType {
	/**
	 * 不可用的
	 */
	@Value(value = "UNA")
	UNAVAILABLE,
	/**
	 * 可用的
	 */
	@Value(value = "AVB")
	AVAILABLE
}
