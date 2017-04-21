define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./BOFilteringEditApp"], function (require, exports, ibas, bo, BORepositories_1, BOFilteringEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BOFilteringChooseApp extends ibas.BOChooseService {
        constructor() {
            super();
            this.id = BOFilteringChooseApp.APPLICATION_ID;
            this.name = BOFilteringChooseApp.APPLICATION_NAME;
            this.boCode = BOFilteringChooseApp.BUSINESS_OBJECT_CODE;
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
                boRepository.fetchBOFiltering({
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
            let app = new BOFilteringEditApp_1.BOFilteringEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run();
        }
    }
    BOFilteringChooseApp.APPLICATION_ID = "335a4fe3-90f8-4253-8e2d-86361b3556d2";
    BOFilteringChooseApp.APPLICATION_NAME = "initialfantasy_app_bofiltering_choose";
    BOFilteringChooseApp.BUSINESS_OBJECT_CODE = bo.BOFiltering.BUSINESS_OBJECT_CODE;
    exports.BOFilteringChooseApp = BOFilteringChooseApp;
    class BOFilteringChooseServiceMapping extends ibas.BOChooseServiceMapping {
        constructor() {
            super();
            this.id = BOFilteringChooseApp.APPLICATION_ID;
            this.name = BOFilteringChooseApp.APPLICATION_NAME;
            this.boCode = BOFilteringChooseApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new BOFilteringChooseApp();
        }
    }
    exports.BOFilteringChooseServiceMapping = BOFilteringChooseServiceMapping;
});
