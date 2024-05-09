package org.colorcoding.ibas.bobas.organization.initial;

import java.util.HashMap;
import java.util.Map;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.ISort;
import org.colorcoding.ibas.bobas.common.SortType;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.organization.IOrganizationManager;
import org.colorcoding.ibas.bobas.organization.IUser;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.initialfantasy.bo.identity.IUserIdentity;
import org.colorcoding.ibas.initialfantasy.bo.identity.UserIdentity;
import org.colorcoding.ibas.initialfantasy.bo.shell.User;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;

public class OrganizationManager implements IOrganizationManager {

	@Override
	public IUser getUser(String token) {
		if (token != null) {
			if (token.equals(OrganizationFactory.SYSTEM_USER.getToken())) {
				return OrganizationFactory.SYSTEM_USER;
			}
			return checkIdentities(this.getTokenUsers().get(token));
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
			condition.setOperation(ConditionOperation.GRATER_THAN);
			condition.setValue(0);
			BORepositoryInitialFantasy boRepository = new BORepositoryInitialFantasy();
			boRepository.setUserToken(OrganizationFactory.SYSTEM_USER.getToken());
			IOperationResult<org.colorcoding.ibas.initialfantasy.bo.organization.IUser> operationResult = boRepository
					.fetchUser(criteria);
			if (operationResult.getError() != null) {
				throw operationResult.getError();
			}
			Map<Integer, IUser> idUsers = new HashMap<>(operationResult.getResultObjects().size());
			Map<String, IUser> tokenUsers = new HashMap<>(operationResult.getResultObjects().size());
			for (org.colorcoding.ibas.initialfantasy.bo.organization.IUser item : operationResult.getResultObjects()) {
				User user = User.create(item);
				idUsers.put(user.getId(), user);
				tokenUsers.put(user.getToken(), user);
			}
			this.idUsers = idUsers;
			this.tokenUsers = tokenUsers;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	private volatile Map<Integer, IUser> idUsers;

	protected final Map<Integer, IUser> getIdUsers() {
		if (this.idUsers == null) {
			synchronized (this) {
				if (this.idUsers == null) {
					this.idUsers = new HashMap<>();
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
					this.tokenUsers = new HashMap<>();
				}
			}
		}
		return tokenUsers;
	}

	@Override
	public IUser register(IUser user) {
		if (user != null) {
			this.getIdUsers().put(user.getId(), user);
			this.getTokenUsers().put(user.getToken(), user);
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
		DateTime today = DateTime.getToday();
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
		condition.setOperation(ConditionOperation.GRATER_EQUAL);
		condition.setValue(today);
		// 排序
		ISort sort = criteria.getSorts().create();
		sort.setAlias(UserIdentity.PROPERTY_IDENTITY.getName());
		sort.setSortType(SortType.ASCENDING);
		try {
			BORepositoryInitialFantasy boRepository = new BORepositoryInitialFantasy();
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
