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
    BusinessObjects,
    BOMasterData,
    BOMasterDataLine,
    BODocument,
    BODocumentLine,
    BOSimple,
    BOSimpleLine,
    StringBuilder, ICriteria, ICondition, Criteria,
} from "ibas/index";
import {
    IBOInformation,
    IBOPropertyInformation,
    IBOPropertyInformations,
    BO_CODE_BOINFORMATION,
} from "../../api/index";

/** 业务对象信息 */
export class BOInformation extends BusinessObject<BOInformation> implements IBOInformation {

    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_BOINFORMATION;
    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-编码 */
    static PROPERTY_CODE_NAME: string = "Code";
    /** 获取-编码 */
    get code(): string {
        return this.getProperty<string>(BOInformation.PROPERTY_CODE_NAME);
    }
    /** 设置-编码 */
    set code(value: string) {
        this.setProperty(BOInformation.PROPERTY_CODE_NAME, value);
    }

    /** 映射的属性名称-名称 */
    static PROPERTY_NAME_NAME: string = "Name";
    /** 获取-名称 */
    get name(): string {
        return this.getProperty<string>(BOInformation.PROPERTY_NAME_NAME);
    }
    /** 设置-名称 */
    set name(value: string) {
        this.setProperty(BOInformation.PROPERTY_NAME_NAME, value);
    }

    /** 映射的属性名称-描述 */
    static PROPERTY_DESCRIPTION_NAME: string = "Description";
    /** 获取-描述 */
    get description(): string {
        return this.getProperty<string>(BOInformation.PROPERTY_DESCRIPTION_NAME);
    }
    /** 设置-描述 */
    set description(value: string) {
        this.setProperty(BOInformation.PROPERTY_DESCRIPTION_NAME, value);
    }

    /** 映射的属性名称-映射（表） */
    static PROPERTY_MAPPED_NAME: string = "Mapped";
    /** 获取-映射（表） */
    get mapped(): string {
        return this.getProperty<string>(BOInformation.PROPERTY_MAPPED_NAME);
    }
    /** 设置-映射（表） */
    set mapped(value: string) {
        this.setProperty(BOInformation.PROPERTY_MAPPED_NAME, value);
    }

    /** 映射的属性名称-对象类型 */
    static PROPERTY_OBJECTTYPE_NAME: string = "ObjectType";
    /** 获取-对象类型 */
    get objectType(): string {
        return this.getProperty<string>(BOInformation.PROPERTY_OBJECTTYPE_NAME);
    }
    /** 设置-对象类型 */
    set objectType(value: string) {
        this.setProperty(BOInformation.PROPERTY_OBJECTTYPE_NAME, value);
    }


    /** 映射的属性名称-业务对象属性信息集合 */
    static PROPERTY_BOPROPERTYINFORMATIONS_NAME: string = "BOPropertyInformations";
    /** 获取-业务对象属性信息集合 */
    get boPropertyInformations(): BOPropertyInformations {
        return this.getProperty<BOPropertyInformations>(BOInformation.PROPERTY_BOPROPERTYINFORMATIONS_NAME);
    }
    /** 设置-业务对象属性信息集合 */
    set boPropertyInformations(value: BOPropertyInformations) {
        this.setProperty(BOInformation.PROPERTY_BOPROPERTYINFORMATIONS_NAME, value);
    }
    /** 字符串 */
    toString(): string {
        let builder: StringBuilder = new StringBuilder();
        builder.append("{");
        builder.append("[");
        builder.append(BOInformation.BUSINESS_OBJECT_CODE);
        builder.append("].");
        builder.append("[");
        builder.append(BOInformation.PROPERTY_NAME_NAME);
        builder.append(" ");
        builder.append("=");
        builder.append(" ");
        builder.append(this.name);
        builder.append("]");
        builder.append("}");
        return builder.toString();
    }
    /** 获取查询 */
    criteria(): ICriteria {
        let criteria: ICriteria = new Criteria();
        let condition: ICondition = criteria.conditions.create();
        condition.alias = BOInformation.PROPERTY_NAME_NAME;
        condition.value = this.name;
        return criteria;
    }
    /** 初始化数据 */
    protected init(): void {
        this.boPropertyInformations = new BOPropertyInformations(this);
    }
}

/** 业务对象属性信息 */
export class BOPropertyInformation extends BusinessObject<BOPropertyInformation> implements IBOPropertyInformation {

    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-编码 */
    static PROPERTY_CODE_NAME: string = "Code";
    /** 获取-编码 */
    get code(): string {
        return this.getProperty<string>(BOInformation.PROPERTY_CODE_NAME);
    }
    /** 设置-编码 */
    set code(value: string) {
        this.setProperty(BOInformation.PROPERTY_CODE_NAME, value);
    }

    /** 映射的属性名称-属性名称 */
    static PROPERTY_PROPERTY_NAME: string = "Property";
    /** 获取-属性名称 */
    get property(): string {
        return this.getProperty<string>(BOPropertyInformation.PROPERTY_PROPERTY_NAME);
    }
    /** 设置-属性名称 */
    set property(value: string) {
        this.setProperty(BOPropertyInformation.PROPERTY_PROPERTY_NAME, value);
    }

    /** 映射的属性名称-映射（字段） */
    static PROPERTY_MAPPED_NAME: string = "Mapped";
    /** 获取-映射（字段） */
    get mapped(): string {
        return this.getProperty<string>(BOPropertyInformation.PROPERTY_MAPPED_NAME);
    }
    /** 设置-映射（字段） */
    set mapped(value: string) {
        this.setProperty(BOPropertyInformation.PROPERTY_MAPPED_NAME, value);
    }

    /** 映射的属性名称-描述 */
    static PROPERTY_DESCRIPTION_NAME: string = "Description";
    /** 获取-描述 */
    get description(): string {
        return this.getProperty<string>(BOPropertyInformation.PROPERTY_DESCRIPTION_NAME);
    }
    /** 设置-描述 */
    set description(value: string) {
        this.setProperty(BOPropertyInformation.PROPERTY_DESCRIPTION_NAME, value);
    }

    /** 映射的属性名称-数据类型 */
    static PROPERTY_DATATYPE_NAME: string = "DataType";
    /** 获取-数据类型 */
    get dataType(): string {
        return this.getProperty<string>(BOPropertyInformation.PROPERTY_DATATYPE_NAME);
    }
    /** 设置-数据类型 */
    set dataType(value: string) {
        this.setProperty(BOPropertyInformation.PROPERTY_DATATYPE_NAME, value);
    }

    /** 映射的属性名称-编辑类型 */
    static PROPERTY_EDITTYPE_NAME: string = "EditType";
    /** 获取-编辑类型 */
    get editType(): string {
        return this.getProperty<string>(BOPropertyInformation.PROPERTY_EDITTYPE_NAME);
    }
    /** 设置-编辑类型 */
    set editType(value: string) {
        this.setProperty(BOPropertyInformation.PROPERTY_EDITTYPE_NAME, value);
    }

    /** 映射的属性名称-编辑大小 */
    static PROPERTY_EDITSIZE_NAME: string = "EditSize";
    /** 获取-编辑大小 */
    get editSize(): number {
        return this.getProperty<number>(BOPropertyInformation.PROPERTY_EDITSIZE_NAME);
    }
    /** 设置-编辑大小 */
    set editSize(value: number) {
        this.setProperty(BOPropertyInformation.PROPERTY_EDITSIZE_NAME, value);
    }

    /** 映射的属性名称-检索的 */
    static PROPERTY_SEARCHED_NAME: string = "Searched";
    /** 获取-检索的 */
    get searched(): emYesNo {
        return this.getProperty<emYesNo>(BOPropertyInformation.PROPERTY_SEARCHED_NAME);
    }
    /** 设置-检索的 */
    set searched(value: emYesNo) {
        this.setProperty(BOPropertyInformation.PROPERTY_SEARCHED_NAME, value);
    }

    /** 映射的属性名称-系统的 */
    static PROPERTY_SYSTEMED_NAME: string = "Systemed";
    /** 获取-系统的 */
    get systemed(): emYesNo {
        return this.getProperty<emYesNo>(BOPropertyInformation.PROPERTY_SYSTEMED_NAME);
    }
    /** 设置-系统的 */
    set systemed(value: emYesNo) {
        this.setProperty(BOPropertyInformation.PROPERTY_SYSTEMED_NAME, value);
    }
    /** 映射的属性名称-可编辑 */
    static PROPERTY_EDITABLE_NAME: string = "Editable";
    /** 获取-可编辑 */
    get editable(): emYesNo {
        return this.getProperty<emYesNo>(BOPropertyInformation.PROPERTY_EDITABLE_NAME);
    }
    /** 设置-可编辑 */
    set editable(value: emYesNo) {
        this.setProperty(BOPropertyInformation.PROPERTY_EDITABLE_NAME, value);
    }

    /** 字符串 */
    toString(): string {
        let builder: StringBuilder = new StringBuilder();
        builder.append("{");
        builder.append("[");
        builder.append(BOInformation.BUSINESS_OBJECT_CODE);
        builder.append("].");
        builder.append("[");
        builder.append(BOPropertyInformation.PROPERTY_CODE_NAME);
        builder.append(" ");
        builder.append("=");
        builder.append(" ");
        builder.append(this.code);
        builder.append("]");
        builder.append("&");
        builder.append("[");
        builder.append(BOPropertyInformation.PROPERTY_PROPERTY_NAME);
        builder.append(" ");
        builder.append("=");
        builder.append(" ");
        builder.append(this.property);
        builder.append("]");
        builder.append("}");
        return builder.toString();
    }
    /** 获取查询 */
    criteria(): ICriteria {
        let criteria: ICriteria = new Criteria();
        let condition: ICondition = criteria.conditions.create();
        condition.alias = BOPropertyInformation.PROPERTY_CODE_NAME;
        condition.value = this.code;
        condition = criteria.conditions.create();
        condition.alias = BOPropertyInformation.PROPERTY_PROPERTY_NAME;
        condition.value = this.property;
        return criteria;
    }

    /** 初始化数据 */
    protected init(): void {
        //
    }
}

/** 业务对象属性信息 集合 */
export class BOPropertyInformations extends BusinessObjects<BOPropertyInformation, BOInformation> implements IBOPropertyInformations {

    /** 创建并添加子项 */
    create(): BOPropertyInformation {
        let item: BOPropertyInformation = new BOPropertyInformation();
        this.add(item);
        return item;
    }
}
