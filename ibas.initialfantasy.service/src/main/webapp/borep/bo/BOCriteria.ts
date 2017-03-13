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
    IBOCriteria,
} from '../../api/bocriteria/bocriteria.data.d';

/** 业务对象检索条件 */
export class BOCriteria extends BusinessObject<BOCriteria> implements IBOCriteria {

    constructor() {
        super();
    }

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = "${Company}_SYS_BOCRITERIA";

    /** 映射的属性名称-应用标识 */
    private static PROPERTY_NAME_APPLICATIONID: string = "_applicationId";

    /** 获取-应用标识 */
    get applicationId(): string {
        return this.getProperty<string>(BOCriteria.PROPERTY_NAME_APPLICATIONID);
    }

    /** 设置-应用标识 */
    set applicationId(value: string) {
        this.setProperty(BOCriteria.PROPERTY_NAME_APPLICATIONID, value);
    }

    /** 映射的属性名称-检索名称 */
    private static PROPERTY_NAME_NAME: string = "_name";

    /** 获取-检索名称 */
    get name(): string {
        return this.getProperty<string>(BOCriteria.PROPERTY_NAME_NAME);
    }

    /** 设置-检索名称 */
    set name(value: string) {
        this.setProperty(BOCriteria.PROPERTY_NAME_NAME, value);
    }

    /** 映射的属性名称-系统的 */
    private static PROPERTY_NAME_SYSTEMED: string = "_systemed";

    /** 获取-系统的 */
    get systemed(): emYesNo {
        return this.getProperty<emYesNo>(BOCriteria.PROPERTY_NAME_SYSTEMED);
    }

    /** 设置-系统的 */
    set systemed(value: emYesNo) {
        this.setProperty(BOCriteria.PROPERTY_NAME_SYSTEMED, value);
    }

    /** 映射的属性名称-激活的 */
    private static PROPERTY_NAME_ACTIVATED: string = "_activated";

    /** 获取-激活的 */
    get activated(): emYesNo {
        return this.getProperty<emYesNo>(BOCriteria.PROPERTY_NAME_ACTIVATED);
    }

    /** 设置-激活的 */
    set activated(value: emYesNo) {
        this.setProperty(BOCriteria.PROPERTY_NAME_ACTIVATED, value);
    }

    /** 映射的属性名称-顺序 */
    private static PROPERTY_NAME_ORDER: string = "_order";

    /** 获取-顺序 */
    get order(): number {
        return this.getProperty<number>(BOCriteria.PROPERTY_NAME_ORDER);
    }

    /** 设置-顺序 */
    set order(value: number) {
        this.setProperty(BOCriteria.PROPERTY_NAME_ORDER, value);
    }

    /** 映射的属性名称-归属角色 */
    private static PROPERTY_NAME_BELONGROLE: string = "_belongRole";

    /** 获取-归属角色 */
    get belongRole(): string {
        return this.getProperty<string>(BOCriteria.PROPERTY_NAME_BELONGROLE);
    }

    /** 设置-归属角色 */
    set belongRole(value: string) {
        this.setProperty(BOCriteria.PROPERTY_NAME_BELONGROLE, value);
    }

    /** 映射的属性名称-基础查询 */
    private static PROPERTY_NAME_BASISCRITERIA: string = "_basisCriteria";

    /** 获取-基础查询 */
    get basisCriteria(): string {
        return this.getProperty<string>(BOCriteria.PROPERTY_NAME_BASISCRITERIA);
    }

    /** 设置-基础查询 */
    set basisCriteria(value: string) {
        this.setProperty(BOCriteria.PROPERTY_NAME_BASISCRITERIA, value);
    }

    /** 映射的属性名称-检索查询 */
    private static PROPERTY_NAME_SEARCHCRITERIA: string = "_searchCriteria";

    /** 获取-检索查询 */
    get searchCriteria(): string {
        return this.getProperty<string>(BOCriteria.PROPERTY_NAME_SEARCHCRITERIA);
    }

    /** 设置-检索查询 */
    set searchCriteria(value: string) {
        this.setProperty(BOCriteria.PROPERTY_NAME_SEARCHCRITERIA, value);
    }

    /** 映射的属性名称-编号 */
    private static PROPERTY_NAME_OBJECTKEY: string = "_objectKey";

    /** 获取-编号 */
    get objectKey(): number {
        return this.getProperty<number>(BOCriteria.PROPERTY_NAME_OBJECTKEY);
    }

    /** 设置-编号 */
    set objectKey(value: number) {
        this.setProperty(BOCriteria.PROPERTY_NAME_OBJECTKEY, value);
    }

    /** 映射的属性名称-类型 */
    private static PROPERTY_NAME_OBJECTCODE: string = "_objectCode";

    /** 获取-类型 */
    get objectCode(): string {
        return this.getProperty<string>(BOCriteria.PROPERTY_NAME_OBJECTCODE);
    }

    /** 设置-类型 */
    set objectCode(value: string) {
        this.setProperty(BOCriteria.PROPERTY_NAME_OBJECTCODE, value);
    }

    /** 映射的属性名称-实例号（版本） */
    private static PROPERTY_NAME_LOGINST: string = "_logInst";

    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(BOCriteria.PROPERTY_NAME_LOGINST);
    }

    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(BOCriteria.PROPERTY_NAME_LOGINST, value);
    }

    /** 映射的属性名称-编号系列 */
    private static PROPERTY_NAME_SERIES: string = "_series";

    /** 获取-编号系列 */
    get series(): number {
        return this.getProperty<number>(BOCriteria.PROPERTY_NAME_SERIES);
    }

    /** 设置-编号系列 */
    set series(value: number) {
        this.setProperty(BOCriteria.PROPERTY_NAME_SERIES, value);
    }

    /** 映射的属性名称-数据源 */
    private static PROPERTY_NAME_DATASOURCE: string = "_dataSource";

    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(BOCriteria.PROPERTY_NAME_DATASOURCE);
    }

    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(BOCriteria.PROPERTY_NAME_DATASOURCE, value);
    }

    /** 映射的属性名称-创建日期 */
    private static PROPERTY_NAME_CREATEDATE: string = "_createDate";

    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(BOCriteria.PROPERTY_NAME_CREATEDATE);
    }

    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(BOCriteria.PROPERTY_NAME_CREATEDATE, value);
    }

    /** 映射的属性名称-创建时间 */
    private static PROPERTY_NAME_CREATETIME: string = "_createTime";

    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(BOCriteria.PROPERTY_NAME_CREATETIME);
    }

    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(BOCriteria.PROPERTY_NAME_CREATETIME, value);
    }

    /** 映射的属性名称-修改日期 */
    private static PROPERTY_NAME_UPDATEDATE: string = "_updateDate";

    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(BOCriteria.PROPERTY_NAME_UPDATEDATE);
    }

    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(BOCriteria.PROPERTY_NAME_UPDATEDATE, value);
    }

    /** 映射的属性名称-修改时间 */
    private static PROPERTY_NAME_UPDATETIME: string = "_updateTime";

    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(BOCriteria.PROPERTY_NAME_UPDATETIME);
    }

    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(BOCriteria.PROPERTY_NAME_UPDATETIME, value);
    }

    /** 映射的属性名称-创建用户 */
    private static PROPERTY_NAME_CREATEUSERSIGN: string = "_createUserSign";

    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(BOCriteria.PROPERTY_NAME_CREATEUSERSIGN);
    }

    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(BOCriteria.PROPERTY_NAME_CREATEUSERSIGN, value);
    }

    /** 映射的属性名称-修改用户 */
    private static PROPERTY_NAME_UPDATEUSERSIGN: string = "_updateUserSign";

    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(BOCriteria.PROPERTY_NAME_UPDATEUSERSIGN);
    }

    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(BOCriteria.PROPERTY_NAME_UPDATEUSERSIGN, value);
    }

    /** 映射的属性名称-创建动作标识 */
    private static PROPERTY_NAME_CREATEACTIONID: string = "_createActionId";

    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(BOCriteria.PROPERTY_NAME_CREATEACTIONID);
    }

    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(BOCriteria.PROPERTY_NAME_CREATEACTIONID, value);
    }

    /** 映射的属性名称-更新动作标识 */
    private static PROPERTY_NAME_UPDATEACTIONID: string = "_updateActionId";

    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(BOCriteria.PROPERTY_NAME_UPDATEACTIONID);
    }

    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(BOCriteria.PROPERTY_NAME_UPDATEACTIONID, value);
    }

    /** 映射的属性名称-数据所有者 */
    private static PROPERTY_NAME_DATAOWNER: string = "_dataOwner";

    /** 获取-数据所有者 */
    get dataOwner(): number {
        return this.getProperty<number>(BOCriteria.PROPERTY_NAME_DATAOWNER);
    }

    /** 设置-数据所有者 */
    set dataOwner(value: number) {
        this.setProperty(BOCriteria.PROPERTY_NAME_DATAOWNER, value);
    }

    /** 映射的属性名称-数据所属组织 */
    private static PROPERTY_NAME_ORGANIZATION: string = "_organization";

    /** 获取-数据所属组织 */
    get organization(): string {
        return this.getProperty<string>(BOCriteria.PROPERTY_NAME_ORGANIZATION);
    }

    /** 设置-数据所属组织 */
    set organization(value: string) {
        this.setProperty(BOCriteria.PROPERTY_NAME_ORGANIZATION, value);
    }



    /** 初始化数据 */
    protected init(): void {
        this.objectCode = BOCriteria.BUSINESS_OBJECT_CODE;
    }
}



