define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./BOFilteringEditApp"], function (require, exports, ibas, bo, BORepositories_1, BOFilteringEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BOFilteringViewApp extends ibas.BOViewService {
        constructor() {
            super();
            this.id = BOFilteringViewApp.APPLICATION_ID;
            this.name = BOFilteringViewApp.APPLICATION_NAME;
            this.boCode = BOFilteringViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.editDataEvent = this.editData;
        }
        viewShowed() {
        }
        editData() {
            let app = new BOFilteringEditApp_1.BOFilteringEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run(this.viewData);
        }
        run(...args) {
            if (!ibas.objects.isNull(args) && args.length === 1 && args[0] instanceof bo.BOFiltering) {
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
                boRepository.fetchBOFiltering({
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
    BOFilteringViewApp.APPLICATION_ID = "a8db8097-18e3-49f5-9df8-88ac59a74035";
    BOFilteringViewApp.APPLICATION_NAME = "initialfantasy_app_bofiltering_view";
    BOFilteringViewApp.BUSINESS_OBJECT_CODE = bo.BOFiltering.BUSINESS_OBJECT_CODE;
    exports.BOFilteringViewApp = BOFilteringViewApp;
    class BOFilteringLinkServiceMapping extends ibas.BOLinkServiceMapping {
        constructor() {
            super();
            this.id = BOFilteringViewApp.APPLICATION_ID;
            this.name = BOFilteringViewApp.APPLICATION_NAME;
            this.boCode = BOFilteringViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new BOFilteringViewApp();
        }
    }
    exports.BOFilteringLinkServiceMapping = BOFilteringLinkServiceMapping;
});
