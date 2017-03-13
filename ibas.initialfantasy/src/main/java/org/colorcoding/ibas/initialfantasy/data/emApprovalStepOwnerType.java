package org.colorcoding.ibas.initialfantasy.data;

import org.colorcoding.ibas.bobas.mapping.Value;

public enum emApprovalStepOwnerType {
	/**
	 * 直接上级
	 */
	@Value(value = "I")
	DirectSuperior,

	/**
	 * 指定用户
	 */
	@Value(value = "U")
	User,

	/**
	 * 数据所有者
	 */
	@Value(value = "O")
	DataOwner,

	/**
	 * 数据所属组织负责人
	 */
	@Value(value = "G")
	DataOrganizationManager,

	/**
	 * 项目负责人
	 */
	@Value(value = "P")
	ProjectManager,

	/**
	 * 项目所属组织负责人
	 */
	@Value(value = "R")
	ProjectOrganizationManager;

	public int getValue() {
		return this.ordinal();
	}

	public static emApprovalStepOwnerType forValue(int value) {
		return values()[value];
	}
}
