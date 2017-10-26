/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as applicationfunctionApps from "../../bsapp/applicationfunction/index";
import * as applicationmoduleApps from "../../bsapp/applicationmodule/index";
import * as applicationplatformApps from "../../bsapp/applicationplatform/index";
import * as bocriteriaApps from "../../bsapp/bocriteria/index";
import * as bofilteringApps from "../../bsapp/bofiltering/index";
import * as organizationApps from "../../bsapp/organization/index";
import * as privilegeApps from "../../bsapp/privilege/index";
import * as userApps from "../../bsapp/user/index";
import * as applicationfunctionViews from "./applicationfunction/index";
import * as applicationmoduleViews from "./applicationmodule/index";
import * as applicationplatformViews from "./applicationplatform/index";
import * as bocriteriaViews from "./bocriteria/index";
import * as bofilteringViews from "./bofiltering/index";
import * as organizationViews from "./organization/index";
import * as privilegeViews from "./privilege/index";
import * as userViews from "./user/index";
import * as boinformationApps from "../../bsapp/boinformation/index";
import * as boinformationViews from "./boinformation/index";
import * as systemApps from "../../bsapp/system/index";
import * as systemViews from "./system/index";

/**
 * 视图导航
 */
export default class Navigation extends ibas.ViewNavigation {

    /**
     * 创建实例
     * @param id 应用id
     */
    protected newView(id: string): ibas.IView {
        let view: ibas.IView = null;
        switch (id) {
            case applicationfunctionApps.ApplicationFunctionListApp.APPLICATION_ID:
                view = new applicationfunctionViews.ApplicationFunctionListView();
                break;
            case applicationfunctionApps.ApplicationFunctionChooseApp.APPLICATION_ID:
                view = new applicationfunctionViews.ApplicationFunctionChooseView();
                break;
            case applicationfunctionApps.ApplicationFunctionViewApp.APPLICATION_ID:
                view = new applicationfunctionViews.ApplicationFunctionViewView();
                break;
            case applicationfunctionApps.ApplicationFunctionEditApp.APPLICATION_ID:
                view = new applicationfunctionViews.ApplicationFunctionEditView();
                break;
            case applicationmoduleApps.ApplicationModuleListApp.APPLICATION_ID:
                view = new applicationmoduleViews.ApplicationModuleListView();
                break;
            case applicationmoduleApps.ApplicationModuleChooseApp.APPLICATION_ID:
                view = new applicationmoduleViews.ApplicationModuleChooseView();
                break;
            case applicationmoduleApps.ApplicationModuleViewApp.APPLICATION_ID:
                view = new applicationmoduleViews.ApplicationModuleViewView();
                break;
            case applicationmoduleApps.ApplicationModuleEditApp.APPLICATION_ID:
                view = new applicationmoduleViews.ApplicationModuleEditView();
                break;
            case applicationplatformApps.ApplicationPlatformListApp.APPLICATION_ID:
                view = new applicationplatformViews.ApplicationPlatformListView();
                break;
            case applicationplatformApps.ApplicationPlatformChooseApp.APPLICATION_ID:
                view = new applicationplatformViews.ApplicationPlatformChooseView();
                break;
            case applicationplatformApps.ApplicationPlatformViewApp.APPLICATION_ID:
                view = new applicationplatformViews.ApplicationPlatformViewView();
                break;
            case applicationplatformApps.ApplicationPlatformEditApp.APPLICATION_ID:
                view = new applicationplatformViews.ApplicationPlatformEditView();
                break;
            case bocriteriaApps.BOCriteriaListApp.APPLICATION_ID:
                view = new bocriteriaViews.BOCriteriaListView();
                break;
            case bocriteriaApps.BOCriteriaChooseApp.APPLICATION_ID:
                view = new bocriteriaViews.BOCriteriaChooseView();
                break;
            case bocriteriaApps.CriteriaEditorApp.APPLICATION_ID:
                view = new bocriteriaViews.CriteriaEditorView();
                break;
            case bocriteriaApps.BOCriteriaEditApp.APPLICATION_ID:
                view = new bocriteriaViews.BOCriteriaEditView();
                break;
            case bofilteringApps.BOFilteringListApp.APPLICATION_ID:
                view = new bofilteringViews.BOFilteringListView();
                break;
            case bofilteringApps.BOFilteringChooseApp.APPLICATION_ID:
                view = new bofilteringViews.BOFilteringChooseView();
                break;
            case bofilteringApps.BOFilteringViewApp.APPLICATION_ID:
                view = new bofilteringViews.BOFilteringViewView();
                break;
            case bofilteringApps.BOFilteringEditApp.APPLICATION_ID:
                view = new bofilteringViews.BOFilteringEditView();
                break;
            case organizationApps.OrganizationListApp.APPLICATION_ID:
                view = new organizationViews.OrganizationListView();
                break;
            case organizationApps.OrganizationChooseApp.APPLICATION_ID:
                view = new organizationViews.OrganizationChooseView();
                break;
            case organizationApps.OrganizationViewApp.APPLICATION_ID:
                view = new organizationViews.OrganizationViewView();
                break;
            case organizationApps.OrganizationEditApp.APPLICATION_ID:
                view = new organizationViews.OrganizationEditView();
                break;
            case privilegeApps.PrivilegeListApp.APPLICATION_ID:
                view = new privilegeViews.PrivilegeListView();
                break;
            case privilegeApps.PrivilegeChooseApp.APPLICATION_ID:
                view = new privilegeViews.PrivilegeChooseView();
                break;
            case privilegeApps.PrivilegeViewApp.APPLICATION_ID:
                view = new privilegeViews.PrivilegeViewView();
                break;
            case privilegeApps.PrivilegeEditApp.APPLICATION_ID:
                view = new privilegeViews.PrivilegeEditView();
                break;
            case userApps.UserListApp.APPLICATION_ID:
                view = new userViews.UserListView();
                break;
            case userApps.UserChooseApp.APPLICATION_ID:
                view = new userViews.UserChooseView();
                break;
            case userApps.UserViewApp.APPLICATION_ID:
                view = new userViews.UserViewView();
                break;
            case userApps.UserEditApp.APPLICATION_ID:
                view = new userViews.UserEditView();
                break;
            case userApps.UserProfileApp.APPLICATION_ID:
                view = new userViews.UserProfileView();
                break;
            case userApps.ChangeUserProfileApp.APPLICATION_ID:
                view = new userViews.ChangeUserProfileView();
                break;
            case boinformationApps.BOInformationListApp.APPLICATION_ID:
                view = new boinformationViews.BOInformationListView();
                break;
            case boinformationApps.BOInformationChooseApp.APPLICATION_ID:
                view = new boinformationViews.BOInformationChooseView();
                break;
            case boinformationApps.BOInformationViewApp.APPLICATION_ID:
                view = new boinformationViews.BOInformationViewView();
                break;
            case boinformationApps.BOInformationEditApp.APPLICATION_ID:
                view = new boinformationViews.BOInformationEditView();
                break;
            case systemApps.VariableChooseApp.APPLICATION_ID:
                view = new systemViews.VariableChooseView();
                break;
            default:
                break;
        }
        return view;
    }
}
