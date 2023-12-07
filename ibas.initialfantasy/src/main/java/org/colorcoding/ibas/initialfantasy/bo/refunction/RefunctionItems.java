package org.colorcoding.ibas.initialfantasy.bo.refunction;

import java.beans.PropertyChangeEvent;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.ISort;
import org.colorcoding.ibas.bobas.common.SortType;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 重组功能-项目 集合
 */
@XmlType(name = RefunctionItems.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ RefunctionItem.class })
public class RefunctionItems extends BusinessObjects<IRefunctionItem, IBusinessObject> implements IRefunctionItems {

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "RefunctionItems";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 7417682964975277781L;

	/**
	 * 构造方法
	 */
	public RefunctionItems() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent 父项对象
	 */
	public RefunctionItems(IBusinessObject parent) {
		super(parent);
	}

	/**
	 * 元素类型
	 */
	public Class<?> getElementType() {
		return RefunctionItem.class;
	}

	/**
	 * 创建重组功能-项目
	 * 
	 * @return 重组功能-项目
	 */
	public IRefunctionItem create() {
		IRefunctionItem item = new RefunctionItem();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	@Override
	protected void afterAddItem(IRefunctionItem item) {
		super.afterAddItem(item);
		if (this.getParent() instanceof IRefunction) {
			item.setParent(-1);
		} else if (this.getParent() instanceof IRefunctionItem) {
			IRefunctionItem parent = (IRefunctionItem) this.getParent();
			item.setParent(parent.getLineId());
		}
	}

	@Override
	public ICriteria getElementCriteria() {
		if (this.getParent() instanceof IRefunction) {
			IRefunction parent = (IRefunction) this.getParent();
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(RefunctionItem.PROPERTY_OBJECTKEY.getName());
			condition.setValue(parent.getObjectKey());
			condition = criteria.getConditions().create();
			condition.setAlias(RefunctionItem.PROPERTY_PARENT.getName());
			condition.setOperation(ConditionOperation.LESS_EQUAL);
			condition.setValue(0);
			ISort sort = criteria.getSorts().create();
			sort.setAlias(RefunctionItem.PROPERTY_VISORDER.getName());
			sort.setSortType(SortType.ASCENDING);
			sort = criteria.getSorts().create();
			sort.setAlias(RefunctionItem.PROPERTY_LINEID.getName());
			sort.setSortType(SortType.ASCENDING);
			return criteria;
		} else if (this.getParent() instanceof IRefunctionItem) {
			IRefunctionItem parent = (IRefunctionItem) this.getParent();
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(RefunctionItem.PROPERTY_OBJECTKEY.getName());
			condition.setValue(parent.getObjectKey());
			condition = criteria.getConditions().create();
			condition.setAlias(RefunctionItem.PROPERTY_PARENT.getName());
			condition.setValue(parent.getLineId());
			ISort sort = criteria.getSorts().create();
			sort.setAlias(RefunctionItem.PROPERTY_VISORDER.getName());
			sort.setSortType(SortType.ASCENDING);
			sort = criteria.getSorts().create();
			sort.setAlias(RefunctionItem.PROPERTY_LINEID.getName());
			sort.setSortType(SortType.ASCENDING);
			return criteria;
		}
		return null;
	}

	@Override
	protected void onParentPropertyChanged(PropertyChangeEvent evt) {
		super.onParentPropertyChanged(evt);
		if (evt.getPropertyName().equalsIgnoreCase(RefunctionItem.PROPERTY_OBJECTKEY.getName())
				|| evt.getPropertyName().equalsIgnoreCase(RefunctionItem.PROPERTY_LINEID.getName())) {
			if (this.getParent() instanceof IRefunction) {
				IRefunction parent = (IRefunction) this.getParent();
				for (IRefunctionItem item : this) {
					item.setObjectKey(parent.getObjectKey());
				}
			} else if (this.getParent() instanceof IRefunctionItem) {
				IRefunctionItem parent = (IRefunctionItem) this.getParent();
				for (IRefunctionItem item : this) {
					item.setObjectKey(parent.getObjectKey());
					item.setParent(parent.getLineId());
				}
			}
		}
	}
}
