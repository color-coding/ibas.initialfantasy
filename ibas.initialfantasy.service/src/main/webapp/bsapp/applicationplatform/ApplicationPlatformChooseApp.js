define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./ApplicationPlatformEditApp"], function (require, exports, ibas, bo, BORepositories_1, ApplicationPlatformEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApplicationPlatformChooseApp extends ibas.BOChooseService {
        constructor() {
            super();
            this.id = ApplicationPlatformChooseApp.APPLICATION_ID;
            this.name = ApplicationPlatformChooseApp.APPLICATION_NAME;
            this.boCode = ApplicationPlatformChooseApp.BUSINESS_OBJECT_CODE;
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
                boRepository.fetchApplicationPlatform({
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
            let app = new ApplicationPlatformEditApp_1.ApplicationPlatformEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run();
        }
    }
    ApplicationPlatformChooseApp.APPLICATION_ID = "f59a60f0-b58a-4131-9bea-6136a81344df";
    ApplicationPlatformChooseApp.APPLICATION_NAME = "initialfantasy_app_applicationplatform_choose";
    ApplicationPlatformChooseApp.BUSINESS_OBJECT_CODE = bo.ApplicationPlatform.BUSINESS_OBJECT_CODE;
    exports.ApplicationPlatformChooseApp = ApplicationPlatformChooseApp;
    class ApplicationPlatformChooseServiceMapping extends ibas.BOChooseServiceMapping {
        constructor() {
            super();
            this.id = ApplicationPlatformChooseApp.APPLICATION_ID;
            this.name = ApplicationPlatformChooseApp.APPLICATION_NAME;
            this.boCode = ApplicationPlatformChooseApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new ApplicationPlatformChooseApp();
        }
    }
    exports.ApplicationPlatformChooseServiceMapping = ApplicationPlatformChooseServiceMapping;
});
