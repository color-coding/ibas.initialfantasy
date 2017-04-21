define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./OrganizationEditApp"], function (require, exports, ibas, bo, BORepositories_1, OrganizationEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class OrganizationChooseApp extends ibas.BOChooseService {
        constructor() {
            super();
            this.id = OrganizationChooseApp.APPLICATION_ID;
            this.name = OrganizationChooseApp.APPLICATION_NAME;
            this.boCode = OrganizationChooseApp.BUSINESS_OBJECT_CODE;
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
                boRepository.fetchOrganization({
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
            let app = new OrganizationEditApp_1.OrganizationEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run();
        }
    }
    OrganizationChooseApp.APPLICATION_ID = "9bb17fcb-10a1-41b8-90bb-c7b2433610da";
    OrganizationChooseApp.APPLICATION_NAME = "initialfantasy_app_organization_choose";
    OrganizationChooseApp.BUSINESS_OBJECT_CODE = bo.Organization.BUSINESS_OBJECT_CODE;
    exports.OrganizationChooseApp = OrganizationChooseApp;
    class OrganizationChooseServiceMapping extends ibas.BOChooseServiceMapping {
        constructor() {
            super();
            this.id = OrganizationChooseApp.APPLICATION_ID;
            this.name = OrganizationChooseApp.APPLICATION_NAME;
            this.boCode = OrganizationChooseApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new OrganizationChooseApp();
        }
    }
    exports.OrganizationChooseServiceMapping = OrganizationChooseServiceMapping;
});
