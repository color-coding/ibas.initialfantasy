package org.colorcoding.ibas.initialfantasy.bo.organizations;

import java.beans.PropertyChangeEvent;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.ICriteria;
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
	private static final long serialVersionUID = 4858454995302790632L;

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
		// TODO 设置关联值
	}

	@Override
	public ICriteria getElementCriteria() {
		ICriteria criteria = super.getElementCriteria();
		// TODO 添加关联查询条件
		return criteria;
	}

	@Override
	public void onParentPropertyChanged(PropertyChangeEvent evt) {
		super.onParentPropertyChanged(evt);
		// TODO 设置关联值
	}
}
