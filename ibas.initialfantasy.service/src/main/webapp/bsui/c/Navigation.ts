/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../index.d.ts" />
/// <reference path="../Component.d.ts" />
/// <reference path="../Component.ts" />
/// <reference path="./applicationconfig/index.ts" />
/// <reference path="./applicationelement/index.ts" />
/// <reference path="./applicationmodule/index.ts" />
/// <reference path="./applicationplatform/index.ts" />
/// <reference path="./bocriteria/index.ts" />
/// <reference path="./bofiltering/index.ts" />
/// <reference path="./organization/index.ts" />
/// <reference path="./privilege/index.ts" />
/// <reference path="./user/index.ts" />
/// <reference path="./boinformation/index.ts" />
/// <reference path="./system/index.ts" />
/// <reference path="./bonumbering/index.ts" />
/// <reference path="./identity/index.ts" />
/// <reference path="./useridentity/index.ts" />
/// <reference path="./bopropertysetting/index.ts" />
/// <reference path="./bologst/index.ts" />
namespace initialfantasy {
    export namespace ui {
        /**
         * 视图导航
         */
        export class Navigation extends ibas.ViewNavigation {
            /**
             * 创建实例
             * @param id 应用id
             */
            protected newView(id: string): ibas.IView {
                let view: ibas.IView = null;
                switch (id) {
                    case app.ApplicationConfigListApp.APPLICATION_ID:
                        view = new c.ApplicationConfigListView();
                        break;
                    case app.ApplicationConfigEditApp.APPLICATION_ID:
                        view = new c.ApplicationConfigEditView();
                        break;
                    case app.ApplicationElementListApp.APPLICATION_ID:
                        view = new c.ApplicationElementListView();
                        break;
                    case app.ApplicationElementChooseApp.APPLICATION_ID:
                        view = new c.ApplicationElementChooseView();
                        break;
                    case app.ApplicationModuleListApp.APPLICATION_ID:
                        view = new c.ApplicationModuleListView();
                        break;
                    case app.ApplicationModuleChooseApp.APPLICATION_ID:
                        view = new c.ApplicationModuleChooseView();
                        break;
                    case app.ApplicationModuleEditApp.APPLICATION_ID:
                        view = new c.ApplicationModuleEditView();
                        break;
                    case app.ApplicationPlatformListApp.APPLICATION_ID:
                        view = new c.ApplicationPlatformListView();
                        break;
                    case app.ApplicationPlatformChooseApp.APPLICATION_ID:
                        view = new c.ApplicationPlatformChooseView();
                        break;
                    case app.ApplicationPlatformEditApp.APPLICATION_ID:
                        view = new c.ApplicationPlatformEditView();
                        break;
                    case app.BOCriteriaListApp.APPLICATION_ID:
                        view = new c.BOCriteriaListView();
                        break;
                    case app.BOCriteriaChooseApp.APPLICATION_ID:
                        view = new c.BOCriteriaChooseView();
                        break;
                    case app.BOCriteriaEditApp.APPLICATION_ID:
                        view = new c.BOCriteriaEditView();
                        break;
                    case app.BOFilteringListApp.APPLICATION_ID:
                        view = new c.BOFilteringListView();
                        break;
                    case app.BOFilteringChooseApp.APPLICATION_ID:
                        view = new c.BOFilteringChooseView();
                        break;
                    case app.BOFilteringEditApp.APPLICATION_ID:
                        view = new c.BOFilteringEditView();
                        break;
                    case app.OrganizationListApp.APPLICATION_ID:
                        view = new c.OrganizationListView();
                        break;
                    case app.OrganizationChooseApp.APPLICATION_ID:
                        view = new c.OrganizationChooseView();
                        break;
                    case app.OrganizationEditApp.APPLICATION_ID:
                        view = new c.OrganizationEditView();
                        break;
                    case app.OrganizationViewApp.APPLICATION_ID:
                        view = new c.OrganizationViewView();
                        break;
                    case app.PrivilegeListApp.APPLICATION_ID:
                        view = new c.PrivilegeListView();
                        break;
                    case app.PrivilegeChooseApp.APPLICATION_ID:
                        view = new c.PrivilegeChooseView();
                        break;
                    case app.PrivilegeEditApp.APPLICATION_ID:
                        view = new c.PrivilegeEditView();
                        break;
                    case app.PrivilegeConfigApp.APPLICATION_ID:
                        view = new c.PrivilegeConfigView();
                        break;
                    case app.IdentityPrivilegeConfigApp.APPLICATION_ID:
                        view = new c.IdentityPrivilegeConfigView();
                        break;
                    case app.UserListApp.APPLICATION_ID:
                        view = new c.UserListView();
                        break;
                    case app.UserChooseApp.APPLICATION_ID:
                        view = new c.UserChooseView();
                        break;
                    case app.UserEditApp.APPLICATION_ID:
                        view = new c.UserEditView();
                        break;
                    case app.UserProfileApp.APPLICATION_ID:
                        view = new c.UserProfileView();
                        break;
                    case app.UserViewApp.APPLICATION_ID:
                        view = new c.UserViewView();
                        break;
                    case app.ChangeUserProfileApp.APPLICATION_ID:
                        view = new c.ChangeUserProfileView();
                        break;
                    case app.BOInformationListApp.APPLICATION_ID:
                        view = new c.BOInformationListView();
                        break;
                    case app.BOInformationChooseApp.APPLICATION_ID:
                        view = new c.BOInformationChooseView();
                        break;
                    case app.BOInformationEditApp.APPLICATION_ID:
                        view = new c.BOInformationEditView();
                        break;
                    case app.BOPropertyChooseApp.APPLICATION_ID:
                        view = new c.BOPropertyChooseView();
                        break;
                    case app.BOPropertyValueChooseApp.APPLICATION_ID:
                        view = new c.BOPropertyValueChooseView();
                        break;
                    case app.VariableChooseApp.APPLICATION_ID:
                        view = new c.VariableChooseView();
                        break;
                    case app.ConfigChooseApp.APPLICATION_ID:
                        view = new c.ConfigChooseView();
                        break;
                    case app.CriteriaEditorService.APPLICATION_ID:
                        view = new c.CriteriaEditorView();
                        break;
                    case app.BONumberingListApp.APPLICATION_ID:
                        view = new c.BONumberingListView();
                        break;
                    case app.BONumberingEditApp.APPLICATION_ID:
                        view = new c.BONumberingEditView();
                        break;
                    case app.IdentityListApp.APPLICATION_ID:
                        view = new c.IdentityListView();
                        break;
                    case app.IdentityChooseApp.APPLICATION_ID:
                        view = new c.IdentityChooseView();
                        break;
                    case app.IdentityEditApp.APPLICATION_ID:
                        view = new c.IdentityEditView();
                        break;
                    case app.UserIdentityListApp.APPLICATION_ID:
                        view = new c.UserIdentityListView();
                        break;
                    case app.UserIdentityChooseApp.APPLICATION_ID:
                        view = new c.UserIdentityChooseView();
                        break;
                    case app.UserIdentityEditApp.APPLICATION_ID:
                        view = new c.UserIdentityEditView();
                        break;
                    case app.UserIdentityApp.APPLICATION_ID:
                        view = new c.UserIdentityView();
                        break;
                    case app.BOPropertySettingConfigApp.APPLICATION_ID:
                        view = new c.BOPropertySettingConfigView();
                        break;
                    case app.BOLogstViewApp.APPLICATION_ID:
                        view = new c.BOLogstViewView();
                        break;
                    case app.BOLogstListApp.APPLICATION_ID:
                        view = new c.BOLogstListView();
                        break;
                    case app.BOLogstService.APPLICATION_ID:
                        view = new c.BOLogstServiceView();
                        break;
                    case app.DocumentProcessService.APPLICATION_ID:
                        view = new c.DocumentProcessServiceView();
                        break;
                    default:
                        break;
                }
                return view;
            }
        }
    }
}