define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./OrganizationalStructureEditApp"], function (require, exports, ibas, bo, BORepositories_1, OrganizationalStructureEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class OrganizationalStructureViewApp extends ibas.BOViewService {
        constructor() {
            super();
            this.id = OrganizationalStructureViewApp.APPLICATION_ID;
            this.name = OrganizationalStructureViewApp.APPLICATION_NAME;
            this.boCode = OrganizationalStructureViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.editDataEvent = this.editData;
        }
        viewShowed() {
        }
        editData() {
            let app = new OrganizationalStructureEditApp_1.OrganizationalStructureEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run(this.viewData);
        }
        run(...args) {
            if (!ibas.objects.isNull(args) && args.length === 1 && args[0] instanceof bo.OrganizationalStructure) {
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
                boRepository.fetchOrganizationalStructure({
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
    OrganizationalStructureViewApp.APPLICATION_ID = "717d75ed-c8c0-4cb5-b21b-8a888c86655b";
    OrganizationalStructureViewApp.APPLICATION_NAME = "initialfantasy_app_organizationalstructure_view";
    OrganizationalStructureViewApp.BUSINESS_OBJECT_CODE = bo.OrganizationalStructure.BUSINESS_OBJECT_CODE;
    exports.OrganizationalStructureViewApp = OrganizationalStructureViewApp;
    class OrganizationalStructureLinkServiceMapping extends ibas.BOLinkServiceMapping {
        constructor() {
            super();
            this.id = OrganizationalStructureViewApp.APPLICATION_ID;
            this.name = OrganizationalStructureViewApp.APPLICATION_NAME;
            this.boCode = OrganizationalStructureViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new OrganizationalStructureViewApp();
        }
    }
    exports.OrganizationalStructureLinkServiceMapping = OrganizationalStructureLinkServiceMapping;
});
