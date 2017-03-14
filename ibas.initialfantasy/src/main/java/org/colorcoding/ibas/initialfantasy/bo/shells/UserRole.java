package org.colorcoding.ibas.initialfantasy.bo.shells;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.initialfantasy.bo.organizations.IRole;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "UserRole")
@XmlRootElement(name = "UserRole")
public class UserRole {
	public static UserRole create(IRole role) {
		UserRole sRole = new UserRole();
		sRole.setCode(role.getCode());
		sRole.setName(role.getName());
		return sRole;
	}

	private String code;

	@XmlElement(name = "Code")
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	private String name;

	@XmlElement(name = "Name")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
