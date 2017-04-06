define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./ApprovalTemplateEditApp"], function (require, exports, ibas, bo, BORepositories_1, ApprovalTemplateEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApprovalTemplateViewApp extends ibas.BOViewService {
        constructor() {
            super();
            this.id = ApprovalTemplateViewApp.APPLICATION_ID;
            this.name = ApprovalTemplateViewApp.APPLICATION_NAME;
            this.boCode = ApprovalTemplateViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.editDataEvent = this.editData;
        }
        viewShowed() {
        }
        editData() {
            let app = new ApprovalTemplateEditApp_1.ApprovalTemplateEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run(this.viewData);
        }
        run(...args) {
            if (!ibas.objects.isNull(args) && args.length === 1 && args[0] instanceof bo.ApprovalTemplate) {
                this.viewData = args[0];
                this.show();
            }
            else {
                super.run(args);
            }
        }
        fetchData(criteria) {
            this.busy(true);
            let that = this;
            if (typeof criteria === "string") {
                criteria = new ibas.Criteria();
            }
            try {
                let boRepository = new BORepositories_1.BORepositoryInitialFantasy();
                boRepository.fetchApprovalTemplate({
                    criteria: criteria,
                    onCompleted(opRslt) {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            that.viewData = opRslt.resultObjects.firstOrDefault();
                            that.viewShowed();
                        }
                        catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_fetching_data"));
            }
            catch (error) {
                that.messages(error);
            }
        }
        getServiceProxies() {
            return [];
        }
    }
    ApprovalTemplateViewApp.APPLICATION_ID = "f9e2c3c8-d40e-49d1-bf04-6a76b59c48d4";
    ApprovalTemplateViewApp.APPLICATION_NAME = "initialfantasy_app_approvaltemplate_view";
    ApprovalTemplateViewApp.BUSINESS_OBJECT_CODE = bo.ApprovalTemplate.BUSINESS_OBJECT_CODE;
    exports.ApprovalTemplateViewApp = ApprovalTemplateViewApp;
    class ApprovalTemplateLinkServiceMapping extends ibas.BOLinkServiceMapping {
        constructor() {
            super();
            this.id = ApprovalTemplateViewApp.APPLICATION_ID;
            this.name = ApprovalTemplateViewApp.APPLICATION_NAME;
            this.boCode = ApprovalTemplateViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new ApprovalTemplateViewApp();
        }
    }
    exports.ApprovalTemplateLinkServiceMapping = ApprovalTemplateLinkServiceMapping;
});
