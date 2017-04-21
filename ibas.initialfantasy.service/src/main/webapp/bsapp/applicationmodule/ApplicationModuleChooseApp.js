define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./ApplicationModuleEditApp"], function (require, exports, ibas, bo, BORepositories_1, ApplicationModuleEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApplicationModuleChooseApp extends ibas.BOChooseService {
        constructor() {
            super();
            this.id = ApplicationModuleChooseApp.APPLICATION_ID;
            this.name = ApplicationModuleChooseApp.APPLICATION_NAME;
            this.boCode = ApplicationModuleChooseApp.BUSINESS_OBJECT_CODE;
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
                boRepository.fetchApplicationModule({
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
            let app = new ApplicationModuleEditApp_1.ApplicationModuleEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run();
        }
    }
    ApplicationModuleChooseApp.APPLICATION_ID = "8372578d-06b9-4e55-b65d-8000e545be09";
    ApplicationModuleChooseApp.APPLICATION_NAME = "initialfantasy_app_applicationmodule_choose";
    ApplicationModuleChooseApp.BUSINESS_OBJECT_CODE = bo.ApplicationModule.BUSINESS_OBJECT_CODE;
    exports.ApplicationModuleChooseApp = ApplicationModuleChooseApp;
    class ApplicationModuleChooseServiceMapping extends ibas.BOChooseServiceMapping {
        constructor() {
            super();
            this.id = ApplicationModuleChooseApp.APPLICATION_ID;
            this.name = ApplicationModuleChooseApp.APPLICATION_NAME;
            this.boCode = ApplicationModuleChooseApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new ApplicationModuleChooseApp();
        }
    }
    exports.ApplicationModuleChooseServiceMapping = ApplicationModuleChooseServiceMapping;
});
