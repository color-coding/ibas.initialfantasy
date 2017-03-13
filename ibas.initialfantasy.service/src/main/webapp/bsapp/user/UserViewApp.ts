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
import { UserEditApp } from "./UserEditApp";

/** 查看应用-用户 */
export class UserViewApp extends ibas.BOViewApplication<IUserViewView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "48cd975b-268c-494a-baed-f072db0ba4f3";
    /** 应用名称 */
    static APPLICATION_NAME: string = "mu_initialfantasy_app_user_view";

    constructor() {
        super();
        this.id = UserViewApp.APPLICATION_ID;
        this.name = UserViewApp.APPLICATION_NAME;
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
        let app = new UserEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run(this.viewData);
    }
    protected viewData: bo.User;
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let data: bo.User = arguments[0];
        if (ibas.object.isNull(data)) {
            throw new Error(ibas.i18n.prop("msg_invalid_parameter", "view data"));
        }
        this.viewData = data;
        super.run();
    }
}
/** 视图-用户 */
export interface IUserViewView extends ibas.IBOViewView {

}
