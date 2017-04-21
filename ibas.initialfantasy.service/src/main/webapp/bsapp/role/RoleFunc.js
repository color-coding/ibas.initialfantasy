define(["require", "exports", "ibas/index", "./RoleListApp"], function (require, exports, ibas, RoleListApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RoleFunc extends ibas.ModuleFunction {
        constructor() {
            super();
            this.id = RoleFunc.FUNCTION_ID;
            this.name = RoleFunc.FUNCTION_NAME;
            this.description = ibas.i18n.prop(this.name);
        }
        default() {
            let app = new RoleListApp_1.RoleListApp();
            app.navigation = this.navigation;
            return app;
        }
    }
    RoleFunc.FUNCTION_ID = "620457a3-bdd4-4653-acba-bced690645d8";
    RoleFunc.FUNCTION_NAME = "initialfantasy_func_role";
    RoleFunc.ROOT_FILE_NAME = "initialfantasy/index";
    exports.RoleFunc = RoleFunc;
});
