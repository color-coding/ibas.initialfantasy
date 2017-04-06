define(["require", "exports", "ibas/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class OrganizationalStructure extends index_1.BOSimple {
        constructor() {
            super();
        }
        get organization() {
            return this.getProperty(OrganizationalStructure.PROPERTY_ORGANIZATION_NAME);
        }
        set organization(value) {
            this.setProperty(OrganizationalStructure.PROPERTY_ORGANIZATION_NAME, value);
        }
        get belonging() {
            return this.getProperty(OrganizationalStructure.PROPERTY_BELONGING_NAME);
        }
        set belonging(value) {
            this.setProperty(OrganizationalStructure.PROPERTY_BELONGING_NAME, value);
        }
        get manager() {
            return this.getProperty(OrganizationalStructure.PROPERTY_MANAGER_NAME);
        }
        set manager(value) {
            this.setProperty(OrganizationalStructure.PROPERTY_MANAGER_NAME, value);
        }
        get validDate() {
            return this.getProperty(OrganizationalStructure.PROPERTY_VALIDDATE_NAME);
        }
        set validDate(value) {
            this.setProperty(OrganizationalStructure.PROPERTY_VALIDDATE_NAME, value);
        }
        get invalidDate() {
            return this.getProperty(OrganizationalStructure.PROPERTY_INVALIDDATE_NAME);
        }
        set invalidDate(value) {
            this.setProperty(OrganizationalStructure.PROPERTY_INVALIDDATE_NAME, value);
        }
        get objectKey() {
            return this.getProperty(OrganizationalStructure.PROPERTY_OBJECTKEY_NAME);
        }
        set objectKey(value) {
            this.setProperty(OrganizationalStructure.PROPERTY_OBJECTKEY_NAME, value);
        }
        get objectCode() {
            return this.getProperty(OrganizationalStructure.PROPERTY_OBJECTCODE_NAME);
        }
        set objectCode(value) {
            this.setProperty(OrganizationalStructure.PROPERTY_OBJECTCODE_NAME, value);
        }
        get createDate() {
            return this.getProperty(OrganizationalStructure.PROPERTY_CREATEDATE_NAME);
        }
        set createDate(value) {
            this.setProperty(OrganizationalStructure.PROPERTY_CREATEDATE_NAME, value);
        }
        get createTime() {
            return this.getProperty(OrganizationalStructure.PROPERTY_CREATETIME_NAME);
        }
        set createTime(value) {
            this.setProperty(OrganizationalStructure.PROPERTY_CREATETIME_NAME, value);
        }
        get updateDate() {
            return this.getProperty(OrganizationalStructure.PROPERTY_UPDATEDATE_NAME);
        }
        set updateDate(value) {
            this.setProperty(OrganizationalStructure.PROPERTY_UPDATEDATE_NAME, value);
        }
        get updateTime() {
            return this.getProperty(OrganizationalStructure.PROPERTY_UPDATETIME_NAME);
        }
        set updateTime(value) {
            this.setProperty(OrganizationalStructure.PROPERTY_UPDATETIME_NAME, value);
        }
        get dataSource() {
            return this.getProperty(OrganizationalStructure.PROPERTY_DATASOURCE_NAME);
        }
        set dataSource(value) {
            this.setProperty(OrganizationalStructure.PROPERTY_DATASOURCE_NAME, value);
        }
        get logInst() {
            return this.getProperty(OrganizationalStructure.PROPERTY_LOGINST_NAME);
        }
        set logInst(value) {
            this.setProperty(OrganizationalStructure.PROPERTY_LOGINST_NAME, value);
        }
        get series() {
            return this.getProperty(OrganizationalStructure.PROPERTY_SERIES_NAME);
        }
        set series(value) {
            this.setProperty(OrganizationalStructure.PROPERTY_SERIES_NAME, value);
        }
        get createUserSign() {
            return this.getProperty(OrganizationalStructure.PROPERTY_CREATEUSERSIGN_NAME);
        }
        set createUserSign(value) {
            this.setProperty(OrganizationalStructure.PROPERTY_CREATEUSERSIGN_NAME, value);
        }
        get updateUserSign() {
            return this.getProperty(OrganizationalStructure.PROPERTY_UPDATEUSERSIGN_NAME);
        }
        set updateUserSign(value) {
            this.setProperty(OrganizationalStructure.PROPERTY_UPDATEUSERSIGN_NAME, value);
        }
        get createActionId() {
            return this.getProperty(OrganizationalStructure.PROPERTY_CREATEACTIONID_NAME);
        }
        set createActionId(value) {
            this.setProperty(OrganizationalStructure.PROPERTY_CREATEACTIONID_NAME, value);
        }
        get updateActionId() {
            return this.getProperty(OrganizationalStructure.PROPERTY_UPDATEACTIONID_NAME);
        }
        set updateActionId(value) {
            this.setProperty(OrganizationalStructure.PROPERTY_UPDATEACTIONID_NAME, value);
        }
        get organizationalRoles() {
            return this.getProperty(OrganizationalStructure.PROPERTY_ORGANIZATIONALROLES_NAME);
        }
        set organizationalRoles(value) {
            this.setProperty(OrganizationalStructure.PROPERTY_ORGANIZATIONALROLES_NAME, value);
        }
        init() {
            this.organizationalRoles = new OrganizationalRoles(this);
            this.objectCode = OrganizationalStructure.BUSINESS_OBJECT_CODE;
        }
    }
    OrganizationalStructure.BUSINESS_OBJECT_CODE = "CC_SYS_ORG_STRUCTURE";
    OrganizationalStructure.PROPERTY_ORGANIZATION_NAME = "Organization";
    OrganizationalStructure.PROPERTY_BELONGING_NAME = "Belonging";
    OrganizationalStructure.PROPERTY_MANAGER_NAME = "Manager";
    OrganizationalStructure.PROPERTY_VALIDDATE_NAME = "ValidDate";
    OrganizationalStructure.PROPERTY_INVALIDDATE_NAME = "InvalidDate";
    OrganizationalStructure.PROPERTY_OBJECTKEY_NAME = "ObjectKey";
    OrganizationalStructure.PROPERTY_OBJECTCODE_NAME = "ObjectCode";
    OrganizationalStructure.PROPERTY_CREATEDATE_NAME = "CreateDate";
    OrganizationalStructure.PROPERTY_CREATETIME_NAME = "CreateTime";
    OrganizationalStructure.PROPERTY_UPDATEDATE_NAME = "UpdateDate";
    OrganizationalStructure.PROPERTY_UPDATETIME_NAME = "UpdateTime";
    OrganizationalStructure.PROPERTY_DATASOURCE_NAME = "DataSource";
    OrganizationalStructure.PROPERTY_LOGINST_NAME = "LogInst";
    OrganizationalStructure.PROPERTY_SERIES_NAME = "Series";
    OrganizationalStructure.PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";
    OrganizationalStructure.PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";
    OrganizationalStructure.PROPERTY_CREATEACTIONID_NAME = "CreateActionId";
    OrganizationalStructure.PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";
    OrganizationalStructure.PROPERTY_ORGANIZATIONALROLES_NAME = "OrganizationalRoles";
    exports.OrganizationalStructure = OrganizationalStructure;
    class OrganizationalRole extends index_1.BOSimpleLine {
        constructor() {
            super();
        }
        get objectKey() {
            return this.getProperty(OrganizationalRole.PROPERTY_OBJECTKEY_NAME);
        }
        set objectKey(value) {
            this.setProperty(OrganizationalRole.PROPERTY_OBJECTKEY_NAME, value);
        }
        get objectCode() {
            return this.getProperty(OrganizationalRole.PROPERTY_OBJECTCODE_NAME);
        }
        set objectCode(value) {
            this.setProperty(OrganizationalRole.PROPERTY_OBJECTCODE_NAME, value);
        }
        get lineId() {
            return this.getProperty(OrganizationalRole.PROPERTY_LINEID_NAME);
        }
        set lineId(value) {
            this.setProperty(OrganizationalRole.PROPERTY_LINEID_NAME, value);
        }
        get logInst() {
            return this.getProperty(OrganizationalRole.PROPERTY_LOGINST_NAME);
        }
        set logInst(value) {
            this.setProperty(OrganizationalRole.PROPERTY_LOGINST_NAME, value);
        }
        get dataSource() {
            return this.getProperty(OrganizationalRole.PROPERTY_DATASOURCE_NAME);
        }
        set dataSource(value) {
            this.setProperty(OrganizationalRole.PROPERTY_DATASOURCE_NAME, value);
        }
        get createDate() {
            return this.getProperty(OrganizationalRole.PROPERTY_CREATEDATE_NAME);
        }
        set createDate(value) {
            this.setProperty(OrganizationalRole.PROPERTY_CREATEDATE_NAME, value);
        }
        get createTime() {
            return this.getProperty(OrganizationalRole.PROPERTY_CREATETIME_NAME);
        }
        set createTime(value) {
            this.setProperty(OrganizationalRole.PROPERTY_CREATETIME_NAME, value);
        }
        get updateDate() {
            return this.getProperty(OrganizationalRole.PROPERTY_UPDATEDATE_NAME);
        }
        set updateDate(value) {
            this.setProperty(OrganizationalRole.PROPERTY_UPDATEDATE_NAME, value);
        }
        get updateTime() {
            return this.getProperty(OrganizationalRole.PROPERTY_UPDATETIME_NAME);
        }
        set updateTime(value) {
            this.setProperty(OrganizationalRole.PROPERTY_UPDATETIME_NAME, value);
        }
        get createUserSign() {
            return this.getProperty(OrganizationalRole.PROPERTY_CREATEUSERSIGN_NAME);
        }
        set createUserSign(value) {
            this.setProperty(OrganizationalRole.PROPERTY_CREATEUSERSIGN_NAME, value);
        }
        get updateUserSign() {
            return this.getProperty(OrganizationalRole.PROPERTY_UPDATEUSERSIGN_NAME);
        }
        set updateUserSign(value) {
            this.setProperty(OrganizationalRole.PROPERTY_UPDATEUSERSIGN_NAME, value);
        }
        get createActionId() {
            return this.getProperty(OrganizationalRole.PROPERTY_CREATEACTIONID_NAME);
        }
        set createActionId(value) {
            this.setProperty(OrganizationalRole.PROPERTY_CREATEACTIONID_NAME, value);
        }
        get updateActionId() {
            return this.getProperty(OrganizationalRole.PROPERTY_UPDATEACTIONID_NAME);
        }
        set updateActionId(value) {
            this.setProperty(OrganizationalRole.PROPERTY_UPDATEACTIONID_NAME, value);
        }
        get reference1() {
            return this.getProperty(OrganizationalRole.PROPERTY_REFERENCE1_NAME);
        }
        set reference1(value) {
            this.setProperty(OrganizationalRole.PROPERTY_REFERENCE1_NAME, value);
        }
        get reference2() {
            return this.getProperty(OrganizationalRole.PROPERTY_REFERENCE2_NAME);
        }
        set reference2(value) {
            this.setProperty(OrganizationalRole.PROPERTY_REFERENCE2_NAME, value);
        }
        get role() {
            return this.getProperty(OrganizationalRole.PROPERTY_ROLE_NAME);
        }
        set role(value) {
            this.setProperty(OrganizationalRole.PROPERTY_ROLE_NAME, value);
        }
        init() {
        }
    }
    OrganizationalRole.PROPERTY_OBJECTKEY_NAME = "ObjectKey";
    OrganizationalRole.PROPERTY_OBJECTCODE_NAME = "ObjectCode";
    OrganizationalRole.PROPERTY_LINEID_NAME = "LineId";
    OrganizationalRole.PROPERTY_LOGINST_NAME = "LogInst";
    OrganizationalRole.PROPERTY_DATASOURCE_NAME = "DataSource";
    OrganizationalRole.PROPERTY_CREATEDATE_NAME = "CreateDate";
    OrganizationalRole.PROPERTY_CREATETIME_NAME = "CreateTime";
    OrganizationalRole.PROPERTY_UPDATEDATE_NAME = "UpdateDate";
    OrganizationalRole.PROPERTY_UPDATETIME_NAME = "UpdateTime";
    OrganizationalRole.PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";
    OrganizationalRole.PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";
    OrganizationalRole.PROPERTY_CREATEACTIONID_NAME = "CreateActionId";
    OrganizationalRole.PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";
    OrganizationalRole.PROPERTY_REFERENCE1_NAME = "Reference1";
    OrganizationalRole.PROPERTY_REFERENCE2_NAME = "Reference2";
    OrganizationalRole.PROPERTY_ROLE_NAME = "Role";
    exports.OrganizationalRole = OrganizationalRole;
    class OrganizationalRoles extends index_1.BusinessObjects {
        create() {
            let item = new OrganizationalRole();
            this.add(item);
            return item;
        }
    }
    exports.OrganizationalRoles = OrganizationalRoles;
});
