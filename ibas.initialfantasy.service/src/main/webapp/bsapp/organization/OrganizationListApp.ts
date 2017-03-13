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
import { OrganizationViewApp } from "./OrganizationViewApp";
import { OrganizationEditApp } from "./OrganizationEditApp";

/** 列表应用-组织 */
export class OrganizationListApp extends ibas.BOListApplication<IOrganizationListView, bo.Organization> {

    /** 应用标识 */
    static APPLICATION_ID: string = "dfc0f87a-0ff6-4e83-b21c-5eee86a7ac9c";
    /** 应用名称 */
    static APPLICATION_NAME: string = "mu_initialfantasy_app_organization_list";

    constructor() {
        super();
        this.id = OrganizationListApp.APPLICATION_ID;
        this.name = OrganizationListApp.APPLICATION_NAME;
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
        let fetcher: ibas.FetchCaller<bo.Organization> = {
            /** 查询条件 */
            criteria: criteria,
            /**
             * 调用完成
             * @param opRslt 结果
             */
            onCompleted(opRslt: ibas.IOperationResult<bo.Organization>): void {
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
        boRepository.fetchOrganization(fetcher);
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_fetching_data"));
    }
    /** 新建数据 */
    protected newData(): void {
        let app = new OrganizationEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run();
    }
    /** 查看数据，参数：目标数据 */
    protected viewData(data: bo.Organization): void {
        let app = new OrganizationViewApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run(data);

    }
    /** 编辑数据，参数：目标数据 */
    protected editData(data: bo.Organization): void {
        this.messages(ibas.emMessageType.ERROR, ibas.i18n.prop("module_a_ui_no_edit"));
    }
}
/** 视图-组织 */
export interface IOrganizationListView extends ibas.IBOListView {
    /** 编辑数据事件，参数：编辑对象 */
    editDataEvent: Function;
    /** 显示数据 */
    showData(datas: bo.Organization[]): void;
}
