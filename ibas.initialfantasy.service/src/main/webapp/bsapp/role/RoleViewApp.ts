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
import { RoleEditApp } from "./RoleEditApp";

/** 查看应用-角色 */
export class RoleViewApp extends ibas.BOViewApplication<IRoleViewView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "772b7184-e111-427c-8330-0d6c9f15dfbb";
    /** 应用名称 */
    static APPLICATION_NAME: string = "mu_initialfantasy_app_role_view";

    constructor() {
        super();
        this.id = RoleViewApp.APPLICATION_ID;
        this.name = RoleViewApp.APPLICATION_NAME;
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
    /** 编辑数据，参数：目标数据 */
    protected editData(): void {
        let app = new RoleEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run(this.viewData);
    }
    protected viewData: bo.Role;
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let data: bo.Role = arguments[0];
        if (ibas.object.isNull(data)) {
            throw new Error(ibas.i18n.prop("msg_invalid_parameter", "view data"));
        }
        this.viewData = data;
        super.run();
    }
}
/** 视图-角色 */
export interface IRoleViewView extends ibas.IBOViewView {

}
