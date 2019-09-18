/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace bo {

        /** 业务对象筛选 */
        export class BOFiltering extends ibas.BOSimple<BOFiltering> implements IBOFiltering {

            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_BOFILTERING;
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-角色标识 */
            static PROPERTY_ROLECODE_NAME: string = "RoleCode";
            /** 获取-角色标识 */
            get roleCode(): string {
                return this.getProperty<string>(BOFiltering.PROPERTY_ROLECODE_NAME);
            }
            /** 设置-角色标识 */
            set roleCode(value: string) {
                this.setProperty(BOFiltering.PROPERTY_ROLECODE_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_BOCODE_NAME: string = "BOCode";
            /** 获取-对象类型 */
            get boCode(): string {
                return this.getProperty<string>(BOFiltering.PROPERTY_BOCODE_NAME);
            }
            /** 设置-对象类型 */
            set boCode(value: string) {
                this.setProperty(BOFiltering.PROPERTY_BOCODE_NAME, value);
            }

            /** 映射的属性名称-类别 */
            static PROPERTY_CATEGORY_NAME: string = "Category";
            /** 获取-类别 */
            get category(): emFilteringCategory {
                return this.getProperty<emFilteringCategory>(BOFiltering.PROPERTY_CATEGORY_NAME);
            }
            /** 设置-类别 */
            set category(value: emFilteringCategory) {
                this.setProperty(BOFiltering.PROPERTY_CATEGORY_NAME, value);
            }

            /** 映射的属性名称-激活的 */
            static PROPERTY_ACTIVATED_NAME: string = "Activated";
            /** 获取-激活的 */
            get activated(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(BOFiltering.PROPERTY_ACTIVATED_NAME);
            }
            /** 设置-激活的 */
            set activated(value: ibas.emYesNo) {
                this.setProperty(BOFiltering.PROPERTY_ACTIVATED_NAME, value);
            }

            /** 映射的属性名称-筛选类型 */
            static PROPERTY_FILTERINGTYPE_NAME: string = "FilteringType";
            /** 获取-筛选类型 */
            get filteringType(): emFilteringType {
                return this.getProperty<emFilteringType>(BOFiltering.PROPERTY_FILTERINGTYPE_NAME);
            }
            /** 设置-筛选类型 */
            set filteringType(value: emFilteringType) {
                this.setProperty(BOFiltering.PROPERTY_FILTERINGTYPE_NAME, value);
            }

            /** 映射的属性名称-名称 */
            static PROPERTY_NAME_NAME: string = "Name";
            /** 获取-名称 */
            get name(): string {
                return this.getProperty<string>(BOFiltering.PROPERTY_NAME_NAME);
            }
            /** 设置-名称 */
            set name(value: string) {
                this.setProperty(BOFiltering.PROPERTY_NAME_NAME, value);
            }

            /** 映射的属性名称-编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-编号 */
            get objectKey(): number {
                return this.getProperty<number>(BOFiltering.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-编号 */
            set objectKey(value: number) {
                this.setProperty(BOFiltering.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-类型 */
            get objectCode(): string {
                return this.getProperty<string>(BOFiltering.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-类型 */
            set objectCode(value: string) {
                this.setProperty(BOFiltering.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-实例号（版本） */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号（版本） */
            get logInst(): number {
                return this.getProperty<number>(BOFiltering.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号（版本） */
            set logInst(value: number) {
                this.setProperty(BOFiltering.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string = "Series";
            /** 获取-服务系列 */
            get series(): number {
                return this.getProperty<number>(BOFiltering.PROPERTY_SERIES_NAME);
            }
            /** 设置-服务系列 */
            set series(value: number) {
                this.setProperty(BOFiltering.PROPERTY_SERIES_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(BOFiltering.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(BOFiltering.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(BOFiltering.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(BOFiltering.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(BOFiltering.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(BOFiltering.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-修改日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(BOFiltering.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-修改日期 */
            set updateDate(value: Date) {
                this.setProperty(BOFiltering.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-修改时间 */
            get updateTime(): number {
                return this.getProperty<number>(BOFiltering.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-修改时间 */
            set updateTime(value: number) {
                this.setProperty(BOFiltering.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(BOFiltering.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(BOFiltering.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(BOFiltering.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(BOFiltering.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(BOFiltering.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(BOFiltering.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-修改用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(BOFiltering.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-修改用户 */
            set updateUserSign(value: number) {
                this.setProperty(BOFiltering.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
            /** 获取-数据所有者 */
            get dataOwner(): number {
                return this.getProperty<number>(BOFiltering.PROPERTY_DATAOWNER_NAME);
            }
            /** 设置-数据所有者 */
            set dataOwner(value: number) {
                this.setProperty(BOFiltering.PROPERTY_DATAOWNER_NAME, value);
            }

            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string = "Organization";
            /** 获取-数据所属组织 */
            get organization(): string {
                return this.getProperty<string>(BOFiltering.PROPERTY_ORGANIZATION_NAME);
            }
            /** 设置-数据所属组织 */
            set organization(value: string) {
                this.setProperty(BOFiltering.PROPERTY_ORGANIZATION_NAME, value);
            }


            /** 映射的属性名称-业务对象筛选-条件集合 */
            static PROPERTY_BOFILTERINGCONDITIONS_NAME: string = "BOFilteringConditions";
            /** 获取-业务对象筛选-条件集合 */
            get boFilteringConditions(): BOFilteringConditions {
                return this.getProperty<BOFilteringConditions>(BOFiltering.PROPERTY_BOFILTERINGCONDITIONS_NAME);
            }
            /** 设置-业务对象筛选-条件集合 */
            set boFilteringConditions(value: BOFilteringConditions) {
                this.setProperty(BOFiltering.PROPERTY_BOFILTERINGCONDITIONS_NAME, value);
            }


            /** 初始化数据 */
            protected init(): void {
                this.boFilteringConditions = new BOFilteringConditions(this);
                this.objectCode = ibas.config.applyVariables(BOFiltering.BUSINESS_OBJECT_CODE);
                this.category = emFilteringCategory.READ;
                this.activated = ibas.emYesNo.YES;
            }
        }

        /** 业务对象筛选-条件 */
        export class BOFilteringCondition extends ibas.BOSimpleLine<BOFilteringCondition> implements IBOFilteringCondition {

            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-编号 */
            get objectKey(): number {
                return this.getProperty<number>(BOFilteringCondition.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-编号 */
            set objectKey(value: number) {
                this.setProperty(BOFilteringCondition.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-类型 */
            get objectCode(): string {
                return this.getProperty<string>(BOFilteringCondition.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-类型 */
            set objectCode(value: string) {
                this.setProperty(BOFilteringCondition.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-行号 */
            static PROPERTY_LINEID_NAME: string = "LineId";
            /** 获取-行号 */
            get lineId(): number {
                return this.getProperty<number>(BOFilteringCondition.PROPERTY_LINEID_NAME);
            }
            /** 设置-行号 */
            set lineId(value: number) {
                this.setProperty(BOFilteringCondition.PROPERTY_LINEID_NAME, value);
            }

            /** 映射的属性名称-实例号（版本） */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号（版本） */
            get logInst(): number {
                return this.getProperty<number>(BOFilteringCondition.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号（版本） */
            set logInst(value: number) {
                this.setProperty(BOFilteringCondition.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(BOFilteringCondition.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(BOFilteringCondition.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(BOFilteringCondition.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(BOFilteringCondition.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(BOFilteringCondition.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(BOFilteringCondition.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-修改日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(BOFilteringCondition.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-修改日期 */
            set updateDate(value: Date) {
                this.setProperty(BOFilteringCondition.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-修改时间 */
            get updateTime(): number {
                return this.getProperty<number>(BOFilteringCondition.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-修改时间 */
            set updateTime(value: number) {
                this.setProperty(BOFilteringCondition.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(BOFilteringCondition.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(BOFilteringCondition.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-修改用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(BOFilteringCondition.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-修改用户 */
            set updateUserSign(value: number) {
                this.setProperty(BOFilteringCondition.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(BOFilteringCondition.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(BOFilteringCondition.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(BOFilteringCondition.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(BOFilteringCondition.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-取值属性 */
            static PROPERTY_PROPERTYNAME_NAME: string = "PropertyName";
            /** 获取-取值属性 */
            get propertyName(): string {
                return this.getProperty<string>(BOFilteringCondition.PROPERTY_PROPERTYNAME_NAME);
            }
            /** 设置-取值属性 */
            set propertyName(value: string) {
                this.setProperty(BOFilteringCondition.PROPERTY_PROPERTYNAME_NAME, value);
            }

            /** 映射的属性名称-比较的值 */
            static PROPERTY_CONDITIONVALUE_NAME: string = "ConditionValue";
            /** 获取-比较的值 */
            get conditionValue(): string {
                return this.getProperty<string>(BOFilteringCondition.PROPERTY_CONDITIONVALUE_NAME);
            }
            /** 设置-比较的值 */
            set conditionValue(value: string) {
                this.setProperty(BOFilteringCondition.PROPERTY_CONDITIONVALUE_NAME, value);
            }

            /** 映射的属性名称-比较的方法 */
            static PROPERTY_OPERATION_NAME: string = "Operation";
            /** 获取-比较的方法 */
            get operation(): emConditionOperation {
                return this.getProperty<emConditionOperation>(BOFilteringCondition.PROPERTY_OPERATION_NAME);
            }
            /** 设置-比较的方法 */
            set operation(value: emConditionOperation) {
                this.setProperty(BOFilteringCondition.PROPERTY_OPERATION_NAME, value);
            }

            /** 映射的属性名称-与上一个条件的关系 */
            static PROPERTY_RELATIONSHIP_NAME: string = "Relationship";
            /** 获取-与上一个条件的关系 */
            get relationship(): emConditionRelationship {
                return this.getProperty<emConditionRelationship>(BOFilteringCondition.PROPERTY_RELATIONSHIP_NAME);
            }
            /** 设置-与上一个条件的关系 */
            set relationship(value: emConditionRelationship) {
                this.setProperty(BOFilteringCondition.PROPERTY_RELATIONSHIP_NAME, value);
            }

            /** 映射的属性名称-开括号数 */
            static PROPERTY_BRACKETOPEN_NAME: string = "BracketOpen";
            /** 获取-开括号数 */
            get bracketOpen(): number {
                return this.getProperty<number>(BOFilteringCondition.PROPERTY_BRACKETOPEN_NAME);
            }
            /** 设置-开括号数 */
            set bracketOpen(value: number) {
                this.setProperty(BOFilteringCondition.PROPERTY_BRACKETOPEN_NAME, value);
            }

            /** 映射的属性名称-闭括号数 */
            static PROPERTY_BRACKETCLOSE_NAME: string = "BracketClose";
            /** 获取-闭括号数 */
            get bracketClose(): number {
                return this.getProperty<number>(BOFilteringCondition.PROPERTY_BRACKETCLOSE_NAME);
            }
            /** 设置-闭括号数 */
            set bracketClose(value: number) {
                this.setProperty(BOFilteringCondition.PROPERTY_BRACKETCLOSE_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
                this.operation = emConditionOperation.EQUAL;
                this.relationship = emConditionRelationship.AND;
            }
        }

        /** 业务对象筛选-条件 集合 */
        export class BOFilteringConditions extends ibas.BusinessObjects<BOFilteringCondition, BOFiltering> implements IBOFilteringConditions {

            /** 创建并添加子项 */
            create(): BOFilteringCondition {
                let item: BOFilteringCondition = new BOFilteringCondition();
                this.add(item);
                return item;
            }
        }
    }
}
