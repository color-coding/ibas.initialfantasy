define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./BOCriteriaEditApp"], function (require, exports, ibas, bo, BORepositories_1, BOCriteriaEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BOCriteriaViewApp extends ibas.BOViewService {
        constructor() {
            super();
            this.id = BOCriteriaViewApp.APPLICATION_ID;
            this.name = BOCriteriaViewApp.APPLICATION_NAME;
            this.boCode = BOCriteriaViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.editDataEvent = this.editData;
        }
        viewShowed() {
        }
        editData() {
            let app = new BOCriteriaEditApp_1.BOCriteriaEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run(this.viewData);
        }
        run(...args) {
            if (!ibas.objects.isNull(args) && args.length === 1 && args[0] instanceof bo.BOCriteria) {
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
                boRepository.fetchBOCriteria({
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
    BOCriteriaViewApp.APPLICATION_ID = "2139a211-18d1-434c-a185-28d3bb01e28b";
    BOCriteriaViewApp.APPLICATION_NAME = "initialfantasy_app_bocriteria_view";
    BOCriteriaViewApp.BUSINESS_OBJECT_CODE = bo.BOCriteria.BUSINESS_OBJECT_CODE;
    exports.BOCriteriaViewApp = BOCriteriaViewApp;
    class BOCriteriaLinkServiceMapping extends ibas.BOLinkServiceMapping {
        constructor() {
            super();
            this.id = BOCriteriaViewApp.APPLICATION_ID;
            this.name = BOCriteriaViewApp.APPLICATION_NAME;
            this.boCode = BOCriteriaViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new BOCriteriaViewApp();
        }
    }
    exports.BOCriteriaLinkServiceMapping = BOCriteriaLinkServiceMapping;
});
