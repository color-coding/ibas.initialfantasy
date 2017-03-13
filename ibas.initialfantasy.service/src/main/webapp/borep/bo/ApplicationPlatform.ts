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
    IApplicationPlatform,
} from '../../api/applicationplatform/applicationplatform.data.d';

/** 应用程序平台 */
export class ApplicationPlatform extends BusinessObject<ApplicationPlatform> implements IApplicationPlatform {

    constructor() {
        super();
    }

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = "${Company}_SYS_PLATFORM";

    /** 映射的属性名称-平台标识 */
    private static PROPERTY_NAME_PLATFORMID: string = "_platformId";

    /** 获取-平台标识 */
    get platformId(): string {
        return this.getProperty<string>(ApplicationPlatform.PROPERTY_NAME_PLATFORMID);
    }

    /** 设置-平台标识 */
    set platformId(value: string) {
        this.setProperty(ApplicationPlatform.PROPERTY_NAME_PLATFORMID, value);
    }

    /** 映射的属性名称-平台编码 */
    private static PROPERTY_NAME_PLATFORMCODE: string = "_platformCode";

    /** 获取-平台编码 */
    get platformCode(): string {
        return this.getProperty<string>(ApplicationPlatform.PROPERTY_NAME_PLATFORMCODE);
    }

    /** 设置-平台编码 */
    set platformCode(value: string) {
        this.setProperty(ApplicationPlatform.PROPERTY_NAME_PLATFORMCODE, value);
    }

    /** 映射的属性名称-平台描述 */
    private static PROPERTY_NAME_PLATFORMDESCRIPTION: string = "_platformDescription";

    /** 获取-平台描述 */
    get platformDescription(): string {
        return this.getProperty<string>(ApplicationPlatform.PROPERTY_NAME_PLATFORMDESCRIPTION);
    }

    /** 设置-平台描述 */
    set platformDescription(value: string) {
        this.setProperty(ApplicationPlatform.PROPERTY_NAME_PLATFORMDESCRIPTION, value);
    }

    /** 映射的属性名称-是否可用 */
    private static PROPERTY_NAME_ACTIVATED: string = "_activated";

    /** 获取-是否可用 */
    get activated(): emYesNo {
        return this.getProperty<emYesNo>(ApplicationPlatform.PROPERTY_NAME_ACTIVATED);
    }

    /** 设置-是否可用 */
    set activated(value: emYesNo) {
        this.setProperty(ApplicationPlatform.PROPERTY_NAME_ACTIVATED, value);
    }

    /** 映射的属性名称-对象键值 */
    private static PROPERTY_NAME_OBJECTKEY: string = "_objectKey";

    /** 获取-对象键值 */
    get objectKey(): number {
        return this.getProperty<number>(ApplicationPlatform.PROPERTY_NAME_OBJECTKEY);
    }

    /** 设置-对象键值 */
    set objectKey(value: number) {
        this.setProperty(ApplicationPlatform.PROPERTY_NAME_OBJECTKEY, value);
    }

    /** 映射的属性名称-对象类型 */
    private static PROPERTY_NAME_OBJECTCODE: string = "_objectCode";

    /** 获取-对象类型 */
    get objectCode(): string {
        return this.getProperty<string>(ApplicationPlatform.PROPERTY_NAME_OBJECTCODE);
    }

    /** 设置-对象类型 */
    set objectCode(value: string) {
        this.setProperty(ApplicationPlatform.PROPERTY_NAME_OBJECTCODE, value);
    }

    /** 映射的属性名称-数据源 */
    private static PROPERTY_NAME_DATASOURCE: string = "_dataSource";

    /** 获取-数据源 */
    get dataSource(): string {
        return this.getProperty<string>(ApplicationPlatform.PROPERTY_NAME_DATASOURCE);
    }

    /** 设置-数据源 */
    set dataSource(value: string) {
        this.setProperty(ApplicationPlatform.PROPERTY_NAME_DATASOURCE, value);
    }

    /** 映射的属性名称-创建日期 */
    private static PROPERTY_NAME_CREATEDATE: string = "_createDate";

    /** 获取-创建日期 */
    get createDate(): Date {
        return this.getProperty<Date>(ApplicationPlatform.PROPERTY_NAME_CREATEDATE);
    }

    /** 设置-创建日期 */
    set createDate(value: Date) {
        this.setProperty(ApplicationPlatform.PROPERTY_NAME_CREATEDATE, value);
    }

    /** 映射的属性名称-创建时间 */
    private static PROPERTY_NAME_CREATETIME: string = "_createTime";

    /** 获取-创建时间 */
    get createTime(): number {
        return this.getProperty<number>(ApplicationPlatform.PROPERTY_NAME_CREATETIME);
    }

    /** 设置-创建时间 */
    set createTime(value: number) {
        this.setProperty(ApplicationPlatform.PROPERTY_NAME_CREATETIME, value);
    }

    /** 映射的属性名称-修改日期 */
    private static PROPERTY_NAME_UPDATEDATE: string = "_updateDate";

    /** 获取-修改日期 */
    get updateDate(): Date {
        return this.getProperty<Date>(ApplicationPlatform.PROPERTY_NAME_UPDATEDATE);
    }

    /** 设置-修改日期 */
    set updateDate(value: Date) {
        this.setProperty(ApplicationPlatform.PROPERTY_NAME_UPDATEDATE, value);
    }

    /** 映射的属性名称-修改时间 */
    private static PROPERTY_NAME_UPDATETIME: string = "_updateTime";

    /** 获取-修改时间 */
    get updateTime(): number {
        return this.getProperty<number>(ApplicationPlatform.PROPERTY_NAME_UPDATETIME);
    }

    /** 设置-修改时间 */
    set updateTime(value: number) {
        this.setProperty(ApplicationPlatform.PROPERTY_NAME_UPDATETIME, value);
    }

    /** 映射的属性名称-创建动作标识 */
    private static PROPERTY_NAME_CREATEACTIONID: string = "_createActionId";

    /** 获取-创建动作标识 */
    get createActionId(): string {
        return this.getProperty<string>(ApplicationPlatform.PROPERTY_NAME_CREATEACTIONID);
    }

    /** 设置-创建动作标识 */
    set createActionId(value: string) {
        this.setProperty(ApplicationPlatform.PROPERTY_NAME_CREATEACTIONID, value);
    }

    /** 映射的属性名称-更新动作标识 */
    private static PROPERTY_NAME_UPDATEACTIONID: string = "_updateActionId";

    /** 获取-更新动作标识 */
    get updateActionId(): string {
        return this.getProperty<string>(ApplicationPlatform.PROPERTY_NAME_UPDATEACTIONID);
    }

    /** 设置-更新动作标识 */
    set updateActionId(value: string) {
        this.setProperty(ApplicationPlatform.PROPERTY_NAME_UPDATEACTIONID, value);
    }

    /** 映射的属性名称-实例号（版本） */
    private static PROPERTY_NAME_LOGINST: string = "_logInst";

    /** 获取-实例号（版本） */
    get logInst(): number {
        return this.getProperty<number>(ApplicationPlatform.PROPERTY_NAME_LOGINST);
    }

    /** 设置-实例号（版本） */
    set logInst(value: number) {
        this.setProperty(ApplicationPlatform.PROPERTY_NAME_LOGINST, value);
    }

    /** 映射的属性名称-创建用户 */
    private static PROPERTY_NAME_CREATEUSERSIGN: string = "_createUserSign";

    /** 获取-创建用户 */
    get createUserSign(): number {
        return this.getProperty<number>(ApplicationPlatform.PROPERTY_NAME_CREATEUSERSIGN);
    }

    /** 设置-创建用户 */
    set createUserSign(value: number) {
        this.setProperty(ApplicationPlatform.PROPERTY_NAME_CREATEUSERSIGN, value);
    }

    /** 映射的属性名称-修改用户 */
    private static PROPERTY_NAME_UPDATEUSERSIGN: string = "_updateUserSign";

    /** 获取-修改用户 */
    get updateUserSign(): number {
        return this.getProperty<number>(ApplicationPlatform.PROPERTY_NAME_UPDATEUSERSIGN);
    }

    /** 设置-修改用户 */
    set updateUserSign(value: number) {
        this.setProperty(ApplicationPlatform.PROPERTY_NAME_UPDATEUSERSIGN, value);
    }



    /** 初始化数据 */
    protected init(): void {
        this.objectCode = ApplicationPlatform.BUSINESS_OBJECT_CODE;
    }
}



