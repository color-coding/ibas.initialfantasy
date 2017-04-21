/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { OwnershipListApp } from "./OwnershipListApp";

export class OwnershipFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "4887a315-17f9-4175-8c4b-d7b7db461c6f";
    /** 功能名称 */
    static FUNCTION_NAME = "initialfantasy_func_ownership";
    /** 根文件名称 */
    static ROOT_FILE_NAME: string = "initialfantasy/index";
    /** 构造函数 */
    constructor() {
        super();
        this.id = OwnershipFunc.FUNCTION_ID;
        this.name = OwnershipFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        let app: OwnershipListApp = new OwnershipListApp();
        app.navigation = this.navigation;
        return app;
    }
}
