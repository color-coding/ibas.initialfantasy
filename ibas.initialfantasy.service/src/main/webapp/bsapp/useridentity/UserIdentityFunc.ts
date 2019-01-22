/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        export class UserIdentityFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "7724f8a3-9d7f-4087-a3bc-e2bc4a651247";
            /** 功能名称 */
            static FUNCTION_NAME = "initialfantasy_func_useridentity";
            /** 构造函数 */
            constructor() {
                super();
                this.id = UserIdentityFunc.FUNCTION_ID;
                this.name = UserIdentityFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: UserIdentityListApp = new UserIdentityListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
