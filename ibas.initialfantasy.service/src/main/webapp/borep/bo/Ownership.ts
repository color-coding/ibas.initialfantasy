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
    IOwnership,
} from '../../api/ownership/ownership.data.d';

/** 数据权限 */
export class Ownership extends BusinessObject<Ownership> implements IOwnership {

    constructor() {
        super();
    }

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = "${Company}_SYS_OWNERSHIP";

    /** 映射的属性名称-用户编码 */
    private static PROPERTY_NAME_USERCODE: string = "_userCode";

    /** 获取-用户编码 */
    get userCode(): string {
        return this.getProperty<string>(Ownership.PROPERTY_NAME_USERCODE);
    }

    /** 设置-用户编码 */
    set userCode(value: string) {
        this.setProperty(Ownership.PROPERTY_NAME_USERCODE, value);
    }

    /** 映射的属性名称-对象编码 */
    private static PROPERTY_NAME_BOCODE: string = "_bOCode";

    /** 获取-对象编码 */
    get bOCode(): string {
        return this.getProperty<string>(Ownership.PROPERTY_NAME_BOCODE);
    }

    /** 设置-对象编码 */
    set bOCode(value: string) {
        this.setProperty(Ownership.PROPERTY_NAME_BOCODE, value);
    }

    /** 映射的属性名称-激活 */
    private static PROPERTY_NAME_ACTIVATED: string = "_activated";

    /** 获取-激活 */
    get activated(): emYesNo {
        return this.getProperty<emYesNo>(Ownership.PROPERTY_NAME_ACTIVATED);
    }

    /** 设置-激活 */
    set activated(value: emYesNo) {
        this.setProperty(Ownership.PROPERTY_NAME_ACTIVATED, value);
    }

    /** 映射的属性名称-自身权限 */
    private static PROPERTY_NAME_SELF: string = "_self";

    /** 获取-自身权限 */
    get self(): emAuthoriseType {
        return this.getProperty<emAuthoriseType>(Ownership.PROPERTY_NAME_SELF);
    }

    /** 设置-自身权限 */
    set self(value: emAuthoriseType) {
        this.setProperty(Ownership.PROPERTY_NAME_SELF, value);
    }

    /** 映射的属性名称-部门-下级权限 */
    private static PROPERTY_NAME_LOWERLEVEL: string = "_lowerLevel";

    /** 获取-部门-下级权限 */
    get lowerLevel(): emAuthoriseType {
        return this.getProperty<emAuthoriseType>(Ownership.PROPERTY_NAME_LOWERLEVEL);
    }

    /** 设置-部门-下级权限 */
    set lowerLevel(value: emAuthoriseType) {
        this.setProperty(Ownership.PROPERTY_NAME_LOWERLEVEL, value);
    }

    /** 映射的属性名称-部门-同级权限 */
    private static PROPERTY_NAME_EQUALLEVEL: string = "_equalLevel";

    /** 获取-部门-同级权限 */
    get equalLevel(): emAuthoriseType {
        return this.getProperty<emAuthoriseType>(Ownership.PROPERTY_NAME_EQUALLEVEL);
    }

    /** 设置-部门-同级权限 */
    set equalLevel(value: emAuthoriseType) {
        this.setProperty(Ownership.PROPERTY_NAME_EQUALLEVEL, value);
    }

    /** 映射的属性名称-部门-上级权限 */
    private static PROPERTY_NAME_HIGHERLEVEL: string = "_higherLevel";

    /** 获取-部门-上级权限 */
    get higherLevel(): emAuthoriseType {
        return this.getProperty<emAuthoriseType>(Ownership.PROPERTY_NAME_HIGHERLEVEL);
    }

    /** 设置-部门-上级权限 */
    set higherLevel(value: emAuthoriseType) {
        this.setProperty(Ownership.PROPERTY_NAME_HIGHERLEVEL, value);
    }

    /** 映射的属性名称-团队权限 */
    private static PROPERTY_NAME_TEAMS: string = "_teams";

    /** 获取-团队权限 */
    get teams(): emAuthoriseType {
        return this.getProperty<emAuthoriseType>(Ownership.PROPERTY_NAME_TEAMS);
    }

    /** 设置-团队权限 */
    set teams(value: emAuthoriseType) {
        this.setProperty(Ownership.PROPERTY_NAME_TEAMS, value);
    }

    /** 映射的属性名称-其他情况权限 */
    private static PROPERTY_NAME_OTHERS: string = "_others";

    /** 获取-其他情况权限 */
    get others(): emAuthoriseType {
        return this.getProperty<emAuthoriseType>(Ownership.PROPERTY_NAME_OTHERS);
    }

    /** 设置-其他情况权限 */
    set others(value: emAuthoriseType) {
        this.setProperty(Ownership.PROPERTY_NAME_OTHERS, value);
    }

    /** 映射的属性名称-对象编号 */
    private static PROPERTY_NAME_OBJECTKEY: string = "_objectKey";

    /** 获取-对象编号 */
    get objectKey(): number {
        return this.getProperty<number>(Ownership.PROPERTY_NAME_OBJECTKEY);
    }

    /** 设置-对象编号 */
    set objectKey(value: number) {
        this.setProperty(Ownership.PROPERTY_NAME_OBJECTKEY, value);
    }

    /** 映射的属性名称-对象类型 */
    private static PROPERTY_NAME_OBJECTCODE: string = "_objectCode";

    /** 获取-对象类型 */
    get objectCode(): string {
        return this.getProperty<string>(Ownership.PROPERTY_NAME_OBJECTCODE);
    }

    /** 设置-对象类型 */
    set objectCode(value: string) {
        this.setProperty(Ownership.PROPERTY_NAME_OBJECTCODE, value);
    }

    /** 映射的属性名称-创建日期 */
    private static PROPERTY_NAME_CREATEDATE: string = "_createDate";

    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(Ownership.PROPERTY_NAME_CREATEDATE);
    }

    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(Ownership.PROPERTY_NAME_CREATEDATE, value);
    }

    /** 映射的属性名称-创建时间 */
    private static PROPERTY_NAME_CREATETIME: string = "_createTime";

    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(Ownership.PROPERTY_NAME_CREATETIME);
    }

    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(Ownership.PROPERTY_NAME_CREATETIME, value);
    }

    /** 映射的属性名称-修改日期 */
    private static PROPERTY_NAME_UPDATEDATE: string = "_updateDate";

    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(Ownership.PROPERTY_NAME_UPDATEDATE);
    }

    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(Ownership.PROPERTY_NAME_UPDATEDATE, value);
    }

    /** 映射的属性名称-修改时间 */
    private static PROPERTY_NAME_UPDATETIME: string = "_updateTime";

    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(Ownership.PROPERTY_NAME_UPDATETIME);
    }

    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(Ownership.PROPERTY_NAME_UPDATETIME, value);
    }

    /** 映射的属性名称-实例号（版本） */
    private static PROPERTY_NAME_LOGINST: string = "_logInst";

    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(Ownership.PROPERTY_NAME_LOGINST);
    }

    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(Ownership.PROPERTY_NAME_LOGINST, value);
    }

    /** 映射的属性名称-服务系列 */
    private static PROPERTY_NAME_SERIES: string = "_series";

    /** 获取-服务系列 */
    get series(): number {
        return this.getProperty<number>(Ownership.PROPERTY_NAME_SERIES);
    }

    /** 设置-服务系列 */
    set series(value: number) {
        this.setProperty(Ownership.PROPERTY_NAME_SERIES, value);
    }

    /** 映射的属性名称-数据源 */
    private static PROPERTY_NAME_DATASOURCE: string = "_dataSource";

    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(Ownership.PROPERTY_NAME_DATASOURCE);
    }

    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(Ownership.PROPERTY_NAME_DATASOURCE, value);
    }

    /** 映射的属性名称-创建用户 */
    private static PROPERTY_NAME_CREATEUSERSIGN: string = "_createUserSign";

    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(Ownership.PROPERTY_NAME_CREATEUSERSIGN);
    }

    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(Ownership.PROPERTY_NAME_CREATEUSERSIGN, value);
    }

    /** 映射的属性名称-修改用户 */
    private static PROPERTY_NAME_UPDATEUSERSIGN: string = "_updateUserSign";

    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(Ownership.PROPERTY_NAME_UPDATEUSERSIGN);
    }

    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(Ownership.PROPERTY_NAME_UPDATEUSERSIGN, value);
    }

    /** 映射的属性名称-创建动作标识 */
    private static PROPERTY_NAME_CREATEACTIONID: string = "_createActionId";

    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(Ownership.PROPERTY_NAME_CREATEACTIONID);
    }

    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(Ownership.PROPERTY_NAME_CREATEACTIONID, value);
    }

    /** 映射的属性名称-更新动作标识 */
    private static PROPERTY_NAME_UPDATEACTIONID: string = "_updateActionId";

    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(Ownership.PROPERTY_NAME_UPDATEACTIONID);
    }

    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(Ownership.PROPERTY_NAME_UPDATEACTIONID, value);
    }



    /** 初始化数据 */
    protected init(): void {
        this.objectCode = Ownership.BUSINESS_OBJECT_CODE;
    }
}



