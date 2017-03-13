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

/** 应用-角色 */
export class RoleEditApp extends ibas.BOEditApplication<IRoleEditView, bo.Role> {

    /** 应用标识 */
    static APPLICATION_ID: string = "b0f7f8f8-3b09-446e-87ac-e96fb191f79a";
    /** 应用名称 */
    static APPLICATION_NAME: string = "mu_initialfantasy_app_role_edit";

    constructor() {
        super();
        this.id = RoleEditApp.APPLICATION_ID;
        this.name = RoleEditApp.APPLICATION_NAME;
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
        this.view.showRole(this.editData);
    }
    /** 待编辑的数据 */
    protected editData: bo.Role;
    /** 保存数据 */
    protected saveData(): void {
        this.messages(ibas.emMessageType.SUCCESS, ibas.i18n.prop("sys_shell_ui_sucessful"));
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let data: bo.Role = arguments[0];
        if (ibas.object.isNull(data)) {
            data = new bo.Role();

        }
        this.editData = data;
        super.run();
    }
}
/** 视图-角色 */
export interface IRoleEditView extends ibas.IBOEditView {
    /** 显示数据 */
    showRole(data: bo.Role): void;
}
