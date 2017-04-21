/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { ApprovalRequestListApp } from "./ApprovalRequestListApp";

export class ApprovalRequestFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "1b0ab3c8-9400-431a-96fc-04eac3acf635";
    /** 功能名称 */
    static FUNCTION_NAME = "initialfantasy_func_approvalrequest";
    /** 根文件名称 */
    static ROOT_FILE_NAME: string = "initialfantasy/index";
    /** 构造函数 */
    constructor() {
        super();
        this.id = ApprovalRequestFunc.FUNCTION_ID;
        this.name = ApprovalRequestFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        let app: ApprovalRequestListApp = new ApprovalRequestListApp();
        app.navigation = this.navigation;
        return app;
    }
}
