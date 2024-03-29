/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {

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
                this.view.chooseBusinessObjectEvent = this.chooseBusinessObject;
                this.view.chooseRoleUserEvent = this.chooseRoleUser;
                this.view.editCriteriaEvent = this.editCriteria;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.BOCriteria();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showBOCriteria(this.editData);
            }
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.BOCriteria): void;
            run(): void {
                let that: this = this;
                if (ibas.objects.instanceOf(arguments[0], bo.BOCriteria)) {
                    let data: bo.BOCriteria = arguments[0];
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
                super.run.apply(this, arguments);
            }
            /** 保存数据 */
            protected saveData(): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
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
                        that.editData = new bo.BOCriteria();
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
            /** 选择业务对象编码 */
            private chooseBusinessObject(): void {
                let that: this = this;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                criteria.noChilds = true;
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.BOInformation.PROPERTY_CODE_NAME;
                condition.value = ".";
                condition.operation = ibas.emConditionOperation.NOT_CONTAIN;
                ibas.servicesManager.runChooseService<bo.BOInformation>({
                    boCode: bo.BO_CODE_BOINFORMATION,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: criteria,
                    onCompleted(selecteds: ibas.IList<bo.BOInformation>): void {
                        that.view.target = selecteds.firstOrDefault().code;
                    }
                });
            }
            /** 选择用户或角色 */
            private chooseRoleUser(): void {
                let that: this = this;
                if (this.editData.assignedType === bo.emAssignedType.ROLE) {
                    ibas.servicesManager.runChooseService<bo.IRole>({
                        boCode: bo.BO_CODE_ROLE,
                        chooseType: ibas.emChooseType.SINGLE,
                        criteria: [
                            new ibas.Condition("Activated", ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                        ],
                        onCompleted(selecteds: ibas.IList<bo.IRole>): void {
                            that.editData.assigned = selecteds.firstOrDefault().code;
                        }
                    });
                } else if (this.editData.assignedType === bo.emAssignedType.USER) {
                    ibas.servicesManager.runChooseService<bo.User>({
                        boCode: bo.BO_CODE_USER,
                        chooseType: ibas.emChooseType.SINGLE,
                        criteria: [
                            new ibas.Condition("Activated", ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                        ],
                        onCompleted(selecteds: ibas.IList<bo.User>): void {
                            that.editData.assigned = selecteds.firstOrDefault().code;
                        }
                    });
                }
            }
            /** 编辑查询 */
            private editCriteria(): void {
                let criteria: ibas.ICriteria;
                if (!ibas.objects.isNull(this.editData.data) && this.editData.data.length > 0) {
                    let tmp: any = JSON.parse(this.editData.data);
                    let converter: bo.DataConverter = new bo.DataConverter();
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
                ibas.servicesManager.runApplicationService<ibas.ICriteriaEditorServiceContract, ibas.ICriteria>({
                    proxy: new ibas.CriteriaEditorServiceProxy({
                        target: this.view.target,
                        criteria: criteria
                    }),
                    onCompleted(result: ibas.ICriteria): void {
                        let converter: bo.DataConverter = new bo.DataConverter();
                        let tmp: any = converter.convert(result, "");
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
            /** 选择查询目标 */
            chooseBusinessObjectEvent: Function;
            /** 选择用户或角色 */
            chooseRoleUserEvent: Function;
            /** 编辑查询 */
            editCriteriaEvent: Function;
            /** 编辑目标名称 */
            target: string;
        }
    }
}
