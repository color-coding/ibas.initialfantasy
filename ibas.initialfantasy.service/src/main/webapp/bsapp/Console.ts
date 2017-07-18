/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { ApplicationFunctionFunc, ApplicationFunctionChooseServiceMapping } from "./applicationfunction/index";
import { ApplicationModuleFunc, ApplicationModuleChooseServiceMapping, } from "./applicationmodule/index";
import { ApplicationPlatformFunc, ApplicationPlatformChooseServiceMapping } from "./applicationplatform/index";
import { ApprovalRequestFunc, ApprovalRequestLinkServiceMapping } from "./approvalrequest/index";
import { ApprovalTemplateFunc, ApprovalTemplateLinkServiceMapping } from "./approvaltemplate/index";
import { BOCriteriaFunc, } from "./bocriteria/index";
import { BOFilteringFunc, } from "./bofiltering/index";
import { OrganizationFunc, OrganizationChooseServiceMapping, OrganizationLinkServiceMapping } from "./organization/index";
import { OrganizationalStructureFunc, OrganizationalStructureChooseServiceMapping } from "./organizationalstructure/index";
import { OwnershipFunc, } from "./ownership/index";
import { PrivilegeFunc, } from "./privilege/index";
import { BOInformationFunc, BOInformationChooseServiceMapping } from "./boinformation/index";
import { RoleFunc, RoleChooseServiceMapping, RoleLinkServiceMapping } from "./role/index";
import { UserFunc, UserChooseServiceMapping, UserLinkServiceMapping, UserProfileApp } from "./user/index";
import { VariableChooseServiceMapping } from "./system/index";

/** 模块控制台 */
export class Console extends ibas.ModuleConsole {
    /** 模块-标识 */
    static CONSOLE_ID: string = "c2b31c06-20d8-44a2-bb34-17f47ed01859";
    /** 模块-名称 */
    static CONSOLE_NAME: string = "InitialFantasy";
    /** 构造函数 */
    constructor() {
        super();
        this.id = Console.CONSOLE_ID;
        this.name = Console.CONSOLE_NAME;
    }
    private _navigation: ibas.IViewNavigation;
    /** 创建视图导航 */
    navigation(): ibas.IViewNavigation {
        return this._navigation;
    }
    /** 初始化 */
    protected registers(): void {
        // 注册功能
        this.register(new UserFunc());
        this.register(new RoleFunc());
        this.register(new OrganizationFunc());
        this.register(new OrganizationalStructureFunc());
        this.register(new BOCriteriaFunc());
        this.register(new PrivilegeFunc());
        if (ibas.config.get(ibas.CONFIG_ITEM_DEBUG_MODE, false)) {
            // 仅调试模式，启用以下功能
            this.register(new BOFilteringFunc());
            this.register(new OwnershipFunc());
            this.register(new ApplicationPlatformFunc());
            this.register(new ApplicationModuleFunc());
            this.register(new ApplicationFunctionFunc());
            this.register(new BOInformationFunc());
            this.register(new ApprovalTemplateFunc());
            this.register(new ApprovalRequestFunc());
        }
        // 注册服务应用
        this.register(new ApplicationFunctionChooseServiceMapping());
        this.register(new ApplicationModuleChooseServiceMapping());
        this.register(new ApplicationPlatformChooseServiceMapping());
        this.register(new ApprovalTemplateLinkServiceMapping());
        this.register(new OrganizationChooseServiceMapping());
        this.register(new OrganizationLinkServiceMapping());
        this.register(new RoleChooseServiceMapping());
        this.register(new RoleLinkServiceMapping());
        this.register(new UserChooseServiceMapping());
        this.register(new UserLinkServiceMapping());
        this.register(new BOInformationChooseServiceMapping());
        this.register(new OrganizationalStructureChooseServiceMapping());
        this.register(new VariableChooseServiceMapping());
        // 注册常驻应用
        this.register(new UserProfileApp());
    }
    /** 运行 */
    run(): void {
        // 加载语言-框架默认
        ibas.i18n.load(this.rootUrl + "resources/languages/initialfantasy.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/applicationfunction.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/applicationmodule.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/applicationplatform.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/approvalrequest.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/approvaltemplate.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/bocriteria.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/bofiltering.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/organization.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/organizationalstructure.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/ownership.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/privilege.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/role.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/user.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/boinformation.json");
        ibas.i18n.load(this.rootUrl + "resources/languages/bo/variable.json");
        // 设置资源属性
        this.description = ibas.i18n.prop(this.name.toLowerCase());
        this.icon = ibas.i18n.prop(this.name.toLowerCase() + "_icon");
        // 先加载ui导航
        let uiModules: string[] = [];
        if (!ibas.config.get(ibas.CONFIG_ITEM_DISABLE_PLATFORM_VIEW, false)
            && this.plantform === ibas.emPlantform.PHONE) {
            // 使用m类型视图
            uiModules.push("../bsui/m/Navigation");
        } else {
            // 使用c类型视图
            uiModules.push("../bsui/c/Navigation");
        }
        let that: Console = this;
        require(uiModules, function (ui: any): void {
            // 设置导航
            that._navigation = new ui.default();
            // 调用初始化
            that.initialize();
        });
        // 保留基类方法
        super.run();
    }
}
