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
} from "ibas/index";
import {
    IOrganizationalStructure,
    IOrganizationalRole,
    IOrganizationalRoles,
} from "../../api/index";

/** 组织-结构 */
export class OrganizationalStructure extends BOSimple<OrganizationalStructure> implements IOrganizationalStructure {

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = "CC_SYS_ORG_STRUCTURE";
    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-组织 */
    static PROPERTY_ORGANIZATION_NAME: string = "Organization";
    /** 获取-组织 */
    get organization(): string {
        return this.getProperty<string>(OrganizationalStructure.PROPERTY_ORGANIZATION_NAME);
    }
    /** 设置-组织 */
    set organization(value: string) {
        this.setProperty(OrganizationalStructure.PROPERTY_ORGANIZATION_NAME, value);
    }

    /** 映射的属性名称-归属结构 */
    static PROPERTY_BELONGING_NAME: string = "Belonging";
    /** 获取-归属结构 */
    get belonging(): number {
        return this.getProperty<number>(OrganizationalStructure.PROPERTY_BELONGING_NAME);
    }
    /** 设置-归属结构 */
    set belonging(value: number) {
        this.setProperty(OrganizationalStructure.PROPERTY_BELONGING_NAME, value);
    }

    /** 映射的属性名称-经理 */
    static PROPERTY_MANAGER_NAME: string = "Manager";
    /** 获取-经理 */
    get manager(): string {
        return this.getProperty<string>(OrganizationalStructure.PROPERTY_MANAGER_NAME);
    }
    /** 设置-经理 */
    set manager(value: string) {
        this.setProperty(OrganizationalStructure.PROPERTY_MANAGER_NAME, value);
    }

    /** 映射的属性名称-生效日期 */
    static PROPERTY_VALIDDATE_NAME: string = "ValidDate";
    /** 获取-生效日期 */
    get validDate(): Date {
        return this.getProperty<Date>(OrganizationalStructure.PROPERTY_VALIDDATE_NAME);
    }
    /** 设置-生效日期 */
    set validDate(value: Date) {
        this.setProperty(OrganizationalStructure.PROPERTY_VALIDDATE_NAME, value);
    }

    /** 映射的属性名称-失效日期 */
    static PROPERTY_INVALIDDATE_NAME: string = "InvalidDate";
    /** 获取-失效日期 */
    get invalidDate(): Date {
        return this.getProperty<Date>(OrganizationalStructure.PROPERTY_INVALIDDATE_NAME);
    }
    /** 设置-失效日期 */
    set invalidDate(value: Date) {
        this.setProperty(OrganizationalStructure.PROPERTY_INVALIDDATE_NAME, value);
    }

    /** 映射的属性名称-对象编号 */
    static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
    /** 获取-对象编号 */
    get objectKey(): number {
        return this.getProperty<number>(OrganizationalStructure.PROPERTY_OBJECTKEY_NAME);
    }
    /** 设置-对象编号 */
    set objectKey(value: number) {
        this.setProperty(OrganizationalStructure.PROPERTY_OBJECTKEY_NAME, value);
    }

    /** 映射的属性名称-对象类型 */
    static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
    /** 获取-对象类型 */
    get objectCode(): string {
        return this.getProperty<string>(OrganizationalStructure.PROPERTY_OBJECTCODE_NAME);
    }
    /** 设置-对象类型 */
    set objectCode(value: string) {
        this.setProperty(OrganizationalStructure.PROPERTY_OBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-创建日期 */
    static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(OrganizationalStructure.PROPERTY_CREATEDATE_NAME);
    }
    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(OrganizationalStructure.PROPERTY_CREATEDATE_NAME, value);
    }

    /** 映射的属性名称-创建时间 */
    static PROPERTY_CREATETIME_NAME: string = "CreateTime";
    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(OrganizationalStructure.PROPERTY_CREATETIME_NAME);
    }
    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(OrganizationalStructure.PROPERTY_CREATETIME_NAME, value);
    }

    /** 映射的属性名称-修改日期 */
    static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(OrganizationalStructure.PROPERTY_UPDATEDATE_NAME);
    }
    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(OrganizationalStructure.PROPERTY_UPDATEDATE_NAME, value);
    }

    /** 映射的属性名称-修改时间 */
    static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(OrganizationalStructure.PROPERTY_UPDATETIME_NAME);
    }
    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(OrganizationalStructure.PROPERTY_UPDATETIME_NAME, value);
    }

    /** 映射的属性名称-数据源 */
    static PROPERTY_DATASOURCE_NAME: string = "DataSource";
    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(OrganizationalStructure.PROPERTY_DATASOURCE_NAME);
    }
    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(OrganizationalStructure.PROPERTY_DATASOURCE_NAME, value);
    }

    /** 映射的属性名称-实例号（版本） */
    static PROPERTY_LOGINST_NAME: string = "LogInst";
    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(OrganizationalStructure.PROPERTY_LOGINST_NAME);
    }
    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(OrganizationalStructure.PROPERTY_LOGINST_NAME, value);
    }

    /** 映射的属性名称-服务系列 */
    static PROPERTY_SERIES_NAME: string = "Series";
    /** 获取-服务系列 */
    get series(): number {
        return this.getProperty<number>(OrganizationalStructure.PROPERTY_SERIES_NAME);
    }
    /** 设置-服务系列 */
    set series(value: number) {
        this.setProperty(OrganizationalStructure.PROPERTY_SERIES_NAME, value);
    }

    /** 映射的属性名称-创建用户 */
    static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(OrganizationalStructure.PROPERTY_CREATEUSERSIGN_NAME);
    }
    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(OrganizationalStructure.PROPERTY_CREATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-修改用户 */
    static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(OrganizationalStructure.PROPERTY_UPDATEUSERSIGN_NAME);
    }
    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(OrganizationalStructure.PROPERTY_UPDATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(OrganizationalStructure.PROPERTY_CREATEACTIONID_NAME);
    }
    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(OrganizationalStructure.PROPERTY_CREATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-更新动作标识 */
    static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(OrganizationalStructure.PROPERTY_UPDATEACTIONID_NAME);
    }
    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(OrganizationalStructure.PROPERTY_UPDATEACTIONID_NAME, value);
    }


    /** 映射的属性名称-组织-角色集合 */
    static PROPERTY_ORGANIZATIONALROLES_NAME: string = "OrganizationalRoles";
    /** 获取-组织-角色集合 */
    get organizationalRoles(): OrganizationalRoles {
        return this.getProperty<OrganizationalRoles>(OrganizationalStructure.PROPERTY_ORGANIZATIONALROLES_NAME);
    }
    /** 设置-组织-角色集合 */
    set organizationalRoles(value: OrganizationalRoles) {
        this.setProperty(OrganizationalStructure.PROPERTY_ORGANIZATIONALROLES_NAME, value);
    }


    /** 初始化数据 */
    protected init(): void {
        this.organizationalRoles = new OrganizationalRoles(this);
        this.objectCode = OrganizationalStructure.BUSINESS_OBJECT_CODE;
    }
}

/** 组织-角色 */
export class OrganizationalRole extends BOSimpleLine<OrganizationalRole> implements IOrganizationalRole {

    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-编号 */
    static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
    /** 获取-编号 */
    get objectKey(): number {
        return this.getProperty<number>(OrganizationalRole.PROPERTY_OBJECTKEY_NAME);
    }
    /** 设置-编号 */
    set objectKey(value: number) {
        this.setProperty(OrganizationalRole.PROPERTY_OBJECTKEY_NAME, value);
    }

    /** 映射的属性名称-类型 */
    static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
    /** 获取-类型 */
    get objectCode(): string {
        return this.getProperty<string>(OrganizationalRole.PROPERTY_OBJECTCODE_NAME);
    }
    /** 设置-类型 */
    set objectCode(value: string) {
        this.setProperty(OrganizationalRole.PROPERTY_OBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-行号 */
    static PROPERTY_LINEID_NAME: string = "LineId";
    /** 获取-行号 */
    get lineId(): number {
        return this.getProperty<number>(OrganizationalRole.PROPERTY_LINEID_NAME);
    }
    /** 设置-行号 */
    set lineId(value: number) {
        this.setProperty(OrganizationalRole.PROPERTY_LINEID_NAME, value);
    }

    /** 映射的属性名称-实例号（版本） */
    static PROPERTY_LOGINST_NAME: string = "LogInst";
    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(OrganizationalRole.PROPERTY_LOGINST_NAME);
    }
    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(OrganizationalRole.PROPERTY_LOGINST_NAME, value);
    }

    /** 映射的属性名称-数据源 */
    static PROPERTY_DATASOURCE_NAME: string = "DataSource";
    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(OrganizationalRole.PROPERTY_DATASOURCE_NAME);
    }
    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(OrganizationalRole.PROPERTY_DATASOURCE_NAME, value);
    }

    /** 映射的属性名称-创建日期 */
    static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(OrganizationalRole.PROPERTY_CREATEDATE_NAME);
    }
    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(OrganizationalRole.PROPERTY_CREATEDATE_NAME, value);
    }

    /** 映射的属性名称-创建时间 */
    static PROPERTY_CREATETIME_NAME: string = "CreateTime";
    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(OrganizationalRole.PROPERTY_CREATETIME_NAME);
    }
    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(OrganizationalRole.PROPERTY_CREATETIME_NAME, value);
    }

    /** 映射的属性名称-修改日期 */
    static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(OrganizationalRole.PROPERTY_UPDATEDATE_NAME);
    }
    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(OrganizationalRole.PROPERTY_UPDATEDATE_NAME, value);
    }

    /** 映射的属性名称-修改时间 */
    static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(OrganizationalRole.PROPERTY_UPDATETIME_NAME);
    }
    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(OrganizationalRole.PROPERTY_UPDATETIME_NAME, value);
    }

    /** 映射的属性名称-创建用户 */
    static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(OrganizationalRole.PROPERTY_CREATEUSERSIGN_NAME);
    }
    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(OrganizationalRole.PROPERTY_CREATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-修改用户 */
    static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(OrganizationalRole.PROPERTY_UPDATEUSERSIGN_NAME);
    }
    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(OrganizationalRole.PROPERTY_UPDATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(OrganizationalRole.PROPERTY_CREATEACTIONID_NAME);
    }
    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(OrganizationalRole.PROPERTY_CREATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-更新动作标识 */
    static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(OrganizationalRole.PROPERTY_UPDATEACTIONID_NAME);
    }
    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(OrganizationalRole.PROPERTY_UPDATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-参考1 */
    static PROPERTY_REFERENCE1_NAME: string = "Reference1";
    /** 获取-参考1 */
    get reference1(): string {
        return this.getProperty<string>(OrganizationalRole.PROPERTY_REFERENCE1_NAME);
    }
    /** 设置-参考1 */
    set reference1(value: string) {
        this.setProperty(OrganizationalRole.PROPERTY_REFERENCE1_NAME, value);
    }

    /** 映射的属性名称-参考2 */
    static PROPERTY_REFERENCE2_NAME: string = "Reference2";
    /** 获取-参考2 */
    get reference2(): string {
        return this.getProperty<string>(OrganizationalRole.PROPERTY_REFERENCE2_NAME);
    }
    /** 设置-参考2 */
    set reference2(value: string) {
        this.setProperty(OrganizationalRole.PROPERTY_REFERENCE2_NAME, value);
    }

    /** 映射的属性名称-角色 */
    static PROPERTY_ROLE_NAME: string = "Role";
    /** 获取-角色 */
    get role(): string {
        return this.getProperty<string>(OrganizationalRole.PROPERTY_ROLE_NAME);
    }
    /** 设置-角色 */
    set role(value: string) {
        this.setProperty(OrganizationalRole.PROPERTY_ROLE_NAME, value);
    }


    /** 初始化数据 */
    protected init(): void {
    }
}

/** 组织-角色 集合 */
export class OrganizationalRoles extends BusinessObjects<OrganizationalRole, OrganizationalStructure> implements IOrganizationalRoles {

    /** 创建并添加子项 */
    create(): OrganizationalRole {
        let item: OrganizationalRole = new OrganizationalRole();
        this.add(item);
        return item;
    }
}
