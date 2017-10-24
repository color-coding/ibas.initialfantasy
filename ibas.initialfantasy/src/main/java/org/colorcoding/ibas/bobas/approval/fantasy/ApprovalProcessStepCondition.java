package org.colorcoding.ibas.bobas.approval.fantasy;

import java.io.ByteArrayOutputStream;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.approval.IApprovalProcessStepCondition;
import org.colorcoding.ibas.bobas.approval.ValueMode;
import org.colorcoding.ibas.bobas.data.emConditionOperation;
import org.colorcoding.ibas.bobas.data.emConditionRelationship;
import org.colorcoding.ibas.bobas.serialization.ISerializer;
import org.colorcoding.ibas.bobas.serialization.ISerializerManager;
import org.colorcoding.ibas.bobas.serialization.SerializerFactory;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.initialfantasy.bo.approvaltemplate.IApprovalTemplateStepCondition;
import org.colorcoding.ibas.initialfantasy.data.emApprovalConditionType;

/**
 * 审批步骤条件
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType()
@XmlRootElement()
public class ApprovalProcessStepCondition implements org.colorcoding.ibas.bobas.approval.IApprovalProcessStepCondition {

	public static IApprovalProcessStepCondition[] create(String condition) {
		if (condition != null) {
			ISerializer<?> serializer = SerializerFactory.create().createManager().create(ISerializerManager.TYPE_JSON);
			@SuppressWarnings("unchecked")
			java.util.ArrayList<ApprovalProcessStepCondition> stepConditions = (java.util.ArrayList<ApprovalProcessStepCondition>) serializer
					.deserialize(condition, ArrayList.class, ApprovalProcessStepCondition.class);
			return stepConditions.toArray(new IApprovalProcessStepCondition[] {});
		}
		return null;
	}

	public static String serialize(List<IApprovalTemplateStepCondition> conditions) {
		if (conditions != null) {
			ArrayList<ApprovalProcessStepCondition> stepConditions = new ArrayList<ApprovalProcessStepCondition>();
			for (IApprovalTemplateStepCondition item : conditions) {
				ApprovalProcessStepCondition stepCondition = new ApprovalProcessStepCondition();
				// 此处需要特别注意：UI编辑时，属性比较用数据库字段；SQL脚本第一个用属性，第二个用数据库字段。
				if (item.getConditionType() == emApprovalConditionType.PROPERTY_VALUE) {
					stepCondition.setPropertyValueMode(ValueMode.DB_FIELD);
					stepCondition.setConditionValueMode(ValueMode.INPUT);
					stepCondition.setRelation(item.getRelationship());
					stepCondition.setPropertyName(item.getPropertyName());
					stepCondition.setOperation(item.getOperation());
					stepCondition.setConditionValue(item.getConditionValue());
					stepCondition.setBracketOpen(item.getBracketOpen());
					stepCondition.setBracketClose(item.getBracketClose());
				} else if (item.getConditionType() == emApprovalConditionType.SQL_SCRIPT) {
					stepCondition.setPropertyValueMode(ValueMode.PROPERTY);
					stepCondition.setConditionValueMode(ValueMode.SQL_SCRIPT);
					stepCondition.setRelation(item.getRelationship());
					stepCondition.setPropertyName(item.getPropertyName());
					stepCondition.setOperation(item.getOperation());
					stepCondition.setConditionValue(item.getConditionValue());
					stepCondition.setBracketOpen(item.getBracketOpen());
					stepCondition.setBracketClose(item.getBracketClose());
				}
				stepConditions.add(stepCondition);
			}
			ISerializer<?> serializer = SerializerFactory.create().createManager().create(ISerializerManager.TYPE_JSON);
			ByteArrayOutputStream writer = new ByteArrayOutputStream();
			serializer.serialize(stepConditions, writer, ApprovalProcessStepCondition.class);
			return writer.toString();
		}
		return null;
	}

	private ValueMode propertyValueMode = ValueMode.DB_FIELD;

	@Override
	public ValueMode getPropertyValueMode() {
		return this.propertyValueMode;
	}

	public void setPropertyValueMode(ValueMode value) {
		this.propertyValueMode = value;
	}

	private String propertyName;

	@Override
	public String getPropertyName() {
		return this.propertyName;
	}

	public void setPropertyName(String value) {
		this.propertyName = value;
	}

	private emConditionOperation operation;

	@Override
	public emConditionOperation getOperation() {
		return this.operation;
	}

	public void setOperation(emConditionOperation value) {
		this.operation = value;
	}

	private emConditionRelationship relation;

	@Override
	public emConditionRelationship getRelation() {
		return this.relation;
	}

	public void setRelation(emConditionRelationship value) {
		this.relation = value;
	}

	private ValueMode conditionValueMode = ValueMode.INPUT;

	@Override
	public ValueMode getConditionValueMode() {
		return this.conditionValueMode;
	}

	public void setConditionValueMode(ValueMode value) {
		this.conditionValueMode = value;
	}

	private String conditionValue;

	@Override
	public String getConditionValue() {
		return this.conditionValue;
	}

	public void setConditionValue(String value) {
		this.conditionValue = value;
	}

	private int bracketOpen;

	@Override
	public int getBracketOpen() {
		return this.bracketOpen;
	}

	public void setBracketOpen(int value) {
		this.bracketOpen = value;
	}

	private int bracketClose;

	@Override
	public int getBracketClose() {
		return this.bracketClose;
	}

	public void setBracketClose(int value) {
		this.bracketClose = value;
	}
}
