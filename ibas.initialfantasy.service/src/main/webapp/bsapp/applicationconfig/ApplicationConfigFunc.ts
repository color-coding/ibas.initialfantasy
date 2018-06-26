/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        export class ApplicationConfigFunc extends ibas.ModuleFunction {

            /** 功能标识 */
            static FUNCTION_ID = "2b2afcf1-e673-420c-806b-2016fbecb8e8";
            /** 功能名称 */
            static FUNCTION_NAME = "initialfantasy_func_applicationconfig";
            /** 构造函数 */
            constructor() {
                super();
                this.id = ApplicationConfigFunc.FUNCTION_ID;
                this.name = ApplicationConfigFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: ApplicationConfigListApp = new ApplicationConfigListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
