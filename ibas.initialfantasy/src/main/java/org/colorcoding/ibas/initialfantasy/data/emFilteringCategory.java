package org.colorcoding.ibas.initialfantasy.data;

import org.colorcoding.ibas.bobas.mapping.Value;

/**
 * 筛选的种类
 * 
 * @author Niuren.Zhu
 *
 */
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
