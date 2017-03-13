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

/** 查看应用-系统权限 */
export class PrivilegeViewApp extends ibas.BOViewApplication<IPrivilegeViewView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "779659ce-c1c8-4882-a37e-c000ab44fc83";
    /** 应用名称 */
    static APPLICATION_NAME: string = "mu_initialfantasy_app_privilege_view";

    constructor() {
        super();
        this.id = PrivilegeViewApp.APPLICATION_ID;
        this.name = PrivilegeViewApp.APPLICATION_NAME;
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
        let app = new PrivilegeEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run(this.viewData);
    }
    protected viewData: bo.Privilege;
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let data: bo.Privilege = arguments[0];
        if (ibas.object.isNull(data)) {
            throw new Error(ibas.i18n.prop("msg_invalid_parameter", "view data"));
        }
        this.viewData = data;
        super.run();
    }
}
/** 视图-系统权限 */
export interface IPrivilegeViewView extends ibas.IBOViewView {

}
