/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { ApplicationFunctionFunc, ApplicationFunctionChooseServiceMapping, ApplicationFunctionLinkServiceMapping } from "./applicationfunction/index";
import { ApplicationModuleFunc, ApplicationModuleChooseServiceMapping, ApplicationModuleLinkServiceMapping } from "./applicationmodule/index";
import { ApplicationPlatformFunc, ApplicationPlatformChooseServiceMapping, ApplicationPlatformLinkServiceMapping } from "./applicationplatform/index";
import { ApprovalRequestFunc, ApprovalRequestChooseServiceMapping, ApprovalRequestLinkServiceMapping } from "./approvalrequest/index";
import { ApprovalTemplateFunc, ApprovalTemplateChooseServiceMapping, ApprovalTemplateLinkServiceMapping } from "./approvaltemplate/index";
import { BOCriteriaFunc, BOCriteriaChooseServiceMapping, BOCriteriaLinkServiceMapping } from "./bocriteria/index";
import { BOFilteringFunc, BOFilteringChooseServiceMapping, BOFilteringLinkServiceMapping } from "./bofiltering/index";
import { OrganizationFunc, OrganizationChooseServiceMapping, OrganizationLinkServiceMapping } from "./organization/index";
import { OrganizationalStructureFunc, OrganizationalStructureChooseServiceMapping, OrganizationalStructureLinkServiceMapping } from "./organizationalstructure/index";
import { OwnershipFunc, OwnershipChooseServiceMapping, OwnershipLinkServiceMapping } from "./ownership/index";
import { PrivilegeFunc, PrivilegeChooseServiceMapping, PrivilegeLinkServiceMapping } from "./privilege/index";
import { RoleFunc, RoleChooseServiceMapping, RoleLinkServiceMapping } from "./role/index";
import { UserFunc, UserChooseServiceMapping, UserLinkServiceMapping } from "./user/index";

/** 模块控制台 */
export class Console extends ibas.ModuleConsole {
    /** 模块-标识 */
    static CONSOLE_ID: string = "c2b31c06-20d8-44a2-bb34-17f47ed01859";
    /** 模块-名称 */
    static CONSOLE_NAME: string = "InitialFantasy";
    /** 根文件名称 */
    static ROOT_FILE_NAME: string = "initialfantasy/index";
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
        this.register(new ApplicationFunctionFunc());
        this.register(new ApplicationModuleFunc());
        this.register(new ApplicationPlatformFunc());
        this.register(new ApprovalRequestFunc());
        this.register(new ApprovalTemplateFunc());
        this.register(new BOCriteriaFunc());
        this.register(new BOFilteringFunc());
        this.register(new OrganizationFunc());
        this.register(new OrganizationalStructureFunc());
        this.register(new OwnershipFunc());
        this.register(new PrivilegeFunc());
        this.register(new RoleFunc());
        this.register(new UserFunc());
        // 注册服务应用
        this.register(new ApplicationFunctionChooseServiceMapping());
        this.register(new ApplicationFunctionLinkServiceMapping());
        this.register(new ApplicationModuleChooseServiceMapping());
        this.register(new ApplicationModuleLinkServiceMapping());
        this.register(new ApplicationPlatformChooseServiceMapping());
        this.register(new ApplicationPlatformLinkServiceMapping());
        this.register(new ApprovalRequestChooseServiceMapping());
        this.register(new ApprovalRequestLinkServiceMapping());
        this.register(new ApprovalTemplateChooseServiceMapping());
        this.register(new ApprovalTemplateLinkServiceMapping());
        this.register(new BOCriteriaChooseServiceMapping());
        this.register(new BOCriteriaLinkServiceMapping());
        this.register(new BOFilteringChooseServiceMapping());
        this.register(new BOFilteringLinkServiceMapping());
        this.register(new OrganizationChooseServiceMapping());
        this.register(new OrganizationLinkServiceMapping());
        this.register(new OrganizationalStructureChooseServiceMapping());
        this.register(new OrganizationalStructureLinkServiceMapping());
        this.register(new OwnershipChooseServiceMapping());
        this.register(new OwnershipLinkServiceMapping());
        this.register(new PrivilegeChooseServiceMapping());
        this.register(new PrivilegeLinkServiceMapping());
        this.register(new RoleChooseServiceMapping());
        this.register(new RoleLinkServiceMapping());
        this.register(new UserChooseServiceMapping());
        this.register(new UserLinkServiceMapping());
        // 注册常驻应用

    }
    /** 运行 */
    run(): void {
        // 获取根地址
        let rootUrl: string = ibas.url.rootUrl(Console.ROOT_FILE_NAME);
        // 加载语言-框架默认
        ibas.i18n.load(ibas.strings.format("{0}/resources/languages/initialfantasy.json", rootUrl));
        ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/applicationfunction.json", rootUrl));
        ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/applicationmodule.json", rootUrl));
        ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/applicationplatform.json", rootUrl));
        ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/approvalrequest.json", rootUrl));
        ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/approvaltemplate.json", rootUrl));
        ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/bocriteria.json", rootUrl));
        ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/bofiltering.json", rootUrl));
        ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/organization.json", rootUrl));
        ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/organizationalstructure.json", rootUrl));
        ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/ownership.json", rootUrl));
        ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/privilege.json", rootUrl));
        ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/role.json", rootUrl));
        ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/user.json", rootUrl));
        // 设置资源属性
        this.description = ibas.i18n.prop(this.name.toLowerCase());
        this.icon = ibas.i18n.prop(this.name.toLowerCase() + "_icon");
        // 先加载ui导航
        let uiModules: string[] = [];
        if (!ibas.config.get(ibas.ModuleConsole.CONFIG_ITEM_DISABLE_PLATFORM_VIEW, false)
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
