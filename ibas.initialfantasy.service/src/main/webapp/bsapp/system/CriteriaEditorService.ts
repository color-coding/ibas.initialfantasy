/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { BORepositoryInitialFantasy } from "../../borep/BORepositories";

/** 查询编辑服务 */
export class CriteriaEditorService
    extends ibas.ServiceWithResultApplication<ICriteriaEditorView, ibas.ICriteriaEditorServiceContract, ibas.ICriteria> {

    /** 应用标识 */
    static APPLICATION_ID: string = "d4796fc7-2bce-44b5-b950-62460cfd460f";
    /** 应用名称 */
    static APPLICATION_NAME: string = "initialfantasy_app_criteria_editor";
    /** 构造函数 */
    constructor() {
        super();
        this.id = CriteriaEditorService.APPLICATION_ID;
        this.name = CriteriaEditorService.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.addConditionEvent = this.addCondition;
        this.view.removeConditionEvent = this.removeCondition;
        this.view.confirmEvent = this.confirm;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        this.view.showTarget(this.editData.businessObject, this.aliases);
        this.view.showConditions(this.editData.conditions);
    }
    /** 运行服务 */
    protected runService(contract: ibas.ICriteriaEditorServiceContract): void {
        // 解析待编辑的查询
        if (!ibas.objects.isNull(contract) && !ibas.objects.isNull(contract.criteria)) {
            if (contract.criteria instanceof Array) {
                this.editData = new ibas.Criteria();
                for (let item of contract.criteria) {
                    if (!ibas.objects.instanceOf(item, ibas.Condition)) {
                        continue;
                    }
                    this.editData.conditions.add(item);
                }
            } else if (ibas.objects.instanceOf(contract.criteria, ibas.Criteria)) {
                this.editData = contract.criteria;
            }
        }
        if (ibas.objects.isNull(this.editData) || !ibas.objects.instanceOf(this.editData, ibas.Criteria)) {
            // 输入数据无效，服务不运行
            throw new Error(ibas.i18n.prop("initialfantasy_app_criteria_editor") + ibas.i18n.prop("sys_invalid_parameter", "criteria"));
        }
        // 解析查询条件的可用字段
        this.aliases = new ibas.ArrayList<ibas.KeyText>();
        if (contract.aliases instanceof Array) {
            for (let item of contract.aliases) {
                if (ibas.objects.instanceOf(item, ibas.KeyText)) {
                    this.aliases.add(item);
                }
            }
        }
        if (this.aliases.length === 0) {
            // 尝试从目标解析
            if (typeof contract.target === "string") {
                // 编辑的对象名称，从数据库中查询
                this.editData.businessObject = contract.target;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.BOInformation.PROPERTY_CODE_NAME;
                condition.value = this.editData.businessObject;
                let that: this = this;
                let boRepository: BORepositoryInitialFantasy = new BORepositoryInitialFantasy();
                boRepository.fetchBOInformation({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.BOInformation>): void {
                        let boInfo: bo.BOInformation = opRslt.resultObjects.firstOrDefault();
                        for (let item of boInfo.boPropertyInformations) {
                            that.aliases.add(new ibas.KeyText(item.property, item.description));
                        }
                        that.show();
                    }
                });
                return;
            } else if (typeof contract.target === "object") {
                // 编辑的为对象，解析对象属性
                let name: string = ibas.objects.getName(contract.target);
                if (!ibas.strings.isEmpty(name)) {
                    this.editData.businessObject = name;
                    name = name.toLowerCase();
                    for (let item of Object.getOwnPropertyNames(contract.target)) {
                        let key: string = item;
                        let text: string = ibas.i18n.prop("bo_" + name + "_" + item.toString());
                        if (text.startsWith("[") && text.endsWith("]")) {
                            text = key;
                        }
                        this.aliases.add(new ibas.KeyText(key, text));
                    }
                }
            }
        }
        super.show();
    }
    private editData: ibas.ICriteria;
    /** 可用的条件字段 */
    private aliases: ibas.List<ibas.KeyText>;

    private addCondition(): void {
        this.editData.conditions.create();
        this.view.showConditions(this.editData.conditions);
    }
    private removeCondition(condition: ibas.ICondition): void {
        this.editData.conditions.remove(condition);
        this.view.showConditions(this.editData.conditions);
    }
    private confirm(): void {
        this.fireCompleted(this.editData);
    }
}
/** 视图-查询编辑服务 */
export interface ICriteriaEditorView extends ibas.IView {
    /** 显示目标 */
    showTarget(target: string, aliaes: ibas.KeyText[]): void;
    /** 显示查询条件 */
    showConditions(datas: ibas.ICondition[]): void;
    /** 添加查询条件 */
    addConditionEvent: Function;
    /** 移出查询 */
    removeConditionEvent: Function;
    /** 确定 */
    confirmEvent: Function;
}
/** 查询编辑服务映射 */
export class CriteriaEditorServiceMapping extends ibas.ServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = CriteriaEditorService.APPLICATION_ID;
        this.name = CriteriaEditorService.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
        this.proxy = ibas.CriteriaEditorServiceProxy;
    }
    /** 创建服务实例 */
    create(): ibas.IService<ibas.IServiceContract> {
        return new CriteriaEditorService();
    }
}
