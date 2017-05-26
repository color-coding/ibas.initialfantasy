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
    emApprovalStepOwnerType,
    IApprovalTemplate,
    IApprovalTemplateStep,
    IApprovalTemplateSteps,
    BO_CODE_APPROVALTEMPLATE
} from "../../api/index";

/** 审批模板 */
export class ApprovalTemplate extends BOSimple<ApprovalTemplate> implements IApprovalTemplate {

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_APPROVALTEMPLATE;
    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-编号 */
    static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
    /** 获取-编号 */
    get objectKey(): number {
        return this.getProperty<number>(ApprovalTemplate.PROPERTY_OBJECTKEY_NAME);
    }
    /** 设置-编号 */
    set objectKey(value: number) {
        this.setProperty(ApprovalTemplate.PROPERTY_OBJECTKEY_NAME, value);
    }

    /** 映射的属性名称-类型 */
    static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
    /** 获取-类型 */
    get objectCode(): string {
        return this.getProperty<string>(ApprovalTemplate.PROPERTY_OBJECTCODE_NAME);
    }
    /** 设置-类型 */
    set objectCode(value: string) {
        this.setProperty(ApprovalTemplate.PROPERTY_OBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-实例号（版本） */
    static PROPERTY_LOGINST_NAME: string = "LogInst";
    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(ApprovalTemplate.PROPERTY_LOGINST_NAME);
    }
    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(ApprovalTemplate.PROPERTY_LOGINST_NAME, value);
    }

    /** 映射的属性名称-服务系列 */
    static PROPERTY_SERIES_NAME: string = "Series";
    /** 获取-服务系列 */
    get series(): number {
        return this.getProperty<number>(ApprovalTemplate.PROPERTY_SERIES_NAME);
    }
    /** 设置-服务系列 */
    set series(value: number) {
        this.setProperty(ApprovalTemplate.PROPERTY_SERIES_NAME, value);
    }

    /** 映射的属性名称-数据源 */
    static PROPERTY_DATASOURCE_NAME: string = "DataSource";
    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(ApprovalTemplate.PROPERTY_DATASOURCE_NAME);
    }
    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(ApprovalTemplate.PROPERTY_DATASOURCE_NAME, value);
    }

    /** 映射的属性名称-创建日期 */
    static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(ApprovalTemplate.PROPERTY_CREATEDATE_NAME);
    }
    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(ApprovalTemplate.PROPERTY_CREATEDATE_NAME, value);
    }

    /** 映射的属性名称-创建时间 */
    static PROPERTY_CREATETIME_NAME: string = "CreateTime";
    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(ApprovalTemplate.PROPERTY_CREATETIME_NAME);
    }
    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(ApprovalTemplate.PROPERTY_CREATETIME_NAME, value);
    }

    /** 映射的属性名称-修改日期 */
    static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(ApprovalTemplate.PROPERTY_UPDATEDATE_NAME);
    }
    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(ApprovalTemplate.PROPERTY_UPDATEDATE_NAME, value);
    }

    /** 映射的属性名称-修改时间 */
    static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(ApprovalTemplate.PROPERTY_UPDATETIME_NAME);
    }
    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(ApprovalTemplate.PROPERTY_UPDATETIME_NAME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(ApprovalTemplate.PROPERTY_CREATEACTIONID_NAME);
    }
    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(ApprovalTemplate.PROPERTY_CREATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-更新动作标识 */
    static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(ApprovalTemplate.PROPERTY_UPDATEACTIONID_NAME);
    }
    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(ApprovalTemplate.PROPERTY_UPDATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-创建用户 */
    static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(ApprovalTemplate.PROPERTY_CREATEUSERSIGN_NAME);
    }
    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(ApprovalTemplate.PROPERTY_CREATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-修改用户 */
    static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(ApprovalTemplate.PROPERTY_UPDATEUSERSIGN_NAME);
    }
    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(ApprovalTemplate.PROPERTY_UPDATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-数据所有者 */
    static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
    /** 获取-数据所有者 */
    get dataOwner(): number {
        return this.getProperty<number>(ApprovalTemplate.PROPERTY_DATAOWNER_NAME);
    }
    /** 设置-数据所有者 */
    set dataOwner(value: number) {
        this.setProperty(ApprovalTemplate.PROPERTY_DATAOWNER_NAME, value);
    }

    /** 映射的属性名称-数据所属组织 */
    static PROPERTY_ORGANIZATION_NAME: string = "Organization";
    /** 获取-数据所属组织 */
    get organization(): string {
        return this.getProperty<string>(ApprovalTemplate.PROPERTY_ORGANIZATION_NAME);
    }
    /** 设置-数据所属组织 */
    set organization(value: string) {
        this.setProperty(ApprovalTemplate.PROPERTY_ORGANIZATION_NAME, value);
    }

    /** 映射的属性名称-参考1 */
    static PROPERTY_REFERENCE1_NAME: string = "Reference1";
    /** 获取-参考1 */
    get reference1(): string {
        return this.getProperty<string>(ApprovalTemplate.PROPERTY_REFERENCE1_NAME);
    }
    /** 设置-参考1 */
    set reference1(value: string) {
        this.setProperty(ApprovalTemplate.PROPERTY_REFERENCE1_NAME, value);
    }

    /** 映射的属性名称-参考2 */
    static PROPERTY_REFERENCE2_NAME: string = "Reference2";
    /** 获取-参考2 */
    get reference2(): string {
        return this.getProperty<string>(ApprovalTemplate.PROPERTY_REFERENCE2_NAME);
    }
    /** 设置-参考2 */
    set reference2(value: string) {
        this.setProperty(ApprovalTemplate.PROPERTY_REFERENCE2_NAME, value);
    }

    /** 映射的属性名称-备注 */
    static PROPERTY_REMARKS_NAME: string = "Remarks";
    /** 获取-备注 */
    get remarks(): string {
        return this.getProperty<string>(ApprovalTemplate.PROPERTY_REMARKS_NAME);
    }
    /** 设置-备注 */
    set remarks(value: string) {
        this.setProperty(ApprovalTemplate.PROPERTY_REMARKS_NAME, value);
    }

    /** 映射的属性名称-审批流程名称 */
    static PROPERTY_NAME_NAME: string = "Name";
    /** 获取-审批流程名称 */
    get name(): string {
        return this.getProperty<string>(ApprovalTemplate.PROPERTY_NAME_NAME);
    }
    /** 设置-审批流程名称 */
    set name(value: string) {
        this.setProperty(ApprovalTemplate.PROPERTY_NAME_NAME, value);
    }

    /** 映射的属性名称-审批的对象类型 */
    static PROPERTY_APPROVALOBJECTCODE_NAME: string = "ApprovalObjectCode";
    /** 获取-审批的对象类型 */
    get approvalObjectCode(): string {
        return this.getProperty<string>(ApprovalTemplate.PROPERTY_APPROVALOBJECTCODE_NAME);
    }
    /** 设置-审批的对象类型 */
    set approvalObjectCode(value: string) {
        this.setProperty(ApprovalTemplate.PROPERTY_APPROVALOBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-激活的 */
    static PROPERTY_ACTIVATED_NAME: string = "Activated";
    /** 获取-激活的 */
    get activated(): emYesNo {
        return this.getProperty<emYesNo>(ApprovalTemplate.PROPERTY_ACTIVATED_NAME);
    }
    /** 设置-激活的 */
    set activated(value: emYesNo) {
        this.setProperty(ApprovalTemplate.PROPERTY_ACTIVATED_NAME, value);
    }

    /** 映射的属性名称-生效日期 */
    static PROPERTY_VALIDDATE_NAME: string = "ValidDate";
    /** 获取-生效日期 */
    get validDate(): Date {
        return this.getProperty<Date>(ApprovalTemplate.PROPERTY_VALIDDATE_NAME);
    }
    /** 设置-生效日期 */
    set validDate(value: Date) {
        this.setProperty(ApprovalTemplate.PROPERTY_VALIDDATE_NAME, value);
    }

    /** 映射的属性名称-失效日期 */
    static PROPERTY_INVALIDDATE_NAME: string = "InvalidDate";
    /** 获取-失效日期 */
    get invalidDate(): Date {
        return this.getProperty<Date>(ApprovalTemplate.PROPERTY_INVALIDDATE_NAME);
    }
    /** 设置-失效日期 */
    set invalidDate(value: Date) {
        this.setProperty(ApprovalTemplate.PROPERTY_INVALIDDATE_NAME, value);
    }


    /** 映射的属性名称-审批模板步骤集合 */
    static PROPERTY_APPROVALTEMPLATESTEPS_NAME: string = "ApprovalTemplateSteps";
    /** 获取-审批模板步骤集合 */
    get approvalTemplateSteps(): ApprovalTemplateSteps {
        return this.getProperty<ApprovalTemplateSteps>(ApprovalTemplate.PROPERTY_APPROVALTEMPLATESTEPS_NAME);
    }
    /** 设置-审批模板步骤集合 */
    set approvalTemplateSteps(value: ApprovalTemplateSteps) {
        this.setProperty(ApprovalTemplate.PROPERTY_APPROVALTEMPLATESTEPS_NAME, value);
    }


    /** 初始化数据 */
    protected init(): void {
        this.approvalTemplateSteps = new ApprovalTemplateSteps(this);
        this.objectCode = config.applyVariables(ApprovalTemplate.BUSINESS_OBJECT_CODE);
    }
}

/** 审批模板步骤 */
export class ApprovalTemplateStep extends BOSimpleLine<ApprovalTemplateStep> implements IApprovalTemplateStep {

    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-编号 */
    static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
    /** 获取-编号 */
    get objectKey(): number {
        return this.getProperty<number>(ApprovalTemplateStep.PROPERTY_OBJECTKEY_NAME);
    }
    /** 设置-编号 */
    set objectKey(value: number) {
        this.setProperty(ApprovalTemplateStep.PROPERTY_OBJECTKEY_NAME, value);
    }

    /** 映射的属性名称-类型 */
    static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
    /** 获取-类型 */
    get objectCode(): string {
        return this.getProperty<string>(ApprovalTemplateStep.PROPERTY_OBJECTCODE_NAME);
    }
    /** 设置-类型 */
    set objectCode(value: string) {
        this.setProperty(ApprovalTemplateStep.PROPERTY_OBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-行号 */
    static PROPERTY_LINEID_NAME: string = "LineId";
    /** 获取-行号 */
    get lineId(): number {
        return this.getProperty<number>(ApprovalTemplateStep.PROPERTY_LINEID_NAME);
    }
    /** 设置-行号 */
    set lineId(value: number) {
        this.setProperty(ApprovalTemplateStep.PROPERTY_LINEID_NAME, value);
    }

    /** 映射的属性名称-实例号（版本） */
    static PROPERTY_LOGINST_NAME: string = "LogInst";
    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(ApprovalTemplateStep.PROPERTY_LOGINST_NAME);
    }
    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(ApprovalTemplateStep.PROPERTY_LOGINST_NAME, value);
    }

    /** 映射的属性名称-数据源 */
    static PROPERTY_DATASOURCE_NAME: string = "DataSource";
    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(ApprovalTemplateStep.PROPERTY_DATASOURCE_NAME);
    }
    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(ApprovalTemplateStep.PROPERTY_DATASOURCE_NAME, value);
    }

    /** 映射的属性名称-创建日期 */
    static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(ApprovalTemplateStep.PROPERTY_CREATEDATE_NAME);
    }
    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(ApprovalTemplateStep.PROPERTY_CREATEDATE_NAME, value);
    }

    /** 映射的属性名称-创建时间 */
    static PROPERTY_CREATETIME_NAME: string = "CreateTime";
    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(ApprovalTemplateStep.PROPERTY_CREATETIME_NAME);
    }
    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(ApprovalTemplateStep.PROPERTY_CREATETIME_NAME, value);
    }

    /** 映射的属性名称-修改日期 */
    static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(ApprovalTemplateStep.PROPERTY_UPDATEDATE_NAME);
    }
    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(ApprovalTemplateStep.PROPERTY_UPDATEDATE_NAME, value);
    }

    /** 映射的属性名称-修改时间 */
    static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(ApprovalTemplateStep.PROPERTY_UPDATETIME_NAME);
    }
    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(ApprovalTemplateStep.PROPERTY_UPDATETIME_NAME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(ApprovalTemplateStep.PROPERTY_CREATEACTIONID_NAME);
    }
    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(ApprovalTemplateStep.PROPERTY_CREATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-更新动作标识 */
    static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(ApprovalTemplateStep.PROPERTY_UPDATEACTIONID_NAME);
    }
    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(ApprovalTemplateStep.PROPERTY_UPDATEACTIONID_NAME, value);
    }

    /** 映射的属性名称-创建用户 */
    static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(ApprovalTemplateStep.PROPERTY_CREATEUSERSIGN_NAME);
    }
    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(ApprovalTemplateStep.PROPERTY_CREATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-修改用户 */
    static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(ApprovalTemplateStep.PROPERTY_UPDATEUSERSIGN_NAME);
    }
    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(ApprovalTemplateStep.PROPERTY_UPDATEUSERSIGN_NAME, value);
    }

    /** 映射的属性名称-参考1 */
    static PROPERTY_REFERENCE1_NAME: string = "Reference1";
    /** 获取-参考1 */
    get reference1(): string {
        return this.getProperty<string>(ApprovalTemplateStep.PROPERTY_REFERENCE1_NAME);
    }
    /** 设置-参考1 */
    set reference1(value: string) {
        this.setProperty(ApprovalTemplateStep.PROPERTY_REFERENCE1_NAME, value);
    }

    /** 映射的属性名称-参考2 */
    static PROPERTY_REFERENCE2_NAME: string = "Reference2";
    /** 获取-参考2 */
    get reference2(): string {
        return this.getProperty<string>(ApprovalTemplateStep.PROPERTY_REFERENCE2_NAME);
    }
    /** 设置-参考2 */
    set reference2(value: string) {
        this.setProperty(ApprovalTemplateStep.PROPERTY_REFERENCE2_NAME, value);
    }

    /** 映射的属性名称-步骤名称 */
    static PROPERTY_STEPNAME_NAME: string = "StepName";
    /** 获取-步骤名称 */
    get stepName(): string {
        return this.getProperty<string>(ApprovalTemplateStep.PROPERTY_STEPNAME_NAME);
    }
    /** 设置-步骤名称 */
    set stepName(value: string) {
        this.setProperty(ApprovalTemplateStep.PROPERTY_STEPNAME_NAME, value);
    }

    /** 映射的属性名称-步骤所有者类型 */
    static PROPERTY_STEPOWNERTYPE_NAME: string = "StepOwnerType";
    /** 获取-步骤所有者类型 */
    get stepOwnerType(): emApprovalStepOwnerType {
        return this.getProperty<emApprovalStepOwnerType>(ApprovalTemplateStep.PROPERTY_STEPOWNERTYPE_NAME);
    }
    /** 设置-步骤所有者类型 */
    set stepOwnerType(value: emApprovalStepOwnerType) {
        this.setProperty(ApprovalTemplateStep.PROPERTY_STEPOWNERTYPE_NAME, value);
    }

    /** 映射的属性名称-步骤所有者 */
    static PROPERTY_STEPOWNER_NAME: string = "StepOwner";
    /** 获取-步骤所有者 */
    get stepOwner(): number {
        return this.getProperty<number>(ApprovalTemplateStep.PROPERTY_STEPOWNER_NAME);
    }
    /** 设置-步骤所有者 */
    set stepOwner(value: number) {
        this.setProperty(ApprovalTemplateStep.PROPERTY_STEPOWNER_NAME, value);
    }

    /** 映射的属性名称-步骤执行顺序 */
    static PROPERTY_STEPORDER_NAME: string = "StepOrder";
    /** 获取-步骤执行顺序 */
    get stepOrder(): number {
        return this.getProperty<number>(ApprovalTemplateStep.PROPERTY_STEPORDER_NAME);
    }
    /** 设置-步骤执行顺序 */
    set stepOrder(value: number) {
        this.setProperty(ApprovalTemplateStep.PROPERTY_STEPORDER_NAME, value);
    }

    /** 映射的属性名称-步骤所有者可修改 */
    static PROPERTY_STEPCANMODIFY_NAME: string = "StepCanModify";
    /** 获取-步骤所有者可修改 */
    get stepCanModify(): emYesNo {
        return this.getProperty<emYesNo>(ApprovalTemplateStep.PROPERTY_STEPCANMODIFY_NAME);
    }
    /** 设置-步骤所有者可修改 */
    set stepCanModify(value: emYesNo) {
        this.setProperty(ApprovalTemplateStep.PROPERTY_STEPCANMODIFY_NAME, value);
    }


    /** 初始化数据 */
    protected init(): void {
    }
}

/** 审批模板步骤 集合 */
export class ApprovalTemplateSteps extends BusinessObjects<ApprovalTemplateStep, ApprovalTemplate> implements IApprovalTemplateSteps {

    /** 创建并添加子项 */
    create(): ApprovalTemplateStep {
        let item: ApprovalTemplateStep = new ApprovalTemplateStep();
        this.add(item);
        return item;
    }
}
