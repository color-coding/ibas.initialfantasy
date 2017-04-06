define(["require", "exports", "ibas/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApplicationPlatform extends index_1.BOSimple {
        constructor() {
            super();
        }
        get platformId() {
            return this.getProperty(ApplicationPlatform.PROPERTY_PLATFORMID_NAME);
        }
        set platformId(value) {
            this.setProperty(ApplicationPlatform.PROPERTY_PLATFORMID_NAME, value);
        }
        get platformCode() {
            return this.getProperty(ApplicationPlatform.PROPERTY_PLATFORMCODE_NAME);
        }
        set platformCode(value) {
            this.setProperty(ApplicationPlatform.PROPERTY_PLATFORMCODE_NAME, value);
        }
        get platformDescription() {
            return this.getProperty(ApplicationPlatform.PROPERTY_PLATFORMDESCRIPTION_NAME);
        }
        set platformDescription(value) {
            this.setProperty(ApplicationPlatform.PROPERTY_PLATFORMDESCRIPTION_NAME, value);
        }
        get activated() {
            return this.getProperty(ApplicationPlatform.PROPERTY_ACTIVATED_NAME);
        }
        set activated(value) {
            this.setProperty(ApplicationPlatform.PROPERTY_ACTIVATED_NAME, value);
        }
        get objectKey() {
            return this.getProperty(ApplicationPlatform.PROPERTY_OBJECTKEY_NAME);
        }
        set objectKey(value) {
            this.setProperty(ApplicationPlatform.PROPERTY_OBJECTKEY_NAME, value);
        }
        get objectCode() {
            return this.getProperty(ApplicationPlatform.PROPERTY_OBJECTCODE_NAME);
        }
        set objectCode(value) {
            this.setProperty(ApplicationPlatform.PROPERTY_OBJECTCODE_NAME, value);
        }
        get dataSource() {
            return this.getProperty(ApplicationPlatform.PROPERTY_DATASOURCE_NAME);
        }
        set dataSource(value) {
            this.setProperty(ApplicationPlatform.PROPERTY_DATASOURCE_NAME, value);
        }
        get createDate() {
            return this.getProperty(ApplicationPlatform.PROPERTY_CREATEDATE_NAME);
        }
        set createDate(value) {
            this.setProperty(ApplicationPlatform.PROPERTY_CREATEDATE_NAME, value);
        }
        get createTime() {
            return this.getProperty(ApplicationPlatform.PROPERTY_CREATETIME_NAME);
        }
        set createTime(value) {
            this.setProperty(ApplicationPlatform.PROPERTY_CREATETIME_NAME, value);
        }
        get updateDate() {
            return this.getProperty(ApplicationPlatform.PROPERTY_UPDATEDATE_NAME);
        }
        set updateDate(value) {
            this.setProperty(ApplicationPlatform.PROPERTY_UPDATEDATE_NAME, value);
        }
        get updateTime() {
            return this.getProperty(ApplicationPlatform.PROPERTY_UPDATETIME_NAME);
        }
        set updateTime(value) {
            this.setProperty(ApplicationPlatform.PROPERTY_UPDATETIME_NAME, value);
        }
        get createActionId() {
            return this.getProperty(ApplicationPlatform.PROPERTY_CREATEACTIONID_NAME);
        }
        set createActionId(value) {
            this.setProperty(ApplicationPlatform.PROPERTY_CREATEACTIONID_NAME, value);
        }
        get updateActionId() {
            return this.getProperty(ApplicationPlatform.PROPERTY_UPDATEACTIONID_NAME);
        }
        set updateActionId(value) {
            this.setProperty(ApplicationPlatform.PROPERTY_UPDATEACTIONID_NAME, value);
        }
        get logInst() {
            return this.getProperty(ApplicationPlatform.PROPERTY_LOGINST_NAME);
        }
        set logInst(value) {
            this.setProperty(ApplicationPlatform.PROPERTY_LOGINST_NAME, value);
        }
        get createUserSign() {
            return this.getProperty(ApplicationPlatform.PROPERTY_CREATEUSERSIGN_NAME);
        }
        set createUserSign(value) {
            this.setProperty(ApplicationPlatform.PROPERTY_CREATEUSERSIGN_NAME, value);
        }
        get updateUserSign() {
            return this.getProperty(ApplicationPlatform.PROPERTY_UPDATEUSERSIGN_NAME);
        }
        set updateUserSign(value) {
            this.setProperty(ApplicationPlatform.PROPERTY_UPDATEUSERSIGN_NAME, value);
        }
        init() {
            this.objectCode = ApplicationPlatform.BUSINESS_OBJECT_CODE;
        }
    }
    ApplicationPlatform.BUSINESS_OBJECT_CODE = "CC_SYS_PLATFORM";
    ApplicationPlatform.PROPERTY_PLATFORMID_NAME = "PlatformId";
    ApplicationPlatform.PROPERTY_PLATFORMCODE_NAME = "PlatformCode";
    ApplicationPlatform.PROPERTY_PLATFORMDESCRIPTION_NAME = "PlatformDescription";
    ApplicationPlatform.PROPERTY_ACTIVATED_NAME = "Activated";
    ApplicationPlatform.PROPERTY_OBJECTKEY_NAME = "ObjectKey";
    ApplicationPlatform.PROPERTY_OBJECTCODE_NAME = "ObjectCode";
    ApplicationPlatform.PROPERTY_DATASOURCE_NAME = "DataSource";
    ApplicationPlatform.PROPERTY_CREATEDATE_NAME = "CreateDate";
    ApplicationPlatform.PROPERTY_CREATETIME_NAME = "CreateTime";
    ApplicationPlatform.PROPERTY_UPDATEDATE_NAME = "UpdateDate";
    ApplicationPlatform.PROPERTY_UPDATETIME_NAME = "UpdateTime";
    ApplicationPlatform.PROPERTY_CREATEACTIONID_NAME = "CreateActionId";
    ApplicationPlatform.PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";
    ApplicationPlatform.PROPERTY_LOGINST_NAME = "LogInst";
    ApplicationPlatform.PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";
    ApplicationPlatform.PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";
    exports.ApplicationPlatform = ApplicationPlatform;
});
