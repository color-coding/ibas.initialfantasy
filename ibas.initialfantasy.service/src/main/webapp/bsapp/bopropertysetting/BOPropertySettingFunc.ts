/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        export class BOPropertySettingFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "14ceafc7-84f9-40b7-9dd6-c7e29a5bea77";
            /** 功能名称 */
            static FUNCTION_NAME = "initialfantasy_func_bopropertysetting";
            /** 构造函数 */
            constructor() {
                super();
                this.id = BOPropertySettingFunc.FUNCTION_ID;
                this.name = BOPropertySettingFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: BOPropertySettingConfigApp = new BOPropertySettingConfigApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
