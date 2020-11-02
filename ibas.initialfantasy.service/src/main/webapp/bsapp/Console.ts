/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../borep/index.ts" />
/// <reference path="./applicationconfig/index.ts" />
/// <reference path="./applicationelement/index.ts" />
/// <reference path="./applicationmodule/index.ts" />
/// <reference path="./applicationplatform/index.ts" />
/// <reference path="./bocriteria/index.ts" />
/// <reference path="./bofiltering/index.ts" />
/// <reference path="./boinformation/index.ts" />
/// <reference path="./bonumbering/index.ts" />
/// <reference path="./organization/index.ts" />
/// <reference path="./privilege/index.ts" />
/// <reference path="./system/index.ts" />
/// <reference path="./user/index.ts" />
/// <reference path="./identity/index.ts" />
/// <reference path="./useridentity/index.ts" />
/// <reference path="./bopropertysetting/index.ts" />
namespace initialfantasy {
    export namespace app {
        /** 属性-导航 */
        const PROPERTY_NAVIGATION: symbol = Symbol("navigation");
        /** 模块控制台 */
        export class Console extends ibas.ModuleConsole {
            /** 构造函数 */
            constructor() {
                super();
                this.id = CONSOLE_ID;
                this.name = CONSOLE_NAME;
                this.version = CONSOLE_VERSION;
                this.copyright = ibas.i18n.prop("shell_license");
            }
            /** 创建视图导航 */
            navigation(): ibas.IViewNavigation {
                return this[PROPERTY_NAVIGATION];
            }
            /** 初始化 */
            protected registers(): void {
                // 注册功能
                this.register(new UserFunc());
                this.register(new OrganizationFunc());
                this.register(new BOCriteriaFunc());
                if (ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_SUPER) === true) {
                    // 仅调超级用户，启用以下功能
                    this.register(new PrivilegeFunc());
                    this.register(new BOFilteringFunc());
                    this.register(new BOPropertySettingFunc());
                    this.register(new ApplicationConfigFunc());
                    // this.register(new BOInformationFunc());
                }
                // 注册服务应用
                this.register(new ApplicationElementChooseServiceMapping());
                this.register(new ApplicationModuleChooseServiceMapping());
                this.register(new ApplicationPlatformChooseServiceMapping());
                this.register(new OrganizationChooseServiceMapping());
                this.register(new UserChooseServiceMapping());
                this.register(new ChangeUserProfileMapping());
                this.register(new BOInformationChooseServiceMapping());
                this.register(new BOPropertyChooseServiceMapping());
                this.register(new BOPropertyValueChooseServiceMapping());
                this.register(new VariableChooseServiceMapping());
                this.register(new ConfigChooseServiceMapping());
                this.register(new IdentityChooseServiceMapping());
                this.register(new CriteriaEditorServiceMapping());
                if (ibas.strings.equalsIgnoreCase(CONFIG_VALUE_ORGANIZATION_WAY, ibas.config.get(ibas.CONFIG_ITEM_ORGANIZATION_WAY))) {
                    // 组织为本模块实现
                    this.register(new RoleChooseServiceMapping());
                }
                this.register(new IdentityPrivilegeConfigServiceMapping());
                // 注册常驻应用
                this.register(new UserProfileApp());
            }
            /** 运行 */
            run(): void {
                // 加载语言-框架默认
                ibas.i18n.load([
                    this.rootUrl + "resources/languages/initialfantasy.json",
                    this.rootUrl + "resources/languages/bos.json"
                ], () => {
                    // 设置资源属性
                    this.description = ibas.i18n.prop(this.name.toLowerCase());
                    this.icon = ibas.i18n.prop(this.name.toLowerCase() + "_icon");
                    // 先加载ui导航
                    let uiModules: string[] = [];
                    if (!ibas.config.get(ibas.CONFIG_ITEM_DISABLE_PLATFORM_VIEW, false)) {
                        if (this.plantform === ibas.emPlantform.PHONE) {
                            // 使用m类型视图
                            uiModules.push("index.ui.m");
                        }
                    }
                    // 默认使用视图
                    if (uiModules.length === 0) {
                        // 使用c类型视图
                        uiModules.push("index.ui.c");
                    }
                    // 加载视图库
                    this.loadUI(uiModules, (ui) => {
                        // 设置导航
                        this[PROPERTY_NAVIGATION] = new ui.Navigation();
                        // 调用初始化
                        this.initialize();
                    });
                    // 保留基类方法
                    super.run();
                });
            }
        }
        /** 模块控制台 */
        export class ConsolePhone extends Console {
            /** 初始化 */
            protected registers(): void {
                // 注册服务应用
                this.register(new UserChooseServiceMapping());
                this.register(new IdentityChooseServiceMapping());
                this.register(new VariableChooseServiceMapping());
                this.register(new OrganizationChooseServiceMapping());
                this.register(new BOInformationChooseServiceMapping());
                this.register(new BOPropertyChooseServiceMapping());
                this.register(new BOPropertyValueChooseServiceMapping());
            }
        }
    }
}