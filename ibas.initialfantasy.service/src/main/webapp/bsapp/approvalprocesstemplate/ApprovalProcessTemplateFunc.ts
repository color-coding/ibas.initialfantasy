/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "../../3rdparty/ibas/index";
import { ApprovalTemplateListApp } from "./ApprovalTemplateListApp";

export class ApprovalTemplateFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "d019df90-aaed-4d8f-8d98-b966e62d8b9e";
    /** 功能名称 */
    static FUNCTION_NAME = "module_a_func_ApprovalTemplate";
    /** 根文件名称 */
    static ROOT_FILE_NAME: string = "initialfantasy/index";

    constructor() {
        super();
        this.id = ApprovalTemplateFunc.FUNCTION_ID;
        this.name = ApprovalTemplateFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }

    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        // 获取根地址
        let rootUrl: string = ibas.url.rootUrl(ApprovalTemplateFunc.ROOT_FILE_NAME);
        // 加载语言-框架默认
        ibas.i18n.load(ibas.string.format("{0}/resources/languages/bo/ApprovalTemplate.{1}.json", rootUrl, ibas.i18n.language));
        let app: ApprovalTemplateListApp = new ApprovalTemplateListApp();
        app.navigation = this.navigation;
        return app;
    }
}
