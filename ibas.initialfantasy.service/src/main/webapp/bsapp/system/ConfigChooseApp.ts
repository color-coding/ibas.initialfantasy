/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";

/** 应用-系统配置 */
export class ConfigChooseApp extends ibas.BOChooseService<IConfigChooseView, ibas.KeyValue> {

    /** 应用标识 */
    static APPLICATION_ID: string = "58ccc370-935c-49b7-984c-d4d33712c507";
    /** 应用名称 */
    static APPLICATION_NAME: string = "initialfantasy_app_config_choose";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.BO_CODE_SYSTEM_CONFIG;
    /** 构造函数 */
    constructor() {
        super();
        this.id = ConfigChooseApp.APPLICATION_ID;
        this.name = ConfigChooseApp.APPLICATION_NAME;
        this.boCode = ConfigChooseApp.BUSINESS_OBJECT_CODE;
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
        this.view.showData(ibas.config.all());
    }
    /** 查询数据 */
    protected fetchData(criteria: ibas.ICriteria): void {
        this.view.showData(ibas.config.all());
    }
    /** 新建数据 */
    protected newData(): void {
        // 关闭自身
        this.destroy();
    }
}
/** 视图-系统权限 */
export interface IConfigChooseView extends ibas.IBOChooseView {
    /** 显示数据 */
    showData(datas: ibas.KeyValue[]): void;
}
/** 系统权限选择服务映射 */
export class ConfigChooseServiceMapping extends ibas.BOChooseServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = ConfigChooseApp.APPLICATION_ID;
        this.name = ConfigChooseApp.APPLICATION_NAME;
        this.boCode = ConfigChooseApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IServiceContract> {
        return new ConfigChooseApp();
    }
}
