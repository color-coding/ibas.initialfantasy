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
    emAuthoriseType,
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
    IOwnership,
} from "../../api/index";

/** 数据权限 */
export class Ownership extends BOSimple<Ownership> implements IOwnership {

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = "CC_SYS_OWNERSHIP";
    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-用户编码 */
    static PROPERTY_USERCODE_NAME: string = "UserCode";
    /** 获取-用户编码 */
    get userCode(): string {
        return this.getProperty<string>(Ownership.PROPERTY_USERCODE_NAME);
    }
    /** 设置-用户编码 */
    set userCode(value: string) {
        this.setProperty(Ownership.PROPERTY_USERCODE_NAME, value);
    }

    /** 映射的属性名称-对象编码 */
    static PROPERTY_BOCODE_NAME: string = "BOCode";
    /** 获取-对象编码 */
    get bOCode(): string {
        return this.getProperty<string>(Ownership.PROPERTY_BOCODE_NAME);
    }
    /** 设置-对象编码 */
    set bOCode(value: string) {
        this.setProperty(Ownership.PROPERTY_BOCODE_NAME, value);
    }

    /** 映射的属性名称-激活 */
    static PROPERTY_ACTIVATED_NAME: string = "Activated";
    /** 获取-激活 */
    get activated(): emYesNo {
        return this.getProperty<emYesNo>(Ownership.PROPERTY_ACTIVATED_NAME);
    }
    /** 设置-激活 */
    set activated(value: emYesNo) {
        this.setProperty(Ownership.PROPERTY_ACTIVATED_NAME, value);
    }

    /** 映射的属性名称-自身权限 */
    static PROPERTY_SELF_NAME: string = "Self";
    /** 获取-自身权限 */
    get self(): emAuthoriseType {
        return this.getProperty<emAuthoriseType>(Ownership.PROPERTY_SELF_NAME);
    }
    /** 设置-自身权限 */
    set self(value: emAuthoriseType) {
        this.setProperty(Ownership.PROPERTY_SELF_NAME, value);
    }

    /** 映射的属性名称-部门-下级权限 */
    static PROPERTY_LOWERLEVEL_NAME: string = "LowerLevel";
    /** 获取-部门-下级权限 */
    get lowerLevel(): emAuthoriseType {
        return this.getProperty<emAuthoriseType>(Ownership.PROPERTY_LOWERLEVEL_NAME);
    }
    /** 设置-部门-下级权限 */
    set lowerLevel(value: emAuthoriseType) {
        this.setProperty(Ownership.PROPERTY_LOWERLEVEL_NAME, value);
    }

    /** 映射的属性名称-部门-同级权限 */
    static PROPERTY_EQUALLEVEL_NAME: string = "EqualLevel";
    /** 获取-部门-同级权限 */
    get equalLevel(): emAuthoriseType {
        return this.getProperty<emAuthoriseType>(Ownership.PROPERTY_EQUALLEVEL_NAME);
    }
    /** 设置-部门-同级权限 */
    set equalLevel(value: emAuthoriseType) {
        this.setProperty(Ownership.PROPERTY_EQUALLEVEL_NAME, value);
    }

    /** 映射的属性名称-部门-上级权限 */
    static PROPERTY_HIGHERLEVEL_NAME: string = "HigherLevel";
    /** 获取-部门-上级权限 */
    get higherLevel(): emAuthoriseType {
        return this.getProperty<emAuthoriseType>(Ownership.PROPERTY_HIGHERLEVEL_NAME);
    }
    /** 设置-部门-上级权限 */
    set higherLevel(value: emAuthoriseType) {
        this.setProperty(Ownership.PROPERTY_HIGHERLEVEL_NAME, value);
    }

    /** 映射的属性名称-团队权限 */
    static PROPERTY_TEAMS_NAME: string = "Teams";
    /** 获取-团队权限 */
    get teams(): emAuthoriseType {
        return this.getProperty<emAuthoriseType>(Ownership.PROPERTY_TEAMS_NAME);
    }
    /** 设置-团队权限 */
    set teams(value: emAuthoriseType) {
        this.setProperty(Ownership.PROPERTY_TEAMS_NAME, value);
    }

    /** 映射的属性名称-其他情况权限 */
    static PROPERTY_OTHERS_NAME: string = "Others";
    /** 获取-其他情况权限 */
    get others(): emAuthoriseType {
        return this.getProperty<emAuthoriseType>(Ownership.PROPERTY_OTHERS_NAME);
    }
    /** 设置-其他情况权限 */
    set others(value: emAuthoriseType) {
        this.setProperty(Ownership.PROPERTY_OTHERS_NAME, value);
    }

    /** 映射的属性名称-对象编号 */
    static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
    /** 获取-对象编号 */
    get objectKey(): number {
        return this.getProperty<number>(Ownership.PROPERTY_OBJECTKEY_NAME);
    }
    /** 设置-对象编号 */
    set objectKey(value: number) {
        this.setProperty(Ownership.PROPERTY_OBJECTKEY_NAME, value);
    }

    /** 映射的属性名称-对象类型 */
    static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
    /** 获取-对象类型 */
    get objectCode(): string {
        return this.getProperty<string>(Ownership.PROPERTY_OBJECTCODE_NAME);
    }
    /** 设置-对象类型 */
    set objectCode(value: string) {
        this.setProperty(Ownership.PROPERTY_OBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-创建日期 */
    static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(Ownership.PROPERTY_CREATEDATE_NAME);
    }
    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(Ownership.PROPERTY_CREATEDATE_NAME, value);
    }

    /** 映射的属性名称-创建时间 */
    static PROPERTY_CREATETIME_NAME: string = "CreateTime";
    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(Ownership.PROPERTY_CREATETIME_NAME);
    }
    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(Ownership.PROPERTY_CREATETIME_NAME, value);
    }

    /** 映射的属性名称-修改日期 */
    static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(Ownership.PROPERTY_UPDATEDATE_NAME);
    }
    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(Ownership.PROPERTY_UPDATEDATE_NAME, value);
    }

    /** 映射的属性名称-修改时间 */
    static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(Ownership.PROPERTY_UPDATETIME_NAME);
    }
    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(Ownership.PROPERTY_UPDATETIME_NAME, value);
    }

    /** 映射的属性名称-实例号（版本） */
    static PROPERTY_LOGINST_NAME: string = "LogInst";
    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(Ownership.PROPERTY_LOGINST_NAME);
    }
    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(Ownership.PROPERTY_LOGINST_NAME, value);
    }

    /** 映射的属性名称-服务系列 */
    static PROPERTY_SERIES_NAME: string = "Series";
    /** 获取-服务系列 */
    get series(): number {
        return this.getProperty<number>(Ownership.PROPERTY_SERIES_NAME);
    }
    /** 设置-服务系列 */
    set series(value: number) {
        this.setProperty(Ownership.PROPERTY_SERIES_NAME, value);
    }

    /** 映射的属性名称-数据源 */
    static PROPERTY_DATASOURCE_NAME: string = "DataSource";
    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(Ownership.PROPERTY_DATASOURCE_NAME);
    }
    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(Ownership.PROPERTY_DATASOURCE_NAME, value);
    }

    /** 映射的属性名称-创建用户 */
    static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(Ownership.PROPERTY_CREATEUSERSIGN_NAME);
    }
    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(Ownership.PROPERTY_CREATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-修改用户 */
    static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(Ownership.PROPERTY_UPDATEUSERSIGN_NAME);
    }
    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(Ownership.PROPERTY_UPDATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(Ownership.PROPERTY_CREATEACTIONID_NAME);
    }
    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(Ownership.PROPERTY_CREATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-更新动作标识 */
    static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(Ownership.PROPERTY_UPDATEACTIONID_NAME);
    }
    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(Ownership.PROPERTY_UPDATEACTIONID_NAME, value);
    }



    /** 初始化数据 */
    protected init(): void {
        this.objectCode = Ownership.BUSINESS_OBJECT_CODE;
    }
}

