package org.colorcoding.ibas.bobas.ownership.initial;

import java.util.List;

import org.colorcoding.ibas.bobas.MyConfiguration;
import org.colorcoding.ibas.bobas.bo.IBODocument;
import org.colorcoding.ibas.bobas.bo.IBODocumentLine;
import org.colorcoding.ibas.bobas.bo.IBOMasterData;
import org.colorcoding.ibas.bobas.bo.IBOMasterDataLine;
import org.colorcoding.ibas.bobas.bo.IBOSimple;
import org.colorcoding.ibas.bobas.bo.IBOSimpleLine;
import org.colorcoding.ibas.bobas.bo.IBOStorageTag;
import org.colorcoding.ibas.bobas.common.ConditionAliasDataType;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.core.ITrackStatus;
import org.colorcoding.ibas.bobas.core.fields.IFieldData;
import org.colorcoding.ibas.bobas.core.fields.IManagedFields;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emYesNo;
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
import org.colorcoding.ibas.initialfantasy.bo.boinformation.BOInformation;
import org.colorcoding.ibas.initialfantasy.bo.bologst.BOLogst;
import org.colorcoding.ibas.initialfantasy.bo.shell.User;
import org.colorcoding.ibas.initialfantasy.data.DataConvert;
import org.colorcoding.ibas.initialfantasy.data.emFilteringType;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;

public class OwnershipJudger implements IOwnershipJudger {

	/**
	 * 配置项目-开启对象日志
	 */
	public final static String CONFIG_ITEM_ENABLE_BO_LOGST = "EnableBOLogst";

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
			boolean filtered = this.getSaveFilter().filtering(data, user);
			if (filtered && data instanceof ITrackStatus) {
				ITrackStatus trackStatus = (ITrackStatus) data;
				if (trackStatus.isDeleted()) {
					return this.getDeleteFilter().filtering(data, user);
				} else if (trackStatus.isNew()) {
					return this.getCreateFilter().filtering(data, user);
				} else if (trackStatus.isDirty()) {
					return this.getUpdateFilter().filtering(data, user);
				}
			}
			return filtered;
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

	private BOFilter createFilter;

	public final BOFilter getCreateFilter() {
		if (this.createFilter == null) {
			this.createFilter = new BOFilterCreate();
		}
		return createFilter;
	}

	private BOFilter updateFilter;

	public final BOFilter getUpdateFilter() {
		if (this.updateFilter == null) {
			this.updateFilter = new BOFilterUpdate();
		}
		return updateFilter;
	}

	private BOFilter deleteFilter;

	public final BOFilter getDeleteFilter() {
		if (this.deleteFilter == null) {
			this.deleteFilter = new BOFilterDelete();
		}
		return deleteFilter;
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
		User sUser;
		if (user instanceof User) {
			sUser = (User) user;
			if (sUser.isSuper()) {
				return null;
			}
		} else {
			sUser = new User();
			sUser.setId(user.getId());
			sUser.setBelong(user.getBelong());
			sUser.setCode("");
			sUser.setIdentities("");
			sUser.setName("");
		}
		try {
			List<String> roles = new ArrayList<>();
			if (user.getBelong() != null && !user.getBelong().isEmpty()) {
				roles.add(user.getBelong());
			}
			// 增加全局角色
			roles.add("");
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
								// 替换属性变量
								if (BOFilteringJudgmentLink.VARIABLE_NAME_USER_ID.equals(condition.getAlias())) {
									condition.setAlias(String.valueOf(sUser.getId()));
									condition.setAliasDataType(ConditionAliasDataType.FREE_TEXT);
								} else if (BOFilteringJudgmentLink.VARIABLE_NAME_USER_CODE
										.equals(condition.getAlias())) {
									condition.setAlias(sUser.getCode());
									condition.setAliasDataType(ConditionAliasDataType.FREE_TEXT);
								} else if (BOFilteringJudgmentLink.VARIABLE_NAME_USER_NAME
										.equals(condition.getAlias())) {
									condition.setAlias(sUser.getName());
									condition.setAliasDataType(ConditionAliasDataType.FREE_TEXT);
								} else if (BOFilteringJudgmentLink.VARIABLE_NAME_USER_BELONG
										.equals(condition.getAlias())) {
									condition.setAlias(sUser.getBelong());
									condition.setAliasDataType(ConditionAliasDataType.FREE_TEXT);
								} else if (BOFilteringJudgmentLink.VARIABLE_NAME_USER_IDENTITIES
										.equals(condition.getAlias())) {
									condition.setAlias(sUser.getIdentities());
									condition.setAliasDataType(ConditionAliasDataType.FREE_TEXT);
								}
								// 替换值变量
								if (BOFilteringJudgmentLink.VARIABLE_NAME_USER_ID.equals(condition.getValue())) {
									condition.setValue(sUser.getId());
								} else if (BOFilteringJudgmentLink.VARIABLE_NAME_USER_CODE
										.equals(condition.getValue())) {
									condition.setValue(sUser.getCode());
								} else if (BOFilteringJudgmentLink.VARIABLE_NAME_USER_NAME
										.equals(condition.getValue())) {
									condition.setValue(sUser.getName());
								} else if (BOFilteringJudgmentLink.VARIABLE_NAME_USER_BELONG
										.equals(condition.getValue())) {
									condition.setValue(sUser.getBelong());
								} else if (BOFilteringJudgmentLink.VARIABLE_NAME_USER_IDENTITIES
										.equals(condition.getValue())) {
									condition.setValue(sUser.getIdentities());
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

	public void logging(IBOStorageTag data, IUser user) throws Exception {
		if (MyConfiguration.getConfigValue(CONFIG_ITEM_ENABLE_BO_LOGST, false)) {
			Criteria criteria = new Criteria();
			criteria.setNoChilds(true);
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(BOInformation.PROPERTY_CODE.getName());
			condition.setValue(data.getObjectCode());
			condition = criteria.getConditions().create();
			condition.setAlias(BOInformation.PROPERTY_MODIFIED.getName());
			condition.setValue(emYesNo.YES);
			IOperationResult<?> opRslt = null;
			BORepositoryInitialFantasy boRepository = new BORepositoryInitialFantasy();
			boRepository.setUserToken(OrganizationFactory.SYSTEM_USER.getToken());
			opRslt = boRepository.fetchBOInformation(criteria);
			if (!opRslt.getResultObjects().isEmpty()) {
				BOLogst logst = new BOLogst();
				logst.setBOCode(data.getObjectCode());
				StringBuilder builder = new StringBuilder();
				if (data instanceof IBOMasterData) {
					builder.append(IBOMasterData.MASTER_PRIMARY_KEY_NAME);
					builder.append(" = ");
					builder.append(DataConvert.toString(((IBOMasterData) data).getCode()));
				} else if (data instanceof IBOMasterDataLine) {
					builder.append(IBOMasterDataLine.MASTER_PRIMARY_KEY_NAME);
					builder.append(" = ");
					builder.append(DataConvert.toString(((IBOMasterDataLine) data).getCode()));
					builder.append(" & ");
					builder.append(IBOMasterDataLine.SECONDARY_PRIMARY_KEY_NAME);
					builder.append(" = ");
					builder.append(DataConvert.toString(((IBOMasterDataLine) data).getLineId()));
				} else if (data instanceof IBODocument) {
					builder.append(IBODocument.MASTER_PRIMARY_KEY_NAME);
					builder.append(" = ");
					builder.append(DataConvert.toString(((IBODocument) data).getDocEntry()));
				} else if (data instanceof IBODocumentLine) {
					builder.append(IBODocumentLine.MASTER_PRIMARY_KEY_NAME);
					builder.append(" = ");
					builder.append(DataConvert.toString(((IBODocumentLine) data).getDocEntry()));
					builder.append(" & ");
					builder.append(IBODocumentLine.SECONDARY_PRIMARY_KEY_NAME);
					builder.append(" = ");
					builder.append(DataConvert.toString(((IBODocumentLine) data).getLineId()));
				} else if (data instanceof IBOSimple) {
					builder.append(IBOSimple.MASTER_PRIMARY_KEY_NAME);
					builder.append(" = ");
					builder.append(DataConvert.toString(((IBOSimple) data).getObjectKey()));
				} else if (data instanceof IBOSimpleLine) {
					builder.append(IBOSimpleLine.MASTER_PRIMARY_KEY_NAME);
					builder.append(" = ");
					builder.append(DataConvert.toString(((IBOSimpleLine) data).getObjectKey()));
					builder.append(" & ");
					builder.append(IBOSimpleLine.SECONDARY_PRIMARY_KEY_NAME);
					builder.append(" = ");
					builder.append(DataConvert.toString(((IBOSimpleLine) data).getLineId()));
				} else if (data instanceof IManagedFields) {
					for (IFieldData item : ((IManagedFields) data).getFields(c -> c.isPrimaryKey())) {
						if (builder.length() > 0) {
							builder.append(" & ");
						}
						builder.append(item.getName());
						builder.append(" = ");
						builder.append(DataConvert.toString(item.getValue()));
					}
					if (builder.length() == 0) {
						builder.append(data.toString());
					}
				} else {
					builder.append(data.toString());
				}
				logst.setBOKeys(builder.toString());
				logst.setLogInst(data.getLogInst());
				if (data instanceof ITrackStatus) {
					if (((ITrackStatus) data).isDeleted()) {
						logst.setLogInst(-1);
					}
				}
				logst.setModifyUser(user.getId());
				logst.setModifyDate(DateTime.getToday());
				logst.setModifyTime(Short.valueOf(DateTime.getNow().toString("HHmm")));
				logst.setTransationId(data.getUpdateActionId());
				if (DataConvert.isNullOrEmpty(logst.getTransationId())) {
					logst.setTransationId(data.getCreateActionId());
				}
				if (data instanceof IManagedFields) {
					logst.setContent(DataConvert.toString((IManagedFields) data));
				}
				opRslt = boRepository.saveBOLogst(logst);
				if (opRslt.getError() != null) {
					Logger.log(opRslt.getError());
				}
			}
		}
	}

}