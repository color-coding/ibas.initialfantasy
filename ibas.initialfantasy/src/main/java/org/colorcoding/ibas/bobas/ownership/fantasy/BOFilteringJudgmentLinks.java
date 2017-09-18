package org.colorcoding.ibas.bobas.ownership.fantasy;

import java.util.List;

import org.colorcoding.ibas.bobas.core.fields.IFieldData;
import org.colorcoding.ibas.bobas.core.fields.IFieldDataDb;
import org.colorcoding.ibas.bobas.core.fields.IManageFields;
import org.colorcoding.ibas.bobas.data.emConditionRelationship;
import org.colorcoding.ibas.bobas.expressions.BOJudgmentLinks;
import org.colorcoding.ibas.bobas.expressions.IPropertyValueOperator;
import org.colorcoding.ibas.bobas.expressions.IValueOperator;
import org.colorcoding.ibas.bobas.expressions.JudgmentLinkItem;
import org.colorcoding.ibas.bobas.expressions.JudgmentLinksException;
import org.colorcoding.ibas.bobas.expressions.JudmentOperations;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.util.ArrayList;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.IBOFilteringCondition;

public class BOFilteringJudgmentLinks extends BOJudgmentLinks {

	public void parsingConditions(List<IBOFilteringCondition> conditions) {
		// 判断无条件
		if (conditions != null && conditions.size() == 0) {
			return;
		}
		ArrayList<JudgmentLinkItem> jLinkItems = new ArrayList<JudgmentLinkItem>();
		for (IBOFilteringCondition item : conditions) {
			JudgmentLinkItem jItem = new JudgmentLinkItem();
			jItem.setOpenBracket(0);
			jItem.setCloseBracket(0);
			if (item.getRelationship() == emConditionRelationship.NONE || item.getRelationship() == null) {
				jItem.setRelationship(JudmentOperations.AND);
			} else {
				jItem.setRelationship(JudmentOperations.valueOf(item.getRelationship()));
			}
			jItem.setOperation(JudmentOperations.valueOf(item.getOperation()));
			// 左边取值
			IPropertyValueOperator propertyValueOperator = this.createPropertyValueOperator();
			propertyValueOperator.setPropertyName(item.getPropertyName());
			jItem.setLeftOperter(propertyValueOperator);
			// 右边取值
			// 与值比较
			IValueOperator ValueOperator = this.createValueOperator();
			ValueOperator.setValue(item.getConditionValue());
			jItem.setRightOperter(ValueOperator);
			// 设置括号
			jItem.setOpenBracket(item.getBracketOpen());
			jItem.setCloseBracket(item.getBracketClose());
			jLinkItems.add(jItem);
		}
		super.setJudgmentItems(jLinkItems.toArray(new JudgmentLinkItem[] {}));
	}

	@Override
	public IPropertyValueOperator createPropertyValueOperator() {
		// 使用数据库字段属性比较
		return new IPropertyValueOperator() {
			private IManageFields value;
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
					throw new JudgmentLinksException(I18N.prop("msg_bobas_not_found_bo_field", this.getPropertyName()));
				}
				return this.field;
			}

			@Override
			public void setValue(Object value) {
				if (value != null && !(value instanceof IManageFields)) {
					throw new JudgmentLinksException(I18N.prop("msg_bobas_invaild_bo_type"));
				}
				this.value = (IManageFields) value;
				this.field = null;
			}

			@Override
			public Object getValue() {
				if (this.value == null) {
					return null;
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
