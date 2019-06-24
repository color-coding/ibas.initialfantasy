package org.colorcoding.ibas.bobas.ownership.initial;

import java.util.Arrays;
import java.util.List;

import org.colorcoding.ibas.bobas.MyConfiguration;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.DataConvert;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.mapping.BusinessObjectUnit;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.organization.IUser;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.bobas.ownership.IDataOwnership;
import org.colorcoding.ibas.bobas.ownership.IOwnershipJudger;
import org.colorcoding.ibas.bobas.ownership.UnauthorizedException;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.IBOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.IBOFilteringCondition;
import org.colorcoding.ibas.initialfantasy.bo.shell.User;
import org.colorcoding.ibas.initialfantasy.data.emFilteringType;

public class OwnershipJudger implements IOwnershipJudger {

	@Override
	public boolean canRead(IDataOwnership data, IUser user, boolean throwError) throws UnauthorizedException {
		boolean status = this.canRead(data, user);
		if (throwError && !status) {
			throw new UnauthorizedException(
					I18N.prop("msg_if_to_fetch_bo_unauthorized", data.getClass().getSimpleName()));
		}
		return status;
	}

	@Override
	public boolean canSave(IDataOwnership data, IUser user, boolean throwError) throws UnauthorizedException {
		boolean status = this.canSave(data, user);
		if (throwError && !status) {
			throw new UnauthorizedException(
					I18N.prop("msg_if_to_save_bo_unauthorized", data.getClass().getSimpleName()));
		}
		return status;
	}

	@Override
	public boolean canSave(IDataOwnership data, IUser user) {
		try {
			if (data == null || user == null) {
				return false;
			}
			if (user instanceof User) {
				User sUser = (User) user;
				if (sUser.isSuper()) {
					return true;
				}
			}
			return this.getSaveFilter().filtering(data, user);
		} catch (Exception e) {
			Logger.log(e);
			throw new RuntimeException(e);
		}
	}

	private BOFilter saveFilter;

	public final BOFilter getSaveFilter() {
		if (saveFilter == null) {
			saveFilter = new BOFilterSave();
		}
		return saveFilter;
	}

	@Override
	public boolean canRead(IDataOwnership data, IUser user) {
		try {
			if (data == null || user == null) {
				return false;
			}
			if (user instanceof User) {
				User sUser = (User) user;
				if (sUser.isSuper()) {
					return true;
				}
			}
			return this.getReadFilter().filtering(data, user);
		} catch (Exception e) {
			Logger.log(e);
			throw new RuntimeException(e);
		}
	}

	private BOFilter readFilter;

	public final BOFilter getReadFilter() {
		if (readFilter == null) {
			readFilter = new BOFilterRead();
		}
		return readFilter;
	}

	@Override
	public ICriteria filterCriteria(BusinessObjectUnit boUnit, IUser user) {
		if (user instanceof User) {
			User sUser = (User) user;
			if (sUser.isSuper()) {
				return null;
			}
		}
		try {
			List<String> roles = new ArrayList<>(
					Arrays.asList(OrganizationFactory.create().createManager().getRoles(user)));
			roles.add("");// 增加全局身份
			if (roles != null && !roles.isEmpty()) {
				for (IBOFiltering boFiltering : this.getReadFilter()
						.getFilterings(MyConfiguration.applyVariables(boUnit.code()), roles)) {
					if (boFiltering.getFilteringType() == emFilteringType.AVAILABLE) {
						// 仅支持可用查询
						if (!boFiltering.getBOFilteringConditions().isEmpty()) {
							ICriteria criteria = new Criteria();
							ICondition condition = null;
							for (IBOFilteringCondition item : boFiltering.getBOFilteringConditions()) {
								condition = criteria.getConditions().create();
								condition.setBracketOpen(item.getBracketOpen());
								condition.setAlias(item.getPropertyName());
								condition.setOperation(DataConvert.toOperation(item.getOperation()));
								condition.setValue(item.getConditionValue());
								condition.setBracketClose(item.getBracketClose());
								condition.setRelationship(DataConvert.toRelationship(item.getRelationship()));
								// 替换变量
								if (BOFilteringJudgmentLink.VARIABLE_NAME_USER_ID.equals(condition.getValue())) {
									condition.setValue(user.getId());
								} else if (BOFilteringJudgmentLink.VARIABLE_NAME_USER_BELONG
										.equals(condition.getValue())) {
									condition.setValue(user.getBelong());
								}
							}
							if (!criteria.getConditions().isEmpty()) {
								condition = criteria.getConditions().firstOrDefault();
								if (condition.getRelationship() == ConditionRelationship.NONE) {
									condition.setRelationship(ConditionRelationship.AND);
								}
								if (condition.getRelationship() == ConditionRelationship.AND) {
									return criteria;
								}
							}
						}
					}
				}
			}
		} catch (Exception e) {
			Logger.log(e);
		}
		return null;
	}
}
