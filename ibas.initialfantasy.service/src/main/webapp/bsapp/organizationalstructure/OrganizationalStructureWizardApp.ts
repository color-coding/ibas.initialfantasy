/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { BORepositoryInitialFantasy } from "../../borep/BORepositories";

/** 向导应用-组织-结构 */
export class OrganizationalStructureWizardApp extends ibas.Application<IOrganizationalStructureWizardView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "62eb02de-54be-43f5-b13e-a8acc76c1091";
    /** 应用名称 */
    static APPLICATION_NAME: string = "initialfantasy_app_organizationalstructure_wizard";
    /** 构造函数 */
    constructor() {
        super();
        this.id = OrganizationalStructureWizardApp.APPLICATION_ID;
        this.name = OrganizationalStructureWizardApp.APPLICATION_NAME;
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
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        super.run();
    }
}
/** 视图-组织-结构 */
export interface IOrganizationalStructureWizardView extends ibas.IView {

}