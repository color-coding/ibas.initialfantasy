package org.colorcoding.ibas.initialfantasy.data;

import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.mapping.Value;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

@XmlType(namespace = MyConfiguration.NAMESPACE_BO)
public enum emSearchedValue {
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
