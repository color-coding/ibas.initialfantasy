/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { UserListApp } from "./UserListApp";

export class UserFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "8cce9f36-62af-43c4-89e9-a63be72fd1ae";
    /** 功能名称 */
    static FUNCTION_NAME = "initialfantasy_func_user";
    /** 构造函数 */
    constructor() {
        super();
        this.id = UserFunc.FUNCTION_ID;
        this.name = UserFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        let app: UserListApp = new UserListApp();
        app.navigation = this.navigation;
        return app;
    }
}
