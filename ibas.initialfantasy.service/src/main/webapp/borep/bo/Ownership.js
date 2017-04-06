define(["require", "exports", "ibas/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Ownership extends index_1.BOSimple {
        constructor() {
            super();
        }
        get userCode() {
            return this.getProperty(Ownership.PROPERTY_USERCODE_NAME);
        }
        set userCode(value) {
            this.setProperty(Ownership.PROPERTY_USERCODE_NAME, value);
        }
        get bOCode() {
            return this.getProperty(Ownership.PROPERTY_BOCODE_NAME);
        }
        set bOCode(value) {
            this.setProperty(Ownership.PROPERTY_BOCODE_NAME, value);
        }
        get activated() {
            return this.getProperty(Ownership.PROPERTY_ACTIVATED_NAME);
        }
        set activated(value) {
            this.setProperty(Ownership.PROPERTY_ACTIVATED_NAME, value);
        }
        get self() {
            return this.getProperty(Ownership.PROPERTY_SELF_NAME);
        }
        set self(value) {
            this.setProperty(Ownership.PROPERTY_SELF_NAME, value);
        }
        get lowerLevel() {
            return this.getProperty(Ownership.PROPERTY_LOWERLEVEL_NAME);
        }
        set lowerLevel(value) {
            this.setProperty(Ownership.PROPERTY_LOWERLEVEL_NAME, value);
        }
        get equalLevel() {
            return this.getProperty(Ownership.PROPERTY_EQUALLEVEL_NAME);
        }
        set equalLevel(value) {
            this.setProperty(Ownership.PROPERTY_EQUALLEVEL_NAME, value);
        }
        get higherLevel() {
            return this.getProperty(Ownership.PROPERTY_HIGHERLEVEL_NAME);
        }
        set higherLevel(value) {
            this.setProperty(Ownership.PROPERTY_HIGHERLEVEL_NAME, value);
        }
        get teams() {
            return this.getProperty(Ownership.PROPERTY_TEAMS_NAME);
        }
        set teams(value) {
            this.setProperty(Ownership.PROPERTY_TEAMS_NAME, value);
        }
        get others() {
            return this.getProperty(Ownership.PROPERTY_OTHERS_NAME);
        }
        set others(value) {
            this.setProperty(Ownership.PROPERTY_OTHERS_NAME, value);
        }
        get objectKey() {
            return this.getProperty(Ownership.PROPERTY_OBJECTKEY_NAME);
        }
        set objectKey(value) {
            this.setProperty(Ownership.PROPERTY_OBJECTKEY_NAME, value);
        }
        get objectCode() {
            return this.getProperty(Ownership.PROPERTY_OBJECTCODE_NAME);
        }
        set objectCode(value) {
            this.setProperty(Ownership.PROPERTY_OBJECTCODE_NAME, value);
        }
        get createDate() {
            return this.getProperty(Ownership.PROPERTY_CREATEDATE_NAME);
        }
        set createDate(value) {
            this.setProperty(Ownership.PROPERTY_CREATEDATE_NAME, value);
        }
        get createTime() {
            return this.getProperty(Ownership.PROPERTY_CREATETIME_NAME);
        }
        set createTime(value) {
            this.setProperty(Ownership.PROPERTY_CREATETIME_NAME, value);
        }
        get updateDate() {
            return this.getProperty(Ownership.PROPERTY_UPDATEDATE_NAME);
        }
        set updateDate(value) {
            this.setProperty(Ownership.PROPERTY_UPDATEDATE_NAME, value);
        }
        get updateTime() {
            return this.getProperty(Ownership.PROPERTY_UPDATETIME_NAME);
        }
        set updateTime(value) {
            this.setProperty(Ownership.PROPERTY_UPDATETIME_NAME, value);
        }
        get logInst() {
            return this.getProperty(Ownership.PROPERTY_LOGINST_NAME);
        }
        set logInst(value) {
            this.setProperty(Ownership.PROPERTY_LOGINST_NAME, value);
        }
        get series() {
            return this.getProperty(Ownership.PROPERTY_SERIES_NAME);
        }
        set series(value) {
            this.setProperty(Ownership.PROPERTY_SERIES_NAME, value);
        }
        get dataSource() {
            return this.getProperty(Ownership.PROPERTY_DATASOURCE_NAME);
        }
        set dataSource(value) {
            this.setProperty(Ownership.PROPERTY_DATASOURCE_NAME, value);
        }
        get createUserSign() {
            return this.getProperty(Ownership.PROPERTY_CREATEUSERSIGN_NAME);
        }
        set createUserSign(value) {
            this.setProperty(Ownership.PROPERTY_CREATEUSERSIGN_NAME, value);
        }
        get updateUserSign() {
            return this.getProperty(Ownership.PROPERTY_UPDATEUSERSIGN_NAME);
        }
        set updateUserSign(value) {
            this.setProperty(Ownership.PROPERTY_UPDATEUSERSIGN_NAME, value);
        }
        get createActionId() {
            return this.getProperty(Ownership.PROPERTY_CREATEACTIONID_NAME);
        }
        set createActionId(value) {
            this.setProperty(Ownership.PROPERTY_CREATEACTIONID_NAME, value);
        }
        get updateActionId() {
            return this.getProperty(Ownership.PROPERTY_UPDATEACTIONID_NAME);
        }
        set updateActionId(value) {
            this.setProperty(Ownership.PROPERTY_UPDATEACTIONID_NAME, value);
        }
        init() {
            this.objectCode = Ownership.BUSINESS_OBJECT_CODE;
        }
    }
    Ownership.BUSINESS_OBJECT_CODE = "CC_SYS_OWNERSHIP";
    Ownership.PROPERTY_USERCODE_NAME = "UserCode";
    Ownership.PROPERTY_BOCODE_NAME = "BOCode";
    Ownership.PROPERTY_ACTIVATED_NAME = "Activated";
    Ownership.PROPERTY_SELF_NAME = "Self";
    Ownership.PROPERTY_LOWERLEVEL_NAME = "LowerLevel";
    Ownership.PROPERTY_EQUALLEVEL_NAME = "EqualLevel";
    Ownership.PROPERTY_HIGHERLEVEL_NAME = "HigherLevel";
    Ownership.PROPERTY_TEAMS_NAME = "Teams";
    Ownership.PROPERTY_OTHERS_NAME = "Others";
    Ownership.PROPERTY_OBJECTKEY_NAME = "ObjectKey";
    Ownership.PROPERTY_OBJECTCODE_NAME = "ObjectCode";
    Ownership.PROPERTY_CREATEDATE_NAME = "CreateDate";
    Ownership.PROPERTY_CREATETIME_NAME = "CreateTime";
    Ownership.PROPERTY_UPDATEDATE_NAME = "UpdateDate";
    Ownership.PROPERTY_UPDATETIME_NAME = "UpdateTime";
    Ownership.PROPERTY_LOGINST_NAME = "LogInst";
    Ownership.PROPERTY_SERIES_NAME = "Series";
    Ownership.PROPERTY_DATASOURCE_NAME = "DataSource";
    Ownership.PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";
    Ownership.PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";
    Ownership.PROPERTY_CREATEACTIONID_NAME = "CreateActionId";
    Ownership.PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";
    exports.Ownership = Ownership;
});
