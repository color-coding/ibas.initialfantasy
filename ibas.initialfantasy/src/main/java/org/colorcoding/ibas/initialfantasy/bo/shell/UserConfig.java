package org.colorcoding.ibas.initialfantasy.bo.shell;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.core.Serializable;
import org.colorcoding.ibas.initialfantasy.bo.application.IApplicationConfig;
import org.colorcoding.ibas.initialfantasy.bo.application.IApplicationConfigIdentity;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "UserConfig")
@XmlRootElement(name = "UserConfig")
public class UserConfig extends Serializable {

	private static final long serialVersionUID = -1873313597562957326L;

	public static UserConfig create(IApplicationConfig config) {
		UserConfig userConfig = new UserConfig();
		userConfig.setGroup(config.getConfigGroup());
		userConfig.setKey(config.getConfigKey());
		userConfig.setValue(config.getConfigValue());
		return userConfig;
	}

	public static UserConfig create(IApplicationConfigIdentity config) {
		UserConfig userConfig = new UserConfig();
		userConfig.setGroup(config.getConfigGroup());
		userConfig.setKey(config.getConfigKey());
		userConfig.setValue(config.getConfigValue());
		return userConfig;
	}

	private String group;

	@XmlElement(name = "Group")
	public final String getGroup() {
		return group;
	}

	public final void setGroup(String group) {
		this.group = group;
	}

	private String key;

	@XmlElement(name = "Key")
	public final String getKey() {
		return key;
	}

	public final void setKey(String key) {
		this.key = key;
	}

	private String value;

	@XmlElement(name = "Value")
	public final String getValue() {
		return value;
	}

	public final void setValue(String value) {
		this.value = value;
	}

	@Override
	public String toString() {
		return String.format("{config: %s %s}", this.getKey(), this.getValue());
	}

}
