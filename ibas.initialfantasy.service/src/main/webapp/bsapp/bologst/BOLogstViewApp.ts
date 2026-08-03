/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        /** 查看应用-业务对象日志 */
        export class BOLogstViewApp extends ibas.Application<IBOLogstViewView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "9fdf6c90-27ad-4988-a002-1abeabe064c6";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_bologst_view";
            /** 构造函数 */
            constructor() {
                super();
                this.id = BOLogstViewApp.APPLICATION_ID;
                this.name = BOLogstViewApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                if (this.onViewShowed instanceof Function) {
                    this.onViewShowed();
                }
                if (ibas.objects.isNull(this.template)) {
                    return;
                }
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("initialfantasy_display_bo_datas"));
                this.view.drawView(this.template);
                this.view.showData(this.datas, this.showSummary);
            }
            private datas: ibas.IList<object>;
            run(data?: bo.BOLogst | bo.BOLogst[]): void {
                this.datas = new ibas.ArrayList<object>();
                // 按实例号降序排序，确保最新版本在前，保证摘要对比顺序正确
                let logsts: bo.BOLogst[] = ibas.arrays.create(data);
                logsts.sort((a, b) => b.logInst - a.logInst);
                for (let item of logsts) {
                    try {
                        if (typeof item.content === "string") {
                            this.datas.add(JSON.parse(item.content.replace(/[\u0000-\u001F\u007F]/g, "")));
                        } else {
                            this.datas.add(item.content);
                        }
                    } catch (error) {
                        throw new Error(ibas.i18n.prop("sys_invalid_parameter", "content"));
                    }
                }
                if (this.datas.length > 0) {
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    let addedCodes: { [key: string]: boolean } = {};
                    let conditions: (value: any) => void = (value: any) => {
                        if (value instanceof Array) {
                            for (let item of value) {
                                conditions(item);
                            }
                            return;
                        }
                        if (typeof value !== "object" || value === null) {
                            return;
                        }
                        if (value instanceof Date) {
                            return;
                        }
                        for (let item in value) {
                            if (ibas.strings.equalsIgnoreCase("ObjectCode", item)) {
                                let code: string = value[item];
                                if (ibas.strings.isEmpty(code) || addedCodes[code.toUpperCase()]) {
                                    continue;
                                }
                                addedCodes[code.toUpperCase()] = true;
                                let condition: ibas.ICondition = criteria.conditions.create();
                                condition.alias = bo.BOInformation.PROPERTY_CODE_NAME;
                                condition.value = code;
                                condition.relationship = ibas.emConditionRelationship.OR;
                                condition = criteria.conditions.create();
                                condition.alias = bo.BOInformation.PROPERTY_CODE_NAME;
                                condition.operation = ibas.emConditionOperation.START;
                                condition.value = code + ".";
                                condition.relationship = ibas.emConditionRelationship.OR;
                            } else {
                                conditions(value[item]);
                            }
                        }
                    };
                    for (let item of this.datas) {
                        conditions(item);
                    }
                    if (criteria.conditions.length === 0) {
                        throw new Error(ibas.i18n.prop("sys_invalid_parameter", "data"));
                    }
                    criteria.conditions.firstOrDefault().relationship = ibas.emConditionRelationship.NONE;
                    let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                    boRepository.fetchBOInformation({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                this.template = outs.template(this.datas, opRslt.resultObjects);
                                if (this.isViewShowed() !== true) {
                                    this.show();
                                }
                            } catch (error) {
                                this.messages(error);
                            }
                        }
                    });
                    this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("initialfantasy_fetch_bo_information"));
                } else {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "data"));
                }
            }
            onViewShowed: () => void;
            private template: outs.BOType;
            public showSummary: boolean;
        }
        /** 视图-业务对象日志 */
        export interface IBOLogstViewView extends ibas.IBOViewView {
            /** 绘制窗体 */
            drawView(template: outs.BOType): void;
            /** 显示数据 */
            showData(datas: object[], summary?: boolean): void;
        }
        export namespace outs {
            export function template(datas: object[], boInfos: ibas.IList<bo.BOInformation>): BOType {
                let template: BOType = new BOType();
                for (let data of datas) {
                    if (ibas.objects.isNull(data)) {
                        continue;
                    }
                    if (!ibas.strings.isEmpty(template.code) || !ibas.strings.isEmpty(template.name)) {
                        continue;
                    }
                    let boInfo: bo.BOInformation = boInfos.firstOrDefault(
                        c => ibas.strings.equalsIgnoreCase(c.code, ibas.objects.propertyValue(data, "ObjectCode", true)));
                    if (boInfo instanceof bo.BOInformation) {
                        template.code = boInfo.code;
                        template.name = boInfo.name;
                        template.description = boInfo.description;
                        let property: BOTypeProperty;
                        for (let ptyInfo of boInfo.boPropertyInformations) {
                            if (ibas.strings.isEmpty(ptyInfo.editType) && ptyInfo.editSize < 0) {
                                let subInfo: bo.BOInformation = boInfos.firstOrDefault(c => ibas.strings.equalsIgnoreCase(c.code, ptyInfo.mapped));
                                if (ibas.objects.isNull(subInfo)) {
                                    subInfo = boInfos.firstOrDefault(c => ibas.strings.equalsIgnoreCase(c.name, ptyInfo.dataType));
                                }
                                if (subInfo instanceof bo.BOInformation) {
                                    let subDatas: object[] = [];
                                    // 通过数据判断属性是否为数组，而非依据属性名结尾字符
                                    let isArray: boolean = false;
                                    for (let item of datas) {
                                        let tmpItem: any = ibas.objects.propertyValue(item, ptyInfo.property, true);
                                        if (tmpItem instanceof Array) {
                                            isArray = true;
                                            break;
                                        }
                                    }
                                    if (isArray) {
                                        property = new BOTypePropertyArray();
                                        for (let item of datas) {
                                            let tmpItem: any = ibas.objects.propertyValue(item, ptyInfo.property, true);
                                            if (tmpItem instanceof Array) {
                                                for (let tItem of tmpItem) {
                                                    if (!ibas.objects.isNull(tItem)) {
                                                        tItem.ObjectCode = subInfo.code;
                                                        subDatas.push(tItem);
                                                    }
                                                }
                                            }
                                        }
                                        (<BOTypePropertyArray>property).type = outs.template(subDatas, boInfos);
                                    } else {
                                        property = new BOTypePropertyObject();
                                        for (let item of datas) {
                                            let tmpItem: any = ibas.objects.propertyValue(item, ptyInfo.property, true);
                                            if (!ibas.objects.isNull(tmpItem)) {
                                                tmpItem.ObjectCode = subInfo.code;
                                                subDatas.push(tmpItem);
                                            }
                                        }
                                        (<BOTypePropertyObject>property).type = outs.template(subDatas, boInfos);
                                    }
                                }
                            } else if (ibas.strings.equalsIgnoreCase(ptyInfo.dataType, "DATE")
                                && ibas.strings.equalsIgnoreCase(ptyInfo.editType, "TIME")) {
                                property = new BOTypePropertyTime();
                            } else if (ibas.strings.equalsIgnoreCase(ptyInfo.dataType, "DATE")) {
                                property = new BOTypePropertyDate();
                            } else if (ibas.strings.equalsIgnoreCase(ptyInfo.dataType, "NUMERIC")) {
                                property = new BOTypePropertyNumeric();
                            } else if (ibas.strings.equalsIgnoreCase(ptyInfo.dataType, "DECIMAL")) {
                                property = new BOTypePropertyDecimal();
                            } else {
                                property = new BOTypePropertyString();
                            }
                            property.name = ptyInfo.property;
                            property.description = ptyInfo.description;
                            template.properties.add(property);
                        }
                        template.properties.sort((a, b) => {
                            let aIsObject: boolean = a.type instanceof BOType;
                            let bIsObject: boolean = b.type instanceof BOType;
                            if (aIsObject !== bIsObject) {
                                return aIsObject ? 1 : -1;
                            }
                            return a.name.localeCompare(b.name);
                        });
                    }
                }
                return template;
            }
            export class BOType {
                code: string;
                name: string;
                description: string;
                properties: ibas.IList<BOTypeProperty> = new ibas.ArrayList<BOTypeProperty>();
            }
            export abstract class BOTypeProperty {
                name: string;
                description: string;
                type: any;
            }
            export class BOTypePropertyString extends BOTypeProperty {
                get type(): any {
                    return String;
                }
            }
            export class BOTypePropertyDecimal extends BOTypeProperty {
                get type(): any {
                    return Number;
                }
            }
            export class BOTypePropertyNumeric extends BOTypeProperty {
                get type(): any {
                    return Number;
                }
            }
            export class BOTypePropertyDate extends BOTypeProperty {
                get type(): any {
                    return Date;
                }
            }
            export class BOTypePropertyTime extends BOTypeProperty {
                get type(): any {
                    return Number;
                }
            }
            export class BOTypePropertyObject extends BOTypeProperty {
                type: BOType;
            }
            export class BOTypePropertyArray extends BOTypeProperty {
                type: BOType;
            }

        }
    }

}
