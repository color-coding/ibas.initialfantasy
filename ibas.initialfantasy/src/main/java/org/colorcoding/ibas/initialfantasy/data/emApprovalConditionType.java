package org.colorcoding.ibas.initialfantasy.data;

import org.colorcoding.ibas.bobas.mapping.Value;

/**
 * 审批条件比较类型
 * 
 * @author Niuren.Zhu
 * 
 */
public enum emApprovalConditionType {
	/**
	 * 对象属性值
	 */
	@Value(value = "P")
	PROPERTY_VALUE,
	/**
	 * SQL脚本
	 */
	@Value(value = "S")
	SQL_SCRIPT;
}
