/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

/// <reference path="../3rdparty/ibas/3rdparty/index.d.ts" />
import * as ibas from "../3rdparty/ibas/index";
import { ApplicationFunctionFunc } from './applicationfunction/index';
import { ApplicationModuleFunc } from './applicationmodule/index';
import { ApplicationPlatformFunc } from './applicationplatform/index';
import { ApprovalTemplateFunc } from './ApprovalTemplate/index';
import { ApprovalRequestFunc } from './approvalrequest/index';
import { BOCriteriaFunc } from './bocriteria/index';
import { BOFilteringFunc } from './bofiltering/index';
import { OrganizationFunc } from './organization/index';
import { OrganizationalStructureFunc } from './organizationalstructure/index';
import { OwnershipFunc } from './ownership/index';
import { PrivilegeFunc } from './privilege/index';
import { RoleFunc } from './role/index';
import { UserFunc } from './user/index';

/** 模块控制台 */
export class Console extends ibas.ModuleConsole {
    /** 模块-标识 */
    static CONSOLE_ID: string = "${ProjectId}";
    /** 模块-名称 */
    static CONSOLE_NAME: string = "InitialFantasy";
    /** 根文件名称 */
    static ROOT_FILE_NAME: string = "initialfantasy/index";

    constructor() {
        super();
        this.id = Console.CONSOLE_ID;
        this.name = Console.CONSOLE_NAME;
    }

    private _navigation: any;
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
        this.register(new ApprovalTemplateFunc());
        this.register(new ApprovalRequestFunc());
        this.register(new BOCriteriaFunc());
        this.register(new BOFilteringFunc());
        this.register(new OrganizationFunc());
        this.register(new OrganizationalStructureFunc());
        this.register(new OwnershipFunc());
        this.register(new PrivilegeFunc());
        this.register(new RoleFunc());
        this.register(new UserFunc());
        // 注册常驻应用

    }
    /** 运行 */
    run(): void {
        // 获取根地址
        let rootUrl: string = ibas.url.rootUrl(Console.ROOT_FILE_NAME);
        // 加载语言-框架默认
        ibas.i18n.load(ibas.string.format("{0}/resources/languages/initialfantasy.{1}.json", rootUrl, ibas.i18n.language));
        // 设置资源属性
        this.description = ibas.i18n.prop(this.name);
        // this.icon = "";
        // 先加载ui导航
        let uiModules: string[] = [];
        if (!ibas.config.get(ibas.config.CONFIG_ITEM_DISABLE_PLATFORM_VIEW, false)
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
            that._navigation = new ui.Navigation();
            // 调用初始化
            that.initialize();
        });
        // 保留基类方法
        super.run();
    }
}

 
