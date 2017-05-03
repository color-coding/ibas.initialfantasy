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
    BusinessObjects,
    BOMasterData,
    BOMasterDataLine,
    BODocument,
    BODocumentLine,
    BOSimple,
    BOSimpleLine,
    config,
} from "ibas/index";
import {
    IUser,
} from "../../api/index";

/** 用户 */
export class User extends BOMasterData<User> implements IUser {

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = "${Company}_SYS_USER";
    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-编码 */
    static PROPERTY_CODE_NAME: string = "Code";
    /** 获取-编码 */
    get code(): string {
        return this.getProperty<string>(User.PROPERTY_CODE_NAME);
    }
    /** 设置-编码 */
    set code(value: string) {
        this.setProperty(User.PROPERTY_CODE_NAME, value);
    }

    /** 映射的属性名称-名称 */
    static PROPERTY_NAME_NAME: string = "Name";
    /** 获取-名称 */
    get name(): string {
        return this.getProperty<string>(User.PROPERTY_NAME_NAME);
    }
    /** 设置-名称 */
    set name(value: string) {
        this.setProperty(User.PROPERTY_NAME_NAME, value);
    }

    /** 映射的属性名称-用户密码 */
    static PROPERTY_PASSWORD_NAME: string = "Password";
    /** 获取-用户密码 */
    get password(): string {
        return this.getProperty<string>(User.PROPERTY_PASSWORD_NAME);
    }
    /** 设置-用户密码 */
    set password(value: string) {
        this.setProperty(User.PROPERTY_PASSWORD_NAME, value);
    }

    /** 映射的属性名称-激活 */
    static PROPERTY_ACTIVATED_NAME: string = "Activated";
    /** 获取-激活 */
    get activated(): emYesNo {
        return this.getProperty<emYesNo>(User.PROPERTY_ACTIVATED_NAME);
    }
    /** 设置-激活 */
    set activated(value: emYesNo) {
        this.setProperty(User.PROPERTY_ACTIVATED_NAME, value);
    }

    /** 映射的属性名称-超级用户 */
    static PROPERTY_SUPER_NAME: string = "Super";
    /** 获取-超级用户 */
    get super(): emYesNo {
        return this.getProperty<emYesNo>(User.PROPERTY_SUPER_NAME);
    }
    /** 设置-超级用户 */
    set super(value: emYesNo) {
        this.setProperty(User.PROPERTY_SUPER_NAME, value);
    }

    /** 映射的属性名称-电子邮件地址 */
    static PROPERTY_MAIL_NAME: string = "Mail";
    /** 获取-电子邮件地址 */
    get mail(): string {
        return this.getProperty<string>(User.PROPERTY_MAIL_NAME);
    }
    /** 设置-电子邮件地址 */
    set mail(value: string) {
        this.setProperty(User.PROPERTY_MAIL_NAME, value);
    }

    /** 映射的属性名称-对象编号 */
    static PROPERTY_DOCENTRY_NAME: string = "DocEntry";
    /** 获取-对象编号 */
    get docEntry(): number {
        return this.getProperty<number>(User.PROPERTY_DOCENTRY_NAME);
    }
    /** 设置-对象编号 */
    set docEntry(value: number) {
        this.setProperty(User.PROPERTY_DOCENTRY_NAME, value);
    }

    /** 映射的属性名称-对象类型 */
    static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
    /** 获取-对象类型 */
    get objectCode(): string {
        return this.getProperty<string>(User.PROPERTY_OBJECTCODE_NAME);
    }
    /** 设置-对象类型 */
    set objectCode(value: string) {
        this.setProperty(User.PROPERTY_OBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-创建日期 */
    static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(User.PROPERTY_CREATEDATE_NAME);
    }
    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(User.PROPERTY_CREATEDATE_NAME, value);
    }

    /** 映射的属性名称-创建时间 */
    static PROPERTY_CREATETIME_NAME: string = "CreateTime";
    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(User.PROPERTY_CREATETIME_NAME);
    }
    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(User.PROPERTY_CREATETIME_NAME, value);
    }

    /** 映射的属性名称-修改日期 */
    static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(User.PROPERTY_UPDATEDATE_NAME);
    }
    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(User.PROPERTY_UPDATEDATE_NAME, value);
    }

    /** 映射的属性名称-修改时间 */
    static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(User.PROPERTY_UPDATETIME_NAME);
    }
    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(User.PROPERTY_UPDATETIME_NAME, value);
    }

    /** 映射的属性名称-数据源 */
    static PROPERTY_DATASOURCE_NAME: string = "DataSource";
    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(User.PROPERTY_DATASOURCE_NAME);
    }
    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(User.PROPERTY_DATASOURCE_NAME, value);
    }

    /** 映射的属性名称-实例号（版本） */
    static PROPERTY_LOGINST_NAME: string = "LogInst";
    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(User.PROPERTY_LOGINST_NAME);
    }
    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(User.PROPERTY_LOGINST_NAME, value);
    }

    /** 映射的属性名称-服务系列 */
    static PROPERTY_SERIES_NAME: string = "Series";
    /** 获取-服务系列 */
    get series(): number {
        return this.getProperty<number>(User.PROPERTY_SERIES_NAME);
    }
    /** 设置-服务系列 */
    set series(value: number) {
        this.setProperty(User.PROPERTY_SERIES_NAME, value);
    }

    /** 映射的属性名称-创建用户 */
    static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(User.PROPERTY_CREATEUSERSIGN_NAME);
    }
    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(User.PROPERTY_CREATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-修改用户 */
    static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(User.PROPERTY_UPDATEUSERSIGN_NAME);
    }
    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(User.PROPERTY_UPDATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(User.PROPERTY_CREATEACTIONID_NAME);
    }
    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(User.PROPERTY_CREATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-更新动作标识 */
    static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(User.PROPERTY_UPDATEACTIONID_NAME);
    }
    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(User.PROPERTY_UPDATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-审批状态 */
    static PROPERTY_APPROVALSTATUS_NAME: string = "ApprovalStatus";
    /** 获取-审批状态 */
    get approvalStatus(): emApprovalStatus {
        return this.getProperty<emApprovalStatus>(User.PROPERTY_APPROVALSTATUS_NAME);
    }
    /** 设置-审批状态 */
    set approvalStatus(value: emApprovalStatus) {
        this.setProperty(User.PROPERTY_APPROVALSTATUS_NAME, value);
    }

    /** 映射的属性名称-数据所有者 */
    static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
    /** 获取-数据所有者 */
    get dataOwner(): number {
        return this.getProperty<number>(User.PROPERTY_DATAOWNER_NAME);
    }
    /** 设置-数据所有者 */
    set dataOwner(value: number) {
        this.setProperty(User.PROPERTY_DATAOWNER_NAME, value);
    }

    /** 映射的属性名称-数据所属组织 */
    static PROPERTY_ORGANIZATION_NAME: string = "Organization";
    /** 获取-数据所属组织 */
    get organization(): string {
        return this.getProperty<string>(User.PROPERTY_ORGANIZATION_NAME);
    }
    /** 设置-数据所属组织 */
    set organization(value: string) {
        this.setProperty(User.PROPERTY_ORGANIZATION_NAME, value);
    }



    /** 初始化数据 */
    protected init(): void {
        this.objectCode = config.applyVariables(User.BUSINESS_OBJECT_CODE);
        this.super = emYesNo.NO;
    }
}

