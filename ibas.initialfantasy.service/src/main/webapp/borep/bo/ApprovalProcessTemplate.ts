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
    IApprovalTemplate,
    IApprovalProcessStepTemplate,
    IApprovalProcessStepTemplates,
    IApprovalProcessStepConditionTemplate,
    IApprovalProcessStepConditionTemplates,
} from '../../api/ApprovalTemplate/ApprovalTemplate.data.d';

/** 审批模板 */
export class ApprovalTemplate extends BusinessObject<ApprovalTemplate> implements IApprovalTemplate {

    constructor() {
        super();
    }

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = "${Company}AP_APPROVALTPLT";

    /** 映射的属性名称-编号 */
    private static PROPERTY_NAME_OBJECTKEY: string = "_objectKey";

    /** 获取-编号 */
    get objectKey(): number {
        return this.getProperty<number>(ApprovalTemplate.PROPERTY_NAME_OBJECTKEY);
    }

    /** 设置-编号 */
    set objectKey(value: number) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_OBJECTKEY, value);
    }

    /** 映射的属性名称-类型 */
    private static PROPERTY_NAME_OBJECTCODE: string = "_objectCode";

    /** 获取-类型 */
    get objectCode(): string {
        return this.getProperty<string>(ApprovalTemplate.PROPERTY_NAME_OBJECTCODE);
    }

    /** 设置-类型 */
    set objectCode(value: string) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_OBJECTCODE, value);
    }

    /** 映射的属性名称-实例号（版本） */
    private static PROPERTY_NAME_LOGINST: string = "_logInst";

    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(ApprovalTemplate.PROPERTY_NAME_LOGINST);
    }

    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_LOGINST, value);
    }

    /** 映射的属性名称-服务系列 */
    private static PROPERTY_NAME_SERIES: string = "_series";

    /** 获取-服务系列 */
    get series(): number {
        return this.getProperty<number>(ApprovalTemplate.PROPERTY_NAME_SERIES);
    }

    /** 设置-服务系列 */
    set series(value: number) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_SERIES, value);
    }

    /** 映射的属性名称-数据源 */
    private static PROPERTY_NAME_DATASOURCE: string = "_dataSource";

    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(ApprovalTemplate.PROPERTY_NAME_DATASOURCE);
    }

    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_DATASOURCE, value);
    }

    /** 映射的属性名称-创建日期 */
    private static PROPERTY_NAME_CREATEDATE: string = "_createDate";

    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(ApprovalTemplate.PROPERTY_NAME_CREATEDATE);
    }

    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_CREATEDATE, value);
    }

    /** 映射的属性名称-创建时间 */
    private static PROPERTY_NAME_CREATETIME: string = "_createTime";

    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(ApprovalTemplate.PROPERTY_NAME_CREATETIME);
    }

    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_CREATETIME, value);
    }

    /** 映射的属性名称-修改日期 */
    private static PROPERTY_NAME_UPDATEDATE: string = "_updateDate";

    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(ApprovalTemplate.PROPERTY_NAME_UPDATEDATE);
    }

    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_UPDATEDATE, value);
    }

    /** 映射的属性名称-修改时间 */
    private static PROPERTY_NAME_UPDATETIME: string = "_updateTime";

    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(ApprovalTemplate.PROPERTY_NAME_UPDATETIME);
    }

    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_UPDATETIME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    private static PROPERTY_NAME_CREATEACTIONID: string = "_createActionId";

    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(ApprovalTemplate.PROPERTY_NAME_CREATEACTIONID);
    }

    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_CREATEACTIONID, value);
    }

    /** 映射的属性名称-更新动作标识 */
    private static PROPERTY_NAME_UPDATEACTIONID: string = "_updateActionId";

    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(ApprovalTemplate.PROPERTY_NAME_UPDATEACTIONID);
    }

    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_UPDATEACTIONID, value);
    }

    /** 映射的属性名称-创建用户 */
    private static PROPERTY_NAME_CREATEUSERSIGN: string = "_createUserSign";

    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(ApprovalTemplate.PROPERTY_NAME_CREATEUSERSIGN);
    }

    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_CREATEUSERSIGN, value);
    }

    /** 映射的属性名称-修改用户 */
    private static PROPERTY_NAME_UPDATEUSERSIGN: string = "_updateUserSign";

    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(ApprovalTemplate.PROPERTY_NAME_UPDATEUSERSIGN);
    }

    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_UPDATEUSERSIGN, value);
    }

    /** 映射的属性名称-数据所有者 */
    private static PROPERTY_NAME_DATAOWNER: string = "_dataOwner";

    /** 获取-数据所有者 */
    get dataOwner(): number {
        return this.getProperty<number>(ApprovalTemplate.PROPERTY_NAME_DATAOWNER);
    }

    /** 设置-数据所有者 */
    set dataOwner(value: number) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_DATAOWNER, value);
    }

    /** 映射的属性名称-数据所属组织 */
    private static PROPERTY_NAME_ORGANIZATION: string = "_organization";

    /** 获取-数据所属组织 */
    get organization(): string {
        return this.getProperty<string>(ApprovalTemplate.PROPERTY_NAME_ORGANIZATION);
    }

    /** 设置-数据所属组织 */
    set organization(value: string) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_ORGANIZATION, value);
    }

    /** 映射的属性名称-参考1 */
    private static PROPERTY_NAME_REFERENCE1: string = "_reference1";

    /** 获取-参考1 */
    get reference1(): string {
        return this.getProperty<string>(ApprovalTemplate.PROPERTY_NAME_REFERENCE1);
    }

    /** 设置-参考1 */
    set reference1(value: string) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_REFERENCE1, value);
    }

    /** 映射的属性名称-参考2 */
    private static PROPERTY_NAME_REFERENCE2: string = "_reference2";

    /** 获取-参考2 */
    get reference2(): string {
        return this.getProperty<string>(ApprovalTemplate.PROPERTY_NAME_REFERENCE2);
    }

    /** 设置-参考2 */
    set reference2(value: string) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_REFERENCE2, value);
    }

    /** 映射的属性名称-备注 */
    private static PROPERTY_NAME_REMARKS: string = "_remarks";

    /** 获取-备注 */
    get remarks(): string {
        return this.getProperty<string>(ApprovalTemplate.PROPERTY_NAME_REMARKS);
    }

    /** 设置-备注 */
    set remarks(value: string) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_REMARKS, value);
    }

    /** 映射的属性名称-审批流程名称 */
    private static PROPERTY_NAME_NAME: string = "_name";

    /** 获取-审批流程名称 */
    get name(): string {
        return this.getProperty<string>(ApprovalTemplate.PROPERTY_NAME_NAME);
    }

    /** 设置-审批流程名称 */
    set name(value: string) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_NAME, value);
    }

    /** 映射的属性名称-审批的对象类型 */
    private static PROPERTY_NAME_APPROVALOBJECTCODE: string = "_approvalObjectCode";

    /** 获取-审批的对象类型 */
    get approvalObjectCode(): string {
        return this.getProperty<string>(ApprovalTemplate.PROPERTY_NAME_APPROVALOBJECTCODE);
    }

    /** 设置-审批的对象类型 */
    set approvalObjectCode(value: string) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_APPROVALOBJECTCODE, value);
    }

    /** 映射的属性名称-激活的 */
    private static PROPERTY_NAME_ACTIVATED: string = "_activated";

    /** 获取-激活的 */
    get activated(): emYesNo {
        return this.getProperty<emYesNo>(ApprovalTemplate.PROPERTY_NAME_ACTIVATED);
    }

    /** 设置-激活的 */
    set activated(value: emYesNo) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_ACTIVATED, value);
    }

    /** 映射的属性名称-生效日期 */
    private static PROPERTY_NAME_VALIDDATE: string = "_validDate";

    /** 获取-生效日期 */
    get validDate(): Date {
        return this.getProperty<Date>(ApprovalTemplate.PROPERTY_NAME_VALIDDATE);
    }

    /** 设置-生效日期 */
    set validDate(value: Date) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_VALIDDATE, value);
    }

    /** 映射的属性名称-失效日期 */
    private static PROPERTY_NAME_INVALIDDATE: string = "_invalidDate";

    /** 获取-失效日期 */
    get invalidDate(): Date {
        return this.getProperty<Date>(ApprovalTemplate.PROPERTY_NAME_INVALIDDATE);
    }

    /** 设置-失效日期 */
    set invalidDate(value: Date) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_INVALIDDATE, value);
    }


    /** 映射的属性名称-审批模板步骤集合 */
    private static PROPERTY_NAME_APPROVALPROCESSSTEPTEMPLATES: string = "_approvalProcessStepTemplates";

    /** 获取-审批模板步骤集合 */
    get approvalProcessStepTemplates(): ApprovalProcessStepTemplates {
        return this.getProperty<ApprovalProcessStepTemplates>(ApprovalTemplate.PROPERTY_NAME_APPROVALPROCESSSTEPTEMPLATES);
    }

    /** 设置-审批模板步骤集合 */
    set approvalProcessStepTemplates(value: ApprovalProcessStepTemplates) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_APPROVALPROCESSSTEPTEMPLATES, value);
    }

    /** 映射的属性名称-审批流程步骤条件集合 */
    private static PROPERTY_NAME_APPROVALPROCESSSTEPCONDITIONTEMPLATES: string = "_approvalProcessStepConditionTemplates";

    /** 获取-审批流程步骤条件集合 */
    get approvalProcessStepConditionTemplates(): ApprovalProcessStepConditionTemplates {
        return this.getProperty<ApprovalProcessStepConditionTemplates>(ApprovalTemplate.PROPERTY_NAME_APPROVALPROCESSSTEPCONDITIONTEMPLATES);
    }

    /** 设置-审批流程步骤条件集合 */
    set approvalProcessStepConditionTemplates(value: ApprovalProcessStepConditionTemplates) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_APPROVALPROCESSSTEPCONDITIONTEMPLATES, value);
    }


    /** 初始化数据 */
    protected init(): void {
        this.approvalProcessStepTemplates = new ApprovalProcessStepTemplates(this);
        this.approvalProcessStepConditionTemplates = new ApprovalProcessStepConditionTemplates(this);
        this.objectCode = ApprovalTemplate.BUSINESS_OBJECT_CODE;
    }
}

/** 审批模板步骤 */
export class ApprovalProcessStepTemplate extends BusinessObject<ApprovalProcessStepTemplate> implements IApprovalProcessStepTemplate {

    constructor() {
        super();
    }

    /** 映射的属性名称-编号 */
    private static PROPERTY_NAME_OBJECTKEY: string = "_objectKey";

    /** 获取-编号 */
    get objectKey(): number {
        return this.getProperty<number>(ApprovalProcessStepTemplate.PROPERTY_NAME_OBJECTKEY);
    }

    /** 设置-编号 */
    set objectKey(value: number) {
        this.setProperty(ApprovalProcessStepTemplate.PROPERTY_NAME_OBJECTKEY, value);
    }

    /** 映射的属性名称-类型 */
    private static PROPERTY_NAME_OBJECTCODE: string = "_objectCode";

    /** 获取-类型 */
    get objectCode(): string {
        return this.getProperty<string>(ApprovalProcessStepTemplate.PROPERTY_NAME_OBJECTCODE);
    }

    /** 设置-类型 */
    set objectCode(value: string) {
        this.setProperty(ApprovalProcessStepTemplate.PROPERTY_NAME_OBJECTCODE, value);
    }

    /** 映射的属性名称-行号 */
    private static PROPERTY_NAME_LINEID: string = "_lineId";

    /** 获取-行号 */
    get lineId(): number {
        return this.getProperty<number>(ApprovalProcessStepTemplate.PROPERTY_NAME_LINEID);
    }

    /** 设置-行号 */
    set lineId(value: number) {
        this.setProperty(ApprovalProcessStepTemplate.PROPERTY_NAME_LINEID, value);
    }

    /** 映射的属性名称-实例号（版本） */
    private static PROPERTY_NAME_LOGINST: string = "_logInst";

    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(ApprovalProcessStepTemplate.PROPERTY_NAME_LOGINST);
    }

    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(ApprovalProcessStepTemplate.PROPERTY_NAME_LOGINST, value);
    }

    /** 映射的属性名称-数据源 */
    private static PROPERTY_NAME_DATASOURCE: string = "_dataSource";

    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(ApprovalProcessStepTemplate.PROPERTY_NAME_DATASOURCE);
    }

    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(ApprovalProcessStepTemplate.PROPERTY_NAME_DATASOURCE, value);
    }

    /** 映射的属性名称-创建日期 */
    private static PROPERTY_NAME_CREATEDATE: string = "_createDate";

    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(ApprovalProcessStepTemplate.PROPERTY_NAME_CREATEDATE);
    }

    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(ApprovalProcessStepTemplate.PROPERTY_NAME_CREATEDATE, value);
    }

    /** 映射的属性名称-创建时间 */
    private static PROPERTY_NAME_CREATETIME: string = "_createTime";

    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(ApprovalProcessStepTemplate.PROPERTY_NAME_CREATETIME);
    }

    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(ApprovalProcessStepTemplate.PROPERTY_NAME_CREATETIME, value);
    }

    /** 映射的属性名称-修改日期 */
    private static PROPERTY_NAME_UPDATEDATE: string = "_updateDate";

    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(ApprovalProcessStepTemplate.PROPERTY_NAME_UPDATEDATE);
    }

    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(ApprovalProcessStepTemplate.PROPERTY_NAME_UPDATEDATE, value);
    }

    /** 映射的属性名称-修改时间 */
    private static PROPERTY_NAME_UPDATETIME: string = "_updateTime";

    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(ApprovalProcessStepTemplate.PROPERTY_NAME_UPDATETIME);
    }

    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(ApprovalProcessStepTemplate.PROPERTY_NAME_UPDATETIME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    private static PROPERTY_NAME_CREATEACTIONID: string = "_createActionId";

    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(ApprovalProcessStepTemplate.PROPERTY_NAME_CREATEACTIONID);
    }

    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(ApprovalProcessStepTemplate.PROPERTY_NAME_CREATEACTIONID, value);
    }

    /** 映射的属性名称-更新动作标识 */
    private static PROPERTY_NAME_UPDATEACTIONID: string = "_updateActionId";

    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(ApprovalProcessStepTemplate.PROPERTY_NAME_UPDATEACTIONID);
    }

    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(ApprovalProcessStepTemplate.PROPERTY_NAME_UPDATEACTIONID, value);
    }

    /** 映射的属性名称-创建用户 */
    private static PROPERTY_NAME_CREATEUSERSIGN: string = "_createUserSign";

    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(ApprovalProcessStepTemplate.PROPERTY_NAME_CREATEUSERSIGN);
    }

    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(ApprovalProcessStepTemplate.PROPERTY_NAME_CREATEUSERSIGN, value);
    }

    /** 映射的属性名称-修改用户 */
    private static PROPERTY_NAME_UPDATEUSERSIGN: string = "_updateUserSign";

    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(ApprovalProcessStepTemplate.PROPERTY_NAME_UPDATEUSERSIGN);
    }

    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(ApprovalProcessStepTemplate.PROPERTY_NAME_UPDATEUSERSIGN, value);
    }

    /** 映射的属性名称-参考1 */
    private static PROPERTY_NAME_REFERENCE1: string = "_reference1";

    /** 获取-参考1 */
    get reference1(): string {
        return this.getProperty<string>(ApprovalProcessStepTemplate.PROPERTY_NAME_REFERENCE1);
    }

    /** 设置-参考1 */
    set reference1(value: string) {
        this.setProperty(ApprovalProcessStepTemplate.PROPERTY_NAME_REFERENCE1, value);
    }

    /** 映射的属性名称-参考2 */
    private static PROPERTY_NAME_REFERENCE2: string = "_reference2";

    /** 获取-参考2 */
    get reference2(): string {
        return this.getProperty<string>(ApprovalProcessStepTemplate.PROPERTY_NAME_REFERENCE2);
    }

    /** 设置-参考2 */
    set reference2(value: string) {
        this.setProperty(ApprovalProcessStepTemplate.PROPERTY_NAME_REFERENCE2, value);
    }

    /** 映射的属性名称-步骤名称 */
    private static PROPERTY_NAME_STEPNAME: string = "_stepName";

    /** 获取-步骤名称 */
    get stepName(): string {
        return this.getProperty<string>(ApprovalProcessStepTemplate.PROPERTY_NAME_STEPNAME);
    }

    /** 设置-步骤名称 */
    set stepName(value: string) {
        this.setProperty(ApprovalProcessStepTemplate.PROPERTY_NAME_STEPNAME, value);
    }

    /** 映射的属性名称-步骤所有者类型 */
    private static PROPERTY_NAME_STEPOWNERTYPE: string = "_stepOwnerType";

    /** 获取-步骤所有者类型 */
    get stepOwnerType(): emApprovalStepOwnerType {
        return this.getProperty<emApprovalStepOwnerType>(ApprovalProcessStepTemplate.PROPERTY_NAME_STEPOWNERTYPE);
    }

    /** 设置-步骤所有者类型 */
    set stepOwnerType(value: emApprovalStepOwnerType) {
        this.setProperty(ApprovalProcessStepTemplate.PROPERTY_NAME_STEPOWNERTYPE, value);
    }

    /** 映射的属性名称-步骤所有者 */
    private static PROPERTY_NAME_STEPOWNER: string = "_stepOwner";

    /** 获取-步骤所有者 */
    get stepOwner(): number {
        return this.getProperty<number>(ApprovalProcessStepTemplate.PROPERTY_NAME_STEPOWNER);
    }

    /** 设置-步骤所有者 */
    set stepOwner(value: number) {
        this.setProperty(ApprovalProcessStepTemplate.PROPERTY_NAME_STEPOWNER, value);
    }

    /** 映射的属性名称-步骤执行顺序 */
    private static PROPERTY_NAME_STEPORDER: string = "_stepOrder";

    /** 获取-步骤执行顺序 */
    get stepOrder(): number {
        return this.getProperty<number>(ApprovalProcessStepTemplate.PROPERTY_NAME_STEPORDER);
    }

    /** 设置-步骤执行顺序 */
    set stepOrder(value: number) {
        this.setProperty(ApprovalProcessStepTemplate.PROPERTY_NAME_STEPORDER, value);
    }

    /** 映射的属性名称-步骤所有者可修改 */
    private static PROPERTY_NAME_STEPCANMODIFY: string = "_stepCanModify";

    /** 获取-步骤所有者可修改 */
    get stepCanModify(): emYesNo {
        return this.getProperty<emYesNo>(ApprovalProcessStepTemplate.PROPERTY_NAME_STEPCANMODIFY);
    }

    /** 设置-步骤所有者可修改 */
    set stepCanModify(value: emYesNo) {
        this.setProperty(ApprovalProcessStepTemplate.PROPERTY_NAME_STEPCANMODIFY, value);
    }


    /** 初始化数据 */
    protected init(): void {
    }
}

/** 审批模板步骤 集合 */
export class ApprovalProcessStepTemplates extends BusinessObjects<ApprovalProcessStepTemplate, ApprovalTemplate> implements IApprovalProcessStepTemplates {

    /** 创建并添加子项 */
    create(): ApprovalProcessStepTemplate {
        let item = new ApprovalProcessStepTemplate();
        this.add(item);
        return item;
    }

}
/** 审批流程步骤条件 */
export class ApprovalProcessStepConditionTemplate extends BusinessObject<ApprovalProcessStepConditionTemplate> implements IApprovalProcessStepConditionTemplate {

    constructor() {
        super();
    }

    /** 映射的属性名称-编号 */
    private static PROPERTY_NAME_OBJECTKEY: string = "_objectKey";

    /** 获取-编号 */
    get objectKey(): number {
        return this.getProperty<number>(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_OBJECTKEY);
    }

    /** 设置-编号 */
    set objectKey(value: number) {
        this.setProperty(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_OBJECTKEY, value);
    }

    /** 映射的属性名称-类型 */
    private static PROPERTY_NAME_OBJECTCODE: string = "_objectCode";

    /** 获取-类型 */
    get objectCode(): string {
        return this.getProperty<string>(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_OBJECTCODE);
    }

    /** 设置-类型 */
    set objectCode(value: string) {
        this.setProperty(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_OBJECTCODE, value);
    }

    /** 映射的属性名称-行号 */
    private static PROPERTY_NAME_LINEID: string = "_lineId";

    /** 获取-行号 */
    get lineId(): number {
        return this.getProperty<number>(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_LINEID);
    }

    /** 设置-行号 */
    set lineId(value: number) {
        this.setProperty(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_LINEID, value);
    }

    /** 映射的属性名称-步骤行号 */
    private static PROPERTY_NAME_STEPLINEID: string = "_stepLineId";

    /** 获取-步骤行号 */
    get stepLineId(): number {
        return this.getProperty<number>(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_STEPLINEID);
    }

    /** 设置-步骤行号 */
    set stepLineId(value: number) {
        this.setProperty(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_STEPLINEID, value);
    }

    /** 映射的属性名称-实例号（版本） */
    private static PROPERTY_NAME_LOGINST: string = "_logInst";

    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_LOGINST);
    }

    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_LOGINST, value);
    }

    /** 映射的属性名称-数据源 */
    private static PROPERTY_NAME_DATASOURCE: string = "_dataSource";

    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_DATASOURCE);
    }

    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_DATASOURCE, value);
    }

    /** 映射的属性名称-创建日期 */
    private static PROPERTY_NAME_CREATEDATE: string = "_createDate";

    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_CREATEDATE);
    }

    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_CREATEDATE, value);
    }

    /** 映射的属性名称-创建时间 */
    private static PROPERTY_NAME_CREATETIME: string = "_createTime";

    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_CREATETIME);
    }

    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_CREATETIME, value);
    }

    /** 映射的属性名称-修改日期 */
    private static PROPERTY_NAME_UPDATEDATE: string = "_updateDate";

    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_UPDATEDATE);
    }

    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_UPDATEDATE, value);
    }

    /** 映射的属性名称-修改时间 */
    private static PROPERTY_NAME_UPDATETIME: string = "_updateTime";

    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_UPDATETIME);
    }

    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_UPDATETIME, value);
    }

    /** 映射的属性名称-创建用户 */
    private static PROPERTY_NAME_CREATEUSERSIGN: string = "_createUserSign";

    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_CREATEUSERSIGN);
    }

    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_CREATEUSERSIGN, value);
    }

    /** 映射的属性名称-修改用户 */
    private static PROPERTY_NAME_UPDATEUSERSIGN: string = "_updateUserSign";

    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_UPDATEUSERSIGN);
    }

    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_UPDATEUSERSIGN, value);
    }

    /** 映射的属性名称-创建动作标识 */
    private static PROPERTY_NAME_CREATEACTIONID: string = "_createActionId";

    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_CREATEACTIONID);
    }

    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_CREATEACTIONID, value);
    }

    /** 映射的属性名称-更新动作标识 */
    private static PROPERTY_NAME_UPDATEACTIONID: string = "_updateActionId";

    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_UPDATEACTIONID);
    }

    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_UPDATEACTIONID, value);
    }

    /** 映射的属性名称-参考1 */
    private static PROPERTY_NAME_REFERENCE1: string = "_reference1";

    /** 获取-参考1 */
    get reference1(): string {
        return this.getProperty<string>(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_REFERENCE1);
    }

    /** 设置-参考1 */
    set reference1(value: string) {
        this.setProperty(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_REFERENCE1, value);
    }

    /** 映射的属性名称-参考2 */
    private static PROPERTY_NAME_REFERENCE2: string = "_reference2";

    /** 获取-参考2 */
    get reference2(): string {
        return this.getProperty<string>(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_REFERENCE2);
    }

    /** 设置-参考2 */
    set reference2(value: string) {
        this.setProperty(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_REFERENCE2, value);
    }

    /** 映射的属性名称-取值属性 */
    private static PROPERTY_NAME_PROPERTYNAME: string = "_propertyName";

    /** 获取-取值属性 */
    get propertyName(): string {
        return this.getProperty<string>(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_PROPERTYNAME);
    }

    /** 设置-取值属性 */
    set propertyName(value: string) {
        this.setProperty(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_PROPERTYNAME, value);
    }

    /** 映射的属性名称-比较的值 */
    private static PROPERTY_NAME_CONDITIONVALUE: string = "_conditionValue";

    /** 获取-比较的值 */
    get conditionValue(): string {
        return this.getProperty<string>(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_CONDITIONVALUE);
    }

    /** 设置-比较的值 */
    set conditionValue(value: string) {
        this.setProperty(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_CONDITIONVALUE, value);
    }

    /** 映射的属性名称-比较的方法 */
    private static PROPERTY_NAME_OPERATION: string = "_operation";

    /** 获取-比较的方法 */
    get operation(): emConditionOperation {
        return this.getProperty<emConditionOperation>(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_OPERATION);
    }

    /** 设置-比较的方法 */
    set operation(value: emConditionOperation) {
        this.setProperty(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_OPERATION, value);
    }

    /** 映射的属性名称-与上一个条件的关系 */
    private static PROPERTY_NAME_RELATIONSHIP: string = "_relationship";

    /** 获取-与上一个条件的关系 */
    get relationship(): emConditionRelationship {
        return this.getProperty<emConditionRelationship>(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_RELATIONSHIP);
    }

    /** 设置-与上一个条件的关系 */
    set relationship(value: emConditionRelationship) {
        this.setProperty(ApprovalProcessStepConditionTemplate.PROPERTY_NAME_RELATIONSHIP, value);
    }


    /** 初始化数据 */
    protected init(): void {
    }
}

/** 审批流程步骤条件 集合 */
export class ApprovalProcessStepConditionTemplates extends BusinessObjects<ApprovalProcessStepConditionTemplate, ApprovalTemplate> implements IApprovalProcessStepConditionTemplates {

    /** 创建并添加子项 */
    create(): ApprovalProcessStepConditionTemplate {
        let item = new ApprovalProcessStepConditionTemplate();
        this.add(item);
        return item;
    }

}


