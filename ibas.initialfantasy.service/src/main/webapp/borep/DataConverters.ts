/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    IBusinessObject,
    BOConverter,
    DataConverter4ibas
} from '../3rdparty/ibas/index';
import { ApplicationFunction } from './bo/ApplicationFunction';
import { ApplicationModule } from './bo/ApplicationModule';
import { ApplicationPlatform } from './bo/ApplicationPlatform';
import { ApprovalTemplate } from './bo/ApprovalTemplate';
import { ApprovalRequest } from './bo/ApprovalRequest';
import { BOCriteria } from './bo/BOCriteria';
import { BOFiltering } from './bo/BOFiltering';
import { Organization } from './bo/Organization';
import { OrganizationalStructure } from './bo/OrganizationalStructure';
import { Ownership } from './bo/Ownership';
import { Privilege } from './bo/Privilege';
import { Role } from './bo/Role';
import { User } from './bo/User';


/** InitialFantasy 模块的数据转换者 */
export class DataConverter4InitialFantasy extends DataConverter4ibas {

    /** 创建业务对象转换者 */
    protected createBOConverter(): BOConverter {
        return new InitialFantasyBOConverter();
    }
}

/** InitialFantasy 模块的业务对象转换者 */
class InitialFantasyBOConverter extends BOConverter {

    constructor() {
        super();
        this.init();
    }

    private init() {
        // 注册业务对象映射
        this.mappingBOs("ApplicationFunction", ApplicationFunction);
        this.mappingBOs("ApplicationModule", ApplicationModule);
        this.mappingBOs("ApplicationPlatform", ApplicationPlatform);
        this.mappingBOs("ApprovalTemplate", ApprovalTemplate);
        this.mappingBOs("ApprovalRequest", ApprovalRequest);
        this.mappingBOs("BOCriteria", BOCriteria);
        this.mappingBOs("BOFiltering", BOFiltering);
        this.mappingBOs("Organization", Organization);
        this.mappingBOs("OrganizationalStructure", OrganizationalStructure);
        this.mappingBOs("Ownership", Ownership);
        this.mappingBOs("Privilege", Privilege);
        this.mappingBOs("Role", Role);
        this.mappingBOs("User", User);
        // 注册枚举映射
        
    }

    /**
     * 自定义解析
     * @param data 远程数据
     * @returns 本地数据
     */
    protected customParsing(data: any): IBusinessObject {
        return data;
    }

    /**
     * 转换数据
     * @param boName 对象名称
     * @param property 属性名称
     * @param value 值
     * @returns 转换的值
     */
    protected convertData(boName: string, property: string, value
        : any): any {
        // 不做处理，原始返回
        return value;
    }

    /**
     * 解析数据
     * @param boName 对象名称
     * @param property 属性名称
     * @param value 值
     * @returns 解析的值
    */
    protected parsingData(boName: string, property: string, value
        : any): any {
        if (typeof value === "string") {
            // 日期类型，直接转换
            if (value.indexOf("T") > 0 && value.indexOf("-") > 0 && value.indexOf(":") > 0) {
                // 字符格式为日期，yyyy-MM-ddThh:mm:ss
                return this.parsingDate(value);
            }
            if (boName.startsWith(ApplicationFunction.name)) {
                // 应用程序功能

            }
            if (boName.startsWith(ApplicationModule.name)) {
                // 应用程序模块

            }
            if (boName.startsWith(ApplicationPlatform.name)) {
                // 应用程序平台

            }
            if (boName.startsWith(ApprovalTemplate.name)) {
                // 审批模板

            }
            if (boName.startsWith(ApprovalRequest.name)) {
                // 审批记录

            }
            if (boName.startsWith(BOCriteria.name)) {
                // 业务对象检索条件

            }
            if (boName.startsWith(BOFiltering.name)) {
                // 业务对象筛选

            }
            if (boName.startsWith(Organization.name)) {
                // 组织

            }
            if (boName.startsWith(OrganizationalStructure.name)) {
                // 组织-结构

            }
            if (boName.startsWith(Ownership.name)) {
                // 数据权限

            }
            if (boName.startsWith(Privilege.name)) {
                // 系统权限

            }
            if (boName.startsWith(Role.name)) {
                // 角色

            }
            if (boName.startsWith(User.name)) {
                // 用户

            }
        }
        // 不做处理，原始返回
        return value;
    }
}

