package org.colorcoding.ibas.bobas.organization.initial;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.List;
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
			for (IUser item : this.getUsers()) {
				if (token.equals(item.getToken())) {
					return item;
				}
			}
		}
		return null;
	}

	@Override
	public IUser getUser(int id) {
		if (id == OrganizationFactory.SYSTEM_USER.getId()) {
			return OrganizationFactory.SYSTEM_USER;
		}
		for (IUser item : this.getUsers()) {
			if (id == item.getId()) {
				return item;
			}
		}
		return OrganizationFactory.UNKNOWN_USER;
	}

	@Override
	public void initialize() {
		try {
			ArrayList<IUser> users = new ArrayList<>();
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
			for (org.colorcoding.ibas.initialfantasy.bo.organization.IUser item : operationResult.getResultObjects()) {
				users.add(User.create(item));
			}
			this.users = users;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public String[] getRoles(IUser user) {
		for (IUser item : this.getUsers()) {
			if (item.equals(user)) {
				if (item.getBelong() != null && !item.getBelong().isEmpty()) {
					return new String[] { item.getBelong() };
				} else {
					break;
				}
			}
		}
		return new String[] {};
	}

	private volatile ArrayList<IUser> users;

	public List<IUser> getUsers() {
		if (this.users == null) {
			synchronized (this) {
				if (this.users == null) {
					this.users = new ArrayList<>();
				}
			}
		}
		return this.users;
	}

	@Override
	public void register(IUser user) {
		if (user == null) {
			return;
		}
		for (int i = 0; i < this.getUsers().size(); i++) {
			IUser item = this.getUsers().get(i);
			if (item == null) {
				continue;
			}
			if (item.getId() == user.getId()) {
				this.getUsers().set(i, user);
				return;
			}
		}
		this.getUsers().add(user);
	}

}
