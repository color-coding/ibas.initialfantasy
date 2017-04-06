define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./ApprovalTemplateEditApp"], function (require, exports, ibas, bo, BORepositories_1, ApprovalTemplateEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApprovalTemplateChooseApp extends ibas.BOChooseService {
        constructor() {
            super();
            this.id = ApprovalTemplateChooseApp.APPLICATION_ID;
            this.name = ApprovalTemplateChooseApp.APPLICATION_NAME;
            this.boCode = ApprovalTemplateChooseApp.BUSINESS_OBJECT_CODE;
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
                boRepository.fetchApprovalTemplate({
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
            let app = new ApprovalTemplateEditApp_1.ApprovalTemplateEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run();
        }
    }
    ApprovalTemplateChooseApp.APPLICATION_ID = "f4e73c4a-7483-40e2-804e-ca5e12c6c43d";
    ApprovalTemplateChooseApp.APPLICATION_NAME = "initialfantasy_app_approvaltemplate_choose";
    ApprovalTemplateChooseApp.BUSINESS_OBJECT_CODE = bo.ApprovalTemplate.BUSINESS_OBJECT_CODE;
    exports.ApprovalTemplateChooseApp = ApprovalTemplateChooseApp;
    class ApprovalTemplateChooseServiceMapping extends ibas.BOChooseServiceMapping {
        constructor() {
            super();
            this.id = ApprovalTemplateChooseApp.APPLICATION_ID;
            this.name = ApprovalTemplateChooseApp.APPLICATION_NAME;
            this.boCode = ApprovalTemplateChooseApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new ApprovalTemplateChooseApp();
        }
    }
    exports.ApprovalTemplateChooseServiceMapping = ApprovalTemplateChooseServiceMapping;
});
