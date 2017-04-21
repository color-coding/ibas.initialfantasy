define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./PrivilegeEditApp"], function (require, exports, ibas, bo, BORepositories_1, PrivilegeEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PrivilegeChooseApp extends ibas.BOChooseService {
        constructor() {
            super();
            this.id = PrivilegeChooseApp.APPLICATION_ID;
            this.name = PrivilegeChooseApp.APPLICATION_NAME;
            this.boCode = PrivilegeChooseApp.BUSINESS_OBJECT_CODE;
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
                boRepository.fetchPrivilege({
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
            let app = new PrivilegeEditApp_1.PrivilegeEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run();
        }
    }
    PrivilegeChooseApp.APPLICATION_ID = "0569b973-3f5d-4918-b823-73f03c912416";
    PrivilegeChooseApp.APPLICATION_NAME = "initialfantasy_app_privilege_choose";
    PrivilegeChooseApp.BUSINESS_OBJECT_CODE = bo.Privilege.BUSINESS_OBJECT_CODE;
    exports.PrivilegeChooseApp = PrivilegeChooseApp;
    class PrivilegeChooseServiceMapping extends ibas.BOChooseServiceMapping {
        constructor() {
            super();
            this.id = PrivilegeChooseApp.APPLICATION_ID;
            this.name = PrivilegeChooseApp.APPLICATION_NAME;
            this.boCode = PrivilegeChooseApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new PrivilegeChooseApp();
        }
    }
    exports.PrivilegeChooseServiceMapping = PrivilegeChooseServiceMapping;
});
