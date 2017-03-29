package org.colorcoding.ibas.initialfantasy.repository;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.ISqlStoredProcedure;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.common.SqlStoredProcedure;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.i18n;
import org.colorcoding.ibas.bobas.organization.IOrganizationManager;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.bobas.repository.BORepository4DbReadonly;
import org.colorcoding.ibas.bobas.repository.IBORepository4DbReadonly;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;
import org.colorcoding.ibas.initialfantasy.bo.applications.ApplicationModule;
import org.colorcoding.ibas.initialfantasy.bo.applications.IApplicationModule;
import org.colorcoding.ibas.initialfantasy.bo.organizations.IUser;
import org.colorcoding.ibas.initialfantasy.bo.privilege.IPrivilege;
import org.colorcoding.ibas.initialfantasy.bo.privilege.Privilege;
import org.colorcoding.ibas.initialfantasy.bo.shells.User;
import org.colorcoding.ibas.initialfantasy.bo.shells.UserModule;
import org.colorcoding.ibas.initialfantasy.bo.shells.UserPrivilege;
import org.colorcoding.ibas.initialfantasy.routing.ServiceRouting;

/**
 * 带壳应用的业务仓库
 * 
 * @author Niuren.Zhu
 *
 */
public class BORepositoryInitialFantasyShell extends BORepositoryInitialFantasy implements IBORepositoryShell {

	@Override
	public OperationResult<User> userConnect(String user, String password) {
		OperationResult<User> opRslt = new OperationResult<User>();
		try {
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organizations.User.PROPERTY_ACTIVATED.getName());
			condition.setValue(emYesNo.YES);
			condition = criteria.getConditions().create();
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organizations.User.PROPERTY_CODE.getName());
			condition.setValue(user);
			// 设置用户口令，系统用户
			this.setUserToken(org.colorcoding.ibas.bobas.organization.fantasy.User.SYSTEM_USER.getToken());
			IOperationResult<IUser> opRsltUser = this.fetchUser(criteria);
			if (opRsltUser.getError() != null) {
				throw opRsltUser.getError();
			}
			if (opRsltUser.getResultCode() != 0) {
				throw new Exception(opRsltUser.getMessage());
			}
			IUser boUser = opRsltUser.getResultObjects().firstOrDefault();
			if (boUser == null) {
				throw new Exception(i18n.prop("msg_sys_user_name_and_password_not_match"));
			}
			User sUser = User.create(boUser);
			if (sUser.checkPassword(password)) {
				throw new Exception(i18n.prop("msg_sys_user_name_and_password_not_match"));
			}
			// 生成token
			IOrganizationManager orgManager = OrganizationFactory.create().createManager();
			org.colorcoding.ibas.bobas.organization.IUser tmpUser = orgManager.getUser(sUser.getId());
			if (tmpUser instanceof org.colorcoding.ibas.bobas.organization.fantasy.User) {
				org.colorcoding.ibas.bobas.organization.fantasy.User orgUser = (org.colorcoding.ibas.bobas.organization.fantasy.User) tmpUser;// 用户可能未分配组织
				opRslt.setUserSign(orgUser.getToken());
			}
			opRslt.addResultObjects(sUser);
		} catch (Exception e) {
			opRslt.setError(e);
		}
		return opRslt;
	}

	@Override
	public OperationResult<UserModule> fetchUserModules(String user, String platform, String token) {
		OperationResult<UserModule> opRslt = new OperationResult<UserModule>();
		try {
			this.setUserToken(token);
			IBORepository4DbReadonly boRepository = new BORepository4DbReadonly("Master");
			ISqlStoredProcedure sp = new SqlStoredProcedure();
			sp.setName(MyConfiguration.applyVariables("${Company}_SYS_SP_GET_USER_MODULES"));
			sp.addParameters("Platform", platform);
			sp.addParameters("UserCode", user);
			IOperationResult<?> opRsltModules = boRepository.fetch(sp, ApplicationModule.class);
			if (opRsltModules.getResultCode() != 0) {
				throw new Exception(opRsltModules.getMessage());
			}
			if (opRsltModules.getError() != null) {
				throw opRsltModules.getError();
			}
			ServiceRouting serviceRouting = ServiceRouting.create();
			for (Object item : opRsltModules.getResultObjects()) {
				if (item instanceof IApplicationModule) {
					UserModule userModule = UserModule.create((IApplicationModule) item);
					serviceRouting.routing(userModule);// 设置有效服务
					opRslt.addResultObjects(userModule);
				}
			}
		} catch (Exception e) {
			opRslt.setError(e);
		}
		return opRslt;
	}

	@Override
	public OperationResult<UserPrivilege> fetchUserPrivileges(String user, String platform, String token) {
		OperationResult<UserPrivilege> opRslt = new OperationResult<>();
		try {
			this.setUserToken(token);
			IBORepository4DbReadonly boRepository = new BORepository4DbReadonly("Master");
			ISqlStoredProcedure sp = new SqlStoredProcedure();
			sp.setName(MyConfiguration.applyVariables("${Company}_SYS_SP_GET_USER_PRIVILEGES"));
			sp.addParameters("Platform", platform);
			sp.addParameters("UserCode", user);
			IOperationResult<?> opRsltPrivileges = boRepository.fetch(sp, Privilege.class);
			if (opRsltPrivileges.getError() != null) {
				throw opRsltPrivileges.getError();
			}
			if (opRsltPrivileges.getResultCode() != 0) {
				throw new Exception(opRsltPrivileges.getMessage());
			}
			for (Object item : opRsltPrivileges.getResultObjects()) {
				if (item instanceof IPrivilege) {
					opRslt.getResultObjects().add(UserPrivilege.create((IPrivilege) item));
				}
			}
		} catch (Exception e) {
			opRslt.setError(e);
		}
		return opRslt;
	}

}
