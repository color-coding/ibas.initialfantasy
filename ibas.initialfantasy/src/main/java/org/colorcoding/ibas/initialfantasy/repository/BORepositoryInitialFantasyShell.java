package org.colorcoding.ibas.initialfantasy.repository;

import java.util.Arrays;
import java.util.Comparator;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.ISort;
import org.colorcoding.ibas.bobas.common.ISqlStoredProcedure;
import org.colorcoding.ibas.bobas.common.OperationInformation;
import org.colorcoding.ibas.bobas.common.OperationMessage;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.common.SortType;
import org.colorcoding.ibas.bobas.common.SqlStoredProcedure;
import org.colorcoding.ibas.bobas.core.RepositoryException;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emAuthoriseType;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.bobas.repository.BORepository4DbReadonly;
import org.colorcoding.ibas.bobas.repository.IBORepository4DbReadonly;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationConfig;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationConfigIdentity;
import org.colorcoding.ibas.initialfantasy.bo.application.IApplicationConfig;
import org.colorcoding.ibas.initialfantasy.bo.application.IApplicationConfigIdentity;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.BOCriteria;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.IBOCriteria;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.BOInformation;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.BOPropertySetting;
import org.colorcoding.ibas.initialfantasy.bo.organization.IUser;
import org.colorcoding.ibas.initialfantasy.bo.shell.ApplicationModule4Shell;
import org.colorcoding.ibas.initialfantasy.bo.shell.BizObjectInfo;
import org.colorcoding.ibas.initialfantasy.bo.shell.BizPropertyInfo;
import org.colorcoding.ibas.initialfantasy.bo.shell.User;
import org.colorcoding.ibas.initialfantasy.bo.shell.UserConfig;
import org.colorcoding.ibas.initialfantasy.bo.shell.UserModule;
import org.colorcoding.ibas.initialfantasy.bo.shell.UserPrivilege;
import org.colorcoding.ibas.initialfantasy.bo.shell.UserQuery;
import org.colorcoding.ibas.initialfantasy.data.DataConvert;
import org.colorcoding.ibas.initialfantasy.data.emAssignedType;
import org.colorcoding.ibas.initialfantasy.data.emAuthorisedValue;
import org.colorcoding.ibas.initialfantasy.data.emConfigCategory;
import org.colorcoding.ibas.initialfantasy.data.emRequiredValue;
import org.colorcoding.ibas.initialfantasy.data.emSearchedValue;
import org.colorcoding.ibas.initialfantasy.routing.ServiceRouting;

/**
 * 带壳应用的业务仓库
 *
 * @author Niuren.Zhu
 */
public class BORepositoryInitialFantasyShell extends BORepositoryInitialFantasy implements IBORepositoryShell {

	@Override
	public OperationResult<User> tokenConnect(String token) {
		try {
			this.setUserToken(token);
			// 当前口令被失败，判断用户状态
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organization.User.PROPERTY_DOCENTRY.getName());
			condition.setValue(this.getCurrentUser().getId());
			condition = criteria.getConditions().create();
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organization.User.PROPERTY_ACTIVATED.getName());
			condition.setValue(emYesNo.YES);
			// 当前日期
			String date = DateTime.getToday().toString();
			// 有效日期
			condition = criteria.getConditions().create();
			condition.setBracketOpen(1);
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organization.User.PROPERTY_VALIDDATE.getName());
			condition.setOperation(ConditionOperation.IS_NULL);
			condition = criteria.getConditions().create();
			condition.setRelationship(ConditionRelationship.OR);
			condition.setBracketOpen(1);
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organization.User.PROPERTY_VALIDDATE.getName());
			condition.setOperation(ConditionOperation.NOT_NULL);
			condition = criteria.getConditions().create();
			condition.setBracketClose(2);
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organization.User.PROPERTY_VALIDDATE.getName());
			condition.setOperation(ConditionOperation.LESS_EQUAL);
			condition.setValue(date);
			// 失效日期
			condition = criteria.getConditions().create();
			condition.setBracketOpen(1);
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organization.User.PROPERTY_INVALIDDATE.getName());
			condition.setOperation(ConditionOperation.IS_NULL);
			condition = criteria.getConditions().create();
			condition.setRelationship(ConditionRelationship.OR);
			condition.setBracketOpen(1);
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organization.User.PROPERTY_INVALIDDATE.getName());
			condition.setOperation(ConditionOperation.NOT_NULL);
			condition = criteria.getConditions().create();
			condition.setBracketClose(2);
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organization.User.PROPERTY_INVALIDDATE.getName());
			condition.setOperation(ConditionOperation.GRATER_EQUAL);
			condition.setValue(date);
			// 新仓库查询用户，避免权限问题
			BORepositoryInitialFantasyShell boRepository = new BORepositoryInitialFantasyShell();
			boRepository.setCurrentUser(OrganizationFactory.SYSTEM_USER.getToken());
			IOperationResult<IUser> opRsltUser = boRepository.fetchUser(criteria);
			if (opRsltUser.getError() != null) {
				throw opRsltUser.getError();
			}
			if (opRsltUser.getResultCode() != 0) {
				throw new Exception(opRsltUser.getMessage());
			}
			IUser boUser = opRsltUser.getResultObjects().firstOrDefault();
			if (boUser == null) {
				throw new Exception(I18N.prop("msg_if_user_not_exist_or_invalid", token));
			}
			return this.connectResult(boUser);
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	@Override
	public OperationResult<User> userConnect(String user, String password) {
		try {
			// 无效用户密码，直接报错
			if (DataConvert.isNullOrEmpty(user) || DataConvert.isNullOrEmpty(password)) {
				throw new Exception(I18N.prop("msg_if_user_name_and_password_not_match"));
			}
			// 设置用户口令，系统用户
			this.setUserToken(OrganizationFactory.SYSTEM_USER.getToken());
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organization.User.PROPERTY_CODE.getName());
			condition.setValue(user);
			// 邮箱登录
			if (MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_ALLOWED_MAIL_LOGIN, false)) {
				condition = criteria.getConditions().create();
				condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organization.User.PROPERTY_MAIL.getName());
				condition.setValue(user);
				condition.setRelationship(ConditionRelationship.OR);
			}
			// 手机登录
			if (MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_ALLOWED_PHONE_LOGIN, false)) {
				condition = criteria.getConditions().create();
				condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organization.User.PROPERTY_PHONE.getName());
				condition.setValue(user);
				condition.setRelationship(ConditionRelationship.OR);
			}
			if (criteria.getConditions().size() > 1) {
				criteria.getConditions().firstOrDefault().setBracketOpen(1);
				criteria.getConditions().lastOrDefault().setBracketClose(1);
			}
			// 是否激活
			condition = criteria.getConditions().create();
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organization.User.PROPERTY_ACTIVATED.getName());
			condition.setValue(emYesNo.YES);
			// 当前日期
			String date = DateTime.getToday().toString();
			// 有效日期
			condition = criteria.getConditions().create();
			condition.setBracketOpen(1);
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organization.User.PROPERTY_VALIDDATE.getName());
			condition.setOperation(ConditionOperation.IS_NULL);
			condition = criteria.getConditions().create();
			condition.setRelationship(ConditionRelationship.OR);
			condition.setBracketOpen(1);
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organization.User.PROPERTY_VALIDDATE.getName());
			condition.setOperation(ConditionOperation.NOT_NULL);
			condition = criteria.getConditions().create();
			condition.setBracketClose(2);
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organization.User.PROPERTY_VALIDDATE.getName());
			condition.setOperation(ConditionOperation.LESS_EQUAL);
			condition.setValue(date);
			// 失效日期
			condition = criteria.getConditions().create();
			condition.setBracketOpen(1);
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organization.User.PROPERTY_INVALIDDATE.getName());
			condition.setOperation(ConditionOperation.IS_NULL);
			condition = criteria.getConditions().create();
			condition.setRelationship(ConditionRelationship.OR);
			condition.setBracketOpen(1);
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organization.User.PROPERTY_INVALIDDATE.getName());
			condition.setOperation(ConditionOperation.NOT_NULL);
			condition = criteria.getConditions().create();
			condition.setBracketClose(2);
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organization.User.PROPERTY_INVALIDDATE.getName());
			condition.setOperation(ConditionOperation.GRATER_EQUAL);
			condition.setValue(date);
			IOperationResult<IUser> opRsltUser = this.fetchUser(criteria);
			if (opRsltUser.getError() != null) {
				throw opRsltUser.getError();
			}
			if (opRsltUser.getResultCode() != 0) {
				throw new Exception(opRsltUser.getMessage());
			}
			IUser boUser = opRsltUser.getResultObjects().firstOrDefault();
			if (boUser == null) {
				throw new Exception(I18N.prop("msg_if_user_not_exist_or_invalid", user));
			}
			if (!boUser.checkPassword(password)) {
				throw new Exception(I18N.prop("msg_if_user_name_and_password_not_match"));
			}
			return this.connectResult(boUser);
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	private OperationResult<User> connectResult(IUser boUser) {
		OperationResult<User> opRslt = new OperationResult<User>();
		// 登录此即刷新组织用户
		User orgUser = User.create(boUser);
		// 注册用户
		OrganizationFactory.create().createManager().register(orgUser);
		opRslt.setUserSign(orgUser.getToken());
		opRslt.addResultObjects(orgUser);
		String tag = "CONFIG_ITEM", value = null;
		// 返回公司代码
		value = MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_COMPANY);
		if (value != null && !value.isEmpty()) {
			opRslt.addInformations(new OperationInformation(MyConfiguration.CONFIG_ITEM_COMPANY, value, tag));
		}
		// 返回审批方法
		value = MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_APPROVAL_WAY);
		if (value != null && !value.isEmpty()) {
			opRslt.addInformations(new OperationInformation(MyConfiguration.CONFIG_ITEM_APPROVAL_WAY, value, tag));
		}
		// 返回组织方式
		value = MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_ORGANIZATION_WAY);
		if (value != null && !value.isEmpty()) {
			opRslt.addInformations(new OperationInformation(MyConfiguration.CONFIG_ITEM_ORGANIZATION_WAY, value, tag));
		}
		// 返回权限判断方式
		value = MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_OWNERSHIP_WAY);
		if (value != null && !value.isEmpty()) {
			opRslt.addInformations(new OperationInformation(MyConfiguration.CONFIG_ITEM_OWNERSHIP_WAY, value, tag));
		}
		return opRslt;
	}

	@Override
	public OperationResult<UserModule> fetchUserModules(String user, String platform, String token) {
		try {
			this.setUserToken(token);
			IBORepository4DbReadonly boRepository = new BORepository4DbReadonly("Master");
			ISqlStoredProcedure sp = new SqlStoredProcedure();
			sp.setName(MyConfiguration.applyVariables("${Company}_SYS_SP_GET_USER_MODULES"));
			sp.addParameters("Platform", platform);
			sp.addParameters("UserCode", user);
			IOperationResult<ApplicationModule4Shell> opRsltModules = boRepository.fetch(sp,
					ApplicationModule4Shell.class);
			if (opRsltModules.getResultCode() != 0) {
				throw new Exception(opRsltModules.getMessage());
			}
			if (opRsltModules.getError() != null) {
				throw opRsltModules.getError();
			}
			// 模块去重，获取有效地址
			ServiceRouting serviceRouting = ServiceRouting.create();
			ArrayList<UserModule> userModules = new ArrayList<UserModule>();
			for (ApplicationModule4Shell item : opRsltModules.getResultObjects()) {
				if (item.getAuthoriseValue() == emAuthoriseType.NONE) {
					continue;
				}
				UserModule userModule = userModules.firstOrDefault(c -> c.getId().equals(item.getModuleId()));
				if (userModule == null) {
					userModule = UserModule.create(item);
					// 设置有效服务
					if (serviceRouting.routing(userModule)) {
						userModules.add(userModule);
					}
				} else {
					// 保留最小权限设置
					if (userModule.getAuthorise().compareTo(item.getAuthoriseValue()) < 0) {
						userModule.setAuthorise(item.getAuthoriseValue());
					}
				}
			}
			// 模块排序
			userModules.sort((a, b) -> {
				return a.getOrder() - b.getOrder();
			});
			return new OperationResult<UserModule>().addResultObjects(userModules);
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	@Override
	public OperationResult<UserPrivilege> fetchUserPrivileges(String user, String platform, String token) {
		try {
			this.setUserToken(token);
			IBORepository4DbReadonly boRepository = new BORepository4DbReadonly("Master");
			ISqlStoredProcedure sp = new SqlStoredProcedure();
			sp.setName(MyConfiguration.applyVariables("${Company}_SYS_SP_GET_USER_PRIVILEGES"));
			sp.addParameters("Platform", platform);
			sp.addParameters("UserCode", user);
			IOperationResult<UserPrivilege> opRsltPrivileges = boRepository.fetch(sp, UserPrivilege.class);
			if (opRsltPrivileges.getError() != null) {
				throw opRsltPrivileges.getError();
			}
			if (opRsltPrivileges.getResultCode() != 0) {
				throw new Exception(opRsltPrivileges.getMessage());
			}
			// 去重
			OperationResult<UserPrivilege> opRslt = new OperationResult<>();
			for (UserPrivilege item : opRsltPrivileges.getResultObjects()) {
				if (item == null || item.getTarget() == null) {
					continue;
				}
				UserPrivilege privilege = opRslt.getResultObjects().firstOrDefault(
						c -> item.getTarget() == c.getTarget() || item.getTarget().equals(c.getTarget()));
				if (privilege != null) {
					// 保留最小权限
					if (privilege.getValue().compareTo(item.getValue()) < 0) {
						privilege.setValue(item.getValue());
						privilege.setAutomatic(item.getAutomatic());
					}
				} else {
					opRslt.addResultObjects(item);
				}
			}
			return opRslt;
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	@Override
	public OperationResult<UserQuery> fetchUserQueries(String user, String queryId, String token) {
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
			ICondition firstCondition = condition = criteria.getConditions().create();
			condition.setBracketOpen(1);
			condition.setAlias(BOCriteria.PROPERTY_ASSIGNEDTYPE.getName());
			condition.setValue(emAssignedType.USER);
			condition = criteria.getConditions().create();
			condition.setAlias(BOCriteria.PROPERTY_ASSIGNED.getName());
			condition.setValue(user);
			condition.setBracketClose(1);
			// 全局的查询
			ICondition lastCondition = condition = criteria.getConditions().create();
			condition.setRelationship(ConditionRelationship.OR);
			condition.setAlias(BOCriteria.PROPERTY_ASSIGNEDTYPE.getName());
			condition.setValue(emAssignedType.ALL);
			// 所属角色的查询
			if (this.getCurrentUser().getBelong() != null && !this.getCurrentUser().getBelong().isEmpty()) {
				condition = criteria.getConditions().create();
				condition.setRelationship(ConditionRelationship.OR);
				condition.setBracketOpen(1);
				condition.setAlias(BOCriteria.PROPERTY_ASSIGNEDTYPE.getName());
				condition.setValue(emAssignedType.ROLE);
				lastCondition = condition = criteria.getConditions().create();
				condition.setAlias(BOCriteria.PROPERTY_ASSIGNED.getName());
				condition.setValue(this.getCurrentUser().getBelong());
				condition.setBracketClose(1);
			}
			firstCondition.setBracketOpen(firstCondition.getBracketOpen() + 1);
			lastCondition.setBracketClose(lastCondition.getBracketClose() + 1);
			// 按使用频率排序
			ISort sort = criteria.getSorts().create();
			sort.setAlias(BOCriteria.PROPERTY_ORDER.getName());
			sort.setSortType(SortType.DESCENDING);
			IOperationResult<BOCriteria> opRsltFetch = this.fetchBOCriteria(criteria, token);
			if (opRsltFetch.getError() != null) {
				throw opRsltFetch.getError();
			}
			if (opRsltFetch.getResultCode() != 0) {
				throw new Exception(opRsltFetch.getMessage());
			}
			OperationResult<UserQuery> opRslt = new OperationResult<>();
			for (BOCriteria boItem : opRsltFetch.getResultObjects()) {
				opRslt.addResultObjects(UserQuery.create(boItem));
			}
			return opRslt;
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	@Override
	public OperationMessage saveUserQuery(UserQuery query, String token) {
		try {
			this.setUserToken(token);
			// 补全信息
			if (query.getUser() == null || query.getUser().isEmpty()) {
				BORepositoryInitialFantasyShell boRepository = new BORepositoryInitialFantasyShell();
				boRepository.setCurrentUser(OrganizationFactory.SYSTEM_USER);
				ICriteria criteria = new Criteria();
				ICondition condition = criteria.getConditions().create();
				condition.setAlias(
						org.colorcoding.ibas.initialfantasy.bo.organization.User.PROPERTY_ACTIVATED.getName());
				condition.setValue(emYesNo.YES);
				condition = criteria.getConditions().create();
				condition
						.setAlias(org.colorcoding.ibas.initialfantasy.bo.organization.User.PROPERTY_DOCENTRY.getName());
				condition.setValue(this.getCurrentUser().getId());
				IOperationResult<IUser> opRsltUser = this.fetchUser(criteria);
				if (opRsltUser.getError() != null) {
					throw opRsltUser.getError();
				}
				if (opRsltUser.getResultCode() != 0) {
					throw new Exception(opRsltUser.getMessage());
				}
				IUser boUser = opRsltUser.getResultObjects().firstOrDefault();
				if (boUser == null) {
					throw new Exception(I18N.prop("msg_if_user_not_exist_or_invalid", this.getCurrentUser().getId()));
				}
				query.setUser(boUser.getCode());
			}
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
			boolean myTrans = false;
			try {
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
				return new OperationMessage();
			} catch (Exception e) {
				if (myTrans) {
					try {
						this.rollbackTransaction();
					} catch (RepositoryException e1) {
						Logger.log(e1);
					}
				}
				return new OperationMessage(e);
			}
		} catch (Exception e) {
			return new OperationMessage(e);
		}
	}

	@Override
	public OperationResult<BizObjectInfo> fetchBizObjectInfo(String user, String boCode, String token) {
		try {
			this.setUserToken(token);
			// 主对象及子对象一并返回
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(BOInformation.PROPERTY_CODE.getName());
			condition.setOperation(ConditionOperation.EQUAL);
			condition.setValue(boCode);
			condition = criteria.getConditions().create();
			condition.setRelationship(ConditionRelationship.OR);
			condition.setAlias(BOInformation.PROPERTY_CODE.getName());
			condition.setOperation(ConditionOperation.START);
			condition.setValue(boCode + ".");
			IOperationResult<BOInformation> opRsltFetch = this.fetchBOInformation(criteria, token);
			if (opRsltFetch.getError() != null) {
				throw opRsltFetch.getError();
			}
			if (opRsltFetch.getResultCode() != 0) {
				throw new Exception(opRsltFetch.getMessage());
			}
			OperationResult<BizObjectInfo> opRslt = new OperationResult<>();
			for (BOInformation boItem : opRsltFetch.getResultObjects()) {
				opRslt.addResultObjects(BizObjectInfo.create(boItem));
			}
			String identities = "";
			if (this.getCurrentUser() instanceof User) {
				User cUser = (User) this.getCurrentUser();
				identities = cUser.getIdentities();
			}
			for (BizObjectInfo boInfo : opRslt.getResultObjects()) {
				criteria = new Criteria();
				condition = criteria.getConditions().create();
				condition.setAlias(BOPropertySetting.PROPERTY_BOCODE.getName());
				condition.setValue(boInfo.getCode());
				condition = criteria.getConditions().create();
				condition.setAlias(BOPropertySetting.PROPERTY_IDENTITYCODE.getName());
				condition.setValue("");
				if (identities != null && !identities.isEmpty()) {
					condition.setBracketOpen(1);
					for (String identity : identities.split(",")) {
						condition = criteria.getConditions().create();
						condition.setAlias(BOPropertySetting.PROPERTY_IDENTITYCODE.getName());
						condition.setValue(identity);
						condition.setRelationship(ConditionRelationship.OR);
					}
					condition.setBracketClose(1);
				}
				ISort sort = criteria.getSorts().create();
				sort.setAlias(BOPropertySetting.PROPERTY_BOCODE.getName());
				sort.setSortType(SortType.ASCENDING);
				sort = criteria.getSorts().create();
				sort.setAlias(BOPropertySetting.PROPERTY_IDENTITYCODE.getName());
				sort.setSortType(SortType.ASCENDING);
				sort = criteria.getSorts().create();
				sort.setAlias(BOPropertySetting.PROPERTY_PROPERTYCODE.getName());
				sort.setSortType(SortType.ASCENDING);
				OperationResult<BOPropertySetting> opRsltSetting = this.fetchBOPropertySetting(criteria, token);
				for (BizPropertyInfo ptyInfo : boInfo.getProperties()) {
					for (BOPropertySetting setting : opRsltSetting.getResultObjects()) {
						if (!boInfo.getCode().equals(setting.getBOCode())) {
							continue;
						}
						if (!ptyInfo.getName().equals(setting.getPropertyCode())) {
							continue;
						}
						if (ptyInfo.getAuthorised() != null) {
							int ptyValue = ptyInfo.getAuthorised().ordinal();
							int setValue = setting.getAuthorised() == null ? 0 : setting.getAuthorised().ordinal();
							if (ptyValue > (setValue - 1)) {
								continue;
							}
						}
						if (setting.getSearched() == emSearchedValue.YES) {
							ptyInfo.setSearched(true);
						} else if (setting.getSearched() == emSearchedValue.NO) {
							ptyInfo.setSearched(false);
						}
						if (setting.getAuthorised() == emAuthorisedValue.ALL) {
							ptyInfo.setAuthorised(emAuthoriseType.ALL);
						} else if (setting.getAuthorised() == emAuthorisedValue.READ) {
							ptyInfo.setAuthorised(emAuthoriseType.READ);
						} else if (setting.getAuthorised() == emAuthorisedValue.NONE) {
							ptyInfo.setAuthorised(emAuthoriseType.NONE);
						}
						if (setting.getPosition() != null && Integer.compare(setting.getPosition(), 0) > 0) {
							ptyInfo.setPosition(setting.getPosition());
						}
						if (setting.getRequired() == emRequiredValue.YES) {
							ptyInfo.setRequired(true);
						} else if (setting.getRequired() == emRequiredValue.NO) {
							ptyInfo.setRequired(false);
						}
					}

				}
				Arrays.sort(boInfo.getProperties(), new Comparator<BizPropertyInfo>() {
					@Override
					public int compare(BizPropertyInfo o1, BizPropertyInfo o2) {
						return Integer.compare(o1.getPosition() == null ? -1 : o1.getPosition(),
								o2.getPosition() == null ? -1 : o2.getPosition());
					}
				});
			}
			return opRslt;
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	@Override
	public OperationResult<UserConfig> fetchUserConfigs(String user, String platform, String token) {
		OperationResult<UserConfig> operationResult = new OperationResult<UserConfig>();
		try {
			this.setUserToken(token);
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(ApplicationConfig.PROPERTY_CATEGORY.getName());
			condition.setValue(emConfigCategory.CLIENT);
			condition = criteria.getConditions().create();
			condition.setAlias(ApplicationConfig.PROPERTY_ACTIVATED.getName());
			condition.setValue(emYesNo.YES);
			ISort sort = criteria.getSorts().create();
			sort.setAlias(ApplicationConfig.PROPERTY_CONFIGGROUP.getName());
			sort.setSortType(SortType.ASCENDING);
			sort = criteria.getSorts().create();
			sort.setAlias(ApplicationConfig.PROPERTY_CONFIGKEY.getName());
			sort.setSortType(SortType.ASCENDING);
			ArrayList<UserConfig> userConfigs = new ArrayList<UserConfig>();
			// 获取通用配置
			for (IApplicationConfig item : this.fetchApplicationConfig(criteria).getResultObjects()) {
				if (item.getConfigGroup() == null) {
					continue;
				}
				if (item.getConfigKey() == null) {
					continue;
				}
				userConfigs.add(UserConfig.create(item));
			}
			// 获取身份配置
			if (this.getCurrentUser() instanceof User) {
				User cUser = (User) this.getCurrentUser();
				if (cUser.getBelong() != null && !cUser.getBelong().isEmpty()) {
					// 用户有组织则
					criteria = new Criteria();
					condition = criteria.getConditions().create();
					condition.setAlias(ApplicationConfigIdentity.PROPERTY_ROLECODE.getName());
					condition.setValue(cUser.getBelong());
					condition = criteria.getConditions().create();
					condition.setAlias(ApplicationConfigIdentity.PROPERTY_IDENTITYCODE.getName());
					condition.setValue("");
					if (cUser.getIdentities() != null && !cUser.getIdentities().isEmpty()) {
						// 用户有身份
						condition.setBracketOpen(1);
						for (String item : cUser.getIdentities().split(",")) {
							condition = criteria.getConditions().create();
							condition.setAlias(ApplicationConfigIdentity.PROPERTY_IDENTITYCODE.getName());
							condition.setValue(item);
							condition.setRelationship(ConditionRelationship.OR);
						}
						condition.setBracketClose(1);
					}
					sort = criteria.getSorts().create();
					sort.setAlias(ApplicationConfig.PROPERTY_CONFIGGROUP.getName());
					sort.setSortType(SortType.ASCENDING);
					sort = criteria.getSorts().create();
					sort.setAlias(ApplicationConfig.PROPERTY_CONFIGKEY.getName());
					sort.setSortType(SortType.ASCENDING);
					sort = criteria.getSorts().create();
					sort.setAlias(ApplicationConfigIdentity.PROPERTY_ROLECODE.getName());
					sort.setSortType(SortType.ASCENDING);
					sort = criteria.getSorts().create();
					sort.setAlias(ApplicationConfigIdentity.PROPERTY_IDENTITYCODE.getName());
					sort.setSortType(SortType.ASCENDING);

					for (IApplicationConfigIdentity item : this.fetchApplicationConfigIdentity(criteria)
							.getResultObjects()) {
						UserConfig userConfig = userConfigs
								.firstOrDefault(c -> c.getGroup().equalsIgnoreCase(item.getConfigGroup())
										&& c.getKey().equalsIgnoreCase(item.getConfigKey()));
						// 父项不存在，则子项不返回
						if (userConfig != null) {
							userConfig.setValue(item.getConfigValue());
						}
					}
				}
			}
			// 仅返回配置内容的数据
			operationResult.addResultObjects(
					userConfigs.stream().filter(c -> c.getValue() != null && !c.getValue().isEmpty()).toArray());
		} catch (Exception e) {
			operationResult.setError(e);
		}
		return operationResult;
	}

	@Override
	public OperationResult<org.colorcoding.ibas.initialfantasy.bo.organization.User> saveUser(
			org.colorcoding.ibas.initialfantasy.bo.organization.User bo, String token) {
		// 更新时，恢复密码
		if (!bo.isDeleted()) {
			if (!bo.isNew() && org.colorcoding.ibas.initialfantasy.bo.organization.User.PASSWORD_MASK
					.equals(bo.getPassword())) {
				for (org.colorcoding.ibas.initialfantasy.bo.organization.User item : this
						.fetchUser(bo.getCriteria(), token).getResultObjects()) {
					bo.setOriginalPassword(item.getPassword());
				}
			}
			if (org.colorcoding.ibas.initialfantasy.bo.organization.User.PASSWORD_MASK.equals(bo.getPassword())) {
				return new OperationResult<>(new Exception(I18N.prop("msg_if_not_meet_password_rules")));
			}
		}
		return super.saveUser(bo, token);
	}
}
