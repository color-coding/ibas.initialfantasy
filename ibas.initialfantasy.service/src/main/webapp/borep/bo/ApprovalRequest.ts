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
    emApprovalStepStatus,
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
    IApprovalRequest,
    IApprovalRequestStep,
    IApprovalRequestSteps,
    BO_CODE_APPROVALREQUEST
} from "../../api/index";

/** 审批请求 */
export class ApprovalRequest extends BOSimple<ApprovalRequest> implements IApprovalRequest {

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_APPROVALREQUEST;
    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-编号 */
    static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
    /** 获取-编号 */
    get objectKey(): number {
        return this.getProperty<number>(ApprovalRequest.PROPERTY_OBJECTKEY_NAME);
    }
    /** 设置-编号 */
    set objectKey(value: number) {
        this.setProperty(ApprovalRequest.PROPERTY_OBJECTKEY_NAME, value);
    }

    /** 映射的属性名称-类型 */
    static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
    /** 获取-类型 */
    get objectCode(): string {
        return this.getProperty<string>(ApprovalRequest.PROPERTY_OBJECTCODE_NAME);
    }
    /** 设置-类型 */
    set objectCode(value: string) {
        this.setProperty(ApprovalRequest.PROPERTY_OBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-实例号（版本） */
    static PROPERTY_LOGINST_NAME: string = "LogInst";
    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(ApprovalRequest.PROPERTY_LOGINST_NAME);
    }
    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(ApprovalRequest.PROPERTY_LOGINST_NAME, value);
    }

    /** 映射的属性名称-服务系列 */
    static PROPERTY_SERIES_NAME: string = "Series";
    /** 获取-服务系列 */
    get series(): number {
        return this.getProperty<number>(ApprovalRequest.PROPERTY_SERIES_NAME);
    }
    /** 设置-服务系列 */
    set series(value: number) {
        this.setProperty(ApprovalRequest.PROPERTY_SERIES_NAME, value);
    }

    /** 映射的属性名称-数据源 */
    static PROPERTY_DATASOURCE_NAME: string = "DataSource";
    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(ApprovalRequest.PROPERTY_DATASOURCE_NAME);
    }
    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(ApprovalRequest.PROPERTY_DATASOURCE_NAME, value);
    }

    /** 映射的属性名称-创建日期 */
    static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(ApprovalRequest.PROPERTY_CREATEDATE_NAME);
    }
    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(ApprovalRequest.PROPERTY_CREATEDATE_NAME, value);
    }

    /** 映射的属性名称-创建时间 */
    static PROPERTY_CREATETIME_NAME: string = "CreateTime";
    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(ApprovalRequest.PROPERTY_CREATETIME_NAME);
    }
    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(ApprovalRequest.PROPERTY_CREATETIME_NAME, value);
    }

    /** 映射的属性名称-修改日期 */
    static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(ApprovalRequest.PROPERTY_UPDATEDATE_NAME);
    }
    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(ApprovalRequest.PROPERTY_UPDATEDATE_NAME, value);
    }

    /** 映射的属性名称-修改时间 */
    static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(ApprovalRequest.PROPERTY_UPDATETIME_NAME);
    }
    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(ApprovalRequest.PROPERTY_UPDATETIME_NAME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(ApprovalRequest.PROPERTY_CREATEACTIONID_NAME);
    }
    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(ApprovalRequest.PROPERTY_CREATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-更新动作标识 */
    static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(ApprovalRequest.PROPERTY_UPDATEACTIONID_NAME);
    }
    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(ApprovalRequest.PROPERTY_UPDATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-创建用户 */
    static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(ApprovalRequest.PROPERTY_CREATEUSERSIGN_NAME);
    }
    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(ApprovalRequest.PROPERTY_CREATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-修改用户 */
    static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(ApprovalRequest.PROPERTY_UPDATEUSERSIGN_NAME);
    }
    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(ApprovalRequest.PROPERTY_UPDATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-数据所有者 */
    static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
    /** 获取-数据所有者 */
    get dataOwner(): number {
        return this.getProperty<number>(ApprovalRequest.PROPERTY_DATAOWNER_NAME);
    }
    /** 设置-数据所有者 */
    set dataOwner(value: number) {
        this.setProperty(ApprovalRequest.PROPERTY_DATAOWNER_NAME, value);
    }

    /** 映射的属性名称-参考1 */
    static PROPERTY_REFERENCE1_NAME: string = "Reference1";
    /** 获取-参考1 */
    get reference1(): string {
        return this.getProperty<string>(ApprovalRequest.PROPERTY_REFERENCE1_NAME);
    }
    /** 设置-参考1 */
    set reference1(value: string) {
        this.setProperty(ApprovalRequest.PROPERTY_REFERENCE1_NAME, value);
    }

    /** 映射的属性名称-参考2 */
    static PROPERTY_REFERENCE2_NAME: string = "Reference2";
    /** 获取-参考2 */
    get reference2(): string {
        return this.getProperty<string>(ApprovalRequest.PROPERTY_REFERENCE2_NAME);
    }
    /** 设置-参考2 */
    set reference2(value: string) {
        this.setProperty(ApprovalRequest.PROPERTY_REFERENCE2_NAME, value);
    }

    /** 映射的属性名称-备注 */
    static PROPERTY_REMARKS_NAME: string = "Remarks";
    /** 获取-备注 */
    get remarks(): string {
        return this.getProperty<string>(ApprovalRequest.PROPERTY_REMARKS_NAME);
    }
    /** 设置-备注 */
    set remarks(value: string) {
        this.setProperty(ApprovalRequest.PROPERTY_REMARKS_NAME, value);
    }

    /** 映射的属性名称-审批请求名称 */
    static PROPERTY_NAME_NAME: string = "Name";
    /** 获取-审批请求名称 */
    get name(): string {
        return this.getProperty<string>(ApprovalRequest.PROPERTY_NAME_NAME);
    }
    /** 设置-审批请求名称 */
    set name(value: string) {
        this.setProperty(ApprovalRequest.PROPERTY_NAME_NAME, value);
    }

    /** 映射的属性名称-审批的对象类型 */
    static PROPERTY_APPROVALOBJECTCODE_NAME: string = "ApprovalObjectCode";
    /** 获取-审批的对象类型 */
    get approvalObjectCode(): string {
        return this.getProperty<string>(ApprovalRequest.PROPERTY_APPROVALOBJECTCODE_NAME);
    }
    /** 设置-审批的对象类型 */
    set approvalObjectCode(value: string) {
        this.setProperty(ApprovalRequest.PROPERTY_APPROVALOBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-激活的 */
    static PROPERTY_ACTIVATED_NAME: string = "Activated";
    /** 获取-激活的 */
    get activated(): emYesNo {
        return this.getProperty<emYesNo>(ApprovalRequest.PROPERTY_ACTIVATED_NAME);
    }
    /** 设置-激活的 */
    set activated(value: emYesNo) {
        this.setProperty(ApprovalRequest.PROPERTY_ACTIVATED_NAME, value);
    }

    /** 映射的属性名称-审批模板 */
    static PROPERTY_APPROVALTEMPLATE_NAME: string = "ApprovalTemplate";
    /** 获取-审批模板 */
    get approvalTemplate(): number {
        return this.getProperty<number>(ApprovalRequest.PROPERTY_APPROVALTEMPLATE_NAME);
    }
    /** 设置-审批模板 */
    set approvalTemplate(value: number) {
        this.setProperty(ApprovalRequest.PROPERTY_APPROVALTEMPLATE_NAME, value);
    }

    /** 映射的属性名称-业务对象标识 */
    static PROPERTY_BOKEYS_NAME: string = "BOKeys";
    /** 获取-业务对象标识 */
    get bOKeys(): string {
        return this.getProperty<string>(ApprovalRequest.PROPERTY_BOKEYS_NAME);
    }
    /** 设置-业务对象标识 */
    set bOKeys(value: string) {
        this.setProperty(ApprovalRequest.PROPERTY_BOKEYS_NAME, value);
    }

    /** 映射的属性名称-审批状态 */
    static PROPERTY_APPROVALSTATUS_NAME: string = "ApprovalStatus";
    /** 获取-审批状态 */
    get approvalStatus(): emApprovalStatus {
        return this.getProperty<emApprovalStatus>(ApprovalRequest.PROPERTY_APPROVALSTATUS_NAME);
    }
    /** 设置-审批状态 */
    set approvalStatus(value: emApprovalStatus) {
        this.setProperty(ApprovalRequest.PROPERTY_APPROVALSTATUS_NAME, value);
    }

    /** 映射的属性名称-审批所有者 */
    static PROPERTY_APPROVALOWNER_NAME: string = "ApprovalOwner";
    /** 获取-审批所有者 */
    get approvalOwner(): number {
        return this.getProperty<number>(ApprovalRequest.PROPERTY_APPROVALOWNER_NAME);
    }
    /** 设置-审批所有者 */
    set approvalOwner(value: number) {
        this.setProperty(ApprovalRequest.PROPERTY_APPROVALOWNER_NAME, value);
    }

    /** 映射的属性名称-开始时间 */
    static PROPERTY_STARTEDTIME_NAME: string = "StartedTime";
    /** 获取-开始时间 */
    get startedTime(): Date {
        return this.getProperty<Date>(ApprovalRequest.PROPERTY_STARTEDTIME_NAME);
    }
    /** 设置-开始时间 */
    set startedTime(value: Date) {
        this.setProperty(ApprovalRequest.PROPERTY_STARTEDTIME_NAME, value);
    }

    /** 映射的属性名称-结束时间 */
    static PROPERTY_FINISHEDTIME_NAME: string = "FinishedTime";
    /** 获取-结束时间 */
    get finishedTime(): Date {
        return this.getProperty<Date>(ApprovalRequest.PROPERTY_FINISHEDTIME_NAME);
    }
    /** 设置-结束时间 */
    set finishedTime(value: Date) {
        this.setProperty(ApprovalRequest.PROPERTY_FINISHEDTIME_NAME, value);
    }

    /** 映射的属性名称-语言类型 */
    static PROPERTY_CLASSNAME_NAME: string = "ClassName";
    /** 获取-语言类型 */
    get className(): string {
        return this.getProperty<string>(ApprovalRequest.PROPERTY_CLASSNAME_NAME);
    }
    /** 设置-语言类型 */
    set className(value: string) {
        this.setProperty(ApprovalRequest.PROPERTY_CLASSNAME_NAME, value);
    }


    /** 映射的属性名称-审批请求步骤集合 */
    static PROPERTY_APPROVALREQUESTSTEPS_NAME: string = "ApprovalRequestSteps";
    /** 获取-审批请求步骤集合 */
    get approvalRequestSteps(): ApprovalRequestSteps {
        return this.getProperty<ApprovalRequestSteps>(ApprovalRequest.PROPERTY_APPROVALREQUESTSTEPS_NAME);
    }
    /** 设置-审批请求步骤集合 */
    set approvalRequestSteps(value: ApprovalRequestSteps) {
        this.setProperty(ApprovalRequest.PROPERTY_APPROVALREQUESTSTEPS_NAME, value);
    }


    /** 初始化数据 */
    protected init(): void {
        this.approvalRequestSteps = new ApprovalRequestSteps(this);
        this.objectCode = config.applyVariables(ApprovalRequest.BUSINESS_OBJECT_CODE);
    }
}

/** 审批请求步骤 */
export class ApprovalRequestStep extends BOSimpleLine<ApprovalRequestStep> implements IApprovalRequestStep {

    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-编号 */
    static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
    /** 获取-编号 */
    get objectKey(): number {
        return this.getProperty<number>(ApprovalRequestStep.PROPERTY_OBJECTKEY_NAME);
    }
    /** 设置-编号 */
    set objectKey(value: number) {
        this.setProperty(ApprovalRequestStep.PROPERTY_OBJECTKEY_NAME, value);
    }

    /** 映射的属性名称-类型 */
    static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
    /** 获取-类型 */
    get objectCode(): string {
        return this.getProperty<string>(ApprovalRequestStep.PROPERTY_OBJECTCODE_NAME);
    }
    /** 设置-类型 */
    set objectCode(value: string) {
        this.setProperty(ApprovalRequestStep.PROPERTY_OBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-行号 */
    static PROPERTY_LINEID_NAME: string = "LineId";
    /** 获取-行号 */
    get lineId(): number {
        return this.getProperty<number>(ApprovalRequestStep.PROPERTY_LINEID_NAME);
    }
    /** 设置-行号 */
    set lineId(value: number) {
        this.setProperty(ApprovalRequestStep.PROPERTY_LINEID_NAME, value);
    }

    /** 映射的属性名称-实例号（版本） */
    static PROPERTY_LOGINST_NAME: string = "LogInst";
    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(ApprovalRequestStep.PROPERTY_LOGINST_NAME);
    }
    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(ApprovalRequestStep.PROPERTY_LOGINST_NAME, value);
    }

    /** 映射的属性名称-数据源 */
    static PROPERTY_DATASOURCE_NAME: string = "DataSource";
    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(ApprovalRequestStep.PROPERTY_DATASOURCE_NAME);
    }
    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(ApprovalRequestStep.PROPERTY_DATASOURCE_NAME, value);
    }

    /** 映射的属性名称-创建日期 */
    static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(ApprovalRequestStep.PROPERTY_CREATEDATE_NAME);
    }
    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(ApprovalRequestStep.PROPERTY_CREATEDATE_NAME, value);
    }

    /** 映射的属性名称-创建时间 */
    static PROPERTY_CREATETIME_NAME: string = "CreateTime";
    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(ApprovalRequestStep.PROPERTY_CREATETIME_NAME);
    }
    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(ApprovalRequestStep.PROPERTY_CREATETIME_NAME, value);
    }

    /** 映射的属性名称-修改日期 */
    static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(ApprovalRequestStep.PROPERTY_UPDATEDATE_NAME);
    }
    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(ApprovalRequestStep.PROPERTY_UPDATEDATE_NAME, value);
    }

    /** 映射的属性名称-修改时间 */
    static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(ApprovalRequestStep.PROPERTY_UPDATETIME_NAME);
    }
    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(ApprovalRequestStep.PROPERTY_UPDATETIME_NAME, value);
    }

    /** 映射的属性名称-创建用户 */
    static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(ApprovalRequestStep.PROPERTY_CREATEUSERSIGN_NAME);
    }
    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(ApprovalRequestStep.PROPERTY_CREATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-修改用户 */
    static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(ApprovalRequestStep.PROPERTY_UPDATEUSERSIGN_NAME);
    }
    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(ApprovalRequestStep.PROPERTY_UPDATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(ApprovalRequestStep.PROPERTY_CREATEACTIONID_NAME);
    }
    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(ApprovalRequestStep.PROPERTY_CREATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-更新动作标识 */
    static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(ApprovalRequestStep.PROPERTY_UPDATEACTIONID_NAME);
    }
    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(ApprovalRequestStep.PROPERTY_UPDATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-参考1 */
    static PROPERTY_REFERENCE1_NAME: string = "Reference1";
    /** 获取-参考1 */
    get reference1(): string {
        return this.getProperty<string>(ApprovalRequestStep.PROPERTY_REFERENCE1_NAME);
    }
    /** 设置-参考1 */
    set reference1(value: string) {
        this.setProperty(ApprovalRequestStep.PROPERTY_REFERENCE1_NAME, value);
    }

    /** 映射的属性名称-参考2 */
    static PROPERTY_REFERENCE2_NAME: string = "Reference2";
    /** 获取-参考2 */
    get reference2(): string {
        return this.getProperty<string>(ApprovalRequestStep.PROPERTY_REFERENCE2_NAME);
    }
    /** 设置-参考2 */
    set reference2(value: string) {
        this.setProperty(ApprovalRequestStep.PROPERTY_REFERENCE2_NAME, value);
    }

    /** 映射的属性名称-步骤名称 */
    static PROPERTY_STEPNAME_NAME: string = "StepName";
    /** 获取-步骤名称 */
    get stepName(): string {
        return this.getProperty<string>(ApprovalRequestStep.PROPERTY_STEPNAME_NAME);
    }
    /** 设置-步骤名称 */
    set stepName(value: string) {
        this.setProperty(ApprovalRequestStep.PROPERTY_STEPNAME_NAME, value);
    }

    /** 映射的属性名称-步骤所有者 */
    static PROPERTY_STEPOWNER_NAME: string = "StepOwner";
    /** 获取-步骤所有者 */
    get stepOwner(): number {
        return this.getProperty<number>(ApprovalRequestStep.PROPERTY_STEPOWNER_NAME);
    }
    /** 设置-步骤所有者 */
    set stepOwner(value: number) {
        this.setProperty(ApprovalRequestStep.PROPERTY_STEPOWNER_NAME, value);
    }

    /** 映射的属性名称-步骤执行顺序 */
    static PROPERTY_STEPORDER_NAME: string = "StepOrder";
    /** 获取-步骤执行顺序 */
    get stepOrder(): number {
        return this.getProperty<number>(ApprovalRequestStep.PROPERTY_STEPORDER_NAME);
    }
    /** 设置-步骤执行顺序 */
    set stepOrder(value: number) {
        this.setProperty(ApprovalRequestStep.PROPERTY_STEPORDER_NAME, value);
    }

    /** 映射的属性名称-步骤状态 */
    static PROPERTY_STEPSTATUS_NAME: string = "StepStatus";
    /** 获取-步骤状态 */
    get stepStatus(): emApprovalStepStatus {
        return this.getProperty<emApprovalStepStatus>(ApprovalRequestStep.PROPERTY_STEPSTATUS_NAME);
    }
    /** 设置-步骤状态 */
    set stepStatus(value: emApprovalStepStatus) {
        this.setProperty(ApprovalRequestStep.PROPERTY_STEPSTATUS_NAME, value);
    }

    /** 映射的属性名称-步骤条件 */
    static PROPERTY_STEPCONDITIONS_NAME: string = "StepConditions";
    /** 获取-步骤条件 */
    get stepConditions(): string {
        return this.getProperty<string>(ApprovalRequestStep.PROPERTY_STEPCONDITIONS_NAME);
    }
    /** 设置-步骤条件 */
    set stepConditions(value: string) {
        this.setProperty(ApprovalRequestStep.PROPERTY_STEPCONDITIONS_NAME, value);
    }

    /** 映射的属性名称-开始时间 */
    static PROPERTY_STARTEDTIME_NAME: string = "StartedTime";
    /** 获取-开始时间 */
    get startedTime(): Date {
        return this.getProperty<Date>(ApprovalRequestStep.PROPERTY_STARTEDTIME_NAME);
    }
    /** 设置-开始时间 */
    set startedTime(value: Date) {
        this.setProperty(ApprovalRequestStep.PROPERTY_STARTEDTIME_NAME, value);
    }

    /** 映射的属性名称-结束时间 */
    static PROPERTY_FINISHEDTIME_NAME: string = "FinishedTime";
    /** 获取-结束时间 */
    get finishedTime(): Date {
        return this.getProperty<Date>(ApprovalRequestStep.PROPERTY_FINISHEDTIME_NAME);
    }
    /** 设置-结束时间 */
    set finishedTime(value: Date) {
        this.setProperty(ApprovalRequestStep.PROPERTY_FINISHEDTIME_NAME, value);
    }

    /** 映射的属性名称-审批意见 */
    static PROPERTY_JUDGMENT_NAME: string = "Judgment";
    /** 获取-审批意见 */
    get judgment(): string {
        return this.getProperty<string>(ApprovalRequestStep.PROPERTY_JUDGMENT_NAME);
    }
    /** 设置-审批意见 */
    set judgment(value: string) {
        this.setProperty(ApprovalRequestStep.PROPERTY_JUDGMENT_NAME, value);
    }

    /** 映射的属性名称-步骤所有者可修改 */
    static PROPERTY_STEPCANMODIFY_NAME: string = "StepCanModify";
    /** 获取-步骤所有者可修改 */
    get stepCanModify(): emYesNo {
        return this.getProperty<emYesNo>(ApprovalRequestStep.PROPERTY_STEPCANMODIFY_NAME);
    }
    /** 设置-步骤所有者可修改 */
    set stepCanModify(value: emYesNo) {
        this.setProperty(ApprovalRequestStep.PROPERTY_STEPCANMODIFY_NAME, value);
    }


    /** 初始化数据 */
    protected init(): void {
    }
}

/** 审批请求步骤 集合 */
export class ApprovalRequestSteps extends BusinessObjects<ApprovalRequestStep, ApprovalRequest> implements IApprovalRequestSteps {

    /** 创建并添加子项 */
    create(): ApprovalRequestStep {
        let item: ApprovalRequestStep = new ApprovalRequestStep();
        this.add(item);
        return item;
    }
}
