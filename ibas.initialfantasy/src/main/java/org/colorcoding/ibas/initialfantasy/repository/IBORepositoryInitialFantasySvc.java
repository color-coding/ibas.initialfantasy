package org.colorcoding.ibas.initialfantasy.repository;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.repository.IBORepositorySmartService;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationConfig;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationConfigIdentity;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationElement;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationModule;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationPlatform;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.BOCriteria;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.BOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.BOInformation;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.BOPropertySetting;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.BORelationship;
import org.colorcoding.ibas.initialfantasy.bo.bologst.BOLogst;
import org.colorcoding.ibas.initialfantasy.bo.bonumbering.BONumbering;
import org.colorcoding.ibas.initialfantasy.bo.bonumbering.BOSeriesNumbering;
import org.colorcoding.ibas.initialfantasy.bo.identity.Identity;
import org.colorcoding.ibas.initialfantasy.bo.identity.UserIdentity;
import org.colorcoding.ibas.initialfantasy.bo.organization.Organization;
import org.colorcoding.ibas.initialfantasy.bo.organization.User;
import org.colorcoding.ibas.initialfantasy.bo.privilege.IdentityPrivilege;
import org.colorcoding.ibas.initialfantasy.bo.privilege.Privilege;
import org.colorcoding.ibas.initialfantasy.bo.refunction.Refunction;

/**
 * InitialFantasy仓库服务
 */
public interface IBORepositoryInitialFantasySvc extends IBORepositorySmartService {

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序配置
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<ApplicationConfig> fetchApplicationConfig(ICriteria criteria, String token);

	/**
	 * 保存-应用程序配置
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<ApplicationConfig> saveApplicationConfig(ApplicationConfig bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序元素
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<ApplicationElement> fetchApplicationElement(ICriteria criteria, String token);

	/**
	 * 保存-应用程序元素
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<ApplicationElement> saveApplicationElement(ApplicationElement bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-组织
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<Organization> fetchOrganization(ICriteria criteria, String token);

	/**
	 * 保存-组织
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<Organization> saveOrganization(Organization bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象信息
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<BOInformation> fetchBOInformation(ICriteria criteria, String token);

	/**
	 * 保存-业务对象信息
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<BOInformation> saveBOInformation(BOInformation bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序模块
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<ApplicationModule> fetchApplicationModule(ICriteria criteria, String token);

	/**
	 * 保存-应用程序模块
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<ApplicationModule> saveApplicationModule(ApplicationModule bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序平台
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<ApplicationPlatform> fetchApplicationPlatform(ICriteria criteria, String token);

	/**
	 * 保存-应用程序平台
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<ApplicationPlatform> saveApplicationPlatform(ApplicationPlatform bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象检索条件
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<BOCriteria> fetchBOCriteria(ICriteria criteria, String token);

	/**
	 * 保存-业务对象检索条件
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<BOCriteria> saveBOCriteria(BOCriteria bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象筛选
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<BOFiltering> fetchBOFiltering(ICriteria criteria, String token);

	/**
	 * 保存-业务对象筛选
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<BOFiltering> saveBOFiltering(BOFiltering bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-系统权限
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<Privilege> fetchPrivilege(ICriteria criteria, String token);

	/**
	 * 保存-系统权限
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<Privilege> savePrivilege(Privilege bo, String token);

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-用户
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<User> fetchUser(ICriteria criteria, String token);

	/**
	 * 保存-用户
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<User> saveUser(User bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象编号方式
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<BONumbering> fetchBONumbering(ICriteria criteria, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象序列编号方式
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<BOSeriesNumbering> fetchBOSeriesNumbering(ICriteria criteria, String token);

	/**
	 * 保存-业务对象序列编号方式
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<BOSeriesNumbering> saveBOSeriesNumbering(BOSeriesNumbering bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-身份
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<Identity> fetchIdentity(ICriteria criteria, String token);

	/**
	 * 保存-身份
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<Identity> saveIdentity(Identity bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-用户身份
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<UserIdentity> fetchUserIdentity(ICriteria criteria, String token);

	/**
	 * 保存-用户身份
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<UserIdentity> saveUserIdentity(UserIdentity bo, String token);

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-身份权限
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<IdentityPrivilege> fetchIdentityPrivilege(ICriteria criteria, String token);

	/**
	 * 保存-身份权限
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<IdentityPrivilege> saveIdentityPrivilege(IdentityPrivilege bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象属性设置
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<BOPropertySetting> fetchBOPropertySetting(ICriteria criteria, String token);

	/**
	 * 保存-业务对象属性设置
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<BOPropertySetting> saveBOPropertySetting(BOPropertySetting bo, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序配置-身份
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<ApplicationConfigIdentity> fetchApplicationConfigIdentity(ICriteria criteria, String token);

	/**
	 * 保存-应用程序配置-身份
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<ApplicationConfigIdentity> saveApplicationConfigIdentity(ApplicationConfigIdentity bo,
			String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象日志
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<BOLogst> fetchBOLogst(ICriteria criteria, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象关系
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<BORelationship> fetchBORelationship(ICriteria criteria, String token);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-重组功能
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<Refunction> fetchRefunction(ICriteria criteria, String token);

	/**
	 * 保存-重组功能
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<Refunction> saveRefunction(Refunction bo, String token);

	// --------------------------------------------------------------------------------------------//

}
