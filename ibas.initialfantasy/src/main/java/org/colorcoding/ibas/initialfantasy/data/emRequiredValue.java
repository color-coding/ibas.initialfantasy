package org.colorcoding.ibas.initialfantasy.data;

import org.colorcoding.ibas.bobas.mapping.Value;

public enum emRequiredValue {
	/**
	 * 默认值
	 */
	@Value("-")
	DEFAULT,
	/**
	 * 否
	 */
	@Value("N")
	NO,
	/**
	 * 是
	 */
	@Value("Y")
	YES;
}
