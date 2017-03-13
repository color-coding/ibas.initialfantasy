/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    emYesNo,
    emDocumentStatus,
    emBOStatus,
    emApprovalStatus,
    BusinessObject,
    BusinessObjects
} from '../../3rdparty/ibas/index';
import { 
    IPrivilege,
} from '../../api/privilege/privilege.data.d';

/** 系统权限 */
export class Privilege extends BusinessObject<Privilege> implements IPrivilege {

    constructor() {
        super();
    }

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = "${Company}_SYS_PRIVILEGE";

    /** 映射的属性名称-角色标识 */
    private static PROPERTY_NAME_ROLECODE: string = "_roleCode";

    /** 获取-角色标识 */
    get roleCode(): string {
        return this.getProperty<string>(Privilege.PROPERTY_NAME_ROLECODE);
    }

    /** 设置-角色标识 */
    set roleCode(value: string) {
        this.setProperty(Privilege.PROPERTY_NAME_ROLECODE, value);
    }

    /** 映射的属性名称-平台标识 */
    private static PROPERTY_NAME_PLATFORMID: string = "_platformID";

    /** 获取-平台标识 */
    get platformID(): string {
        return this.getProperty<string>(Privilege.PROPERTY_NAME_PLATFORMID);
    }

    /** 设置-平台标识 */
    set platformID(value: string) {
        this.setProperty(Privilege.PROPERTY_NAME_PLATFORMID, value);
    }

    /** 映射的属性名称-模块标识 */
    private static PROPERTY_NAME_MODULEID: string = "_moduleID";

    /** 获取-模块标识 */
    get moduleID(): string {
        return this.getProperty<string>(Privilege.PROPERTY_NAME_MODULEID);
    }

    /** 设置-模块标识 */
    set moduleID(value: string) {
        this.setProperty(Privilege.PROPERTY_NAME_MODULEID, value);
    }

    /** 映射的属性名称-功能标识 */
    private static PROPERTY_NAME_FUNCTIONID: string = "_functionID";

    /** 获取-功能标识 */
    get functionID(): string {
        return this.getProperty<string>(Privilege.PROPERTY_NAME_FUNCTIONID);
    }

    /** 设置-功能标识 */
    set functionID(value: string) {
        this.setProperty(Privilege.PROPERTY_NAME_FUNCTIONID, value);
    }

    /** 映射的属性名称-是否可用 */
    private static PROPERTY_NAME_ACTIVATED: string = "_activated";

    /** 获取-是否可用 */
    get activated(): emYesNo {
        return this.getProperty<emYesNo>(Privilege.PROPERTY_NAME_ACTIVATED);
    }

    /** 设置-是否可用 */
    set activated(value: emYesNo) {
        this.setProperty(Privilege.PROPERTY_NAME_ACTIVATED, value);
    }

    /** 映射的属性名称-权限类型 */
    private static PROPERTY_NAME_AUTHORISEVALUE: string = "_authoriseValue";

    /** 获取-权限类型 */
    get authoriseValue(): emAuthoriseType {
        return this.getProperty<emAuthoriseType>(Privilege.PROPERTY_NAME_AUTHORISEVALUE);
    }

    /** 设置-权限类型 */
    set authoriseValue(value: emAuthoriseType) {
        this.setProperty(Privilege.PROPERTY_NAME_AUTHORISEVALUE, value);
    }

    /** 映射的属性名称-对象编号 */
    private static PROPERTY_NAME_OBJECTKEY: string = "_objectKey";

    /** 获取-对象编号 */
    get objectKey(): number {
        return this.getProperty<number>(Privilege.PROPERTY_NAME_OBJECTKEY);
    }

    /** 设置-对象编号 */
    set objectKey(value: number) {
        this.setProperty(Privilege.PROPERTY_NAME_OBJECTKEY, value);
    }

    /** 映射的属性名称-对象类型 */
    private static PROPERTY_NAME_OBJECTCODE: string = "_objectCode";

    /** 获取-对象类型 */
    get objectCode(): string {
        return this.getProperty<string>(Privilege.PROPERTY_NAME_OBJECTCODE);
    }

    /** 设置-对象类型 */
    set objectCode(value: string) {
        this.setProperty(Privilege.PROPERTY_NAME_OBJECTCODE, value);
    }

    /** 映射的属性名称-创建日期 */
    private static PROPERTY_NAME_CREATEDATE: string = "_createDate";

    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(Privilege.PROPERTY_NAME_CREATEDATE);
    }

    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(Privilege.PROPERTY_NAME_CREATEDATE, value);
    }

    /** 映射的属性名称-创建时间 */
    private static PROPERTY_NAME_CREATETIME: string = "_createTime";

    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(Privilege.PROPERTY_NAME_CREATETIME);
    }

    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(Privilege.PROPERTY_NAME_CREATETIME, value);
    }

    /** 映射的属性名称-修改日期 */
    private static PROPERTY_NAME_UPDATEDATE: string = "_updateDate";

    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(Privilege.PROPERTY_NAME_UPDATEDATE);
    }

    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(Privilege.PROPERTY_NAME_UPDATEDATE, value);
    }

    /** 映射的属性名称-修改时间 */
    private static PROPERTY_NAME_UPDATETIME: string = "_updateTime";

    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(Privilege.PROPERTY_NAME_UPDATETIME);
    }

    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(Privilege.PROPERTY_NAME_UPDATETIME, value);
    }

    /** 映射的属性名称-实例号（版本） */
    private static PROPERTY_NAME_LOGINST: string = "_logInst";

    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(Privilege.PROPERTY_NAME_LOGINST);
    }

    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(Privilege.PROPERTY_NAME_LOGINST, value);
    }

    /** 映射的属性名称-服务系列 */
    private static PROPERTY_NAME_SERIES: string = "_series";

    /** 获取-服务系列 */
    get series(): number {
        return this.getProperty<number>(Privilege.PROPERTY_NAME_SERIES);
    }

    /** 设置-服务系列 */
    set series(value: number) {
        this.setProperty(Privilege.PROPERTY_NAME_SERIES, value);
    }

    /** 映射的属性名称-数据源 */
    private static PROPERTY_NAME_DATASOURCE: string = "_dataSource";

    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(Privilege.PROPERTY_NAME_DATASOURCE);
    }

    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(Privilege.PROPERTY_NAME_DATASOURCE, value);
    }

    /** 映射的属性名称-创建用户 */
    private static PROPERTY_NAME_CREATEUSERSIGN: string = "_createUserSign";

    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(Privilege.PROPERTY_NAME_CREATEUSERSIGN);
    }

    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(Privilege.PROPERTY_NAME_CREATEUSERSIGN, value);
    }

    /** 映射的属性名称-修改用户 */
    private static PROPERTY_NAME_UPDATEUSERSIGN: string = "_updateUserSign";

    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(Privilege.PROPERTY_NAME_UPDATEUSERSIGN);
    }

    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(Privilege.PROPERTY_NAME_UPDATEUSERSIGN, value);
    }

    /** 映射的属性名称-创建动作标识 */
    private static PROPERTY_NAME_CREATEACTIONID: string = "_createActionId";

    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(Privilege.PROPERTY_NAME_CREATEACTIONID);
    }

    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(Privilege.PROPERTY_NAME_CREATEACTIONID, value);
    }

    /** 映射的属性名称-更新动作标识 */
    private static PROPERTY_NAME_UPDATEACTIONID: string = "_updateActionId";

    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(Privilege.PROPERTY_NAME_UPDATEACTIONID);
    }

    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(Privilege.PROPERTY_NAME_UPDATEACTIONID, value);
    }



    /** 初始化数据 */
    protected init(): void {
        this.objectCode = Privilege.BUSINESS_OBJECT_CODE;
    }
}



