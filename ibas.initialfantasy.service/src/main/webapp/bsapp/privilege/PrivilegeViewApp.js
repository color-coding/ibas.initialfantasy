define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories", "./PrivilegeEditApp"], function (require, exports, ibas, bo, BORepositories_1, PrivilegeEditApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PrivilegeViewApp extends ibas.BOViewService {
        constructor() {
            super();
            this.id = PrivilegeViewApp.APPLICATION_ID;
            this.name = PrivilegeViewApp.APPLICATION_NAME;
            this.boCode = PrivilegeViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.editDataEvent = this.editData;
        }
        viewShowed() {
        }
        editData() {
            let app = new PrivilegeEditApp_1.PrivilegeEditApp();
            app.navigation = this.navigation;
            app.viewShower = this.viewShower;
            app.run(this.viewData);
        }
        run(...args) {
            if (!ibas.objects.isNull(args) && args.length === 1 && args[0] instanceof bo.Privilege) {
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
                boRepository.fetchPrivilege({
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
    PrivilegeViewApp.APPLICATION_ID = "943ac726-6da7-4584-8846-c29d1f166c3d";
    PrivilegeViewApp.APPLICATION_NAME = "initialfantasy_app_privilege_view";
    PrivilegeViewApp.BUSINESS_OBJECT_CODE = bo.Privilege.BUSINESS_OBJECT_CODE;
    exports.PrivilegeViewApp = PrivilegeViewApp;
    class PrivilegeLinkServiceMapping extends ibas.BOLinkServiceMapping {
        constructor() {
            super();
            this.id = PrivilegeViewApp.APPLICATION_ID;
            this.name = PrivilegeViewApp.APPLICATION_NAME;
            this.boCode = PrivilegeViewApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        create() {
            return new PrivilegeViewApp();
        }
    }
    exports.PrivilegeLinkServiceMapping = PrivilegeLinkServiceMapping;
});
