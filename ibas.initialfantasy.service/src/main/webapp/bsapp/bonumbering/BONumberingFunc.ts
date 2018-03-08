/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {

        export class BONumberingFunc extends ibas.ModuleFunction {

            /** 功能标识 */
            static FUNCTION_ID = "a59ebe40-1198-4615-b2e9-fd0d31540d0e";
            /** 功能名称 */
            static FUNCTION_NAME = "initialfantasy_func_bonumbering";
            /** 构造函数 */
            constructor() {
                super();
                this.id = BONumberingFunc.FUNCTION_ID;
                this.name = BONumberingFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: BONumberingListApp = new BONumberingListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
