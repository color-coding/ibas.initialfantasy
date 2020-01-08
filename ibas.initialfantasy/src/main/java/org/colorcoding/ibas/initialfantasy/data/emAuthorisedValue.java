package org.colorcoding.ibas.initialfantasy.data;

import org.colorcoding.ibas.bobas.mapping.Value;

public enum emAuthorisedValue {
	/**
	 * 默认值
	 */
	@Value("-")
	DEFAULT,
	/**
	 * 完全
	 */
	@Value("A")
	ALL,
	/**
	 * 只读
	 */
	@Value("R")
	READ,
	/**
	 * 没有
	 */
	@Value("N")
	NONE;
}
