/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        export class IdentityFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "72f3c811-d353-47ff-970e-f6179eced9eb";
            /** 功能名称 */
            static FUNCTION_NAME = "initialfantasy_func_identity";
            /** 构造函数 */
            constructor() {
                super();
                this.id = IdentityFunc.FUNCTION_ID;
                this.name = IdentityFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: IdentityListApp = new IdentityListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
