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
    IUser,
} from '../../api/user/user.data.d';

/** 用户 */
export class User extends BusinessObject<User> implements IUser {

    constructor() {
        super();
    }

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = "${Company}_SYS_USER";

    /** 映射的属性名称-编码 */
    private static PROPERTY_NAME_CODE: string = "_code";

    /** 获取-编码 */
    get code(): string {
        return this.getProperty<string>(User.PROPERTY_NAME_CODE);
    }

    /** 设置-编码 */
    set code(value: string) {
        this.setProperty(User.PROPERTY_NAME_CODE, value);
    }

    /** 映射的属性名称-名称 */
    private static PROPERTY_NAME_NAME: string = "_name";

    /** 获取-名称 */
    get name(): string {
        return this.getProperty<string>(User.PROPERTY_NAME_NAME);
    }

    /** 设置-名称 */
    set name(value: string) {
        this.setProperty(User.PROPERTY_NAME_NAME, value);
    }

    /** 映射的属性名称-用户密码 */
    private static PROPERTY_NAME_PASSWORD: string = "_password";

    /** 获取-用户密码 */
    get password(): string {
        return this.getProperty<string>(User.PROPERTY_NAME_PASSWORD);
    }

    /** 设置-用户密码 */
    set password(value: string) {
        this.setProperty(User.PROPERTY_NAME_PASSWORD, value);
    }

    /** 映射的属性名称-激活 */
    private static PROPERTY_NAME_ACTIVATED: string = "_activated";

    /** 获取-激活 */
    get activated(): emYesNo {
        return this.getProperty<emYesNo>(User.PROPERTY_NAME_ACTIVATED);
    }

    /** 设置-激活 */
    set activated(value: emYesNo) {
        this.setProperty(User.PROPERTY_NAME_ACTIVATED, value);
    }

    /** 映射的属性名称-超级用户 */
    private static PROPERTY_NAME_SUPPER: string = "_supper";

    /** 获取-超级用户 */
    get supper(): emYesNo {
        return this.getProperty<emYesNo>(User.PROPERTY_NAME_SUPPER);
    }

    /** 设置-超级用户 */
    set supper(value: emYesNo) {
        this.setProperty(User.PROPERTY_NAME_SUPPER, value);
    }

    /** 映射的属性名称-电子邮件地址 */
    private static PROPERTY_NAME_MAIL: string = "_mail";

    /** 获取-电子邮件地址 */
    get mail(): string {
        return this.getProperty<string>(User.PROPERTY_NAME_MAIL);
    }

    /** 设置-电子邮件地址 */
    set mail(value: string) {
        this.setProperty(User.PROPERTY_NAME_MAIL, value);
    }

    /** 映射的属性名称-对象编号 */
    private static PROPERTY_NAME_DOCENTRY: string = "_docEntry";

    /** 获取-对象编号 */
    get docEntry(): number {
        return this.getProperty<number>(User.PROPERTY_NAME_DOCENTRY);
    }

    /** 设置-对象编号 */
    set docEntry(value: number) {
        this.setProperty(User.PROPERTY_NAME_DOCENTRY, value);
    }

    /** 映射的属性名称-对象类型 */
    private static PROPERTY_NAME_OBJECTCODE: string = "_objectCode";

    /** 获取-对象类型 */
    get objectCode(): string {
        return this.getProperty<string>(User.PROPERTY_NAME_OBJECTCODE);
    }

    /** 设置-对象类型 */
    set objectCode(value: string) {
        this.setProperty(User.PROPERTY_NAME_OBJECTCODE, value);
    }

    /** 映射的属性名称-创建日期 */
    private static PROPERTY_NAME_CREATEDATE: string = "_createDate";

    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(User.PROPERTY_NAME_CREATEDATE);
    }

    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(User.PROPERTY_NAME_CREATEDATE, value);
    }

    /** 映射的属性名称-创建时间 */
    private static PROPERTY_NAME_CREATETIME: string = "_createTime";

    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(User.PROPERTY_NAME_CREATETIME);
    }

    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(User.PROPERTY_NAME_CREATETIME, value);
    }

    /** 映射的属性名称-修改日期 */
    private static PROPERTY_NAME_UPDATEDATE: string = "_updateDate";

    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(User.PROPERTY_NAME_UPDATEDATE);
    }

    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(User.PROPERTY_NAME_UPDATEDATE, value);
    }

    /** 映射的属性名称-修改时间 */
    private static PROPERTY_NAME_UPDATETIME: string = "_updateTime";

    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(User.PROPERTY_NAME_UPDATETIME);
    }

    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(User.PROPERTY_NAME_UPDATETIME, value);
    }

    /** 映射的属性名称-数据源 */
    private static PROPERTY_NAME_DATASOURCE: string = "_dataSource";

    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(User.PROPERTY_NAME_DATASOURCE);
    }

    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(User.PROPERTY_NAME_DATASOURCE, value);
    }

    /** 映射的属性名称-实例号（版本） */
    private static PROPERTY_NAME_LOGINST: string = "_logInst";

    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(User.PROPERTY_NAME_LOGINST);
    }

    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(User.PROPERTY_NAME_LOGINST, value);
    }

    /** 映射的属性名称-服务系列 */
    private static PROPERTY_NAME_SERIES: string = "_series";

    /** 获取-服务系列 */
    get series(): number {
        return this.getProperty<number>(User.PROPERTY_NAME_SERIES);
    }

    /** 设置-服务系列 */
    set series(value: number) {
        this.setProperty(User.PROPERTY_NAME_SERIES, value);
    }

    /** 映射的属性名称-创建用户 */
    private static PROPERTY_NAME_CREATEUSERSIGN: string = "_createUserSign";

    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(User.PROPERTY_NAME_CREATEUSERSIGN);
    }

    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(User.PROPERTY_NAME_CREATEUSERSIGN, value);
    }

    /** 映射的属性名称-修改用户 */
    private static PROPERTY_NAME_UPDATEUSERSIGN: string = "_updateUserSign";

    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(User.PROPERTY_NAME_UPDATEUSERSIGN);
    }

    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(User.PROPERTY_NAME_UPDATEUSERSIGN, value);
    }

    /** 映射的属性名称-创建动作标识 */
    private static PROPERTY_NAME_CREATEACTIONID: string = "_createActionId";

    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(User.PROPERTY_NAME_CREATEACTIONID);
    }

    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(User.PROPERTY_NAME_CREATEACTIONID, value);
    }

    /** 映射的属性名称-更新动作标识 */
    private static PROPERTY_NAME_UPDATEACTIONID: string = "_updateActionId";

    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(User.PROPERTY_NAME_UPDATEACTIONID);
    }

    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(User.PROPERTY_NAME_UPDATEACTIONID, value);
    }

    /** 映射的属性名称-审批状态 */
    private static PROPERTY_NAME_APPROVALSTATUS: string = "_approvalStatus";

    /** 获取-审批状态 */
    get approvalStatus(): emApprovalStatus {
        return this.getProperty<emApprovalStatus>(User.PROPERTY_NAME_APPROVALSTATUS);
    }

    /** 设置-审批状态 */
    set approvalStatus(value: emApprovalStatus) {
        this.setProperty(User.PROPERTY_NAME_APPROVALSTATUS, value);
    }

    /** 映射的属性名称-数据所有者 */
    private static PROPERTY_NAME_DATAOWNER: string = "_dataOwner";

    /** 获取-数据所有者 */
    get dataOwner(): number {
        return this.getProperty<number>(User.PROPERTY_NAME_DATAOWNER);
    }

    /** 设置-数据所有者 */
    set dataOwner(value: number) {
        this.setProperty(User.PROPERTY_NAME_DATAOWNER, value);
    }

    /** 映射的属性名称-数据所属组织 */
    private static PROPERTY_NAME_ORGANIZATION: string = "_organization";

    /** 获取-数据所属组织 */
    get organization(): string {
        return this.getProperty<string>(User.PROPERTY_NAME_ORGANIZATION);
    }

    /** 设置-数据所属组织 */
    set organization(value: string) {
        this.setProperty(User.PROPERTY_NAME_ORGANIZATION, value);
    }



    /** 初始化数据 */
    protected init(): void {
        this.objectCode = User.BUSINESS_OBJECT_CODE;
    }
}



