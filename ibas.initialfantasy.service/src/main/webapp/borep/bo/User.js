define(["require", "exports", "ibas/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class User extends index_1.BOMasterData {
        constructor() {
            super();
        }
        get code() {
            return this.getProperty(User.PROPERTY_CODE_NAME);
        }
        set code(value) {
            this.setProperty(User.PROPERTY_CODE_NAME, value);
        }
        get name() {
            return this.getProperty(User.PROPERTY_NAME_NAME);
        }
        set name(value) {
            this.setProperty(User.PROPERTY_NAME_NAME, value);
        }
        get password() {
            return this.getProperty(User.PROPERTY_PASSWORD_NAME);
        }
        set password(value) {
            this.setProperty(User.PROPERTY_PASSWORD_NAME, value);
        }
        get activated() {
            return this.getProperty(User.PROPERTY_ACTIVATED_NAME);
        }
        set activated(value) {
            this.setProperty(User.PROPERTY_ACTIVATED_NAME, value);
        }
        get super() {
            return this.getProperty(User.PROPERTY_SUPER_NAME);
        }
        set super(value) {
            this.setProperty(User.PROPERTY_SUPER_NAME, value);
        }
        get mail() {
            return this.getProperty(User.PROPERTY_MAIL_NAME);
        }
        set mail(value) {
            this.setProperty(User.PROPERTY_MAIL_NAME, value);
        }
        get docEntry() {
            return this.getProperty(User.PROPERTY_DOCENTRY_NAME);
        }
        set docEntry(value) {
            this.setProperty(User.PROPERTY_DOCENTRY_NAME, value);
        }
        get objectCode() {
            return this.getProperty(User.PROPERTY_OBJECTCODE_NAME);
        }
        set objectCode(value) {
            this.setProperty(User.PROPERTY_OBJECTCODE_NAME, value);
        }
        get createDate() {
            return this.getProperty(User.PROPERTY_CREATEDATE_NAME);
        }
        set createDate(value) {
            this.setProperty(User.PROPERTY_CREATEDATE_NAME, value);
        }
        get createTime() {
            return this.getProperty(User.PROPERTY_CREATETIME_NAME);
        }
        set createTime(value) {
            this.setProperty(User.PROPERTY_CREATETIME_NAME, value);
        }
        get updateDate() {
            return this.getProperty(User.PROPERTY_UPDATEDATE_NAME);
        }
        set updateDate(value) {
            this.setProperty(User.PROPERTY_UPDATEDATE_NAME, value);
        }
        get updateTime() {
            return this.getProperty(User.PROPERTY_UPDATETIME_NAME);
        }
        set updateTime(value) {
            this.setProperty(User.PROPERTY_UPDATETIME_NAME, value);
        }
        get dataSource() {
            return this.getProperty(User.PROPERTY_DATASOURCE_NAME);
        }
        set dataSource(value) {
            this.setProperty(User.PROPERTY_DATASOURCE_NAME, value);
        }
        get logInst() {
            return this.getProperty(User.PROPERTY_LOGINST_NAME);
        }
        set logInst(value) {
            this.setProperty(User.PROPERTY_LOGINST_NAME, value);
        }
        get series() {
            return this.getProperty(User.PROPERTY_SERIES_NAME);
        }
        set series(value) {
            this.setProperty(User.PROPERTY_SERIES_NAME, value);
        }
        get createUserSign() {
            return this.getProperty(User.PROPERTY_CREATEUSERSIGN_NAME);
        }
        set createUserSign(value) {
            this.setProperty(User.PROPERTY_CREATEUSERSIGN_NAME, value);
        }
        get updateUserSign() {
            return this.getProperty(User.PROPERTY_UPDATEUSERSIGN_NAME);
        }
        set updateUserSign(value) {
            this.setProperty(User.PROPERTY_UPDATEUSERSIGN_NAME, value);
        }
        get createActionId() {
            return this.getProperty(User.PROPERTY_CREATEACTIONID_NAME);
        }
        set createActionId(value) {
            this.setProperty(User.PROPERTY_CREATEACTIONID_NAME, value);
        }
        get updateActionId() {
            return this.getProperty(User.PROPERTY_UPDATEACTIONID_NAME);
        }
        set updateActionId(value) {
            this.setProperty(User.PROPERTY_UPDATEACTIONID_NAME, value);
        }
        get approvalStatus() {
            return this.getProperty(User.PROPERTY_APPROVALSTATUS_NAME);
        }
        set approvalStatus(value) {
            this.setProperty(User.PROPERTY_APPROVALSTATUS_NAME, value);
        }
        get dataOwner() {
            return this.getProperty(User.PROPERTY_DATAOWNER_NAME);
        }
        set dataOwner(value) {
            this.setProperty(User.PROPERTY_DATAOWNER_NAME, value);
        }
        get organization() {
            return this.getProperty(User.PROPERTY_ORGANIZATION_NAME);
        }
        set organization(value) {
            this.setProperty(User.PROPERTY_ORGANIZATION_NAME, value);
        }
        init() {
            this.objectCode = User.BUSINESS_OBJECT_CODE;
        }
    }
    User.BUSINESS_OBJECT_CODE = "CC_SYS_USER";
    User.PROPERTY_CODE_NAME = "Code";
    User.PROPERTY_NAME_NAME = "Name";
    User.PROPERTY_PASSWORD_NAME = "Password";
    User.PROPERTY_ACTIVATED_NAME = "Activated";
    User.PROPERTY_SUPER_NAME = "Super";
    User.PROPERTY_MAIL_NAME = "Mail";
    User.PROPERTY_DOCENTRY_NAME = "DocEntry";
    User.PROPERTY_OBJECTCODE_NAME = "ObjectCode";
    User.PROPERTY_CREATEDATE_NAME = "CreateDate";
    User.PROPERTY_CREATETIME_NAME = "CreateTime";
    User.PROPERTY_UPDATEDATE_NAME = "UpdateDate";
    User.PROPERTY_UPDATETIME_NAME = "UpdateTime";
    User.PROPERTY_DATASOURCE_NAME = "DataSource";
    User.PROPERTY_LOGINST_NAME = "LogInst";
    User.PROPERTY_SERIES_NAME = "Series";
    User.PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";
    User.PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";
    User.PROPERTY_CREATEACTIONID_NAME = "CreateActionId";
    User.PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";
    User.PROPERTY_APPROVALSTATUS_NAME = "ApprovalStatus";
    User.PROPERTY_DATAOWNER_NAME = "DataOwner";
    User.PROPERTY_ORGANIZATION_NAME = "Organization";
    exports.User = User;
});
