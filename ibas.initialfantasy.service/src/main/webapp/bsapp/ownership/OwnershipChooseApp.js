define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./OwnershipEditApp"], function (require, exports, ibas, bo, BORepositories_1, OwnershipEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class OwnershipChooseApp extends ibas.BOChooseService {
        constructor() {
            super();
            this.id = OwnershipChooseApp.APPLICATION_ID;
            this.name = OwnershipChooseApp.APPLICATION_NAME;
            this.boCode = OwnershipChooseApp.BUSINESS_OBJECT_CODE;
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
                boRepository.fetchOwnership({
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
            let app = new OwnershipEditApp_1.OwnershipEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run();
        }
    }
    OwnershipChooseApp.APPLICATION_ID = "5f0a5d7a-6a77-426e-91b5-460c6b1fe4b1";
    OwnershipChooseApp.APPLICATION_NAME = "initialfantasy_app_ownership_choose";
    OwnershipChooseApp.BUSINESS_OBJECT_CODE = bo.Ownership.BUSINESS_OBJECT_CODE;
    exports.OwnershipChooseApp = OwnershipChooseApp;
    class OwnershipChooseServiceMapping extends ibas.BOChooseServiceMapping {
        constructor() {
            super();
            this.id = OwnershipChooseApp.APPLICATION_ID;
            this.name = OwnershipChooseApp.APPLICATION_NAME;
            this.boCode = OwnershipChooseApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new OwnershipChooseApp();
        }
    }
    exports.OwnershipChooseServiceMapping = OwnershipChooseServiceMapping;
});
