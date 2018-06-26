package org.colorcoding.ibas.initialfantasy.bo.boinformation;

import java.beans.PropertyChangeEvent;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 业务对象属性值 集合
 */
@XmlType(name = BOPropertyValues.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ BOPropertyValue.class })
public class BOPropertyValues extends BusinessObjects<IBOPropertyValue, IBOPropertyInformation>
		implements IBOPropertyValues {

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "BOPropertyValues";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = -2331313161801244840L;

	/**
	 * 构造方法
	 */
	public BOPropertyValues() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent
	 *            父项对象
	 */
	public BOPropertyValues(IBOPropertyInformation parent) {
		super(parent);
	}

	/**
	 * 元素类型
	 */
	public Class<?> getElementType() {
		return BOPropertyValue.class;
	}

	/**
	 * 创建业务对象属性信息
	 * 
	 * @return 业务对象属性信息
	 */
	public IBOPropertyValue create() {
		IBOPropertyValue item = new BOPropertyValue();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	@Override
	protected void afterAddItem(IBOPropertyValue item) {
		super.afterAddItem(item);
		item.setCode(this.getParent().getCode());
		item.setPropertyName(this.getParent().getPropertyName());
	}

	@Override
	public ICriteria getElementCriteria() {
		ICriteria criteria = super.getElementCriteria();
		return criteria;
	}

	@Override
	public void onParentPropertyChanged(PropertyChangeEvent evt) {
		super.onParentPropertyChanged(evt);
		if (evt.getPropertyName().equals(BOPropertyInformation.PROPERTY_CODE.getName())) {
			for (IBOPropertyValue item : this) {
				item.setCode(this.getParent().getCode());
			}
		} else if (evt.getPropertyName().equals(BOPropertyInformation.PROPERTY_PROPERTY.getName())) {
			for (IBOPropertyValue item : this) {
				item.setPropertyName(this.getParent().getPropertyName());
			}
		}
	}
}
