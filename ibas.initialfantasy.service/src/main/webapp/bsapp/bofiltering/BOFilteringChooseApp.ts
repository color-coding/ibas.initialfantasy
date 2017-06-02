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
import { BOFilteringEditApp } from "./BOFilteringEditApp";

/** 应用-业务对象筛选 */
export class BOFilteringChooseApp extends ibas.BOChooseService<IBOFilteringChooseView, bo.BOFiltering> {

    /** 应用标识 */
    static APPLICATION_ID: string = "b0b91265-4935-4ce2-8acd-b1eab3bf9d97";
    /** 应用名称 */
    static APPLICATION_NAME: string = "initialfantasy_app_bofiltering_choose";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.BOFiltering.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = BOFilteringChooseApp.APPLICATION_ID;
        this.name = BOFilteringChooseApp.APPLICATION_NAME;
        this.boCode = BOFilteringChooseApp.BUSINESS_OBJECT_CODE;
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
    }
    /** 查询数据 */
    protected fetchData(criteria: ibas.ICriteria): void {
        this.busy(true);
        let that: this = this;
        let boRepository: BORepositoryInitialFantasy = new BORepositoryInitialFantasy();
        boRepository.fetchBOFiltering({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.BOFiltering>): void {
                try {
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    if (opRslt.resultObjects.length === 1
                        && ibas.config.get(ibas.CONFIG_ITEM_AUTO_CHOOSE_DATA, true)) {
                        // 仅一条数据，直接选择
                        that.chooseData(opRslt.resultObjects);
                    } else {
                        if (!that.isViewShowed()) {
                            // 没显示视图，先显示
                            that.show();
                        }
                        that.view.showData(opRslt.resultObjects);
                        that.busy(false);
                    }
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_fetching_data"));
    }
    /** 新建数据 */
    protected newData(): void {
        // 关闭自身
        this.destroy();
        // 调用编辑应用
        let app: BOFilteringEditApp = new BOFilteringEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run();
    }
}
/** 视图-业务对象筛选 */
export interface IBOFilteringChooseView extends ibas.IBOChooseView {
    /** 显示数据 */
    showData(datas: bo.BOFiltering[]): void;
}
/** 业务对象筛选选择服务映射 */
export class BOFilteringChooseServiceMapping extends ibas.BOChooseServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = BOFilteringChooseApp.APPLICATION_ID;
        this.name = BOFilteringChooseApp.APPLICATION_NAME;
        this.boCode = BOFilteringChooseApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IServiceContract> {
        return new BOFilteringChooseApp();
    }
}
