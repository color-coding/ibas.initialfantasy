define(["require", "exports", "ibas/index", "./ApprovalTemplateListApp"], function (require, exports, ibas, ApprovalTemplateListApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApprovalTemplateFunc extends ibas.ModuleFunction {
        constructor() {
            super();
            this.id = ApprovalTemplateFunc.FUNCTION_ID;
            this.name = ApprovalTemplateFunc.FUNCTION_NAME;
            this.description = ibas.i18n.prop(this.name);
        }
        default() {
            let app = new ApprovalTemplateListApp_1.ApprovalTemplateListApp();
            app.navigation = this.navigation;
            return app;
        }
    }
    ApprovalTemplateFunc.FUNCTION_ID = "3ffd5464-dc26-46aa-8ebc-b6804ecee9f1";
    ApprovalTemplateFunc.FUNCTION_NAME = "initialfantasy_func_approvaltemplate";
    ApprovalTemplateFunc.ROOT_FILE_NAME = "initialfantasy/index";
    exports.ApprovalTemplateFunc = ApprovalTemplateFunc;
});
