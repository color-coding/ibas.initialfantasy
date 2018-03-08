/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace bo {

        /** 应用程序模块 */
        export class ApplicationModule extends ibas.BOSimple<ApplicationModule> implements IApplicationModule {

            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_APPLICATIONMODULE;
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-模块标识 */
            static PROPERTY_MODULEID_NAME: string = "ModuleId";
            /** 获取-模块标识 */
            get moduleId(): string {
                return this.getProperty<string>(ApplicationModule.PROPERTY_MODULEID_NAME);
            }
            /** 设置-模块标识 */
            set moduleId(value: string) {
                this.setProperty(ApplicationModule.PROPERTY_MODULEID_NAME, value);
            }

            /** 映射的属性名称-平台标识 */
            static PROPERTY_PLATFORMID_NAME: string = "PlatformId";
            /** 获取-平台标识 */
            get platformId(): string {
                return this.getProperty<string>(ApplicationModule.PROPERTY_PLATFORMID_NAME);
            }
            /** 设置-平台标识 */
            set platformId(value: string) {
                this.setProperty(ApplicationModule.PROPERTY_PLATFORMID_NAME, value);
            }

            /** 映射的属性名称-模块名称 */
            static PROPERTY_MODULENAME_NAME: string = "ModuleName";
            /** 获取-模块名称 */
            get moduleName(): string {
                return this.getProperty<string>(ApplicationModule.PROPERTY_MODULENAME_NAME);
            }
            /** 设置-模块名称 */
            set moduleName(value: string) {
                this.setProperty(ApplicationModule.PROPERTY_MODULENAME_NAME, value);
            }

            /** 映射的属性名称-模块类别 */
            static PROPERTY_MODULECATEGORY_NAME: string = "ModuleCategory";
            /** 获取-模块类别 */
            get moduleCategory(): string {
                return this.getProperty<string>(ApplicationModule.PROPERTY_MODULECATEGORY_NAME);
            }
            /** 设置-模块类别 */
            set moduleCategory(value: string) {
                this.setProperty(ApplicationModule.PROPERTY_MODULECATEGORY_NAME, value);
            }

            /** 映射的属性名称-模块入口 */
            static PROPERTY_MODULEENTRY_NAME: string = "ModuleEntry";
            /** 获取-模块入口 */
            get moduleEntry(): string {
                return this.getProperty<string>(ApplicationModule.PROPERTY_MODULEENTRY_NAME);
            }
            /** 设置-模块入口 */
            set moduleEntry(value: string) {
                this.setProperty(ApplicationModule.PROPERTY_MODULEENTRY_NAME, value);
            }

            /** 映射的属性名称-是否可用 */
            static PROPERTY_ACTIVATED_NAME: string = "Activated";
            /** 获取-是否可用 */
            get activated(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(ApplicationModule.PROPERTY_ACTIVATED_NAME);
            }
            /** 设置-是否可用 */
            set activated(value: ibas.emYesNo) {
                this.setProperty(ApplicationModule.PROPERTY_ACTIVATED_NAME, value);
            }

            /** 映射的属性名称-对象键值 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象键值 */
            get objectKey(): number {
                return this.getProperty<number>(ApplicationModule.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象键值 */
            set objectKey(value: number) {
                this.setProperty(ApplicationModule.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(ApplicationModule.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(ApplicationModule.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(ApplicationModule.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(ApplicationModule.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(ApplicationModule.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(ApplicationModule.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(ApplicationModule.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(ApplicationModule.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-修改日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(ApplicationModule.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-修改日期 */
            set updateDate(value: Date) {
                this.setProperty(ApplicationModule.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-修改时间 */
            get updateTime(): number {
                return this.getProperty<number>(ApplicationModule.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-修改时间 */
            set updateTime(value: number) {
                this.setProperty(ApplicationModule.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(ApplicationModule.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(ApplicationModule.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(ApplicationModule.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(ApplicationModule.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-实例号（版本） */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号（版本） */
            get logInst(): number {
                return this.getProperty<number>(ApplicationModule.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号（版本） */
            set logInst(value: number) {
                this.setProperty(ApplicationModule.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(ApplicationModule.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(ApplicationModule.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-修改用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(ApplicationModule.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-修改用户 */
            set updateUserSign(value: number) {
                this.setProperty(ApplicationModule.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
                this.objectCode = ibas.config.applyVariables(ApplicationModule.BUSINESS_OBJECT_CODE);
            }
        }
    }
}

