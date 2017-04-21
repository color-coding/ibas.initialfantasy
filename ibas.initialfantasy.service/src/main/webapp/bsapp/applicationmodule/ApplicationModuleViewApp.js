define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./ApplicationModuleEditApp"], function (require, exports, ibas, bo, BORepositories_1, ApplicationModuleEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApplicationModuleViewApp extends ibas.BOViewService {
        constructor() {
            super();
            this.id = ApplicationModuleViewApp.APPLICATION_ID;
            this.name = ApplicationModuleViewApp.APPLICATION_NAME;
            this.boCode = ApplicationModuleViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.editDataEvent = this.editData;
        }
        viewShowed() {
        }
        editData() {
            let app = new ApplicationModuleEditApp_1.ApplicationModuleEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run(this.viewData);
        }
        run(...args) {
            if (!ibas.objects.isNull(args) && args.length === 1 && args[0] instanceof bo.ApplicationModule) {
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
                boRepository.fetchApplicationModule({
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
    ApplicationModuleViewApp.APPLICATION_ID = "ceddfe00-8b01-4123-bf58-161d2f9f511b";
    ApplicationModuleViewApp.APPLICATION_NAME = "initialfantasy_app_applicationmodule_view";
    ApplicationModuleViewApp.BUSINESS_OBJECT_CODE = bo.ApplicationModule.BUSINESS_OBJECT_CODE;
    exports.ApplicationModuleViewApp = ApplicationModuleViewApp;
    class ApplicationModuleLinkServiceMapping extends ibas.BOLinkServiceMapping {
        constructor() {
            super();
            this.id = ApplicationModuleViewApp.APPLICATION_ID;
            this.name = ApplicationModuleViewApp.APPLICATION_NAME;
            this.boCode = ApplicationModuleViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new ApplicationModuleViewApp();
        }
    }
    exports.ApplicationModuleLinkServiceMapping = ApplicationModuleLinkServiceMapping;
});
