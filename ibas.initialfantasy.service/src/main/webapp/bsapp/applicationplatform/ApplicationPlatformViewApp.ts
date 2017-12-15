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

/** 查看应用-应用程序平台 */
export class ApplicationPlatformViewApp extends ibas.BOViewService<IApplicationPlatformViewView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "c3bacb22-7daa-4473-ac73-80cbe246fd86";
    /** 应用名称 */
    static APPLICATION_NAME: string = "initialfantasy_app_applicationplatform_view";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.ApplicationPlatform.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = ApplicationPlatformViewApp.APPLICATION_ID;
        this.name = ApplicationPlatformViewApp.APPLICATION_NAME;
        this.boCode = ApplicationPlatformViewApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.editDataEvent = this.editData;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
    }
    /** 编辑数据，参数：目标数据 */
    protected editData(): void {
        let app: ApplicationPlatformEditApp = new ApplicationPlatformEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run(this.viewData);
    }
    /** 运行,覆盖原方法 */
    run(): void;
    run(data: bo.ApplicationPlatform): void;
    run(): void {
        if (ibas.objects.instanceOf(arguments[0], bo.ApplicationPlatform)) {
            this.viewData = arguments[0];
            this.show();
        } else {
            super.run.apply(this, arguments);
        }
    }
    private viewData: bo.ApplicationPlatform;
    /** 查询数据 */
    protected fetchData(criteria: ibas.ICriteria | string): void {
        this.busy(true);
        let that: this = this;
        if (typeof criteria === "string") {
            criteria = new ibas.Criteria();
            // 添加查询条件

        }
        let boRepository: BORepositoryInitialFantasy = new BORepositoryInitialFantasy();
        boRepository.fetchApplicationPlatform({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.ApplicationPlatform>): void {
                try {
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    that.viewData = opRslt.resultObjects.firstOrDefault();
                    that.viewShowed();
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
    }
    /** 获取服务的契约 */
    protected getServiceProxies(): ibas.IServiceProxy<ibas.IServiceContract>[] {
        return [];
    }
}
/** 视图-应用程序平台 */
export interface IApplicationPlatformViewView extends ibas.IBOViewView {

}
/** 应用程序平台连接服务映射 */
export class ApplicationPlatformLinkServiceMapping extends ibas.BOLinkServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = ApplicationPlatformViewApp.APPLICATION_ID;
        this.name = ApplicationPlatformViewApp.APPLICATION_NAME;
        this.boCode = ApplicationPlatformViewApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 创建服务实例 */
    create(): ibas.IService<ibas.IBOLinkServiceCaller> {
        return new ApplicationPlatformViewApp();
    }
}
