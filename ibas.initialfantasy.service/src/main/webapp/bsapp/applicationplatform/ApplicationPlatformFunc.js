define(["require", "exports", "ibas/index", "./ApplicationPlatformListApp"], function (require, exports, ibas, ApplicationPlatformListApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApplicationPlatformFunc extends ibas.ModuleFunction {
        constructor() {
            super();
            this.id = ApplicationPlatformFunc.FUNCTION_ID;
            this.name = ApplicationPlatformFunc.FUNCTION_NAME;
            this.description = ibas.i18n.prop(this.name);
        }
        default() {
            let app = new ApplicationPlatformListApp_1.ApplicationPlatformListApp();
            app.navigation = this.navigation;
            return app;
        }
    }
    ApplicationPlatformFunc.FUNCTION_ID = "8766d481-0dda-42ec-b439-aa33e81a2d59";
    ApplicationPlatformFunc.FUNCTION_NAME = "initialfantasy_func_applicationplatform";
    ApplicationPlatformFunc.ROOT_FILE_NAME = "initialfantasy/index";
    exports.ApplicationPlatformFunc = ApplicationPlatformFunc;
});
