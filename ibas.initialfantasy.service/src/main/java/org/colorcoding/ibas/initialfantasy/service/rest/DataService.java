package org.colorcoding.ibas.initialfantasy.service.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.OperationMessage;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationConfig;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationConfigIdentity;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationElement;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationModule;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationPlatform;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.BOCriteria;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.BOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.BOInformation;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.BOPropertySetting;
import org.colorcoding.ibas.initialfantasy.bo.bonumbering.BONumbering;
import org.colorcoding.ibas.initialfantasy.bo.bonumbering.BOSeriesNumbering;
import org.colorcoding.ibas.initialfantasy.bo.identity.Identity;
import org.colorcoding.ibas.initialfantasy.bo.identity.UserIdentity;
import org.colorcoding.ibas.initialfantasy.bo.organization.Organization;
import org.colorcoding.ibas.initialfantasy.bo.organization.User;
import org.colorcoding.ibas.initialfantasy.bo.privilege.IdentityPrivilege;
import org.colorcoding.ibas.initialfantasy.bo.privilege.Privilege;
import org.colorcoding.ibas.initialfantasy.bo.shell.BizObjectInfo;
import org.colorcoding.ibas.initialfantasy.bo.shell.UserConfig;
import org.colorcoding.ibas.initialfantasy.bo.shell.UserModule;
import org.colorcoding.ibas.initialfantasy.bo.shell.UserPrivilege;
import org.colorcoding.ibas.initialfantasy.bo.shell.UserQuery;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasyShell;

/**
 * InitialFantasy 数据服务JSON
 */
@Path("data")
public class DataService extends BORepositoryInitialFantasyShell {
	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序配置
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchApplicationConfig")
	public OperationResult<ApplicationConfig> fetchApplicationConfig(Criteria criteria,
			@QueryParam("token") String token) {
		return super.fetchApplicationConfig(criteria, token);
	}

	/**
	 * 保存-应用程序配置
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveApplicationConfig")
	public OperationResult<ApplicationConfig> saveApplicationConfig(ApplicationConfig bo,
			@QueryParam("token") String token) {
		return super.saveApplicationConfig(bo, token);
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象编号方式
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchBONumbering")
	public OperationResult<BONumbering> fetchBONumbering(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchBONumbering(criteria, token);
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象序列编号方式
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchBOSeriesNumbering")
	public OperationResult<BOSeriesNumbering> fetchBOSeriesNumbering(Criteria criteria,
			@QueryParam("token") String token) {
		return super.fetchBOSeriesNumbering(criteria, token);
	}

	/**
	 * 保存-业务对象序列编号方式
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveBOSeriesNumbering")
	public OperationResult<BOSeriesNumbering> saveBOSeriesNumbering(BOSeriesNumbering bo,
			@QueryParam("token") String token) {
		return super.saveBOSeriesNumbering(bo, token);
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-组织
	 * 
	 * @param criteria 查询
	 * @param token    口令
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
	 * @param bo    对象实例
	 * @param token 口令
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
	 * 查询用户模块
	 * 
	 * @param user     用户
	 * @param platform 平台
	 * @param token    用户口令
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
	 * @param user     用户
	 * @param platform 平台
	 * @param token    用户口令
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
	 * 查询用户配置
	 * 
	 * @param user     用户
	 * @param platform 平台
	 * @param token    用户口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchUserConfigs")
	public OperationResult<UserConfig> fetchUserConfigs(@QueryParam("user") String user,
			@QueryParam("platform") String platform, @QueryParam("token") String token) {
		return super.fetchUserConfigs(user, platform, token);
	}

	/**
	 * 
	 * @param user    用户
	 * @param queryId 查询标识
	 * @param token   用户口令
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
	 * @param query 查询
	 * @param token 用户口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveUserQuery")
	public OperationMessage saveUserQuery(UserQuery query, @QueryParam("token") String token) {
		return super.saveUserQuery(query, token);
	}

	/**
	 * 查询业务对象信息
	 * 
	 * @param user   用户
	 * @param boCode 对象编码
	 * @param token  用户口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchBizObjectInfo")
	public OperationResult<BizObjectInfo> fetchBizObjectInfo(@QueryParam("user") String user,
			@QueryParam("boCode") String boCode, @QueryParam("token") String token) {
		return super.fetchBizObjectInfo(user, boCode, token);
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序元素
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchApplicationElement")
	public OperationResult<ApplicationElement> fetchApplicationElement(Criteria criteria,
			@QueryParam("token") String token) {
		return super.fetchApplicationElement(criteria, token);
	}

	/**
	 * 保存-应用程序元素
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveApplicationElement")
	public OperationResult<ApplicationElement> saveApplicationElement(ApplicationElement bo,
			@QueryParam("token") String token) {
		return super.saveApplicationElement(bo, token);
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序模块
	 * 
	 * @param criteria 查询
	 * @param token    口令
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
	 * @param bo    对象实例
	 * @param token 口令
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
	 * @param criteria 查询
	 * @param token    口令
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
	 * @param bo    对象实例
	 * @param token 口令
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
	 * 查询-业务对象检索条件
	 * 
	 * @param criteria 查询
	 * @param token    口令
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
	 * @param bo    对象实例
	 * @param token 口令
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
	 * @param criteria 查询
	 * @param token    口令
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
	 * @param bo    对象实例
	 * @param token 口令
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
	 * 查询-系统权限
	 * 
	 * @param criteria 查询
	 * @param token    口令
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
	 * @param bo    对象实例
	 * @param token 口令
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
	 * 查询-用户
	 * 
	 * @param criteria 查询
	 * @param token    口令
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
	 * @param bo    对象实例
	 * @param token 口令
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
	 * 查询-业务对象信息
	 * 
	 * @param criteria 查询
	 * @param token    口令
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
	 * @param bo    对象实例
	 * @param token 口令
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
	/**
	 * 查询-身份
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchIdentity")
	public OperationResult<Identity> fetchIdentity(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchIdentity(criteria, token);
	}

	/**
	 * 保存-身份
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveIdentity")
	public OperationResult<Identity> saveIdentity(Identity bo, @QueryParam("token") String token) {
		return super.saveIdentity(bo, token);
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-用户身份
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchUserIdentity")
	public OperationResult<UserIdentity> fetchUserIdentity(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchUserIdentity(criteria, token);
	}

	/**
	 * 保存-用户身份
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveUserIdentity")
	public OperationResult<UserIdentity> saveUserIdentity(UserIdentity bo, @QueryParam("token") String token) {
		return super.saveUserIdentity(bo, token);
	}

	// --------------------------------------------------------------------------------------------//

	/**
	 * 查询-身份权限
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchIdentityPrivilege")
	public OperationResult<IdentityPrivilege> fetchIdentityPrivilege(Criteria criteria,
			@QueryParam("token") String token) {
		return super.fetchIdentityPrivilege(criteria, token);
	}

	/**
	 * 保存-身份权限
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveIdentityPrivilege")
	public OperationResult<IdentityPrivilege> saveIdentityPrivilege(IdentityPrivilege bo,
			@QueryParam("token") String token) {
		return super.saveIdentityPrivilege(bo, token);
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-业务对象属性设置
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchBOPropertySetting")
	public OperationResult<BOPropertySetting> fetchBOPropertySetting(Criteria criteria,
			@QueryParam("token") String token) {
		return super.fetchBOPropertySetting(criteria, token);
	}

	/**
	 * 保存-业务对象属性设置
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveBOPropertySetting")
	public OperationResult<BOPropertySetting> saveBOPropertySetting(BOPropertySetting bo,
			@QueryParam("token") String token) {
		return super.saveBOPropertySetting(bo, token);
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-应用程序配置-身份
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchApplicationConfigIdentity")
	public OperationResult<ApplicationConfigIdentity> fetchApplicationConfigIdentity(Criteria criteria,
			@QueryParam("token") String token) {
		return super.fetchApplicationConfigIdentity(criteria, token);
	}

	/**
	 * 保存-应用程序配置-身份
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveApplicationConfigIdentity")
	public OperationResult<ApplicationConfigIdentity> saveApplicationConfigIdentity(ApplicationConfigIdentity bo,
			@QueryParam("token") String token) {
		return super.saveApplicationConfigIdentity(bo, token);
	}
	// --------------------------------------------------------------------------------------------//

}
