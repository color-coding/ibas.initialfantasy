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
    static APPLICATION_ID: string = "dd924e76-424b-47f2-8ee0-8334b7414685";
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
        this.view.createDataEvent = this.createData;
        this.view.addApprovalTemplateStepEvent = this.addApprovalTemplateStep;
        this.view.removeApprovalTemplateStepEvent = this.removeApprovalTemplateStep;

        this.view.editApprovalTemplateStepConditionsStartEvent = this.editApprovalTemplateStepConditionsStartEvent;
        this.view.addApprovalTemplateStepConditionEvent = this.addApprovalTemplateStepCondition;
        this.view.removeApprovalTemplateStepConditionEvent = this.removeApprovalTemplateStepCondition;
        this.view.editApprovalTemplateStepConditionsEndEvent = this.editApprovalTemplateStepConditionsEndEvent;
        this.view.chooseApprovalTemplateStepUserEvent = this.chooseApprovalTemplateStepUserEvent;
        this.view.chooseApprovalTemplateBOInformationEvent = this.chooseApprovalTemplateBOInformationEvent;
        this.view.chooseApprovalTemplateStepConditionBOPropertyInformationEvent = this.chooseApprovalTemplateStepConditionBOPropertyInformationEvent;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        if (ibas.objects.isNull(this.editData)) {
            // 创建编辑对象实例
            this.editData = new bo.ApprovalTemplate();
            this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_data_created_new"));
        }
        this.view.showApprovalTemplate(this.editData);
        this.view.showApprovalTemplateSteps(this.editData.approvalTemplateSteps.filterDeleted());
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let that: this = this;
        if (ibas.objects.instanceOf(arguments[0], bo.ApprovalTemplate)) {
            // 尝试重新查询编辑对象
            let criteria: ibas.ICriteria = arguments[0].criteria();
            if (!ibas.objects.isNull(criteria) && criteria.conditions.length > 0) {
                // 有效的查询对象查询
                let boRepository: BORepositoryInitialFantasy = new BORepositoryInitialFantasy();
                boRepository.fetchApprovalTemplate({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.ApprovalTemplate>): void {
                        let data: bo.ApprovalTemplate;
                        if (opRslt.resultCode === 0) {
                            data = opRslt.resultObjects.firstOrDefault();
                        }
                        if (ibas.objects.instanceOf(data, bo.ApprovalTemplate)) {
                            // 查询到了有效数据
                            that.editData = data;
                            that.show();
                        } else {
                            // 数据重新检索无效
                            that.messages({
                                type: ibas.emMessageType.WARNING,
                                message: ibas.i18n.prop("sys_shell_data_deleted_and_created"),
                                onCompleted(): void {
                                    that.show();
                                }
                            });
                        }
                    }
                });
                // 开始查询数据
                return;
            }
        }
        super.run();
    }

    /** 待编辑的数据 */
    protected editData: bo.ApprovalTemplate;
    /** 待编辑的审批步骤数据 */
    protected editApprovalTemplateStepData: bo.ApprovalTemplateStep;
    /** 保存数据 */
    protected saveData(): void {
        let that: this = this;
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
                        // 删除成功，释放当前对象
                        that.messages(ibas.emMessageType.SUCCESS,
                            ibas.i18n.prop("sys_shell_data_delete") + ibas.i18n.prop("sys_shell_sucessful"));
                        that.editData = undefined;
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
    }
    /** 删除数据 */
    protected deleteData(): void {
        let that: this = this;
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
    /** 新建数据，参数1：是否克隆 */
    protected createData(clone: boolean): void {
        let that: this = this;
        let createData: Function = function (): void {
            if (clone) {
                // 克隆对象
                that.editData = that.editData.clone();
                that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_data_cloned_new"));
                that.viewShowed();
            } else {
                // 新建对象
                that.editData = new bo.ApprovalTemplate();
                that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_data_created_new"));
                that.viewShowed();
            }
        };
        if (that.editData.isDirty) {
            this.messages({
                type: ibas.emMessageType.QUESTION,
                title: ibas.i18n.prop(this.name),
                message: ibas.i18n.prop("sys_data_not_saved_whether_to_continue"),
                actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                onCompleted(action: ibas.emMessageAction): void {
                    if (action === ibas.emMessageAction.YES) {
                        createData();
                    }
                }
            });
        } else {
            createData();
        }
    }
    /** 添加审批模板步骤事件 */
    addApprovalTemplateStep(): void {
        this.editData.approvalTemplateSteps.create();
        // 仅显示没有标记删除的
        this.view.showApprovalTemplateSteps(this.editData.approvalTemplateSteps.filterDeleted());
    }
    /** 删除审批模板步骤事件 */
    removeApprovalTemplateStep(items: bo.ApprovalTemplateStep[]): void {
        // 非数组，转为数组
        if (!(items instanceof Array)) {
            items = [items];
        }
        if (items.length === 0) {
            return;
        }
        // 移除项目
        for (let item of items) {
            if (this.editData.approvalTemplateSteps.indexOf(item) >= 0) {
                if (item.isNew) {
                    // 新建的移除集合
                    this.editData.approvalTemplateSteps.remove(item);
                } else {
                    // 非新建标记删除
                    item.delete();
                }
            }
        }
        // 仅显示没有标记删除的
        this.view.showApprovalTemplateSteps(this.editData.approvalTemplateSteps.filterDeleted());
    }
    ///** 编辑审批模板步骤条件开始事件 */
    editApprovalTemplateStepConditionsStartEvent(item: bo.ApprovalTemplateStep): void {
        this.editApprovalTemplateStepData = item;
        // 仅显示没有标记删除的
        this.view.showApprovalTemplateStepConditions(this.editApprovalTemplateStepData.approvalTemplateStepConditions.filterDeleted());
    }
    ///** 编辑审批模板步骤条件结束事件 */
    editApprovalTemplateStepConditionsEndEvent(item: bo.ApprovalTemplateStep): void {
        this.editApprovalTemplateStepData = null;
        // 仅显示没有标记删除的
        this.view.showApprovalTemplateSteps(this.editData.approvalTemplateSteps.filterDeleted());
    }
    /** 添加审批模板步骤条件事件 */
    addApprovalTemplateStepCondition(): void {
        if (!this.editApprovalTemplateStepData) {
            this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_please_chooose_data",
                ibas.i18n.prop("sys_shell_data_edit")));
            return;
        }
        this.editApprovalTemplateStepData.approvalTemplateStepConditions.create();
        // 仅显示没有标记删除的
        this.view.showApprovalTemplateStepConditions(this.editApprovalTemplateStepData.approvalTemplateStepConditions.filterDeleted());
    }
    /** 删除审批模板步骤条件事件 */
    removeApprovalTemplateStepCondition(items: bo.ApprovalTemplateStepCondition[]): void {
        if (!this.editApprovalTemplateStepData) {
            this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_please_chooose_data",
                ibas.i18n.prop("sys_shell_data_edit")));
            return;
        }
        // 非数组，转为数组
        if (!(items instanceof Array)) {
            items = [items];
        }
        if (items.length === 0) {
            return;
        }
        // 移除项目
        for (let item of items) {
            if (this.editApprovalTemplateStepData.approvalTemplateStepConditions.indexOf(item) >= 0) {
                if (item.isNew) {
                    // 新建的移除集合
                    this.editApprovalTemplateStepData.approvalTemplateStepConditions.remove(item);
                } else {
                    // 非新建标记删除
                    item.delete();
                }
            }
        }
        // 仅显示没有标记删除的
        this.view.showApprovalTemplateStepConditions(this.editApprovalTemplateStepData.approvalTemplateStepConditions.filterDeleted());
    }
    /** 选择业务对象类型 */
    chooseApprovalTemplateBOInformationEvent() {
        let that: this = this;
        ibas.servicesManager.runChooseService<bo.BOInformation>({
            boCode: bo.BOInformation.BUSINESS_OBJECT_CODE,
            criteria: [
            ],
            onCompleted(selecteds: ibas.List<bo.BOInformation>): void {
                let selected = selecteds.firstOrDefault();
                if (!ibas.objects.isNull(selected)) {
                    that.editData.approvalObjectCode = selected.code;
                    let criteria: ibas.Criteria = new ibas.Criteria();
                    criteria.noChilds = false;
                    let cond = criteria.conditions.create();
                    cond.alias = bo.BOInformation.PROPERTY_CODE_NAME
                    cond.operation = ibas.emConditionOperation.EQUAL;
                    cond.value = that.editData.approvalObjectCode;
                    let boRepository: BORepositoryInitialFantasy = new BORepositoryInitialFantasy();
                    boRepository.fetchBOInformation({
                        criteria: criteria,
                        onCompleted(opRslt: ibas.IOperationResult<bo.BOInformation>): void {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                let boInformation = opRslt.resultObjects.firstOrDefault();
                                if (!ibas.objects.isNull(boInformation)) {
                                    that.view.refreshBOPropertyInformationList(boInformation.boPropertyInformations);
                                }

                                that.busy(false);
                            } catch (error) {
                                that.messages(error);
                            }
                        }
                    });
                    that.busy(true);
                    //that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_saving_data"));
                }
            }
        });
    }
    /** 审批步骤选择步骤所有者 */
    chooseApprovalTemplateStepUserEvent(caller: bo.ApprovalTemplateStep) {
        let that: this = this;
        ibas.servicesManager.runChooseService<bo.User>({
            caller: caller,
            boCode: bo.User.BUSINESS_OBJECT_CODE,
            criteria: [
                new ibas.Condition(bo.User.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, "Y")
            ],
            onCompleted(selecteds: ibas.List<bo.User>): void {
                // 获取触发的对象
                let index: number = that.editData.approvalTemplateSteps.indexOf(caller);
                let item: bo.ApprovalTemplateStep = that.editData.approvalTemplateSteps[index];

                let selected = selecteds.firstOrDefault();
                if (!ibas.objects.isNull(item) && !ibas.objects.isNull(selected)) {
                    item.stepOwner = selected.docEntry;
                }
            }
        });
    }
    /** 审批步骤条件选择取值属性 */
    chooseApprovalTemplateStepConditionBOPropertyInformationEvent(caller: bo.ApprovalTemplateStepCondition) {
        let that: this = this;
        try {
            if (!this.editData.approvalObjectCode)
                throw new Error(ibas.i18n.prop("initialfantasy_msg_property_can_not_empty", ibas.i18n.prop("bo_approvaltemplate_approvalobjectcode")));
            let criteria: ibas.Criteria = new ibas.Criteria();
            criteria.noChilds = false;
            let cond = criteria.conditions.create();
            cond.alias = bo.BOInformation.PROPERTY_CODE_NAME
            cond.operation = ibas.emConditionOperation.EQUAL;
            cond.value = this.editData.approvalObjectCode;

            ibas.servicesManager.runChooseService<bo.BOPropertyInformation>({
                caller: caller,
                boCode: bo.BOInformation.BUSINESS_OBJECT_CODE + ".1",
                criteria: criteria,
                onCompleted(selecteds: ibas.List<bo.BOPropertyInformation>): void {
                    // 获取触发的对象
                    let index: number = that.editApprovalTemplateStepData.approvalTemplateStepConditions.indexOf(caller);
                    let item: bo.ApprovalTemplateStepCondition = that.editApprovalTemplateStepData.approvalTemplateStepConditions[index];

                    let selected = selecteds.firstOrDefault();
                    if (!ibas.objects.isNull(item) && !ibas.objects.isNull(selected)) {
                        item.propertyName = selected.property;
                    }
                }
            });
        } catch (error) {
            this.proceeding(ibas.emMessageType.ERROR, error.message);
        }

    }
}
/** 视图-审批模板 */
export interface IApprovalTemplateEditView extends ibas.IBOEditView {
    /** 显示数据 */
    showApprovalTemplate(data: bo.ApprovalTemplate): void;
    /** 删除数据事件 */
    deleteDataEvent: Function;
    /** 新建数据事件，参数1：是否克隆 */
    createDataEvent: Function;
    /** 添加审批模板步骤事件 */
    addApprovalTemplateStepEvent: Function;
    /** 删除审批模板步骤事件 */
    removeApprovalTemplateStepEvent: Function;
    /** 显示数据 */
    showApprovalTemplateSteps(datas: bo.ApprovalTemplateStep[]): void;
    ///** 编辑审批模板步骤条件事件 */
    editApprovalTemplateStepConditionsStartEvent: Function;
    ///** 编辑审批模板步骤条件结束事件 */
    editApprovalTemplateStepConditionsEndEvent
    /** 添加审批模板步骤条件事件 */
    addApprovalTemplateStepConditionEvent: Function;
    /** 删除审批模板步骤条件事件 */
    removeApprovalTemplateStepConditionEvent: Function;
    /** 显示数据 */
    showApprovalTemplateStepConditions(datas: bo.ApprovalTemplateStepCondition[]): void;
    /** 刷新字段列表 */
    refreshBOPropertyInformationList(properies: bo.BOPropertyInformation[]): void
    /** 选择业务对象类型 */
    chooseApprovalTemplateBOInformationEvent: Function;
    /** 审批步骤选择步骤所有者 */
    chooseApprovalTemplateStepUserEvent: Function;
    /** 审批步骤条件选择取值属性 */
    chooseApprovalTemplateStepConditionBOPropertyInformationEvent: Function;
}
