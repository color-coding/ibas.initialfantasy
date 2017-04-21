define(["require", "exports", "ibas/index", "./OwnershipListApp"], function (require, exports, ibas, OwnershipListApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class OwnershipFunc extends ibas.ModuleFunction {
        constructor() {
            super();
            this.id = OwnershipFunc.FUNCTION_ID;
            this.name = OwnershipFunc.FUNCTION_NAME;
            this.description = ibas.i18n.prop(this.name);
        }
        default() {
            let app = new OwnershipListApp_1.OwnershipListApp();
            app.navigation = this.navigation;
            return app;
        }
    }
    OwnershipFunc.FUNCTION_ID = "4887a315-17f9-4175-8c4b-d7b7db461c6f";
    OwnershipFunc.FUNCTION_NAME = "initialfantasy_func_ownership";
    OwnershipFunc.ROOT_FILE_NAME = "initialfantasy/index";
    exports.OwnershipFunc = OwnershipFunc;
});
