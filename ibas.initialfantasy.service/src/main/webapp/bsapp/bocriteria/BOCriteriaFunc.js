define(["require", "exports", "ibas/index", "./BOCriteriaListApp"], function (require, exports, ibas, BOCriteriaListApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BOCriteriaFunc extends ibas.ModuleFunction {
        constructor() {
            super();
            this.id = BOCriteriaFunc.FUNCTION_ID;
            this.name = BOCriteriaFunc.FUNCTION_NAME;
            this.description = ibas.i18n.prop(this.name);
        }
        default() {
            let app = new BOCriteriaListApp_1.BOCriteriaListApp();
            app.navigation = this.navigation;
            return app;
        }
    }
    BOCriteriaFunc.FUNCTION_ID = "61799edf-c52d-43bf-80ee-6d550223c7a9";
    BOCriteriaFunc.FUNCTION_NAME = "initialfantasy_func_bocriteria";
    BOCriteriaFunc.ROOT_FILE_NAME = "initialfantasy/index";
    exports.BOCriteriaFunc = BOCriteriaFunc;
});
