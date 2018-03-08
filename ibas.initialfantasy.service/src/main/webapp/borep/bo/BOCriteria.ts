/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace bo {

        /** 业务对象检索条件 */
        export class BOCriteria extends ibas.BOSimple<BOCriteria> implements IBOCriteria {

            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_BOCRITERIA;
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-应用标识 */
            static PROPERTY_APPLICATIONID_NAME: string = "ApplicationId";
            /** 获取-应用标识 */
            get applicationId(): string {
                return this.getProperty<string>(BOCriteria.PROPERTY_APPLICATIONID_NAME);
            }
            /** 设置-应用标识 */
            set applicationId(value: string) {
                this.setProperty(BOCriteria.PROPERTY_APPLICATIONID_NAME, value);
            }

            /** 映射的属性名称-检索名称 */
            static PROPERTY_NAME_NAME: string = "Name";
            /** 获取-检索名称 */
            get name(): string {
                return this.getProperty<string>(BOCriteria.PROPERTY_NAME_NAME);
            }
            /** 设置-检索名称 */
            set name(value: string) {
                this.setProperty(BOCriteria.PROPERTY_NAME_NAME, value);
            }

            /** 映射的属性名称-指派类型 */
            static PROPERTY_ASSIGNEDTYPE_NAME: string = "AssignedType";
            /** 获取-指派类型 */
            get assignedType(): emAssignedType {
                return this.getProperty<emAssignedType>(BOCriteria.PROPERTY_ASSIGNEDTYPE_NAME);
            }
            /** 设置-指派类型 */
            set assignedType(value: emAssignedType) {
                this.setProperty(BOCriteria.PROPERTY_ASSIGNEDTYPE_NAME, value);
            }

            /** 映射的属性名称-指派目标 */
            static PROPERTY_ASSIGNED_NAME: string = "Assigned";
            /** 获取-指派目标 */
            get assigned(): string {
                return this.getProperty<string>(BOCriteria.PROPERTY_ASSIGNED_NAME);
            }
            /** 设置-指派目标 */
            set assigned(value: string) {
                this.setProperty(BOCriteria.PROPERTY_ASSIGNED_NAME, value);
            }

            /** 映射的属性名称-激活的 */
            static PROPERTY_ACTIVATED_NAME: string = "Activated";
            /** 获取-激活的 */
            get activated(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(BOCriteria.PROPERTY_ACTIVATED_NAME);
            }
            /** 设置-激活的 */
            set activated(value: ibas.emYesNo) {
                this.setProperty(BOCriteria.PROPERTY_ACTIVATED_NAME, value);
            }

            /** 映射的属性名称-查询数据 */
            static PROPERTY_DATA_NAME: string = "Data";
            /** 获取-查询数据 */
            get data(): string {
                return this.getProperty<string>(BOCriteria.PROPERTY_DATA_NAME);
            }
            /** 设置-查询数据 */
            set data(value: string) {
                this.setProperty(BOCriteria.PROPERTY_DATA_NAME, value);
            }

            /** 映射的属性名称-顺序 */
            static PROPERTY_ORDER_NAME: string = "Order";
            /** 获取-顺序 */
            get order(): number {
                return this.getProperty<number>(BOCriteria.PROPERTY_ORDER_NAME);
            }
            /** 设置-顺序 */
            set order(value: number) {
                this.setProperty(BOCriteria.PROPERTY_ORDER_NAME, value);
            }

            /** 映射的属性名称-编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-编号 */
            get objectKey(): number {
                return this.getProperty<number>(BOCriteria.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-编号 */
            set objectKey(value: number) {
                this.setProperty(BOCriteria.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-类型 */
            get objectCode(): string {
                return this.getProperty<string>(BOCriteria.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-类型 */
            set objectCode(value: string) {
                this.setProperty(BOCriteria.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-实例号（版本） */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号（版本） */
            get logInst(): number {
                return this.getProperty<number>(BOCriteria.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号（版本） */
            set logInst(value: number) {
                this.setProperty(BOCriteria.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-编号系列 */
            static PROPERTY_SERIES_NAME: string = "Series";
            /** 获取-编号系列 */
            get series(): number {
                return this.getProperty<number>(BOCriteria.PROPERTY_SERIES_NAME);
            }
            /** 设置-编号系列 */
            set series(value: number) {
                this.setProperty(BOCriteria.PROPERTY_SERIES_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(BOCriteria.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(BOCriteria.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(BOCriteria.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(BOCriteria.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(BOCriteria.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(BOCriteria.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-修改日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(BOCriteria.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-修改日期 */
            set updateDate(value: Date) {
                this.setProperty(BOCriteria.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-修改时间 */
            get updateTime(): number {
                return this.getProperty<number>(BOCriteria.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-修改时间 */
            set updateTime(value: number) {
                this.setProperty(BOCriteria.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(BOCriteria.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(BOCriteria.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-修改用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(BOCriteria.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-修改用户 */
            set updateUserSign(value: number) {
                this.setProperty(BOCriteria.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(BOCriteria.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(BOCriteria.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(BOCriteria.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(BOCriteria.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string = "Organization";
            /** 获取-数据所属组织 */
            get organization(): string {
                return this.getProperty<string>(BOCriteria.PROPERTY_ORGANIZATION_NAME);
            }
            /** 设置-数据所属组织 */
            set organization(value: string) {
                this.setProperty(BOCriteria.PROPERTY_ORGANIZATION_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
                this.objectCode = ibas.config.applyVariables(BOCriteria.BUSINESS_OBJECT_CODE);
                this.assignedType = emAssignedType.ROLE;
                this.activated = ibas.emYesNo.YES;
            }
        }

    }
}