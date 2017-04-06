/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { RoleListApp } from "./RoleListApp";

export class RoleFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "620457a3-bdd4-4653-acba-bced690645d8";
    /** 功能名称 */
    static FUNCTION_NAME = "initialfantasy_func_role";
    /** 根文件名称 */
    static ROOT_FILE_NAME: string = "initialfantasy/index";
    /** 构造函数 */
    constructor() {
        super();
        this.id = RoleFunc.FUNCTION_ID;
        this.name = RoleFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        let app: RoleListApp = new RoleListApp();
        app.navigation = this.navigation;
        return app;
    }
}
