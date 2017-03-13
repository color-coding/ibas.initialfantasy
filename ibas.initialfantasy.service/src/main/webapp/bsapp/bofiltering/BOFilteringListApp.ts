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
import { BOFilteringViewApp } from "./BOFilteringViewApp";
import { BOFilteringEditApp } from "./BOFilteringEditApp";

/** 列表应用-业务对象筛选 */
export class BOFilteringListApp extends ibas.BOListApplication<IBOFilteringListView, bo.BOFiltering> {

    /** 应用标识 */
    static APPLICATION_ID: string = "a61b8621-52ca-46e6-893f-fba0502a46d9";
    /** 应用名称 */
    static APPLICATION_NAME: string = "mu_initialfantasy_app_bofiltering_list";

    constructor() {
        super();
        this.id = BOFilteringListApp.APPLICATION_ID;
        this.name = BOFilteringListApp.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.editDataEvent = this.editData;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
    }
    /** 查询数据 */
    protected fetchData(criteria: ibas.ICriteria): void {
        this.busy(true);
        let that = this;
        let boRepository = new BORepositoryInitialFantasy();
        let fetcher: ibas.FetchCaller<bo.BOFiltering> = {
            /** 查询条件 */
            criteria: criteria,
            /**
             * 调用完成
             * @param opRslt 结果
             */
            onCompleted(opRslt: ibas.IOperationResult<bo.BOFiltering>): void {
                try {
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    that.view.showData(opRslt.resultObjects);
                    that.busy(false);
                } catch (error) {
                    that.messages(error);
                }
            }
        }
        boRepository.fetchBOFiltering(fetcher);
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_fetching_data"));
    }
    /** 新建数据 */
    protected newData(): void {
        let app = new BOFilteringEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run();
    }
    /** 查看数据，参数：目标数据 */
    protected viewData(data: bo.BOFiltering): void {
        let app = new BOFilteringViewApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run(data);

    }
    /** 编辑数据，参数：目标数据 */
    protected editData(data: bo.BOFiltering): void {
        this.messages(ibas.emMessageType.ERROR, ibas.i18n.prop("module_a_ui_no_edit"));
    }
}
/** 视图-业务对象筛选 */
export interface IBOFilteringListView extends ibas.IBOListView {
    /** 编辑数据事件，参数：编辑对象 */
    editDataEvent: Function;
    /** 显示数据 */
    showData(datas: bo.BOFiltering[]): void;
}
