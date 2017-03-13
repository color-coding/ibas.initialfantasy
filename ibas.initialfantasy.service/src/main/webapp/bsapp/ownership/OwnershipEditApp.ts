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

/** 应用-数据权限 */
export class OwnershipEditApp extends ibas.BOEditApplication<IOwnershipEditView, bo.Ownership> {

    /** 应用标识 */
    static APPLICATION_ID: string = "1ea541f5-80d0-44a1-9d8b-4c783eb23aa7";
    /** 应用名称 */
    static APPLICATION_NAME: string = "mu_initialfantasy_app_ownership_edit";

    constructor() {
        super();
        this.id = OwnershipEditApp.APPLICATION_ID;
        this.name = OwnershipEditApp.APPLICATION_NAME;
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
        this.view.showOwnership(this.editData);
    }
    /** 待编辑的数据 */
    protected editData: bo.Ownership;
    /** 保存数据 */
    protected saveData(): void {
        this.messages(ibas.emMessageType.SUCCESS, ibas.i18n.prop("sys_shell_ui_sucessful"));
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let data: bo.Ownership = arguments[0];
        if (ibas.object.isNull(data)) {
            data = new bo.Ownership();

        }
        this.editData = data;
        super.run();
    }
}
/** 视图-数据权限 */
export interface IOwnershipEditView extends ibas.IBOEditView {
    /** 显示数据 */
    showOwnership(data: bo.Ownership): void;
}
