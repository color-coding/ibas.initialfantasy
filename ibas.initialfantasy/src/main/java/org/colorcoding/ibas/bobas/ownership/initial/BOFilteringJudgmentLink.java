package org.colorcoding.ibas.bobas.ownership.initial;

import java.util.List;

import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.core.fields.IFieldData;
import org.colorcoding.ibas.bobas.core.fields.IFieldDataDb;
import org.colorcoding.ibas.bobas.core.fields.IManagedFields;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.emConditionRelationship;
import org.colorcoding.ibas.bobas.expression.BOJudgmentLink;
import org.colorcoding.ibas.bobas.expression.IPropertyValueOperator;
import org.colorcoding.ibas.bobas.expression.IValueOperator;
import org.colorcoding.ibas.bobas.expression.JudgmentLinkException;
import org.colorcoding.ibas.bobas.expression.JudgmentLinkItem;
import org.colorcoding.ibas.bobas.expression.JudmentOperation;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.ownership.IDataOwnership;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.IBOFilteringCondition;
import org.colorcoding.ibas.initialfantasy.bo.shell.User;

class BOFilteringJudgmentLink extends BOJudgmentLink {
	/** 变量-用户ID */
	public static final String VARIABLE_NAME_USER_ID = User.VARIABLE_NAME_USER_ID;
	/** 变量-用户编码 */
	public static final String VARIABLE_NAME_USER_CODE = User.VARIABLE_NAME_USER_CODE;
	/** 变量-用户名称 */
	public static final String VARIABLE_NAME_USER_NAME = User.VARIABLE_NAME_USER_NAME;
	/** 变量-用户归属 */
	public static final String VARIABLE_NAME_USER_BELONG = User.VARIABLE_NAME_USER_BELONG;
	/** 变量-用户身份 */
	public static final String VARIABLE_NAME_USER_IDENTITIES = User.VARIABLE_NAME_USER_IDENTITIES;
	/** 属性-用户 */
	public static final String PROPERTY_NAME_DATAOWNER = "DataOwner";
	/** 属性-用户归属 */
	public static final String PROPERTY_NAME_ORGANIZATION = "Organization";

	private User currentUser;

	public final User getCurrentUser() {
		return currentUser;
	}

	public final void setCurrentUser(User currentUser) {
		this.currentUser = currentUser;
	}

	public void parsingConditions(List<IBOFilteringCondition> conditions) {
		// 判断无条件
		if (conditions == null || conditions.size() == 0) {
			return;
		}
		ArrayList<JudgmentLinkItem> jLinkItems = new ArrayList<JudgmentLinkItem>();
		for (IBOFilteringCondition item : conditions) {
			JudgmentLinkItem jItem = new JudgmentLinkItem();
			jItem.setOpenBracket(0);
			jItem.setCloseBracket(0);
			if (item.getRelationship() == emConditionRelationship.NONE || item.getRelationship() == null) {
				jItem.setRelationship(JudmentOperation.AND);
			} else {
				jItem.setRelationship(JudmentOperation.valueOf(item.getRelationship()));
			}
			jItem.setOperation(JudmentOperation.valueOf(item.getOperation()));
			// 左边取值
			if (item.getPropertyName() != null && item.getPropertyName().startsWith("${USER_")
					&& item.getPropertyName().endsWith("}")) {
				IValueOperator valueOperator = this.createValueOperator();
				valueOperator.setValue(this.getCurrentUser().valueOfSpecific(item.getPropertyName()));
				jItem.setLeftOperter(valueOperator);
			} else {
				IPropertyValueOperator propertyValueOperator = this.createPropertyValueOperator();
				propertyValueOperator.setPropertyName(item.getPropertyName());
				jItem.setLeftOperter(propertyValueOperator);
			}
			// 右边取值
			// 与值比较
			IValueOperator valueOperator = this.createValueOperator();
			if (item.getConditionValue() != null && item.getConditionValue().startsWith("${USER_")
					&& item.getConditionValue().endsWith("}")) {
				valueOperator.setValue(this.getCurrentUser().valueOfSpecific(item.getConditionValue()));
			} else {
				valueOperator.setValue(item.getConditionValue());
			}
			jItem.setRightOperter(valueOperator);
			// 设置括号
			jItem.setOpenBracket(item.getBracketOpen());
			jItem.setCloseBracket(item.getBracketClose());
			jLinkItems.add(jItem);
		}
		super.setJudgmentItems(jLinkItems.toArray(new JudgmentLinkItem[] {}));
	}

	@Override
	protected IPropertyValueOperator createPropertyValueOperator() {
		// 使用数据库字段属性比较
		return new IPropertyValueOperator() {
			private IManagedFields value;
			private IFieldData field = null;

			private IFieldData getField() {
				if (this.field == null) {
					for (IFieldData item : value.getFields()) {
						if (item instanceof IFieldDataDb) {
							IFieldDataDb dbField = (IFieldDataDb) item;
							if (dbField.getDbField().equalsIgnoreCase(this.getPropertyName())) {
								this.field = dbField;
								break;
							}
						}
					}
				}
				if (this.field == null) {
					throw new JudgmentLinkException(I18N.prop("msg_bobas_not_found_bo_field", this.getPropertyName()));
				}
				return this.field;
			}

			@Override
			public void setValue(Object value) {
				if (value != null && !(value instanceof IManagedFields)) {
					throw new JudgmentLinkException(I18N.prop("msg_bobas_invaild_bo_type"));
				}
				this.value = (IManagedFields) value;
				this.field = null;
			}

			@Override
			public Object getValue() {
				if (this.value == null) {
					return null;
				}
				if (PROPERTY_NAME_DATAOWNER.equals(this.getField().getName())
						&& this.value instanceof IBusinessObject) {
					// 数据所有者属性取值，新建对象时，未赋值取当前用户
					IBusinessObject bo = (IBusinessObject) this.value;
					if (bo.isNew() && bo instanceof IDataOwnership) {
						IDataOwnership data = (IDataOwnership) bo;
						if (Integer.compare(0, data.getDataOwner()) >= 0) {
							return BOFilteringJudgmentLink.this.getCurrentUser().getId();
						}
					}
				} else if (PROPERTY_NAME_ORGANIZATION.equals(this.getField().getName())
						&& this.value instanceof IBusinessObject) {
					// 组织属性取值，新建对象时，未赋值取当前用户所属
					IBusinessObject bo = (IBusinessObject) this.value;
					if (bo.isNew() && bo instanceof IDataOwnership) {
						IDataOwnership data = (IDataOwnership) bo;
						if (data.getOrganization() == null || data.getOrganization().isEmpty()) {
							return BOFilteringJudgmentLink.this.getCurrentUser().getBelong();
						}
					}
				}
				return this.getField().getValue();
			}

			@Override
			public Class<?> getValueClass() {
				if (this.value == null) {
					return null;
				}
				return this.getField().getValueType();
			}

			private String propertyName;

			@Override
			public void setPropertyName(String value) {
				this.propertyName = value;
			}

			@Override
			public String getPropertyName() {
				return this.propertyName;
			}

			private static final String format_template = "{property's value: %s}";

			@Override
			public String toString() {
				return String.format(format_template, this.getPropertyName());
			}
		};
	}

}