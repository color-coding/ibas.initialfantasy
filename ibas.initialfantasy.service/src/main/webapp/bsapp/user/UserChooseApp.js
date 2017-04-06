define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./UserEditApp"], function (require, exports, ibas, bo, BORepositories_1, UserEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UserChooseApp extends ibas.BOChooseService {
        constructor() {
            super();
            this.id = UserChooseApp.APPLICATION_ID;
            this.name = UserChooseApp.APPLICATION_NAME;
            this.boCode = UserChooseApp.BUSINESS_OBJECT_CODE;
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
                boRepository.fetchUser({
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
            let app = new UserEditApp_1.UserEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run();
        }
    }
    UserChooseApp.APPLICATION_ID = "e8b13ec1-1190-422f-a226-2e2e066c4aab";
    UserChooseApp.APPLICATION_NAME = "initialfantasy_app_user_choose";
    UserChooseApp.BUSINESS_OBJECT_CODE = bo.User.BUSINESS_OBJECT_CODE;
    exports.UserChooseApp = UserChooseApp;
    class UserChooseServiceMapping extends ibas.BOChooseServiceMapping {
        constructor() {
            super();
            this.id = UserChooseApp.APPLICATION_ID;
            this.name = UserChooseApp.APPLICATION_NAME;
            this.boCode = UserChooseApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new UserChooseApp();
        }
    }
    exports.UserChooseServiceMapping = UserChooseServiceMapping;
});
