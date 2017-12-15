/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";

/** 应用-系统变量 */
export class VariableChooseApp extends ibas.BOChooseService<IVariableChooseView, ibas.KeyValue> {

    /** 应用标识 */
    static APPLICATION_ID: string = "86427b85-9532-4c93-b40e-f65da9bf983a";
    /** 应用名称 */
    static APPLICATION_NAME: string = "initialfantasy_app_variable_choose";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.BO_CODE_SYSTEM_VARIABLE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = VariableChooseApp.APPLICATION_ID;
        this.name = VariableChooseApp.APPLICATION_NAME;
        this.boCode = VariableChooseApp.BUSINESS_OBJECT_CODE;
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
        this.view.showData(ibas.variablesManager.all());
    }
    /** 查询数据 */
    protected fetchData(criteria: ibas.ICriteria): void {
        this.view.showData(ibas.variablesManager.all());
    }
    /** 新建数据 */
    protected newData(): void {
        // 关闭自身
        this.destroy();
    }
}
/** 视图-系统权限 */
export interface IVariableChooseView extends ibas.IBOChooseView {
    /** 显示数据 */
    showData(datas: ibas.KeyValue[]): void;
}
/** 系统权限选择服务映射 */
export class VariableChooseServiceMapping extends ibas.BOChooseServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = VariableChooseApp.APPLICATION_ID;
        this.name = VariableChooseApp.APPLICATION_NAME;
        this.boCode = VariableChooseApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IServiceCaller> {
        return new VariableChooseApp();
    }
}
