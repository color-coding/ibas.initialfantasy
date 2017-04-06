define(["require", "exports", "./ApplicationFunction", "./ApplicationModule", "./ApplicationPlatform", "./ApprovalRequest", "./ApprovalTemplate", "./BOCriteria", "./BOFiltering", "./Organization", "./OrganizationalStructure", "./Ownership", "./Privilege", "./Role", "./User", "ibas/index", "./ApplicationFunction", "./ApplicationModule", "./ApplicationPlatform", "./ApprovalRequest", "./ApprovalTemplate", "./BOCriteria", "./BOFiltering", "./Organization", "./OrganizationalStructure", "./Ownership", "./Privilege", "./Role", "./User"], function (require, exports, ApplicationFunction_1, ApplicationModule_1, ApplicationPlatform_1, ApprovalRequest_1, ApprovalTemplate_1, BOCriteria_1, BOFiltering_1, Organization_1, OrganizationalStructure_1, Ownership_1, Privilege_1, Role_1, User_1, ibas, ApplicationFunction_2, ApplicationModule_2, ApplicationPlatform_2, ApprovalRequest_2, ApprovalTemplate_2, BOCriteria_2, BOFiltering_2, Organization_2, OrganizationalStructure_2, Ownership_2, Privilege_2, Role_2, User_2) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(ApplicationFunction_1);
    __export(ApplicationModule_1);
    __export(ApplicationPlatform_1);
    __export(ApprovalRequest_1);
    __export(ApprovalTemplate_1);
    __export(BOCriteria_1);
    __export(BOFiltering_1);
    __export(Organization_1);
    __export(OrganizationalStructure_1);
    __export(Ownership_1);
    __export(Privilege_1);
    __export(Role_1);
    __export(User_1);
    ibas.boFactory.register(ApplicationFunction_2.ApplicationFunction);
    ibas.boFactory.register(ApplicationModule_2.ApplicationModule);
    ibas.boFactory.register(ApplicationPlatform_2.ApplicationPlatform);
    ibas.boFactory.register(ApprovalRequest_2.ApprovalRequest);
    ibas.boFactory.register(ApprovalTemplate_2.ApprovalTemplate);
    ibas.boFactory.register(BOCriteria_2.BOCriteria);
    ibas.boFactory.register(BOFiltering_2.BOFiltering);
    ibas.boFactory.register(Organization_2.Organization);
    ibas.boFactory.register(OrganizationalStructure_2.OrganizationalStructure);
    ibas.boFactory.register(Ownership_2.Ownership);
    ibas.boFactory.register(Privilege_2.Privilege);
    ibas.boFactory.register(Role_2.Role);
    ibas.boFactory.register(User_2.User);
});
