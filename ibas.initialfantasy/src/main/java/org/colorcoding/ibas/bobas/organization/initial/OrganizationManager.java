package org.colorcoding.ibas.bobas.organization.initial;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.DateTimes;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.ISort;
import org.colorcoding.ibas.bobas.common.SortType;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.List;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.organization.IUser;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;
import org.colorcoding.ibas.initialfantasy.bo.identity.IUserIdentity;
import org.colorcoding.ibas.initialfantasy.bo.identity.UserIdentity;
import org.colorcoding.ibas.initialfantasy.bo.shell.User;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;

public class OrganizationManager extends org.colorcoding.ibas.bobas.organization.OrganizationManager {

	/**
	 * 获取 Token 空闲超时时间（秒）
	 */
	private static int getTokenTimeout() {
		return MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_USER_TOKEN_TIMEOUT_TIME, 0);
	}

	/**
	 * 获取每个用户允许的有效 Token 实例数
	 */
	private static int getTokenInstances() {
		return MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_USER_TOKEN_INSTANCES, 0);
	}

	/**
	 * 获取 Token 最大绝对有效期（秒）
	 */
	private static int getTokenMaxAge() {
		return MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_USER_TOKEN_MAX_AGE, 0);
	}

	@Override
	public IUser getUser(String token) {
		if (token != null) {
			if (token.equals(OrganizationFactory.SYSTEM_USER.getToken())) {
				return OrganizationFactory.SYSTEM_USER;
			}
			IUser user = this.getTokenUsers().get(token);
			if (user instanceof User) {
				User oUser = (User) user;
				if (oUser.getTokenTimeStamp() > 0) {
					long elapsedSeconds = (DateTimes.now().getTime() - oUser.getTokenTimeStamp()) / 1000;
					int timeout = getTokenTimeout();
					boolean expired = false;
					// 检查空闲超时
					if (timeout > 0 && elapsedSeconds > timeout) {
						expired = true;
					}
					// 检查绝对有效期
					if (getTokenMaxAge() > 0 && oUser.getTokenCreateTime() > 0) {
						long totalSeconds = (DateTimes.now().getTime() - oUser.getTokenCreateTime()) / 1000;
						if (totalSeconds > getTokenMaxAge()) {
							expired = true;
						}
					}
					if (expired) {
						// Token 已过期，移除该 Token
						this.getTokenUsers().remove(token);
						// 注意：不删除 idUsers，因为同一用户可能有其他有效 Token
						return null;
					} else {
						// 续期：更新最后访问时间
						oUser.setTokenTimeStamp();
					}
				}
			}
			if (user != null && user.getId() > 0) {
				return checkIdentities(user);
			}
			return user;
		}
		return null;
	}

	@Override
	public IUser getUser(int id) {
		if (id == OrganizationFactory.SYSTEM_USER.getId()) {
			return OrganizationFactory.SYSTEM_USER;
		}
		IUser user = this.getIdUsers().get(id);
		if (user != null) {
			return checkIdentities(user);
		}
		return OrganizationFactory.UNKNOWN_USER;
	}

	@Override
	public void initialize() {
		try {
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organization.User.PROPERTY_ACTIVATED.getName());
			condition.setValue(emYesNo.YES);
			condition = criteria.getConditions().create();
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organization.User.PROPERTY_DOCENTRY.getName());
			condition.setOperation(ConditionOperation.GREATER_THAN);
			condition.setValue(0);
			try (BORepositoryInitialFantasy boRepository = new BORepositoryInitialFantasy()) {
				boRepository.setUserToken(OrganizationFactory.SYSTEM_USER.getToken());
				IOperationResult<org.colorcoding.ibas.initialfantasy.bo.organization.IUser> operationResult = boRepository
						.fetchUser(criteria);
				if (operationResult.getError() != null) {
					throw operationResult.getError();
				}
				User user;
				this.idUsers = new ConcurrentHashMap<>(operationResult.getResultObjects().size());
				this.tokenUsers = new ConcurrentHashMap<>(operationResult.getResultObjects().size());
				for (org.colorcoding.ibas.initialfantasy.bo.organization.IUser item : operationResult
						.getResultObjects()) {
					user = User.create(item);
					this.idUsers.put(user.getId(), user);
					this.tokenUsers.put(user.getToken(), user);
				}
			}
			// 从旧管理器中迁移仍然有效的Token，避免定时刷新导致活跃会话被强制下线
			this.migrateActiveTokens();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * 从当前运行的组织管理器中迁移仍然有效的Token。
	 * <p>
	 * 定时刷新时，initialize() 会为每个用户生成新Token（含新的TokenTimeStamp），
	 * 导致客户端持有的旧Token失效。此方法在initialize()之后调用，
	 * 将旧管理器中尚未过期的Token迁移到新管理器，保持活跃会话不断线。
	 * </p>
	 */
	private void migrateActiveTokens() {
		// 获取当前正在使用的管理器（旧实例）
		org.colorcoding.ibas.bobas.organization.OrganizationManager currentManager;
		try {
			currentManager = OrganizationFactory.createManager();
		} catch (Exception e) {
			return;
		}
		// 首次初始化时，旧实例就是自己，无需迁移
		if (currentManager == this) {
			return;
		}
		// 旧管理器类型不匹配，无法迁移
		if (!(currentManager instanceof OrganizationManager)) {
			return;
		}
		Map<String, IUser> oldTokenUsers = ((OrganizationManager) currentManager).getTokenUsers();
		if (oldTokenUsers == null || oldTokenUsers.isEmpty()) {
			return;
		}
		int timeout = getTokenTimeout();
		int maxAge = getTokenMaxAge();
		long now = DateTimes.now().getTime();
		for (Map.Entry<String, IUser> entry : oldTokenUsers.entrySet()) {
			String oldToken = entry.getKey();
			IUser oldUser = entry.getValue();
			if (oldUser == null) {
				continue;
			}
			// 跳过新管理器中已存在的Token（如静态Token用户，新旧Token相同）
			if (this.tokenUsers.containsKey(oldToken)) {
				continue;
			}
			// 用户在新数据中不存在（已停用/删除/日期失效），不迁移
			IUser newUserInDb = this.idUsers.get(oldUser.getId());
			if (newUserInDb == null) {
				continue;
			}
			// 检查旧Token是否已过期
			if (oldUser instanceof User) {
				User oldOrgUser = (User) oldUser;
				if (oldOrgUser.getTokenTimeStamp() > 0) {
					long elapsedSeconds = (now - oldOrgUser.getTokenTimeStamp()) / 1000;
					// 空闲超时
					if (timeout > 0 && elapsedSeconds > timeout) {
						continue;
					}
					// 绝对有效期过期
					if (maxAge > 0 && oldOrgUser.getTokenCreateTime() > 0) {
						long totalSeconds = (now - oldOrgUser.getTokenCreateTime()) / 1000;
						if (totalSeconds > maxAge) {
							continue;
						}
					}
				}
			}
			// 移除 initialize() 中新生成的无用Token（无客户端持有此Token）
			if (newUserInDb.getToken() != null && !newUserInDb.getToken().equals(oldToken)) {
				this.tokenUsers.remove(newUserInDb.getToken());
			}
			// 迁移旧Token到新管理器
			this.tokenUsers.put(oldToken, oldUser);
			// 更新idUsers，使 getUser(id) 返回持有活跃Token的用户对象
			this.idUsers.put(oldUser.getId(), oldUser);
		}
	}

	private volatile Map<Integer, IUser> idUsers;

	protected final Map<Integer, IUser> getIdUsers() {
		if (this.idUsers == null) {
			synchronized (this) {
				if (this.idUsers == null) {
					this.idUsers = new ConcurrentHashMap<>();
				}
			}
		}
		return this.idUsers;
	}

	private volatile Map<String, IUser> tokenUsers;

	protected final Map<String, IUser> getTokenUsers() {
		if (this.tokenUsers == null) {
			synchronized (this) {
				if (this.tokenUsers == null) {
					this.tokenUsers = new ConcurrentHashMap<>();
				}
			}
		}
		return tokenUsers;
	}

	@Override
	public IUser unregister(IUser user) {
		if (user == null) {
			return UNKNOWN_USER;
		}
		// 移除 idUsers 中的记录
		user = this.getIdUsers().remove(user.getId());
		if (user == null) {
			return UNKNOWN_USER;
		}
		// 移除该用户的所有 Token
		if (user.getToken() != null) {
			this.getTokenUsers().remove(user.getToken());
		}
		// 清理可能残留的其他 Token（同一用户多实例场景）
		ArrayList<String> tokensToRemove = new ArrayList<>();
		for (Map.Entry<String, IUser> entry : this.getTokenUsers().entrySet()) {
			if (entry.getValue() != null && entry.getValue().getId() == user.getId()) {
				tokensToRemove.add(entry.getKey());
			}
		}
		for (String token : tokensToRemove) {
			this.getTokenUsers().remove(token);
		}
		return user;
	}

	@Override
	public IUser register(IUser user) {
		if (user != null) {
			int instances = getTokenInstances();
			if (instances > 0) {
				synchronized (this.getTokenUsers()) {
					// 先添加新的 Token
					this.getTokenUsers().put(user.getToken(), user);
					// 收集同一用户的所有 Token
					List<IUser> users = new ArrayList<>();
					for (IUser item : this.getTokenUsers().values()) {
						if (Integer.compare(item.getId(), user.getId()) == 0) {
							users.add(item);
						}
					}
					// 超出限制时，按时间戳升序排序，移除最旧的
					if (users.size() > instances) {
						users.sort((a, b) -> {
							return Long.compare(((User) a).getTokenTimeStamp(), ((User) b).getTokenTimeStamp());
						});
						// 移除最旧的，保留最新的 instances 个
						for (int i = 0; i < users.size() - instances; i++) {
							this.getTokenUsers().remove(users.get(i).getToken());
						}
					}
				}
			} else {
				this.getTokenUsers().put(user.getToken(), user);
			}
			this.getIdUsers().put(user.getId(), user);
		}
		return checkIdentities(user);
	}

	protected IUser checkIdentities(IUser user) {
		if (!(user instanceof User)) {
			return user;
		}
		User orgUser = (User) user;
		// 仅初始化一次
		if (orgUser.getIdentities() != null) {
			return user;
		}
		// 获取用户身份
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(UserIdentity.PROPERTY_USER.getName());
		condition.setValue(orgUser.getCode());
		// 有效日期
		DateTime today = DateTimes.today();
		condition = criteria.getConditions().create();
		condition.setBracketOpen(1);
		condition.setAlias(UserIdentity.PROPERTY_VALIDDATE.getName());
		condition.setOperation(ConditionOperation.IS_NULL);
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.OR);
		condition.setBracketOpen(1);
		condition.setAlias(UserIdentity.PROPERTY_VALIDDATE.getName());
		condition.setOperation(ConditionOperation.NOT_NULL);
		condition = criteria.getConditions().create();
		condition.setBracketClose(2);
		condition.setAlias(UserIdentity.PROPERTY_VALIDDATE.getName());
		condition.setOperation(ConditionOperation.LESS_EQUAL);
		condition.setValue(today);
		// 失效日期
		condition = criteria.getConditions().create();
		condition.setBracketOpen(1);
		condition.setAlias(UserIdentity.PROPERTY_INVALIDDATE.getName());
		condition.setOperation(ConditionOperation.IS_NULL);
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.OR);
		condition.setBracketOpen(1);
		condition.setAlias(UserIdentity.PROPERTY_INVALIDDATE.getName());
		condition.setOperation(ConditionOperation.NOT_NULL);
		condition = criteria.getConditions().create();
		condition.setBracketClose(2);
		condition.setAlias(UserIdentity.PROPERTY_INVALIDDATE.getName());
		condition.setOperation(ConditionOperation.GREATER_EQUAL);
		condition.setValue(today);
		// 排序
		ISort sort = criteria.getSorts().create();
		sort.setAlias(UserIdentity.PROPERTY_IDENTITY.getName());
		sort.setSortType(SortType.ASCENDING);
		try (BORepositoryInitialFantasy boRepository = new BORepositoryInitialFantasy()) {
			boRepository.setUserToken(OrganizationFactory.SYSTEM_USER.getToken());
			IOperationResult<IUserIdentity> opRsltIdentity = boRepository.fetchUserIdentity(criteria);
			StringBuilder stringBuilder = new StringBuilder();
			for (IUserIdentity item : opRsltIdentity.getResultObjects()) {
				if (stringBuilder.length() > 0) {
					stringBuilder.append(",");
				}
				stringBuilder.append(item.getIdentity());
			}
			orgUser.setIdentities(stringBuilder.toString());
		} catch (Exception e) {
			Logger.log(e);
		}
		return user;
	}

}
