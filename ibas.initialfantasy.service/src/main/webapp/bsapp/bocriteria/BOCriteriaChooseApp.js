define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./BOCriteriaEditApp"], function (require, exports, ibas, bo, BORepositories_1, BOCriteriaEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BOCriteriaChooseApp extends ibas.BOChooseService {
        constructor() {
            super();
            this.id = BOCriteriaChooseApp.APPLICATION_ID;
            this.name = BOCriteriaChooseApp.APPLICATION_NAME;
            this.boCode = BOCriteriaChooseApp.BUSINESS_OBJECT_CODE;
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
                boRepository.fetchBOCriteria({
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
            let app = new BOCriteriaEditApp_1.BOCriteriaEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run();
        }
    }
    BOCriteriaChooseApp.APPLICATION_ID = "d0039d13-89a9-4d0d-bdb4-f38b1e0ec2c4";
    BOCriteriaChooseApp.APPLICATION_NAME = "initialfantasy_app_bocriteria_choose";
    BOCriteriaChooseApp.BUSINESS_OBJECT_CODE = bo.BOCriteria.BUSINESS_OBJECT_CODE;
    exports.BOCriteriaChooseApp = BOCriteriaChooseApp;
    class BOCriteriaChooseServiceMapping extends ibas.BOChooseServiceMapping {
        constructor() {
            super();
            this.id = BOCriteriaChooseApp.APPLICATION_ID;
            this.name = BOCriteriaChooseApp.APPLICATION_NAME;
            this.boCode = BOCriteriaChooseApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new BOCriteriaChooseApp();
        }
    }
    exports.BOCriteriaChooseServiceMapping = BOCriteriaChooseServiceMapping;
});
