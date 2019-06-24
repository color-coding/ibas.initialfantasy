package org.colorcoding.ibas.bobas.organization.initial;

import java.util.HashMap;
import java.util.Map;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.organization.IOrganizationManager;
import org.colorcoding.ibas.bobas.organization.IUser;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.initialfantasy.bo.shell.User;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;

public class OrganizationManager implements IOrganizationManager {

	@Override
	public IUser getUser(String token) {
		if (token != null) {
			if (token.equals(OrganizationFactory.SYSTEM_USER.getToken())) {
				return OrganizationFactory.SYSTEM_USER;
			}
			return this.getTokenUsers().get(token);
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
			return user;
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

	private static final String[] EMPTY_ROLES = new String[] {};

	@Override
	public String[] getRoles(IUser user) {
		if (user == null) {
			return EMPTY_ROLES;
		}
		IUser item = this.getTokenUsers().get(user.getToken());
		if (item != null) {
			if (item.getBelong() != null && !item.getBelong().isEmpty()) {
				return new String[] { item.getBelong() };
			}
		}
		return EMPTY_ROLES;
	}

	@Override
	public void register(IUser user) {
		if (user == null) {
			return;
		}
		this.getIdUsers().put(user.getId(), user);
		this.getTokenUsers().put(user.getToken(), user);
	}

}
