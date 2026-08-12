package org.colorcoding.ibas.initialfantasy.bo.bologst;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 业务对象日志
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = BOLogst.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
public class BOLogst extends org.colorcoding.ibas.bobas.logic.common.BOLogst implements IBOLogst {

	private static final long serialVersionUID = 1L;

	@Override
	@XmlElement(name = "BOCode")
	public String getBOCode() {
		return super.getBOCode();
	}

	@Override
	@XmlElement(name = "BOKeys")
	public String getBOKeys() {
		return super.getBOKeys();
	}

	@Override
	@XmlElement(name = "LogInst")
	public Integer getLogInst() {
		return super.getLogInst();
	}

	@Override
	@XmlElement(name = "ModifyUser")
	public Integer getModifyUser() {
		return super.getModifyUser();
	}

	@Override
	@XmlElement(name = "ModifyDate")
	public DateTime getModifyDate() {
		return super.getModifyDate();
	}

	@Override
	@XmlElement(name = "ModifyTime")
	public Short getModifyTime() {
		return super.getModifyTime();
	}

	@Override
	@XmlElement(name = "TransactionId")
	public String getTransactionId() {
		return super.getTransactionId();
	}

	@Override
	@XmlElement(name = "Cause")
	public String getCause() {
		return super.getCause();
	}

	@Override
	@XmlElement(name = "Content")
	public String getContent() {
		return super.getContent();
	}

}
