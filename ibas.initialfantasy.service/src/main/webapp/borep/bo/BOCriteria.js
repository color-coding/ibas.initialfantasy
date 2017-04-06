define(["require", "exports", "ibas/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BOCriteria extends index_1.BOSimple {
        constructor() {
            super();
        }
        get applicationId() {
            return this.getProperty(BOCriteria.PROPERTY_APPLICATIONID_NAME);
        }
        set applicationId(value) {
            this.setProperty(BOCriteria.PROPERTY_APPLICATIONID_NAME, value);
        }
        get dataOwner() {
            return this.getProperty(BOCriteria.PROPERTY_DATAOWNER_NAME);
        }
        set dataOwner(value) {
            this.setProperty(BOCriteria.PROPERTY_DATAOWNER_NAME, value);
        }
        get name() {
            return this.getProperty(BOCriteria.PROPERTY_NAME_NAME);
        }
        set name(value) {
            this.setProperty(BOCriteria.PROPERTY_NAME_NAME, value);
        }
        get activated() {
            return this.getProperty(BOCriteria.PROPERTY_ACTIVATED_NAME);
        }
        set activated(value) {
            this.setProperty(BOCriteria.PROPERTY_ACTIVATED_NAME, value);
        }
        get order() {
            return this.getProperty(BOCriteria.PROPERTY_ORDER_NAME);
        }
        set order(value) {
            this.setProperty(BOCriteria.PROPERTY_ORDER_NAME, value);
        }
        get belongRole() {
            return this.getProperty(BOCriteria.PROPERTY_BELONGROLE_NAME);
        }
        set belongRole(value) {
            this.setProperty(BOCriteria.PROPERTY_BELONGROLE_NAME, value);
        }
        get criteriaData() {
            return this.getProperty(BOCriteria.PROPERTY_CRITERIADATA_NAME);
        }
        set criteriaData(value) {
            this.setProperty(BOCriteria.PROPERTY_CRITERIADATA_NAME, value);
        }
        get objectKey() {
            return this.getProperty(BOCriteria.PROPERTY_OBJECTKEY_NAME);
        }
        set objectKey(value) {
            this.setProperty(BOCriteria.PROPERTY_OBJECTKEY_NAME, value);
        }
        get objectCode() {
            return this.getProperty(BOCriteria.PROPERTY_OBJECTCODE_NAME);
        }
        set objectCode(value) {
            this.setProperty(BOCriteria.PROPERTY_OBJECTCODE_NAME, value);
        }
        get logInst() {
            return this.getProperty(BOCriteria.PROPERTY_LOGINST_NAME);
        }
        set logInst(value) {
            this.setProperty(BOCriteria.PROPERTY_LOGINST_NAME, value);
        }
        get series() {
            return this.getProperty(BOCriteria.PROPERTY_SERIES_NAME);
        }
        set series(value) {
            this.setProperty(BOCriteria.PROPERTY_SERIES_NAME, value);
        }
        get dataSource() {
            return this.getProperty(BOCriteria.PROPERTY_DATASOURCE_NAME);
        }
        set dataSource(value) {
            this.setProperty(BOCriteria.PROPERTY_DATASOURCE_NAME, value);
        }
        get createDate() {
            return this.getProperty(BOCriteria.PROPERTY_CREATEDATE_NAME);
        }
        set createDate(value) {
            this.setProperty(BOCriteria.PROPERTY_CREATEDATE_NAME, value);
        }
        get createTime() {
            return this.getProperty(BOCriteria.PROPERTY_CREATETIME_NAME);
        }
        set createTime(value) {
            this.setProperty(BOCriteria.PROPERTY_CREATETIME_NAME, value);
        }
        get updateDate() {
            return this.getProperty(BOCriteria.PROPERTY_UPDATEDATE_NAME);
        }
        set updateDate(value) {
            this.setProperty(BOCriteria.PROPERTY_UPDATEDATE_NAME, value);
        }
        get updateTime() {
            return this.getProperty(BOCriteria.PROPERTY_UPDATETIME_NAME);
        }
        set updateTime(value) {
            this.setProperty(BOCriteria.PROPERTY_UPDATETIME_NAME, value);
        }
        get createUserSign() {
            return this.getProperty(BOCriteria.PROPERTY_CREATEUSERSIGN_NAME);
        }
        set createUserSign(value) {
            this.setProperty(BOCriteria.PROPERTY_CREATEUSERSIGN_NAME, value);
        }
        get updateUserSign() {
            return this.getProperty(BOCriteria.PROPERTY_UPDATEUSERSIGN_NAME);
        }
        set updateUserSign(value) {
            this.setProperty(BOCriteria.PROPERTY_UPDATEUSERSIGN_NAME, value);
        }
        get createActionId() {
            return this.getProperty(BOCriteria.PROPERTY_CREATEACTIONID_NAME);
        }
        set createActionId(value) {
            this.setProperty(BOCriteria.PROPERTY_CREATEACTIONID_NAME, value);
        }
        get updateActionId() {
            return this.getProperty(BOCriteria.PROPERTY_UPDATEACTIONID_NAME);
        }
        set updateActionId(value) {
            this.setProperty(BOCriteria.PROPERTY_UPDATEACTIONID_NAME, value);
        }
        get organization() {
            return this.getProperty(BOCriteria.PROPERTY_ORGANIZATION_NAME);
        }
        set organization(value) {
            this.setProperty(BOCriteria.PROPERTY_ORGANIZATION_NAME, value);
        }
        init() {
            this.objectCode = BOCriteria.BUSINESS_OBJECT_CODE;
        }
    }
    BOCriteria.BUSINESS_OBJECT_CODE = "CC_SYS_BOCRITERIA";
    BOCriteria.PROPERTY_APPLICATIONID_NAME = "ApplicationId";
    BOCriteria.PROPERTY_DATAOWNER_NAME = "DataOwner";
    BOCriteria.PROPERTY_NAME_NAME = "Name";
    BOCriteria.PROPERTY_ACTIVATED_NAME = "Activated";
    BOCriteria.PROPERTY_ORDER_NAME = "Order";
    BOCriteria.PROPERTY_BELONGROLE_NAME = "BelongRole";
    BOCriteria.PROPERTY_CRITERIADATA_NAME = "CriteriaData";
    BOCriteria.PROPERTY_OBJECTKEY_NAME = "ObjectKey";
    BOCriteria.PROPERTY_OBJECTCODE_NAME = "ObjectCode";
    BOCriteria.PROPERTY_LOGINST_NAME = "LogInst";
    BOCriteria.PROPERTY_SERIES_NAME = "Series";
    BOCriteria.PROPERTY_DATASOURCE_NAME = "DataSource";
    BOCriteria.PROPERTY_CREATEDATE_NAME = "CreateDate";
    BOCriteria.PROPERTY_CREATETIME_NAME = "CreateTime";
    BOCriteria.PROPERTY_UPDATEDATE_NAME = "UpdateDate";
    BOCriteria.PROPERTY_UPDATETIME_NAME = "UpdateTime";
    BOCriteria.PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";
    BOCriteria.PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";
    BOCriteria.PROPERTY_CREATEACTIONID_NAME = "CreateActionId";
    BOCriteria.PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";
    BOCriteria.PROPERTY_ORGANIZATION_NAME = "Organization";
    exports.BOCriteria = BOCriteria;
});
