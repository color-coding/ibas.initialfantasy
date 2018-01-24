/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "./bo/index";
import {
} from "../api/index";

/** 数据转换者 */
export class DataConverter4if extends ibas.DataConverter4j {

    /** 创建业务对象转换者 */
    protected createConverter(): ibas.BOConverter {
        return new BOConverter4if;
    }
}

/** 业务对象转换者 */
class BOConverter4if extends ibas.BOConverter {

    /**
     * 自定义解析
     * @param data 远程数据
     * @returns 本地数据
     */
    protected customParsing(data: any): ibas.IBusinessObject {
        return data;
    }

    /**
     * 转换数据
     * @param boName 对象名称
     * @param property 属性名称
     * @param value 值
     * @returns 转换的值
     */
    protected convertData(boName: string, property: string, value: any): any {
        if (boName === bo.User.name) {
            if (property === bo.User.PROPERTY_SUPER_NAME) {
                return ibas.enums.toString(ibas.emYesNo, value);
            }
        } else if (boName === bo.BOCriteria.name) {
            if (property === bo.BOCriteria.PROPERTY_ASSIGNEDTYPE_NAME) {
                return ibas.enums.toString(bo.emAssignedType, value);
            }
        } else if (boName === bo.Privilege.name) {
            if (property === bo.Privilege.PROPERTY_AUTHORISEVALUE_NAME) {
                return ibas.enums.toString(ibas.emAuthoriseType, value);
            }
        } else if (boName === bo.BOFiltering.name) {
            if (property === bo.BOFiltering.PROPERTY_FILTERINGTYPE_NAME) {
                return ibas.enums.toString(bo.emFilteringType, value);
            }
        } else if (boName === bo.Project.name) {
            if (property === bo.Project.PROPERTY_STATUS_NAME) {
                return ibas.enums.toString(ibas.emDocumentStatus, value);
            }
        } else if (boName === bo.BOPropertyInformation.name) {
            if (property === bo.BOPropertyInformation.PROPERTY_SEARCHED_NAME ||
                property === bo.BOPropertyInformation.PROPERTY_SYSTEMED_NAME ||
                property === bo.BOPropertyInformation.PROPERTY_EDITABLE_NAME) {
                return ibas.enums.toString(ibas.emYesNo, value);
            }
        }
        return super.convertData(boName, property, value);
    }

    /**
     * 解析数据
     * @param boName 对象名称
     * @param property 属性名称
     * @param value 值
     * @returns 解析的值
     */
    protected parsingData(boName: string, property: string, value: any): any {
        if (boName === bo.User.name) {
            if (property === bo.User.PROPERTY_SUPER_NAME) {
                return ibas.enums.valueOf(ibas.emYesNo, value);
            }
        } else if (boName === bo.BOCriteria.name) {
            if (property === bo.BOCriteria.PROPERTY_ASSIGNEDTYPE_NAME) {
                return ibas.enums.valueOf(bo.emAssignedType, value);
            }
        } else if (boName === bo.Privilege.name) {
            if (property === bo.Privilege.PROPERTY_AUTHORISEVALUE_NAME) {
                return ibas.enums.valueOf(ibas.emAuthoriseType, value);
            }
        } else if (boName === bo.BOFiltering.name) {
            if (property === bo.BOFiltering.PROPERTY_FILTERINGTYPE_NAME) {
                return ibas.enums.valueOf(bo.emFilteringType, value);
            }
        } else if (boName === bo.Project.name) {
            if (property === bo.Project.PROPERTY_STATUS_NAME) {
                return ibas.enums.valueOf(ibas.emDocumentStatus, value);
            }
        } else if (boName === bo.BOPropertyInformation.name) {
            if (property === bo.BOPropertyInformation.PROPERTY_SEARCHED_NAME ||
                property === bo.BOPropertyInformation.PROPERTY_SYSTEMED_NAME ||
                property === bo.BOPropertyInformation.PROPERTY_EDITABLE_NAME) {
                return ibas.enums.valueOf(ibas.emYesNo, value);
            }
        }
        return super.parsingData(boName, property, value);
    }
}
