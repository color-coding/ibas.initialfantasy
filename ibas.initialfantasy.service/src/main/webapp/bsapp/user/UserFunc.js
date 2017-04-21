define(["require", "exports", "ibas/index", "./UserListApp"], function (require, exports, ibas, UserListApp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UserFunc extends ibas.ModuleFunction {
        constructor() {
            super();
            this.id = UserFunc.FUNCTION_ID;
            this.name = UserFunc.FUNCTION_NAME;
            this.description = ibas.i18n.prop(this.name);
        }
        default() {
            let app = new UserListApp_1.UserListApp();
            app.navigation = this.navigation;
            return app;
        }
    }
    UserFunc.FUNCTION_ID = "656651b4-3743-47a8-b456-486ced5c1c69";
    UserFunc.FUNCTION_NAME = "initialfantasy_func_user";
    UserFunc.ROOT_FILE_NAME = "initialfantasy/index";
    exports.UserFunc = UserFunc;
});
