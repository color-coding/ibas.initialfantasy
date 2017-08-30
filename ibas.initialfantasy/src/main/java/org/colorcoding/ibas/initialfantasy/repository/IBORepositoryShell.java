package org.colorcoding.ibas.initialfantasy.repository;

import org.colorcoding.ibas.bobas.common.OperationMessages;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.initialfantasy.bo.shells.BOInfo;
import org.colorcoding.ibas.initialfantasy.bo.shells.User;
import org.colorcoding.ibas.initialfantasy.bo.shells.UserModule;
import org.colorcoding.ibas.initialfantasy.bo.shells.UserPrivilege;
import org.colorcoding.ibas.initialfantasy.bo.shells.UserQuery;

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
	 * @param token
	 *            用户口令
	 * @return 操作结果
	 */
	OperationResult<User> tokenConnect(String token);
	/**
	 * 用户登录
	 * 
	 * @param token
	 *            用户token
	 * @return 操作结果
	 */
	OperationResult<User> userConnect(String token);
	/**
	 * 用户登录
	 * 
	 * @param user
	 *            用户
	 * @param passwrod
	 *            密码
	 * @return 操作结果
	 */
	OperationResult<User> userConnect(String user, String password);

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
	OperationResult<UserModule> fetchUserModules(String user, String platform, String token);

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
	OperationResult<UserPrivilege> fetchUserPrivileges(String user, String platform, String token);

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
	OperationResult<UserQuery> fetchUserQueries(String user, String queryId, String token);

	/**
	 * 查询用户查询
	 * 
	 * @param query
	 *            查询
	 * @param token
	 *            用户口令
	 * @return 操作结果
	 */
	OperationMessages saveUserQuery(UserQuery query, String token);

	/**
	 * 查询业务对象信息
	 * 
	 * @param boName
	 *            对象名称
	 * @param token
	 *            用户口令
	 * @return 操作结果
	 */
	OperationResult<BOInfo> fetchBOInfos(String boName, String token);

}
