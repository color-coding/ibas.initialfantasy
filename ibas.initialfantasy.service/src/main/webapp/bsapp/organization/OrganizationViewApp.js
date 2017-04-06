define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./OrganizationEditApp"], function (require, exports, ibas, bo, BORepositories_1, OrganizationEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class OrganizationViewApp extends ibas.BOViewService {
        constructor() {
            super();
            this.id = OrganizationViewApp.APPLICATION_ID;
            this.name = OrganizationViewApp.APPLICATION_NAME;
            this.boCode = OrganizationViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.editDataEvent = this.editData;
        }
        viewShowed() {
        }
        editData() {
            let app = new OrganizationEditApp_1.OrganizationEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run(this.viewData);
        }
        run(...args) {
            if (!ibas.objects.isNull(args) && args.length === 1 && args[0] instanceof bo.Organization) {
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
                boRepository.fetchOrganization({
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
    OrganizationViewApp.APPLICATION_ID = "60058420-e03f-419e-92d8-e450844610d9";
    OrganizationViewApp.APPLICATION_NAME = "initialfantasy_app_organization_view";
    OrganizationViewApp.BUSINESS_OBJECT_CODE = bo.Organization.BUSINESS_OBJECT_CODE;
    exports.OrganizationViewApp = OrganizationViewApp;
    class OrganizationLinkServiceMapping extends ibas.BOLinkServiceMapping {
        constructor() {
            super();
            this.id = OrganizationViewApp.APPLICATION_ID;
            this.name = OrganizationViewApp.APPLICATION_NAME;
            this.boCode = OrganizationViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new OrganizationViewApp();
        }
    }
    exports.OrganizationLinkServiceMapping = OrganizationLinkServiceMapping;
});
