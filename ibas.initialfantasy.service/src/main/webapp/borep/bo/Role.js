define(["require", "exports", "ibas/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Role extends index_1.BOMasterData {
        constructor() {
            super();
        }
        get code() {
            return this.getProperty(Role.PROPERTY_CODE_NAME);
        }
        set code(value) {
            this.setProperty(Role.PROPERTY_CODE_NAME, value);
        }
        get name() {
            return this.getProperty(Role.PROPERTY_NAME_NAME);
        }
        set name(value) {
            this.setProperty(Role.PROPERTY_NAME_NAME, value);
        }
        get activated() {
            return this.getProperty(Role.PROPERTY_ACTIVATED_NAME);
        }
        set activated(value) {
            this.setProperty(Role.PROPERTY_ACTIVATED_NAME, value);
        }
        get docEntry() {
            return this.getProperty(Role.PROPERTY_DOCENTRY_NAME);
        }
        set docEntry(value) {
            this.setProperty(Role.PROPERTY_DOCENTRY_NAME, value);
        }
        get objectCode() {
            return this.getProperty(Role.PROPERTY_OBJECTCODE_NAME);
        }
        set objectCode(value) {
            this.setProperty(Role.PROPERTY_OBJECTCODE_NAME, value);
        }
        get createDate() {
            return this.getProperty(Role.PROPERTY_CREATEDATE_NAME);
        }
        set createDate(value) {
            this.setProperty(Role.PROPERTY_CREATEDATE_NAME, value);
        }
        get createTime() {
            return this.getProperty(Role.PROPERTY_CREATETIME_NAME);
        }
        set createTime(value) {
            this.setProperty(Role.PROPERTY_CREATETIME_NAME, value);
        }
        get updateDate() {
            return this.getProperty(Role.PROPERTY_UPDATEDATE_NAME);
        }
        set updateDate(value) {
            this.setProperty(Role.PROPERTY_UPDATEDATE_NAME, value);
        }
        get updateTime() {
            return this.getProperty(Role.PROPERTY_UPDATETIME_NAME);
        }
        set updateTime(value) {
            this.setProperty(Role.PROPERTY_UPDATETIME_NAME, value);
        }
        get logInst() {
            return this.getProperty(Role.PROPERTY_LOGINST_NAME);
        }
        set logInst(value) {
            this.setProperty(Role.PROPERTY_LOGINST_NAME, value);
        }
        get series() {
            return this.getProperty(Role.PROPERTY_SERIES_NAME);
        }
        set series(value) {
            this.setProperty(Role.PROPERTY_SERIES_NAME, value);
        }
        get dataSource() {
            return this.getProperty(Role.PROPERTY_DATASOURCE_NAME);
        }
        set dataSource(value) {
            this.setProperty(Role.PROPERTY_DATASOURCE_NAME, value);
        }
        get createUserSign() {
            return this.getProperty(Role.PROPERTY_CREATEUSERSIGN_NAME);
        }
        set createUserSign(value) {
            this.setProperty(Role.PROPERTY_CREATEUSERSIGN_NAME, value);
        }
        get updateUserSign() {
            return this.getProperty(Role.PROPERTY_UPDATEUSERSIGN_NAME);
        }
        set updateUserSign(value) {
            this.setProperty(Role.PROPERTY_UPDATEUSERSIGN_NAME, value);
        }
        get createActionId() {
            return this.getProperty(Role.PROPERTY_CREATEACTIONID_NAME);
        }
        set createActionId(value) {
            this.setProperty(Role.PROPERTY_CREATEACTIONID_NAME, value);
        }
        get updateActionId() {
            return this.getProperty(Role.PROPERTY_UPDATEACTIONID_NAME);
        }
        set updateActionId(value) {
            this.setProperty(Role.PROPERTY_UPDATEACTIONID_NAME, value);
        }
        init() {
            this.objectCode = Role.BUSINESS_OBJECT_CODE;
        }
    }
    Role.BUSINESS_OBJECT_CODE = "CC_SYS_ROLE";
    Role.PROPERTY_CODE_NAME = "Code";
    Role.PROPERTY_NAME_NAME = "Name";
    Role.PROPERTY_ACTIVATED_NAME = "Activated";
    Role.PROPERTY_DOCENTRY_NAME = "DocEntry";
    Role.PROPERTY_OBJECTCODE_NAME = "ObjectCode";
    Role.PROPERTY_CREATEDATE_NAME = "CreateDate";
    Role.PROPERTY_CREATETIME_NAME = "CreateTime";
    Role.PROPERTY_UPDATEDATE_NAME = "UpdateDate";
    Role.PROPERTY_UPDATETIME_NAME = "UpdateTime";
    Role.PROPERTY_LOGINST_NAME = "LogInst";
    Role.PROPERTY_SERIES_NAME = "Series";
    Role.PROPERTY_DATASOURCE_NAME = "DataSource";
    Role.PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";
    Role.PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";
    Role.PROPERTY_CREATEACTIONID_NAME = "CreateActionId";
    Role.PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";
    exports.Role = Role;
});
