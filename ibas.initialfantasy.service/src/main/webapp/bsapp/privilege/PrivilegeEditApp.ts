/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {

        /** 应用-系统权限 */
        export class PrivilegeEditApp extends ibas.BOEditApplication<IPrivilegeEditView, bo.Privilege> {

            /** 应用标识 */
            static APPLICATION_ID: string = "2241eab0-ca9f-4427-9457-500b6f35af35";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_privilege_edit";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.Privilege.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = PrivilegeEditApp.APPLICATION_ID;
                this.name = PrivilegeEditApp.APPLICATION_NAME;
                this.boCode = PrivilegeEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.deleteDataEvent = this.deleteData;
                this.view.createDataEvent = this.createData;
                this.view.chooseRoleEvent = this.chooseRole;
                this.view.choosePlatformEvent = this.choosePlatform;
                this.view.chooseModuleEvent = this.chooseModule;
                this.view.chooseTargetEvent = this.chooseTarget;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.Privilege();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showPrivilege(this.editData);
            }
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.Privilege): void;
            run(): void {
                let that: this = this;
                if (ibas.objects.instanceOf(arguments[0], bo.Privilege)) {
                    let data: bo.Privilege = arguments[0];
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
                        let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                        boRepository.fetchPrivilege({
                            criteria: criteria,
                            onCompleted(opRslt: ibas.IOperationResult<bo.Privilege>): void {
                                let data: bo.Privilege;
                                if (opRslt.resultCode === 0) {
                                    data = opRslt.resultObjects.firstOrDefault();
                                }
                                if (ibas.objects.instanceOf(data, bo.Privilege)) {
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
            /** 保存数据 */
            protected saveData(): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.savePrivilege({
                    beSaved: this.editData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Privilege>): void {
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
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_saving_data"));
            }
            /** 删除数据 */
            protected deleteData(): void {
                let that: this = this;
                this.messages({
                    type: ibas.emMessageType.QUESTION,
                    title: ibas.i18n.prop(this.name),
                    message: ibas.i18n.prop("shell_delete_continue"),
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
                        that.editData = new bo.Privilege();
                        that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                        that.viewShowed();
                    }
                };
                if (that.editData.isDirty) {
                    this.messages({
                        type: ibas.emMessageType.QUESTION,
                        title: ibas.i18n.prop(this.name),
                        message: ibas.i18n.prop("shell_data_not_saved_continue"),
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
            /** 选择角色标识 */
            private chooseRole(): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.IRole>({
                    boCode: bo.BO_CODE_ROLE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: [
                        new ibas.Condition("Activated", ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                    ],
                    onCompleted(selecteds: ibas.IList<bo.IRole>): void {
                        let selected: bo.IRole = selecteds.firstOrDefault();
                        that.editData.roleCode = selected.code;
                    }
                });
            }
            /** 选择平台标识 */
            private choosePlatform(): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.ApplicationPlatform>({
                    boCode: bo.ApplicationPlatform.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: [
                        new ibas.Condition(bo.ApplicationPlatform.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES),
                    ],
                    onCompleted(selecteds: ibas.IList<bo.ApplicationPlatform>): void {
                        let selected: bo.ApplicationPlatform = selecteds.firstOrDefault();
                        that.editData.platformId = selected.platformCode;
                    }
                });
            }
            /** 选择模块标识 */
            private chooseModule(): void {
                let that: this = this;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.ApplicationModule.PROPERTY_ACTIVATED_NAME;
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition.value = ibas.emYesNo.YES.toString();
                if (!ibas.strings.isEmpty(this.editData.platformId)) {
                    condition = criteria.conditions.create();
                    condition.alias = bo.ApplicationModule.PROPERTY_PLATFORMID_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = this.editData.platformId;
                }
                ibas.servicesManager.runChooseService<bo.ApplicationModule>({
                    boCode: bo.ApplicationModule.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: criteria,
                    onCompleted(selecteds: ibas.IList<bo.ApplicationModule>): void {
                        let selected: bo.ApplicationModule = selecteds.firstOrDefault();
                        that.editData.moduleId = selected.moduleId;
                        that.editData.platformId = selected.platformId;
                    }
                });
            }
            /** 选择目标标识 */
            private chooseTarget(): void {
                let that: this = this;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                if (ibas.strings.isEmpty(this.editData.moduleId)) {
                    return;
                }
                ibas.servicesManager.runChooseService<bo.ApplicationElement>({
                    boCode: bo.ApplicationElement.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: [
                        new ibas.Condition(bo.ApplicationElement.PROPERTY_MODULEID_NAME, ibas.emConditionOperation.EQUAL, this.editData.moduleId),
                    ],
                    onCompleted(selecteds: ibas.IList<bo.ApplicationElement>): void {
                        let selected: bo.ApplicationElement = selecteds.firstOrDefault();
                        that.editData.moduleId = selected.moduleId;
                        that.editData.target = selected.elementId;
                    }
                });
            }
        }
        /** 视图-系统权限 */
        export interface IPrivilegeEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showPrivilege(data: bo.Privilege): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 选择角色标识 */
            chooseRoleEvent: Function;
            /** 选择平台标识 */
            choosePlatformEvent: Function;
            /** 选择模块标识 */
            chooseModuleEvent: Function;
            /** 选择目标标识 */
            chooseTargetEvent: Function;
        }
    }
}