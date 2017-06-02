package org.colorcoding.ibas.initialfantasy.repository;

import org.colorcoding.ibas.bobas.approval.IApprovalProcess;
import org.colorcoding.ibas.bobas.approval.fantasy.ApprovalProcess;
import org.colorcoding.ibas.bobas.approval.fantasy.ApprovalProcessManager;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.OperationMessages;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.data.emApprovalResult;
import org.colorcoding.ibas.bobas.i18n.i18n;
import org.colorcoding.ibas.bobas.messages.RuntimeLog;
import org.colorcoding.ibas.bobas.ownership.PermissionGroup;
import org.colorcoding.ibas.bobas.repository.BORepositoryServiceApplication;
import org.colorcoding.ibas.initialfantasy.bo.applications.ApplicationFunction;
import org.colorcoding.ibas.initialfantasy.bo.applications.ApplicationModule;
import org.colorcoding.ibas.initialfantasy.bo.applications.ApplicationPlatform;
import org.colorcoding.ibas.initialfantasy.bo.applications.IApplicationFunction;
import org.colorcoding.ibas.initialfantasy.bo.applications.IApplicationModule;
import org.colorcoding.ibas.initialfantasy.bo.applications.IApplicationPlatform;
import org.colorcoding.ibas.initialfantasy.bo.approvalrequest.ApprovalRequest;
import org.colorcoding.ibas.initialfantasy.bo.approvalrequest.IApprovalRequest;
import org.colorcoding.ibas.initialfantasy.bo.approvaltemplate.ApprovalTemplate;
import org.colorcoding.ibas.initialfantasy.bo.approvaltemplate.IApprovalTemplate;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.BOCriteria;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.IBOCriteria;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.BOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.IBOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.BOInformation;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.IBOInformation;
import org.colorcoding.ibas.initialfantasy.bo.organizations.IOrganization;
import org.colorcoding.ibas.initialfantasy.bo.organizations.IOrganizationalStructure;
import org.colorcoding.ibas.initialfantasy.bo.organizations.IRole;
import org.colorcoding.ibas.initialfantasy.bo.organizations.IUser;
import org.colorcoding.ibas.initialfantasy.bo.organizations.Organization;
import org.colorcoding.ibas.initialfantasy.bo.organizations.OrganizationalStructure;
import org.colorcoding.ibas.initialfantasy.bo.organizations.Role;
import org.colorcoding.ibas.initialfantasy.bo.organizations.User;
import org.colorcoding.ibas.initialfantasy.bo.ownership.IOwnership;
import org.colorcoding.ibas.initialfantasy.bo.ownership.Ownership;
import org.colorcoding.ibas.initialfantasy.bo.privilege.IPrivilege;
import org.colorcoding.ibas.initialfantasy.bo.privilege.Privilege;

/**
 * InitialFantasy仓库
 */
@PermissionGroup("InitialFantasy")
public class BORepositoryInitialFantasy extends BORepositoryServiceApplication
		implements IBORepositoryInitialFantasySvc, IBORepositoryInitialFantasyApp {
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
	 * 查询-审批模板
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<ApprovalTemplate> fetchApprovalTemplate(ICriteria criteria, String token) {
		return super.fetch(criteria, token, ApprovalTemplate.class);
	}

	/**
	 * 查询-审批模板（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IApprovalTemplate> fetchApprovalTemplate(ICriteria criteria) {
		return new OperationResult<IApprovalTemplate>(this.fetchApprovalTemplate(criteria, this.getUserToken()));
	}

	/**
	 * 保存-审批模板
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<ApprovalTemplate> saveApprovalTemplate(ApprovalTemplate bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-审批模板（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IApprovalTemplate> saveApprovalTemplate(IApprovalTemplate bo) {
		return new OperationResult<IApprovalTemplate>(
				this.saveApprovalTemplate((ApprovalTemplate) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-审批记录
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<ApprovalRequest> fetchApprovalRequest(ICriteria criteria, String token) {
		return super.fetch(criteria, token, ApprovalRequest.class);
	}

	/**
	 * 查询-审批记录（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IApprovalRequest> fetchApprovalRequest(ICriteria criteria) {
		return new OperationResult<IApprovalRequest>(this.fetchApprovalRequest(criteria, this.getUserToken()));
	}

	/**
	 * 保存-审批记录
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<ApprovalRequest> saveApprovalRequest(ApprovalRequest bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-审批记录（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IApprovalRequest> saveApprovalRequest(IApprovalRequest bo) {
		return new OperationResult<IApprovalRequest>(
				this.saveApprovalRequest((ApprovalRequest) bo, this.getUserToken()));
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
	 * 查询-组织-结构
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<OrganizationalStructure> fetchOrganizationalStructure(ICriteria criteria, String token) {
		return super.fetch(criteria, token, OrganizationalStructure.class);
	}

	/**
	 * 查询-组织-结构（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IOrganizationalStructure> fetchOrganizationalStructure(ICriteria criteria) {
		return new OperationResult<IOrganizationalStructure>(
				this.fetchOrganizationalStructure(criteria, this.getUserToken()));
	}

	/**
	 * 保存-组织-结构
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<OrganizationalStructure> saveOrganizationalStructure(OrganizationalStructure bo,
			String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-组织-结构（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IOrganizationalStructure> saveOrganizationalStructure(IOrganizationalStructure bo) {
		return new OperationResult<IOrganizationalStructure>(
				this.saveOrganizationalStructure((OrganizationalStructure) bo, this.getUserToken()));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-数据权限
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<Ownership> fetchOwnership(ICriteria criteria, String token) {
		return super.fetch(criteria, token, Ownership.class);
	}

	/**
	 * 查询-数据权限（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IOwnership> fetchOwnership(ICriteria criteria) {
		return new OperationResult<IOwnership>(this.fetchOwnership(criteria, this.getUserToken()));
	}

	/**
	 * 保存-数据权限
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<Ownership> saveOwnership(Ownership bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-数据权限（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IOwnership> saveOwnership(IOwnership bo) {
		return new OperationResult<IOwnership>(this.saveOwnership((Ownership) bo, this.getUserToken()));
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
	 * 查询-角色
	 * 
	 * @param criteria
	 *            查询
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<Role> fetchRole(ICriteria criteria, String token) {
		return super.fetch(criteria, token, Role.class);
	}

	/**
	 * 查询-角色（提前设置用户口令）
	 * 
	 * @param criteria
	 *            查询
	 * @return 操作结果
	 */
	public IOperationResult<IRole> fetchRole(ICriteria criteria) {
		return new OperationResult<IRole>(this.fetchRole(criteria, this.getUserToken()));
	}

	/**
	 * 保存-角色
	 * 
	 * @param bo
	 *            对象实例
	 * @param token
	 *            口令
	 * @return 操作结果
	 */
	public OperationResult<Role> saveRole(Role bo, String token) {
		return super.save(bo, token);
	}

	/**
	 * 保存-角色（提前设置用户口令）
	 * 
	 * @param bo
	 *            对象实例
	 * @return 操作结果
	 */
	public IOperationResult<IRole> saveRole(IRole bo) {
		return new OperationResult<IRole>(this.saveRole((Role) bo, this.getUserToken()));
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
	} // --------------------------------------------------------------------------------------------//

	@Override
	public OperationMessages approval(int apRequestId, int apStepId, emApprovalResult apResult, String judgment,
			String token) {
		OperationMessages operationMessages = new OperationMessages();
		try {
			this.setUserToken(token);
			ApprovalProcessManager apManager = new ApprovalProcessManager();
			IApprovalProcess ap = apManager.loadApprovalProcess(apRequestId);
			if (ap == null) {
				throw new Exception(i18n.prop("msg_ap_not_exist_approval_request", apRequestId));
			}
			if (ap instanceof ApprovalProcess) {
				// 提前加载涉及的业务对象类型
				ApprovalProcess myAP = (ApprovalProcess) ap;
				myAP.loadClasses();
			}
			this.getRepository().setCurrentUser(org.colorcoding.ibas.bobas.organization.fantasy.User.SYSTEM_USER);
			ap.setRepository(this.getRepository());
			ap.approval(apStepId, apResult, token, judgment);
			ap.save();
		} catch (Exception e) {
			RuntimeLog.log(e);
			operationMessages.setError(e);
		}
		return operationMessages;
	}

	// --------------------------------------------------------------------------------------------//

}
