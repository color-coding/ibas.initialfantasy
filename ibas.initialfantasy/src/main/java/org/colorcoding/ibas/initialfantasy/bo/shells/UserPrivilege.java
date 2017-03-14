package org.colorcoding.ibas.initialfantasy.bo.shells;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.initialfantasy.bo.privilege.IPrivilege;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "UserPrivilege")
@XmlRootElement(name = "UserPrivilege")
public class UserPrivilege {

	public static UserPrivilege create(IPrivilege privilege) {
		UserPrivilege sPrivilege = new UserPrivilege();
		return sPrivilege;
	}
}
