define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./ApplicationPlatformEditApp"], function (require, exports, ibas, bo, BORepositories_1, ApplicationPlatformEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApplicationPlatformViewApp extends ibas.BOViewService {
        constructor() {
            super();
            this.id = ApplicationPlatformViewApp.APPLICATION_ID;
            this.name = ApplicationPlatformViewApp.APPLICATION_NAME;
            this.boCode = ApplicationPlatformViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.editDataEvent = this.editData;
        }
        viewShowed() {
        }
        editData() {
            let app = new ApplicationPlatformEditApp_1.ApplicationPlatformEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run(this.viewData);
        }
        run(...args) {
            if (!ibas.objects.isNull(args) && args.length === 1 && args[0] instanceof bo.ApplicationPlatform) {
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
                boRepository.fetchApplicationPlatform({
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
    ApplicationPlatformViewApp.APPLICATION_ID = "93fc73e7-83c2-47d8-b216-327392645a8a";
    ApplicationPlatformViewApp.APPLICATION_NAME = "initialfantasy_app_applicationplatform_view";
    ApplicationPlatformViewApp.BUSINESS_OBJECT_CODE = bo.ApplicationPlatform.BUSINESS_OBJECT_CODE;
    exports.ApplicationPlatformViewApp = ApplicationPlatformViewApp;
    class ApplicationPlatformLinkServiceMapping extends ibas.BOLinkServiceMapping {
        constructor() {
            super();
            this.id = ApplicationPlatformViewApp.APPLICATION_ID;
            this.name = ApplicationPlatformViewApp.APPLICATION_NAME;
            this.boCode = ApplicationPlatformViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new ApplicationPlatformViewApp();
        }
    }
    exports.ApplicationPlatformLinkServiceMapping = ApplicationPlatformLinkServiceMapping;
});
