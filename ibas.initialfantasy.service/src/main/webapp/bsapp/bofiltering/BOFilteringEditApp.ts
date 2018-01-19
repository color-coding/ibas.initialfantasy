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

/** 应用-业务对象筛选 */
export class BOFilteringEditApp extends ibas.BOEditApplication<IBOFilteringEditView, bo.BOFiltering> {

    /** 应用标识 */
    static APPLICATION_ID: string = "e33d8098-49fe-4acd-b943-b4e5a6270c73";
    /** 应用名称 */
    static APPLICATION_NAME: string = "initialfantasy_app_bofiltering_edit";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.BOFiltering.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = BOFilteringEditApp.APPLICATION_ID;
        this.name = BOFilteringEditApp.APPLICATION_NAME;
        this.boCode = BOFilteringEditApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.deleteDataEvent = this.deleteData;
        this.view.createDataEvent = this.createData;
        this.view.addBOFilteringConditionEvent = this.addBOFilteringCondition;
        this.view.removeBOFilteringConditionEvent = this.removeBOFilteringCondition;
        this.view.chooseBusinessObjectEvent = this.chooseBusinessObject;
        this.view.chooseRoleEvent = this.chooseRole;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        if (ibas.objects.isNull(this.editData)) {
            // 创建编辑对象实例
            this.editData = new bo.BOFiltering();
            this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
        }
        this.view.showBOFiltering(this.editData);
        this.view.showBOFilteringConditions(this.editData.boFilteringConditions.filterDeleted());
    }
    /** 运行,覆盖原方法 */
    run(): void;
    run(data: bo.BOFiltering): void;
    run(): void {
        let that: this = this;
        if (ibas.objects.instanceOf(arguments[0], bo.BOFiltering)) {
            let data: bo.BOFiltering = arguments[0];
            // 新对象直接编辑
            if (data.isNew) {
                that.editData = data;
                that.show();
                return;
            }
            // 尝试重新查询编辑对象
            let criteria: ibas.ICriteria = data.criteria();
            if (!ibas.objects.isNull(criteria) && criteria.conditions.length > 0) {
                // 有效的查询对象查询
                let boRepository: BORepositoryInitialFantasy = new BORepositoryInitialFantasy();
                boRepository.fetchBOFiltering({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.BOFiltering>): void {
                        let data: bo.BOFiltering;
                        if (opRslt.resultCode === 0) {
                            data = opRslt.resultObjects.firstOrDefault();
                        }
                        if (ibas.objects.instanceOf(data, bo.BOFiltering)) {
                            // 查询到了有效数据
                            that.editData = data;
                            that.show();
                        } else {
                            // 数据重新检索无效
                            that.messages({
                                type: ibas.emMessageType.WARNING,
                                message: ibas.i18n.prop("shell_data_deleted_and_created"),
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
        super.run.apply(this, arguments);
    }
    /** 待编辑的数据 */
    protected editData: bo.BOFiltering;
    /** 保存数据 */
    protected saveData(): void {
        let that: this = this;
        let boRepository: BORepositoryInitialFantasy = new BORepositoryInitialFantasy();
        boRepository.saveBOFiltering({
            beSaved: this.editData,
            onCompleted(opRslt: ibas.IOperationResult<bo.BOFiltering>): void {
                try {
                    that.busy(false);
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    if (opRslt.resultObjects.length === 0) {
                        // 删除成功，释放当前对象
                        that.messages(ibas.emMessageType.SUCCESS,
                            ibas.i18n.prop("shell_data_delete") + ibas.i18n.prop("shell_sucessful"));
                        that.editData = undefined;
                    } else {
                        // 替换编辑对象
                        that.editData = opRslt.resultObjects.firstOrDefault();
                        that.messages(ibas.emMessageType.SUCCESS,
                            ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                    }
                    // 刷新当前视图
                    that.viewShowed();
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.busy(true);
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_saving_data"));
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
                that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_cloned_new"));
                that.viewShowed();
            } else {
                // 新建对象
                that.editData = new bo.BOFiltering();
                that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
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
    /** 添加业务对象筛选-条件事件 */
    addBOFilteringCondition(): void {
        this.editData.boFilteringConditions.create();
        // 仅显示没有标记删除的
        this.view.showBOFilteringConditions(this.editData.boFilteringConditions.filterDeleted());
    }
    /** 删除业务对象筛选-条件事件 */
    removeBOFilteringCondition(items: bo.BOFilteringCondition[]): void {
        // 非数组，转为数组
        if (!(items instanceof Array)) {
            items = [items];
        }
        if (items.length === 0) {
            return;
        }
        // 移除项目
        for (let item of items) {
            if (this.editData.boFilteringConditions.indexOf(item) >= 0) {
                if (item.isNew) {
                    // 新建的移除集合
                    this.editData.boFilteringConditions.remove(item);
                } else {
                    // 非新建标记删除
                    item.delete();
                }
            }
        }
        // 仅显示没有标记删除的
        this.view.showBOFilteringConditions(this.editData.boFilteringConditions.filterDeleted());
    }
    /** 选择角色标识 */
    private chooseRole(): void {
        let that: this = this;
        ibas.servicesManager.runChooseService<bo.IRole>({
            boCode: bo.BO_CODE_ROLE,
            chooseType: ibas.emChooseType.SINGLE,
            onCompleted(selecteds: ibas.List<bo.IRole>): void {
                that.editData.roleCode = selecteds.firstOrDefault().code;
                if (ibas.strings.isEmpty(that.editData.name)) {
                    that.editData.name = selecteds.firstOrDefault().name + "-";
                } else if (that.editData.name.indexOf("-") >= 0) {
                    that.editData.name = selecteds.firstOrDefault().name + that.editData.name.substring(that.editData.name.indexOf("-"));
                }
            }
        });
    }
    /** 选择业务对象标识 */
    private chooseBusinessObject(): void {
        let that: this = this;
        ibas.servicesManager.runChooseService<bo.BOInformation>({
            boCode: bo.BO_CODE_BOINFORMATION,
            chooseType: ibas.emChooseType.SINGLE,
            onCompleted(selecteds: ibas.List<bo.BOInformation>): void {
                that.editData.boCode = selecteds.firstOrDefault().code;
                if (ibas.strings.isEmpty(that.editData.name)) {
                    that.editData.name = "-" + selecteds.firstOrDefault().description;
                } else if (that.editData.name.indexOf("-") >= 0) {
                    that.editData.name = that.editData.name.substring(0, that.editData.name.indexOf("-"))
                        + "-" + selecteds.firstOrDefault().description;
                }
                that.view.refreshBOProperties(selecteds.firstOrDefault().boPropertyInformations);
            }
        });
    }

}
/** 视图-业务对象筛选 */
export interface IBOFilteringEditView extends ibas.IBOEditView {
    /** 选择角色事件 */
    chooseRoleEvent: Function;
    /** 选择业务对象事件 */
    chooseBusinessObjectEvent: Function;
    /** 显示数据 */
    showBOFiltering(data: bo.BOFiltering): void;
    /** 删除数据事件 */
    deleteDataEvent: Function;
    /** 新建数据事件，参数1：是否克隆 */
    createDataEvent: Function;
    /** 添加业务对象筛选-条件事件 */
    addBOFilteringConditionEvent: Function;
    /** 删除业务对象筛选-条件事件 */
    removeBOFilteringConditionEvent: Function;
    /** 显示数据 */
    showBOFilteringConditions(datas: bo.BOFilteringCondition[]): void;
    /** 刷新字段列表 */
    refreshBOProperties(properies: bo.BOPropertyInformation[]): void;
}
