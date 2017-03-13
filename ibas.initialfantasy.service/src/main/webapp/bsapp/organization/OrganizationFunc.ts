/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "../../3rdparty/ibas/index";
import { OrganizationListApp } from "./OrganizationListApp";

export class OrganizationFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "423dba01-39a8-4ee4-88c3-2c859b07d417";
    /** 功能名称 */
    static FUNCTION_NAME = "module_a_func_Organization";
    /** 根文件名称 */
    static ROOT_FILE_NAME: string = "initialfantasy/index";

    constructor() {
        super();
        this.id = OrganizationFunc.FUNCTION_ID;
        this.name = OrganizationFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }

    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        // 获取根地址
        let rootUrl: string = ibas.url.rootUrl(OrganizationFunc.ROOT_FILE_NAME);
        // 加载语言-框架默认
        ibas.i18n.load(ibas.string.format("{0}/resources/languages/bo/Organization.{1}.json", rootUrl, ibas.i18n.language));
        let app: OrganizationListApp = new OrganizationListApp();
        app.navigation = this.navigation;
        return app;
    }
}
