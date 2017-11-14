package org.colorcoding.ibas.initialfantasy.service.soap;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.OperationMessage;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.cxf.WebServicePath;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationFunction;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationModule;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationPlatform;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.BOCriteria;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.BOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.organization.Organization;
import org.colorcoding.ibas.initialfantasy.bo.organization.User;
import org.colorcoding.ibas.initialfantasy.bo.privilege.Privilege;
import org.colorcoding.ibas.initialfantasy.bo.project.Project;
import org.colorcoding.ibas.initialfantasy.bo.shell.BOInfo;
import org.colorcoding.ibas.initialfantasy.bo.shell.UserModule;
import org.colorcoding.ibas.initialfantasy.bo.shell.UserPrivilege;
import org.colorcoding.ibas.initialfantasy.bo.shell.UserQuery;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasyShell;

/**
 * InitialFantasy 数据服务JSON
 */
@WebService
@WebServicePath("data")
public class DataService extends BORepositoryInitialFantasyShell {
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
	@WebMethod
	public OperationResult<Project> fetchProject(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
		return super.fetchProject(criteria, token);
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
	@WebMethod
	public OperationResult<Project> saveProject(@WebParam(name = "bo") Project bo,
			@WebParam(name = "token") String token) {
		return super.saveProject(bo, token);
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
	@WebMethod
	public OperationResult<Organization> fetchOrganization(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
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
	@WebMethod
	public OperationResult<Organization> saveOrganization(@WebParam(name = "bo") Organization bo,
			@WebParam(name = "token") String token) {
		return super.saveOrganization(bo, token);
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 用户口令登录
	 * 
	 * @param token
	 *            用户口令
	 * @return 操作结果
	 */
	@WebMethod
	public OperationResult<org.colorcoding.ibas.initialfantasy.bo.shell.User> tokenConnect(
			@WebParam(name = "token") String token) {
		return super.tokenConnect(token);
	}

	/**
	 * 用户登录
	 * 
	 * @param user
	 *            用户
	 * @param passwrod
	 *            密码
	 * @return 操作结果
	 */
	@WebMethod
	public OperationResult<org.colorcoding.ibas.initialfantasy.bo.shell.User> userConnect(
			@WebParam(name = "user") String user, @WebParam(name = "password") String password) {
		return super.userConnect(user, password);
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
	@WebMethod
	public OperationResult<UserModule> fetchUserModules(@WebParam(name = "user") String user,
			@WebParam(name = "platform") String platform, @WebParam(name = "token") String token) {
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
	@WebMethod
	public OperationResult<UserPrivilege> fetchUserPrivileges(@WebParam(name = "user") String user,
			@WebParam(name = "platform") String platform, @WebParam(name = "token") String token) {
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
	@WebMethod
	public OperationResult<UserQuery> fetchUserQueries(@WebParam(name = "user") String user,
			@WebParam(name = "queryId") String queryId, @WebParam(name = "token") String token) {
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
	@WebMethod
	public OperationMessage saveUserQuery(@WebParam(name = "query") UserQuery query,
			@WebParam(name = "token") String token) {
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
	@WebMethod
	public OperationResult<BOInfo> fetchBOInfos(@WebParam(name = "boName") String boName,
			@WebParam(name = "token") String token) {
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
	@WebMethod
	public OperationResult<ApplicationFunction> fetchApplicationFunction(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
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
	@WebMethod
	public OperationResult<ApplicationFunction> saveApplicationFunction(@WebParam(name = "bo") ApplicationFunction bo,
			@WebParam(name = "token") String token) {
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
	@WebMethod
	public OperationResult<ApplicationModule> fetchApplicationModule(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
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
	@WebMethod
	public OperationResult<ApplicationModule> saveApplicationModule(@WebParam(name = "bo") ApplicationModule bo,
			@WebParam(name = "token") String token) {
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
	@WebMethod
	public OperationResult<ApplicationPlatform> fetchApplicationPlatform(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
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
	@WebMethod
	public OperationResult<ApplicationPlatform> saveApplicationPlatform(@WebParam(name = "bo") ApplicationPlatform bo,
			@WebParam(name = "token") String token) {
		return super.saveApplicationPlatform(bo, token);
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
	@WebMethod
	public OperationResult<BOCriteria> fetchBOCriteria(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
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
	@WebMethod
	public OperationResult<BOCriteria> saveBOCriteria(@WebParam(name = "bo") BOCriteria bo,
			@WebParam(name = "token") String token) {
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
	@WebMethod
	public OperationResult<BOFiltering> fetchBOFiltering(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
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
	@WebMethod
	public OperationResult<BOFiltering> saveBOFiltering(@WebParam(name = "bo") BOFiltering bo,
			@WebParam(name = "token") String token) {
		return super.saveBOFiltering(bo, token);
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
	@WebMethod
	public OperationResult<Privilege> fetchPrivilege(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
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
	@WebMethod
	public OperationResult<Privilege> savePrivilege(@WebParam(name = "bo") Privilege bo,
			@WebParam(name = "token") String token) {
		return super.savePrivilege(bo, token);
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
	@WebMethod
	public OperationResult<User> fetchUser(@WebParam(name = "criteria") Criteria criteria,
			@WebParam(name = "token") String token) {
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
	@WebMethod
	public OperationResult<User> saveUser(@WebParam(name = "bo") User bo, @WebParam(name = "token") String token) {
		return super.saveUser(bo, token);
	}

	// --------------------------------------------------------------------------------------------//

}
