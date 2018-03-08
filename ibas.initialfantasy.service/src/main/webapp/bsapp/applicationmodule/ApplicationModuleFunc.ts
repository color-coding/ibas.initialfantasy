/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {

        export class ApplicationModuleFunc extends ibas.ModuleFunction {

            /** 功能标识 */
            static FUNCTION_ID = "dc01b4c5-cfe6-4829-9b30-075d385cdcfa";
            /** 功能名称 */
            static FUNCTION_NAME = "initialfantasy_func_applicationmodule";
            /** 构造函数 */
            constructor() {
                super();
                this.id = ApplicationModuleFunc.FUNCTION_ID;
                this.name = ApplicationModuleFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: ApplicationModuleListApp = new ApplicationModuleListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
