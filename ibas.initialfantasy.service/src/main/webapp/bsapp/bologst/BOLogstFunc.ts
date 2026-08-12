/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        export class BOLogstFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "e8a1b3c2-5d4f-4e8a-9b6c-1d2e3f4a5b6c";
            /** 功能名称 */
            static FUNCTION_NAME = "initialfantasy_func_bologst";
            /** 构造函数 */
            constructor() {
                super();
                this.id = BOLogstFunc.FUNCTION_ID;
                this.name = BOLogstFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: BOLogstListApp = new BOLogstListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
