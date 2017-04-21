define(["require", "exports", "ibas/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApprovalRequest extends index_1.BOSimple {
        constructor() {
            super();
        }
        get objectKey() {
            return this.getProperty(ApprovalRequest.PROPERTY_OBJECTKEY_NAME);
        }
        set objectKey(value) {
            this.setProperty(ApprovalRequest.PROPERTY_OBJECTKEY_NAME, value);
        }
        get objectCode() {
            return this.getProperty(ApprovalRequest.PROPERTY_OBJECTCODE_NAME);
        }
        set objectCode(value) {
            this.setProperty(ApprovalRequest.PROPERTY_OBJECTCODE_NAME, value);
        }
        get logInst() {
            return this.getProperty(ApprovalRequest.PROPERTY_LOGINST_NAME);
        }
        set logInst(value) {
            this.setProperty(ApprovalRequest.PROPERTY_LOGINST_NAME, value);
        }
        get series() {
            return this.getProperty(ApprovalRequest.PROPERTY_SERIES_NAME);
        }
        set series(value) {
            this.setProperty(ApprovalRequest.PROPERTY_SERIES_NAME, value);
        }
        get dataSource() {
            return this.getProperty(ApprovalRequest.PROPERTY_DATASOURCE_NAME);
        }
        set dataSource(value) {
            this.setProperty(ApprovalRequest.PROPERTY_DATASOURCE_NAME, value);
        }
        get createDate() {
            return this.getProperty(ApprovalRequest.PROPERTY_CREATEDATE_NAME);
        }
        set createDate(value) {
            this.setProperty(ApprovalRequest.PROPERTY_CREATEDATE_NAME, value);
        }
        get createTime() {
            return this.getProperty(ApprovalRequest.PROPERTY_CREATETIME_NAME);
        }
        set createTime(value) {
            this.setProperty(ApprovalRequest.PROPERTY_CREATETIME_NAME, value);
        }
        get updateDate() {
            return this.getProperty(ApprovalRequest.PROPERTY_UPDATEDATE_NAME);
        }
        set updateDate(value) {
            this.setProperty(ApprovalRequest.PROPERTY_UPDATEDATE_NAME, value);
        }
        get updateTime() {
            return this.getProperty(ApprovalRequest.PROPERTY_UPDATETIME_NAME);
        }
        set updateTime(value) {
            this.setProperty(ApprovalRequest.PROPERTY_UPDATETIME_NAME, value);
        }
        get createActionId() {
            return this.getProperty(ApprovalRequest.PROPERTY_CREATEACTIONID_NAME);
        }
        set createActionId(value) {
            this.setProperty(ApprovalRequest.PROPERTY_CREATEACTIONID_NAME, value);
        }
        get updateActionId() {
            return this.getProperty(ApprovalRequest.PROPERTY_UPDATEACTIONID_NAME);
        }
        set updateActionId(value) {
            this.setProperty(ApprovalRequest.PROPERTY_UPDATEACTIONID_NAME, value);
        }
        get createUserSign() {
            return this.getProperty(ApprovalRequest.PROPERTY_CREATEUSERSIGN_NAME);
        }
        set createUserSign(value) {
            this.setProperty(ApprovalRequest.PROPERTY_CREATEUSERSIGN_NAME, value);
        }
        get updateUserSign() {
            return this.getProperty(ApprovalRequest.PROPERTY_UPDATEUSERSIGN_NAME);
        }
        set updateUserSign(value) {
            this.setProperty(ApprovalRequest.PROPERTY_UPDATEUSERSIGN_NAME, value);
        }
        get dataOwner() {
            return this.getProperty(ApprovalRequest.PROPERTY_DATAOWNER_NAME);
        }
        set dataOwner(value) {
            this.setProperty(ApprovalRequest.PROPERTY_DATAOWNER_NAME, value);
        }
        get reference1() {
            return this.getProperty(ApprovalRequest.PROPERTY_REFERENCE1_NAME);
        }
        set reference1(value) {
            this.setProperty(ApprovalRequest.PROPERTY_REFERENCE1_NAME, value);
        }
        get reference2() {
            return this.getProperty(ApprovalRequest.PROPERTY_REFERENCE2_NAME);
        }
        set reference2(value) {
            this.setProperty(ApprovalRequest.PROPERTY_REFERENCE2_NAME, value);
        }
        get remarks() {
            return this.getProperty(ApprovalRequest.PROPERTY_REMARKS_NAME);
        }
        set remarks(value) {
            this.setProperty(ApprovalRequest.PROPERTY_REMARKS_NAME, value);
        }
        get name() {
            return this.getProperty(ApprovalRequest.PROPERTY_NAME_NAME);
        }
        set name(value) {
            this.setProperty(ApprovalRequest.PROPERTY_NAME_NAME, value);
        }
        get approvalObjectCode() {
            return this.getProperty(ApprovalRequest.PROPERTY_APPROVALOBJECTCODE_NAME);
        }
        set approvalObjectCode(value) {
            this.setProperty(ApprovalRequest.PROPERTY_APPROVALOBJECTCODE_NAME, value);
        }
        get activated() {
            return this.getProperty(ApprovalRequest.PROPERTY_ACTIVATED_NAME);
        }
        set activated(value) {
            this.setProperty(ApprovalRequest.PROPERTY_ACTIVATED_NAME, value);
        }
        get approvalTemplate() {
            return this.getProperty(ApprovalRequest.PROPERTY_APPROVALTEMPLATE_NAME);
        }
        set approvalTemplate(value) {
            this.setProperty(ApprovalRequest.PROPERTY_APPROVALTEMPLATE_NAME, value);
        }
        get bOKeys() {
            return this.getProperty(ApprovalRequest.PROPERTY_BOKEYS_NAME);
        }
        set bOKeys(value) {
            this.setProperty(ApprovalRequest.PROPERTY_BOKEYS_NAME, value);
        }
        get approvalStatus() {
            return this.getProperty(ApprovalRequest.PROPERTY_APPROVALSTATUS_NAME);
        }
        set approvalStatus(value) {
            this.setProperty(ApprovalRequest.PROPERTY_APPROVALSTATUS_NAME, value);
        }
        get approvalOwner() {
            return this.getProperty(ApprovalRequest.PROPERTY_APPROVALOWNER_NAME);
        }
        set approvalOwner(value) {
            this.setProperty(ApprovalRequest.PROPERTY_APPROVALOWNER_NAME, value);
        }
        get startedTime() {
            return this.getProperty(ApprovalRequest.PROPERTY_STARTEDTIME_NAME);
        }
        set startedTime(value) {
            this.setProperty(ApprovalRequest.PROPERTY_STARTEDTIME_NAME, value);
        }
        get finishedTime() {
            return this.getProperty(ApprovalRequest.PROPERTY_FINISHEDTIME_NAME);
        }
        set finishedTime(value) {
            this.setProperty(ApprovalRequest.PROPERTY_FINISHEDTIME_NAME, value);
        }
        get className() {
            return this.getProperty(ApprovalRequest.PROPERTY_CLASSNAME_NAME);
        }
        set className(value) {
            this.setProperty(ApprovalRequest.PROPERTY_CLASSNAME_NAME, value);
        }
        get approvalRequestSteps() {
            return this.getProperty(ApprovalRequest.PROPERTY_APPROVALREQUESTSTEPS_NAME);
        }
        set approvalRequestSteps(value) {
            this.setProperty(ApprovalRequest.PROPERTY_APPROVALREQUESTSTEPS_NAME, value);
        }
        init() {
            this.approvalRequestSteps = new ApprovalRequestSteps(this);
            this.objectCode = ApprovalRequest.BUSINESS_OBJECT_CODE;
        }
    }
    ApprovalRequest.BUSINESS_OBJECT_CODE = "CC_AP_APPROVALREQU";
    ApprovalRequest.PROPERTY_OBJECTKEY_NAME = "ObjectKey";
    ApprovalRequest.PROPERTY_OBJECTCODE_NAME = "ObjectCode";
    ApprovalRequest.PROPERTY_LOGINST_NAME = "LogInst";
    ApprovalRequest.PROPERTY_SERIES_NAME = "Series";
    ApprovalRequest.PROPERTY_DATASOURCE_NAME = "DataSource";
    ApprovalRequest.PROPERTY_CREATEDATE_NAME = "CreateDate";
    ApprovalRequest.PROPERTY_CREATETIME_NAME = "CreateTime";
    ApprovalRequest.PROPERTY_UPDATEDATE_NAME = "UpdateDate";
    ApprovalRequest.PROPERTY_UPDATETIME_NAME = "UpdateTime";
    ApprovalRequest.PROPERTY_CREATEACTIONID_NAME = "CreateActionId";
    ApprovalRequest.PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";
    ApprovalRequest.PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";
    ApprovalRequest.PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";
    ApprovalRequest.PROPERTY_DATAOWNER_NAME = "DataOwner";
    ApprovalRequest.PROPERTY_REFERENCE1_NAME = "Reference1";
    ApprovalRequest.PROPERTY_REFERENCE2_NAME = "Reference2";
    ApprovalRequest.PROPERTY_REMARKS_NAME = "Remarks";
    ApprovalRequest.PROPERTY_NAME_NAME = "Name";
    ApprovalRequest.PROPERTY_APPROVALOBJECTCODE_NAME = "ApprovalObjectCode";
    ApprovalRequest.PROPERTY_ACTIVATED_NAME = "Activated";
    ApprovalRequest.PROPERTY_APPROVALTEMPLATE_NAME = "ApprovalTemplate";
    ApprovalRequest.PROPERTY_BOKEYS_NAME = "BOKeys";
    ApprovalRequest.PROPERTY_APPROVALSTATUS_NAME = "ApprovalStatus";
    ApprovalRequest.PROPERTY_APPROVALOWNER_NAME = "ApprovalOwner";
    ApprovalRequest.PROPERTY_STARTEDTIME_NAME = "StartedTime";
    ApprovalRequest.PROPERTY_FINISHEDTIME_NAME = "FinishedTime";
    ApprovalRequest.PROPERTY_CLASSNAME_NAME = "ClassName";
    ApprovalRequest.PROPERTY_APPROVALREQUESTSTEPS_NAME = "ApprovalRequestSteps";
    exports.ApprovalRequest = ApprovalRequest;
    class ApprovalRequestStep extends index_1.BOSimpleLine {
        constructor() {
            super();
        }
        get objectKey() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_OBJECTKEY_NAME);
        }
        set objectKey(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_OBJECTKEY_NAME, value);
        }
        get objectCode() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_OBJECTCODE_NAME);
        }
        set objectCode(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_OBJECTCODE_NAME, value);
        }
        get lineId() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_LINEID_NAME);
        }
        set lineId(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_LINEID_NAME, value);
        }
        get logInst() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_LOGINST_NAME);
        }
        set logInst(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_LOGINST_NAME, value);
        }
        get dataSource() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_DATASOURCE_NAME);
        }
        set dataSource(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_DATASOURCE_NAME, value);
        }
        get createDate() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_CREATEDATE_NAME);
        }
        set createDate(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_CREATEDATE_NAME, value);
        }
        get createTime() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_CREATETIME_NAME);
        }
        set createTime(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_CREATETIME_NAME, value);
        }
        get updateDate() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_UPDATEDATE_NAME);
        }
        set updateDate(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_UPDATEDATE_NAME, value);
        }
        get updateTime() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_UPDATETIME_NAME);
        }
        set updateTime(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_UPDATETIME_NAME, value);
        }
        get createUserSign() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_CREATEUSERSIGN_NAME);
        }
        set createUserSign(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_CREATEUSERSIGN_NAME, value);
        }
        get updateUserSign() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_UPDATEUSERSIGN_NAME);
        }
        set updateUserSign(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_UPDATEUSERSIGN_NAME, value);
        }
        get createActionId() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_CREATEACTIONID_NAME);
        }
        set createActionId(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_CREATEACTIONID_NAME, value);
        }
        get updateActionId() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_UPDATEACTIONID_NAME);
        }
        set updateActionId(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_UPDATEACTIONID_NAME, value);
        }
        get reference1() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_REFERENCE1_NAME);
        }
        set reference1(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_REFERENCE1_NAME, value);
        }
        get reference2() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_REFERENCE2_NAME);
        }
        set reference2(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_REFERENCE2_NAME, value);
        }
        get stepName() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_STEPNAME_NAME);
        }
        set stepName(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_STEPNAME_NAME, value);
        }
        get stepOwner() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_STEPOWNER_NAME);
        }
        set stepOwner(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_STEPOWNER_NAME, value);
        }
        get stepOrder() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_STEPORDER_NAME);
        }
        set stepOrder(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_STEPORDER_NAME, value);
        }
        get stepStatus() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_STEPSTATUS_NAME);
        }
        set stepStatus(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_STEPSTATUS_NAME, value);
        }
        get stepConditions() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_STEPCONDITIONS_NAME);
        }
        set stepConditions(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_STEPCONDITIONS_NAME, value);
        }
        get startedTime() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_STARTEDTIME_NAME);
        }
        set startedTime(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_STARTEDTIME_NAME, value);
        }
        get finishedTime() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_FINISHEDTIME_NAME);
        }
        set finishedTime(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_FINISHEDTIME_NAME, value);
        }
        get judgment() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_JUDGMENT_NAME);
        }
        set judgment(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_JUDGMENT_NAME, value);
        }
        get stepCanModify() {
            return this.getProperty(ApprovalRequestStep.PROPERTY_STEPCANMODIFY_NAME);
        }
        set stepCanModify(value) {
            this.setProperty(ApprovalRequestStep.PROPERTY_STEPCANMODIFY_NAME, value);
        }
        init() {
        }
    }
    ApprovalRequestStep.PROPERTY_OBJECTKEY_NAME = "ObjectKey";
    ApprovalRequestStep.PROPERTY_OBJECTCODE_NAME = "ObjectCode";
    ApprovalRequestStep.PROPERTY_LINEID_NAME = "LineId";
    ApprovalRequestStep.PROPERTY_LOGINST_NAME = "LogInst";
    ApprovalRequestStep.PROPERTY_DATASOURCE_NAME = "DataSource";
    ApprovalRequestStep.PROPERTY_CREATEDATE_NAME = "CreateDate";
    ApprovalRequestStep.PROPERTY_CREATETIME_NAME = "CreateTime";
    ApprovalRequestStep.PROPERTY_UPDATEDATE_NAME = "UpdateDate";
    ApprovalRequestStep.PROPERTY_UPDATETIME_NAME = "UpdateTime";
    ApprovalRequestStep.PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";
    ApprovalRequestStep.PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";
    ApprovalRequestStep.PROPERTY_CREATEACTIONID_NAME = "CreateActionId";
    ApprovalRequestStep.PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";
    ApprovalRequestStep.PROPERTY_REFERENCE1_NAME = "Reference1";
    ApprovalRequestStep.PROPERTY_REFERENCE2_NAME = "Reference2";
    ApprovalRequestStep.PROPERTY_STEPNAME_NAME = "StepName";
    ApprovalRequestStep.PROPERTY_STEPOWNER_NAME = "StepOwner";
    ApprovalRequestStep.PROPERTY_STEPORDER_NAME = "StepOrder";
    ApprovalRequestStep.PROPERTY_STEPSTATUS_NAME = "StepStatus";
    ApprovalRequestStep.PROPERTY_STEPCONDITIONS_NAME = "StepConditions";
    ApprovalRequestStep.PROPERTY_STARTEDTIME_NAME = "StartedTime";
    ApprovalRequestStep.PROPERTY_FINISHEDTIME_NAME = "FinishedTime";
    ApprovalRequestStep.PROPERTY_JUDGMENT_NAME = "Judgment";
    ApprovalRequestStep.PROPERTY_STEPCANMODIFY_NAME = "StepCanModify";
    exports.ApprovalRequestStep = ApprovalRequestStep;
    class ApprovalRequestSteps extends index_1.BusinessObjects {
        create() {
            let item = new ApprovalRequestStep();
            this.add(item);
            return item;
        }
    }
    exports.ApprovalRequestSteps = ApprovalRequestSteps;
});
