define(["require", "exports", "ibas/index", "./OrganizationalStructureListApp"], function (require, exports, ibas, OrganizationalStructureListApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class OrganizationalStructureFunc extends ibas.ModuleFunction {
        constructor() {
            super();
            this.id = OrganizationalStructureFunc.FUNCTION_ID;
            this.name = OrganizationalStructureFunc.FUNCTION_NAME;
            this.description = ibas.i18n.prop(this.name);
        }
        default() {
            let app = new OrganizationalStructureListApp_1.OrganizationalStructureListApp();
            app.navigation = this.navigation;
            return app;
        }
    }
    OrganizationalStructureFunc.FUNCTION_ID = "56eb204c-be84-4811-9680-d6ac81711f9b";
    OrganizationalStructureFunc.FUNCTION_NAME = "initialfantasy_func_organizationalstructure";
    OrganizationalStructureFunc.ROOT_FILE_NAME = "initialfantasy/index";
    exports.OrganizationalStructureFunc = OrganizationalStructureFunc;
});
