package org.colorcoding.ibas.initialfantasy.data;

import org.colorcoding.ibas.bobas.mapping.Value;

public enum emApprovalStepOwnerType {

	/**
	 * 指定用户
	 */
	@Value(value = "U")
	USER,
	/**
	 * 直接上级
	 */
	@Value(value = "I")
	DIRECT_SUPERIOR,
	/**
	 * 数据所有者
	 */
	@Value(value = "O")
	DATA_OWNER,
	/**
	 * 数据所属组织负责人
	 */
	@Value(value = "G")
	DATA_ORGANIZATION_MANAGER,
	/**
	 * 项目负责人
	 */
	@Value(value = "P")
	PROJECT_MANAGER,
	/**
	 * 项目所属组织负责人
	 */
	@Value(value = "R")
	PROJECT_ORGANIZATION_MANAGER;
}
