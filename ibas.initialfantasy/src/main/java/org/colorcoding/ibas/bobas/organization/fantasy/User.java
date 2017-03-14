package org.colorcoding.ibas.bobas.organization.fantasy;

import java.util.UUID;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.organization.IUser;
import org.colorcoding.ibas.bobas.organization.InvalidAuthorizationException;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "User")
@XmlRootElement(name = "User")
public class User implements IUser {
	public static final User UNKNOWN_USER = new User(OrganizationManager.UNKNOWN_USER_SIGN, "!unknown");
	public static final User SYSTEM_USER = new User(OrganizationManager.SYSTEM_USER_SIGN, "!system",
			UUID.randomUUID().toString());

	public static User create(org.colorcoding.ibas.initialfantasy.bo.organizations.IUser user) {
		User nUser = new User();
		nUser.setCode(user.getCode());
		nUser.setId(user.getDocEntry());
		nUser.setBelong(user.getOrganization());
		nUser.setPassword(user.getPassword());
		return nUser;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj instanceof User) {
			User user = (User) obj;
			if (this.getId() == user.getId() || this.getCode().equals(user.getCode())) {
				return true;
			}
		}
		return super.equals(obj);
	}

	public User() {
		this.setId(-1);
		this.setCode("");
		this.setRole("");
		this.setToken("");
	}

	public User(int id, String code) {
		this.setId(id);
		this.setCode(code);
	}

	public User(int id, String code, String token) {
		this(id, code);
		this.setToken(token);
	}

	@XmlElement(name = "id")
	private int id;

	@Override
	public int getId() {
		return this.id;
	}

	public void setId(int value) {
		this.id = value;
	}

	@XmlElement(name = "code")
	private String code;

	public String getCode() {
		return this.code;
	}

	public void setCode(String value) {
		this.code = value;
	}

	@XmlElement(name = "role")
	private String role;

	public String getRole() {
		return this.role;
	}

	public void setRole(String value) {
		this.role = value;
	}

	private String token;

	// @XmlElement(name = "token")
	public String getToken() {
		if (token == null || token.isEmpty()) {
			token = OrganizationManager.createToken(this);
		}
		if (token == null) {
			token = "";
		}
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	@XmlElement(name = "belong")
	private String belong;

	public String getBelong() {
		return this.belong;
	}

	public void setBelong(String value) {
		this.belong = value;
	}

	@XmlElement(name = "password")
	private String password;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public void checkAuthorization(String authorizationCode) throws InvalidAuthorizationException {
		if (this.getToken().equals(authorizationCode)) {
			return;
		}
		throw new InvalidAuthorizationException();
	}

	public String toString() {
		return String.format("{User %s/%s}", this.getCode(), this.getId());
	}

}
