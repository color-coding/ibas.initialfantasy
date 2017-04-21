define(["require", "exports", "ibas/index", "./ApplicationFunctionListApp"], function (require, exports, ibas, ApplicationFunctionListApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApplicationFunctionFunc extends ibas.ModuleFunction {
        constructor() {
            super();
            this.id = ApplicationFunctionFunc.FUNCTION_ID;
            this.name = ApplicationFunctionFunc.FUNCTION_NAME;
            this.description = ibas.i18n.prop(this.name);
        }
        default() {
            let app = new ApplicationFunctionListApp_1.ApplicationFunctionListApp();
            app.navigation = this.navigation;
            return app;
        }
    }
    ApplicationFunctionFunc.FUNCTION_ID = "fe5f9163-c3f3-4e82-9009-57fedd58e22b";
    ApplicationFunctionFunc.FUNCTION_NAME = "initialfantasy_func_applicationfunction";
    ApplicationFunctionFunc.ROOT_FILE_NAME = "initialfantasy/index";
    exports.ApplicationFunctionFunc = ApplicationFunctionFunc;
});
