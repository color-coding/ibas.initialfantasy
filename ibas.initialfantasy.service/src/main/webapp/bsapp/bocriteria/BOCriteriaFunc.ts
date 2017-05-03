/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { BOCriteriaListApp } from "./BOCriteriaListApp";

export class BOCriteriaFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "1210c91d-74dd-4263-9765-9928f64ea427";
    /** 功能名称 */
    static FUNCTION_NAME = "initialfantasy_func_bocriteria";
    /** 构造函数 */
    constructor() {
        super();
        this.id = BOCriteriaFunc.FUNCTION_ID;
        this.name = BOCriteriaFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        let app: BOCriteriaListApp = new BOCriteriaListApp();
        app.navigation = this.navigation;
        return app;
    }
}
