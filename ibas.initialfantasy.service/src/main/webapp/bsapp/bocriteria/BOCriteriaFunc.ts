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
    static FUNCTION_ID = "61799edf-c52d-43bf-80ee-6d550223c7a9";
    /** 功能名称 */
    static FUNCTION_NAME = "initialfantasy_func_bocriteria";
    /** 根文件名称 */
    static ROOT_FILE_NAME: string = "initialfantasy/index";
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
