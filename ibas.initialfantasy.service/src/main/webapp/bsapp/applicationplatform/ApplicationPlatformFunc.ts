/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { ApplicationPlatformListApp } from "./ApplicationPlatformListApp";

export class ApplicationPlatformFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "9f310278-cceb-4de9-9af3-f04824548758";
    /** 功能名称 */
    static FUNCTION_NAME = "initialfantasy_func_applicationplatform";
    /** 根文件名称 */
    static ROOT_FILE_NAME: string = "initialfantasy/index";
    /** 构造函数 */
    constructor() {
        super();
        this.id = ApplicationPlatformFunc.FUNCTION_ID;
        this.name = ApplicationPlatformFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        let app: ApplicationPlatformListApp = new ApplicationPlatformListApp();
        app.navigation = this.navigation;
        return app;
    }
}
