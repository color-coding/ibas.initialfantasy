/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { ApplicationModuleListApp } from "./ApplicationModuleListApp";

export class ApplicationModuleFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "491fab8c-ff09-4822-99a3-a23dbb9f5c17";
    /** 功能名称 */
    static FUNCTION_NAME = "initialfantasy_func_applicationmodule";
    /** 构造函数 */
    constructor() {
        super();
        this.id = ApplicationModuleFunc.FUNCTION_ID;
        this.name = ApplicationModuleFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        let app: ApplicationModuleListApp = new ApplicationModuleListApp();
        app.navigation = this.navigation;
        return app;
    }
}
