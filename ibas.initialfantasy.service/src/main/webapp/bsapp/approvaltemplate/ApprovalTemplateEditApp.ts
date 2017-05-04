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

/** 应用-审批模板 */
export class ApprovalTemplateEditApp extends ibas.BOEditApplication<IApprovalTemplateEditView, bo.ApprovalTemplate> {

    /** 应用标识 */
    static APPLICATION_ID: string = "7aea78cc-c833-48ba-8d96-011e14832f17";
    /** 应用名称 */
    static APPLICATION_NAME: string = "initialfantasy_app_approvaltemplate_edit";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.ApprovalTemplate.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = ApprovalTemplateEditApp.APPLICATION_ID;
        this.name = ApprovalTemplateEditApp.APPLICATION_NAME;
        this.boCode = ApprovalTemplateEditApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.deleteDataEvent = this.deleteData;
        this.view.addApprovalTemplateStepEvent = this.addApprovalTemplateStep;
        this.view.removeApprovalTemplateStepEvent = this.removeApprovalTemplateStep;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        this.view.showApprovalTemplate(this.editData);
        this.view.showApprovalTemplateSteps(this.editData.approvalTemplateSteps.filterDeleted());
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        // 尝试设置编辑对象
        if (!ibas.objects.isNull(args) && args.length === 1 && ibas.objects.instanceOf(args[0], bo.ApprovalTemplate)) {
            this.editData = args[0];
        }
        // 创建编辑对象实例
        if (ibas.objects.isNull(this.editData)) {
            this.editData = new bo.ApprovalTemplate();
            this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_data_created_new"));

        }
        super.run();
    }
    /** 待编辑的数据 */
    protected editData: bo.ApprovalTemplate;
    /** 保存数据 */
    protected saveData(): void {
        try {
            let that = this;
            let boRepository: BORepositoryInitialFantasy = new BORepositoryInitialFantasy();
            boRepository.saveApprovalTemplate({
                beSaved: this.editData,
                onCompleted(opRslt: ibas.IOperationResult<bo.ApprovalTemplate>): void {
                    try {
                        that.busy(false);
                        if (opRslt.resultCode !== 0) {
                            throw new Error(opRslt.message);
                        }
                        if (opRslt.resultObjects.length === 0) {
                            that.messages(ibas.emMessageType.SUCCESS,
                                ibas.i18n.prop("sys_shell_data_delete") + ibas.i18n.prop("sys_shell_sucessful"));
                            // 创建新的对象
                            that.editData = new bo.ApprovalTemplate();
                        } else {
                            // 替换编辑对象
                            that.editData = opRslt.resultObjects.firstOrDefault();
                            that.messages(ibas.emMessageType.SUCCESS,
                                ibas.i18n.prop("sys_shell_data_save") + ibas.i18n.prop("sys_shell_sucessful"));
                        }
                        // 刷新当前视图
                        that.viewShowed();
                    } catch (error) {
                        that.messages(error);
                    }
                }
            });
            this.busy(true);
            this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_saving_data"));
        } catch (error) {
            this.messages(error);
        }
    }
    /** 删除数据 */
    protected deleteData(): void {
        let that = this;
        this.messages({
            type: ibas.emMessageType.QUESTION,
            title: ibas.i18n.prop(this.name),
            message: ibas.i18n.prop("sys_whether_to_delete"),
            actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
            onCompleted(action: ibas.emMessageAction): void {
                if (action === ibas.emMessageAction.YES) {
                    that.editData.delete();
                    that.saveData();
                }
            }
        });
    }
    /** 添加审批模板步骤事件 */
    addApprovalTemplateStep(): void {
        this.editData.approvalTemplateSteps.create();
        this.view.showApprovalTemplateSteps(this.editData.approvalTemplateSteps.filterDeleted());
    }
    /** 删除审批模板步骤事件 */
    removeApprovalTemplateStep(item: bo.ApprovalTemplateStep): void {
        if (this.editData.approvalTemplateSteps.indexOf(item) >= 0) {
            this.editData.approvalTemplateSteps.remove(item);
            this.view.showApprovalTemplateSteps(this.editData.approvalTemplateSteps.filterDeleted());
        }
    }

}
/** 视图-审批模板 */
export interface IApprovalTemplateEditView extends ibas.IBOEditView {
    /** 显示数据 */
    showApprovalTemplate(data: bo.ApprovalTemplate): void;
    /** 删除数据事件 */
    deleteDataEvent: Function;
    /** 添加审批模板步骤事件 */
    addApprovalTemplateStepEvent: Function;
    /** 删除审批模板步骤事件 */
    removeApprovalTemplateStepEvent: Function;
    /** 显示数据 */
    showApprovalTemplateSteps(datas: bo.ApprovalTemplateStep[]): void;
}
