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

/** 应用-审批模板 */
export class ApprovalTemplateEditApp extends ibas.BOEditApplication<IApprovalTemplateEditView, bo.ApprovalTemplate> {

    /** 应用标识 */
    static APPLICATION_ID: string = "99b07b99-645c-4a2f-a8d7-7bab8b96fa57";
    /** 应用名称 */
    static APPLICATION_NAME: string = "mu_initialfantasy_app_ApprovalTemplate_edit";

    constructor() {
        super();
        this.id = ApprovalTemplateEditApp.APPLICATION_ID;
        this.name = ApprovalTemplateEditApp.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.addApprovalProcessStepTemplateEvent = this.addApprovalProcessStepTemplate;
        this.view.removeApprovalProcessStepTemplateEvent = this.removeApprovalProcessStepTemplate;
        this.view.addApprovalProcessStepConditionTemplateEvent = this.addApprovalProcessStepConditionTemplate;
        this.view.removeApprovalProcessStepConditionTemplateEvent = this.removeApprovalProcessStepConditionTemplate;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        this.view.showApprovalTemplate(this.editData);
        this.view.showApprovalProcessStepTemplates(this.editData.approvalProcessStepTemplates);
        this.view.showApprovalProcessStepConditionTemplates(this.editData.approvalProcessStepConditionTemplates);
    }
    /** 待编辑的数据 */
    protected editData: bo.ApprovalTemplate;
    /** 保存数据 */
    protected saveData(): void {
        this.messages(ibas.emMessageType.SUCCESS, ibas.i18n.prop("sys_shell_ui_sucessful"));
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let data: bo.ApprovalTemplate = arguments[0];
        if (ibas.object.isNull(data)) {
            data = new bo.ApprovalTemplate();

        }
        this.editData = data;
        super.run();
    }

    /** 添加审批模板步骤事件 */
    addApprovalProcessStepTemplate(): void {
        this.editData.approvalProcessStepTemplates.create();
        this.view.showApprovalProcessStepTemplates(this.editData.approvalProcessStepTemplates);
    }
    /** 删除审批模板步骤事件 */
    removeApprovalProcessStepTemplate(item: bo.ApprovalProcessStepTemplate): void {
        if (this.editData.approvalProcessStepTemplates.indexOf(item) >= 0) {
            this.editData.approvalProcessStepTemplates.remove(item);
            this.view.showApprovalProcessStepTemplates(this.editData.approvalProcessStepTemplates);
        }
    }


    /** 添加审批流程步骤条件事件 */
    addApprovalProcessStepConditionTemplate(): void {
        this.editData.approvalProcessStepConditionTemplates.create();
        this.view.showApprovalProcessStepConditionTemplates(this.editData.approvalProcessStepConditionTemplates);
    }
    /** 删除审批流程步骤条件事件 */
    removeApprovalProcessStepConditionTemplate(item: bo.ApprovalProcessStepConditionTemplate): void {
        if (this.editData.approvalProcessStepConditionTemplates.indexOf(item) >= 0) {
            this.editData.approvalProcessStepConditionTemplates.remove(item);
            this.view.showApprovalProcessStepConditionTemplates(this.editData.approvalProcessStepConditionTemplates);
        }
    }

}
/** 视图-审批模板 */
export interface IApprovalTemplateEditView extends ibas.IBOEditView {
    /** 添加审批模板步骤事件 */
    addApprovalProcessStepTemplateEvent: Function;
    /** 删除审批模板步骤事件 */
    removeApprovalProcessStepTemplateEvent: Function;
    /** 显示数据 */
    showApprovalProcessStepTemplates(datas: bo.ApprovalProcessStepTemplate[]): void;
    /** 添加审批流程步骤条件事件 */
    addApprovalProcessStepConditionTemplateEvent: Function;
    /** 删除审批流程步骤条件事件 */
    removeApprovalProcessStepConditionTemplateEvent: Function;
    /** 显示数据 */
    showApprovalProcessStepConditionTemplates(datas: bo.ApprovalProcessStepConditionTemplate[]): void;
    /** 显示数据 */
    showApprovalTemplate(data: bo.ApprovalTemplate): void;
}
