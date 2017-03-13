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
import { OrganizationalStructureViewApp } from "./OrganizationalStructureViewApp";
import { OrganizationalStructureEditApp } from "./OrganizationalStructureEditApp";

/** 列表应用-组织-结构 */
export class OrganizationalStructureListApp extends ibas.BOListApplication<IOrganizationalStructureListView, bo.OrganizationalStructure> {

    /** 应用标识 */
    static APPLICATION_ID: string = "18ae6537-d3b0-4050-94f6-74defad04098";
    /** 应用名称 */
    static APPLICATION_NAME: string = "mu_initialfantasy_app_organizationalstructure_list";

    constructor() {
        super();
        this.id = OrganizationalStructureListApp.APPLICATION_ID;
        this.name = OrganizationalStructureListApp.APPLICATION_NAME;
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
        let fetcher: ibas.FetchCaller<bo.OrganizationalStructure> = {
            /** 查询条件 */
            criteria: criteria,
            /**
             * 调用完成
             * @param opRslt 结果
             */
            onCompleted(opRslt: ibas.IOperationResult<bo.OrganizationalStructure>): void {
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
        boRepository.fetchOrganizationalStructure(fetcher);
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_fetching_data"));
    }
    /** 新建数据 */
    protected newData(): void {
        let app = new OrganizationalStructureEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run();
    }
    /** 查看数据，参数：目标数据 */
    protected viewData(data: bo.OrganizationalStructure): void {
        let app = new OrganizationalStructureViewApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run(data);

    }
    /** 编辑数据，参数：目标数据 */
    protected editData(data: bo.OrganizationalStructure): void {
        this.messages(ibas.emMessageType.ERROR, ibas.i18n.prop("module_a_ui_no_edit"));
    }
}
/** 视图-组织-结构 */
export interface IOrganizationalStructureListView extends ibas.IBOListView {
    /** 编辑数据事件，参数：编辑对象 */
    editDataEvent: Function;
    /** 显示数据 */
    showData(datas: bo.OrganizationalStructure[]): void;
}
