/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { ApplicationFunctionListApp } from "./ApplicationFunctionListApp";

export class ApplicationFunctionFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "7ea7405f-ba2a-4c3e-aa9c-9805f946bbe8";
    /** 功能名称 */
    static FUNCTION_NAME = "initialfantasy_func_applicationfunction";
    /** 根文件名称 */
    static ROOT_FILE_NAME: string = "initialfantasy/index";
    /** 构造函数 */
    constructor() {
        super();
        this.id = ApplicationFunctionFunc.FUNCTION_ID;
        this.name = ApplicationFunctionFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        let app: ApplicationFunctionListApp = new ApplicationFunctionListApp();
        app.navigation = this.navigation;
        return app;
    }
}
