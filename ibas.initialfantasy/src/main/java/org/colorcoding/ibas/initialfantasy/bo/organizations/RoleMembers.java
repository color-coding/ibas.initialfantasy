package org.colorcoding.ibas.initialfantasy.bo.organizations;

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
import org.colorcoding.ibas.initialfantasy.MyConsts;

/**
 * 组织-角色-成员 集合
 */
@XmlType(name = RoleMembers.BUSINESS_OBJECT_NAME, namespace = MyConsts.NAMESPACE_BO)
@XmlSeeAlso({ RoleMember.class })
public class RoleMembers extends BusinessObjects<IRoleMember, IOrganizationalRole> implements IRoleMembers {

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "RoleMembers";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 6621920741824890441L;

	/**
	 * 构造方法
	 */
	public RoleMembers() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent
	 *            父项对象
	 */
	public RoleMembers(IOrganizationalRole parent) {
		super(parent);
	}

	/**
	 * 元素类型
	 */
	public Class<?> getElementType() {
		return RoleMember.class;
	}

	/**
	 * 创建组织-角色-成员
	 * 
	 * @return 组织-角色-成员
	 */
	public IRoleMember create() {
		IRoleMember item = new RoleMember();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	@Override
	protected void afterAddItem(IRoleMember item) {
		super.afterAddItem(item);
		item.setRoleLineId(this.getParent().getLineId());
		item.setObjectKey(this.getParent().getObjectKey());
	}

	@Override
	public ICriteria getElementCriteria() {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(RoleMember.PROPERTY_ROLELINEID.getName());
		condition.setValue(this.getParent().getLineId());
		condition = criteria.getConditions().create();
		condition.setAlias(RoleMember.PROPERTY_OBJECTKEY.getName());
		condition.setValue(this.getParent().getObjectKey());
		ISort sort = criteria.getSorts().create();
		sort.setAlias(RoleMember.PROPERTY_OBJECTKEY.getName());
		sort.setSortType(SortType.ASCENDING);
		sort = criteria.getSorts().create();
		sort.setAlias(RoleMember.PROPERTY_LINEID.getName());
		sort.setSortType(SortType.ASCENDING);
		return criteria;
	}

	@Override
	public void onParentPropertyChanged(PropertyChangeEvent arg0) {
		super.onParentPropertyChanged(arg0);
		if (arg0.getPropertyName().equals(IBOLine.SECONDARY_PRIMARY_KEY_NAME)) {
			for (IRoleMember item : this) {
				item.setRoleLineId(this.getParent().getLineId());
			}
		}
	}
}
