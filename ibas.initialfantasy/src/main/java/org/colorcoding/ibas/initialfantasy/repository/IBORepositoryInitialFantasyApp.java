package org.colorcoding.ibas.initialfantasy.repository;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.repository.IBORepositoryApplication;
import org.colorcoding.ibas.initialfantasy.bo.application.IApplicationConfig;
import org.colorcoding.ibas.initialfantasy.bo.application.IApplicationConfigIdentity;
import org.colorcoding.ibas.initialfantasy.bo.application.IApplicationElement;
import org.colorcoding.ibas.initialfantasy.bo.application.IApplicationModule;
import org.colorcoding.ibas.initialfantasy.bo.application.IApplicationPlatform;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.IBOCriteria;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.IBOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.IBOInformation;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.IBOPropertySetting;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.IBORelationship;
import org.colorcoding.ibas.initialfantasy.bo.bologst.IBOLogst;
import org.colorcoding.ibas.initialfantasy.bo.bonumbering.IBONumbering;
import org.colorcoding.ibas.initialfantasy.bo.bonumbering.IBOSeriesNumbering;
import org.colorcoding.ibas.initialfantasy.bo.identity.IIdentity;
import org.colorcoding.ibas.initialfantasy.bo.identity.IUserIdentity;
import org.colorcoding.ibas.initialfantasy.bo.organization.IOrganization;
import org.colorcoding.ibas.initialfantasy.bo.organization.IUser;
import org.colorcoding.ibas.initialfantasy.bo.privilege.IIdentityPrivilege;
import org.colorcoding.ibas.initialfantasy.bo.privilege.IPrivilege;

/**
 * InitialFantasy仓库应用
 */
public interface IBORepositoryInitialFantasyApp extends IBORepositoryApplication {

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序配置
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IApplicationConfig> fetchApplicationConfig(ICriteria criteria);

	/**
	 * 保存-应用程序配置
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IApplicationConfig> saveApplicationConfig(IApplicationConfig bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序元素
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IApplicationElement> fetchApplicationElement(ICriteria criteria);

	/**
	 * 保存-应用程序元素
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IApplicationElement> saveApplicationElement(IApplicationElement bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-组织
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IOrganization> fetchOrganization(ICriteria criteria);

	/**
	 * 保存-组织
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IOrganization> saveOrganization(IOrganization bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象信息
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IBOInformation> fetchBOInformation(ICriteria criteria);

	/**
	 * 保存-业务对象信息
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IBOInformation> saveBOInformation(IBOInformation bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序模块
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IApplicationModule> fetchApplicationModule(ICriteria criteria);

	/**
	 * 保存-应用程序模块
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IApplicationModule> saveApplicationModule(IApplicationModule bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序平台
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IApplicationPlatform> fetchApplicationPlatform(ICriteria criteria);

	/**
	 * 保存-应用程序平台
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IApplicationPlatform> saveApplicationPlatform(IApplicationPlatform bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象检索条件
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IBOCriteria> fetchBOCriteria(ICriteria criteria);

	/**
	 * 保存-业务对象检索条件
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IBOCriteria> saveBOCriteria(IBOCriteria bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象筛选
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IBOFiltering> fetchBOFiltering(ICriteria criteria);

	/**
	 * 保存-业务对象筛选
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IBOFiltering> saveBOFiltering(IBOFiltering bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-系统权限
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IPrivilege> fetchPrivilege(ICriteria criteria);

	/**
	 * 保存-系统权限
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IPrivilege> savePrivilege(IPrivilege bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-用户
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IUser> fetchUser(ICriteria criteria);

	/**
	 * 保存-用户
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IUser> saveUser(IUser bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象编号方式
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IBONumbering> fetchBONumbering(ICriteria criteria);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象序列编号方式
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IBOSeriesNumbering> fetchBOSeriesNumbering(ICriteria criteria);

	/**
	 * 保存-业务对象序列编号方式
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IBOSeriesNumbering> saveBOSeriesNumbering(IBOSeriesNumbering bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-身份
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IIdentity> fetchIdentity(ICriteria criteria);

	/**
	 * 保存-身份
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IIdentity> saveIdentity(IIdentity bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-用户身份
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IUserIdentity> fetchUserIdentity(ICriteria criteria);

	/**
	 * 保存-用户身份
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IUserIdentity> saveUserIdentity(IUserIdentity bo);
	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-身份权限
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IIdentityPrivilege> fetchIdentityPrivilege(ICriteria criteria);

	/**
	 * 保存-身份权限
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IIdentityPrivilege> saveIdentityPrivilege(IIdentityPrivilege bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象属性设置
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IBOPropertySetting> fetchBOPropertySetting(ICriteria criteria);

	/**
	 * 保存-业务对象属性设置
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IBOPropertySetting> saveBOPropertySetting(IBOPropertySetting bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序配置-身份
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IApplicationConfigIdentity> fetchApplicationConfigIdentity(ICriteria criteria);

	/**
	 * 保存-应用程序配置-身份
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IApplicationConfigIdentity> saveApplicationConfigIdentity(IApplicationConfigIdentity bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象日志
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IBOLogst> fetchBOLogst(ICriteria criteria);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象关系
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IBORelationship> fetchBORelationship(ICriteria criteria);

	// --------------------------------------------------------------------------------------------//
}
