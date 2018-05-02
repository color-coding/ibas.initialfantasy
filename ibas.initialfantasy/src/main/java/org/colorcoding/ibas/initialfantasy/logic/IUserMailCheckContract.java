package org.colorcoding.ibas.initialfantasy.logic;

import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 用户邮件检查（唯一保证）
 * 
 * @author Niuren.Zhu
 *
 */
public interface IUserMailCheckContract extends IBusinessLogicContract {

	String getCode();

	String getMail();
}
