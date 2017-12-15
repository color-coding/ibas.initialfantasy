/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { BO_CODE_ROLE } from "../../borep/bo/index";
import { BORepositoryInitialFantasy } from "../../borep/BORepositories";
import { OrganizationChooseApp } from "../organization/OrganizationChooseApp";

/** 角色选择服务（用组织实现） */
export class RoleChooseApp extends OrganizationChooseApp {
    /** 应用标识 */
    static APPLICATION_ID: string = "dc2c91f3-b732-407e-a163-9a1a205d2366";
    /** 应用名称 */
    static APPLICATION_NAME: string = "initialfantasy_app_role_choose";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = BO_CODE_ROLE;

    /** 构造函数 */
    constructor() {
        super();
        this.id = OrganizationChooseApp.APPLICATION_ID;// 使用组织
        this.name = RoleChooseApp.APPLICATION_NAME;
        this.boCode = RoleChooseApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
}
/** 角色选择服务映射 */
export class RoleChooseServiceMapping extends ibas.BOChooseServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = RoleChooseApp.APPLICATION_ID;
        this.name = RoleChooseApp.APPLICATION_NAME;
        this.boCode = RoleChooseApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IServiceCaller> {
        return new RoleChooseApp();
    }
}
