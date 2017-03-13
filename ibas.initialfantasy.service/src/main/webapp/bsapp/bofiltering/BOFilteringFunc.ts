/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "../../3rdparty/ibas/index";
import { BOFilteringListApp } from "./BOFilteringListApp";

export class BOFilteringFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "d66ed17a-825c-4a6e-9306-0629626b6bac";
    /** 功能名称 */
    static FUNCTION_NAME = "module_a_func_BOFiltering";
    /** 根文件名称 */
    static ROOT_FILE_NAME: string = "initialfantasy/index";

    constructor() {
        super();
        this.id = BOFilteringFunc.FUNCTION_ID;
        this.name = BOFilteringFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }

    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        // 获取根地址
        let rootUrl: string = ibas.url.rootUrl(BOFilteringFunc.ROOT_FILE_NAME);
        // 加载语言-框架默认
        ibas.i18n.load(ibas.string.format("{0}/resources/languages/bo/BOFiltering.{1}.json", rootUrl, ibas.i18n.language));
        let app: BOFilteringListApp = new BOFilteringListApp();
        app.navigation = this.navigation;
        return app;
    }
}
