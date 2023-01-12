package org.colorcoding.ibas.initialfantasy.bo.bofiltering;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.ISort;
import org.colorcoding.ibas.bobas.common.SortType;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 业务对象筛选-条件 集合
 */
@XmlType(name = BOFilteringConditions.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ BOFilteringCondition.class })
public class BOFilteringConditions extends BusinessObjects<IBOFilteringCondition, IBOFiltering>
		implements IBOFilteringConditions {

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "BOFilteringConditions";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = -5127462247580095622L;

	/**
	 * 构造方法
	 */
	public BOFilteringConditions() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent 父项对象
	 */
	public BOFilteringConditions(IBOFiltering parent) {
		super(parent);
	}

	/**
	 * 元素类型
	 */
	public Class<?> getElementType() {
		return BOFilteringCondition.class;
	}

	/**
	 * 创建业务对象筛选-条件
	 * 
	 * @return 业务对象筛选-条件
	 */
	public IBOFilteringCondition create() {
		IBOFilteringCondition item = new BOFilteringCondition();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	@Override
	public ICriteria getElementCriteria() {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(BOFilteringCondition.PROPERTY_OBJECTKEY.getName());
		condition.setValue(this.getParent().getObjectKey());
		ISort sort = criteria.getSorts().create();
		sort.setAlias(BOFilteringCondition.PROPERTY_OBJECTKEY.getName());
		sort.setSortType(SortType.ASCENDING);
		sort = criteria.getSorts().create();
		sort.setAlias(BOFilteringCondition.PROPERTY_VISORDER.getName());
		sort.setSortType(SortType.ASCENDING);
		sort = criteria.getSorts().create();
		sort.setAlias(BOFilteringCondition.PROPERTY_LINEID.getName());
		sort.setSortType(SortType.ASCENDING);
		return criteria;
	}

}
