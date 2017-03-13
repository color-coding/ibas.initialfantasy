/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "../../3rdparty/ibas/index";
import { UserListApp } from "./UserListApp";

export class UserFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "30c7d0ca-1018-4540-b04c-29dc4984cd73";
    /** 功能名称 */
    static FUNCTION_NAME = "module_a_func_User";
    /** 根文件名称 */
    static ROOT_FILE_NAME: string = "initialfantasy/index";

    constructor() {
        super();
        this.id = UserFunc.FUNCTION_ID;
        this.name = UserFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }

    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        // 获取根地址
        let rootUrl: string = ibas.url.rootUrl(UserFunc.ROOT_FILE_NAME);
        // 加载语言-框架默认
        ibas.i18n.load(ibas.string.format("{0}/resources/languages/bo/User.{1}.json", rootUrl, ibas.i18n.language));
        let app: UserListApp = new UserListApp();
        app.navigation = this.navigation;
        return app;
    }
}
