package org.colorcoding.ibas.initialfantasy.repository;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.repository.BORepositoryServiceApplication;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationFunction;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationModule;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationPlatform;
import org.colorcoding.ibas.initialfantasy.bo.application.IApplicationFunction;
import org.colorcoding.ibas.initialfantasy.bo.application.IApplicationModule;
import org.colorcoding.ibas.initialfantasy.bo.application.IApplicationPlatform;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.BOCriteria;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.IBOCriteria;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.BOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.IBOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.BOInformation;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.IBOInformation;
import org.colorcoding.ibas.initialfantasy.bo.organization.IOrganization;
import org.colorcoding.ibas.initialfantasy.bo.organization.IUser;
import org.colorcoding.ibas.initialfantasy.bo.organization.Organization;
import org.colorcoding.ibas.initialfantasy.bo.organization.User;
import org.colorcoding.ibas.initialfantasy.bo.privilege.IPrivilege;
import org.colorcoding.ibas.initialfantasy.bo.privilege.Privilege;
import org.colorcoding.ibas.initialfantasy.bo.project.IProject;
import org.colorcoding.ibas.initialfantasy.bo.project.Project;

/**
 * InitialFantasy仓库
 */
public class BORepositoryInitialFantasy extends BORepositoryServiceApplication
		implements IBORepositoryInitialFantasySvc, IBORepositoryInitialFantasyApp {

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-项目
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<Project> fetchProject(ICriteria criteria, String token) {
		return super.fetch(criteria, token, Project.class);
	}

	/**
	 * 查询-项目（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IProject> fetchProject(ICriteria criteria) {
		return new OperationResult<IProject>(this.fetchProject(criteria, this.getUserToken()));
	}

	/**
	 * 保存-项目
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<Project> saveProject(Project bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-项目（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IProject> saveProject(IProject bo) {
		return new OperationResult<IProject>(this.saveProject((Project) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-组织
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<Organization> fetchOrganization(ICriteria criteria, String token) {
		return super.fetch(criteria, token, Organization.class);
	}

	/**
	 * 查询-组织（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IOrganization> fetchOrganization(ICriteria criteria) {
		return new OperationResult<IOrganization>(this.fetchOrganization(criteria, this.getUserToken()));
	}

	/**
	 * 保存-组织
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<Organization> saveOrganization(Organization bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-组织（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IOrganization> saveOrganization(IOrganization bo) {
		return new OperationResult<IOrganization>(this.saveOrganization((Organization) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象信息
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<BOInformation> fetchBOInformation(ICriteria criteria, String token) {
		return super.fetch(criteria, token, BOInformation.class);
	}

	/**
	 * 查询-业务对象信息（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IBOInformation> fetchBOInformation(ICriteria criteria) {
		return new OperationResult<IBOInformation>(this.fetchBOInformation(criteria, this.getUserToken()));
	}

	/**
	 * 保存-业务对象信息
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<BOInformation> saveBOInformation(BOInformation bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-业务对象信息（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IBOInformation> saveBOInformation(IBOInformation bo) {
		return new OperationResult<IBOInformation>(this.saveBOInformation((BOInformation) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序功能
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<ApplicationFunction> fetchApplicationFunction(ICriteria criteria, String token) {
		return super.fetch(criteria, token, ApplicationFunction.class);
	}

	/**
	 * 查询-应用程序功能（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IApplicationFunction> fetchApplicationFunction(ICriteria criteria) {
		return new OperationResult<IApplicationFunction>(this.fetchApplicationFunction(criteria, this.getUserToken()));
	}

	/**
	 * 保存-应用程序功能
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<ApplicationFunction> saveApplicationFunction(ApplicationFunction bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-应用程序功能（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IApplicationFunction> saveApplicationFunction(IApplicationFunction bo) {
		return new OperationResult<IApplicationFunction>(
				this.saveApplicationFunction((ApplicationFunction) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序模块
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<ApplicationModule> fetchApplicationModule(ICriteria criteria, String token) {
		return super.fetch(criteria, token, ApplicationModule.class);
	}

	/**
	 * 查询-应用程序模块（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IApplicationModule> fetchApplicationModule(ICriteria criteria) {
		return new OperationResult<IApplicationModule>(this.fetchApplicationModule(criteria, this.getUserToken()));
	}

	/**
	 * 保存-应用程序模块
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<ApplicationModule> saveApplicationModule(ApplicationModule bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-应用程序模块（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
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
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<ApplicationPlatform> fetchApplicationPlatform(ICriteria criteria, String token) {
		return super.fetch(criteria, token, ApplicationPlatform.class);
	}

	/**
	 * 查询-应用程序平台（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IApplicationPlatform> fetchApplicationPlatform(ICriteria criteria) {
		return new OperationResult<IApplicationPlatform>(this.fetchApplicationPlatform(criteria, this.getUserToken()));
	}

	/**
	 * 保存-应用程序平台
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<ApplicationPlatform> saveApplicationPlatform(ApplicationPlatform bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-应用程序平台（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
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
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<BOCriteria> fetchBOCriteria(ICriteria criteria, String token) {
		return super.fetch(criteria, token, BOCriteria.class);
	}

	/**
	 * 查询-业务对象检索条件（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IBOCriteria> fetchBOCriteria(ICriteria criteria) {
		return new OperationResult<IBOCriteria>(this.fetchBOCriteria(criteria, this.getUserToken()));
	}

	/**
	 * 保存-业务对象检索条件
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<BOCriteria> saveBOCriteria(BOCriteria bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-业务对象检索条件（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IBOCriteria> saveBOCriteria(IBOCriteria bo) {
		return new OperationResult<IBOCriteria>(this.saveBOCriteria((BOCriteria) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象筛选
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<BOFiltering> fetchBOFiltering(ICriteria criteria, String token) {
		return super.fetch(criteria, token, BOFiltering.class);
	}

	/**
	 * 查询-业务对象筛选（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IBOFiltering> fetchBOFiltering(ICriteria criteria) {
		return new OperationResult<IBOFiltering>(this.fetchBOFiltering(criteria, this.getUserToken()));
	}

	/**
	 * 保存-业务对象筛选
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<BOFiltering> saveBOFiltering(BOFiltering bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-业务对象筛选（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IBOFiltering> saveBOFiltering(IBOFiltering bo) {
		return new OperationResult<IBOFiltering>(this.saveBOFiltering((BOFiltering) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-系统权限
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<Privilege> fetchPrivilege(ICriteria criteria, String token) {
		return super.fetch(criteria, token, Privilege.class);
	}

	/**
	 * 查询-系统权限（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IPrivilege> fetchPrivilege(ICriteria criteria) {
		return new OperationResult<IPrivilege>(this.fetchPrivilege(criteria, this.getUserToken()));
	}

	/**
	 * 保存-系统权限
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<Privilege> savePrivilege(Privilege bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-系统权限（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IPrivilege> savePrivilege(IPrivilege bo) {
		return new OperationResult<IPrivilege>(this.savePrivilege((Privilege) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-用户
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<User> fetchUser(ICriteria criteria, String token) {
		return super.fetch(criteria, token, User.class);
	}

	/**
	 * 查询-用户（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IUser> fetchUser(ICriteria criteria) {
		return new OperationResult<IUser>(this.fetchUser(criteria, this.getUserToken()));
	}

	/**
	 * 保存-用户
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<User> saveUser(User bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-用户（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IUser> saveUser(IUser bo) {
		return new OperationResult<IUser>(this.saveUser((User) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//

}
