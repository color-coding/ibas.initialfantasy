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

/** 应用-组织 */
export class OrganizationEditApp extends ibas.BOEditApplication<IOrganizationEditView, bo.Organization> {

    /** 应用标识 */
    static APPLICATION_ID: string = "4e5529f9-b884-45d7-8cd4-7e15a18666e4";
    /** 应用名称 */
    static APPLICATION_NAME: string = "mu_initialfantasy_app_organization_edit";

    constructor() {
        super();
        this.id = OrganizationEditApp.APPLICATION_ID;
        this.name = OrganizationEditApp.APPLICATION_NAME;
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
        this.view.showOrganization(this.editData);
    }
    /** 待编辑的数据 */
    protected editData: bo.Organization;
    /** 保存数据 */
    protected saveData(): void {
        this.messages(ibas.emMessageType.SUCCESS, ibas.i18n.prop("sys_shell_ui_sucessful"));
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let data: bo.Organization = arguments[0];
        if (ibas.object.isNull(data)) {
            data = new bo.Organization();

        }
        this.editData = data;
        super.run();
    }
}
/** 视图-组织 */
export interface IOrganizationEditView extends ibas.IBOEditView {
    /** 显示数据 */
    showOrganization(data: bo.Organization): void;
}
