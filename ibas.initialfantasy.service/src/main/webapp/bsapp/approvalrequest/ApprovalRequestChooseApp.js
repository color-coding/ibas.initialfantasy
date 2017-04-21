define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./ApprovalRequestEditApp"], function (require, exports, ibas, bo, BORepositories_1, ApprovalRequestEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApprovalRequestChooseApp extends ibas.BOChooseService {
        constructor() {
            super();
            this.id = ApprovalRequestChooseApp.APPLICATION_ID;
            this.name = ApprovalRequestChooseApp.APPLICATION_NAME;
            this.boCode = ApprovalRequestChooseApp.BUSINESS_OBJECT_CODE;
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
                boRepository.fetchApprovalRequest({
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
            let app = new ApprovalRequestEditApp_1.ApprovalRequestEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run();
        }
    }
    ApprovalRequestChooseApp.APPLICATION_ID = "97e9efce-544f-42ec-af5f-a292726e0a6d";
    ApprovalRequestChooseApp.APPLICATION_NAME = "initialfantasy_app_approvalrequest_choose";
    ApprovalRequestChooseApp.BUSINESS_OBJECT_CODE = bo.ApprovalRequest.BUSINESS_OBJECT_CODE;
    exports.ApprovalRequestChooseApp = ApprovalRequestChooseApp;
    class ApprovalRequestChooseServiceMapping extends ibas.BOChooseServiceMapping {
        constructor() {
            super();
            this.id = ApprovalRequestChooseApp.APPLICATION_ID;
            this.name = ApprovalRequestChooseApp.APPLICATION_NAME;
            this.boCode = ApprovalRequestChooseApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new ApprovalRequestChooseApp();
        }
    }
    exports.ApprovalRequestChooseServiceMapping = ApprovalRequestChooseServiceMapping;
});
