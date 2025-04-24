package org.colorcoding.ibas.initialfantasy.data;

import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.common.Value;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 权限来源
 * 
 * @author Niuren.Zhu
 *
 */
@XmlType(namespace = MyConfiguration.NAMESPACE_BO)
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
