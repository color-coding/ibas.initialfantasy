/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { BOFilteringListApp } from "./BOFilteringListApp";

export class BOFilteringFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "39642c83-5b01-4565-aff9-1ba23530fa76";
    /** 功能名称 */
    static FUNCTION_NAME = "initialfantasy_func_bofiltering";
    /** 根文件名称 */
    static ROOT_FILE_NAME: string = "initialfantasy/index";
    /** 构造函数 */
    constructor() {
        super();
        this.id = BOFilteringFunc.FUNCTION_ID;
        this.name = BOFilteringFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        let app: BOFilteringListApp = new BOFilteringListApp();
        app.navigation = this.navigation;
        return app;
    }
}
