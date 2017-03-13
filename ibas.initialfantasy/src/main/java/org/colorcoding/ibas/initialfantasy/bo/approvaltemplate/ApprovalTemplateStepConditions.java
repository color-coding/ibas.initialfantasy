package org.colorcoding.ibas.initialfantasy.bo.approvaltemplate;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.initialfantasy.MyConsts;

/**
 * 审批模板步骤条件 集合
 */
@XmlType(name = ApprovalTemplateStepConditions.BUSINESS_OBJECT_NAME, namespace = MyConsts.NAMESPACE_BO)
@XmlSeeAlso({ ApprovalTemplateStepCondition.class })
public class ApprovalTemplateStepConditions
		extends BusinessObjects<IApprovalTemplateStepCondition, IApprovalTemplateStep>
		implements IApprovalTemplateStepConditions {

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "ApprovalTemplateStepConditions";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 4755531819577845333L;

	/**
	 * 构造方法
	 */
	public ApprovalTemplateStepConditions() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent
	 *            父项对象
	 */
	public ApprovalTemplateStepConditions(IApprovalTemplateStep parent) {
		super(parent);
	}

	/**
	 * 元素类型
	 */
	public Class<?> getElementType() {
		return ApprovalTemplateStepCondition.class;
	}

	/**
	 * 创建审批模板步骤条件
	 * 
	 * @return 审批模板步骤条件
	 */
	public IApprovalTemplateStepCondition create() {
		IApprovalTemplateStepCondition item = new ApprovalTemplateStepCondition();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

}
