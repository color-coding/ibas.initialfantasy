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
import { DataConverter4if } from "../../borep/DataConverters";
import { CriteriaEditorApp } from "./CriteriaEditorApp";

/** 应用-业务对象检索条件 */
export class BOCriteriaEditApp extends ibas.BOEditApplication<IBOCriteriaEditView, bo.BOCriteria> {

    /** 应用标识 */
    static APPLICATION_ID: string = "9e281d73-e517-48bc-886e-a0071ae278bb";
    /** 应用名称 */
    static APPLICATION_NAME: string = "initialfantasy_app_bocriteria_edit";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.BOCriteria.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = BOCriteriaEditApp.APPLICATION_ID;
        this.name = BOCriteriaEditApp.APPLICATION_NAME;
        this.boCode = BOCriteriaEditApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.deleteDataEvent = this.deleteData;
        this.view.createDataEvent = this.createData;
        this.view.chooseApplicationEvent = this.chooseApplication;
        this.view.chooseTargetEvent = this.chooseTarget;
        this.view.chooseRoleUserEvent = this.chooseRoleUser;
        this.view.editCriteriaEvent = this.editCriteria;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        if (ibas.objects.isNull(this.editData)) {
            // 创建编辑对象实例
            this.editData = new bo.BOCriteria();
            this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
        }
        this.view.showBOCriteria(this.editData);
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let that: this = this;
        if (ibas.objects.instanceOf(arguments[0], bo.BOCriteria)) {
            // 尝试重新查询编辑对象
            let criteria: ibas.ICriteria = arguments[0].criteria();
            if (!ibas.objects.isNull(criteria) && criteria.conditions.length > 0) {
                // 有效的查询对象查询
                let boRepository: BORepositoryInitialFantasy = new BORepositoryInitialFantasy();
                boRepository.fetchBOCriteria({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.BOCriteria>): void {
                        let data: bo.BOCriteria;
                        if (opRslt.resultCode === 0) {
                            data = opRslt.resultObjects.firstOrDefault();
                        }
                        if (ibas.objects.instanceOf(data, bo.BOCriteria)) {
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
        super.run();
    }
    /** 待编辑的数据 */
    protected editData: bo.BOCriteria;
    /** 保存数据 */
    protected saveData(): void {
        let that: this = this;
        let boRepository: BORepositoryInitialFantasy = new BORepositoryInitialFantasy();
        boRepository.saveBOCriteria({
            beSaved: this.editData,
            onCompleted(opRslt: ibas.IOperationResult<bo.BOCriteria>): void {
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
                that.editData = new bo.BOCriteria();
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
    /** 选择应用 */
    chooseApplication(): void {
        // 未提供选择方法

    }
    /** 选择业务对象编码 */
    chooseTarget(): void {
        let that: this = this;
        ibas.servicesManager.runChooseService<bo.BOInformation>({
            boCode: bo.BO_CODE_BOINFORMATION,
            onCompleted(selecteds: ibas.List<bo.BOInformation>): void {
                that.view.target = selecteds.firstOrDefault().name;
            }
        });
    }
    /** 选择用户或角色 */
    chooseRoleUser(): void {
        let that: this = this;
        if (this.editData.assignedType === bo.emAssignedType.ROLE) {
            ibas.servicesManager.runChooseService<bo.IRole>({
                boCode: bo.BO_CODE_ROLE,
                onCompleted(selecteds: ibas.List<bo.IRole>): void {
                    that.editData.assigned = selecteds.firstOrDefault().code;
                }
            });
        } else if (this.editData.assignedType === bo.emAssignedType.USER) {
            ibas.servicesManager.runChooseService<bo.User>({
                boCode: bo.BO_CODE_USER,
                onCompleted(selecteds: ibas.List<bo.User>): void {
                    that.editData.assigned = selecteds.firstOrDefault().code;
                }
            });
        }
    }
    /** 编辑查询 */
    editCriteria(): void {
        let criteria: ibas.ICriteria;
        if (!ibas.objects.isNull(this.editData.data) && this.editData.data.length > 0) {
            let tmp: any = JSON.parse(this.editData.data);
            let converter: DataConverter4if = new DataConverter4if();
            criteria = converter.parsing(tmp, "");
            if (ibas.objects.instanceOf(criteria, ibas.Criteria)) {
                this.view.target = criteria.businessObject;
            }
        }
        if (ibas.objects.isNull(this.view.target) || this.view.target.length === 0) {
            throw new Error(ibas.i18n.prop("initialfantasy_please_choose_target"));
        }
        if (ibas.objects.isNull(criteria)) {
            criteria = new ibas.Criteria();
            criteria.businessObject = this.view.target;
        }
        let that: this = this;
        let editor: CriteriaEditorApp = new CriteriaEditorApp();
        editor.viewShower = this.viewShower;
        editor.navigation = this.navigation;
        editor.edit({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<ibas.ICriteria>): void {
                // 编辑完成
                let converter: DataConverter4if = new DataConverter4if();
                let tmp: any = converter.convert(this.criteria, "");
                that.editData.data = JSON.stringify(tmp);
            }
        });
    }
}
/** 视图-业务对象检索条件 */
export interface IBOCriteriaEditView extends ibas.IBOEditView {
    /** 显示数据 */
    showBOCriteria(data: bo.BOCriteria): void;
    /** 删除数据事件 */
    deleteDataEvent: Function;
    /** 新建数据事件，参数1：是否克隆 */
    createDataEvent: Function;
    /** 选择应用 */
    chooseApplicationEvent: Function;
    /** 选择查询目标 */
    chooseTargetEvent: Function;
    /** 选择用户或角色 */
    chooseRoleUserEvent: Function;
    /** 编辑查询 */
    editCriteriaEvent: Function;
    /** 编辑目标名称 */
    target: string;

}
