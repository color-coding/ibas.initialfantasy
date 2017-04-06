define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories"], function (require, exports, ibas, bo, BORepositories_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class OrganizationalStructureEditApp extends ibas.BOEditApplication {
        constructor() {
            super();
            this.id = OrganizationalStructureEditApp.APPLICATION_ID;
            this.name = OrganizationalStructureEditApp.APPLICATION_NAME;
            this.boCode = OrganizationalStructureEditApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.deleteDataEvent = this.deleteData;
            this.view.addOrganizationalRoleEvent = this.addOrganizationalRole;
            this.view.removeOrganizationalRoleEvent = this.removeOrganizationalRole;
        }
        viewShowed() {
            this.view.showOrganizationalStructure(this.editData);
            this.view.showOrganizationalRoles(this.editData.organizationalRoles.filterDeleted());
        }
        run(...args) {
            if (!ibas.objects.isNull(args) && args.length === 1 && ibas.objects.instanceOf(args[0], bo.OrganizationalStructure)) {
                this.editData = args[0];
            }
            if (ibas.objects.isNull(this.editData)) {
                this.editData = new bo.OrganizationalStructure();
                this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_ui_data_created_new"));
            }
            super.run();
        }
        saveData() {
            try {
                let that = this;
                let boRepository = new BORepositories_1.BORepositoryInitialFantasy();
                boRepository.saveOrganizationalStructure({
                    beSaved: this.editData,
                    onCompleted(opRslt) {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                this.messages(ibas.emMessageType.SUCCESS, "{0}{1}", ibas.i18n.prop("sys_shell_ui_data_delete"), ibas.i18n.prop("sys_shell_ui_sucessful"));
                                this.editData = new bo.OrganizationalStructure();
                            }
                            else {
                                this.editData = opRslt.resultObjects.firstOrDefault();
                                this.messages(ibas.emMessageType.SUCCESS, "{0}{1}", ibas.i18n.prop("sys_shell_ui_data_save"), ibas.i18n.prop("sys_shell_ui_sucessful"));
                            }
                            this.viewShowed();
                        }
                        catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.busy(true);
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_saving_data"));
            }
            catch (error) {
                this.messages(error);
            }
        }
        deleteData() {
            let that = this;
            this.messages({
                type: ibas.emMessageType.QUESTION,
                title: ibas.i18n.prop(this.name),
                message: ibas.i18n.prop("msg_whether_to_delete"),
                actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                onCompleted(action) {
                    if (action === ibas.emMessageAction.YES) {
                        that.editData.delete();
                        that.saveData();
                    }
                }
            });
        }
        addOrganizationalRole() {
            this.editData.organizationalRoles.create();
            this.view.showOrganizationalRoles(this.editData.organizationalRoles.filterDeleted());
        }
        removeOrganizationalRole(item) {
            if (this.editData.organizationalRoles.indexOf(item) >= 0) {
                this.editData.organizationalRoles.remove(item);
                this.view.showOrganizationalRoles(this.editData.organizationalRoles.filterDeleted());
            }
        }
    }
    OrganizationalStructureEditApp.APPLICATION_ID = "d11df2f4-fb3d-423b-944a-e8c5406c87bf";
    OrganizationalStructureEditApp.APPLICATION_NAME = "initialfantasy_app_organizationalstructure_edit";
    OrganizationalStructureEditApp.BUSINESS_OBJECT_CODE = bo.OrganizationalStructure.BUSINESS_OBJECT_CODE;
    exports.OrganizationalStructureEditApp = OrganizationalStructureEditApp;
});
