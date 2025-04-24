package org.colorcoding.ibas.initialfantasy.logic;

import org.colorcoding.ibas.bobas.bo.BOUtilities;
import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogic;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.logic.LogicContract;
import org.colorcoding.ibas.initialfantasy.bo.organization.IUser;
import org.colorcoding.ibas.initialfantasy.bo.organization.User;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;

@LogicContract(IUserMailCheckContract.class)
public class UserMailCheckBusinessLogic extends BusinessLogic<IUserMailCheckContract, IBusinessObject> {

	@Override
	protected IBusinessObject fetchBeAffected(IUserMailCheckContract contract) {
		return BOUtilities.VALUE_EMPTY;
	}

	@Override
	protected void impact(IUserMailCheckContract contract) {
		if (contract.getMail() == null || contract.getMail().isEmpty()) {
			return;
		}
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(User.PROPERTY_MAIL.getName());
		condition.setValue(contract.getMail());
		condition.setOperation(ConditionOperation.EQUAL);
		try (BORepositoryInitialFantasy boRepository = new BORepositoryInitialFantasy()) {
			boRepository.setTransaction(this.getTransaction());
			IOperationResult<IUser> operationResult = boRepository.fetchUser(criteria);
			if (operationResult.getError() != null) {
				throw new BusinessLogicException(operationResult.getError());
			}
			for (IUser user : operationResult.getResultObjects()) {
				if (!user.getCode().equalsIgnoreCase(contract.getCode())) {
					throw new BusinessLogicException(I18N.prop("msg_if_mail_has_been_used", contract.getMail()));
				}
			}
		} catch (Exception e) {
			throw new BusinessLogicException(e);
		}

	}

	@Override
	protected void revoke(IUserMailCheckContract contract) {
	}

}
