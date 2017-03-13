/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "../../3rdparty/ibas/index";
import { BORepositoryInitialFantasy } from "../../borep/BORepositories";
import * as bo from "../../borep/bo/index";

/** 应用-业务对象筛选 */
export class BOFilteringEditApp extends ibas.BOEditApplication<IBOFilteringEditView, bo.BOFiltering> {

    /** 应用标识 */
    static APPLICATION_ID: string = "4fe5cfc5-ee6e-48cf-b336-5f026888d838";
    /** 应用名称 */
    static APPLICATION_NAME: string = "mu_initialfantasy_app_bofiltering_edit";

    constructor() {
        super();
        this.id = BOFilteringEditApp.APPLICATION_ID;
        this.name = BOFilteringEditApp.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.addBOFilteringConditionEvent = this.addBOFilteringCondition;
        this.view.removeBOFilteringConditionEvent = this.removeBOFilteringCondition;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        this.view.showBOFiltering(this.editData);
        this.view.showBOFilteringConditions(this.editData.bOFilteringConditions);
    }
    /** 待编辑的数据 */
    protected editData: bo.BOFiltering;
    /** 保存数据 */
    protected saveData(): void {
        this.messages(ibas.emMessageType.SUCCESS, ibas.i18n.prop("sys_shell_ui_sucessful"));
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let data: bo.BOFiltering = arguments[0];
        if (ibas.object.isNull(data)) {
            data = new bo.BOFiltering();

        }
        this.editData = data;
        super.run();
    }

    /** 添加业务对象筛选-条件事件 */
    addBOFilteringCondition(): void {
        this.editData.bOFilteringConditions.create();
        this.view.showBOFilteringConditions(this.editData.bOFilteringConditions);
    }
    /** 删除业务对象筛选-条件事件 */
    removeBOFilteringCondition(item: bo.BOFilteringCondition): void {
        if (this.editData.bOFilteringConditions.indexOf(item) >= 0) {
            this.editData.bOFilteringConditions.remove(item);
            this.view.showBOFilteringConditions(this.editData.bOFilteringConditions);
        }
    }

}
/** 视图-业务对象筛选 */
export interface IBOFilteringEditView extends ibas.IBOEditView {
    /** 添加业务对象筛选-条件事件 */
    addBOFilteringConditionEvent: Function;
    /** 删除业务对象筛选-条件事件 */
    removeBOFilteringConditionEvent: Function;
    /** 显示数据 */
    showBOFilteringConditions(datas: bo.BOFilteringCondition[]): void;
    /** 显示数据 */
    showBOFiltering(data: bo.BOFiltering): void;
}
