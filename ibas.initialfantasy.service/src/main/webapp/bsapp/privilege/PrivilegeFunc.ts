/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { PrivilegeListApp } from "./PrivilegeListApp";

export class PrivilegeFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "44cd9600-bee0-4a95-8b01-361482914879";
    /** 功能名称 */
    static FUNCTION_NAME = "initialfantasy_func_privilege";
    /** 构造函数 */
    constructor() {
        super();
        this.id = PrivilegeFunc.FUNCTION_ID;
        this.name = PrivilegeFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        let app: PrivilegeListApp = new PrivilegeListApp();
        app.navigation = this.navigation;
        return app;
    }
}
