define(["require", "exports", "ibas/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Organization extends index_1.BOMasterData {
        constructor() {
            super();
        }
        get code() {
            return this.getProperty(Organization.PROPERTY_CODE_NAME);
        }
        set code(value) {
            this.setProperty(Organization.PROPERTY_CODE_NAME, value);
        }
        get name() {
            return this.getProperty(Organization.PROPERTY_NAME_NAME);
        }
        set name(value) {
            this.setProperty(Organization.PROPERTY_NAME_NAME, value);
        }
        get activated() {
            return this.getProperty(Organization.PROPERTY_ACTIVATED_NAME);
        }
        set activated(value) {
            this.setProperty(Organization.PROPERTY_ACTIVATED_NAME, value);
        }
        get docEntry() {
            return this.getProperty(Organization.PROPERTY_DOCENTRY_NAME);
        }
        set docEntry(value) {
            this.setProperty(Organization.PROPERTY_DOCENTRY_NAME, value);
        }
        get objectCode() {
            return this.getProperty(Organization.PROPERTY_OBJECTCODE_NAME);
        }
        set objectCode(value) {
            this.setProperty(Organization.PROPERTY_OBJECTCODE_NAME, value);
        }
        get createDate() {
            return this.getProperty(Organization.PROPERTY_CREATEDATE_NAME);
        }
        set createDate(value) {
            this.setProperty(Organization.PROPERTY_CREATEDATE_NAME, value);
        }
        get createTime() {
            return this.getProperty(Organization.PROPERTY_CREATETIME_NAME);
        }
        set createTime(value) {
            this.setProperty(Organization.PROPERTY_CREATETIME_NAME, value);
        }
        get updateDate() {
            return this.getProperty(Organization.PROPERTY_UPDATEDATE_NAME);
        }
        set updateDate(value) {
            this.setProperty(Organization.PROPERTY_UPDATEDATE_NAME, value);
        }
        get updateTime() {
            return this.getProperty(Organization.PROPERTY_UPDATETIME_NAME);
        }
        set updateTime(value) {
            this.setProperty(Organization.PROPERTY_UPDATETIME_NAME, value);
        }
        get dataSource() {
            return this.getProperty(Organization.PROPERTY_DATASOURCE_NAME);
        }
        set dataSource(value) {
            this.setProperty(Organization.PROPERTY_DATASOURCE_NAME, value);
        }
        get logInst() {
            return this.getProperty(Organization.PROPERTY_LOGINST_NAME);
        }
        set logInst(value) {
            this.setProperty(Organization.PROPERTY_LOGINST_NAME, value);
        }
        get series() {
            return this.getProperty(Organization.PROPERTY_SERIES_NAME);
        }
        set series(value) {
            this.setProperty(Organization.PROPERTY_SERIES_NAME, value);
        }
        get createUserSign() {
            return this.getProperty(Organization.PROPERTY_CREATEUSERSIGN_NAME);
        }
        set createUserSign(value) {
            this.setProperty(Organization.PROPERTY_CREATEUSERSIGN_NAME, value);
        }
        get updateUserSign() {
            return this.getProperty(Organization.PROPERTY_UPDATEUSERSIGN_NAME);
        }
        set updateUserSign(value) {
            this.setProperty(Organization.PROPERTY_UPDATEUSERSIGN_NAME, value);
        }
        get createActionId() {
            return this.getProperty(Organization.PROPERTY_CREATEACTIONID_NAME);
        }
        set createActionId(value) {
            this.setProperty(Organization.PROPERTY_CREATEACTIONID_NAME, value);
        }
        get updateActionId() {
            return this.getProperty(Organization.PROPERTY_UPDATEACTIONID_NAME);
        }
        set updateActionId(value) {
            this.setProperty(Organization.PROPERTY_UPDATEACTIONID_NAME, value);
        }
        init() {
            this.objectCode = Organization.BUSINESS_OBJECT_CODE;
        }
    }
    Organization.BUSINESS_OBJECT_CODE = "CC_SYS_ORGANIZATION";
    Organization.PROPERTY_CODE_NAME = "Code";
    Organization.PROPERTY_NAME_NAME = "Name";
    Organization.PROPERTY_ACTIVATED_NAME = "Activated";
    Organization.PROPERTY_DOCENTRY_NAME = "DocEntry";
    Organization.PROPERTY_OBJECTCODE_NAME = "ObjectCode";
    Organization.PROPERTY_CREATEDATE_NAME = "CreateDate";
    Organization.PROPERTY_CREATETIME_NAME = "CreateTime";
    Organization.PROPERTY_UPDATEDATE_NAME = "UpdateDate";
    Organization.PROPERTY_UPDATETIME_NAME = "UpdateTime";
    Organization.PROPERTY_DATASOURCE_NAME = "DataSource";
    Organization.PROPERTY_LOGINST_NAME = "LogInst";
    Organization.PROPERTY_SERIES_NAME = "Series";
    Organization.PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";
    Organization.PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";
    Organization.PROPERTY_CREATEACTIONID_NAME = "CreateActionId";
    Organization.PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";
    exports.Organization = Organization;
});
