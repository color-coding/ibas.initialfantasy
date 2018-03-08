/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace bo {

        /** 系统权限 */
        export class Privilege extends ibas.BOSimple<Privilege> implements IPrivilege {

            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_PRIVILEGE;
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-角色标识 */
            static PROPERTY_ROLECODE_NAME: string = "RoleCode";
            /** 获取-角色标识 */
            get roleCode(): string {
                return this.getProperty<string>(Privilege.PROPERTY_ROLECODE_NAME);
            }
            /** 设置-角色标识 */
            set roleCode(value: string) {
                this.setProperty(Privilege.PROPERTY_ROLECODE_NAME, value);
            }

            /** 映射的属性名称-平台标识 */
            static PROPERTY_PLATFORMID_NAME: string = "PlatformId";
            /** 获取-平台标识 */
            get platformId(): string {
                return this.getProperty<string>(Privilege.PROPERTY_PLATFORMID_NAME);
            }
            /** 设置-平台标识 */
            set platformId(value: string) {
                this.setProperty(Privilege.PROPERTY_PLATFORMID_NAME, value);
            }

            /** 映射的属性名称-模块标识 */
            static PROPERTY_MODULEID_NAME: string = "ModuleId";
            /** 获取-模块标识 */
            get moduleId(): string {
                return this.getProperty<string>(Privilege.PROPERTY_MODULEID_NAME);
            }
            /** 设置-模块标识 */
            set moduleId(value: string) {
                this.setProperty(Privilege.PROPERTY_MODULEID_NAME, value);
            }

            /** 映射的属性名称-目标标识 */
            static PROPERTY_TARGET_NAME: string = "Target";
            /** 获取-目标标识 */
            get target(): string {
                return this.getProperty<string>(Privilege.PROPERTY_TARGET_NAME);
            }
            /** 设置-目标标识 */
            set target(value: string) {
                this.setProperty(Privilege.PROPERTY_TARGET_NAME, value);
            }

            /** 映射的属性名称-是否可用 */
            static PROPERTY_ACTIVATED_NAME: string = "Activated";
            /** 获取-是否可用 */
            get activated(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Privilege.PROPERTY_ACTIVATED_NAME);
            }
            /** 设置-是否可用 */
            set activated(value: ibas.emYesNo) {
                this.setProperty(Privilege.PROPERTY_ACTIVATED_NAME, value);
            }

            /** 映射的属性名称-权限类型 */
            static PROPERTY_AUTHORISEVALUE_NAME: string = "AuthoriseValue";
            /** 获取-权限类型 */
            get authoriseValue(): ibas.emAuthoriseType {
                return this.getProperty<ibas.emAuthoriseType>(Privilege.PROPERTY_AUTHORISEVALUE_NAME);
            }
            /** 设置-权限类型 */
            set authoriseValue(value: ibas.emAuthoriseType) {
                this.setProperty(Privilege.PROPERTY_AUTHORISEVALUE_NAME, value);
            }

            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(Privilege.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(Privilege.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(Privilege.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(Privilege.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(Privilege.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(Privilege.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(Privilege.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(Privilege.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-修改日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(Privilege.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-修改日期 */
            set updateDate(value: Date) {
                this.setProperty(Privilege.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-修改时间 */
            get updateTime(): number {
                return this.getProperty<number>(Privilege.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-修改时间 */
            set updateTime(value: number) {
                this.setProperty(Privilege.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-实例号（版本） */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号（版本） */
            get logInst(): number {
                return this.getProperty<number>(Privilege.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号（版本） */
            set logInst(value: number) {
                this.setProperty(Privilege.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string = "Series";
            /** 获取-服务系列 */
            get series(): number {
                return this.getProperty<number>(Privilege.PROPERTY_SERIES_NAME);
            }
            /** 设置-服务系列 */
            set series(value: number) {
                this.setProperty(Privilege.PROPERTY_SERIES_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(Privilege.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(Privilege.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(Privilege.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(Privilege.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-修改用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(Privilege.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-修改用户 */
            set updateUserSign(value: number) {
                this.setProperty(Privilege.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(Privilege.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(Privilege.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(Privilege.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(Privilege.PROPERTY_UPDATEACTIONID_NAME, value);
            }



            /** 初始化数据 */
            protected init(): void {
                this.objectCode = ibas.config.applyVariables(Privilege.BUSINESS_OBJECT_CODE);
                this.activated = ibas.emYesNo.YES;
            }
        }
    }
}
