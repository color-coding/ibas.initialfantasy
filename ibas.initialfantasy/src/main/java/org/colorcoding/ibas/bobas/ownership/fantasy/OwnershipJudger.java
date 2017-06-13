package org.colorcoding.ibas.bobas.ownership.fantasy;

import java.util.HashMap;

import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.core.Daemon;
import org.colorcoding.ibas.bobas.core.IDaemonTask;
import org.colorcoding.ibas.bobas.core.InvalidDaemonTask;
import org.colorcoding.ibas.bobas.data.emAuthoriseType;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.expressions.JudmentOperationException;
import org.colorcoding.ibas.bobas.i18n.i18n;
import org.colorcoding.ibas.bobas.messages.RuntimeLog;
import org.colorcoding.ibas.bobas.organization.IUser;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.bobas.organization.fantasy.OrganizationManager;
import org.colorcoding.ibas.bobas.organization.fantasy.OrganizationalRelationship;
import org.colorcoding.ibas.bobas.organization.fantasy.User;
import org.colorcoding.ibas.bobas.ownership.IDataOwnership;
import org.colorcoding.ibas.bobas.ownership.IOwnershipJudger;
import org.colorcoding.ibas.bobas.ownership.NotConfiguredException;
import org.colorcoding.ibas.bobas.ownership.UnauthorizedException;
import org.colorcoding.ibas.bobas.repository.InvalidTokenException;
import org.colorcoding.ibas.bobas.util.ArrayList;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.BOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.IBOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.ownership.IOwnership;
import org.colorcoding.ibas.initialfantasy.bo.ownership.Ownership;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;
import org.colorcoding.ibas.initialfantasy.repository.IBORepositoryInitialFantasyApp;

/**
 * 权限裁判
 * 
 * @author Niuren.Zhu
 *
 */
public class OwnershipJudger implements IOwnershipJudger {

	public static final String MSG_OWNERSHIP_JUDGER_USER_NOT_ALLOW_READ = "judger: user [%s] not allow to read [%s]'s data.";
	public static final String MSG_OWNERSHIP_JUDGER_NOT_ALLOW_READ = "judger: finally, user [%s] can't read data [%s].";
	public static final String MSG_OWNERSHIP_JUDGER_USER_NOT_ALLOW_SAVE = "judger: user [%s] not allow to save [%s]'s data.";
	public static final String MSG_OWNERSHIP_JUDGER_NOT_ALLOW_SAVE = "judger: user [%s] can't save data [%s].";
	public static final String MSG_OWNERSHIP_JUDGER_NOT_ALLOW_CALL = "judger: user [%s] can't call function [%s.%s].";
	public static final String MSG_OWNERSHIP_JUDGER_DATA_FILTERED = "judger: role [%s] filtered data [%s].";
	public static final String MSG_OWNERSHIP_JUDGER_RELATIONSHIP = "judger: [%s] is [%s] of [%s].";

	public OwnershipJudger() {
		// 角色数据过滤，优先可用
		this.setRoleDataFirstAvailable(
				MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_ROLE_DATA_FIRST_AVAILABLE, true));
		// 设置组织结构刷新时间，默认180秒
		this.setFreshTime(MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_ORGANIZATION_REFRESH_TIME, 300));
		// 注册组织刷新任务
		try {
			Daemon.register(new IDaemonTask() {

				@Override
				public void run() {
					if (ownerships != null)
						ownerships.clear();
					if (boFilterings != null)
						boFilterings.clear();
				}

				@Override
				public String getName() {
					return "ownership refresh";
				}

				@Override
				public long getInterval() {
					return getFreshTime();
				}

				@Override
				public boolean isActivated() {
					return true;
				}
			});
		} catch (InvalidDaemonTask e) {
			RuntimeLog.log(e);
		}
	}

	private long freshTime;

	public long getFreshTime() {
		if (this.freshTime < 30) {
			this.freshTime = 30;
		}
		return this.freshTime;
	}

	public void setFreshTime(long value) {
		this.freshTime = value;
	}

	private boolean roleDataFirstAvailable;

	public boolean isRoleDataFirstAvailable() {
		return roleDataFirstAvailable;
	}

	public void setRoleDataFirstAvailable(boolean roleDataFirstAvailable) {
		this.roleDataFirstAvailable = roleDataFirstAvailable;
	}

	protected OrganizationManager getOrganizationManager() {
		return (OrganizationManager) OrganizationFactory.create().createManager();
	}

	private BORepositoryInitialFantasy repository;

	private IBORepositoryInitialFantasyApp createRepository() {
		if (repository == null) {
			try {
				repository = new BORepositoryInitialFantasy();
				repository.setUserToken(User.SYSTEM_USER.getToken());
				repository.setUseCache(false);
			} catch (InvalidTokenException e) {
				throw new RuntimeException(e);
			}
		}
		return repository;
	}

	private HashMap<String, IOwnership> ownerships = new HashMap<>();

	/**
	 * 获取所有权配置
	 * 
	 * @param boCode
	 *            业务对象
	 * @param roles
	 *            角色数组
	 * @return
	 */
	protected IOwnership getOwnership(String boCode, String user) {
		String key = String.format("%s/%s", boCode, user);
		// 缓存中查询数据
		if (ownerships.containsKey(key)) {
			return ownerships.get(key);
		}
		// 构建查询条件
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(Ownership.PROPERTY_BOCODE.getName());
		condition.setValue(boCode);
		condition = criteria.getConditions().create();
		condition.setAlias(Ownership.PROPERTY_ACTIVATED.getName());
		condition.setValue(emYesNo.YES);
		condition = criteria.getConditions().create();
		condition.setAlias(Ownership.PROPERTY_USERCODE.getName());
		condition.setValue(user);

		IBORepositoryInitialFantasyApp boRepository = this.createRepository();
		IOperationResult<?> operationResult = boRepository.fetchOwnership(criteria);
		IOwnership ownership = (IOwnership) operationResult.getResultObjects().firstOrDefault();
		ownerships.put(key, ownership);
		return ownership;
	}

	private HashMap<String, IBOFiltering> boFilterings = new HashMap<>();

	/**
	 * 获取所有权配置
	 * 
	 * @param boCode
	 *            业务对象
	 * @param roles
	 *            角色数组
	 * @return
	 */
	protected IBOFiltering[] getBOFilterings(String boCode, String[] roles) {
		ArrayList<IBOFiltering> filterings = new ArrayList<>();
		ArrayList<String> doRoles = new ArrayList<>();
		for (String role : roles) {
			String key = String.format("%s/%s", boCode, role);
			if (boFilterings.containsKey(key)) {
				filterings.add(boFilterings.get(key));
			} else {
				// 不存在的角色权限
				doRoles.add(role);
			}
		}
		// 构建查询条件， (BOCode = 'XXXX' AND Activated = 'Y')
		// AND (Role = 'A' OR Role = 'B')
		if (doRoles.size() > 0) {
			// 存在未缓存的角色权限
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setBracketOpen(1);
			condition.setAlias(BOFiltering.PROPERTY_BOCODE.getName());
			condition.setValue(boCode);
			condition = criteria.getConditions().create();
			condition.setAlias(BOFiltering.PROPERTY_ACTIVATED.getName());
			condition.setValue(emYesNo.YES);
			condition.setBracketClose(1);
			for (int i = 0; i < doRoles.size(); i++) {
				condition = criteria.getConditions().create();
				condition.setAlias(BOFiltering.PROPERTY_ROLECODE.getName());
				condition.setValue(doRoles.get(i));
				condition.setRelationship(ConditionRelationship.OR);
				if (i == 0) {
					// first.
					condition.setRelationship(ConditionRelationship.AND);
					condition.setBracketOpen(1);
				}
				if (i == doRoles.size() - 1) {
					// last.
					condition.setBracketClose(1);
				}
			}
			IBORepositoryInitialFantasyApp boRepository = this.createRepository();
			IOperationResult<?> operationResult = boRepository.fetchBOFiltering(criteria);
			for (IBOFiltering filtering : operationResult.getResultObjects().toArray(new IBOFiltering[] {})) {
				String key = String.format("%s/%s", filtering.getBOCode(), filtering.getRoleCode());
				boFilterings.put(key, filtering);// 缓存数据
				filterings.add(filtering);// 返回数据
			}
		}
		return filterings.toArray(new IBOFiltering[] {});
	}

	/**
	 * 过滤数据
	 * 
	 * 注意，配置的条件中，任意一个不满足则不满足
	 * 
	 * @param bo
	 *            数据
	 * @param role
	 *            角色
	 * @return true,被过滤；false,未被过滤
	 */
	protected boolean filtering(IDataOwnership bo, String[] roles) {
		if (bo != null && roles != null && roles.length > 0) {
			IBOFiltering[] filterings = this.getBOFilterings(bo.getObjectCode(), roles);
			boolean finallyStatus = true;// 默认符合条件（能看）
			String roleCode = null;
			for (IBOFiltering filtering : filterings) {
				try {
					BOFilteringJudgmentLinks judgmentLinks = new BOFilteringJudgmentLinks();
					judgmentLinks.parsingConditions(filtering.getBOFilteringConditions());
					boolean done = judgmentLinks.judge(bo);
					if (done) {
						// 符合条件（能看的）
						if (this.isRoleDataFirstAvailable()) {
							// 优先可用
							finallyStatus = done;
							break;
						}
					} else {
						// 不符合条件（不能看的）
						finallyStatus = done;
						roleCode = filtering.getRoleCode();
						if (!this.isRoleDataFirstAvailable()) {
							// 优先不可用
							break;
						}
					}
				} catch (JudmentOperationException e) {
					RuntimeLog.log(e);
				}
			}
			if (!finallyStatus) {
				RuntimeLog.log(MSG_OWNERSHIP_JUDGER_DATA_FILTERED, roleCode, bo.toString());
				return true;
			}
		}
		return false;
	}

	@Override
	public boolean canRead(IDataOwnership bo, IUser user) {
		boolean status = false;
		if (user != null && bo != null) {
			boolean canRead = true;
			if (user != User.SYSTEM_USER) {// 系统用户，不进行权限处理
				// 操作用户是否有权限读取数据
				IOwnership ownership = this.getOwnership(bo.getObjectCode(), ((User) user).getCode());
				if (ownership != null) {
					if (ownership.getSelf() == emAuthoriseType.NONE) {
						// 设置了角色没有此对象权限
						canRead = false;
						RuntimeLog.log(MSG_OWNERSHIP_JUDGER_USER_NOT_ALLOW_READ, user, ownership.getBOCode());
					}
				}
				String[] roles = this.getOrganizationManager().getUserRoles(user);
				if (canRead && bo.getDataOwner() != null) {
					// 操作用户是否有权限读取当前数据
					IUser owner = this.getOrganizationManager().getUser(bo.getDataOwner());
					if (owner != null && !owner.equals(user)) {
						// 用户有权限读取业务对象，开始判断对此数据的权限
						ownership = this.getOwnership(bo.getObjectCode(), ((User) owner).getCode());
						if (ownership != null) {
							// 数据所有者配置了权限
							OrganizationalRelationship relationship = this.getOrganizationManager()
									.getRelationship(owner, user);
							RuntimeLog.log(MSG_OWNERSHIP_JUDGER_RELATIONSHIP, user, relationship, owner);
							// 当前用户是否为权限角色
							boolean ruleShip = false;
							if (ownership.getRuleCodes() != null) {
								String[] tmpRules = ownership.getRuleCodes().split(",");
								for (String tmp : tmpRules) {
									for (String rule : roles) {
										if (rule.equalsIgnoreCase(tmp.trim())) {
											ruleShip = true;
											break;
										}
									}
								}
							}
							if (relationship == OrganizationalRelationship.LEADER) {
								// 是数据所有者的领导
								canRead = ownership.getHigherLevel() == emAuthoriseType.NONE ? false : true;
							} else if (relationship == OrganizationalRelationship.COLLEAGUES) {
								// 是数据所有者的同事
								canRead = ownership.getEqualLevel() == emAuthoriseType.NONE ? false : true;
							} else if (relationship == OrganizationalRelationship.SUBORDINATE) {
								// 是数据所有者的下属
								canRead = ownership.getLowerLevel() == emAuthoriseType.NONE ? false : true;
							} else if (ruleShip) {
								// 角色权限
								canRead = ownership.getRules() == emAuthoriseType.NONE ? false : true;
							} else {
								// 没关系
								canRead = ownership.getOthers() == emAuthoriseType.NONE ? false : true;
							}
						}
					}
				}
				// 判断数据是否设置过滤条件
				if (canRead) {
					// 数据被设置了过滤条件
					canRead = !this.filtering(bo, roles);
				}
			}
			if (canRead) {
				// 条件全部通过，此数据可读
				status = true;
			}
			if (!status) {
				// 不允许读取数据
				RuntimeLog.log(MSG_OWNERSHIP_JUDGER_NOT_ALLOW_READ, user.toString(), bo.toString());
			}
		}
		return status;
	}

	@Override
	public boolean canRead(IDataOwnership bo, IUser user, boolean throwError) throws UnauthorizedException {
		boolean status = this.canRead(bo, user);
		if (throwError && !status) {
			throw new UnauthorizedException();
		}
		return status;
	}

	@Override
	public boolean canSave(IDataOwnership bo, IUser user) {
		boolean status = false;
		if (user != null && bo != null) {
			// 判断操作者是否有权限
			boolean canSave = true;
			IOwnership ownership = this.getOwnership(bo.getObjectCode(), ((User) user).getCode());
			if (ownership != null) {
				if (ownership.getSelf() != emAuthoriseType.ALL) {
					// 设置了角色没有此对象权限
					canSave = false;
					RuntimeLog.log(MSG_OWNERSHIP_JUDGER_USER_NOT_ALLOW_SAVE, user, ownership.getBOCode());
				}
			}
			String[] roles = this.getOrganizationManager().getUserRoles(user);
			// 判断操作者对数据是否有权限
			if (canSave && bo.getDataOwner() != null) {
				IUser owner = this.getOrganizationManager().getUser(bo.getDataOwner());
				if (owner != null && !owner.equals(user)) {
					// 非所有者修改
					// 用户有权限保存业务对象，开始判断对此数据的权限
					ownership = this.getOwnership(bo.getObjectCode(), ((User) owner).getCode());
					if (ownership != null) {
						OrganizationalRelationship relationship = this.getOrganizationManager().getRelationship(owner,
								user);
						RuntimeLog.log(MSG_OWNERSHIP_JUDGER_RELATIONSHIP, user, relationship, owner);
						// 当前用户是否为权限角色
						boolean ruleShip = false;
						if (ownership.getRuleCodes() != null) {
							String[] tmpRules = ownership.getRuleCodes().split(",");
							for (String tmp : tmpRules) {
								for (String rule : roles) {
									if (rule.equalsIgnoreCase(tmp.trim())) {
										ruleShip = true;
										break;
									}
								}
							}
						}
						if (relationship == OrganizationalRelationship.LEADER) {
							// 是数据所有者的领导
							canSave = ownership.getHigherLevel() != emAuthoriseType.ALL ? false : true;
						} else if (relationship == OrganizationalRelationship.COLLEAGUES) {
							// 是数据所有者的同事
							canSave = ownership.getEqualLevel() != emAuthoriseType.ALL ? false : true;
						} else if (relationship == OrganizationalRelationship.SUBORDINATE) {
							// 是数据所有者的下属
							canSave = ownership.getLowerLevel() != emAuthoriseType.ALL ? false : true;
						} else if (ruleShip) {
							// 角色权限
							canSave = ownership.getRules() == emAuthoriseType.NONE ? false : true;
						} else {
							// 没关系
							canSave = ownership.getOthers() != emAuthoriseType.ALL ? false : true;
						}
					}
				}
			}
			if (canSave) {
				// 条件全部通过，此数据可读
				status = true;
			}
		}
		if (!status) {
			// 不允许读取数据
			RuntimeLog.log(MSG_OWNERSHIP_JUDGER_NOT_ALLOW_SAVE, user.toString(), bo.toString());
		}
		return status;
	}

	@Override
	public boolean canSave(IDataOwnership bo, IUser user, boolean throwError) throws UnauthorizedException {
		boolean status = this.canSave(bo, user);
		if (throwError && !status) {
			throw new UnauthorizedException(i18n.prop("msg_bobas_to_save_bo_unauthorized"));
		}
		return status;
	}

	@Override
	public boolean canCall(String className, String methodName, IUser user)
			throws NotConfiguredException, UnauthorizedException {
		boolean status = false;

		if (!status) {
			// 不允许读取数据
			RuntimeLog.log(MSG_OWNERSHIP_JUDGER_NOT_ALLOW_CALL, user.toString(), className, methodName);
		}
		return status;
	}

}
