package org.colorcoding.ibas.initialfantasy.data;

import org.colorcoding.ibas.bobas.mapping.Value;

/**
 * 期间状态
 * 
 * @author Niuren.Zhu
 *
 */
public enum emPeriodStatus {
	/**
	 * 打开
	 */
	@Value(value = "O")
	OPEN,
	/**
	 * 锁定
	 */
	@Value(value = "L")
	LOCKED,
	/**
	 * 结算
	 */
	@Value(value = "C")
	CLOSED
}
