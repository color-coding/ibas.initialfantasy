package org.colorcoding.ibas.initialfantasy.repository;

import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.initialfantasy.bo.shells.User;
import org.colorcoding.ibas.initialfantasy.bo.shells.UserModule;
import org.colorcoding.ibas.initialfantasy.bo.shells.UserPrivilege;

/**
 * 壳应用
 * 
 * @author Niuren.Zhu
 *
 */
public interface IBORepositoryShell {
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
	 * @param token
	 *            用户口令
	 * @return 操作结果
	 */
	OperationResult<UserPrivilege> fetchUserPrivileges(String user, String platform, String token);

}
