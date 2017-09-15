package org.colorcoding.ibas.initialfantasy.bo.approvaltemplate;

import java.beans.PropertyChangeEvent;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.bo.IBOLine;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.ISort;
import org.colorcoding.ibas.bobas.common.SortType;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 审批模板步骤条件 集合
 */
@XmlType(name = ApprovalTemplateStepConditions.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
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

	@Override
	protected void afterAddItem(IApprovalTemplateStepCondition item) {
		super.afterAddItem(item);
		item.setStepLineId(this.getParent().getLineId());
	}

	@Override
	public ICriteria getElementCriteria() {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(ApprovalTemplateStepCondition.PROPERTY_STEPLINEID.getName());
		condition.setValue(this.getParent().getLineId());
		condition = criteria.getConditions().create();
		condition.setAlias(ApprovalTemplateStepCondition.PROPERTY_OBJECTKEY.getName());
		condition.setValue(this.getParent().getObjectKey());
		ISort sort = criteria.getSorts().create();
		sort.setAlias(ApprovalTemplateStepCondition.PROPERTY_OBJECTKEY.getName());
		sort.setSortType(SortType.ASCENDING);
		sort = criteria.getSorts().create();
		sort.setAlias(ApprovalTemplateStepCondition.PROPERTY_LINEID.getName());
		sort.setSortType(SortType.ASCENDING);
		return criteria;
	}

	@Override
	public void onParentPropertyChanged(PropertyChangeEvent arg0) {
		super.onParentPropertyChanged(arg0);
		if (arg0.getPropertyName().equals(IBOLine.SECONDARY_PRIMARY_KEY_NAME)) {
			for (IApprovalTemplateStepCondition item : this) {
				item.setStepLineId(this.getParent().getLineId());
			}
		}

	}
}
