define(["require", "exports", "ibas/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApplicationFunction extends index_1.BOSimple {
        constructor() {
            super();
        }
        get moduleId() {
            return this.getProperty(ApplicationFunction.PROPERTY_MODULEID_NAME);
        }
        set moduleId(value) {
            this.setProperty(ApplicationFunction.PROPERTY_MODULEID_NAME, value);
        }
        get functionId() {
            return this.getProperty(ApplicationFunction.PROPERTY_FUNCTIONID_NAME);
        }
        set functionId(value) {
            this.setProperty(ApplicationFunction.PROPERTY_FUNCTIONID_NAME, value);
        }
        get functionName() {
            return this.getProperty(ApplicationFunction.PROPERTY_FUNCTIONNAME_NAME);
        }
        set functionName(value) {
            this.setProperty(ApplicationFunction.PROPERTY_FUNCTIONNAME_NAME, value);
        }
        get objectKey() {
            return this.getProperty(ApplicationFunction.PROPERTY_OBJECTKEY_NAME);
        }
        set objectKey(value) {
            this.setProperty(ApplicationFunction.PROPERTY_OBJECTKEY_NAME, value);
        }
        get objectCode() {
            return this.getProperty(ApplicationFunction.PROPERTY_OBJECTCODE_NAME);
        }
        set objectCode(value) {
            this.setProperty(ApplicationFunction.PROPERTY_OBJECTCODE_NAME, value);
        }
        get dataSource() {
            return this.getProperty(ApplicationFunction.PROPERTY_DATASOURCE_NAME);
        }
        set dataSource(value) {
            this.setProperty(ApplicationFunction.PROPERTY_DATASOURCE_NAME, value);
        }
        get createDate() {
            return this.getProperty(ApplicationFunction.PROPERTY_CREATEDATE_NAME);
        }
        set createDate(value) {
            this.setProperty(ApplicationFunction.PROPERTY_CREATEDATE_NAME, value);
        }
        get createTime() {
            return this.getProperty(ApplicationFunction.PROPERTY_CREATETIME_NAME);
        }
        set createTime(value) {
            this.setProperty(ApplicationFunction.PROPERTY_CREATETIME_NAME, value);
        }
        get updateDate() {
            return this.getProperty(ApplicationFunction.PROPERTY_UPDATEDATE_NAME);
        }
        set updateDate(value) {
            this.setProperty(ApplicationFunction.PROPERTY_UPDATEDATE_NAME, value);
        }
        get updateTime() {
            return this.getProperty(ApplicationFunction.PROPERTY_UPDATETIME_NAME);
        }
        set updateTime(value) {
            this.setProperty(ApplicationFunction.PROPERTY_UPDATETIME_NAME, value);
        }
        get createActionId() {
            return this.getProperty(ApplicationFunction.PROPERTY_CREATEACTIONID_NAME);
        }
        set createActionId(value) {
            this.setProperty(ApplicationFunction.PROPERTY_CREATEACTIONID_NAME, value);
        }
        get updateActionId() {
            return this.getProperty(ApplicationFunction.PROPERTY_UPDATEACTIONID_NAME);
        }
        set updateActionId(value) {
            this.setProperty(ApplicationFunction.PROPERTY_UPDATEACTIONID_NAME, value);
        }
        get logInst() {
            return this.getProperty(ApplicationFunction.PROPERTY_LOGINST_NAME);
        }
        set logInst(value) {
            this.setProperty(ApplicationFunction.PROPERTY_LOGINST_NAME, value);
        }
        get createUserSign() {
            return this.getProperty(ApplicationFunction.PROPERTY_CREATEUSERSIGN_NAME);
        }
        set createUserSign(value) {
            this.setProperty(ApplicationFunction.PROPERTY_CREATEUSERSIGN_NAME, value);
        }
        get updateUserSign() {
            return this.getProperty(ApplicationFunction.PROPERTY_UPDATEUSERSIGN_NAME);
        }
        set updateUserSign(value) {
            this.setProperty(ApplicationFunction.PROPERTY_UPDATEUSERSIGN_NAME, value);
        }
        init() {
            this.objectCode = ApplicationFunction.BUSINESS_OBJECT_CODE;
        }
    }
    ApplicationFunction.BUSINESS_OBJECT_CODE = "CC_SYS_FUNCTION";
    ApplicationFunction.PROPERTY_MODULEID_NAME = "ModuleId";
    ApplicationFunction.PROPERTY_FUNCTIONID_NAME = "FunctionId";
    ApplicationFunction.PROPERTY_FUNCTIONNAME_NAME = "FunctionName";
    ApplicationFunction.PROPERTY_OBJECTKEY_NAME = "ObjectKey";
    ApplicationFunction.PROPERTY_OBJECTCODE_NAME = "ObjectCode";
    ApplicationFunction.PROPERTY_DATASOURCE_NAME = "DataSource";
    ApplicationFunction.PROPERTY_CREATEDATE_NAME = "CreateDate";
    ApplicationFunction.PROPERTY_CREATETIME_NAME = "CreateTime";
    ApplicationFunction.PROPERTY_UPDATEDATE_NAME = "UpdateDate";
    ApplicationFunction.PROPERTY_UPDATETIME_NAME = "UpdateTime";
    ApplicationFunction.PROPERTY_CREATEACTIONID_NAME = "CreateActionId";
    ApplicationFunction.PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";
    ApplicationFunction.PROPERTY_LOGINST_NAME = "LogInst";
    ApplicationFunction.PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";
    ApplicationFunction.PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";
    exports.ApplicationFunction = ApplicationFunction;
});
