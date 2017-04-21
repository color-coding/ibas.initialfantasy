define(["require", "exports", "ibas/index", "./OrganizationListApp"], function (require, exports, ibas, OrganizationListApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class OrganizationFunc extends ibas.ModuleFunction {
        constructor() {
            super();
            this.id = OrganizationFunc.FUNCTION_ID;
            this.name = OrganizationFunc.FUNCTION_NAME;
            this.description = ibas.i18n.prop(this.name);
        }
        default() {
            let app = new OrganizationListApp_1.OrganizationListApp();
            app.navigation = this.navigation;
            return app;
        }
    }
    OrganizationFunc.FUNCTION_ID = "af395294-f0e0-4958-b620-fda383586e76";
    OrganizationFunc.FUNCTION_NAME = "initialfantasy_func_organization";
    OrganizationFunc.ROOT_FILE_NAME = "initialfantasy/index";
    exports.OrganizationFunc = OrganizationFunc;
});
