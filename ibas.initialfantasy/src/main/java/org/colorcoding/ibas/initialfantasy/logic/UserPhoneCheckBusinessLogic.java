package org.colorcoding.ibas.initialfantasy.logic;

import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogic;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.initialfantasy.bo.organization.IUser;
import org.colorcoding.ibas.initialfantasy.bo.organization.User;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;

@LogicContract(IUserPhoneCheckContract.class)
public class UserPhoneCheckBusinessLogic extends BusinessLogic<IUserPhoneCheckContract, IBusinessObject> {

	@Override
	protected IBusinessObject fetchBeAffected(IUserPhoneCheckContract contract) {
		return new IBusinessObject() {
			private static final long serialVersionUID = 1L;

			@Override
			public boolean isValid() {
				return true;
			}

			@Override
			public boolean isSavable() {
				return false;
			}

			@Override
			public boolean isNew() {
				return false;
			}

			@Override
			public boolean isLoading() {
				return false;
			}

			@Override
			public boolean isDirty() {
				return false;
			}

			@Override
			public boolean isDeleted() {
				return false;
			}

			@Override
			public boolean isBusy() {
				return false;
			}

			@Override
			public String toString(String type) {
				return this.getIdentifiers();
			}

			@Override
			public ICriteria getCriteria() {
				return new Criteria();
			}

			@Override
			public void undelete() {
			}

			@Override
			public String getIdentifiers() {
				return "{business object: proxy}";
			}

			@Override
			public void delete() {
			}
		};
	}

	@Override
	protected void impact(IUserPhoneCheckContract contract) {
		if (contract.getPhone() == null || contract.getPhone().isEmpty()) {
			return;
		}
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(User.PROPERTY_PHONE.getName());
		condition.setValue(contract.getPhone());
		condition.setOperation(ConditionOperation.EQUAL);
		BORepositoryInitialFantasy boRepository = new BORepositoryInitialFantasy();
		boRepository.setRepository(super.getRepository());
		IOperationResult<IUser> operationResult = boRepository.fetchUser(criteria);
		if (operationResult.getError() != null) {
			throw new BusinessLogicException(operationResult.getError());
		}
		for (IUser user : operationResult.getResultObjects()) {
			if (!user.getCode().equalsIgnoreCase(contract.getCode())) {
				throw new BusinessLogicException(I18N.prop("msg_if_phone_has_been_used", contract.getPhone()));
			}
		}
	}

	@Override
	protected void revoke(IUserPhoneCheckContract contract) {
	}

}
