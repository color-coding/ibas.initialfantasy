package org.colorcoding.ibas.initialfantasy.repository;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.repository.IBORepositoryApplication;
import org.colorcoding.ibas.initialfantasy.bo.application.IApplicationFunction;
import org.colorcoding.ibas.initialfantasy.bo.application.IApplicationModule;
import org.colorcoding.ibas.initialfantasy.bo.application.IApplicationPlatform;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.IBOCriteria;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.IBOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.IBOInformation;
import org.colorcoding.ibas.initialfantasy.bo.bonumbering.IBONumbering;
import org.colorcoding.ibas.initialfantasy.bo.bonumbering.IBOSeriesNumbering;
import org.colorcoding.ibas.initialfantasy.bo.organization.IOrganization;
import org.colorcoding.ibas.initialfantasy.bo.organization.IUser;
import org.colorcoding.ibas.initialfantasy.bo.privilege.IPrivilege;
import org.colorcoding.ibas.initialfantasy.bo.project.IProject;

/**
 * InitialFantasy仓库应用
 */
public interface IBORepositoryInitialFantasyApp extends IBORepositoryApplication {

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-项目
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	IOperationResult<IProject> fetchProject(ICriteria criteria);

	/**
	 * 保存-项目
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	IOperationResult<IProject> saveProject(IProject bo);

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
	 * 查询-业务对象信息
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	IOperationResult<IBOInformation> fetchBOInformation(ICriteria criteria);

	/**
	 * 保存-业务对象信息
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	IOperationResult<IBOInformation> saveBOInformation(IBOInformation bo);

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
	 * 查询-业务对象编号方式
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	IOperationResult<IBONumbering> fetchBONumbering(ICriteria criteria);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象序列编号方式
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	IOperationResult<IBOSeriesNumbering> fetchBOSeriesNumbering(ICriteria criteria);

	/**
	 * 保存-业务对象序列编号方式
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	IOperationResult<IBOSeriesNumbering> saveBOSeriesNumbering(IBOSeriesNumbering bo);

	// --------------------------------------------------------------------------------------------//

}
