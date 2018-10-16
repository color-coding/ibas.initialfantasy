/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        export class PostingPeriodFunc extends ibas.ModuleFunction {
            /** 功能标识 */
            static FUNCTION_ID = "b07f1b4c-758d-4ff6-8eeb-19a4b6a5a8bd";
            /** 功能名称 */
            static FUNCTION_NAME = "initialfantasy_func_postingperiod";
            /** 构造函数 */
            constructor() {
                super();
                this.id = PostingPeriodFunc.FUNCTION_ID;
                this.name = PostingPeriodFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: PostingPeriodListApp = new PostingPeriodListApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}
