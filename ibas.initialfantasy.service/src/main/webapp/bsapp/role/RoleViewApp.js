define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./RoleEditApp"], function (require, exports, ibas, bo, BORepositories_1, RoleEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RoleViewApp extends ibas.BOViewService {
        constructor() {
            super();
            this.id = RoleViewApp.APPLICATION_ID;
            this.name = RoleViewApp.APPLICATION_NAME;
            this.boCode = RoleViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.editDataEvent = this.editData;
        }
        viewShowed() {
        }
        editData() {
            let app = new RoleEditApp_1.RoleEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run(this.viewData);
        }
        run(...args) {
            if (!ibas.objects.isNull(args) && args.length === 1 && args[0] instanceof bo.Role) {
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
                boRepository.fetchRole({
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
    RoleViewApp.APPLICATION_ID = "d6eb8074-3404-43c8-8d99-4a6040d1470c";
    RoleViewApp.APPLICATION_NAME = "initialfantasy_app_role_view";
    RoleViewApp.BUSINESS_OBJECT_CODE = bo.Role.BUSINESS_OBJECT_CODE;
    exports.RoleViewApp = RoleViewApp;
    class RoleLinkServiceMapping extends ibas.BOLinkServiceMapping {
        constructor() {
            super();
            this.id = RoleViewApp.APPLICATION_ID;
            this.name = RoleViewApp.APPLICATION_NAME;
            this.boCode = RoleViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new RoleViewApp();
        }
    }
    exports.RoleLinkServiceMapping = RoleLinkServiceMapping;
});
