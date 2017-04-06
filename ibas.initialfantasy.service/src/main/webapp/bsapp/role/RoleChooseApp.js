define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./RoleEditApp"], function (require, exports, ibas, bo, BORepositories_1, RoleEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RoleChooseApp extends ibas.BOChooseService {
        constructor() {
            super();
            this.id = RoleChooseApp.APPLICATION_ID;
            this.name = RoleChooseApp.APPLICATION_NAME;
            this.boCode = RoleChooseApp.BUSINESS_OBJECT_CODE;
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
                boRepository.fetchRole({
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
            let app = new RoleEditApp_1.RoleEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run();
        }
    }
    RoleChooseApp.APPLICATION_ID = "52d96291-b9d1-4445-9fb8-7ecc3e976e9b";
    RoleChooseApp.APPLICATION_NAME = "initialfantasy_app_role_choose";
    RoleChooseApp.BUSINESS_OBJECT_CODE = bo.Role.BUSINESS_OBJECT_CODE;
    exports.RoleChooseApp = RoleChooseApp;
    class RoleChooseServiceMapping extends ibas.BOChooseServiceMapping {
        constructor() {
            super();
            this.id = RoleChooseApp.APPLICATION_ID;
            this.name = RoleChooseApp.APPLICATION_NAME;
            this.boCode = RoleChooseApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new RoleChooseApp();
        }
    }
    exports.RoleChooseServiceMapping = RoleChooseServiceMapping;
});
