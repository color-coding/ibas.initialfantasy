define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./ApprovalRequestEditApp"], function (require, exports, ibas, bo, BORepositories_1, ApprovalRequestEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApprovalRequestViewApp extends ibas.BOViewService {
        constructor() {
            super();
            this.id = ApprovalRequestViewApp.APPLICATION_ID;
            this.name = ApprovalRequestViewApp.APPLICATION_NAME;
            this.boCode = ApprovalRequestViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.editDataEvent = this.editData;
        }
        viewShowed() {
        }
        editData() {
            let app = new ApprovalRequestEditApp_1.ApprovalRequestEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run(this.viewData);
        }
        run(...args) {
            if (!ibas.objects.isNull(args) && args.length === 1 && args[0] instanceof bo.ApprovalRequest) {
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
                boRepository.fetchApprovalRequest({
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
    ApprovalRequestViewApp.APPLICATION_ID = "6778c1f8-3be0-4f55-bd89-a598cac70b22";
    ApprovalRequestViewApp.APPLICATION_NAME = "initialfantasy_app_approvalrequest_view";
    ApprovalRequestViewApp.BUSINESS_OBJECT_CODE = bo.ApprovalRequest.BUSINESS_OBJECT_CODE;
    exports.ApprovalRequestViewApp = ApprovalRequestViewApp;
    class ApprovalRequestLinkServiceMapping extends ibas.BOLinkServiceMapping {
        constructor() {
            super();
            this.id = ApprovalRequestViewApp.APPLICATION_ID;
            this.name = ApprovalRequestViewApp.APPLICATION_NAME;
            this.boCode = ApprovalRequestViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new ApprovalRequestViewApp();
        }
    }
    exports.ApprovalRequestLinkServiceMapping = ApprovalRequestLinkServiceMapping;
});
