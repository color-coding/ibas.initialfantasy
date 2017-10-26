/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { BORepositoryInitialFantasy } from "../../borep/BORepositories";
import { OrganizationChooseApp } from "../organization/OrganizationChooseApp";

/** 角色选择服务映射 */
export class RoleChooseServiceMapping extends ibas.BOChooseServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = "dc2c91f3-b732-407e-a163-9a1a205d2366";
        this.name = "initialfantasy_app_role_choose";
        this.boCode = bo.BO_CODE_ROLE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IServiceContract> {
        return new OrganizationChooseApp();
    }
}
