package org.colorcoding.ibas.initialfantasy.repository;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.repository.BORepositoryServiceApplication;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationConfig;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationElement;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationModule;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationPlatform;
import org.colorcoding.ibas.initialfantasy.bo.application.IApplicationConfig;
import org.colorcoding.ibas.initialfantasy.bo.application.IApplicationElement;
import org.colorcoding.ibas.initialfantasy.bo.application.IApplicationModule;
import org.colorcoding.ibas.initialfantasy.bo.application.IApplicationPlatform;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.BOCriteria;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.IBOCriteria;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.BOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.IBOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.BOInformation;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.BOPropertySetting;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.IBOInformation;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.IBOPropertySetting;
import org.colorcoding.ibas.initialfantasy.bo.bonumbering.BONumbering;
import org.colorcoding.ibas.initialfantasy.bo.bonumbering.BOSeriesNumbering;
import org.colorcoding.ibas.initialfantasy.bo.bonumbering.IBONumbering;
import org.colorcoding.ibas.initialfantasy.bo.bonumbering.IBOSeriesNumbering;
import org.colorcoding.ibas.initialfantasy.bo.identity.IIdentity;
import org.colorcoding.ibas.initialfantasy.bo.identity.IUserIdentity;
import org.colorcoding.ibas.initialfantasy.bo.identity.Identity;
import org.colorcoding.ibas.initialfantasy.bo.identity.UserIdentity;
import org.colorcoding.ibas.initialfantasy.bo.organization.IOrganization;
import org.colorcoding.ibas.initialfantasy.bo.organization.IUser;
import org.colorcoding.ibas.initialfantasy.bo.organization.Organization;
import org.colorcoding.ibas.initialfantasy.bo.organization.User;
import org.colorcoding.ibas.initialfantasy.bo.privilege.IIdentityPrivilege;
import org.colorcoding.ibas.initialfantasy.bo.privilege.IPrivilege;
import org.colorcoding.ibas.initialfantasy.bo.privilege.IdentityPrivilege;
import org.colorcoding.ibas.initialfantasy.bo.privilege.Privilege;

/**
 * InitialFantasy仓库
 */
public class BORepositoryInitialFantasy extends BORepositoryServiceApplication
		implements IBORepositoryInitialFantasySvc, IBORepositoryInitialFantasyApp {
	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序配置
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<ApplicationConfig> fetchApplicationConfig(ICriteria criteria, String token) {
		return super.fetch(criteria, token, ApplicationConfig.class);
	}

	/**
	 * 查询-应用程序配置（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IApplicationConfig> fetchApplicationConfig(ICriteria criteria) {
		return new OperationResult<IApplicationConfig>(this.fetchApplicationConfig(criteria, this.getUserToken()));
	}

	/**
	 * 保存-应用程序配置
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<ApplicationConfig> saveApplicationConfig(ApplicationConfig bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-应用程序配置（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IApplicationConfig> saveApplicationConfig(IApplicationConfig bo) {
		return new OperationResult<IApplicationConfig>(
				this.saveApplicationConfig((ApplicationConfig) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序元素
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<ApplicationElement> fetchApplicationElement(ICriteria criteria, String token) {
		return super.fetch(criteria, token, ApplicationElement.class);
	}

	/**
	 * 查询-应用程序元素（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IApplicationElement> fetchApplicationElement(ICriteria criteria) {
		return new OperationResult<IApplicationElement>(this.fetchApplicationElement(criteria, this.getUserToken()));
	}

	/**
	 * 保存-应用程序元素
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<ApplicationElement> saveApplicationElement(ApplicationElement bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-应用程序元素（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IApplicationElement> saveApplicationElement(IApplicationElement bo) {
		return new OperationResult<IApplicationElement>(
				this.saveApplicationElement((ApplicationElement) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-组织
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<Organization> fetchOrganization(ICriteria criteria, String token) {
		return super.fetch(criteria, token, Organization.class);
	}

	/**
	 * 查询-组织（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IOrganization> fetchOrganization(ICriteria criteria) {
		return new OperationResult<IOrganization>(this.fetchOrganization(criteria, this.getUserToken()));
	}

	/**
	 * 保存-组织
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<Organization> saveOrganization(Organization bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-组织（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IOrganization> saveOrganization(IOrganization bo) {
		return new OperationResult<IOrganization>(this.saveOrganization((Organization) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象信息
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<BOInformation> fetchBOInformation(ICriteria criteria, String token) {
		return super.fetch(criteria, token, BOInformation.class);
	}

	/**
	 * 查询-业务对象信息（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IBOInformation> fetchBOInformation(ICriteria criteria) {
		return new OperationResult<IBOInformation>(this.fetchBOInformation(criteria, this.getUserToken()));
	}

	/**
	 * 保存-业务对象信息
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<BOInformation> saveBOInformation(BOInformation bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-业务对象信息（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IBOInformation> saveBOInformation(IBOInformation bo) {
		return new OperationResult<IBOInformation>(this.saveBOInformation((BOInformation) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序模块
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<ApplicationModule> fetchApplicationModule(ICriteria criteria, String token) {
		return super.fetch(criteria, token, ApplicationModule.class);
	}

	/**
	 * 查询-应用程序模块（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IApplicationModule> fetchApplicationModule(ICriteria criteria) {
		return new OperationResult<IApplicationModule>(this.fetchApplicationModule(criteria, this.getUserToken()));
	}

	/**
	 * 保存-应用程序模块
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<ApplicationModule> saveApplicationModule(ApplicationModule bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-应用程序模块（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IApplicationModule> saveApplicationModule(IApplicationModule bo) {
		return new OperationResult<IApplicationModule>(
				this.saveApplicationModule((ApplicationModule) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序平台
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<ApplicationPlatform> fetchApplicationPlatform(ICriteria criteria, String token) {
		return super.fetch(criteria, token, ApplicationPlatform.class);
	}

	/**
	 * 查询-应用程序平台（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IApplicationPlatform> fetchApplicationPlatform(ICriteria criteria) {
		return new OperationResult<IApplicationPlatform>(this.fetchApplicationPlatform(criteria, this.getUserToken()));
	}

	/**
	 * 保存-应用程序平台
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<ApplicationPlatform> saveApplicationPlatform(ApplicationPlatform bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-应用程序平台（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IApplicationPlatform> saveApplicationPlatform(IApplicationPlatform bo) {
		return new OperationResult<IApplicationPlatform>(
				this.saveApplicationPlatform((ApplicationPlatform) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象检索条件
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<BOCriteria> fetchBOCriteria(ICriteria criteria, String token) {
		return super.fetch(criteria, token, BOCriteria.class);
	}

	/**
	 * 查询-业务对象检索条件（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IBOCriteria> fetchBOCriteria(ICriteria criteria) {
		return new OperationResult<IBOCriteria>(this.fetchBOCriteria(criteria, this.getUserToken()));
	}

	/**
	 * 保存-业务对象检索条件
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<BOCriteria> saveBOCriteria(BOCriteria bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-业务对象检索条件（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IBOCriteria> saveBOCriteria(IBOCriteria bo) {
		return new OperationResult<IBOCriteria>(this.saveBOCriteria((BOCriteria) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象筛选
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<BOFiltering> fetchBOFiltering(ICriteria criteria, String token) {
		return super.fetch(criteria, token, BOFiltering.class);
	}

	/**
	 * 查询-业务对象筛选（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IBOFiltering> fetchBOFiltering(ICriteria criteria) {
		return new OperationResult<IBOFiltering>(this.fetchBOFiltering(criteria, this.getUserToken()));
	}

	/**
	 * 保存-业务对象筛选
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<BOFiltering> saveBOFiltering(BOFiltering bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-业务对象筛选（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IBOFiltering> saveBOFiltering(IBOFiltering bo) {
		return new OperationResult<IBOFiltering>(this.saveBOFiltering((BOFiltering) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-系统权限
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<Privilege> fetchPrivilege(ICriteria criteria, String token) {
		return super.fetch(criteria, token, Privilege.class);
	}

	/**
	 * 查询-系统权限（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IPrivilege> fetchPrivilege(ICriteria criteria) {
		return new OperationResult<IPrivilege>(this.fetchPrivilege(criteria, this.getUserToken()));
	}

	/**
	 * 保存-系统权限
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<Privilege> savePrivilege(Privilege bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-系统权限（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IPrivilege> savePrivilege(IPrivilege bo) {
		return new OperationResult<IPrivilege>(this.savePrivilege((Privilege) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-用户
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<User> fetchUser(ICriteria criteria, String token) {
		return super.fetch(criteria, token, User.class);
	}

	/**
	 * 查询-用户（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IUser> fetchUser(ICriteria criteria) {
		return new OperationResult<IUser>(this.fetchUser(criteria, this.getUserToken()));
	}

	/**
	 * 保存-用户
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<User> saveUser(User bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-用户（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IUser> saveUser(IUser bo) {
		return new OperationResult<IUser>(this.saveUser((User) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-业务对象编号方式
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<BONumbering> fetchBONumbering(ICriteria criteria, String token) {
		return super.fetch(criteria, token, BONumbering.class);
	}

	/**
	 * 查询-业务对象编号方式（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IBONumbering> fetchBONumbering(ICriteria criteria) {
		return new OperationResult<IBONumbering>(this.fetchBONumbering(criteria, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象序列编号方式
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<BOSeriesNumbering> fetchBOSeriesNumbering(ICriteria criteria, String token) {
		return super.fetch(criteria, token, BOSeriesNumbering.class);
	}

	/**
	 * 查询-业务对象序列编号方式（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IBOSeriesNumbering> fetchBOSeriesNumbering(ICriteria criteria) {
		return new OperationResult<IBOSeriesNumbering>(this.fetchBOSeriesNumbering(criteria, this.getUserToken()));
	}

	/**
	 * 保存-业务对象序列编号方式
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<BOSeriesNumbering> saveBOSeriesNumbering(BOSeriesNumbering bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-业务对象序列编号方式（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IBOSeriesNumbering> saveBOSeriesNumbering(IBOSeriesNumbering bo) {
		return new OperationResult<IBOSeriesNumbering>(
				this.saveBOSeriesNumbering((BOSeriesNumbering) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-身份
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<Identity> fetchIdentity(ICriteria criteria, String token) {
		return super.fetch(criteria, token, Identity.class);
	}

	/**
	 * 查询-身份（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IIdentity> fetchIdentity(ICriteria criteria) {
		return new OperationResult<IIdentity>(this.fetchIdentity(criteria, this.getUserToken()));
	}

	/**
	 * 保存-身份
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<Identity> saveIdentity(Identity bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-身份（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IIdentity> saveIdentity(IIdentity bo) {
		return new OperationResult<IIdentity>(this.saveIdentity((Identity) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-用户身份
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<UserIdentity> fetchUserIdentity(ICriteria criteria, String token) {
		return super.fetch(criteria, token, UserIdentity.class);
	}

	/**
	 * 查询-用户身份（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IUserIdentity> fetchUserIdentity(ICriteria criteria) {
		return new OperationResult<IUserIdentity>(this.fetchUserIdentity(criteria, this.getUserToken()));
	}

	/**
	 * 保存-用户身份
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<UserIdentity> saveUserIdentity(UserIdentity bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-用户身份（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IUserIdentity> saveUserIdentity(IUserIdentity bo) {
		return new OperationResult<IUserIdentity>(this.saveUserIdentity((UserIdentity) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-身份权限
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<IdentityPrivilege> fetchIdentityPrivilege(ICriteria criteria, String token) {
		return super.fetch(criteria, token, IdentityPrivilege.class);
	}

	/**
	 * 查询-身份权限（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IIdentityPrivilege> fetchIdentityPrivilege(ICriteria criteria) {
		return new OperationResult<IIdentityPrivilege>(this.fetchIdentityPrivilege(criteria, this.getUserToken()));
	}

	/**
	 * 保存-身份权限
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<IdentityPrivilege> saveIdentityPrivilege(IdentityPrivilege bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-身份权限（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IIdentityPrivilege> saveIdentityPrivilege(IIdentityPrivilege bo) {
		return new OperationResult<IIdentityPrivilege>(
				this.saveIdentityPrivilege((IdentityPrivilege) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象属性设置
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	public OperationResult<BOPropertySetting> fetchBOPropertySetting(ICriteria criteria, String token) {
		return super.fetch(criteria, token, BOPropertySetting.class);
	}

	/**
	 * 查询-业务对象属性设置（提前设置用户口令）
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	public IOperationResult<IBOPropertySetting> fetchBOPropertySetting(ICriteria criteria) {
		return new OperationResult<IBOPropertySetting>(this.fetchBOPropertySetting(criteria, this.getUserToken()));
	}

	/**
	 * 保存-业务对象属性设置
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	public OperationResult<BOPropertySetting> saveBOPropertySetting(BOPropertySetting bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-业务对象属性设置（提前设置用户口令）
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IBOPropertySetting> saveBOPropertySetting(IBOPropertySetting bo) {
		return new OperationResult<IBOPropertySetting>(
				this.saveBOPropertySetting((BOPropertySetting) bo, this.getUserToken()));
	}
	// --------------------------------------------------------------------------------------------//

}
