package org.colorcoding.ibas.initialfantasy.logic;

import org.colorcoding.ibas.bobas.logic.IBusinessLogicContract;

/**
 * 用户手机检查（唯一保证）
 * 
 * @author Niuren.Zhu
 *
 */
public interface IUserPhoneCheckContract extends IBusinessLogicContract {

	String getCode();

	String getPhone();
}
