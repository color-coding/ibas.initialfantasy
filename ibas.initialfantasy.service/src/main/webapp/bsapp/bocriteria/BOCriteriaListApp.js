define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./BOCriteriaViewApp", "./BOCriteriaEditApp"], function (require, exports, ibas, bo, BORepositories_1, BOCriteriaViewApp_1, BOCriteriaEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BOCriteriaListApp extends ibas.BOListApplication {
        constructor() {
            super();
            this.id = BOCriteriaListApp.APPLICATION_ID;
            this.name = BOCriteriaListApp.APPLICATION_NAME;
            this.boCode = BOCriteriaListApp.BUSINESS_OBJECT_CODE;
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
                boRepository.fetchBOCriteria({
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
            let app = new BOCriteriaEditApp_1.BOCriteriaEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run();
        }
        viewData(data) {
            if (ibas.objects.isNull(data)) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_ui_please_chooose_data", ibas.i18n.prop("sys_shell_ui_data_view")));
                return;
            }
            let app = new BOCriteriaViewApp_1.BOCriteriaViewApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run(data);
        }
        editData(data) {
            if (ibas.objects.isNull(data)) {
                this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_ui_please_chooose_data", ibas.i18n.prop("sys_shell_ui_data_edit")));
                return;
            }
            let app = new BOCriteriaEditApp_1.BOCriteriaEditApp();
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
                    if (ibas.objects.instanceOf(item, bo.BOCriteria)) {
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
                                boRepository.saveBOCriteria({
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
    BOCriteriaListApp.APPLICATION_ID = "77ea344d-888e-4e4d-9be7-7e588c834fd7";
    BOCriteriaListApp.APPLICATION_NAME = "initialfantasy_app_bocriteria_list";
    BOCriteriaListApp.BUSINESS_OBJECT_CODE = bo.BOCriteria.BUSINESS_OBJECT_CODE;
    exports.BOCriteriaListApp = BOCriteriaListApp;
});
