define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./ApplicationFunctionEditApp"], function (require, exports, ibas, bo, BORepositories_1, ApplicationFunctionEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApplicationFunctionChooseApp extends ibas.BOChooseService {
        constructor() {
            super();
            this.id = ApplicationFunctionChooseApp.APPLICATION_ID;
            this.name = ApplicationFunctionChooseApp.APPLICATION_NAME;
            this.boCode = ApplicationFunctionChooseApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
        }
        viewShowed() {
        }
        fetchData(criteria) {
            try {
                this.busy(true);
                let that = this;
                let boRepository = new BORepositories_1.BORepositoryInitialFantasy();
                boRepository.fetchApplicationFunction({
                    criteria: criteria,
                    onCompleted(opRslt) {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 1
                                && ibas.config.get(ibas.BOChooseService.CONFIG_ITEM_AUTO_CHOOSE_DATA, true)) {
                                that.chooseData(opRslt.resultObjects);
                            }
                            else {
                                if (!that.isViewShowed()) {
                                    that.show();
                                }
                                that.view.showData(opRslt.resultObjects);
                                that.busy(false);
                            }
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
            this.destroy();
            let app = new ApplicationFunctionEditApp_1.ApplicationFunctionEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run();
        }
    }
    ApplicationFunctionChooseApp.APPLICATION_ID = "ec782f06-11b8-4af2-84af-91e977bbd6c5";
    ApplicationFunctionChooseApp.APPLICATION_NAME = "initialfantasy_app_applicationfunction_choose";
    ApplicationFunctionChooseApp.BUSINESS_OBJECT_CODE = bo.ApplicationFunction.BUSINESS_OBJECT_CODE;
    exports.ApplicationFunctionChooseApp = ApplicationFunctionChooseApp;
    class ApplicationFunctionChooseServiceMapping extends ibas.BOChooseServiceMapping {
        constructor() {
            super();
            this.id = ApplicationFunctionChooseApp.APPLICATION_ID;
            this.name = ApplicationFunctionChooseApp.APPLICATION_NAME;
            this.boCode = ApplicationFunctionChooseApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new ApplicationFunctionChooseApp();
        }
    }
    exports.ApplicationFunctionChooseServiceMapping = ApplicationFunctionChooseServiceMapping;
});
