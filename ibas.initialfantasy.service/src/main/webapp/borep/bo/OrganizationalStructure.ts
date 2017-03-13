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
    IOrganizationalStructure,
    IOrganizationalRole,
    IOrganizationalRoles,
    IRoleMember,
    IRoleMembers,
} from '../../api/organizationalstructure/organizationalstructure.data.d';

/** 组织-结构 */
export class OrganizationalStructure extends BusinessObject<OrganizationalStructure> implements IOrganizationalStructure {

    constructor() {
        super();
    }

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = "${Company}_SYS_ORG_STRUCTURE";

    /** 映射的属性名称-组织 */
    private static PROPERTY_NAME_ORGANIZATION: string = "_organization";

    /** 获取-组织 */
    get organization(): string {
        return this.getProperty<string>(OrganizationalStructure.PROPERTY_NAME_ORGANIZATION);
    }

    /** 设置-组织 */
    set organization(value: string) {
        this.setProperty(OrganizationalStructure.PROPERTY_NAME_ORGANIZATION, value);
    }

    /** 映射的属性名称-归属结构 */
    private static PROPERTY_NAME_BELONGING: string = "_belonging";

    /** 获取-归属结构 */
    get belonging(): number {
        return this.getProperty<number>(OrganizationalStructure.PROPERTY_NAME_BELONGING);
    }

    /** 设置-归属结构 */
    set belonging(value: number) {
        this.setProperty(OrganizationalStructure.PROPERTY_NAME_BELONGING, value);
    }

    /** 映射的属性名称-经理 */
    private static PROPERTY_NAME_MANAGER: string = "_manager";

    /** 获取-经理 */
    get manager(): string {
        return this.getProperty<string>(OrganizationalStructure.PROPERTY_NAME_MANAGER);
    }

    /** 设置-经理 */
    set manager(value: string) {
        this.setProperty(OrganizationalStructure.PROPERTY_NAME_MANAGER, value);
    }

    /** 映射的属性名称-生效日期 */
    private static PROPERTY_NAME_VALIDDATE: string = "_validDate";

    /** 获取-生效日期 */
    get validDate(): Date {
        return this.getProperty<Date>(OrganizationalStructure.PROPERTY_NAME_VALIDDATE);
    }

    /** 设置-生效日期 */
    set validDate(value: Date) {
        this.setProperty(OrganizationalStructure.PROPERTY_NAME_VALIDDATE, value);
    }

    /** 映射的属性名称-失效日期 */
    private static PROPERTY_NAME_INVALIDDATE: string = "_invalidDate";

    /** 获取-失效日期 */
    get invalidDate(): Date {
        return this.getProperty<Date>(OrganizationalStructure.PROPERTY_NAME_INVALIDDATE);
    }

    /** 设置-失效日期 */
    set invalidDate(value: Date) {
        this.setProperty(OrganizationalStructure.PROPERTY_NAME_INVALIDDATE, value);
    }

    /** 映射的属性名称-对象编号 */
    private static PROPERTY_NAME_OBJECTKEY: string = "_objectKey";

    /** 获取-对象编号 */
    get objectKey(): number {
        return this.getProperty<number>(OrganizationalStructure.PROPERTY_NAME_OBJECTKEY);
    }

    /** 设置-对象编号 */
    set objectKey(value: number) {
        this.setProperty(OrganizationalStructure.PROPERTY_NAME_OBJECTKEY, value);
    }

    /** 映射的属性名称-对象类型 */
    private static PROPERTY_NAME_OBJECTCODE: string = "_objectCode";

    /** 获取-对象类型 */
    get objectCode(): string {
        return this.getProperty<string>(OrganizationalStructure.PROPERTY_NAME_OBJECTCODE);
    }

    /** 设置-对象类型 */
    set objectCode(value: string) {
        this.setProperty(OrganizationalStructure.PROPERTY_NAME_OBJECTCODE, value);
    }

    /** 映射的属性名称-创建日期 */
    private static PROPERTY_NAME_CREATEDATE: string = "_createDate";

    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(OrganizationalStructure.PROPERTY_NAME_CREATEDATE);
    }

    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(OrganizationalStructure.PROPERTY_NAME_CREATEDATE, value);
    }

    /** 映射的属性名称-创建时间 */
    private static PROPERTY_NAME_CREATETIME: string = "_createTime";

    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(OrganizationalStructure.PROPERTY_NAME_CREATETIME);
    }

    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(OrganizationalStructure.PROPERTY_NAME_CREATETIME, value);
    }

    /** 映射的属性名称-修改日期 */
    private static PROPERTY_NAME_UPDATEDATE: string = "_updateDate";

    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(OrganizationalStructure.PROPERTY_NAME_UPDATEDATE);
    }

    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(OrganizationalStructure.PROPERTY_NAME_UPDATEDATE, value);
    }

    /** 映射的属性名称-修改时间 */
    private static PROPERTY_NAME_UPDATETIME: string = "_updateTime";

    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(OrganizationalStructure.PROPERTY_NAME_UPDATETIME);
    }

    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(OrganizationalStructure.PROPERTY_NAME_UPDATETIME, value);
    }

    /** 映射的属性名称-数据源 */
    private static PROPERTY_NAME_DATASOURCE: string = "_dataSource";

    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(OrganizationalStructure.PROPERTY_NAME_DATASOURCE);
    }

    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(OrganizationalStructure.PROPERTY_NAME_DATASOURCE, value);
    }

    /** 映射的属性名称-实例号（版本） */
    private static PROPERTY_NAME_LOGINST: string = "_logInst";

    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(OrganizationalStructure.PROPERTY_NAME_LOGINST);
    }

    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(OrganizationalStructure.PROPERTY_NAME_LOGINST, value);
    }

    /** 映射的属性名称-服务系列 */
    private static PROPERTY_NAME_SERIES: string = "_series";

    /** 获取-服务系列 */
    get series(): number {
        return this.getProperty<number>(OrganizationalStructure.PROPERTY_NAME_SERIES);
    }

    /** 设置-服务系列 */
    set series(value: number) {
        this.setProperty(OrganizationalStructure.PROPERTY_NAME_SERIES, value);
    }

    /** 映射的属性名称-创建用户 */
    private static PROPERTY_NAME_CREATEUSERSIGN: string = "_createUserSign";

    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(OrganizationalStructure.PROPERTY_NAME_CREATEUSERSIGN);
    }

    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(OrganizationalStructure.PROPERTY_NAME_CREATEUSERSIGN, value);
    }

    /** 映射的属性名称-修改用户 */
    private static PROPERTY_NAME_UPDATEUSERSIGN: string = "_updateUserSign";

    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(OrganizationalStructure.PROPERTY_NAME_UPDATEUSERSIGN);
    }

    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(OrganizationalStructure.PROPERTY_NAME_UPDATEUSERSIGN, value);
    }

    /** 映射的属性名称-创建动作标识 */
    private static PROPERTY_NAME_CREATEACTIONID: string = "_createActionId";

    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(OrganizationalStructure.PROPERTY_NAME_CREATEACTIONID);
    }

    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(OrganizationalStructure.PROPERTY_NAME_CREATEACTIONID, value);
    }

    /** 映射的属性名称-更新动作标识 */
    private static PROPERTY_NAME_UPDATEACTIONID: string = "_updateActionId";

    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(OrganizationalStructure.PROPERTY_NAME_UPDATEACTIONID);
    }

    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(OrganizationalStructure.PROPERTY_NAME_UPDATEACTIONID, value);
    }


    /** 映射的属性名称-组织-角色集合 */
    private static PROPERTY_NAME_ORGANIZATIONALROLES: string = "_organizationalRoles";

    /** 获取-组织-角色集合 */
    get organizationalRoles(): OrganizationalRoles {
        return this.getProperty<OrganizationalRoles>(OrganizationalStructure.PROPERTY_NAME_ORGANIZATIONALROLES);
    }

    /** 设置-组织-角色集合 */
    set organizationalRoles(value: OrganizationalRoles) {
        this.setProperty(OrganizationalStructure.PROPERTY_NAME_ORGANIZATIONALROLES, value);
    }

    /** 映射的属性名称-组织-角色-成员集合 */
    private static PROPERTY_NAME_ROLEMEMBERS: string = "_roleMembers";

    /** 获取-组织-角色-成员集合 */
    get roleMembers(): RoleMembers {
        return this.getProperty<RoleMembers>(OrganizationalStructure.PROPERTY_NAME_ROLEMEMBERS);
    }

    /** 设置-组织-角色-成员集合 */
    set roleMembers(value: RoleMembers) {
        this.setProperty(OrganizationalStructure.PROPERTY_NAME_ROLEMEMBERS, value);
    }


    /** 初始化数据 */
    protected init(): void {
        this.organizationalRoles = new OrganizationalRoles(this);
        this.roleMembers = new RoleMembers(this);
        this.objectCode = OrganizationalStructure.BUSINESS_OBJECT_CODE;
    }
}

/** 组织-角色 */
export class OrganizationalRole extends BusinessObject<OrganizationalRole> implements IOrganizationalRole {

    constructor() {
        super();
    }

    /** 映射的属性名称-编号 */
    private static PROPERTY_NAME_OBJECTKEY: string = "_objectKey";

    /** 获取-编号 */
    get objectKey(): number {
        return this.getProperty<number>(OrganizationalRole.PROPERTY_NAME_OBJECTKEY);
    }

    /** 设置-编号 */
    set objectKey(value: number) {
        this.setProperty(OrganizationalRole.PROPERTY_NAME_OBJECTKEY, value);
    }

    /** 映射的属性名称-类型 */
    private static PROPERTY_NAME_OBJECTCODE: string = "_objectCode";

    /** 获取-类型 */
    get objectCode(): string {
        return this.getProperty<string>(OrganizationalRole.PROPERTY_NAME_OBJECTCODE);
    }

    /** 设置-类型 */
    set objectCode(value: string) {
        this.setProperty(OrganizationalRole.PROPERTY_NAME_OBJECTCODE, value);
    }

    /** 映射的属性名称-行号 */
    private static PROPERTY_NAME_LINEID: string = "_lineId";

    /** 获取-行号 */
    get lineId(): number {
        return this.getProperty<number>(OrganizationalRole.PROPERTY_NAME_LINEID);
    }

    /** 设置-行号 */
    set lineId(value: number) {
        this.setProperty(OrganizationalRole.PROPERTY_NAME_LINEID, value);
    }

    /** 映射的属性名称-实例号（版本） */
    private static PROPERTY_NAME_LOGINST: string = "_logInst";

    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(OrganizationalRole.PROPERTY_NAME_LOGINST);
    }

    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(OrganizationalRole.PROPERTY_NAME_LOGINST, value);
    }

    /** 映射的属性名称-数据源 */
    private static PROPERTY_NAME_DATASOURCE: string = "_dataSource";

    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(OrganizationalRole.PROPERTY_NAME_DATASOURCE);
    }

    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(OrganizationalRole.PROPERTY_NAME_DATASOURCE, value);
    }

    /** 映射的属性名称-创建日期 */
    private static PROPERTY_NAME_CREATEDATE: string = "_createDate";

    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(OrganizationalRole.PROPERTY_NAME_CREATEDATE);
    }

    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(OrganizationalRole.PROPERTY_NAME_CREATEDATE, value);
    }

    /** 映射的属性名称-创建时间 */
    private static PROPERTY_NAME_CREATETIME: string = "_createTime";

    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(OrganizationalRole.PROPERTY_NAME_CREATETIME);
    }

    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(OrganizationalRole.PROPERTY_NAME_CREATETIME, value);
    }

    /** 映射的属性名称-修改日期 */
    private static PROPERTY_NAME_UPDATEDATE: string = "_updateDate";

    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(OrganizationalRole.PROPERTY_NAME_UPDATEDATE);
    }

    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(OrganizationalRole.PROPERTY_NAME_UPDATEDATE, value);
    }

    /** 映射的属性名称-修改时间 */
    private static PROPERTY_NAME_UPDATETIME: string = "_updateTime";

    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(OrganizationalRole.PROPERTY_NAME_UPDATETIME);
    }

    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(OrganizationalRole.PROPERTY_NAME_UPDATETIME, value);
    }

    /** 映射的属性名称-创建用户 */
    private static PROPERTY_NAME_CREATEUSERSIGN: string = "_createUserSign";

    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(OrganizationalRole.PROPERTY_NAME_CREATEUSERSIGN);
    }

    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(OrganizationalRole.PROPERTY_NAME_CREATEUSERSIGN, value);
    }

    /** 映射的属性名称-修改用户 */
    private static PROPERTY_NAME_UPDATEUSERSIGN: string = "_updateUserSign";

    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(OrganizationalRole.PROPERTY_NAME_UPDATEUSERSIGN);
    }

    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(OrganizationalRole.PROPERTY_NAME_UPDATEUSERSIGN, value);
    }

    /** 映射的属性名称-创建动作标识 */
    private static PROPERTY_NAME_CREATEACTIONID: string = "_createActionId";

    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(OrganizationalRole.PROPERTY_NAME_CREATEACTIONID);
    }

    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(OrganizationalRole.PROPERTY_NAME_CREATEACTIONID, value);
    }

    /** 映射的属性名称-更新动作标识 */
    private static PROPERTY_NAME_UPDATEACTIONID: string = "_updateActionId";

    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(OrganizationalRole.PROPERTY_NAME_UPDATEACTIONID);
    }

    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(OrganizationalRole.PROPERTY_NAME_UPDATEACTIONID, value);
    }

    /** 映射的属性名称-参考1 */
    private static PROPERTY_NAME_REFERENCE1: string = "_reference1";

    /** 获取-参考1 */
    get reference1(): string {
        return this.getProperty<string>(OrganizationalRole.PROPERTY_NAME_REFERENCE1);
    }

    /** 设置-参考1 */
    set reference1(value: string) {
        this.setProperty(OrganizationalRole.PROPERTY_NAME_REFERENCE1, value);
    }

    /** 映射的属性名称-参考2 */
    private static PROPERTY_NAME_REFERENCE2: string = "_reference2";

    /** 获取-参考2 */
    get reference2(): string {
        return this.getProperty<string>(OrganizationalRole.PROPERTY_NAME_REFERENCE2);
    }

    /** 设置-参考2 */
    set reference2(value: string) {
        this.setProperty(OrganizationalRole.PROPERTY_NAME_REFERENCE2, value);
    }

    /** 映射的属性名称-角色 */
    private static PROPERTY_NAME_ROLE: string = "_role";

    /** 获取-角色 */
    get role(): string {
        return this.getProperty<string>(OrganizationalRole.PROPERTY_NAME_ROLE);
    }

    /** 设置-角色 */
    set role(value: string) {
        this.setProperty(OrganizationalRole.PROPERTY_NAME_ROLE, value);
    }


    /** 初始化数据 */
    protected init(): void {
    }
}

/** 组织-角色 集合 */
export class OrganizationalRoles extends BusinessObjects<OrganizationalRole, OrganizationalStructure> implements IOrganizationalRoles {

    /** 创建并添加子项 */
    create(): OrganizationalRole {
        let item = new OrganizationalRole();
        this.add(item);
        return item;
    }

}
/** 组织-角色-成员 */
export class RoleMember extends BusinessObject<RoleMember> implements IRoleMember {

    constructor() {
        super();
    }

    /** 映射的属性名称-编号 */
    private static PROPERTY_NAME_OBJECTKEY: string = "_objectKey";

    /** 获取-编号 */
    get objectKey(): number {
        return this.getProperty<number>(RoleMember.PROPERTY_NAME_OBJECTKEY);
    }

    /** 设置-编号 */
    set objectKey(value: number) {
        this.setProperty(RoleMember.PROPERTY_NAME_OBJECTKEY, value);
    }

    /** 映射的属性名称-类型 */
    private static PROPERTY_NAME_OBJECTCODE: string = "_objectCode";

    /** 获取-类型 */
    get objectCode(): string {
        return this.getProperty<string>(RoleMember.PROPERTY_NAME_OBJECTCODE);
    }

    /** 设置-类型 */
    set objectCode(value: string) {
        this.setProperty(RoleMember.PROPERTY_NAME_OBJECTCODE, value);
    }

    /** 映射的属性名称-行号 */
    private static PROPERTY_NAME_LINEID: string = "_lineId";

    /** 获取-行号 */
    get lineId(): number {
        return this.getProperty<number>(RoleMember.PROPERTY_NAME_LINEID);
    }

    /** 设置-行号 */
    set lineId(value: number) {
        this.setProperty(RoleMember.PROPERTY_NAME_LINEID, value);
    }

    /** 映射的属性名称-实例号（版本） */
    private static PROPERTY_NAME_LOGINST: string = "_logInst";

    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(RoleMember.PROPERTY_NAME_LOGINST);
    }

    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(RoleMember.PROPERTY_NAME_LOGINST, value);
    }

    /** 映射的属性名称-数据源 */
    private static PROPERTY_NAME_DATASOURCE: string = "_dataSource";

    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(RoleMember.PROPERTY_NAME_DATASOURCE);
    }

    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(RoleMember.PROPERTY_NAME_DATASOURCE, value);
    }

    /** 映射的属性名称-创建日期 */
    private static PROPERTY_NAME_CREATEDATE: string = "_createDate";

    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(RoleMember.PROPERTY_NAME_CREATEDATE);
    }

    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(RoleMember.PROPERTY_NAME_CREATEDATE, value);
    }

    /** 映射的属性名称-创建时间 */
    private static PROPERTY_NAME_CREATETIME: string = "_createTime";

    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(RoleMember.PROPERTY_NAME_CREATETIME);
    }

    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(RoleMember.PROPERTY_NAME_CREATETIME, value);
    }

    /** 映射的属性名称-修改日期 */
    private static PROPERTY_NAME_UPDATEDATE: string = "_updateDate";

    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(RoleMember.PROPERTY_NAME_UPDATEDATE);
    }

    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(RoleMember.PROPERTY_NAME_UPDATEDATE, value);
    }

    /** 映射的属性名称-修改时间 */
    private static PROPERTY_NAME_UPDATETIME: string = "_updateTime";

    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(RoleMember.PROPERTY_NAME_UPDATETIME);
    }

    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(RoleMember.PROPERTY_NAME_UPDATETIME, value);
    }

    /** 映射的属性名称-创建用户 */
    private static PROPERTY_NAME_CREATEUSERSIGN: string = "_createUserSign";

    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(RoleMember.PROPERTY_NAME_CREATEUSERSIGN);
    }

    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(RoleMember.PROPERTY_NAME_CREATEUSERSIGN, value);
    }

    /** 映射的属性名称-修改用户 */
    private static PROPERTY_NAME_UPDATEUSERSIGN: string = "_updateUserSign";

    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(RoleMember.PROPERTY_NAME_UPDATEUSERSIGN);
    }

    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(RoleMember.PROPERTY_NAME_UPDATEUSERSIGN, value);
    }

    /** 映射的属性名称-创建动作标识 */
    private static PROPERTY_NAME_CREATEACTIONID: string = "_createActionId";

    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(RoleMember.PROPERTY_NAME_CREATEACTIONID);
    }

    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(RoleMember.PROPERTY_NAME_CREATEACTIONID, value);
    }

    /** 映射的属性名称-更新动作标识 */
    private static PROPERTY_NAME_UPDATEACTIONID: string = "_updateActionId";

    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(RoleMember.PROPERTY_NAME_UPDATEACTIONID);
    }

    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(RoleMember.PROPERTY_NAME_UPDATEACTIONID, value);
    }

    /** 映射的属性名称-参考1 */
    private static PROPERTY_NAME_REFERENCE1: string = "_reference1";

    /** 获取-参考1 */
    get reference1(): string {
        return this.getProperty<string>(RoleMember.PROPERTY_NAME_REFERENCE1);
    }

    /** 设置-参考1 */
    set reference1(value: string) {
        this.setProperty(RoleMember.PROPERTY_NAME_REFERENCE1, value);
    }

    /** 映射的属性名称-参考2 */
    private static PROPERTY_NAME_REFERENCE2: string = "_reference2";

    /** 获取-参考2 */
    get reference2(): string {
        return this.getProperty<string>(RoleMember.PROPERTY_NAME_REFERENCE2);
    }

    /** 设置-参考2 */
    set reference2(value: string) {
        this.setProperty(RoleMember.PROPERTY_NAME_REFERENCE2, value);
    }

    /** 映射的属性名称-角色-行号 */
    private static PROPERTY_NAME_ROLELINEID: string = "_roleLineId";

    /** 获取-角色-行号 */
    get roleLineId(): number {
        return this.getProperty<number>(RoleMember.PROPERTY_NAME_ROLELINEID);
    }

    /** 设置-角色-行号 */
    set roleLineId(value: number) {
        this.setProperty(RoleMember.PROPERTY_NAME_ROLELINEID, value);
    }

    /** 映射的属性名称-成员 */
    private static PROPERTY_NAME_MEMBER: string = "_member";

    /** 获取-成员 */
    get member(): string {
        return this.getProperty<string>(RoleMember.PROPERTY_NAME_MEMBER);
    }

    /** 设置-成员 */
    set member(value: string) {
        this.setProperty(RoleMember.PROPERTY_NAME_MEMBER, value);
    }


    /** 初始化数据 */
    protected init(): void {
    }
}

/** 组织-角色-成员 集合 */
export class RoleMembers extends BusinessObjects<RoleMember, OrganizationalStructure> implements IRoleMembers {

    /** 创建并添加子项 */
    create(): RoleMember {
        let item = new RoleMember();
        this.add(item);
        return item;
    }

}


