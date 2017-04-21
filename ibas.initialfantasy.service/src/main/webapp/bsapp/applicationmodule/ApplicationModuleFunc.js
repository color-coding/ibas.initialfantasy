define(["require", "exports", "ibas/index", "./ApplicationModuleListApp"], function (require, exports, ibas, ApplicationModuleListApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApplicationModuleFunc extends ibas.ModuleFunction {
        constructor() {
            super();
            this.id = ApplicationModuleFunc.FUNCTION_ID;
            this.name = ApplicationModuleFunc.FUNCTION_NAME;
            this.description = ibas.i18n.prop(this.name);
        }
        default() {
            let app = new ApplicationModuleListApp_1.ApplicationModuleListApp();
            app.navigation = this.navigation;
            return app;
        }
    }
    ApplicationModuleFunc.FUNCTION_ID = "31fb509c-f31c-4dd7-a7a8-ce925b2896e6";
    ApplicationModuleFunc.FUNCTION_NAME = "initialfantasy_func_applicationmodule";
    ApplicationModuleFunc.ROOT_FILE_NAME = "initialfantasy/index";
    exports.ApplicationModuleFunc = ApplicationModuleFunc;
});
