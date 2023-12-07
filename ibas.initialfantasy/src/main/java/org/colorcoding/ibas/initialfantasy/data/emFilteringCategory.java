package org.colorcoding.ibas.initialfantasy.data;

import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.mapping.Value;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 筛选的种类
 * 
 * @author Niuren.Zhu
 *
 */
@XmlType(namespace = MyConfiguration.NAMESPACE_BO)
public enum emFilteringCategory {
	/**
	 * 读取
	 */
	@Value(value = "R")
	READ,
	/**
	 * 保存
	 */
	@Value(value = "S")
	SAVE,
	/**
	 * 新建
	 */
	@Value(value = "N")
	CREATE,
	/**
	 * 更新
	 */
	@Value(value = "U")
	UPDATE,
	/**
	 * 删除
	 */
	@Value(value = "D")
	DELETE
}
