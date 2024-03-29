/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {

        /** 应用-组织 */
        export class OrganizationEditApp extends ibas.BOEditApplication<IOrganizationEditView, bo.Organization> {

            /** 应用标识 */
            static APPLICATION_ID: string = "df2915de-6a55-49f9-85f2-a72ad15b8d1d";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_organization_edit";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.Organization.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = OrganizationEditApp.APPLICATION_ID;
                this.name = OrganizationEditApp.APPLICATION_NAME;
                this.boCode = OrganizationEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.deleteDataEvent = this.deleteData;
                this.view.createDataEvent = this.createData;
                this.view.chooseParentEvent = this.chooseParent;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.Organization();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showOrganization(this.editData);
            }
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.Organization): void;
            run(): void {
                let that: this = this;
                if (ibas.objects.instanceOf(arguments[0], bo.Organization)) {
                    let data: bo.Organization = arguments[0];
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
                        boRepository.fetchOrganization({
                            criteria: criteria,
                            onCompleted(opRslt: ibas.IOperationResult<bo.Organization>): void {
                                let data: bo.Organization;
                                if (opRslt.resultCode === 0) {
                                    data = opRslt.resultObjects.firstOrDefault();
                                }
                                if (ibas.objects.instanceOf(data, bo.Organization)) {
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
                boRepository.saveOrganization({
                    beSaved: this.editData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Organization>): void {
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
                        that.editData = new bo.Organization();
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
            private chooseParent(): void {
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.Organization.PROPERTY_ACTIVATED_NAME;
                condition.value = ibas.emYesNo.YES.toString();
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition = criteria.conditions.create();
                condition.alias = bo.Organization.PROPERTY_CODE_NAME;
                condition.value = this.editData.code;
                condition.operation = ibas.emConditionOperation.NOT_EQUAL;
                condition = criteria.conditions.create();
                condition.alias = bo.Organization.PROPERTY_GROUPED_NAME;
                condition.value = ibas.emYesNo.YES.toString();
                condition.operation = ibas.emConditionOperation.EQUAL;
                // 调用选择服务
                ibas.servicesManager.runChooseService<bo.Organization>({
                    boCode: bo.Organization.BUSINESS_OBJECT_CODE,
                    criteria: criteria,
                    chooseType: ibas.emChooseType.SINGLE,
                    onCompleted: (selecteds) => {
                        for (let selected of selecteds) {
                            this.editData.parent = selected.code;
                        }
                    }
                });
            }
        }
        /** 视图-组织 */
        export interface IOrganizationEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showOrganization(data: bo.Organization): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 选择父项资源事件 */
            chooseParentEvent: Function;
        }
    }
}