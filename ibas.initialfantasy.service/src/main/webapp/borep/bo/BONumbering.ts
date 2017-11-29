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
    StringBuilder,
    ICriteria,
    Criteria,
    ICondition,
} from "ibas/index";
import {
} from "../../api/index";

/** 业务对象编号方式 */
export class BONumbering extends BusinessObject<BONumbering> {

    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-对象编码 */
    static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
    /** 获取-对象编码 */
    get objectCode(): string {
        return this.getProperty<string>(BONumbering.PROPERTY_OBJECTCODE_NAME);
    }
    /** 设置-对象编码 */
    set objectCode(value: string) {
        this.setProperty(BONumbering.PROPERTY_OBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-子类型 */
    static PROPERTY_DOCUMENTSUBTYPE_NAME: string = "DocumentSubType";
    /** 获取-子类型 */
    get documentSubType(): string {
        return this.getProperty<string>(BONumbering.PROPERTY_DOCUMENTSUBTYPE_NAME);
    }
    /** 设置-子类型 */
    set documentSubType(value: string) {
        this.setProperty(BONumbering.PROPERTY_DOCUMENTSUBTYPE_NAME, value);
    }

    /** 映射的属性名称-自动序号 */
    static PROPERTY_AUTOKEY_NAME: string = "AutoKey";
    /** 获取-自动序号 */
    get autoKey(): number {
        return this.getProperty<number>(BONumbering.PROPERTY_AUTOKEY_NAME);
    }
    /** 设置-自动序号 */
    set autoKey(value: number) {
        this.setProperty(BONumbering.PROPERTY_AUTOKEY_NAME, value);
    }

    /** 字符串 */
    toString(): string {
        let builder: StringBuilder = new StringBuilder();
        builder.append("{");
        builder.append("[");
        builder.append(BONumbering.name);
        builder.append("].");
        builder.append("[");
        builder.append(BONumbering.PROPERTY_OBJECTCODE_NAME);
        builder.append(" ");
        builder.append("=");
        builder.append(" ");
        builder.append(this.objectCode);
        builder.append("]");
        builder.append("&");
        builder.append("[");
        builder.append(BONumbering.PROPERTY_DOCUMENTSUBTYPE_NAME);
        builder.append(" ");
        builder.append("=");
        builder.append(" ");
        builder.append(this.documentSubType);
        builder.append("]");
        builder.append("}");
        return builder.toString();
    }
    /** 获取查询 */
    criteria(): ICriteria {
        let criteria: ICriteria = new Criteria();
        let condition: ICondition = criteria.conditions.create();
        condition.alias = BONumbering.PROPERTY_OBJECTCODE_NAME;
        condition.value = this.objectCode;
        condition = criteria.conditions.create();
        condition.alias = BONumbering.PROPERTY_DOCUMENTSUBTYPE_NAME;
        condition.value = this.documentSubType;
        return criteria;
    }

    /** 初始化数据 */
    protected init(): void {
    }
}

/** 业务对象序列编号方式 */
export class BOSeriesNumbering extends BusinessObject<BOSeriesNumbering>  {
    /** 构造函数 */
    constructor() {
        super();
    }
    /** 映射的属性名称-对象编码 */
    static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
    /** 获取-对象编码 */
    get objectCode(): string {
        return this.getProperty<string>(BOSeriesNumbering.PROPERTY_OBJECTCODE_NAME);
    }
    /** 设置-对象编码 */
    set objectCode(value: string) {
        this.setProperty(BOSeriesNumbering.PROPERTY_OBJECTCODE_NAME, value);
    }

    /** 映射的属性名称-序列 */
    static PROPERTY_SERIES_NAME: string = "Series";
    /** 获取-序列 */
    get series(): number {
        return this.getProperty<number>(BOSeriesNumbering.PROPERTY_SERIES_NAME);
    }
    /** 设置-序列 */
    set series(value: number) {
        this.setProperty(BOSeriesNumbering.PROPERTY_SERIES_NAME, value);
    }

    /** 映射的属性名称-序列名称 */
    static PROPERTY_SERIESNAME_NAME: string = "SeriesName";
    /** 获取-序列名称 */
    get seriesName(): string {
        return this.getProperty<string>(BOSeriesNumbering.PROPERTY_SERIESNAME_NAME);
    }
    /** 设置-序列名称 */
    set seriesName(value: string) {
        this.setProperty(BOSeriesNumbering.PROPERTY_SERIESNAME_NAME, value);
    }

    /** 映射的属性名称-下一个序号 */
    static PROPERTY_NEXTNUMBER_NAME: string = "NextNumber";
    /** 获取-下一个序号 */
    get nextNumber(): number {
        return this.getProperty<number>(BOSeriesNumbering.PROPERTY_NEXTNUMBER_NAME);
    }
    /** 设置-下一个序号 */
    set nextNumber(value: number) {
        this.setProperty(BOSeriesNumbering.PROPERTY_NEXTNUMBER_NAME, value);
    }

    /** 映射的属性名称-已锁定 */
    static PROPERTY_LOCKED_NAME: string = "Locked";
    /** 获取-已锁定 */
    get locked(): emYesNo {
        return this.getProperty<emYesNo>(BOSeriesNumbering.PROPERTY_LOCKED_NAME);
    }
    /** 设置-已锁定 */
    set locked(value: emYesNo) {
        this.setProperty(BOSeriesNumbering.PROPERTY_LOCKED_NAME, value);
    }

    /** 映射的属性名称-模板 */
    static PROPERTY_TEMPLATE_NAME: string = "Template";
    /** 获取-模板 */
    get template(): string {
        return this.getProperty<string>(BOSeriesNumbering.PROPERTY_TEMPLATE_NAME);
    }
    /** 设置-模板 */
    set template(value: string) {
        this.setProperty(BOSeriesNumbering.PROPERTY_TEMPLATE_NAME, value);
    }


    /** 字符串 */
    toString(): string {
        let builder: StringBuilder = new StringBuilder();
        builder.append("{");
        builder.append("[");
        builder.append(BONumbering.name);
        builder.append("].");
        builder.append("[");
        builder.append(BOSeriesNumbering.PROPERTY_OBJECTCODE_NAME);
        builder.append(" ");
        builder.append("=");
        builder.append(" ");
        builder.append(this.objectCode);
        builder.append("]");
        builder.append("&");
        builder.append("[");
        builder.append(BOSeriesNumbering.PROPERTY_SERIES_NAME);
        builder.append(" ");
        builder.append("=");
        builder.append(" ");
        builder.append(this.series);
        builder.append("]");
        builder.append("}");
        return builder.toString();
    }
    /** 获取查询 */
    criteria(): ICriteria {
        let criteria: ICriteria = new Criteria();
        let condition: ICondition = criteria.conditions.create();
        condition.alias = BOSeriesNumbering.PROPERTY_OBJECTCODE_NAME;
        condition.value = this.objectCode;
        condition = criteria.conditions.create();
        condition.alias = BOSeriesNumbering.PROPERTY_SERIES_NAME;
        condition.value = this.series.toString();
        return criteria;
    }

    /** 初始化数据 */
    protected init(): void {
    }
}

