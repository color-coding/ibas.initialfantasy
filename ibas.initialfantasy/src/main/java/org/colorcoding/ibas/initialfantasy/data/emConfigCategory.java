package org.colorcoding.ibas.initialfantasy.data;

import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.mapping.Value;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 配置种类
 * 
 * @author Niuren.Zhu
 *
 */
@XmlType(namespace = MyConfiguration.NAMESPACE_BO)
public enum emConfigCategory {
	/**
	 * 服务端
	 */
	@Value("S")
	SERVER,
	/**
	 * 客户端
	 */
	@Value("C")
	CLIENT,
	/**
	 * 全部
	 */
	@Value("A")
	ALL,

}
