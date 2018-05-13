/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        export class ApplicationElementFunc extends ibas.ModuleFunction {

            /** 功能标识 */
            static FUNCTION_ID = "3a4dd26b-1823-4d75-96a1-2e62442c7fe3";
            /** 功能名称 */
            static FUNCTION_NAME = "initialfantasy_func_applicationelement";
            /** 构造函数 */
            constructor() {
                super();
                this.id = ApplicationElementFunc.FUNCTION_ID;
                this.name = ApplicationElementFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: ApplicationElementListApp = new ApplicationElementListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
