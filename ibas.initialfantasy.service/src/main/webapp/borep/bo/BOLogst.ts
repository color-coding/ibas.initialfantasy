/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace bo {
        /** 业务对象日志 */
        export class BOLogst extends ibas.BusinessObject<BOLogst> implements IBOLogst {
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-类型 */
            static PROPERTY_BOCODE_NAME: string = "BOCode";
            /** 获取-类型 */
            get boCode(): string {
                return this.getProperty<string>(BOLogst.PROPERTY_BOCODE_NAME);
            }
            /** 设置-类型 */
            set boCode(value: string) {
                this.setProperty(BOLogst.PROPERTY_BOCODE_NAME, value);
            }

            /** 映射的属性名称-主键值 */
            static PROPERTY_BOKEYS_NAME: string = "BOKeys";
            /** 获取-主键值 */
            get boKeys(): string {
                return this.getProperty<string>(BOLogst.PROPERTY_BOKEYS_NAME);
            }
            /** 设置-主键值 */
            set boKeys(value: string) {
                this.setProperty(BOLogst.PROPERTY_BOKEYS_NAME, value);
            }

            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号 */
            get logInst(): number {
                return this.getProperty<number>(BOLogst.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号 */
            set logInst(value: number) {
                this.setProperty(BOLogst.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-修改用户 */
            static PROPERTY_MODIFYUSER_NAME: string = "ModifyUser";
            /** 获取-修改用户 */
            get modifyUser(): number {
                return this.getProperty<number>(BOLogst.PROPERTY_MODIFYUSER_NAME);
            }
            /** 设置-修改用户 */
            set modifyUser(value: number) {
                this.setProperty(BOLogst.PROPERTY_MODIFYUSER_NAME, value);
            }

            /** 映射的属性名称-修改日期 */
            static PROPERTY_MODIFYDATE_NAME: string = "ModifyDate";
            /** 获取-修改日期 */
            get modifyDate(): Date {
                return this.getProperty<Date>(BOLogst.PROPERTY_MODIFYDATE_NAME);
            }
            /** 设置-修改日期 */
            set modifyDate(value: Date) {
                this.setProperty(BOLogst.PROPERTY_MODIFYDATE_NAME, value);
            }

            /** 映射的属性名称-修改时间 */
            static PROPERTY_MODIFYTIME_NAME: string = "ModifyTime";
            /** 获取-修改时间 */
            get modifyTime(): number {
                return this.getProperty<number>(BOLogst.PROPERTY_MODIFYTIME_NAME);
            }
            /** 设置-修改时间 */
            set modifyTime(value: number) {
                this.setProperty(BOLogst.PROPERTY_MODIFYTIME_NAME, value);
            }

            /** 映射的属性名称-事务标识 */
            static PROPERTY_TRANSATIONID_NAME: string = "TransationId";
            /** 获取-事务标识 */
            get transationId(): string {
                return this.getProperty<string>(BOLogst.PROPERTY_TRANSATIONID_NAME);
            }
            /** 设置-事务标识 */
            set transationId(value: string) {
                this.setProperty(BOLogst.PROPERTY_TRANSATIONID_NAME, value);
            }

            /** 映射的属性名称-动机 */
            static PROPERTY_CAUSE_NAME: string = "Cause";
            /** 获取-动机 */
            get cause(): string {
                return this.getProperty<string>(BOLogst.PROPERTY_CAUSE_NAME);
            }
            /** 设置-动机 */
            set cause(value: string) {
                this.setProperty(BOLogst.PROPERTY_CAUSE_NAME, value);
            }

            /** 映射的属性名称-内容 */
            static PROPERTY_CONTENT_NAME: string = "Content";
            /** 获取-内容 */
            get content(): string | object {
                return this.getProperty<string | object>(BOLogst.PROPERTY_CONTENT_NAME);
            }
            /** 设置-内容 */
            set content(value: string | object) {
                this.setProperty(BOLogst.PROPERTY_CONTENT_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
            }
            criteria(): ibas.ICriteria {
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = BOLogst.PROPERTY_BOCODE_NAME;
                condition.value = this.boCode;
                condition = criteria.conditions.create();
                condition.alias = BOLogst.PROPERTY_LOGINST_NAME;
                condition.value = this.boCode;

                return criteria;
            }
            toString(): string {
                return ibas.strings.format("{bo: {0}, inst {1}}", this.boCode, this.logInst);
            }
        }


    }
}
