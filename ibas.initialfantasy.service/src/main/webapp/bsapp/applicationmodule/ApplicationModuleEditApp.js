define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories"], function (require, exports, ibas, bo, BORepositories_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApplicationModuleEditApp extends ibas.BOEditApplication {
        constructor() {
            super();
            this.id = ApplicationModuleEditApp.APPLICATION_ID;
            this.name = ApplicationModuleEditApp.APPLICATION_NAME;
            this.boCode = ApplicationModuleEditApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.deleteDataEvent = this.deleteData;
        }
        viewShowed() {
            this.view.showApplicationModule(this.editData);
        }
        run(...args) {
            if (!ibas.objects.isNull(args) && args.length === 1 && ibas.objects.instanceOf(args[0], bo.ApplicationModule)) {
                this.editData = args[0];
            }
            if (ibas.objects.isNull(this.editData)) {
                this.editData = new bo.ApplicationModule();
                this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_ui_data_created_new"));
            }
            super.run();
        }
        saveData() {
            try {
                let that = this;
                let boRepository = new BORepositories_1.BORepositoryInitialFantasy();
                boRepository.saveApplicationModule({
                    beSaved: this.editData,
                    onCompleted(opRslt) {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                this.messages(ibas.emMessageType.SUCCESS, "{0}{1}", ibas.i18n.prop("sys_shell_ui_data_delete"), ibas.i18n.prop("sys_shell_ui_sucessful"));
                                this.editData = new bo.ApplicationModule();
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
    }
    ApplicationModuleEditApp.APPLICATION_ID = "ab58a931-082f-48bf-8166-19c30e9ba910";
    ApplicationModuleEditApp.APPLICATION_NAME = "initialfantasy_app_applicationmodule_edit";
    ApplicationModuleEditApp.BUSINESS_OBJECT_CODE = bo.ApplicationModule.BUSINESS_OBJECT_CODE;
    exports.ApplicationModuleEditApp = ApplicationModuleEditApp;
});
