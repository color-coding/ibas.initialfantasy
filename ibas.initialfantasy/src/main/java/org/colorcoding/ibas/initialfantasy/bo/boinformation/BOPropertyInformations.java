package org.colorcoding.ibas.initialfantasy.bo.boinformation;

import java.beans.PropertyChangeEvent;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 业务对象属性信息 集合
 */
@XmlType(name = BOPropertyInformations.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ BOPropertyInformation.class })
public class BOPropertyInformations extends BusinessObjects<IBOPropertyInformation, IBOInformation>
		implements IBOPropertyInformations {

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "BOPropertyInformations";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = -2221313161801244840L;

	/**
	 * 构造方法
	 */
	public BOPropertyInformations() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent
	 *            父项对象
	 */
	public BOPropertyInformations(IBOInformation parent) {
		super(parent);
	}

	/**
	 * 元素类型
	 */
	public Class<?> getElementType() {
		return BOPropertyInformation.class;
	}

	/**
	 * 创建业务对象属性信息
	 * 
	 * @return 业务对象属性信息
	 */
	public IBOPropertyInformation create() {
		IBOPropertyInformation item = new BOPropertyInformation();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	@Override
	protected void afterAddItem(IBOPropertyInformation item) {
		super.afterAddItem(item);
		item.setCode(this.getParent().getCode());
	}

	@Override
	public ICriteria getElementCriteria() {
		ICriteria criteria = super.getElementCriteria();
		return criteria;
	}

	@Override
	protected void onParentPropertyChanged(PropertyChangeEvent evt) {
		super.onParentPropertyChanged(evt);
		if (evt.getPropertyName().equals(BOInformation.PROPERTY_CODE.getName())) {
			for (IBOPropertyInformation item : this) {
				item.setCode(this.getParent().getCode());
			}
		}
	}
}
