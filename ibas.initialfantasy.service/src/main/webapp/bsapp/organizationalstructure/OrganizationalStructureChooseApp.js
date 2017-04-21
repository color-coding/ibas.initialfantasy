define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./OrganizationalStructureEditApp"], function (require, exports, ibas, bo, BORepositories_1, OrganizationalStructureEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class OrganizationalStructureChooseApp extends ibas.BOChooseService {
        constructor() {
            super();
            this.id = OrganizationalStructureChooseApp.APPLICATION_ID;
            this.name = OrganizationalStructureChooseApp.APPLICATION_NAME;
            this.boCode = OrganizationalStructureChooseApp.BUSINESS_OBJECT_CODE;
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
                boRepository.fetchOrganizationalStructure({
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
            let app = new OrganizationalStructureEditApp_1.OrganizationalStructureEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run();
        }
    }
    OrganizationalStructureChooseApp.APPLICATION_ID = "734b75eb-5097-4aa5-b59b-e4562ca17afe";
    OrganizationalStructureChooseApp.APPLICATION_NAME = "initialfantasy_app_organizationalstructure_choose";
    OrganizationalStructureChooseApp.BUSINESS_OBJECT_CODE = bo.OrganizationalStructure.BUSINESS_OBJECT_CODE;
    exports.OrganizationalStructureChooseApp = OrganizationalStructureChooseApp;
    class OrganizationalStructureChooseServiceMapping extends ibas.BOChooseServiceMapping {
        constructor() {
            super();
            this.id = OrganizationalStructureChooseApp.APPLICATION_ID;
            this.name = OrganizationalStructureChooseApp.APPLICATION_NAME;
            this.boCode = OrganizationalStructureChooseApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new OrganizationalStructureChooseApp();
        }
    }
    exports.OrganizationalStructureChooseServiceMapping = OrganizationalStructureChooseServiceMapping;
});
