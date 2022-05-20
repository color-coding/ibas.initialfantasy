/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace bo {
        /** 业务对象属性设置 */
        export class BOPropertySetting extends ibas.BOSimple<BOPropertySetting> implements IBOPropertySetting {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_BOPROPERTYSETTING;
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-对象 */
            static PROPERTY_BOCODE_NAME: string = "BOCode";
            /** 获取-对象 */
            get boCode(): string {
                return this.getProperty<string>(BOPropertySetting.PROPERTY_BOCODE_NAME);
            }
            /** 设置-对象 */
            set boCode(value: string) {
                this.setProperty(BOPropertySetting.PROPERTY_BOCODE_NAME, value);
            }

            /** 映射的属性名称-属性 */
            static PROPERTY_PROPERTYCODE_NAME: string = "PropertyCode";
            /** 获取-属性 */
            get propertyCode(): string {
                return this.getProperty<string>(BOPropertySetting.PROPERTY_PROPERTYCODE_NAME);
            }
            /** 设置-属性 */
            set propertyCode(value: string) {
                this.setProperty(BOPropertySetting.PROPERTY_PROPERTYCODE_NAME, value);
            }

            /** 映射的属性名称-身份 */
            static PROPERTY_IDENTITYCODE_NAME: string = "IdentityCode";
            /** 获取-身份 */
            get identityCode(): string {
                return this.getProperty<string>(BOPropertySetting.PROPERTY_IDENTITYCODE_NAME);
            }
            /** 设置-身份 */
            set identityCode(value: string) {
                this.setProperty(BOPropertySetting.PROPERTY_IDENTITYCODE_NAME, value);
            }

            /** 映射的属性名称-位置 */
            static PROPERTY_POSITION_NAME: string = "Position";
            /** 获取-位置 */
            get position(): number {
                return this.getProperty<number>(BOPropertySetting.PROPERTY_POSITION_NAME);
            }
            /** 设置-位置 */
            set position(value: number) {
                this.setProperty(BOPropertySetting.PROPERTY_POSITION_NAME, value);
            }

            /** 映射的属性名称-检索的 */
            static PROPERTY_SEARCHED_NAME: string = "Searched";
            /** 获取-检索的 */
            get searched(): emSearchedValue {
                return this.getProperty<emSearchedValue>(BOPropertySetting.PROPERTY_SEARCHED_NAME);
            }
            /** 设置-检索的 */
            set searched(value: emSearchedValue) {
                this.setProperty(BOPropertySetting.PROPERTY_SEARCHED_NAME, value);
            }

            /** 映射的属性名称-权限 */
            static PROPERTY_AUTHORISED_NAME: string = "Authorised";
            /** 获取-权限 */
            get authorised(): emAuthorisedValue {
                return this.getProperty<emAuthorisedValue>(BOPropertySetting.PROPERTY_AUTHORISED_NAME);
            }
            /** 设置-权限 */
            set authorised(value: emAuthorisedValue) {
                this.setProperty(BOPropertySetting.PROPERTY_AUTHORISED_NAME, value);
            }

            /** 映射的属性名称-必填 */
            static PROPERTY_REQUIRED_NAME: string = "Required";
            /** 获取-必填 */
            get required(): emRequiredValue {
                return this.getProperty<emRequiredValue>(BOPropertySetting.PROPERTY_REQUIRED_NAME);
            }
            /** 设置-必填 */
            set required(value: emRequiredValue) {
                this.setProperty(BOPropertySetting.PROPERTY_REQUIRED_NAME, value);
            }

            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(BOPropertySetting.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(BOPropertySetting.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(BOPropertySetting.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(BOPropertySetting.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(BOPropertySetting.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(BOPropertySetting.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(BOPropertySetting.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(BOPropertySetting.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-修改日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(BOPropertySetting.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-修改日期 */
            set updateDate(value: Date) {
                this.setProperty(BOPropertySetting.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-修改时间 */
            get updateTime(): number {
                return this.getProperty<number>(BOPropertySetting.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-修改时间 */
            set updateTime(value: number) {
                this.setProperty(BOPropertySetting.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-实例号（版本） */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号（版本） */
            get logInst(): number {
                return this.getProperty<number>(BOPropertySetting.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号（版本） */
            set logInst(value: number) {
                this.setProperty(BOPropertySetting.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string = "Series";
            /** 获取-服务系列 */
            get series(): number {
                return this.getProperty<number>(BOPropertySetting.PROPERTY_SERIES_NAME);
            }
            /** 设置-服务系列 */
            set series(value: number) {
                this.setProperty(BOPropertySetting.PROPERTY_SERIES_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(BOPropertySetting.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(BOPropertySetting.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(BOPropertySetting.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(BOPropertySetting.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-修改用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(BOPropertySetting.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-修改用户 */
            set updateUserSign(value: number) {
                this.setProperty(BOPropertySetting.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(BOPropertySetting.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(BOPropertySetting.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(BOPropertySetting.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(BOPropertySetting.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
                this.objectCode = ibas.config.applyVariables(BOPropertySetting.BUSINESS_OBJECT_CODE);
            }
        }


    }
}
