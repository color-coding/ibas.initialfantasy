package org.colorcoding.ibas.initialfantasy.bo.shells;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.emAuthoriseType;
import org.colorcoding.ibas.initialfantasy.bo.privilege.IPrivilege;
import org.colorcoding.ibas.initialfantasy.data.emPrivilegeSource;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "UserPrivilege")
@XmlRootElement(name = "UserPrivilege")
public class UserPrivilege {

	public static UserPrivilege create(IPrivilege privilege) {
		UserPrivilege sPrivilege = new UserPrivilege();
		return sPrivilege;
	}

	/** 来源 */
	private emPrivilegeSource source;

	@XmlElement(name = "Source")
	public emPrivilegeSource getSource() {
		return source;
	}

	public void setSource(emPrivilegeSource source) {
		this.source = source;
	}

	/** 权限目标 */
	private String target;

	@XmlElement(name = "Target")
	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	/** 权限值 */
	private emAuthoriseType value;

	@XmlElement(name = "Value")
	public emAuthoriseType getValue() {
		return value;
	}

	public void setValue(emAuthoriseType value) {
		this.value = value;
	}

}
