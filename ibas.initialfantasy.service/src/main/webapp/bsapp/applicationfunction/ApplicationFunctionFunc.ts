/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {

        export class ApplicationFunctionFunc extends ibas.ModuleFunction {

            /** 功能标识 */
            static FUNCTION_ID = "ccd7aa52-6f28-4dda-b4c3-bd1fd1dbb63d";
            /** 功能名称 */
            static FUNCTION_NAME = "initialfantasy_func_applicationfunction";
            /** 构造函数 */
            constructor() {
                super();
                this.id = ApplicationFunctionFunc.FUNCTION_ID;
                this.name = ApplicationFunctionFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: ApplicationFunctionListApp = new ApplicationFunctionListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}