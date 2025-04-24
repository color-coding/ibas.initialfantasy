package org.colorcoding.ibas.bobas.bo.initial;

import org.colorcoding.ibas.bobas.MyConfiguration;
import org.colorcoding.ibas.bobas.bo.BOFactory;
import org.colorcoding.ibas.bobas.bo.IBOUserFields;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.Enums;
import org.colorcoding.ibas.bobas.common.IChildCriteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.List;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.db.DbField;
import org.colorcoding.ibas.bobas.db.DbFieldType;
import org.colorcoding.ibas.bobas.db.DbTable;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.BOInformation;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.BOPropertyInformation;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.IBOInformation;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.IBOPropertyInformation;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;

public class UserFieldsManager extends org.colorcoding.ibas.bobas.bo.UserFieldsManager {

	public List<IPropertyInfo<?>> getUserFieldInfoList(Class<?> objectType) {
		List<IPropertyInfo<?>> userFields = super.getUserFieldInfoList(objectType);
		if (userFields == EMPTY_USER_FIELDS) {
			// 未初始化数据
			String table = null;
			DbTable dbTable = objectType.getAnnotation(DbTable.class);
			if (dbTable != null) {
				table = MyConfiguration.applyVariables(dbTable.name());
			}
			if (table == null) {
				DbField dbField;
				for (IPropertyInfo<?> item : BOFactory.propertyInfos(objectType)) {
					dbField = item.getAnnotation(DbField.class);
					if (dbField != null && !Strings.isNullOrEmpty(dbField.table())) {
						table = MyConfiguration.applyVariables(dbField.table());
						break;
					}
				}
			}
			if (!Strings.isNullOrEmpty(table)) {
				ICondition condition;
				Criteria criteria = new Criteria();
				condition = criteria.getConditions().create();
				condition.setAlias(BOPropertyInformation.PROPERTY_MAPPED);
				condition.setOperation(ConditionOperation.EQUAL);
				condition.setValue(table);
				IChildCriteria childCriteria = criteria.getChildCriterias().create();
				childCriteria.setPropertyPath(BOInformation.PROPERTY_BOPROPERTYINFORMATIONS);
				childCriteria.setOnlyHasChilds(true);
				childCriteria.setNoChilds(true);
				condition = childCriteria.getConditions().create();
				condition.setAlias(BOPropertyInformation.PROPERTY_PROPERTY);
				condition.setOperation(ConditionOperation.START);
				condition.setValue(IBOUserFields.USER_FIELD_PREFIX_SIGN);
				condition = childCriteria.getConditions().create();
				condition.setAlias(BOPropertyInformation.PROPERTY_EDITSIZE);
				condition.setOperation(ConditionOperation.GRATER_THAN);
				condition.setValue(0);
				condition = childCriteria.getConditions().create();
				condition.setAlias(BOPropertyInformation.PROPERTY_SYSTEMED);
				condition.setOperation(ConditionOperation.NOT_EQUAL);
				condition.setValue(emYesNo.YES);

				try (BORepositoryInitialFantasy boRepository = new BORepositoryInitialFantasy()) {
					boRepository.setUserToken(OrganizationFactory.SYSTEM_USER);

					IOperationResult<IBOInformation> operationResult = boRepository.fetchBOInformation(criteria);
					if (operationResult.getError() != null) {
						throw operationResult.getError();
					}
					if (operationResult.getResultObjects().isEmpty()) {
						userFields = this.setNoUserFields(objectType);
					} else {
						for (IBOInformation boItem : operationResult.getResultObjects()) {
							for (IBOPropertyInformation ptyItem : boItem.getBOPropertyInformations()) {
								if (!Strings.isWith(ptyItem.getPropertyName(), IBOUserFields.USER_FIELD_PREFIX_SIGN,
										null)) {
									continue;
								}
								this.registerUserField(objectType, ptyItem.getPropertyName(),
										this.classOf(ptyItem.getDataType(), ptyItem.getEditType()));
							}
						}
						userFields = super.getUserFieldInfoList(objectType);
					}
				} catch (Exception e) {
					throw new RuntimeException(e);
				}
			} else {
				userFields = this.setNoUserFields(objectType);
			}
		}
		return userFields;
	}

	@Override
	public void initialize() {
	}

	public Class<?> classOf(String type, String editType) {
		if (Strings.equalsIgnoreCase("Date", type) && Strings.equalsIgnoreCase("Time", editType)) {
			type = DbFieldType.NUMERIC.toString();
		}
		return super.classOf(Enums.valueOf(DbFieldType.class, type));
	}
}
