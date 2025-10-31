/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace bo {
        /** 用户动作日志 */
        export class UserActionLog extends ibas.BOSimple<UserActionLog> implements IUserActionLog {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_USERACTIONLOG;
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(UserActionLog.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(UserActionLog.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(UserActionLog.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(UserActionLog.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号 */
            get logInst(): number {
                return this.getProperty<number>(UserActionLog.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号 */
            set logInst(value: number) {
                this.setProperty(UserActionLog.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string = "Series";
            /** 获取-服务系列 */
            get series(): number {
                return this.getProperty<number>(UserActionLog.PROPERTY_SERIES_NAME);
            }
            /** 设置-服务系列 */
            set series(value: number) {
                this.setProperty(UserActionLog.PROPERTY_SERIES_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(UserActionLog.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(UserActionLog.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(UserActionLog.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(UserActionLog.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(UserActionLog.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(UserActionLog.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-更新日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-更新日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(UserActionLog.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-更新日期 */
            set updateDate(value: Date) {
                this.setProperty(UserActionLog.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-更新时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-更新时间 */
            get updateTime(): number {
                return this.getProperty<number>(UserActionLog.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-更新时间 */
            set updateTime(value: number) {
                this.setProperty(UserActionLog.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(UserActionLog.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(UserActionLog.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-更新用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-更新用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(UserActionLog.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-更新用户 */
            set updateUserSign(value: number) {
                this.setProperty(UserActionLog.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(UserActionLog.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(UserActionLog.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(UserActionLog.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(UserActionLog.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
            /** 获取-数据所有者 */
            get dataOwner(): number {
                return this.getProperty<number>(UserActionLog.PROPERTY_DATAOWNER_NAME);
            }
            /** 设置-数据所有者 */
            set dataOwner(value: number) {
                this.setProperty(UserActionLog.PROPERTY_DATAOWNER_NAME, value);
            }

            /** 映射的属性名称-动作 */
            static PROPERTY_ACTION_NAME: string = "Action";
            /** 获取-动作 */
            get action(): string {
                return this.getProperty<string>(UserActionLog.PROPERTY_ACTION_NAME);
            }
            /** 设置-动作 */
            set action(value: string) {
                this.setProperty(UserActionLog.PROPERTY_ACTION_NAME, value);
            }

            /** 映射的属性名称-用户编号 */
            static PROPERTY_USERID_NAME: string = "UserId";
            /** 获取-用户编号 */
            get userId(): number {
                return this.getProperty<number>(UserActionLog.PROPERTY_USERID_NAME);
            }
            /** 设置-用户编号 */
            set userId(value: number) {
                this.setProperty(UserActionLog.PROPERTY_USERID_NAME, value);
            }

            /** 映射的属性名称-用户名称 */
            static PROPERTY_USERNAME_NAME: string = "UserName";
            /** 获取-用户名称 */
            get userName(): string {
                return this.getProperty<string>(UserActionLog.PROPERTY_USERNAME_NAME);
            }
            /** 设置-用户名称 */
            set userName(value: string) {
                this.setProperty(UserActionLog.PROPERTY_USERNAME_NAME, value);
            }

            /** 映射的属性名称-开始日期 */
            static PROPERTY_STARTDATE_NAME: string = "StartDate";
            /** 获取-开始日期 */
            get startDate(): Date {
                return this.getProperty<Date>(UserActionLog.PROPERTY_STARTDATE_NAME);
            }
            /** 设置-开始日期 */
            set startDate(value: Date) {
                this.setProperty(UserActionLog.PROPERTY_STARTDATE_NAME, value);
            }

            /** 映射的属性名称-开始时间 */
            static PROPERTY_STARTTIME_NAME: string = "StartTime";
            /** 获取-开始时间 */
            get startTime(): number {
                return this.getProperty<number>(UserActionLog.PROPERTY_STARTTIME_NAME);
            }
            /** 设置-开始时间 */
            set startTime(value: number) {
                this.setProperty(UserActionLog.PROPERTY_STARTTIME_NAME, value);
            }

            /** 映射的属性名称-结束日期 */
            static PROPERTY_ENDDATE_NAME: string = "EndDate";
            /** 获取-结束日期 */
            get endDate(): Date {
                return this.getProperty<Date>(UserActionLog.PROPERTY_ENDDATE_NAME);
            }
            /** 设置-结束日期 */
            set endDate(value: Date) {
                this.setProperty(UserActionLog.PROPERTY_ENDDATE_NAME, value);
            }

            /** 映射的属性名称-结束时间 */
            static PROPERTY_ENDTIME_NAME: string = "EndTime";
            /** 获取-结束时间 */
            get endTime(): number {
                return this.getProperty<number>(UserActionLog.PROPERTY_ENDTIME_NAME);
            }
            /** 设置-结束时间 */
            set endTime(value: number) {
                this.setProperty(UserActionLog.PROPERTY_ENDTIME_NAME, value);
            }

            /** 映射的属性名称-内容 */
            static PROPERTY_CONTENT_NAME: string = "Content";
            /** 获取-内容 */
            get content(): string {
                return this.getProperty<string>(UserActionLog.PROPERTY_CONTENT_NAME);
            }
            /** 设置-内容 */
            set content(value: string) {
                this.setProperty(UserActionLog.PROPERTY_CONTENT_NAME, value);
            }



            /** 初始化数据 */
            protected init(): void {
                this.objectCode = UserActionLog.BUSINESS_OBJECT_CODE;
            }
        }


    }
}
