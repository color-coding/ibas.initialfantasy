package org.colorcoding.ibas.initialfantasy.repository;

import org.colorcoding.ibas.bobas.common.OperationMessage;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.initialfantasy.bo.shell.BizObjectInfo;
import org.colorcoding.ibas.initialfantasy.bo.shell.User;
import org.colorcoding.ibas.initialfantasy.bo.shell.UserConfig;
import org.colorcoding.ibas.initialfantasy.bo.shell.UserFunction;
import org.colorcoding.ibas.initialfantasy.bo.shell.UserModule;
import org.colorcoding.ibas.initialfantasy.bo.shell.UserPrivilege;
import org.colorcoding.ibas.initialfantasy.bo.shell.UserQuery;

/**
 * 壳应用
 * 
 * @author Niuren.Zhu
 *
 */
public interface IBORepositoryShell {
	/**
	 * 用户口令登录
	 * 
	 * @param token 用户口令
	 * @return 操作结果
	 */
	OperationResult<User> tokenConnect(String token);

	/**
	 * 用户登录
	 * 
	 * @param user     用户
	 * @param passwrod 密码
	 * @return 操作结果
	 */
	OperationResult<User> userConnect(String user, String password);

	/**
	 * 查询用户模块
	 * 
	 * @param user     用户
	 * @param platform 平台
	 * @param token    用户口令
	 * @return 操作结果
	 */
	OperationResult<UserModule> fetchUserModules(String user, String platform, String token);

	/**
	 * 查询用户权限
	 * 
	 * @param user     用户
	 * @param platform 平台
	 * @param token    用户口令
	 * @return 操作结果
	 */
	OperationResult<UserPrivilege> fetchUserPrivileges(String user, String platform, String token);

	/**
	 * 查询用户配置
	 * 
	 * @param user     用户
	 * @param platform 平台
	 * @param token    用户口令
	 * @return 操作结果
	 */
	OperationResult<UserConfig> fetchUserConfigs(String user, String platform, String token);

	/**
	 * 查询用户查询
	 * 
	 * @param user    用户
	 * @param queryId 查询标识
	 * @param token   用户口令
	 * @return 操作结果
	 */
	OperationResult<UserQuery> fetchUserQueries(String user, String queryId, String token);

	/**
	 * 查询用户查询
	 * 
	 * @param query 查询
	 * @param token 用户口令
	 * @return 操作结果
	 */
	OperationMessage saveUserQuery(UserQuery query, String token);

	/**
	 * 查询业务对象信息
	 * 
	 * @param user   用户
	 * @param boCode 对象编码
	 * @param token  用户口令
	 * @return 操作结果
	 */
	OperationResult<BizObjectInfo> fetchBizObjectInfo(String user, String boCode, String token);

	/**
	 * 查询用户功能
	 * 
	 * @param user  用户
	 * @param token 用户口令
	 * @return 操作结果
	 */
	OperationResult<UserFunction> fetchUserFunctions(String user, String token);
}
