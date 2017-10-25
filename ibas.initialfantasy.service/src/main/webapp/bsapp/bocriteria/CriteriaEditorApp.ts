/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";

/** 业务对象检索条件编辑 */
export class CriteriaEditorApp extends ibas.Application<ICriteriaEditorView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "d4796fc7-2bce-44b5-b950-62460cfd460f";
    /** 应用名称 */
    static APPLICATION_NAME: string = "initialfantasy_app_criteria_editor";
    /** 构造函数 */
    constructor() {
        super();
        this.id = CriteriaEditorApp.APPLICATION_ID;
        this.name = CriteriaEditorApp.APPLICATION_NAME;
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
        this.view.showTarget(this.editData.boCode);
        this.view.showConditions(this.editData.conditions);
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        this.edit(arguments[0]);
    }
    private get editData(): ibas.ICriteria {
        if (this.caller.criteria instanceof Array) {
            let criteria: ibas.Criteria = new ibas.Criteria();
            for (let item of this.caller.criteria) {
                criteria.conditions.add(item);
            }
            return criteria;
        } else {
            return this.caller.criteria;
        }
    }
    private caller: ICriteriaEditorCaller;
    edit(caller: ICriteriaEditorCaller): void {
        if (ibas.objects.isNull(caller) || ibas.objects.isNull(caller.criteria)) {
            throw new Error(ibas.i18n.prop("initialfantasy_invaild_edit_target"));
        }
        this.caller = caller;
        super.run();
    }

    private addCondition(): void {
        this.editData.conditions.create();
        this.view.showConditions(this.editData.conditions);
    }
    private removeCondition(condition: ibas.ICondition): void {
        this.editData.conditions.remove(condition);
        this.view.showConditions(this.editData.conditions);
    }
    private confirm(): void {
        let opRslt: ibas.IOperationResult<ibas.ICriteria> = new ibas.OperationResult<ibas.ICriteria>();
        opRslt.resultObjects.add(this.editData);
        this.caller.onCompleted(opRslt);
        this.close();
    }
}
/** 查询编辑调用者 */
export interface ICriteriaEditorCaller extends ibas.FetchCaller<ibas.ICriteria> {

}
/** 视图-业务对象检索条件编辑 */
export interface ICriteriaEditorView extends ibas.IView {
    /** 显示目标 */
    showTarget(target: string): void;
    /** 显示查询条件 */
    showConditions(datas: ibas.ICondition[]): void;
    /** 添加查询条件 */
    addConditionEvent: Function;
    /** 移出查询 */
    removeConditionEvent: Function;
    /** 确定 */
    confirmEvent: Function;
}
