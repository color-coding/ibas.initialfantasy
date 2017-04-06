define(["require", "exports", "ibas/index", "./PrivilegeListApp"], function (require, exports, ibas, PrivilegeListApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PrivilegeFunc extends ibas.ModuleFunction {
        constructor() {
            super();
            this.id = PrivilegeFunc.FUNCTION_ID;
            this.name = PrivilegeFunc.FUNCTION_NAME;
            this.description = ibas.i18n.prop(this.name);
        }
        default() {
            let app = new PrivilegeListApp_1.PrivilegeListApp();
            app.navigation = this.navigation;
            return app;
        }
    }
    PrivilegeFunc.FUNCTION_ID = "19dbdd4a-1203-48fd-b79a-c80356d6e82c";
    PrivilegeFunc.FUNCTION_NAME = "initialfantasy_func_privilege";
    PrivilegeFunc.ROOT_FILE_NAME = "initialfantasy/index";
    exports.PrivilegeFunc = PrivilegeFunc;
});
