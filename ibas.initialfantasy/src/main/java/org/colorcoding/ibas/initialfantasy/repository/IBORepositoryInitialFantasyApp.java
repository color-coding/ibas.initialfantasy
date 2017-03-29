package org.colorcoding.ibas.initialfantasy.repository;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationMessages;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.emApprovalResult;
import org.colorcoding.ibas.bobas.repository.IBORepositoryApplication;
import org.colorcoding.ibas.initialfantasy.bo.applications.IApplicationFunction;
import org.colorcoding.ibas.initialfantasy.bo.applications.IApplicationModule;
import org.colorcoding.ibas.initialfantasy.bo.applications.IApplicationPlatform;
import org.colorcoding.ibas.initialfantasy.bo.approvalrequest.IApprovalRequest;
import org.colorcoding.ibas.initialfantasy.bo.approvaltemplate.IApprovalTemplate;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.IBOCriteria;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.IBOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.IBOInformation;
import org.colorcoding.ibas.initialfantasy.bo.organizations.IOrganization;
import org.colorcoding.ibas.initialfantasy.bo.organizations.IOrganizationalStructure;
import org.colorcoding.ibas.initialfantasy.bo.organizations.IRole;
import org.colorcoding.ibas.initialfantasy.bo.organizations.IUser;
import org.colorcoding.ibas.initialfantasy.bo.ownership.IOwnership;
import org.colorcoding.ibas.initialfantasy.bo.privilege.IPrivilege;

/**
 * InitialFantasy仓库应用
 */
public interface IBORepositoryInitialFantasyApp extends IBORepositoryApplication {

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象信息
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	IOperationResult<IBOInformation> fetchBOInformation(ICriteria criteria);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序功能
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	IOperationResult<IApplicationFunction> fetchApplicationFunction(ICriteria criteria);

	/**
	 * 保存-应用程序功能
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	IOperationResult<IApplicationFunction> saveApplicationFunction(IApplicationFunction bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序模块
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	IOperationResult<IApplicationModule> fetchApplicationModule(ICriteria criteria);

	/**
	 * 保存-应用程序模块
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	IOperationResult<IApplicationModule> saveApplicationModule(IApplicationModule bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序平台
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	IOperationResult<IApplicationPlatform> fetchApplicationPlatform(ICriteria criteria);

	/**
	 * 保存-应用程序平台
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	IOperationResult<IApplicationPlatform> saveApplicationPlatform(IApplicationPlatform bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-审批模板
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	IOperationResult<IApprovalTemplate> fetchApprovalTemplate(ICriteria criteria);

	/**
	 * 保存-审批模板
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	IOperationResult<IApprovalTemplate> saveApprovalTemplate(IApprovalTemplate bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-审批记录
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	IOperationResult<IApprovalRequest> fetchApprovalRequest(ICriteria criteria);

	/**
	 * 保存-审批记录
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	IOperationResult<IApprovalRequest> saveApprovalRequest(IApprovalRequest bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象检索条件
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	IOperationResult<IBOCriteria> fetchBOCriteria(ICriteria criteria);

	/**
	 * 保存-业务对象检索条件
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	IOperationResult<IBOCriteria> saveBOCriteria(IBOCriteria bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象筛选
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	IOperationResult<IBOFiltering> fetchBOFiltering(ICriteria criteria);

	/**
	 * 保存-业务对象筛选
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	IOperationResult<IBOFiltering> saveBOFiltering(IBOFiltering bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-组织
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	IOperationResult<IOrganization> fetchOrganization(ICriteria criteria);

	/**
	 * 保存-组织
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	IOperationResult<IOrganization> saveOrganization(IOrganization bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-组织-结构
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	IOperationResult<IOrganizationalStructure> fetchOrganizationalStructure(ICriteria criteria);

	/**
	 * 保存-组织-结构
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	IOperationResult<IOrganizationalStructure> saveOrganizationalStructure(IOrganizationalStructure bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-数据权限
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	IOperationResult<IOwnership> fetchOwnership(ICriteria criteria);

	/**
	 * 保存-数据权限
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	IOperationResult<IOwnership> saveOwnership(IOwnership bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-系统权限
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	IOperationResult<IPrivilege> fetchPrivilege(ICriteria criteria);

	/**
	 * 保存-系统权限
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	IOperationResult<IPrivilege> savePrivilege(IPrivilege bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-角色
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	IOperationResult<IRole> fetchRole(ICriteria criteria);

	/**
	 * 保存-角色
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	IOperationResult<IRole> saveRole(IRole bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-用户
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	IOperationResult<IUser> fetchUser(ICriteria criteria);

	/**
	 * 保存-用户
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	IOperationResult<IUser> saveUser(IUser bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 审批操作
	 * 
	 * @param apRequestId
	 *            审批请求编号
	 * @param apStepId
	 *            审批请求步骤编号
	 * @param apResult
	 *            审批的结果
	 * @param judgment
	 *            审批意见
	 * @param token
	 *            口令
	 * @return
	 */
	IOperationMessages approval(int apRequestId, int apStepId, emApprovalResult apResult, String judgment,
			String token);
	// --------------------------------------------------------------------------------------------//

}
