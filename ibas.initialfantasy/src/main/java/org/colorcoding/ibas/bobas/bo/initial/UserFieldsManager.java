package org.colorcoding.ibas.bobas.bo.initial;

import org.colorcoding.ibas.bobas.MyConfiguration;
import org.colorcoding.ibas.bobas.bo.BOFactory;
import org.colorcoding.ibas.bobas.bo.IBOUserFields;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.Enums;
import org.colorcoding.ibas.bobas.common.IChildCriteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.List;
import org.colorcoding.ibas.bobas.db.DbField;
import org.colorcoding.ibas.bobas.db.DataType;
import org.colorcoding.ibas.bobas.db.DbTable;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.BOInformation;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.BOPropertyInformation;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.IBOInformation;
import org.colorcoding.ibas.initialfantasy.bo.shell.BizObjectInfo;
import org.colorcoding.ibas.initialfantasy.bo.shell.BizPropertyInfo;
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
				BizObjectInfo objectInfo = null;
				for (BizObjectInfo item : this.getUserObjects()) {
					if (Strings.equalsIgnoreCase(table, item.getTable())) {
						objectInfo = item;
						break;
					}
				}
				if (objectInfo == null) {
					userFields = this.setNoUserFields(objectType);
				} else {
					for (BizPropertyInfo ptyItem : objectInfo.getProperties()) {
						if (!Strings.isWith(ptyItem.getName(), IBOUserFields.USER_FIELD_PREFIX_SIGN, null)) {
							continue;
						}
						this.registerUserField(objectType, ptyItem.getName(),
								this.classOf(ptyItem.getDataType(), ptyItem.getEditType()));
					}
					userFields = super.getUserFieldInfoList(objectType);
				}
			} else {
				userFields = this.setNoUserFields(objectType);
			}
		}
		return userFields;
	}

	private List<BizObjectInfo> userObjects;

	public List<BizObjectInfo> getUserObjects() {
		if (this.userObjects == null) {
			this.userObjects = new ArrayList<>();
		}
		return userObjects;
	}

	@Override
	public void initialize() {
		ICriteria criteria = new Criteria();
		IChildCriteria childCriteria = criteria.getChildCriterias().create();
		childCriteria.setEntry(true);
		childCriteria.setOnlyHasChilds(true);
		childCriteria.setNoChilds(true);
		childCriteria.setPropertyPath(BOInformation.PROPERTY_BOPROPERTYINFORMATIONS);
		ICondition condition = childCriteria.getConditions().create();
		condition.setAlias(BOPropertyInformation.PROPERTY_PROPERTY.getName());
		condition.setOperation(ConditionOperation.START);
		condition.setValue(IBOUserFields.USER_FIELD_PREFIX_SIGN);
		try (BORepositoryInitialFantasy boRepository = new BORepositoryInitialFantasy()) {
			boRepository.setUserToken(OrganizationFactory.SYSTEM_USER.getToken());
			IOperationResult<IBOInformation> opRsltFetch = boRepository.fetchBOInformation(criteria);
			if (opRsltFetch.getError() != null) {
				throw opRsltFetch.getError();
			}
			if (opRsltFetch.getResultCode() != 0) {
				throw new Exception(opRsltFetch.getMessage());
			}
			ArrayList<BizObjectInfo> userObjects = new ArrayList<>(opRsltFetch.getResultObjects().size());
			for (IBOInformation boItem : opRsltFetch.getResultObjects()) {
				userObjects.add(BizObjectInfo.create(boItem));
			}
			// 清理非必要数据内容
			for (BizObjectInfo objectInfo : userObjects) {
				objectInfo.setName(null);
				for (BizPropertyInfo propertyInfo : objectInfo.getProperties()) {
					propertyInfo.setAlias(null);
					propertyInfo.setAuthorised(null);
					propertyInfo.setDescription(null);
					propertyInfo.setLinkedObject(null);
					propertyInfo.setTriggerByProperty(null);
					propertyInfo.setValueChooseType(null);
					propertyInfo.setValues(null);
					propertyInfo.setWidth(null);
					propertyInfo.setSearched(null);
					propertyInfo.setSystemed(null);
					if (Strings.equalsIgnoreCase(propertyInfo.getEditType(), "default")) {
						propertyInfo.setEditType(null);
					}
				}
			}
			this.userObjects = userObjects;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	public Class<?> classOf(String type, String editType) {
		if (Strings.equalsIgnoreCase("Date", type) && Strings.equalsIgnoreCase("Time", editType)) {
			type = DataType.NUMERIC.toString();
		}
		return super.classOf(Enums.valueOf(DataType.class, type));
	}
}
