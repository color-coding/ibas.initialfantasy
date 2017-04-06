define(["require", "exports", "ibas/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BOFiltering extends index_1.BOSimple {
        constructor() {
            super();
        }
        get roleCode() {
            return this.getProperty(BOFiltering.PROPERTY_ROLECODE_NAME);
        }
        set roleCode(value) {
            this.setProperty(BOFiltering.PROPERTY_ROLECODE_NAME, value);
        }
        get bOCode() {
            return this.getProperty(BOFiltering.PROPERTY_BOCODE_NAME);
        }
        set bOCode(value) {
            this.setProperty(BOFiltering.PROPERTY_BOCODE_NAME, value);
        }
        get activated() {
            return this.getProperty(BOFiltering.PROPERTY_ACTIVATED_NAME);
        }
        set activated(value) {
            this.setProperty(BOFiltering.PROPERTY_ACTIVATED_NAME, value);
        }
        get name() {
            return this.getProperty(BOFiltering.PROPERTY_NAME_NAME);
        }
        set name(value) {
            this.setProperty(BOFiltering.PROPERTY_NAME_NAME, value);
        }
        get objectKey() {
            return this.getProperty(BOFiltering.PROPERTY_OBJECTKEY_NAME);
        }
        set objectKey(value) {
            this.setProperty(BOFiltering.PROPERTY_OBJECTKEY_NAME, value);
        }
        get objectCode() {
            return this.getProperty(BOFiltering.PROPERTY_OBJECTCODE_NAME);
        }
        set objectCode(value) {
            this.setProperty(BOFiltering.PROPERTY_OBJECTCODE_NAME, value);
        }
        get logInst() {
            return this.getProperty(BOFiltering.PROPERTY_LOGINST_NAME);
        }
        set logInst(value) {
            this.setProperty(BOFiltering.PROPERTY_LOGINST_NAME, value);
        }
        get series() {
            return this.getProperty(BOFiltering.PROPERTY_SERIES_NAME);
        }
        set series(value) {
            this.setProperty(BOFiltering.PROPERTY_SERIES_NAME, value);
        }
        get dataSource() {
            return this.getProperty(BOFiltering.PROPERTY_DATASOURCE_NAME);
        }
        set dataSource(value) {
            this.setProperty(BOFiltering.PROPERTY_DATASOURCE_NAME, value);
        }
        get createDate() {
            return this.getProperty(BOFiltering.PROPERTY_CREATEDATE_NAME);
        }
        set createDate(value) {
            this.setProperty(BOFiltering.PROPERTY_CREATEDATE_NAME, value);
        }
        get createTime() {
            return this.getProperty(BOFiltering.PROPERTY_CREATETIME_NAME);
        }
        set createTime(value) {
            this.setProperty(BOFiltering.PROPERTY_CREATETIME_NAME, value);
        }
        get updateDate() {
            return this.getProperty(BOFiltering.PROPERTY_UPDATEDATE_NAME);
        }
        set updateDate(value) {
            this.setProperty(BOFiltering.PROPERTY_UPDATEDATE_NAME, value);
        }
        get updateTime() {
            return this.getProperty(BOFiltering.PROPERTY_UPDATETIME_NAME);
        }
        set updateTime(value) {
            this.setProperty(BOFiltering.PROPERTY_UPDATETIME_NAME, value);
        }
        get createActionId() {
            return this.getProperty(BOFiltering.PROPERTY_CREATEACTIONID_NAME);
        }
        set createActionId(value) {
            this.setProperty(BOFiltering.PROPERTY_CREATEACTIONID_NAME, value);
        }
        get updateActionId() {
            return this.getProperty(BOFiltering.PROPERTY_UPDATEACTIONID_NAME);
        }
        set updateActionId(value) {
            this.setProperty(BOFiltering.PROPERTY_UPDATEACTIONID_NAME, value);
        }
        get createUserSign() {
            return this.getProperty(BOFiltering.PROPERTY_CREATEUSERSIGN_NAME);
        }
        set createUserSign(value) {
            this.setProperty(BOFiltering.PROPERTY_CREATEUSERSIGN_NAME, value);
        }
        get updateUserSign() {
            return this.getProperty(BOFiltering.PROPERTY_UPDATEUSERSIGN_NAME);
        }
        set updateUserSign(value) {
            this.setProperty(BOFiltering.PROPERTY_UPDATEUSERSIGN_NAME, value);
        }
        get dataOwner() {
            return this.getProperty(BOFiltering.PROPERTY_DATAOWNER_NAME);
        }
        set dataOwner(value) {
            this.setProperty(BOFiltering.PROPERTY_DATAOWNER_NAME, value);
        }
        get organization() {
            return this.getProperty(BOFiltering.PROPERTY_ORGANIZATION_NAME);
        }
        set organization(value) {
            this.setProperty(BOFiltering.PROPERTY_ORGANIZATION_NAME, value);
        }
        get bOFilteringConditions() {
            return this.getProperty(BOFiltering.PROPERTY_BOFILTERINGCONDITIONS_NAME);
        }
        set bOFilteringConditions(value) {
            this.setProperty(BOFiltering.PROPERTY_BOFILTERINGCONDITIONS_NAME, value);
        }
        init() {
            this.bOFilteringConditions = new BOFilteringConditions(this);
            this.objectCode = BOFiltering.BUSINESS_OBJECT_CODE;
        }
    }
    BOFiltering.BUSINESS_OBJECT_CODE = "CC_SYS_BOFILTERING";
    BOFiltering.PROPERTY_ROLECODE_NAME = "RoleCode";
    BOFiltering.PROPERTY_BOCODE_NAME = "BOCode";
    BOFiltering.PROPERTY_ACTIVATED_NAME = "Activated";
    BOFiltering.PROPERTY_NAME_NAME = "Name";
    BOFiltering.PROPERTY_OBJECTKEY_NAME = "ObjectKey";
    BOFiltering.PROPERTY_OBJECTCODE_NAME = "ObjectCode";
    BOFiltering.PROPERTY_LOGINST_NAME = "LogInst";
    BOFiltering.PROPERTY_SERIES_NAME = "Series";
    BOFiltering.PROPERTY_DATASOURCE_NAME = "DataSource";
    BOFiltering.PROPERTY_CREATEDATE_NAME = "CreateDate";
    BOFiltering.PROPERTY_CREATETIME_NAME = "CreateTime";
    BOFiltering.PROPERTY_UPDATEDATE_NAME = "UpdateDate";
    BOFiltering.PROPERTY_UPDATETIME_NAME = "UpdateTime";
    BOFiltering.PROPERTY_CREATEACTIONID_NAME = "CreateActionId";
    BOFiltering.PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";
    BOFiltering.PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";
    BOFiltering.PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";
    BOFiltering.PROPERTY_DATAOWNER_NAME = "DataOwner";
    BOFiltering.PROPERTY_ORGANIZATION_NAME = "Organization";
    BOFiltering.PROPERTY_BOFILTERINGCONDITIONS_NAME = "BOFilteringConditions";
    exports.BOFiltering = BOFiltering;
    class BOFilteringCondition extends index_1.BOSimpleLine {
        constructor() {
            super();
        }
        get objectKey() {
            return this.getProperty(BOFilteringCondition.PROPERTY_OBJECTKEY_NAME);
        }
        set objectKey(value) {
            this.setProperty(BOFilteringCondition.PROPERTY_OBJECTKEY_NAME, value);
        }
        get objectCode() {
            return this.getProperty(BOFilteringCondition.PROPERTY_OBJECTCODE_NAME);
        }
        set objectCode(value) {
            this.setProperty(BOFilteringCondition.PROPERTY_OBJECTCODE_NAME, value);
        }
        get lineId() {
            return this.getProperty(BOFilteringCondition.PROPERTY_LINEID_NAME);
        }
        set lineId(value) {
            this.setProperty(BOFilteringCondition.PROPERTY_LINEID_NAME, value);
        }
        get logInst() {
            return this.getProperty(BOFilteringCondition.PROPERTY_LOGINST_NAME);
        }
        set logInst(value) {
            this.setProperty(BOFilteringCondition.PROPERTY_LOGINST_NAME, value);
        }
        get dataSource() {
            return this.getProperty(BOFilteringCondition.PROPERTY_DATASOURCE_NAME);
        }
        set dataSource(value) {
            this.setProperty(BOFilteringCondition.PROPERTY_DATASOURCE_NAME, value);
        }
        get createDate() {
            return this.getProperty(BOFilteringCondition.PROPERTY_CREATEDATE_NAME);
        }
        set createDate(value) {
            this.setProperty(BOFilteringCondition.PROPERTY_CREATEDATE_NAME, value);
        }
        get createTime() {
            return this.getProperty(BOFilteringCondition.PROPERTY_CREATETIME_NAME);
        }
        set createTime(value) {
            this.setProperty(BOFilteringCondition.PROPERTY_CREATETIME_NAME, value);
        }
        get updateDate() {
            return this.getProperty(BOFilteringCondition.PROPERTY_UPDATEDATE_NAME);
        }
        set updateDate(value) {
            this.setProperty(BOFilteringCondition.PROPERTY_UPDATEDATE_NAME, value);
        }
        get updateTime() {
            return this.getProperty(BOFilteringCondition.PROPERTY_UPDATETIME_NAME);
        }
        set updateTime(value) {
            this.setProperty(BOFilteringCondition.PROPERTY_UPDATETIME_NAME, value);
        }
        get createUserSign() {
            return this.getProperty(BOFilteringCondition.PROPERTY_CREATEUSERSIGN_NAME);
        }
        set createUserSign(value) {
            this.setProperty(BOFilteringCondition.PROPERTY_CREATEUSERSIGN_NAME, value);
        }
        get updateUserSign() {
            return this.getProperty(BOFilteringCondition.PROPERTY_UPDATEUSERSIGN_NAME);
        }
        set updateUserSign(value) {
            this.setProperty(BOFilteringCondition.PROPERTY_UPDATEUSERSIGN_NAME, value);
        }
        get createActionId() {
            return this.getProperty(BOFilteringCondition.PROPERTY_CREATEACTIONID_NAME);
        }
        set createActionId(value) {
            this.setProperty(BOFilteringCondition.PROPERTY_CREATEACTIONID_NAME, value);
        }
        get updateActionId() {
            return this.getProperty(BOFilteringCondition.PROPERTY_UPDATEACTIONID_NAME);
        }
        set updateActionId(value) {
            this.setProperty(BOFilteringCondition.PROPERTY_UPDATEACTIONID_NAME, value);
        }
        get propertyName() {
            return this.getProperty(BOFilteringCondition.PROPERTY_PROPERTYNAME_NAME);
        }
        set propertyName(value) {
            this.setProperty(BOFilteringCondition.PROPERTY_PROPERTYNAME_NAME, value);
        }
        get conditionValue() {
            return this.getProperty(BOFilteringCondition.PROPERTY_CONDITIONVALUE_NAME);
        }
        set conditionValue(value) {
            this.setProperty(BOFilteringCondition.PROPERTY_CONDITIONVALUE_NAME, value);
        }
        get operation() {
            return this.getProperty(BOFilteringCondition.PROPERTY_OPERATION_NAME);
        }
        set operation(value) {
            this.setProperty(BOFilteringCondition.PROPERTY_OPERATION_NAME, value);
        }
        get relationship() {
            return this.getProperty(BOFilteringCondition.PROPERTY_RELATIONSHIP_NAME);
        }
        set relationship(value) {
            this.setProperty(BOFilteringCondition.PROPERTY_RELATIONSHIP_NAME, value);
        }
        init() {
        }
    }
    BOFilteringCondition.PROPERTY_OBJECTKEY_NAME = "ObjectKey";
    BOFilteringCondition.PROPERTY_OBJECTCODE_NAME = "ObjectCode";
    BOFilteringCondition.PROPERTY_LINEID_NAME = "LineId";
    BOFilteringCondition.PROPERTY_LOGINST_NAME = "LogInst";
    BOFilteringCondition.PROPERTY_DATASOURCE_NAME = "DataSource";
    BOFilteringCondition.PROPERTY_CREATEDATE_NAME = "CreateDate";
    BOFilteringCondition.PROPERTY_CREATETIME_NAME = "CreateTime";
    BOFilteringCondition.PROPERTY_UPDATEDATE_NAME = "UpdateDate";
    BOFilteringCondition.PROPERTY_UPDATETIME_NAME = "UpdateTime";
    BOFilteringCondition.PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";
    BOFilteringCondition.PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";
    BOFilteringCondition.PROPERTY_CREATEACTIONID_NAME = "CreateActionId";
    BOFilteringCondition.PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";
    BOFilteringCondition.PROPERTY_PROPERTYNAME_NAME = "PropertyName";
    BOFilteringCondition.PROPERTY_CONDITIONVALUE_NAME = "ConditionValue";
    BOFilteringCondition.PROPERTY_OPERATION_NAME = "Operation";
    BOFilteringCondition.PROPERTY_RELATIONSHIP_NAME = "Relationship";
    exports.BOFilteringCondition = BOFilteringCondition;
    class BOFilteringConditions extends index_1.BusinessObjects {
        create() {
            let item = new BOFilteringCondition();
            this.add(item);
            return item;
        }
    }
    exports.BOFilteringConditions = BOFilteringConditions;
});
