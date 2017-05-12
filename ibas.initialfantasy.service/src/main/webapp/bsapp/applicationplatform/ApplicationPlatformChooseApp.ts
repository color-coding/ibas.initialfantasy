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
import { ApplicationPlatformEditApp } from "./ApplicationPlatformEditApp";

/** 应用-应用程序平台 */
export class ApplicationPlatformChooseApp extends ibas.BOChooseService<IApplicationPlatformChooseView, bo.ApplicationPlatform> {

    /** 应用标识 */
    static APPLICATION_ID: string = "8ee10a6d-cebf-4ead-b182-6d6e92d944ff";
    /** 应用名称 */
    static APPLICATION_NAME: string = "initialfantasy_app_applicationplatform_choose";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.ApplicationPlatform.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = ApplicationPlatformChooseApp.APPLICATION_ID;
        this.name = ApplicationPlatformChooseApp.APPLICATION_NAME;
        this.boCode = ApplicationPlatformChooseApp.BUSINESS_OBJECT_CODE;
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
    /** 查询数据 */
    protected fetchData(criteria: ibas.ICriteria): void {
        try {
            this.busy(true);
            let that = this;
            let boRepository: BORepositoryInitialFantasy = new BORepositoryInitialFantasy();
            boRepository.fetchApplicationPlatform({
                criteria: criteria,
                onCompleted(opRslt: ibas.IOperationResult<bo.ApplicationPlatform>): void {
                    try {
                        if (opRslt.resultCode !== 0) {
                            throw new Error(opRslt.message);
                        }
                        if (opRslt.resultObjects.length === 1
                            && ibas.config.get(ibas.CONFIG_ITEM_AUTO_CHOOSE_DATA, true)) {
                            // 仅一条数据，直接选择
                            that.chooseData(opRslt.resultObjects);
                        } else {
                            if (!that.isViewShowed()) {
                                // 没显示视图，先显示
                                that.show();
                            }
                            that.view.showData(opRslt.resultObjects);
                            that.busy(false);
                        }
                    } catch (error) {
                        that.messages(error);
                    }
                }
            });
            this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_fetching_data"));
        } catch (error) {
            this.messages(error);
        }
    }
    /** 新建数据 */
    protected newData(): void {
        // 关闭自身
        this.destroy();
        // 调用编辑应用
        let app = new ApplicationPlatformEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run();
    }
}
/** 视图-应用程序平台 */
export interface IApplicationPlatformChooseView extends ibas.IBOChooseView {
    /** 显示数据 */
    showData(datas: bo.ApplicationPlatform[]): void;
}
/** 应用程序平台选择服务映射 */
export class ApplicationPlatformChooseServiceMapping extends ibas.BOChooseServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = ApplicationPlatformChooseApp.APPLICATION_ID;
        this.name = ApplicationPlatformChooseApp.APPLICATION_NAME;
        this.boCode = ApplicationPlatformChooseApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IServiceContract> {
        return new ApplicationPlatformChooseApp();
    }
}
