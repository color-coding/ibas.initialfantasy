package org.colorcoding.ibas.initialfantasy.bo.shell;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.organization.InvalidAuthorizationException;
import org.colorcoding.ibas.bobas.util.EncryptMD5;
import org.colorcoding.ibas.initialfantasy.bo.organization.IUser;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "User")
@XmlRootElement(name = "User")
public class User implements org.colorcoding.ibas.bobas.organization.IUser {

	public static User create(IUser user) {
		User sUser = new User();
		sUser.setId(user.getDocEntry());
		sUser.setCode(user.getCode());
		sUser.setName(user.getName());
		sUser.setBelong(user.getOrganization());
		sUser.setSuper(user.getSuper() == emYesNo.YES ? true : false);
		StringBuilder stringBuilder = new StringBuilder();
		stringBuilder.append(user.getCreateActionId());
		stringBuilder.append(user.getPassword());
		stringBuilder.append(user.getCode());
		sUser.setToken(EncryptMD5.md5(stringBuilder.toString()));
		return sUser;
	}

	private int id;

	@XmlElement(name = "Id")
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	private boolean _super;

	@XmlElement(name = "Super")
	public boolean isSuper() {
		return _super;
	}

	public void setSuper(boolean value) {
		this._super = value;
	}

	private String belong;

	@Override
	@XmlElement(name = "Belong")
	public String getBelong() {
		return this.belong;
	}

	public void setBelong(String belong) {
		this.belong = belong;
	}

	private String token;

	@Override
	@XmlElement(name = "Token")
	public String getToken() {
		return this.token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	@Override
	public void checkAuthorization(String authorizationCode) throws InvalidAuthorizationException {
		if (authorizationCode != null) {
			if (authorizationCode.equals(this.getToken())) {
				return;
			}
		}
		throw new InvalidAuthorizationException();
	}

	@Override
	public String toString() {
		return String.format("{user: %s|%s}", this.getId(), this.getCode());
	}
}
