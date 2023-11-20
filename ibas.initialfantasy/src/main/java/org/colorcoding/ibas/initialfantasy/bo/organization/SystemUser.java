package org.colorcoding.ibas.initialfantasy.bo.organization;

import java.util.UUID;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.IBOCustomKey;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.rule.BusinessRuleException;
import org.colorcoding.ibas.bobas.rule.ICheckRules;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 系统用户
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = SystemUser.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = SystemUser.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
public class SystemUser extends User implements IBOCustomKey, ICheckRules {

	private static final long serialVersionUID = -5001998351546173460L;

	public static final String BUSINESS_OBJECT_NAME = "SystemUser";

	@Override
	public void setDocEntry(Integer value) {
		// 仅支持小于0的值
		if (value != null && Integer.compare(value, 0) < 0) {
			super.setDocEntry(value);
		}
	}

	@Override
	public void check() throws BusinessRuleException {
		this.setPassword(UUID.randomUUID().toString());
		this.setActivated(emYesNo.NO);
		this.setSuper(emYesNo.NO);
	}
}
