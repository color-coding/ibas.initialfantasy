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
import { PrivilegeEditApp } from "./PrivilegeEditApp";

/** 应用-系统权限 */
export class PrivilegeChooseApp extends ibas.BOChooseApplication<IPrivilegeChooseView, bo.Privilege> {

    /** 应用标识 */
    static APPLICATION_ID: string = "066e7275-e468-4866-9e34-3392cbdd64d8";
    /** 应用名称 */
    static APPLICATION_NAME: string = "mu_initialfantasy_app_privilege_choose";

    constructor() {
        super();
        this.id = PrivilegeChooseApp.APPLICATION_ID;
        this.name = PrivilegeChooseApp.APPLICATION_NAME;
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
        let that = this;
        let boRepository = new BORepositoryInitialFantasy();
        let fetcher: ibas.FetchCaller<bo.Privilege> = {
            /** 查询条件 */
            criteria: criteria,
            /**
             * 调用完成
             * @param opRslt 结果
             */
            onCompleted(opRslt: ibas.IOperationResult<bo.Privilege>): void {
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
        boRepository.fetchPrivilege(fetcher);
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_fetching_data"));
    }
    /** 新建数据 */
    protected newData(): void {
        // 关闭自身
        this.destroy();
        // 调用编辑应用
        let app = new PrivilegeEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run();
    }
    /** 选择数据 */
    protected chooseData(data: bo.Privilege): void {

    }
}
/** 视图-系统权限 */
export interface IPrivilegeChooseView extends ibas.IBOChooseView {
    /** 显示数据 */
    showData(datas: bo.Privilege[]): void;
}
