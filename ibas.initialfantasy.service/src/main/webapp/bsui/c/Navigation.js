define(["require", "exports", "ibas/index", "../../bsapp/applicationfunction/index", "../../bsapp/applicationmodule/index", "../../bsapp/applicationplatform/index", "../../bsapp/approvalrequest/index", "../../bsapp/approvaltemplate/index", "../../bsapp/bocriteria/index", "../../bsapp/bofiltering/index", "../../bsapp/organization/index", "../../bsapp/organizationalstructure/index", "../../bsapp/ownership/index", "../../bsapp/privilege/index", "../../bsapp/role/index", "../../bsapp/user/index", "./applicationfunction/index", "./applicationmodule/index", "./applicationplatform/index", "./approvalrequest/index", "./approvaltemplate/index", "./bocriteria/index", "./bofiltering/index", "./organization/index", "./organizationalstructure/index", "./ownership/index", "./privilege/index", "./role/index", "./user/index"], function (require, exports, ibas, applicationfunctionApps, applicationmoduleApps, applicationplatformApps, approvalrequestApps, approvaltemplateApps, bocriteriaApps, bofilteringApps, organizationApps, organizationalstructureApps, ownershipApps, privilegeApps, roleApps, userApps, applicationfunctionViews, applicationmoduleViews, applicationplatformViews, approvalrequestViews, approvaltemplateViews, bocriteriaViews, bofilteringViews, organizationViews, organizationalstructureViews, ownershipViews, privilegeViews, roleViews, userViews) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Navigation extends ibas.ViewNavigation {
        newView(id) {
            let view = null;
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
                case approvalrequestApps.ApprovalRequestListApp.APPLICATION_ID:
                    view = new approvalrequestViews.ApprovalRequestListView();
                    break;
                case approvalrequestApps.ApprovalRequestChooseApp.APPLICATION_ID:
                    view = new approvalrequestViews.ApprovalRequestChooseView();
                    break;
                case approvalrequestApps.ApprovalRequestViewApp.APPLICATION_ID:
                    view = new approvalrequestViews.ApprovalRequestViewView();
                    break;
                case approvalrequestApps.ApprovalRequestEditApp.APPLICATION_ID:
                    view = new approvalrequestViews.ApprovalRequestEditView();
                    break;
                case approvaltemplateApps.ApprovalTemplateListApp.APPLICATION_ID:
                    view = new approvaltemplateViews.ApprovalTemplateListView();
                    break;
                case approvaltemplateApps.ApprovalTemplateChooseApp.APPLICATION_ID:
                    view = new approvaltemplateViews.ApprovalTemplateChooseView();
                    break;
                case approvaltemplateApps.ApprovalTemplateViewApp.APPLICATION_ID:
                    view = new approvaltemplateViews.ApprovalTemplateViewView();
                    break;
                case approvaltemplateApps.ApprovalTemplateEditApp.APPLICATION_ID:
                    view = new approvaltemplateViews.ApprovalTemplateEditView();
                    break;
                case bocriteriaApps.BOCriteriaListApp.APPLICATION_ID:
                    view = new bocriteriaViews.BOCriteriaListView();
                    break;
                case bocriteriaApps.BOCriteriaChooseApp.APPLICATION_ID:
                    view = new bocriteriaViews.BOCriteriaChooseView();
                    break;
                case bocriteriaApps.BOCriteriaViewApp.APPLICATION_ID:
                    view = new bocriteriaViews.BOCriteriaViewView();
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
                case organizationalstructureApps.OrganizationalStructureListApp.APPLICATION_ID:
                    view = new organizationalstructureViews.OrganizationalStructureListView();
                    break;
                case organizationalstructureApps.OrganizationalStructureChooseApp.APPLICATION_ID:
                    view = new organizationalstructureViews.OrganizationalStructureChooseView();
                    break;
                case organizationalstructureApps.OrganizationalStructureViewApp.APPLICATION_ID:
                    view = new organizationalstructureViews.OrganizationalStructureViewView();
                    break;
                case organizationalstructureApps.OrganizationalStructureEditApp.APPLICATION_ID:
                    view = new organizationalstructureViews.OrganizationalStructureEditView();
                    break;
                case ownershipApps.OwnershipListApp.APPLICATION_ID:
                    view = new ownershipViews.OwnershipListView();
                    break;
                case ownershipApps.OwnershipChooseApp.APPLICATION_ID:
                    view = new ownershipViews.OwnershipChooseView();
                    break;
                case ownershipApps.OwnershipViewApp.APPLICATION_ID:
                    view = new ownershipViews.OwnershipViewView();
                    break;
                case ownershipApps.OwnershipEditApp.APPLICATION_ID:
                    view = new ownershipViews.OwnershipEditView();
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
                case roleApps.RoleListApp.APPLICATION_ID:
                    view = new roleViews.RoleListView();
                    break;
                case roleApps.RoleChooseApp.APPLICATION_ID:
                    view = new roleViews.RoleChooseView();
                    break;
                case roleApps.RoleViewApp.APPLICATION_ID:
                    view = new roleViews.RoleViewView();
                    break;
                case roleApps.RoleEditApp.APPLICATION_ID:
                    view = new roleViews.RoleEditView();
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
                default:
                    break;
            }
            return view;
        }
    }
    exports.default = Navigation;
});
