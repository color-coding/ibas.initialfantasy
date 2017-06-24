package org.colorcoding.ibas.initialfantasy.repository;

import java.util.UUID;

import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.ISort;
import org.colorcoding.ibas.bobas.common.ISqlStoredProcedure;
import org.colorcoding.ibas.bobas.common.OperationInformation;
import org.colorcoding.ibas.bobas.common.OperationMessages;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.common.SortType;
import org.colorcoding.ibas.bobas.common.SqlStoredProcedure;
import org.colorcoding.ibas.bobas.core.RepositoryException;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.i18n;
import org.colorcoding.ibas.bobas.messages.RuntimeLog;
import org.colorcoding.ibas.bobas.organization.IOrganizationManager;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.bobas.organization.fantasy.OrganizationManager;
import org.colorcoding.ibas.bobas.repository.BORepository4DbReadonly;
import org.colorcoding.ibas.bobas.repository.IBORepository4DbReadonly;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;
import org.colorcoding.ibas.initialfantasy.bo.applications.ApplicationModule;
import org.colorcoding.ibas.initialfantasy.bo.applications.IApplicationModule;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.BOCriteria;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.IBOCriteria;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.BOInformation;
import org.colorcoding.ibas.initialfantasy.bo.organizations.IUser;
import org.colorcoding.ibas.initialfantasy.bo.shells.BOInfo;
import org.colorcoding.ibas.initialfantasy.bo.shells.User;
import org.colorcoding.ibas.initialfantasy.bo.shells.UserModule;
import org.colorcoding.ibas.initialfantasy.bo.shells.UserPrivilege;
import org.colorcoding.ibas.initialfantasy.bo.shells.UserQuery;
import org.colorcoding.ibas.initialfantasy.data.emAssignedType;
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
				throw new Exception(i18n.prop("msg_if_user_name_and_password_not_match"));
			}
			if (!boUser.checkPassword(password)) {
				throw new Exception(i18n.prop("msg_if_user_name_and_password_not_match"));
			}
			User sUser = User.create(boUser);
			// 生成token
			IOrganizationManager orgManager = OrganizationFactory.create().createManager();
			org.colorcoding.ibas.bobas.organization.IUser tmpUser = orgManager.getUser(sUser.getId());
			if (tmpUser instanceof org.colorcoding.ibas.bobas.organization.fantasy.User) {
				org.colorcoding.ibas.bobas.organization.fantasy.User orgUser = (org.colorcoding.ibas.bobas.organization.fantasy.User) tmpUser;// 用户可能未分配组织
				opRslt.setUserSign(orgUser.getToken());
			} else {
				// 设置连接口令
				opRslt.setUserSign(UUID.randomUUID().toString());
			}
			opRslt.addResultObjects(sUser);
			// 返回公司代码
			opRslt.addInformations(new OperationInformation(MyConfiguration.CONFIG_ITEM_COMPANY, "CONFIG_ITEM",
					MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_COMPANY, "CC")));
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
			IOperationResult<?> opRsltPrivileges = boRepository.fetch(sp, UserPrivilege.class);
			if (opRsltPrivileges.getError() != null) {
				throw opRsltPrivileges.getError();
			}
			if (opRsltPrivileges.getResultCode() != 0) {
				throw new Exception(opRsltPrivileges.getMessage());
			}
			opRslt.addResultObjects(opRsltPrivileges.getResultObjects());
		} catch (Exception e) {
			opRslt.setError(e);
		}
		return opRslt;
	}

	@Override
	public OperationResult<BOInfo> fetchBOInfos(String boName, String token) {
		OperationResult<BOInfo> opRslt = new OperationResult<>();
		try {
			this.setUserToken(token);
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(BOInformation.PROPERTY_CODE.getName());
			condition.setValue(boName);
			IOperationResult<BOInformation> opRsltFetch = this.fetchBOInformation(criteria, token);
			if (opRsltFetch.getError() != null) {
				throw opRsltFetch.getError();
			}
			if (opRsltFetch.getResultCode() != 0) {
				throw new Exception(opRsltFetch.getMessage());
			}
			for (BOInformation boItem : opRsltFetch.getResultObjects()) {
				opRslt.addResultObjects(BOInfo.create(boItem));
			}
		} catch (Exception e) {
			opRslt.setError(e);
		}
		return opRslt;
	}

	@Override
	public OperationResult<UserQuery> fetchUserQueries(String user, String queryId, String token) {
		OperationResult<UserQuery> opRslt = new OperationResult<>();
		try {
			this.setUserToken(token);
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setBracketOpen(1);
			condition.setAlias(BOCriteria.PROPERTY_ACTIVATED.getName());
			condition.setValue(emYesNo.YES);
			condition = criteria.getConditions().create();
			condition.setAlias(BOCriteria.PROPERTY_APPLICATIONID.getName());
			condition.setValue(queryId);
			condition.setBracketClose(1);
			// 自己的查询
			condition = criteria.getConditions().create();
			condition.setBracketOpen(2);
			condition.setAlias(BOCriteria.PROPERTY_ASSIGNEDTYPE.getName());
			condition.setValue(emAssignedType.USER);
			condition = criteria.getConditions().create();
			condition.setAlias(BOCriteria.PROPERTY_ASSIGNED.getName());
			condition.setValue(user);
			condition.setBracketClose(1);
			// 所属角色的查询
			IOrganizationManager manager = OrganizationFactory.create().createManager();
			if (manager instanceof OrganizationManager) {
				OrganizationManager ifManager = (OrganizationManager) manager;
				for (String role : ifManager.getUserRoles(this.getCurrentUser())) {
					condition = criteria.getConditions().create();
					condition.setRelationship(ConditionRelationship.OR);
					condition.setBracketOpen(1);
					condition.setAlias(BOCriteria.PROPERTY_ASSIGNEDTYPE.getName());
					condition.setValue(emAssignedType.ROLE);
					condition = criteria.getConditions().create();
					condition.setAlias(BOCriteria.PROPERTY_ASSIGNED.getName());
					condition.setValue(role);
					condition.setBracketClose(1);
				}
			}
			condition.setBracketClose(2);
			// 按使用频率排序
			ISort sort = criteria.getSorts().create();
			sort.setAlias(BOCriteria.PROPERTY_ORDER.getName());
			sort.setSortType(SortType.ASCENDING);
			IOperationResult<BOCriteria> opRsltFetch = this.fetchBOCriteria(criteria, token);
			if (opRsltFetch.getError() != null) {
				throw opRsltFetch.getError();
			}
			if (opRsltFetch.getResultCode() != 0) {
				throw new Exception(opRsltFetch.getMessage());
			}
			for (BOCriteria boItem : opRsltFetch.getResultObjects()) {
				opRslt.addResultObjects(UserQuery.create(boItem));
			}
		} catch (Exception e) {
			opRslt.setError(e);
		}
		return opRslt;
	}

	@Override
	public OperationMessages saveUserQuery(UserQuery query, String token) {
		OperationMessages opRslt = new OperationMessages();
		boolean myTrans = false;
		try {
			this.setUserToken(token);
			// 查询此用户已存在的数据
			// 通过对用户的要求，用来处理系统预置查询，不能被使用者修改，使用者修改时只是为自己复制一份。
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(BOCriteria.PROPERTY_APPLICATIONID.getName());
			condition.setValue(query.getId());
			condition = criteria.getConditions().create();
			condition.setAlias(BOCriteria.PROPERTY_NAME.getName());
			condition.setValue(query.getName());
			condition = criteria.getConditions().create();
			condition.setAlias(BOCriteria.PROPERTY_ASSIGNEDTYPE.getName());
			condition.setValue(emAssignedType.USER);
			condition = criteria.getConditions().create();
			condition.setAlias(BOCriteria.PROPERTY_ASSIGNED.getName());
			condition.setValue(
					query.getUser() != null ? query.getUser() : String.valueOf(this.getCurrentUser().getId()));

			myTrans = this.beginTransaction();
			// 查询已经存在的并删除
			IOperationResult<IBOCriteria> opRsltFetch = this.fetchBOCriteria(criteria);
			if (opRsltFetch.getError() != null) {
				throw opRsltFetch.getError();
			}
			if (opRsltFetch.getResultCode() != 0) {
				throw new Exception(opRsltFetch.getMessage());
			}
			for (IBOCriteria boItem : opRsltFetch.getResultObjects()) {
				boItem.delete();
				IOperationResult<IBOCriteria> opRsltSave = this.saveBOCriteria(boItem);
				if (opRsltSave.getError() != null) {
					throw opRsltSave.getError();
				}
				if (opRsltSave.getResultCode() != 0) {
					throw new Exception(opRsltSave.getMessage());
				}
			}
			// 保存新的
			if (query.getCriteria() != null && !query.getCriteria().isEmpty()) {
				// 被保存的查询要求有数据，可用此机制删除数据
				BOCriteria boCriteria = new BOCriteria();
				boCriteria.setApplicationId(query.getId());
				boCriteria.setActivated(emYesNo.YES);
				boCriteria.setAssignedType(emAssignedType.USER);
				boCriteria.setAssigned(
						query.getUser() != null ? query.getUser() : String.valueOf(this.getCurrentUser().getId()));
				boCriteria.setName(query.getName());
				boCriteria.setOrder(query.getOrder());
				boCriteria.setData(query.getCriteria());
				IOperationResult<IBOCriteria> opRsltSave = this.saveBOCriteria(boCriteria);
				if (opRsltSave.getError() != null) {
					throw opRsltSave.getError();
				}
				if (opRsltSave.getResultCode() != 0) {
					throw new Exception(opRsltSave.getMessage());
				}
			}
			if (myTrans)
				this.commitTransaction();
		} catch (Exception e) {
			opRslt.setError(e);
			if (myTrans)
				try {
					this.rollbackTransaction();
				} catch (RepositoryException e1) {
					RuntimeLog.log(e1);
				}
		}
		return opRslt;
	}

}
