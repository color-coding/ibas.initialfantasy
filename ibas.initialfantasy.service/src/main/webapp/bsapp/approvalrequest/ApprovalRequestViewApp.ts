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
import { ApprovalRequestEditApp } from "./ApprovalRequestEditApp";

/** 查看应用-审批请求 */
export class ApprovalRequestViewApp extends ibas.BOViewService<IApprovalRequestViewView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "2c436043-ad41-497f-92ab-871ca5005eb5";
    /** 应用名称 */
    static APPLICATION_NAME: string = "initialfantasy_app_approvalrequest_view";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.ApprovalRequest.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = ApprovalRequestViewApp.APPLICATION_ID;
        this.name = ApprovalRequestViewApp.APPLICATION_NAME;
        this.boCode = ApprovalRequestViewApp.BUSINESS_OBJECT_CODE;
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
        let app = new ApprovalRequestEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run(this.viewData);
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        if (!ibas.objects.isNull(args) && args.length === 1 && args[0] instanceof bo.ApprovalRequest) {
            this.viewData = args[0];
            this.show();
        } else {
            super.run(args);
        }
    }
    private viewData: bo.ApprovalRequest;
    /** 查询数据 */
    protected fetchData(criteria: ibas.ICriteria | string): void {
        this.busy(true);
        let that = this;
        if (typeof criteria === "string") {
            criteria = new ibas.Criteria();
            // 添加查询条件

        }
        try {
            let boRepository: BORepositoryInitialFantasy = new BORepositoryInitialFantasy();
            boRepository.fetchApprovalRequest({
                criteria: criteria,
                onCompleted(opRslt: ibas.IOperationResult<bo.ApprovalRequest>): void {
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
            this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_fetching_data"));
        } catch (error) {
            that.messages(error);
        }
    }
    /** 获取服务的契约 */
    protected getServiceProxies(): ibas.IServiceProxy<ibas.IServiceContract>[] {
        return [];
    }
}
/** 视图-审批请求 */
export interface IApprovalRequestViewView extends ibas.IBOViewView {

}
/** 审批请求连接服务映射 */
export class ApprovalRequestLinkServiceMapping extends ibas.BOLinkServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = ApprovalRequestViewApp.APPLICATION_ID;
        this.name = ApprovalRequestViewApp.APPLICATION_NAME;
        this.boCode = ApprovalRequestViewApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IServiceContract> {
        return new ApprovalRequestViewApp();
    }
}
