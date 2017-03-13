/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "../../3rdparty/ibas/index";
import { ApplicationModuleListApp } from "./ApplicationModuleListApp";

export class ApplicationModuleFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "db04f7bf-3c75-4f7e-a310-e3f47d7d9e4a";
    /** 功能名称 */
    static FUNCTION_NAME = "module_a_func_ApplicationModule";
    /** 根文件名称 */
    static ROOT_FILE_NAME: string = "initialfantasy/index";

    constructor() {
        super();
        this.id = ApplicationModuleFunc.FUNCTION_ID;
        this.name = ApplicationModuleFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }

    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        // 获取根地址
        let rootUrl: string = ibas.url.rootUrl(ApplicationModuleFunc.ROOT_FILE_NAME);
        // 加载语言-框架默认
        ibas.i18n.load(ibas.string.format("{0}/resources/languages/bo/ApplicationModule.{1}.json", rootUrl, ibas.i18n.language));
        let app: ApplicationModuleListApp = new ApplicationModuleListApp();
        app.navigation = this.navigation;
        return app;
    }
}
