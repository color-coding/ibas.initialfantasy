package org.colorcoding.ibas.initialfantasy.data;

import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.common.Value;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

@XmlType(namespace = MyConfiguration.NAMESPACE_BO)
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
