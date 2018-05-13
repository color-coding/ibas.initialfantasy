package org.colorcoding.ibas.initialfantasy.data;

import org.colorcoding.ibas.bobas.mapping.Value;

/**
 * 应用元素类型
 * 
 * @author Niuren.Zhu
 *
 */
public enum emElementType {
	/** 模块 */
	@Value(value = "M")
	MODULE,
	/** 功能 */
	@Value(value = "F")
	FUNCTION,
	/** 应用 */
	@Value(value = "A")
	APPLICATION,
	/** 服务 */
	@Value(value = "S")
	SERVICE,
}
