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
    IBOFiltering,
    IBOFilteringCondition,
    IBOFilteringConditions,
} from '../../api/bofiltering/bofiltering.data.d';

/** 业务对象筛选 */
export class BOFiltering extends BusinessObject<BOFiltering> implements IBOFiltering {

    constructor() {
        super();
    }

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = "${Company}_SYS_BOFILTERING";

    /** 映射的属性名称-角色标识 */
    private static PROPERTY_NAME_ROLECODE: string = "_roleCode";

    /** 获取-角色标识 */
    get roleCode(): string {
        return this.getProperty<string>(BOFiltering.PROPERTY_NAME_ROLECODE);
    }

    /** 设置-角色标识 */
    set roleCode(value: string) {
        this.setProperty(BOFiltering.PROPERTY_NAME_ROLECODE, value);
    }

    /** 映射的属性名称-对象类型 */
    private static PROPERTY_NAME_BOCODE: string = "_bOCode";

    /** 获取-对象类型 */
    get bOCode(): string {
        return this.getProperty<string>(BOFiltering.PROPERTY_NAME_BOCODE);
    }

    /** 设置-对象类型 */
    set bOCode(value: string) {
        this.setProperty(BOFiltering.PROPERTY_NAME_BOCODE, value);
    }

    /** 映射的属性名称-激活的 */
    private static PROPERTY_NAME_ACTIVATED: string = "_activated";

    /** 获取-激活的 */
    get activated(): emYesNo {
        return this.getProperty<emYesNo>(BOFiltering.PROPERTY_NAME_ACTIVATED);
    }

    /** 设置-激活的 */
    set activated(value: emYesNo) {
        this.setProperty(BOFiltering.PROPERTY_NAME_ACTIVATED, value);
    }

    /** 映射的属性名称-名称 */
    private static PROPERTY_NAME_NAME: string = "_name";

    /** 获取-名称 */
    get name(): string {
        return this.getProperty<string>(BOFiltering.PROPERTY_NAME_NAME);
    }

    /** 设置-名称 */
    set name(value: string) {
        this.setProperty(BOFiltering.PROPERTY_NAME_NAME, value);
    }

    /** 映射的属性名称-编号 */
    private static PROPERTY_NAME_OBJECTKEY: string = "_objectKey";

    /** 获取-编号 */
    get objectKey(): number {
        return this.getProperty<number>(BOFiltering.PROPERTY_NAME_OBJECTKEY);
    }

    /** 设置-编号 */
    set objectKey(value: number) {
        this.setProperty(BOFiltering.PROPERTY_NAME_OBJECTKEY, value);
    }

    /** 映射的属性名称-类型 */
    private static PROPERTY_NAME_OBJECTCODE: string = "_objectCode";

    /** 获取-类型 */
    get objectCode(): string {
        return this.getProperty<string>(BOFiltering.PROPERTY_NAME_OBJECTCODE);
    }

    /** 设置-类型 */
    set objectCode(value: string) {
        this.setProperty(BOFiltering.PROPERTY_NAME_OBJECTCODE, value);
    }

    /** 映射的属性名称-实例号（版本） */
    private static PROPERTY_NAME_LOGINST: string = "_logInst";

    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(BOFiltering.PROPERTY_NAME_LOGINST);
    }

    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(BOFiltering.PROPERTY_NAME_LOGINST, value);
    }

    /** 映射的属性名称-服务系列 */
    private static PROPERTY_NAME_SERIES: string = "_series";

    /** 获取-服务系列 */
    get series(): number {
        return this.getProperty<number>(BOFiltering.PROPERTY_NAME_SERIES);
    }

    /** 设置-服务系列 */
    set series(value: number) {
        this.setProperty(BOFiltering.PROPERTY_NAME_SERIES, value);
    }

    /** 映射的属性名称-数据源 */
    private static PROPERTY_NAME_DATASOURCE: string = "_dataSource";

    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(BOFiltering.PROPERTY_NAME_DATASOURCE);
    }

    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(BOFiltering.PROPERTY_NAME_DATASOURCE, value);
    }

    /** 映射的属性名称-创建日期 */
    private static PROPERTY_NAME_CREATEDATE: string = "_createDate";

    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(BOFiltering.PROPERTY_NAME_CREATEDATE);
    }

    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(BOFiltering.PROPERTY_NAME_CREATEDATE, value);
    }

    /** 映射的属性名称-创建时间 */
    private static PROPERTY_NAME_CREATETIME: string = "_createTime";

    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(BOFiltering.PROPERTY_NAME_CREATETIME);
    }

    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(BOFiltering.PROPERTY_NAME_CREATETIME, value);
    }

    /** 映射的属性名称-修改日期 */
    private static PROPERTY_NAME_UPDATEDATE: string = "_updateDate";

    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(BOFiltering.PROPERTY_NAME_UPDATEDATE);
    }

    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(BOFiltering.PROPERTY_NAME_UPDATEDATE, value);
    }

    /** 映射的属性名称-修改时间 */
    private static PROPERTY_NAME_UPDATETIME: string = "_updateTime";

    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(BOFiltering.PROPERTY_NAME_UPDATETIME);
    }

    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(BOFiltering.PROPERTY_NAME_UPDATETIME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    private static PROPERTY_NAME_CREATEACTIONID: string = "_createActionId";

    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(BOFiltering.PROPERTY_NAME_CREATEACTIONID);
    }

    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(BOFiltering.PROPERTY_NAME_CREATEACTIONID, value);
    }

    /** 映射的属性名称-更新动作标识 */
    private static PROPERTY_NAME_UPDATEACTIONID: string = "_updateActionId";

    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(BOFiltering.PROPERTY_NAME_UPDATEACTIONID);
    }

    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(BOFiltering.PROPERTY_NAME_UPDATEACTIONID, value);
    }

    /** 映射的属性名称-创建用户 */
    private static PROPERTY_NAME_CREATEUSERSIGN: string = "_createUserSign";

    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(BOFiltering.PROPERTY_NAME_CREATEUSERSIGN);
    }

    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(BOFiltering.PROPERTY_NAME_CREATEUSERSIGN, value);
    }

    /** 映射的属性名称-修改用户 */
    private static PROPERTY_NAME_UPDATEUSERSIGN: string = "_updateUserSign";

    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(BOFiltering.PROPERTY_NAME_UPDATEUSERSIGN);
    }

    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(BOFiltering.PROPERTY_NAME_UPDATEUSERSIGN, value);
    }

    /** 映射的属性名称-数据所有者 */
    private static PROPERTY_NAME_DATAOWNER: string = "_dataOwner";

    /** 获取-数据所有者 */
    get dataOwner(): number {
        return this.getProperty<number>(BOFiltering.PROPERTY_NAME_DATAOWNER);
    }

    /** 设置-数据所有者 */
    set dataOwner(value: number) {
        this.setProperty(BOFiltering.PROPERTY_NAME_DATAOWNER, value);
    }

    /** 映射的属性名称-数据所属组织 */
    private static PROPERTY_NAME_ORGANIZATION: string = "_organization";

    /** 获取-数据所属组织 */
    get organization(): string {
        return this.getProperty<string>(BOFiltering.PROPERTY_NAME_ORGANIZATION);
    }

    /** 设置-数据所属组织 */
    set organization(value: string) {
        this.setProperty(BOFiltering.PROPERTY_NAME_ORGANIZATION, value);
    }


    /** 映射的属性名称-业务对象筛选-条件集合 */
    private static PROPERTY_NAME_BOFILTERINGCONDITIONS: string = "_bOFilteringConditions";

    /** 获取-业务对象筛选-条件集合 */
    get bOFilteringConditions(): BOFilteringConditions {
        return this.getProperty<BOFilteringConditions>(BOFiltering.PROPERTY_NAME_BOFILTERINGCONDITIONS);
    }

    /** 设置-业务对象筛选-条件集合 */
    set bOFilteringConditions(value: BOFilteringConditions) {
        this.setProperty(BOFiltering.PROPERTY_NAME_BOFILTERINGCONDITIONS, value);
    }


    /** 初始化数据 */
    protected init(): void {
        this.bOFilteringConditions = new BOFilteringConditions(this);
        this.objectCode = BOFiltering.BUSINESS_OBJECT_CODE;
    }
}

/** 业务对象筛选-条件 */
export class BOFilteringCondition extends BusinessObject<BOFilteringCondition> implements IBOFilteringCondition {

    constructor() {
        super();
    }

    /** 映射的属性名称-编号 */
    private static PROPERTY_NAME_OBJECTKEY: string = "_objectKey";

    /** 获取-编号 */
    get objectKey(): number {
        return this.getProperty<number>(BOFilteringCondition.PROPERTY_NAME_OBJECTKEY);
    }

    /** 设置-编号 */
    set objectKey(value: number) {
        this.setProperty(BOFilteringCondition.PROPERTY_NAME_OBJECTKEY, value);
    }

    /** 映射的属性名称-类型 */
    private static PROPERTY_NAME_OBJECTCODE: string = "_objectCode";

    /** 获取-类型 */
    get objectCode(): string {
        return this.getProperty<string>(BOFilteringCondition.PROPERTY_NAME_OBJECTCODE);
    }

    /** 设置-类型 */
    set objectCode(value: string) {
        this.setProperty(BOFilteringCondition.PROPERTY_NAME_OBJECTCODE, value);
    }

    /** 映射的属性名称-行号 */
    private static PROPERTY_NAME_LINEID: string = "_lineId";

    /** 获取-行号 */
    get lineId(): number {
        return this.getProperty<number>(BOFilteringCondition.PROPERTY_NAME_LINEID);
    }

    /** 设置-行号 */
    set lineId(value: number) {
        this.setProperty(BOFilteringCondition.PROPERTY_NAME_LINEID, value);
    }

    /** 映射的属性名称-实例号（版本） */
    private static PROPERTY_NAME_LOGINST: string = "_logInst";

    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(BOFilteringCondition.PROPERTY_NAME_LOGINST);
    }

    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(BOFilteringCondition.PROPERTY_NAME_LOGINST, value);
    }

    /** 映射的属性名称-数据源 */
    private static PROPERTY_NAME_DATASOURCE: string = "_dataSource";

    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(BOFilteringCondition.PROPERTY_NAME_DATASOURCE);
    }

    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(BOFilteringCondition.PROPERTY_NAME_DATASOURCE, value);
    }

    /** 映射的属性名称-创建日期 */
    private static PROPERTY_NAME_CREATEDATE: string = "_createDate";

    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(BOFilteringCondition.PROPERTY_NAME_CREATEDATE);
    }

    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(BOFilteringCondition.PROPERTY_NAME_CREATEDATE, value);
    }

    /** 映射的属性名称-创建时间 */
    private static PROPERTY_NAME_CREATETIME: string = "_createTime";

    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(BOFilteringCondition.PROPERTY_NAME_CREATETIME);
    }

    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(BOFilteringCondition.PROPERTY_NAME_CREATETIME, value);
    }

    /** 映射的属性名称-修改日期 */
    private static PROPERTY_NAME_UPDATEDATE: string = "_updateDate";

    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(BOFilteringCondition.PROPERTY_NAME_UPDATEDATE);
    }

    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(BOFilteringCondition.PROPERTY_NAME_UPDATEDATE, value);
    }

    /** 映射的属性名称-修改时间 */
    private static PROPERTY_NAME_UPDATETIME: string = "_updateTime";

    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(BOFilteringCondition.PROPERTY_NAME_UPDATETIME);
    }

    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(BOFilteringCondition.PROPERTY_NAME_UPDATETIME, value);
    }

    /** 映射的属性名称-创建用户 */
    private static PROPERTY_NAME_CREATEUSERSIGN: string = "_createUserSign";

    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(BOFilteringCondition.PROPERTY_NAME_CREATEUSERSIGN);
    }

    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(BOFilteringCondition.PROPERTY_NAME_CREATEUSERSIGN, value);
    }

    /** 映射的属性名称-修改用户 */
    private static PROPERTY_NAME_UPDATEUSERSIGN: string = "_updateUserSign";

    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(BOFilteringCondition.PROPERTY_NAME_UPDATEUSERSIGN);
    }

    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(BOFilteringCondition.PROPERTY_NAME_UPDATEUSERSIGN, value);
    }

    /** 映射的属性名称-创建动作标识 */
    private static PROPERTY_NAME_CREATEACTIONID: string = "_createActionId";

    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(BOFilteringCondition.PROPERTY_NAME_CREATEACTIONID);
    }

    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(BOFilteringCondition.PROPERTY_NAME_CREATEACTIONID, value);
    }

    /** 映射的属性名称-更新动作标识 */
    private static PROPERTY_NAME_UPDATEACTIONID: string = "_updateActionId";

    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(BOFilteringCondition.PROPERTY_NAME_UPDATEACTIONID);
    }

    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(BOFilteringCondition.PROPERTY_NAME_UPDATEACTIONID, value);
    }

    /** 映射的属性名称-取值属性 */
    private static PROPERTY_NAME_PROPERTYNAME: string = "_propertyName";

    /** 获取-取值属性 */
    get propertyName(): string {
        return this.getProperty<string>(BOFilteringCondition.PROPERTY_NAME_PROPERTYNAME);
    }

    /** 设置-取值属性 */
    set propertyName(value: string) {
        this.setProperty(BOFilteringCondition.PROPERTY_NAME_PROPERTYNAME, value);
    }

    /** 映射的属性名称-比较的值 */
    private static PROPERTY_NAME_CONDITIONVALUE: string = "_conditionValue";

    /** 获取-比较的值 */
    get conditionValue(): string {
        return this.getProperty<string>(BOFilteringCondition.PROPERTY_NAME_CONDITIONVALUE);
    }

    /** 设置-比较的值 */
    set conditionValue(value: string) {
        this.setProperty(BOFilteringCondition.PROPERTY_NAME_CONDITIONVALUE, value);
    }

    /** 映射的属性名称-比较的方法 */
    private static PROPERTY_NAME_OPERATION: string = "_operation";

    /** 获取-比较的方法 */
    get operation(): emConditionOperation {
        return this.getProperty<emConditionOperation>(BOFilteringCondition.PROPERTY_NAME_OPERATION);
    }

    /** 设置-比较的方法 */
    set operation(value: emConditionOperation) {
        this.setProperty(BOFilteringCondition.PROPERTY_NAME_OPERATION, value);
    }

    /** 映射的属性名称-与上一个条件的关系 */
    private static PROPERTY_NAME_RELATIONSHIP: string = "_relationship";

    /** 获取-与上一个条件的关系 */
    get relationship(): emConditionRelationship {
        return this.getProperty<emConditionRelationship>(BOFilteringCondition.PROPERTY_NAME_RELATIONSHIP);
    }

    /** 设置-与上一个条件的关系 */
    set relationship(value: emConditionRelationship) {
        this.setProperty(BOFilteringCondition.PROPERTY_NAME_RELATIONSHIP, value);
    }


    /** 初始化数据 */
    protected init(): void {
    }
}

/** 业务对象筛选-条件 集合 */
export class BOFilteringConditions extends BusinessObjects<BOFilteringCondition, BOFiltering> implements IBOFilteringConditions {

    /** 创建并添加子项 */
    create(): BOFilteringCondition {
        let item = new BOFilteringCondition();
        this.add(item);
        return item;
    }

}


