/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {

        export class BOInformationFunc extends ibas.ModuleFunction {

            /** 功能标识 */
            static FUNCTION_ID = "78c4cacf-031f-46aa-83d7-03db8d8b8fb6";
            /** 功能名称 */
            static FUNCTION_NAME = "initialfantasy_func_boinformation";
            /** 构造函数 */
            constructor() {
                super();
                this.id = BOInformationFunc.FUNCTION_ID;
                this.name = BOInformationFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: BOInformationListApp = new BOInformationListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}