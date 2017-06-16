/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { OrganizationalStructureListApp } from "./OrganizationalStructureListApp";
import { OrganizationalStructureWizardApp } from "./OrganizationalStructureWizardApp";

export class OrganizationalStructureFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "f129599b-26f4-473f-aa51-b9180aec7ddc";
    /** 功能名称 */
    static FUNCTION_NAME = "initialfantasy_func_organizationalstructure";
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
/** 组织结构向导 */
export class OrganizationalStructureWizardFunc extends ibas.ModuleFunction {

    /** 功能标识 */
    static FUNCTION_ID = "f129599b-26f4-473f-aa51-b9180aec7ddd";
    /** 功能名称 */
    static FUNCTION_NAME = "initialfantasy_org_wizard";
    /** 构造函数 */
    constructor() {
        super();
        this.id = OrganizationalStructureWizardFunc.FUNCTION_ID;
        this.name = OrganizationalStructureWizardFunc.FUNCTION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 默认功能 */
    default(): ibas.IApplication<ibas.IView> {
        let app: OrganizationalStructureWizardApp = new OrganizationalStructureWizardApp();
        app.navigation = this.navigation;
        return app;
    }
}
