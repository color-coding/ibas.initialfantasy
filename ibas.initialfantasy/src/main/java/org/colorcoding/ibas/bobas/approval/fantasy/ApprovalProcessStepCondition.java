package org.colorcoding.ibas.bobas.approval.fantasy;

import java.io.StringWriter;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.approval.IApprovalProcessStepCondition;
import org.colorcoding.ibas.bobas.data.emConditionOperation;
import org.colorcoding.ibas.bobas.data.emConditionRelationship;
import org.colorcoding.ibas.bobas.serialization.ISerializer;
import org.colorcoding.ibas.bobas.serialization.ISerializerManager;
import org.colorcoding.ibas.bobas.serialization.SerializerFactory;
import org.colorcoding.ibas.bobas.util.ArrayList;
import org.colorcoding.ibas.initialfantasy.bo.approvaltemplate.IApprovalTemplateStepCondition;

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
			ISerializer serializer = SerializerFactory.create().createManager().create(ISerializerManager.TYPE_JSON);
			@SuppressWarnings("unchecked")
			java.util.ArrayList<ApprovalProcessStepCondition> stepConditions = serializer.deserialize(condition,
					ArrayList.class, ApprovalProcessStepCondition.class);
			return stepConditions.toArray(new IApprovalProcessStepCondition[] {});
		}
		return null;
	}

	public static String serialize(List<IApprovalTemplateStepCondition> conditions) {
		if (conditions != null) {
			ArrayList<ApprovalProcessStepCondition> stepConditions = new ArrayList<ApprovalProcessStepCondition>();
			for (IApprovalTemplateStepCondition item : conditions) {
				ApprovalProcessStepCondition stepCondition = new ApprovalProcessStepCondition();
				stepCondition.setRelation(item.getRelationship());
				stepCondition.setPropertyName(item.getPropertyName());
				stepCondition.setOperation(item.getOperation());
				stepCondition.setConditionValue(item.getConditionValue());
				stepConditions.add(stepCondition);
			}
			ISerializer serializer = SerializerFactory.create().createManager().create(ISerializerManager.TYPE_JSON);
			StringWriter writer = new StringWriter();
			serializer.serialize(stepConditions, writer, ApprovalProcessStepCondition.class);
			return writer.toString();
		}
		return null;
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

	private String conditionValue;

	@Override
	public String getConditionValue() {
		return this.conditionValue;
	}

	public void setConditionValue(String value) {
		this.conditionValue = value;
	}

}
