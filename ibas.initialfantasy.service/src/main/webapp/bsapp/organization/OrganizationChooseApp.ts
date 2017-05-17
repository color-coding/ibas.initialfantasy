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
import { OrganizationEditApp } from "./OrganizationEditApp";

/** 应用-组织 */
export class OrganizationChooseApp extends ibas.BOChooseService<IOrganizationChooseView, bo.Organization> {

    /** 应用标识 */
    static APPLICATION_ID: string = "2a18fe24-434b-4466-a9e2-196745a8e35b";
    /** 应用名称 */
    static APPLICATION_NAME: string = "initialfantasy_app_organization_choose";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.Organization.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = OrganizationChooseApp.APPLICATION_ID;
        this.name = OrganizationChooseApp.APPLICATION_NAME;
        this.boCode = OrganizationChooseApp.BUSINESS_OBJECT_CODE;
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
        try {
            this.busy(true);
            let that = this;
            let boRepository: BORepositoryInitialFantasy = new BORepositoryInitialFantasy();
            boRepository.fetchOrganization({
                criteria: criteria,
                onCompleted(opRslt: ibas.IOperationResult<bo.Organization>): void {
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
        } catch (error) {
            this.messages(error);
        }
    }
    /** 新建数据 */
    protected newData(): void {
        // 关闭自身
        this.destroy();
        // 调用编辑应用
        let app = new OrganizationEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run();
    }
}
/** 视图-组织 */
export interface IOrganizationChooseView extends ibas.IBOChooseView {
    /** 显示数据 */
    showData(datas: bo.Organization[]): void;
}
/** 组织选择服务映射 */
export class OrganizationChooseServiceMapping extends ibas.BOChooseServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = OrganizationChooseApp.APPLICATION_ID;
        this.name = OrganizationChooseApp.APPLICATION_NAME;
        this.boCode = OrganizationChooseApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IServiceContract> {
        return new OrganizationChooseApp();
    }
}
