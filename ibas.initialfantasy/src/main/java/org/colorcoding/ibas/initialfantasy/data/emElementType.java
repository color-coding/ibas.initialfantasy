package org.colorcoding.ibas.initialfantasy.data;

import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.mapping.Value;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 应用元素类型
 * 
 * @author Niuren.Zhu
 *
 */
@XmlType(namespace = MyConfiguration.NAMESPACE_BO)
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
	/** 其他 */
	@Value(value = "O")
	OTHER,
}
