package org.colorcoding.ibas.initialfantasy.service.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.OperationMessages;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.data.emApprovalResult;
import org.colorcoding.ibas.initialfantasy.bo.applications.ApplicationFunction;
import org.colorcoding.ibas.initialfantasy.bo.applications.ApplicationModule;
import org.colorcoding.ibas.initialfantasy.bo.applications.ApplicationPlatform;
import org.colorcoding.ibas.initialfantasy.bo.approvalrequest.ApprovalRequest;
import org.colorcoding.ibas.initialfantasy.bo.approvaltemplate.ApprovalTemplate;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.BOCriteria;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.BOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.BOInformation;
import org.colorcoding.ibas.initialfantasy.bo.organizations.Organization;
import org.colorcoding.ibas.initialfantasy.bo.organizations.OrganizationalStructure;
import org.colorcoding.ibas.initialfantasy.bo.organizations.Role;
import org.colorcoding.ibas.initialfantasy.bo.organizations.User;
import org.colorcoding.ibas.initialfantasy.bo.ownership.Ownership;
import org.colorcoding.ibas.initialfantasy.bo.privilege.Privilege;
import org.colorcoding.ibas.initialfantasy.bo.shells.BOInfo;
import org.colorcoding.ibas.initialfantasy.bo.shells.UserModule;
import org.colorcoding.ibas.initialfantasy.bo.shells.UserPrivilege;
import org.colorcoding.ibas.initialfantasy.bo.shells.UserQuery;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasyShell;

/**
 * InitialFantasy 数据服务JSON
 */
@Path("data")
public class DataService extends BORepositoryInitialFantasyShell {

	// --------------------------------------------------------------------------------------------//
	/**
	 * 用户口令登录
	 * 
	 * @param token
	 *            用户口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("tokenConnect")
	public OperationResult<org.colorcoding.ibas.initialfantasy.bo.shells.User> tokenConnect(
			@QueryParam("token") String token) {
		return super.tokenConnect(token);
	}

	/**
	 * 用户密码登录
	 * 
	 * @param user
	 *            用户
	 * @param passwrod
	 *            密码
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("userConnect")
	public OperationResult<org.colorcoding.ibas.initialfantasy.bo.shells.User> userConnect(
			@QueryParam("user") String user, @QueryParam("password") String password,
			@QueryParam("token") String token) {
		if (token != null) {
			return super.userConnect(token);
		} else {
			return super.userConnect(user, password);
		}

	}

	/**
	 * 查询用户模块
	 * 
	 * @param user
	 *            用户
	 * @param platform
	 *            平台
	 * @param token
	 *            用户口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchUserModules")
	public OperationResult<UserModule> fetchUserModules(@QueryParam("user") String user,
			@QueryParam("platform") String platform, @QueryParam("token") String token) {
		return super.fetchUserModules(user, platform, token);
	}

	/**
	 * 查询用户权限
	 * 
	 * @param user
	 *            用户
	 * @param platform
	 *            平台
	 * @param token
	 *            用户口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchUserPrivileges")
	public OperationResult<UserPrivilege> fetchUserPrivileges(@QueryParam("user") String user,
			@QueryParam("platform") String platform, @QueryParam("token") String token) {
		return super.fetchUserPrivileges(user, platform, token);
	}

	/**
	 * 查询用户查询
	 * 
	 * @param user
	 *            用户
	 * @param queryId
	 *            查询标识
	 * @param token
	 *            用户口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchUserQueries")
	public OperationResult<UserQuery> fetchUserQueries(@QueryParam("user") String user,
			@QueryParam("queryId") String queryId, @QueryParam("token") String token) {
		return super.fetchUserQueries(user, queryId, token);
	}

	/**
	 * 查询用户查询
	 * 
	 * @param query
	 *            查询
	 * @param token
	 *            用户口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveUserQuery")
	public OperationMessages saveUserQuery(UserQuery query, @QueryParam("token") String token) {
		return super.saveUserQuery(query, token);
	}

	/**
	 * 查询业务对象信息
	 * 
	 * @param boName
	 *            对象名称
	 * @param token
	 *            用户口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchBOInfos")
	public OperationResult<BOInfo> fetchBOInfos(@QueryParam("boName") String boName,
			@QueryParam("token") String token) {
		return super.fetchBOInfos(boName, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchApplicationFunction")
	public OperationResult<ApplicationFunction> fetchApplicationFunction(Criteria criteria,
			@QueryParam("token") String token) {
		return super.fetchApplicationFunction(criteria, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveApplicationFunction")
	public OperationResult<ApplicationFunction> saveApplicationFunction(ApplicationFunction bo,
			@QueryParam("token") String token) {
		return super.saveApplicationFunction(bo, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchApplicationModule")
	public OperationResult<ApplicationModule> fetchApplicationModule(Criteria criteria,
			@QueryParam("token") String token) {
		return super.fetchApplicationModule(criteria, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveApplicationModule")
	public OperationResult<ApplicationModule> saveApplicationModule(ApplicationModule bo,
			@QueryParam("token") String token) {
		return super.saveApplicationModule(bo, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchApplicationPlatform")
	public OperationResult<ApplicationPlatform> fetchApplicationPlatform(Criteria criteria,
			@QueryParam("token") String token) {
		return super.fetchApplicationPlatform(criteria, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveApplicationPlatform")
	public OperationResult<ApplicationPlatform> saveApplicationPlatform(ApplicationPlatform bo,
			@QueryParam("token") String token) {
		return super.saveApplicationPlatform(bo, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchApprovalTemplate")
	public OperationResult<ApprovalTemplate> fetchApprovalTemplate(Criteria criteria,
			@QueryParam("token") String token) {
		return super.fetchApprovalTemplate(criteria, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveApprovalTemplate")
	public OperationResult<ApprovalTemplate> saveApprovalTemplate(ApprovalTemplate bo,
			@QueryParam("token") String token) {
		return super.saveApprovalTemplate(bo, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchApprovalRequest")
	public OperationResult<ApprovalRequest> fetchApprovalRequest(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchApprovalRequest(criteria, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveApprovalRequest")
	public OperationResult<ApprovalRequest> saveApprovalRequest(ApprovalRequest bo, @QueryParam("token") String token) {
		return super.saveApprovalRequest(bo, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchBOCriteria")
	public OperationResult<BOCriteria> fetchBOCriteria(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchBOCriteria(criteria, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveBOCriteria")
	public OperationResult<BOCriteria> saveBOCriteria(BOCriteria bo, @QueryParam("token") String token) {
		return super.saveBOCriteria(bo, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchBOFiltering")
	public OperationResult<BOFiltering> fetchBOFiltering(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchBOFiltering(criteria, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveBOFiltering")
	public OperationResult<BOFiltering> saveBOFiltering(BOFiltering bo, @QueryParam("token") String token) {
		return super.saveBOFiltering(bo, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchOrganization")
	public OperationResult<Organization> fetchOrganization(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchOrganization(criteria, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveOrganization")
	public OperationResult<Organization> saveOrganization(Organization bo, @QueryParam("token") String token) {
		return super.saveOrganization(bo, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchOrganizationalStructure")
	public OperationResult<OrganizationalStructure> fetchOrganizationalStructure(Criteria criteria,
			@QueryParam("token") String token) {
		return super.fetchOrganizationalStructure(criteria, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveOrganizationalStructure")
	public OperationResult<OrganizationalStructure> saveOrganizationalStructure(OrganizationalStructure bo,
			@QueryParam("token") String token) {
		return super.saveOrganizationalStructure(bo, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchOwnership")
	public OperationResult<Ownership> fetchOwnership(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchOwnership(criteria, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveOwnership")
	public OperationResult<Ownership> saveOwnership(Ownership bo, @QueryParam("token") String token) {
		return super.saveOwnership(bo, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchPrivilege")
	public OperationResult<Privilege> fetchPrivilege(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchPrivilege(criteria, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("savePrivilege")
	public OperationResult<Privilege> savePrivilege(Privilege bo, @QueryParam("token") String token) {
		return super.savePrivilege(bo, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchRole")
	public OperationResult<Role> fetchRole(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchRole(criteria, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveRole")
	public OperationResult<Role> saveRole(Role bo, @QueryParam("token") String token) {
		return super.saveRole(bo, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchUser")
	public OperationResult<User> fetchUser(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchUser(criteria, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveUser")
	public OperationResult<User> saveUser(User bo, @QueryParam("token") String token) {
		return super.saveUser(bo, token);
	}

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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("approval")
	public OperationMessages approval(@QueryParam("apRequestId") int apRequestId, @QueryParam("apStepId") int apStepId,
			@QueryParam("apResult") String apResult, @QueryParam("judgment") String judgment,
			@QueryParam("token") String token) {
		emApprovalResult emApReslut = emApprovalResult.valueOf(apResult);
		return super.approval(apRequestId, apStepId, emApReslut, judgment, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchBOInformation")
	public OperationResult<BOInformation> fetchBOInformation(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchBOInformation(criteria, token);
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
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveBOInformation")
	public OperationResult<BOInformation> saveBOInformation(BOInformation bo, @QueryParam("token") String token) {
		return super.saveBOInformation(bo, token);
	}

	// --------------------------------------------------------------------------------------------//

}
