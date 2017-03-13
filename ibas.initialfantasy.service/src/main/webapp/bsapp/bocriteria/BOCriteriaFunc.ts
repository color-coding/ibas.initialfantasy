/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "../../3rdparty/ibas/index";
import { BOCriteriaListApp } from "./BOCriteriaListApp";

export class BOCriteriaFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "ee4a9ba9-e113-4628-9d8f-a6e6137a4fbd";
    /** 功能名称 */
    static FUNCTION_NAME = "module_a_func_BOCriteria";
    /** 根文件名称 */
    static ROOT_FILE_NAME: string = "initialfantasy/index";

    constructor() {
        super();
        this.id = BOCriteriaFunc.FUNCTION_ID;
        this.name = BOCriteriaFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }

    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        // 获取根地址
        let rootUrl: string = ibas.url.rootUrl(BOCriteriaFunc.ROOT_FILE_NAME);
        // 加载语言-框架默认
        ibas.i18n.load(ibas.string.format("{0}/resources/languages/bo/BOCriteria.{1}.json", rootUrl, ibas.i18n.language));
        let app: BOCriteriaListApp = new BOCriteriaListApp();
        app.navigation = this.navigation;
        return app;
    }
}
