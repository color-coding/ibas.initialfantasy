define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./ApplicationModuleViewApp", "./ApplicationModuleEditApp"], function (require, exports, ibas, bo, BORepositories_1, ApplicationModuleViewApp_1, ApplicationModuleEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApplicationModuleListApp extends ibas.BOListApplication {
        constructor() {
            super();
            this.id = ApplicationModuleListApp.APPLICATION_ID;
            this.name = ApplicationModuleListApp.APPLICATION_NAME;
            this.boCode = ApplicationModuleListApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.editDataEvent = this.editData;
            this.view.deleteDataEvent = this.deleteData;
        }
        viewShowed() {
        }
        fetchData(criteria) {
            try {
                this.busy(true);
                let that = this;
                let boRepository = new BORepositories_1.BORepositoryInitialFantasy();
                boRepository.fetchApplicationModule({
                    criteria: criteria,
                    onCompleted(opRslt) {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            that.view.showData(opRslt.resultObjects);
                            that.busy(false);
                        }
                        catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_fetching_data"));
            }
            catch (error) {
                this.messages(error);
            }
        }
        newData() {
            let app = new ApplicationModuleEditApp_1.ApplicationModuleEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run();
        }
        viewData(data) {
            if (ibas.objects.isNull(data)) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_ui_please_chooose_data", ibas.i18n.prop("sys_shell_ui_data_view")));
                return;
            }
            let app = new ApplicationModuleViewApp_1.ApplicationModuleViewApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run(data);
        }
        editData(data) {
            if (ibas.objects.isNull(data)) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_ui_please_chooose_data", ibas.i18n.prop("sys_shell_ui_data_edit")));
                return;
            }
            let app = new ApplicationModuleEditApp_1.ApplicationModuleEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run(data);
        }
        deleteData(data) {
            if (ibas.objects.isNull(data)) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_ui_please_chooose_data", ibas.i18n.prop("sys_shell_ui_data_delete")));
                return;
            }
            let beDeleteds = new ibas.ArrayList();
            if (data instanceof Array) {
                for (let item of data) {
                    if (ibas.objects.instanceOf(item, bo.ApplicationModule)) {
                        item.delete();
                        beDeleteds.add(item);
                    }
                }
            }
            if (beDeleteds.length === 0) {
                return;
            }
            let that = this;
            this.messages({
                type: ibas.emMessageType.QUESTION,
                title: ibas.i18n.prop(this.name),
                message: ibas.i18n.prop("sys_shell_ui_whether_to_delete", beDeleteds.length),
                actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                onCompleted(action) {
                    if (action === ibas.emMessageAction.YES) {
                        try {
                            let boRepository = new BORepositories_1.BORepositoryInitialFantasy();
                            let saveMethod = function (beSaved) {
                                boRepository.saveApplicationModule({
                                    beSaved: beSaved,
                                    onCompleted(opRslt) {
                                        try {
                                            if (opRslt.resultCode !== 0) {
                                                throw new Error(opRslt.message);
                                            }
                                            let index = beDeleteds.indexOf(beSaved) + 1;
                                            if (index > 0 && index < beDeleteds.length) {
                                                saveMethod(beDeleteds[index]);
                                            }
                                            else {
                                                that.busy(false);
                                                that.messages(ibas.emMessageType.SUCCESS, ibas.i18n.prop("sys_shell_ui_data_delete") + ibas.i18n.prop("sys_shell_ui_sucessful"));
                                            }
                                        }
                                        catch (error) {
                                            that.messages(ibas.emMessageType.ERROR, ibas.i18n.prop("sys_shell_ui_data_delete_error", beSaved, error.message));
                                        }
                                    }
                                });
                                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_ui_data_deleting", beSaved));
                            };
                            that.busy(true);
                            saveMethod(beDeleteds.firstOrDefault());
                        }
                        catch (error) {
                            that.busy(false);
                            that.messages(error);
                        }
                    }
                }
            });
        }
        getServiceProxies() {
            return [];
        }
    }
    ApplicationModuleListApp.APPLICATION_ID = "51fc6569-fcde-4d92-b0e9-f06b27276072";
    ApplicationModuleListApp.APPLICATION_NAME = "initialfantasy_app_applicationmodule_list";
    ApplicationModuleListApp.BUSINESS_OBJECT_CODE = bo.ApplicationModule.BUSINESS_OBJECT_CODE;
    exports.ApplicationModuleListApp = ApplicationModuleListApp;
});
