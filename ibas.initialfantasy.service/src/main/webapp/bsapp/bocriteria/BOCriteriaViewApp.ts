/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "../../3rdparty/ibas/index";
import { BORepositoryInitialFantasy } from "../../borep/BORepositories";
import * as bo from "../../borep/bo/index";
import { BOCriteriaEditApp } from "./BOCriteriaEditApp";

/** 查看应用-业务对象检索条件 */
export class BOCriteriaViewApp extends ibas.BOViewApplication<IBOCriteriaViewView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "57903aa9-7ddc-40d8-9faa-1578a65857ed";
    /** 应用名称 */
    static APPLICATION_NAME: string = "mu_initialfantasy_app_bocriteria_view";

    constructor() {
        super();
        this.id = BOCriteriaViewApp.APPLICATION_ID;
        this.name = BOCriteriaViewApp.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件

    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
    }
    /** 编辑数据，参数：目标数据 */
    protected editData(): void {
        let app = new BOCriteriaEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run(this.viewData);
    }
    protected viewData: bo.BOCriteria;
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let data: bo.BOCriteria = arguments[0];
        if (ibas.object.isNull(data)) {
            throw new Error(ibas.i18n.prop("msg_invalid_parameter", "view data"));
        }
        this.viewData = data;
        super.run();
    }
}
/** 视图-业务对象检索条件 */
export interface IBOCriteriaViewView extends ibas.IBOViewView {

}
