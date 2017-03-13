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

/** 应用-审批记录 */
export class ApprovalRequestEditApp extends ibas.BOEditApplication<IApprovalRequestEditView, bo.ApprovalRequest> {

    /** 应用标识 */
    static APPLICATION_ID: string = "cca810ed-c25a-438b-94e6-c8020b6b487c";
    /** 应用名称 */
    static APPLICATION_NAME: string = "mu_initialfantasy_app_approvalrequest_edit";

    constructor() {
        super();
        this.id = ApprovalRequestEditApp.APPLICATION_ID;
        this.name = ApprovalRequestEditApp.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.addApprovalRequestStepEvent = this.addApprovalRequestStep;
        this.view.removeApprovalRequestStepEvent = this.removeApprovalRequestStep;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        this.view.showApprovalRequest(this.editData);
        this.view.showApprovalRequestSteps(this.editData.approvalRequestSteps);
    }
    /** 待编辑的数据 */
    protected editData: bo.ApprovalRequest;
    /** 保存数据 */
    protected saveData(): void {
        this.messages(ibas.emMessageType.SUCCESS, ibas.i18n.prop("sys_shell_ui_sucessful"));
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let data: bo.ApprovalRequest = arguments[0];
        if (ibas.object.isNull(data)) {
            data = new bo.ApprovalRequest();

        }
        this.editData = data;
        super.run();
    }

    /** 添加审批请求步骤事件 */
    addApprovalRequestStep(): void {
        this.editData.approvalRequestSteps.create();
        this.view.showApprovalRequestSteps(this.editData.approvalRequestSteps);
    }
    /** 删除审批请求步骤事件 */
    removeApprovalRequestStep(item: bo.ApprovalRequestStep): void {
        if (this.editData.approvalRequestSteps.indexOf(item) >= 0) {
            this.editData.approvalRequestSteps.remove(item);
            this.view.showApprovalRequestSteps(this.editData.approvalRequestSteps);
        }
    }

}
/** 视图-审批记录 */
export interface IApprovalRequestEditView extends ibas.IBOEditView {
    /** 添加审批请求步骤事件 */
    addApprovalRequestStepEvent: Function;
    /** 删除审批请求步骤事件 */
    removeApprovalRequestStepEvent: Function;
    /** 显示数据 */
    showApprovalRequestSteps(datas: bo.ApprovalRequestStep[]): void;
    /** 显示数据 */
    showApprovalRequest(data: bo.ApprovalRequest): void;
}
