define(["require", "exports", "ibas/index", "./ApprovalRequestListApp"], function (require, exports, ibas, ApprovalRequestListApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApprovalRequestFunc extends ibas.ModuleFunction {
        constructor() {
            super();
            this.id = ApprovalRequestFunc.FUNCTION_ID;
            this.name = ApprovalRequestFunc.FUNCTION_NAME;
            this.description = ibas.i18n.prop(this.name);
        }
        default() {
            let app = new ApprovalRequestListApp_1.ApprovalRequestListApp();
            app.navigation = this.navigation;
            return app;
        }
    }
    ApprovalRequestFunc.FUNCTION_ID = "1b0ab3c8-9400-431a-96fc-04eac3acf635";
    ApprovalRequestFunc.FUNCTION_NAME = "initialfantasy_func_approvalrequest";
    ApprovalRequestFunc.ROOT_FILE_NAME = "initialfantasy/index";
    exports.ApprovalRequestFunc = ApprovalRequestFunc;
});
