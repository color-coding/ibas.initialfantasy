/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    emYesNo,
    emDocumentStatus,
    emBOStatus,
    emApprovalStatus,
    BusinessObject,
    BusinessObjects
} from '../../3rdparty/ibas/index';
import { 
    IApplicationFunction,
} from '../../api/applicationfunction/applicationfunction.data.d';

/** 应用程序功能 */
export class ApplicationFunction extends BusinessObject<ApplicationFunction> implements IApplicationFunction {

    constructor() {
        super();
    }

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = "${Company}_SYS_FUNCTION";

    /** 映射的属性名称-模块标识 */
    private static PROPERTY_NAME_MODULEID: string = "_moduleId";

    /** 获取-模块标识 */
    get moduleId(): string {
        return this.getProperty<string>(ApplicationFunction.PROPERTY_NAME_MODULEID);
    }

    /** 设置-模块标识 */
    set moduleId(value: string) {
        this.setProperty(ApplicationFunction.PROPERTY_NAME_MODULEID, value);
    }

    /** 映射的属性名称-功能标识 */
    private static PROPERTY_NAME_FUNCTIONID: string = "_functionId";

    /** 获取-功能标识 */
    get functionId(): string {
        return this.getProperty<string>(ApplicationFunction.PROPERTY_NAME_FUNCTIONID);
    }

    /** 设置-功能标识 */
    set functionId(value: string) {
        this.setProperty(ApplicationFunction.PROPERTY_NAME_FUNCTIONID, value);
    }

    /** 映射的属性名称-功能名称 */
    private static PROPERTY_NAME_FUNCTIONNAME: string = "_functionName";

    /** 获取-功能名称 */
    get functionName(): string {
        return this.getProperty<string>(ApplicationFunction.PROPERTY_NAME_FUNCTIONNAME);
    }

    /** 设置-功能名称 */
    set functionName(value: string) {
        this.setProperty(ApplicationFunction.PROPERTY_NAME_FUNCTIONNAME, value);
    }

    /** 映射的属性名称-对象键值 */
    private static PROPERTY_NAME_OBJECTKEY: string = "_objectKey";

    /** 获取-对象键值 */
    get objectKey(): number {
        return this.getProperty<number>(ApplicationFunction.PROPERTY_NAME_OBJECTKEY);
    }

    /** 设置-对象键值 */
    set objectKey(value: number) {
        this.setProperty(ApplicationFunction.PROPERTY_NAME_OBJECTKEY, value);
    }

    /** 映射的属性名称-对象类型 */
    private static PROPERTY_NAME_OBJECTCODE: string = "_objectCode";

    /** 获取-对象类型 */
    get objectCode(): string {
        return this.getProperty<string>(ApplicationFunction.PROPERTY_NAME_OBJECTCODE);
    }

    /** 设置-对象类型 */
    set objectCode(value: string) {
        this.setProperty(ApplicationFunction.PROPERTY_NAME_OBJECTCODE, value);
    }

    /** 映射的属性名称-数据源 */
    private static PROPERTY_NAME_DATASOURCE: string = "_dataSource";

    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(ApplicationFunction.PROPERTY_NAME_DATASOURCE);
    }

    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(ApplicationFunction.PROPERTY_NAME_DATASOURCE, value);
    }

    /** 映射的属性名称-创建日期 */
    private static PROPERTY_NAME_CREATEDATE: string = "_createDate";

    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(ApplicationFunction.PROPERTY_NAME_CREATEDATE);
    }

    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(ApplicationFunction.PROPERTY_NAME_CREATEDATE, value);
    }

    /** 映射的属性名称-创建时间 */
    private static PROPERTY_NAME_CREATETIME: string = "_createTime";

    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(ApplicationFunction.PROPERTY_NAME_CREATETIME);
    }

    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(ApplicationFunction.PROPERTY_NAME_CREATETIME, value);
    }

    /** 映射的属性名称-修改日期 */
    private static PROPERTY_NAME_UPDATEDATE: string = "_updateDate";

    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(ApplicationFunction.PROPERTY_NAME_UPDATEDATE);
    }

    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(ApplicationFunction.PROPERTY_NAME_UPDATEDATE, value);
    }

    /** 映射的属性名称-修改时间 */
    private static PROPERTY_NAME_UPDATETIME: string = "_updateTime";

    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(ApplicationFunction.PROPERTY_NAME_UPDATETIME);
    }

    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(ApplicationFunction.PROPERTY_NAME_UPDATETIME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    private static PROPERTY_NAME_CREATEACTIONID: string = "_createActionId";

    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(ApplicationFunction.PROPERTY_NAME_CREATEACTIONID);
    }

    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(ApplicationFunction.PROPERTY_NAME_CREATEACTIONID, value);
    }

    /** 映射的属性名称-更新动作标识 */
    private static PROPERTY_NAME_UPDATEACTIONID: string = "_updateActionId";

    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(ApplicationFunction.PROPERTY_NAME_UPDATEACTIONID);
    }

    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(ApplicationFunction.PROPERTY_NAME_UPDATEACTIONID, value);
    }

    /** 映射的属性名称-实例号（版本） */
    private static PROPERTY_NAME_LOGINST: string = "_logInst";

    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(ApplicationFunction.PROPERTY_NAME_LOGINST);
    }

    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(ApplicationFunction.PROPERTY_NAME_LOGINST, value);
    }

    /** 映射的属性名称-创建用户 */
    private static PROPERTY_NAME_CREATEUSERSIGN: string = "_createUserSign";

    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(ApplicationFunction.PROPERTY_NAME_CREATEUSERSIGN);
    }

    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(ApplicationFunction.PROPERTY_NAME_CREATEUSERSIGN, value);
    }

    /** 映射的属性名称-修改用户 */
    private static PROPERTY_NAME_UPDATEUSERSIGN: string = "_updateUserSign";

    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(ApplicationFunction.PROPERTY_NAME_UPDATEUSERSIGN);
    }

    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(ApplicationFunction.PROPERTY_NAME_UPDATEUSERSIGN, value);
    }



    /** 初始化数据 */
    protected init(): void {
        this.objectCode = ApplicationFunction.BUSINESS_OBJECT_CODE;
    }
}



