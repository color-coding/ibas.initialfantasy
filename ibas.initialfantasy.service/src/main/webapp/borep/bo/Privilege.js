define(["require", "exports", "ibas/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Privilege extends index_1.BOSimple {
        constructor() {
            super();
        }
        get roleCode() {
            return this.getProperty(Privilege.PROPERTY_ROLECODE_NAME);
        }
        set roleCode(value) {
            this.setProperty(Privilege.PROPERTY_ROLECODE_NAME, value);
        }
        get platformId() {
            return this.getProperty(Privilege.PROPERTY_PLATFORMID_NAME);
        }
        set platformId(value) {
            this.setProperty(Privilege.PROPERTY_PLATFORMID_NAME, value);
        }
        get moduleId() {
            return this.getProperty(Privilege.PROPERTY_MODULEID_NAME);
        }
        set moduleId(value) {
            this.setProperty(Privilege.PROPERTY_MODULEID_NAME, value);
        }
        get target() {
            return this.getProperty(Privilege.PROPERTY_TARGET_NAME);
        }
        set target(value) {
            this.setProperty(Privilege.PROPERTY_TARGET_NAME, value);
        }
        get activated() {
            return this.getProperty(Privilege.PROPERTY_ACTIVATED_NAME);
        }
        set activated(value) {
            this.setProperty(Privilege.PROPERTY_ACTIVATED_NAME, value);
        }
        get authoriseValue() {
            return this.getProperty(Privilege.PROPERTY_AUTHORISEVALUE_NAME);
        }
        set authoriseValue(value) {
            this.setProperty(Privilege.PROPERTY_AUTHORISEVALUE_NAME, value);
        }
        get objectKey() {
            return this.getProperty(Privilege.PROPERTY_OBJECTKEY_NAME);
        }
        set objectKey(value) {
            this.setProperty(Privilege.PROPERTY_OBJECTKEY_NAME, value);
        }
        get objectCode() {
            return this.getProperty(Privilege.PROPERTY_OBJECTCODE_NAME);
        }
        set objectCode(value) {
            this.setProperty(Privilege.PROPERTY_OBJECTCODE_NAME, value);
        }
        get createDate() {
            return this.getProperty(Privilege.PROPERTY_CREATEDATE_NAME);
        }
        set createDate(value) {
            this.setProperty(Privilege.PROPERTY_CREATEDATE_NAME, value);
        }
        get createTime() {
            return this.getProperty(Privilege.PROPERTY_CREATETIME_NAME);
        }
        set createTime(value) {
            this.setProperty(Privilege.PROPERTY_CREATETIME_NAME, value);
        }
        get updateDate() {
            return this.getProperty(Privilege.PROPERTY_UPDATEDATE_NAME);
        }
        set updateDate(value) {
            this.setProperty(Privilege.PROPERTY_UPDATEDATE_NAME, value);
        }
        get updateTime() {
            return this.getProperty(Privilege.PROPERTY_UPDATETIME_NAME);
        }
        set updateTime(value) {
            this.setProperty(Privilege.PROPERTY_UPDATETIME_NAME, value);
        }
        get logInst() {
            return this.getProperty(Privilege.PROPERTY_LOGINST_NAME);
        }
        set logInst(value) {
            this.setProperty(Privilege.PROPERTY_LOGINST_NAME, value);
        }
        get series() {
            return this.getProperty(Privilege.PROPERTY_SERIES_NAME);
        }
        set series(value) {
            this.setProperty(Privilege.PROPERTY_SERIES_NAME, value);
        }
        get dataSource() {
            return this.getProperty(Privilege.PROPERTY_DATASOURCE_NAME);
        }
        set dataSource(value) {
            this.setProperty(Privilege.PROPERTY_DATASOURCE_NAME, value);
        }
        get createUserSign() {
            return this.getProperty(Privilege.PROPERTY_CREATEUSERSIGN_NAME);
        }
        set createUserSign(value) {
            this.setProperty(Privilege.PROPERTY_CREATEUSERSIGN_NAME, value);
        }
        get updateUserSign() {
            return this.getProperty(Privilege.PROPERTY_UPDATEUSERSIGN_NAME);
        }
        set updateUserSign(value) {
            this.setProperty(Privilege.PROPERTY_UPDATEUSERSIGN_NAME, value);
        }
        get createActionId() {
            return this.getProperty(Privilege.PROPERTY_CREATEACTIONID_NAME);
        }
        set createActionId(value) {
            this.setProperty(Privilege.PROPERTY_CREATEACTIONID_NAME, value);
        }
        get updateActionId() {
            return this.getProperty(Privilege.PROPERTY_UPDATEACTIONID_NAME);
        }
        set updateActionId(value) {
            this.setProperty(Privilege.PROPERTY_UPDATEACTIONID_NAME, value);
        }
        init() {
            this.objectCode = Privilege.BUSINESS_OBJECT_CODE;
        }
    }
    Privilege.BUSINESS_OBJECT_CODE = "CC_SYS_PRIVILEGE";
    Privilege.PROPERTY_ROLECODE_NAME = "RoleCode";
    Privilege.PROPERTY_PLATFORMID_NAME = "PlatformId";
    Privilege.PROPERTY_MODULEID_NAME = "ModuleId";
    Privilege.PROPERTY_TARGET_NAME = "Target";
    Privilege.PROPERTY_ACTIVATED_NAME = "Activated";
    Privilege.PROPERTY_AUTHORISEVALUE_NAME = "AuthoriseValue";
    Privilege.PROPERTY_OBJECTKEY_NAME = "ObjectKey";
    Privilege.PROPERTY_OBJECTCODE_NAME = "ObjectCode";
    Privilege.PROPERTY_CREATEDATE_NAME = "CreateDate";
    Privilege.PROPERTY_CREATETIME_NAME = "CreateTime";
    Privilege.PROPERTY_UPDATEDATE_NAME = "UpdateDate";
    Privilege.PROPERTY_UPDATETIME_NAME = "UpdateTime";
    Privilege.PROPERTY_LOGINST_NAME = "LogInst";
    Privilege.PROPERTY_SERIES_NAME = "Series";
    Privilege.PROPERTY_DATASOURCE_NAME = "DataSource";
    Privilege.PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";
    Privilege.PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";
    Privilege.PROPERTY_CREATEACTIONID_NAME = "CreateActionId";
    Privilege.PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";
    exports.Privilege = Privilege;
});
