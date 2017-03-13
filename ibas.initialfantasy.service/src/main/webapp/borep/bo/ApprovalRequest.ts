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
    IApprovalRequest,
    IApprovalRequestStep,
    IApprovalRequestSteps,
} from '../../api/approvalrequest/approvalrequest.data.d';

/** 审批记录 */
export class ApprovalRequest extends BusinessObject<ApprovalRequest> implements IApprovalRequest {

    constructor() {
        super();
    }

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = "${Company}AP_APPROVALREQU";

    /** 映射的属性名称-编号 */
    private static PROPERTY_NAME_OBJECTKEY: string = "_objectKey";

    /** 获取-编号 */
    get objectKey(): number {
        return this.getProperty<number>(ApprovalRequest.PROPERTY_NAME_OBJECTKEY);
    }

    /** 设置-编号 */
    set objectKey(value: number) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_OBJECTKEY, value);
    }

    /** 映射的属性名称-类型 */
    private static PROPERTY_NAME_OBJECTCODE: string = "_objectCode";

    /** 获取-类型 */
    get objectCode(): string {
        return this.getProperty<string>(ApprovalRequest.PROPERTY_NAME_OBJECTCODE);
    }

    /** 设置-类型 */
    set objectCode(value: string) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_OBJECTCODE, value);
    }

    /** 映射的属性名称-实例号（版本） */
    private static PROPERTY_NAME_LOGINST: string = "_logInst";

    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(ApprovalRequest.PROPERTY_NAME_LOGINST);
    }

    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_LOGINST, value);
    }

    /** 映射的属性名称-服务系列 */
    private static PROPERTY_NAME_SERIES: string = "_series";

    /** 获取-服务系列 */
    get series(): number {
        return this.getProperty<number>(ApprovalRequest.PROPERTY_NAME_SERIES);
    }

    /** 设置-服务系列 */
    set series(value: number) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_SERIES, value);
    }

    /** 映射的属性名称-数据源 */
    private static PROPERTY_NAME_DATASOURCE: string = "_dataSource";

    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(ApprovalRequest.PROPERTY_NAME_DATASOURCE);
    }

    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_DATASOURCE, value);
    }

    /** 映射的属性名称-创建日期 */
    private static PROPERTY_NAME_CREATEDATE: string = "_createDate";

    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(ApprovalRequest.PROPERTY_NAME_CREATEDATE);
    }

    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_CREATEDATE, value);
    }

    /** 映射的属性名称-创建时间 */
    private static PROPERTY_NAME_CREATETIME: string = "_createTime";

    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(ApprovalRequest.PROPERTY_NAME_CREATETIME);
    }

    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_CREATETIME, value);
    }

    /** 映射的属性名称-修改日期 */
    private static PROPERTY_NAME_UPDATEDATE: string = "_updateDate";

    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(ApprovalRequest.PROPERTY_NAME_UPDATEDATE);
    }

    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_UPDATEDATE, value);
    }

    /** 映射的属性名称-修改时间 */
    private static PROPERTY_NAME_UPDATETIME: string = "_updateTime";

    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(ApprovalRequest.PROPERTY_NAME_UPDATETIME);
    }

    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_UPDATETIME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    private static PROPERTY_NAME_CREATEACTIONID: string = "_createActionId";

    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(ApprovalRequest.PROPERTY_NAME_CREATEACTIONID);
    }

    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_CREATEACTIONID, value);
    }

    /** 映射的属性名称-更新动作标识 */
    private static PROPERTY_NAME_UPDATEACTIONID: string = "_updateActionId";

    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(ApprovalRequest.PROPERTY_NAME_UPDATEACTIONID);
    }

    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_UPDATEACTIONID, value);
    }

    /** 映射的属性名称-创建用户 */
    private static PROPERTY_NAME_CREATEUSERSIGN: string = "_createUserSign";

    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(ApprovalRequest.PROPERTY_NAME_CREATEUSERSIGN);
    }

    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_CREATEUSERSIGN, value);
    }

    /** 映射的属性名称-修改用户 */
    private static PROPERTY_NAME_UPDATEUSERSIGN: string = "_updateUserSign";

    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(ApprovalRequest.PROPERTY_NAME_UPDATEUSERSIGN);
    }

    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_UPDATEUSERSIGN, value);
    }

    /** 映射的属性名称-数据所有者 */
    private static PROPERTY_NAME_DATAOWNER: string = "_dataOwner";

    /** 获取-数据所有者 */
    get dataOwner(): number {
        return this.getProperty<number>(ApprovalRequest.PROPERTY_NAME_DATAOWNER);
    }

    /** 设置-数据所有者 */
    set dataOwner(value: number) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_DATAOWNER, value);
    }

    /** 映射的属性名称-参考1 */
    private static PROPERTY_NAME_REFERENCE1: string = "_reference1";

    /** 获取-参考1 */
    get reference1(): string {
        return this.getProperty<string>(ApprovalRequest.PROPERTY_NAME_REFERENCE1);
    }

    /** 设置-参考1 */
    set reference1(value: string) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_REFERENCE1, value);
    }

    /** 映射的属性名称-参考2 */
    private static PROPERTY_NAME_REFERENCE2: string = "_reference2";

    /** 获取-参考2 */
    get reference2(): string {
        return this.getProperty<string>(ApprovalRequest.PROPERTY_NAME_REFERENCE2);
    }

    /** 设置-参考2 */
    set reference2(value: string) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_REFERENCE2, value);
    }

    /** 映射的属性名称-备注 */
    private static PROPERTY_NAME_REMARKS: string = "_remarks";

    /** 获取-备注 */
    get remarks(): string {
        return this.getProperty<string>(ApprovalRequest.PROPERTY_NAME_REMARKS);
    }

    /** 设置-备注 */
    set remarks(value: string) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_REMARKS, value);
    }

    /** 映射的属性名称-审批请求名称 */
    private static PROPERTY_NAME_NAME: string = "_name";

    /** 获取-审批请求名称 */
    get name(): string {
        return this.getProperty<string>(ApprovalRequest.PROPERTY_NAME_NAME);
    }

    /** 设置-审批请求名称 */
    set name(value: string) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_NAME, value);
    }

    /** 映射的属性名称-审批的对象类型 */
    private static PROPERTY_NAME_APPROVALOBJECTCODE: string = "_approvalObjectCode";

    /** 获取-审批的对象类型 */
    get approvalObjectCode(): string {
        return this.getProperty<string>(ApprovalRequest.PROPERTY_NAME_APPROVALOBJECTCODE);
    }

    /** 设置-审批的对象类型 */
    set approvalObjectCode(value: string) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_APPROVALOBJECTCODE, value);
    }

    /** 映射的属性名称-激活的 */
    private static PROPERTY_NAME_ACTIVATED: string = "_activated";

    /** 获取-激活的 */
    get activated(): emYesNo {
        return this.getProperty<emYesNo>(ApprovalRequest.PROPERTY_NAME_ACTIVATED);
    }

    /** 设置-激活的 */
    set activated(value: emYesNo) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_ACTIVATED, value);
    }

    /** 映射的属性名称-审批模板 */
    private static PROPERTY_NAME_APPROVALTEMPLATE: string = "_approvalTemplate";

    /** 获取-审批模板 */
    get approvalTemplate(): number {
        return this.getProperty<number>(ApprovalRequest.PROPERTY_NAME_APPROVALTEMPLATE);
    }

    /** 设置-审批模板 */
    set approvalTemplate(value: number) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_APPROVALTEMPLATE, value);
    }

    /** 映射的属性名称-业务对象标识 */
    private static PROPERTY_NAME_BOKEYS: string = "_bOKeys";

    /** 获取-业务对象标识 */
    get bOKeys(): string {
        return this.getProperty<string>(ApprovalRequest.PROPERTY_NAME_BOKEYS);
    }

    /** 设置-业务对象标识 */
    set bOKeys(value: string) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_BOKEYS, value);
    }

    /** 映射的属性名称-审批状态 */
    private static PROPERTY_NAME_APPROVALSTATUS: string = "_approvalStatus";

    /** 获取-审批状态 */
    get approvalStatus(): emApprovalStatus {
        return this.getProperty<emApprovalStatus>(ApprovalRequest.PROPERTY_NAME_APPROVALSTATUS);
    }

    /** 设置-审批状态 */
    set approvalStatus(value: emApprovalStatus) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_APPROVALSTATUS, value);
    }

    /** 映射的属性名称-审批所有者 */
    private static PROPERTY_NAME_APPROVALOWNER: string = "_approvalOwner";

    /** 获取-审批所有者 */
    get approvalOwner(): number {
        return this.getProperty<number>(ApprovalRequest.PROPERTY_NAME_APPROVALOWNER);
    }

    /** 设置-审批所有者 */
    set approvalOwner(value: number) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_APPROVALOWNER, value);
    }

    /** 映射的属性名称-开始时间 */
    private static PROPERTY_NAME_STARTEDTIME: string = "_startedTime";

    /** 获取-开始时间 */
    get startedTime(): Date {
        return this.getProperty<Date>(ApprovalRequest.PROPERTY_NAME_STARTEDTIME);
    }

    /** 设置-开始时间 */
    set startedTime(value: Date) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_STARTEDTIME, value);
    }

    /** 映射的属性名称-结束时间 */
    private static PROPERTY_NAME_FINISHEDTIME: string = "_finishedTime";

    /** 获取-结束时间 */
    get finishedTime(): Date {
        return this.getProperty<Date>(ApprovalRequest.PROPERTY_NAME_FINISHEDTIME);
    }

    /** 设置-结束时间 */
    set finishedTime(value: Date) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_FINISHEDTIME, value);
    }

    /** 映射的属性名称-语言类型 */
    private static PROPERTY_NAME_CLASSNAME: string = "_className";

    /** 获取-语言类型 */
    get className(): string {
        return this.getProperty<string>(ApprovalRequest.PROPERTY_NAME_CLASSNAME);
    }

    /** 设置-语言类型 */
    set className(value: string) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_CLASSNAME, value);
    }


    /** 映射的属性名称-审批请求步骤集合 */
    private static PROPERTY_NAME_APPROVALREQUESTSTEPS: string = "_approvalRequestSteps";

    /** 获取-审批请求步骤集合 */
    get approvalRequestSteps(): ApprovalRequestSteps {
        return this.getProperty<ApprovalRequestSteps>(ApprovalRequest.PROPERTY_NAME_APPROVALREQUESTSTEPS);
    }

    /** 设置-审批请求步骤集合 */
    set approvalRequestSteps(value: ApprovalRequestSteps) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_APPROVALREQUESTSTEPS, value);
    }


    /** 初始化数据 */
    protected init(): void {
        this.approvalRequestSteps = new ApprovalRequestSteps(this);
        this.objectCode = ApprovalRequest.BUSINESS_OBJECT_CODE;
    }
}

/** 审批请求步骤 */
export class ApprovalRequestStep extends BusinessObject<ApprovalRequestStep> implements IApprovalRequestStep {

    constructor() {
        super();
    }

    /** 映射的属性名称-编号 */
    private static PROPERTY_NAME_OBJECTKEY: string = "_objectKey";

    /** 获取-编号 */
    get objectKey(): number {
        return this.getProperty<number>(ApprovalRequestStep.PROPERTY_NAME_OBJECTKEY);
    }

    /** 设置-编号 */
    set objectKey(value: number) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_OBJECTKEY, value);
    }

    /** 映射的属性名称-类型 */
    private static PROPERTY_NAME_OBJECTCODE: string = "_objectCode";

    /** 获取-类型 */
    get objectCode(): string {
        return this.getProperty<string>(ApprovalRequestStep.PROPERTY_NAME_OBJECTCODE);
    }

    /** 设置-类型 */
    set objectCode(value: string) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_OBJECTCODE, value);
    }

    /** 映射的属性名称-行号 */
    private static PROPERTY_NAME_LINEID: string = "_lineId";

    /** 获取-行号 */
    get lineId(): number {
        return this.getProperty<number>(ApprovalRequestStep.PROPERTY_NAME_LINEID);
    }

    /** 设置-行号 */
    set lineId(value: number) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_LINEID, value);
    }

    /** 映射的属性名称-实例号（版本） */
    private static PROPERTY_NAME_LOGINST: string = "_logInst";

    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(ApprovalRequestStep.PROPERTY_NAME_LOGINST);
    }

    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_LOGINST, value);
    }

    /** 映射的属性名称-数据源 */
    private static PROPERTY_NAME_DATASOURCE: string = "_dataSource";

    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(ApprovalRequestStep.PROPERTY_NAME_DATASOURCE);
    }

    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_DATASOURCE, value);
    }

    /** 映射的属性名称-创建日期 */
    private static PROPERTY_NAME_CREATEDATE: string = "_createDate";

    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(ApprovalRequestStep.PROPERTY_NAME_CREATEDATE);
    }

    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_CREATEDATE, value);
    }

    /** 映射的属性名称-创建时间 */
    private static PROPERTY_NAME_CREATETIME: string = "_createTime";

    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(ApprovalRequestStep.PROPERTY_NAME_CREATETIME);
    }

    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_CREATETIME, value);
    }

    /** 映射的属性名称-修改日期 */
    private static PROPERTY_NAME_UPDATEDATE: string = "_updateDate";

    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(ApprovalRequestStep.PROPERTY_NAME_UPDATEDATE);
    }

    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_UPDATEDATE, value);
    }

    /** 映射的属性名称-修改时间 */
    private static PROPERTY_NAME_UPDATETIME: string = "_updateTime";

    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(ApprovalRequestStep.PROPERTY_NAME_UPDATETIME);
    }

    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_UPDATETIME, value);
    }

    /** 映射的属性名称-创建用户 */
    private static PROPERTY_NAME_CREATEUSERSIGN: string = "_createUserSign";

    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(ApprovalRequestStep.PROPERTY_NAME_CREATEUSERSIGN);
    }

    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_CREATEUSERSIGN, value);
    }

    /** 映射的属性名称-修改用户 */
    private static PROPERTY_NAME_UPDATEUSERSIGN: string = "_updateUserSign";

    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(ApprovalRequestStep.PROPERTY_NAME_UPDATEUSERSIGN);
    }

    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_UPDATEUSERSIGN, value);
    }

    /** 映射的属性名称-创建动作标识 */
    private static PROPERTY_NAME_CREATEACTIONID: string = "_createActionId";

    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(ApprovalRequestStep.PROPERTY_NAME_CREATEACTIONID);
    }

    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_CREATEACTIONID, value);
    }

    /** 映射的属性名称-更新动作标识 */
    private static PROPERTY_NAME_UPDATEACTIONID: string = "_updateActionId";

    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(ApprovalRequestStep.PROPERTY_NAME_UPDATEACTIONID);
    }

    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_UPDATEACTIONID, value);
    }

    /** 映射的属性名称-参考1 */
    private static PROPERTY_NAME_REFERENCE1: string = "_reference1";

    /** 获取-参考1 */
    get reference1(): string {
        return this.getProperty<string>(ApprovalRequestStep.PROPERTY_NAME_REFERENCE1);
    }

    /** 设置-参考1 */
    set reference1(value: string) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_REFERENCE1, value);
    }

    /** 映射的属性名称-参考2 */
    private static PROPERTY_NAME_REFERENCE2: string = "_reference2";

    /** 获取-参考2 */
    get reference2(): string {
        return this.getProperty<string>(ApprovalRequestStep.PROPERTY_NAME_REFERENCE2);
    }

    /** 设置-参考2 */
    set reference2(value: string) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_REFERENCE2, value);
    }

    /** 映射的属性名称-步骤名称 */
    private static PROPERTY_NAME_STEPNAME: string = "_stepName";

    /** 获取-步骤名称 */
    get stepName(): string {
        return this.getProperty<string>(ApprovalRequestStep.PROPERTY_NAME_STEPNAME);
    }

    /** 设置-步骤名称 */
    set stepName(value: string) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_STEPNAME, value);
    }

    /** 映射的属性名称-步骤所有者 */
    private static PROPERTY_NAME_STEPOWNER: string = "_stepOwner";

    /** 获取-步骤所有者 */
    get stepOwner(): number {
        return this.getProperty<number>(ApprovalRequestStep.PROPERTY_NAME_STEPOWNER);
    }

    /** 设置-步骤所有者 */
    set stepOwner(value: number) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_STEPOWNER, value);
    }

    /** 映射的属性名称-步骤执行顺序 */
    private static PROPERTY_NAME_STEPORDER: string = "_stepOrder";

    /** 获取-步骤执行顺序 */
    get stepOrder(): number {
        return this.getProperty<number>(ApprovalRequestStep.PROPERTY_NAME_STEPORDER);
    }

    /** 设置-步骤执行顺序 */
    set stepOrder(value: number) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_STEPORDER, value);
    }

    /** 映射的属性名称-步骤状态 */
    private static PROPERTY_NAME_STEPSTATUS: string = "_stepStatus";

    /** 获取-步骤状态 */
    get stepStatus(): emApprovalStepStatus {
        return this.getProperty<emApprovalStepStatus>(ApprovalRequestStep.PROPERTY_NAME_STEPSTATUS);
    }

    /** 设置-步骤状态 */
    set stepStatus(value: emApprovalStepStatus) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_STEPSTATUS, value);
    }

    /** 映射的属性名称-步骤条件 */
    private static PROPERTY_NAME_STEPCONDITIONS: string = "_stepConditions";

    /** 获取-步骤条件 */
    get stepConditions(): string {
        return this.getProperty<string>(ApprovalRequestStep.PROPERTY_NAME_STEPCONDITIONS);
    }

    /** 设置-步骤条件 */
    set stepConditions(value: string) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_STEPCONDITIONS, value);
    }

    /** 映射的属性名称-开始时间 */
    private static PROPERTY_NAME_STARTEDTIME: string = "_startedTime";

    /** 获取-开始时间 */
    get startedTime(): Date {
        return this.getProperty<Date>(ApprovalRequestStep.PROPERTY_NAME_STARTEDTIME);
    }

    /** 设置-开始时间 */
    set startedTime(value: Date) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_STARTEDTIME, value);
    }

    /** 映射的属性名称-结束时间 */
    private static PROPERTY_NAME_FINISHEDTIME: string = "_finishedTime";

    /** 获取-结束时间 */
    get finishedTime(): Date {
        return this.getProperty<Date>(ApprovalRequestStep.PROPERTY_NAME_FINISHEDTIME);
    }

    /** 设置-结束时间 */
    set finishedTime(value: Date) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_FINISHEDTIME, value);
    }

    /** 映射的属性名称-审批意见 */
    private static PROPERTY_NAME_JUDGMENT: string = "_judgment";

    /** 获取-审批意见 */
    get judgment(): string {
        return this.getProperty<string>(ApprovalRequestStep.PROPERTY_NAME_JUDGMENT);
    }

    /** 设置-审批意见 */
    set judgment(value: string) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_JUDGMENT, value);
    }

    /** 映射的属性名称-步骤所有者可修改 */
    private static PROPERTY_NAME_STEPCANMODIFY: string = "_stepCanModify";

    /** 获取-步骤所有者可修改 */
    get stepCanModify(): emYesNo {
        return this.getProperty<emYesNo>(ApprovalRequestStep.PROPERTY_NAME_STEPCANMODIFY);
    }

    /** 设置-步骤所有者可修改 */
    set stepCanModify(value: emYesNo) {
        this.setProperty(ApprovalRequestStep.PROPERTY_NAME_STEPCANMODIFY, value);
    }


    /** 初始化数据 */
    protected init(): void {
    }
}

/** 审批请求步骤 集合 */
export class ApprovalRequestSteps extends BusinessObjects<ApprovalRequestStep, ApprovalRequest> implements IApprovalRequestSteps {

    /** 创建并添加子项 */
    create(): ApprovalRequestStep {
        let item = new ApprovalRequestStep();
        this.add(item);
        return item;
    }

}


