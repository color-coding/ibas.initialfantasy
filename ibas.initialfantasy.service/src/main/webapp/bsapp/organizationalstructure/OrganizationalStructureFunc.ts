/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { OrganizationalStructureListApp } from "./OrganizationalStructureListApp";

export class OrganizationalStructureFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "56eb204c-be84-4811-9680-d6ac81711f9b";
    /** 功能名称 */
    static FUNCTION_NAME = "initialfantasy_func_organizationalstructure";
    /** 根文件名称 */
    static ROOT_FILE_NAME: string = "initialfantasy/index";
    /** 构造函数 */
    constructor() {
        super();
        this.id = OrganizationalStructureFunc.FUNCTION_ID;
        this.name = OrganizationalStructureFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        let app: OrganizationalStructureListApp = new OrganizationalStructureListApp();
        app.navigation = this.navigation;
        return app;
    }
}
