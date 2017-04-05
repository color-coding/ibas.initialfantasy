package org.colorcoding.ibas.initialfantasy.data;

import org.colorcoding.ibas.bobas.mapping.Value;

/**
 * 权限来源
 * 
 * @author Niuren.Zhu
 *
 */
public enum emPrivilegeSource {
	/** 模块设置 */
	@Value(value = "M")
	MODULE,
	/** 应用设置 */
	@Value(value = "A")
	APPLICATION,
	/** 业务对象设置 */
	@Value(value = "B")
	BUSINESS_OBJECT
}
