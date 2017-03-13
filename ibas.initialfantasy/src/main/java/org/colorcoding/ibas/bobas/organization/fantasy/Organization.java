package org.colorcoding.ibas.bobas.organization.fantasy;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "Organization")
@XmlRootElement(name = "Organization")
public class Organization {
	@Override
	public boolean equals(Object obj) {
		if (obj instanceof Organization) {
			Organization org = (Organization) obj;
			if (this.getCode().equals(org.getCode())) {
				return true;
			}
		}
		return super.equals(obj);
	}

	@XmlElement(name = "code")
	private String code;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@Override
	public String toString() {
		return String.format("{Org [%s] manager [%s]}", this.getCode(), this.getManager());
	}

	@XmlElementWrapper(name = "organizations")
	@XmlElement(name = "organization", type = Organization.class)
	private List<Organization> organizations;

	public List<Organization> getOrganizations() {
		if (organizations == null) {
			organizations = new ArrayList<>();
		}
		return organizations;
	}

	public void setOrganizations(List<Organization> organizations) {
		this.organizations = organizations;
	}

	@XmlElement(name = "manager")
	private User manager;

	public User getManager() {
		return manager;
	}

	public void setManager(User manager) {
		this.manager = manager;
	}

	@XmlElementWrapper(name = "members")
	@XmlElement(name = "members", type = User.class)
	private List<User> members;

	public List<User> getMembers() {
		if (members == null) {
			members = new ArrayList<>();
		}
		return members;
	}

	public void setMembers(List<User> members) {
		this.members = members;
	}

}
