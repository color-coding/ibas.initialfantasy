/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {

        export class BOCriteriaFunc extends ibas.ModuleFunction {

            /** 功能标识 */
            static FUNCTION_ID = "b245b6e2-ed38-45f3-bce1-fde58ecc1384";
            /** 功能名称 */
            static FUNCTION_NAME = "initialfantasy_func_bocriteria";
            /** 构造函数 */
            constructor() {
                super();
                this.id = BOCriteriaFunc.FUNCTION_ID;
                this.name = BOCriteriaFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: BOCriteriaListApp = new BOCriteriaListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
