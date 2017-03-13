/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "../../3rdparty/ibas/index";
import { OrganizationalStructureListApp } from "./OrganizationalStructureListApp";

export class OrganizationalStructureFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "81b8d929-9cf1-4118-9c78-eada0921db67";
    /** 功能名称 */
    static FUNCTION_NAME = "module_a_func_OrganizationalStructure";
    /** 根文件名称 */
    static ROOT_FILE_NAME: string = "initialfantasy/index";

    constructor() {
        super();
        this.id = OrganizationalStructureFunc.FUNCTION_ID;
        this.name = OrganizationalStructureFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }

    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        // 获取根地址
        let rootUrl: string = ibas.url.rootUrl(OrganizationalStructureFunc.ROOT_FILE_NAME);
        // 加载语言-框架默认
        ibas.i18n.load(ibas.string.format("{0}/resources/languages/bo/OrganizationalStructure.{1}.json", rootUrl, ibas.i18n.language));
        let app: OrganizationalStructureListApp = new OrganizationalStructureListApp();
        app.navigation = this.navigation;
        return app;
    }
}
