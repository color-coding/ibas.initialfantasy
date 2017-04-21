define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./OwnershipEditApp"], function (require, exports, ibas, bo, BORepositories_1, OwnershipEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class OwnershipViewApp extends ibas.BOViewService {
        constructor() {
            super();
            this.id = OwnershipViewApp.APPLICATION_ID;
            this.name = OwnershipViewApp.APPLICATION_NAME;
            this.boCode = OwnershipViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.editDataEvent = this.editData;
        }
        viewShowed() {
        }
        editData() {
            let app = new OwnershipEditApp_1.OwnershipEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run(this.viewData);
        }
        run(...args) {
            if (!ibas.objects.isNull(args) && args.length === 1 && args[0] instanceof bo.Ownership) {
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
                boRepository.fetchOwnership({
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
    OwnershipViewApp.APPLICATION_ID = "08589e98-0332-4688-9267-bfb1e19b7e09";
    OwnershipViewApp.APPLICATION_NAME = "initialfantasy_app_ownership_view";
    OwnershipViewApp.BUSINESS_OBJECT_CODE = bo.Ownership.BUSINESS_OBJECT_CODE;
    exports.OwnershipViewApp = OwnershipViewApp;
    class OwnershipLinkServiceMapping extends ibas.BOLinkServiceMapping {
        constructor() {
            super();
            this.id = OwnershipViewApp.APPLICATION_ID;
            this.name = OwnershipViewApp.APPLICATION_NAME;
            this.boCode = OwnershipViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new OwnershipViewApp();
        }
    }
    exports.OwnershipLinkServiceMapping = OwnershipLinkServiceMapping;
});
