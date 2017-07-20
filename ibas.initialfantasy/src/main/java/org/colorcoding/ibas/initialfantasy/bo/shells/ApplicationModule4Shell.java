package org.colorcoding.ibas.initialfantasy.bo.shells;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.emAuthoriseType;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.initialfantasy.bo.applications.ApplicationModule;

/**
 * 获取-应用程序模块
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
public class ApplicationModule4Shell extends ApplicationModule {

	private static final long serialVersionUID = 2966216219545038262L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = ApplicationModule4Shell.class;

	/**
	 * 属性名称-权限类型
	 */
	private static final String PROPERTY_AUTHORISEVALUE_NAME = "AuthoriseValue";

	/**
	 * 权限类型 属性
	 */
	@DbField(name = "AuthValue", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emAuthoriseType> PROPERTY_AUTHORISEVALUE = registerProperty(
			PROPERTY_AUTHORISEVALUE_NAME, emAuthoriseType.class, MY_CLASS);

	/**
	 * 获取-权限类型
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_AUTHORISEVALUE_NAME)
	public final emAuthoriseType getAuthoriseValue() {
		return this.getProperty(PROPERTY_AUTHORISEVALUE);
	}

	/**
	 * 设置-权限类型
	 * 
	 * @param value
	 *            值
	 */
	public final void setAuthoriseValue(emAuthoriseType value) {
		this.setProperty(PROPERTY_AUTHORISEVALUE, value);
	}

}
