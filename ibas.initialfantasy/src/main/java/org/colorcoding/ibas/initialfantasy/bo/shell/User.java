package org.colorcoding.ibas.initialfantasy.bo.shell;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.common.DateTimes;
import org.colorcoding.ibas.bobas.common.EncryptMD5;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.core.Serializable;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.KeyText;
import org.colorcoding.ibas.bobas.data.List;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.organization.InvalidAuthorizationException;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;
import org.colorcoding.ibas.initialfantasy.bo.organization.IUser;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "User")
@XmlRootElement(name = "User")
public class User extends Serializable implements org.colorcoding.ibas.bobas.organization.IUser {

	/** 变量-用户ID */
	public static final String VARIABLE_NAME_USER_ID = "${USER_ID}";
	/** 变量-用户编码 */
	public static final String VARIABLE_NAME_USER_CODE = "${USER_CODE}";
	/** 变量-用户名称 */
	public static final String VARIABLE_NAME_USER_NAME = "${USER_NAME}";
	/** 变量-用户归属 */
	public static final String VARIABLE_NAME_USER_BELONG = "${USER_BELONG}";
	/** 变量-用户身份 */
	public static final String VARIABLE_NAME_USER_IDENTITIES = "${USER_IDENTITIES}";

	private static final long serialVersionUID = 1850586878174104320L;

	private static String TOKEN_NOT_EXPIRED_USERS = null;

	public static User create(IUser user) {
		User sUser = new User();
		sUser.setId(user.getDocEntry());
		sUser.setCode(user.getCode());
		sUser.setName(user.getName());
		sUser.setBelong(user.getOrganization());
		sUser.setSuper(user.getSuper() == emYesNo.YES ? true : false);
		if (!Strings.isNullOrEmpty(user.getSpecifics())) {
			String[] values;
			for (String item : user.getSpecifics().split(";")) {
				if (Strings.isNullOrEmpty(item)) {
					continue;
				}
				values = item.split("=");
				if (values.length > 1) {
					sUser.getSpecifics().add(new KeyText(values[0], values[1]));
				} else {
					sUser.getSpecifics().add(new KeyText(values[0], "YES"));
				}
			}
			values = null;
		}

		StringBuilder stringBuilder = new StringBuilder();
		stringBuilder.append(user.getCreateActionId());
		stringBuilder.append(user.getPassword());
		stringBuilder.append(user.getCode());
		stringBuilder.append(MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_USER_TOKEN_KEY, "CC"));
		if (MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_USER_TOKEN_TIMEOUT_TIME, 0) > 0
				|| MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_USER_TOKEN_INSTANCES, 0) > 0) {
			if (TOKEN_NOT_EXPIRED_USERS == null) {
				synchronized (User.class) {
					TOKEN_NOT_EXPIRED_USERS = MyConfiguration
							.getConfigValue(MyConfiguration.CONFIG_ITEM_TOKEN_NOT_EXPIRED_USERS, "");
					if (!TOKEN_NOT_EXPIRED_USERS.endsWith(";")) {
						TOKEN_NOT_EXPIRED_USERS = TOKEN_NOT_EXPIRED_USERS + ";";
					}
				}
			}
			if (!Strings.isNullOrEmpty(TOKEN_NOT_EXPIRED_USERS)) {
				if (!TOKEN_NOT_EXPIRED_USERS.contains(sUser.getCode() + ";")) {
					sUser.setTokenTimeStamp();
					stringBuilder.append(sUser.getTokenTimeStamp());
				}
			}
		}
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

	private String identities;

	@XmlElement(name = "Identities")
	public final String getIdentities() {
		return identities;
	}

	public final void setIdentities(String identities) {
		this.identities = identities;
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

	@XmlElementWrapper(name = "Specifics")
	@XmlElement(name = "Item", type = KeyText.class)
	private ArrayList<KeyText> specifics;

	public final List<KeyText> getSpecifics() {
		if (this.specifics == null) {
			this.specifics = new ArrayList<>();
		}
		return specifics;
	}

	public final void setSpecifics(List<KeyText> specifics) {
		this.getSpecifics().addAll(specifics);
	}

	public String valueOfSpecific(String name) {
		if (!(Strings.isWith(name, "${", "}"))) {
			name = String.format("${%s}", name);
		}
		if (VARIABLE_NAME_USER_ID.equals(name)) {
			return String.valueOf(this.getId());
		} else if (VARIABLE_NAME_USER_CODE.equals(name)) {
			return this.getCode();
		} else if (VARIABLE_NAME_USER_NAME.equals(name)) {
			return this.getName();
		} else if (VARIABLE_NAME_USER_BELONG.equals(name)) {
			return this.getBelong();
		} else if (VARIABLE_NAME_USER_IDENTITIES.equals(name)) {
			return this.getIdentities();
		}
		String spName = Strings.isWith(name, "${", "}") ? name.substring(2, name.length() - 1) : name;
		KeyText value = this.getSpecifics().firstOrDefault(c -> c.getKey().equalsIgnoreCase(spName));
		if (value != null) {
			return String.valueOf(value.getText());
		}
		return Strings.VALUE_EMPTY;
	}

	private long tokenTimeStamp = 0;

	public final long getTokenTimeStamp() {
		return tokenTimeStamp;
	}

	public final void setTokenTimeStamp(long value) {
		this.tokenTimeStamp = value;
	}

	public final void setTokenTimeStamp() {
		this.setTokenTimeStamp(DateTimes.now().getTime());
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
