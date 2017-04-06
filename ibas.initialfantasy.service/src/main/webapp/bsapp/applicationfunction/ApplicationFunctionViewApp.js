define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./ApplicationFunctionEditApp"], function (require, exports, ibas, bo, BORepositories_1, ApplicationFunctionEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApplicationFunctionViewApp extends ibas.BOViewService {
        constructor() {
            super();
            this.id = ApplicationFunctionViewApp.APPLICATION_ID;
            this.name = ApplicationFunctionViewApp.APPLICATION_NAME;
            this.boCode = ApplicationFunctionViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.editDataEvent = this.editData;
        }
        viewShowed() {
        }
        editData() {
            let app = new ApplicationFunctionEditApp_1.ApplicationFunctionEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run(this.viewData);
        }
        run(...args) {
            if (!ibas.objects.isNull(args) && args.length === 1 && args[0] instanceof bo.ApplicationFunction) {
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
                boRepository.fetchApplicationFunction({
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
    ApplicationFunctionViewApp.APPLICATION_ID = "54f0d533-16e3-4b3b-be22-b8359f593cc4";
    ApplicationFunctionViewApp.APPLICATION_NAME = "initialfantasy_app_applicationfunction_view";
    ApplicationFunctionViewApp.BUSINESS_OBJECT_CODE = bo.ApplicationFunction.BUSINESS_OBJECT_CODE;
    exports.ApplicationFunctionViewApp = ApplicationFunctionViewApp;
    class ApplicationFunctionLinkServiceMapping extends ibas.BOLinkServiceMapping {
        constructor() {
            super();
            this.id = ApplicationFunctionViewApp.APPLICATION_ID;
            this.name = ApplicationFunctionViewApp.APPLICATION_NAME;
            this.boCode = ApplicationFunctionViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new ApplicationFunctionViewApp();
        }
    }
    exports.ApplicationFunctionLinkServiceMapping = ApplicationFunctionLinkServiceMapping;
});
