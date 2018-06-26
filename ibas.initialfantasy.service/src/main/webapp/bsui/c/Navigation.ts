/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../3rdparty/ibas/index.d.ts" />
/// <reference path="../../3rdparty/openui5/index.d.ts" />
/// <reference path="../../index.d.ts" />
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
/// <reference path="./project/index.ts" />
/// <reference path="./bonumbering/index.ts" />
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
                    case app.ApplicationElementEditApp.APPLICATION_ID:
                        view = new c.ApplicationElementEditView();
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
                    case app.PrivilegeListApp.APPLICATION_ID:
                        view = new c.PrivilegeListView();
                        break;
                    case app.PrivilegeChooseApp.APPLICATION_ID:
                        view = new c.PrivilegeChooseView();
                        break;
                    case app.PrivilegeEditApp.APPLICATION_ID:
                        view = new c.PrivilegeEditView();
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
                    case app.VariableChooseApp.APPLICATION_ID:
                        view = new c.VariableChooseView();
                        break;
                    case app.ConfigChooseApp.APPLICATION_ID:
                        view = new c.ConfigChooseView();
                        break;
                    case app.CriteriaEditorService.APPLICATION_ID:
                        view = new c.CriteriaEditorView();
                        break;
                    case app.ProjectListApp.APPLICATION_ID:
                        view = new c.ProjectListView();
                        break;
                    case app.ProjectChooseApp.APPLICATION_ID:
                        view = new c.ProjectChooseView();
                        break;
                    case app.ProjectEditApp.APPLICATION_ID:
                        view = new c.ProjectEditView();
                        break;
                    case app.BONumberingListApp.APPLICATION_ID:
                        view = new c.BONumberingListView();
                        break;
                    case app.BONumberingEditApp.APPLICATION_ID:
                        view = new c.BONumberingEditView();
                        break;
                    default:
                        break;
                }
                return view;
            }
        }
    }
}