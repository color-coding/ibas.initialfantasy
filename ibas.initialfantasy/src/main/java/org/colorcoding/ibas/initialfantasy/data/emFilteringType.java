package org.colorcoding.ibas.initialfantasy.data;

import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.mapping.Value;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 筛选类型
 * 
 * @author Niuren.Zhu
 *
 */
@XmlType(namespace = MyConfiguration.NAMESPACE_BO)
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
