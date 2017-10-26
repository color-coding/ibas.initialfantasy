package org.colorcoding.ibas.initialfantasy.bo.shell;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.emAuthoriseType;
import org.colorcoding.ibas.bobas.mapping.BOCode;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;
import org.colorcoding.ibas.initialfantasy.data.emPrivilegeSource;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = UserPrivilege.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = UserPrivilege.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@BOCode(UserPrivilege.BUSINESS_OBJECT_CODE)
public class UserPrivilege extends BusinessObject<UserPrivilege> implements IBusinessObject {

	private static final long serialVersionUID = -71911156136284150L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = UserPrivilege.class;

	/**
	 * 业务对象编码
	 */
	public static final String BUSINESS_OBJECT_CODE = "${Company}_USER_PRIVILEGE";

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "UserPrivilege";

	/**
	 * 属性名称-来源
	 */
	private static final String PROPERTY_SOURCE_NAME = "Source";

	/**
	 * 来源 属性
	 */
	@DbField(name = "Source", type = DbFieldType.ALPHANUMERIC, primaryKey = false)
	public static final IPropertyInfo<emPrivilegeSource> PROPERTY_SOURCE = registerProperty(PROPERTY_SOURCE_NAME,
			emPrivilegeSource.class, MY_CLASS);

	/**
	 * 获取-来源
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SOURCE_NAME)
	public final emPrivilegeSource getSource() {
		return this.getProperty(PROPERTY_SOURCE);
	}

	/**
	 * 设置-来源
	 * 
	 * @param value
	 *            值
	 */
	public final void setSource(emPrivilegeSource value) {
		this.setProperty(PROPERTY_SOURCE, value);
	}

	/**
	 * 属性名称-目标
	 */
	private static final String PROPERTY_TARGET_NAME = "Target";

	/**
	 * 目标 属性
	 */
	@DbField(name = "Target", type = DbFieldType.ALPHANUMERIC, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_TARGET = registerProperty(PROPERTY_TARGET_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-目标
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_TARGET_NAME)
	public final String getTarget() {
		return this.getProperty(PROPERTY_TARGET);
	}

	/**
	 * 设置-目标
	 * 
	 * @param value
	 *            值
	 */
	public final void setTarget(String value) {
		this.setProperty(PROPERTY_TARGET, value);
	}

	/**
	 * 属性名称-权限值
	 */
	private static final String PROPERTY_VALUE_NAME = "Value";

	/**
	 * 权限值 属性
	 */
	@DbField(name = "Value", type = DbFieldType.ALPHANUMERIC, primaryKey = false)
	public static final IPropertyInfo<emAuthoriseType> PROPERTY_VALUE = registerProperty(PROPERTY_VALUE_NAME,
			emAuthoriseType.class, MY_CLASS);

	/**
	 * 获取-权限值
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_VALUE_NAME)
	public final emAuthoriseType getValue() {
		return this.getProperty(PROPERTY_VALUE);
	}

	/**
	 * 设置-权限值
	 * 
	 * @param value
	 *            值
	 */
	public final void setValue(emAuthoriseType value) {
		this.setProperty(PROPERTY_VALUE, value);
	}

	@Override
	public String toString() {
		return String.format("{privilege: %s %s %s}", this.getSource(), this.getTarget(), this.getValue());
	}
}
