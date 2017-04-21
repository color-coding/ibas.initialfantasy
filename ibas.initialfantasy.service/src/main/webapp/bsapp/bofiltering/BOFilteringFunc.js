define(["require", "exports", "ibas/index", "./BOFilteringListApp"], function (require, exports, ibas, BOFilteringListApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BOFilteringFunc extends ibas.ModuleFunction {
        constructor() {
            super();
            this.id = BOFilteringFunc.FUNCTION_ID;
            this.name = BOFilteringFunc.FUNCTION_NAME;
            this.description = ibas.i18n.prop(this.name);
        }
        default() {
            let app = new BOFilteringListApp_1.BOFilteringListApp();
            app.navigation = this.navigation;
            return app;
        }
    }
    BOFilteringFunc.FUNCTION_ID = "5c6c94b4-bf9f-40ab-9c80-e8f98e8f7db6";
    BOFilteringFunc.FUNCTION_NAME = "initialfantasy_func_bofiltering";
    BOFilteringFunc.ROOT_FILE_NAME = "initialfantasy/index";
    exports.BOFilteringFunc = BOFilteringFunc;
});
