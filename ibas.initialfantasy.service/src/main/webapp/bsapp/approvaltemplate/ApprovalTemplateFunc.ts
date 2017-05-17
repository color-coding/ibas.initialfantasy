/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { ApprovalTemplateListApp } from "./ApprovalTemplateListApp";

export class ApprovalTemplateFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "dbd40285-9352-4301-ab84-07712a4f5b51";
    /** 功能名称 */
    static FUNCTION_NAME = "initialfantasy_func_approvaltemplate";
    /** 构造函数 */
    constructor() {
        super();
        this.id = ApprovalTemplateFunc.FUNCTION_ID;
        this.name = ApprovalTemplateFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        let app: ApprovalTemplateListApp = new ApprovalTemplateListApp();
        app.navigation = this.navigation;
        return app;
    }
}
