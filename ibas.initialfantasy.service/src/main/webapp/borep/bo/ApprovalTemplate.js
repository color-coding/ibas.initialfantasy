define(["require", "exports", "ibas/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApprovalTemplate extends index_1.BOSimple {
        constructor() {
            super();
        }
        get objectKey() {
            return this.getProperty(ApprovalTemplate.PROPERTY_OBJECTKEY_NAME);
        }
        set objectKey(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_OBJECTKEY_NAME, value);
        }
        get objectCode() {
            return this.getProperty(ApprovalTemplate.PROPERTY_OBJECTCODE_NAME);
        }
        set objectCode(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_OBJECTCODE_NAME, value);
        }
        get logInst() {
            return this.getProperty(ApprovalTemplate.PROPERTY_LOGINST_NAME);
        }
        set logInst(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_LOGINST_NAME, value);
        }
        get series() {
            return this.getProperty(ApprovalTemplate.PROPERTY_SERIES_NAME);
        }
        set series(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_SERIES_NAME, value);
        }
        get dataSource() {
            return this.getProperty(ApprovalTemplate.PROPERTY_DATASOURCE_NAME);
        }
        set dataSource(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_DATASOURCE_NAME, value);
        }
        get createDate() {
            return this.getProperty(ApprovalTemplate.PROPERTY_CREATEDATE_NAME);
        }
        set createDate(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_CREATEDATE_NAME, value);
        }
        get createTime() {
            return this.getProperty(ApprovalTemplate.PROPERTY_CREATETIME_NAME);
        }
        set createTime(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_CREATETIME_NAME, value);
        }
        get updateDate() {
            return this.getProperty(ApprovalTemplate.PROPERTY_UPDATEDATE_NAME);
        }
        set updateDate(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_UPDATEDATE_NAME, value);
        }
        get updateTime() {
            return this.getProperty(ApprovalTemplate.PROPERTY_UPDATETIME_NAME);
        }
        set updateTime(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_UPDATETIME_NAME, value);
        }
        get createActionId() {
            return this.getProperty(ApprovalTemplate.PROPERTY_CREATEACTIONID_NAME);
        }
        set createActionId(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_CREATEACTIONID_NAME, value);
        }
        get updateActionId() {
            return this.getProperty(ApprovalTemplate.PROPERTY_UPDATEACTIONID_NAME);
        }
        set updateActionId(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_UPDATEACTIONID_NAME, value);
        }
        get createUserSign() {
            return this.getProperty(ApprovalTemplate.PROPERTY_CREATEUSERSIGN_NAME);
        }
        set createUserSign(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_CREATEUSERSIGN_NAME, value);
        }
        get updateUserSign() {
            return this.getProperty(ApprovalTemplate.PROPERTY_UPDATEUSERSIGN_NAME);
        }
        set updateUserSign(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_UPDATEUSERSIGN_NAME, value);
        }
        get dataOwner() {
            return this.getProperty(ApprovalTemplate.PROPERTY_DATAOWNER_NAME);
        }
        set dataOwner(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_DATAOWNER_NAME, value);
        }
        get organization() {
            return this.getProperty(ApprovalTemplate.PROPERTY_ORGANIZATION_NAME);
        }
        set organization(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_ORGANIZATION_NAME, value);
        }
        get reference1() {
            return this.getProperty(ApprovalTemplate.PROPERTY_REFERENCE1_NAME);
        }
        set reference1(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_REFERENCE1_NAME, value);
        }
        get reference2() {
            return this.getProperty(ApprovalTemplate.PROPERTY_REFERENCE2_NAME);
        }
        set reference2(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_REFERENCE2_NAME, value);
        }
        get remarks() {
            return this.getProperty(ApprovalTemplate.PROPERTY_REMARKS_NAME);
        }
        set remarks(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_REMARKS_NAME, value);
        }
        get name() {
            return this.getProperty(ApprovalTemplate.PROPERTY_NAME_NAME);
        }
        set name(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_NAME_NAME, value);
        }
        get approvalObjectCode() {
            return this.getProperty(ApprovalTemplate.PROPERTY_APPROVALOBJECTCODE_NAME);
        }
        set approvalObjectCode(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_APPROVALOBJECTCODE_NAME, value);
        }
        get activated() {
            return this.getProperty(ApprovalTemplate.PROPERTY_ACTIVATED_NAME);
        }
        set activated(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_ACTIVATED_NAME, value);
        }
        get validDate() {
            return this.getProperty(ApprovalTemplate.PROPERTY_VALIDDATE_NAME);
        }
        set validDate(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_VALIDDATE_NAME, value);
        }
        get invalidDate() {
            return this.getProperty(ApprovalTemplate.PROPERTY_INVALIDDATE_NAME);
        }
        set invalidDate(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_INVALIDDATE_NAME, value);
        }
        get approvalTemplateSteps() {
            return this.getProperty(ApprovalTemplate.PROPERTY_APPROVALTEMPLATESTEPS_NAME);
        }
        set approvalTemplateSteps(value) {
            this.setProperty(ApprovalTemplate.PROPERTY_APPROVALTEMPLATESTEPS_NAME, value);
        }
        init() {
            this.approvalTemplateSteps = new ApprovalTemplateSteps(this);
            this.objectCode = ApprovalTemplate.BUSINESS_OBJECT_CODE;
        }
    }
    ApprovalTemplate.BUSINESS_OBJECT_CODE = "CC_AP_APPROVALTPLT";
    ApprovalTemplate.PROPERTY_OBJECTKEY_NAME = "ObjectKey";
    ApprovalTemplate.PROPERTY_OBJECTCODE_NAME = "ObjectCode";
    ApprovalTemplate.PROPERTY_LOGINST_NAME = "LogInst";
    ApprovalTemplate.PROPERTY_SERIES_NAME = "Series";
    ApprovalTemplate.PROPERTY_DATASOURCE_NAME = "DataSource";
    ApprovalTemplate.PROPERTY_CREATEDATE_NAME = "CreateDate";
    ApprovalTemplate.PROPERTY_CREATETIME_NAME = "CreateTime";
    ApprovalTemplate.PROPERTY_UPDATEDATE_NAME = "UpdateDate";
    ApprovalTemplate.PROPERTY_UPDATETIME_NAME = "UpdateTime";
    ApprovalTemplate.PROPERTY_CREATEACTIONID_NAME = "CreateActionId";
    ApprovalTemplate.PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";
    ApprovalTemplate.PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";
    ApprovalTemplate.PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";
    ApprovalTemplate.PROPERTY_DATAOWNER_NAME = "DataOwner";
    ApprovalTemplate.PROPERTY_ORGANIZATION_NAME = "Organization";
    ApprovalTemplate.PROPERTY_REFERENCE1_NAME = "Reference1";
    ApprovalTemplate.PROPERTY_REFERENCE2_NAME = "Reference2";
    ApprovalTemplate.PROPERTY_REMARKS_NAME = "Remarks";
    ApprovalTemplate.PROPERTY_NAME_NAME = "Name";
    ApprovalTemplate.PROPERTY_APPROVALOBJECTCODE_NAME = "ApprovalObjectCode";
    ApprovalTemplate.PROPERTY_ACTIVATED_NAME = "Activated";
    ApprovalTemplate.PROPERTY_VALIDDATE_NAME = "ValidDate";
    ApprovalTemplate.PROPERTY_INVALIDDATE_NAME = "InvalidDate";
    ApprovalTemplate.PROPERTY_APPROVALTEMPLATESTEPS_NAME = "ApprovalTemplateSteps";
    exports.ApprovalTemplate = ApprovalTemplate;
    class ApprovalTemplateStep extends index_1.BOSimpleLine {
        constructor() {
            super();
        }
        get objectKey() {
            return this.getProperty(ApprovalTemplateStep.PROPERTY_OBJECTKEY_NAME);
        }
        set objectKey(value) {
            this.setProperty(ApprovalTemplateStep.PROPERTY_OBJECTKEY_NAME, value);
        }
        get objectCode() {
            return this.getProperty(ApprovalTemplateStep.PROPERTY_OBJECTCODE_NAME);
        }
        set objectCode(value) {
            this.setProperty(ApprovalTemplateStep.PROPERTY_OBJECTCODE_NAME, value);
        }
        get lineId() {
            return this.getProperty(ApprovalTemplateStep.PROPERTY_LINEID_NAME);
        }
        set lineId(value) {
            this.setProperty(ApprovalTemplateStep.PROPERTY_LINEID_NAME, value);
        }
        get logInst() {
            return this.getProperty(ApprovalTemplateStep.PROPERTY_LOGINST_NAME);
        }
        set logInst(value) {
            this.setProperty(ApprovalTemplateStep.PROPERTY_LOGINST_NAME, value);
        }
        get dataSource() {
            return this.getProperty(ApprovalTemplateStep.PROPERTY_DATASOURCE_NAME);
        }
        set dataSource(value) {
            this.setProperty(ApprovalTemplateStep.PROPERTY_DATASOURCE_NAME, value);
        }
        get createDate() {
            return this.getProperty(ApprovalTemplateStep.PROPERTY_CREATEDATE_NAME);
        }
        set createDate(value) {
            this.setProperty(ApprovalTemplateStep.PROPERTY_CREATEDATE_NAME, value);
        }
        get createTime() {
            return this.getProperty(ApprovalTemplateStep.PROPERTY_CREATETIME_NAME);
        }
        set createTime(value) {
            this.setProperty(ApprovalTemplateStep.PROPERTY_CREATETIME_NAME, value);
        }
        get updateDate() {
            return this.getProperty(ApprovalTemplateStep.PROPERTY_UPDATEDATE_NAME);
        }
        set updateDate(value) {
            this.setProperty(ApprovalTemplateStep.PROPERTY_UPDATEDATE_NAME, value);
        }
        get updateTime() {
            return this.getProperty(ApprovalTemplateStep.PROPERTY_UPDATETIME_NAME);
        }
        set updateTime(value) {
            this.setProperty(ApprovalTemplateStep.PROPERTY_UPDATETIME_NAME, value);
        }
        get createActionId() {
            return this.getProperty(ApprovalTemplateStep.PROPERTY_CREATEACTIONID_NAME);
        }
        set createActionId(value) {
            this.setProperty(ApprovalTemplateStep.PROPERTY_CREATEACTIONID_NAME, value);
        }
        get updateActionId() {
            return this.getProperty(ApprovalTemplateStep.PROPERTY_UPDATEACTIONID_NAME);
        }
        set updateActionId(value) {
            this.setProperty(ApprovalTemplateStep.PROPERTY_UPDATEACTIONID_NAME, value);
        }
        get createUserSign() {
            return this.getProperty(ApprovalTemplateStep.PROPERTY_CREATEUSERSIGN_NAME);
        }
        set createUserSign(value) {
            this.setProperty(ApprovalTemplateStep.PROPERTY_CREATEUSERSIGN_NAME, value);
        }
        get updateUserSign() {
            return this.getProperty(ApprovalTemplateStep.PROPERTY_UPDATEUSERSIGN_NAME);
        }
        set updateUserSign(value) {
            this.setProperty(ApprovalTemplateStep.PROPERTY_UPDATEUSERSIGN_NAME, value);
        }
        get reference1() {
            return this.getProperty(ApprovalTemplateStep.PROPERTY_REFERENCE1_NAME);
        }
        set reference1(value) {
            this.setProperty(ApprovalTemplateStep.PROPERTY_REFERENCE1_NAME, value);
        }
        get reference2() {
            return this.getProperty(ApprovalTemplateStep.PROPERTY_REFERENCE2_NAME);
        }
        set reference2(value) {
            this.setProperty(ApprovalTemplateStep.PROPERTY_REFERENCE2_NAME, value);
        }
        get stepName() {
            return this.getProperty(ApprovalTemplateStep.PROPERTY_STEPNAME_NAME);
        }
        set stepName(value) {
            this.setProperty(ApprovalTemplateStep.PROPERTY_STEPNAME_NAME, value);
        }
        get stepOwnerType() {
            return this.getProperty(ApprovalTemplateStep.PROPERTY_STEPOWNERTYPE_NAME);
        }
        set stepOwnerType(value) {
            this.setProperty(ApprovalTemplateStep.PROPERTY_STEPOWNERTYPE_NAME, value);
        }
        get stepOwner() {
            return this.getProperty(ApprovalTemplateStep.PROPERTY_STEPOWNER_NAME);
        }
        set stepOwner(value) {
            this.setProperty(ApprovalTemplateStep.PROPERTY_STEPOWNER_NAME, value);
        }
        get stepOrder() {
            return this.getProperty(ApprovalTemplateStep.PROPERTY_STEPORDER_NAME);
        }
        set stepOrder(value) {
            this.setProperty(ApprovalTemplateStep.PROPERTY_STEPORDER_NAME, value);
        }
        get stepCanModify() {
            return this.getProperty(ApprovalTemplateStep.PROPERTY_STEPCANMODIFY_NAME);
        }
        set stepCanModify(value) {
            this.setProperty(ApprovalTemplateStep.PROPERTY_STEPCANMODIFY_NAME, value);
        }
        init() {
        }
    }
    ApprovalTemplateStep.PROPERTY_OBJECTKEY_NAME = "ObjectKey";
    ApprovalTemplateStep.PROPERTY_OBJECTCODE_NAME = "ObjectCode";
    ApprovalTemplateStep.PROPERTY_LINEID_NAME = "LineId";
    ApprovalTemplateStep.PROPERTY_LOGINST_NAME = "LogInst";
    ApprovalTemplateStep.PROPERTY_DATASOURCE_NAME = "DataSource";
    ApprovalTemplateStep.PROPERTY_CREATEDATE_NAME = "CreateDate";
    ApprovalTemplateStep.PROPERTY_CREATETIME_NAME = "CreateTime";
    ApprovalTemplateStep.PROPERTY_UPDATEDATE_NAME = "UpdateDate";
    ApprovalTemplateStep.PROPERTY_UPDATETIME_NAME = "UpdateTime";
    ApprovalTemplateStep.PROPERTY_CREATEACTIONID_NAME = "CreateActionId";
    ApprovalTemplateStep.PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";
    ApprovalTemplateStep.PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";
    ApprovalTemplateStep.PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";
    ApprovalTemplateStep.PROPERTY_REFERENCE1_NAME = "Reference1";
    ApprovalTemplateStep.PROPERTY_REFERENCE2_NAME = "Reference2";
    ApprovalTemplateStep.PROPERTY_STEPNAME_NAME = "StepName";
    ApprovalTemplateStep.PROPERTY_STEPOWNERTYPE_NAME = "StepOwnerType";
    ApprovalTemplateStep.PROPERTY_STEPOWNER_NAME = "StepOwner";
    ApprovalTemplateStep.PROPERTY_STEPORDER_NAME = "StepOrder";
    ApprovalTemplateStep.PROPERTY_STEPCANMODIFY_NAME = "StepCanModify";
    exports.ApprovalTemplateStep = ApprovalTemplateStep;
    class ApprovalTemplateSteps extends index_1.BusinessObjects {
        create() {
            let item = new ApprovalTemplateStep();
            this.add(item);
            return item;
        }
    }
    exports.ApprovalTemplateSteps = ApprovalTemplateSteps;
});
