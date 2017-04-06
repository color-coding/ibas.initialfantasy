define(["require", "exports", "ibas/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApplicationModule extends index_1.BOSimple {
        constructor() {
            super();
        }
        get moduleId() {
            return this.getProperty(ApplicationModule.PROPERTY_MODULEID_NAME);
        }
        set moduleId(value) {
            this.setProperty(ApplicationModule.PROPERTY_MODULEID_NAME, value);
        }
        get platformId() {
            return this.getProperty(ApplicationModule.PROPERTY_PLATFORMID_NAME);
        }
        set platformId(value) {
            this.setProperty(ApplicationModule.PROPERTY_PLATFORMID_NAME, value);
        }
        get moduleName() {
            return this.getProperty(ApplicationModule.PROPERTY_MODULENAME_NAME);
        }
        set moduleName(value) {
            this.setProperty(ApplicationModule.PROPERTY_MODULENAME_NAME, value);
        }
        get moduleCategory() {
            return this.getProperty(ApplicationModule.PROPERTY_MODULECATEGORY_NAME);
        }
        set moduleCategory(value) {
            this.setProperty(ApplicationModule.PROPERTY_MODULECATEGORY_NAME, value);
        }
        get activated() {
            return this.getProperty(ApplicationModule.PROPERTY_ACTIVATED_NAME);
        }
        set activated(value) {
            this.setProperty(ApplicationModule.PROPERTY_ACTIVATED_NAME, value);
        }
        get objectKey() {
            return this.getProperty(ApplicationModule.PROPERTY_OBJECTKEY_NAME);
        }
        set objectKey(value) {
            this.setProperty(ApplicationModule.PROPERTY_OBJECTKEY_NAME, value);
        }
        get objectCode() {
            return this.getProperty(ApplicationModule.PROPERTY_OBJECTCODE_NAME);
        }
        set objectCode(value) {
            this.setProperty(ApplicationModule.PROPERTY_OBJECTCODE_NAME, value);
        }
        get dataSource() {
            return this.getProperty(ApplicationModule.PROPERTY_DATASOURCE_NAME);
        }
        set dataSource(value) {
            this.setProperty(ApplicationModule.PROPERTY_DATASOURCE_NAME, value);
        }
        get createDate() {
            return this.getProperty(ApplicationModule.PROPERTY_CREATEDATE_NAME);
        }
        set createDate(value) {
            this.setProperty(ApplicationModule.PROPERTY_CREATEDATE_NAME, value);
        }
        get createTime() {
            return this.getProperty(ApplicationModule.PROPERTY_CREATETIME_NAME);
        }
        set createTime(value) {
            this.setProperty(ApplicationModule.PROPERTY_CREATETIME_NAME, value);
        }
        get updateDate() {
            return this.getProperty(ApplicationModule.PROPERTY_UPDATEDATE_NAME);
        }
        set updateDate(value) {
            this.setProperty(ApplicationModule.PROPERTY_UPDATEDATE_NAME, value);
        }
        get updateTime() {
            return this.getProperty(ApplicationModule.PROPERTY_UPDATETIME_NAME);
        }
        set updateTime(value) {
            this.setProperty(ApplicationModule.PROPERTY_UPDATETIME_NAME, value);
        }
        get createActionId() {
            return this.getProperty(ApplicationModule.PROPERTY_CREATEACTIONID_NAME);
        }
        set createActionId(value) {
            this.setProperty(ApplicationModule.PROPERTY_CREATEACTIONID_NAME, value);
        }
        get updateActionId() {
            return this.getProperty(ApplicationModule.PROPERTY_UPDATEACTIONID_NAME);
        }
        set updateActionId(value) {
            this.setProperty(ApplicationModule.PROPERTY_UPDATEACTIONID_NAME, value);
        }
        get logInst() {
            return this.getProperty(ApplicationModule.PROPERTY_LOGINST_NAME);
        }
        set logInst(value) {
            this.setProperty(ApplicationModule.PROPERTY_LOGINST_NAME, value);
        }
        get createUserSign() {
            return this.getProperty(ApplicationModule.PROPERTY_CREATEUSERSIGN_NAME);
        }
        set createUserSign(value) {
            this.setProperty(ApplicationModule.PROPERTY_CREATEUSERSIGN_NAME, value);
        }
        get updateUserSign() {
            return this.getProperty(ApplicationModule.PROPERTY_UPDATEUSERSIGN_NAME);
        }
        set updateUserSign(value) {
            this.setProperty(ApplicationModule.PROPERTY_UPDATEUSERSIGN_NAME, value);
        }
        init() {
            this.objectCode = ApplicationModule.BUSINESS_OBJECT_CODE;
        }
    }
    ApplicationModule.BUSINESS_OBJECT_CODE = "CC_SYS_MODULE";
    ApplicationModule.PROPERTY_MODULEID_NAME = "ModuleId";
    ApplicationModule.PROPERTY_PLATFORMID_NAME = "PlatformId";
    ApplicationModule.PROPERTY_MODULENAME_NAME = "ModuleName";
    ApplicationModule.PROPERTY_MODULECATEGORY_NAME = "ModuleCategory";
    ApplicationModule.PROPERTY_ACTIVATED_NAME = "Activated";
    ApplicationModule.PROPERTY_OBJECTKEY_NAME = "ObjectKey";
    ApplicationModule.PROPERTY_OBJECTCODE_NAME = "ObjectCode";
    ApplicationModule.PROPERTY_DATASOURCE_NAME = "DataSource";
    ApplicationModule.PROPERTY_CREATEDATE_NAME = "CreateDate";
    ApplicationModule.PROPERTY_CREATETIME_NAME = "CreateTime";
    ApplicationModule.PROPERTY_UPDATEDATE_NAME = "UpdateDate";
    ApplicationModule.PROPERTY_UPDATETIME_NAME = "UpdateTime";
    ApplicationModule.PROPERTY_CREATEACTIONID_NAME = "CreateActionId";
    ApplicationModule.PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";
    ApplicationModule.PROPERTY_LOGINST_NAME = "LogInst";
    ApplicationModule.PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";
    ApplicationModule.PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";
    exports.ApplicationModule = ApplicationModule;
});
