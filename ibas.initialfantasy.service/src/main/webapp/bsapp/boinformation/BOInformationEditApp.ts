/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {

        /** 应用-业务对象信息 */
        export class BOInformationEditApp extends ibas.BOEditApplication<IBOInformationEditView, bo.BOInformation> {

            /** 应用标识 */
            static APPLICATION_ID: string = "7c8677a8-e09c-4e27-a622-c3119bcb316e";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_boinformation_edit";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.BOInformation.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = BOInformationEditApp.APPLICATION_ID;
                this.name = BOInformationEditApp.APPLICATION_NAME;
                this.boCode = BOInformationEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.deleteDataEvent = this.deleteData;
                this.view.createDataEvent = this.createData;
                this.view.addBOPropertyInformationEvent = this.addBOPropertyInformation;
                this.view.removeBOPropertyInformationEvent = this.removeBOPropertyInformation;
                this.view.editBOPropertyInformationEvent = this.editBOPropertyInformation;
                this.view.addBOPropertyValueEvent = this.addBOPropertyValue;
                this.view.removeBOPropertyValueEvent = this.removeBOPropertyValue;
                this.view.boNumberingEvent = this.boNumbering;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.BOInformation();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showBOInformation(this.editData);
                this.view.showBOPropertyInformations(this.editData.boPropertyInformations.filterDeleted());
            }
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.BOInformation): void;
            run(): void {
                let that: this = this;
                if (ibas.objects.instanceOf(arguments[0], bo.BOInformation)) {
                    let data: bo.BOInformation = arguments[0];
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
                        boRepository.fetchBOInformation({
                            criteria: criteria,
                            onCompleted(opRslt: ibas.IOperationResult<bo.BOInformation>): void {
                                let data: bo.BOInformation;
                                if (opRslt.resultCode === 0) {
                                    data = opRslt.resultObjects.firstOrDefault();
                                }
                                if (ibas.objects.instanceOf(data, bo.BOInformation)) {
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
            protected editData: bo.BOInformation;
            /** 保存数据 */
            protected saveData(): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.saveBOInformation({
                    beSaved: this.editData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.BOInformation>): void {
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
                        that.editData = new bo.BOInformation();
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
            /** 添加业务对象属性信息事件 */
            addBOPropertyInformation(): void {
                this.editData.boPropertyInformations.create();
                // 仅显示没有标记删除的
                this.view.showBOPropertyInformations(this.editData.boPropertyInformations.filterDeleted());
            }
            /** 删除业务对象属性信息事件 */
            removeBOPropertyInformation(items: bo.BOPropertyInformation[]): void {
                // 非数组，转为数组
                if (!(items instanceof Array)) {
                    items = [items];
                }
                if (items.length === 0) {
                    return;
                }
                // 移除项目
                for (let item of items) {
                    if (this.editData.boPropertyInformations.indexOf(item) >= 0) {
                        if (item.isNew) {
                            // 新建的移除集合
                            this.editData.boPropertyInformations.remove(item);
                        } else {
                            // 非新建标记删除
                            item.delete();
                        }
                    }
                }
                // 仅显示没有标记删除的
                this.view.showBOPropertyInformations(this.editData.boPropertyInformations.filterDeleted());
            }
            private editBOPropertyInformationData: bo.BOPropertyInformation;
            /** 编辑属性值事件 */
            editBOPropertyInformation(item: bo.BOPropertyInformation): void {
                this.editBOPropertyInformationData = item;
                if (ibas.objects.isNull(this.editBOPropertyInformationData)) {
                    // 无编辑对象
                    this.view.showBOPropertyInformations(this.editData.boPropertyInformations.filterDeleted());
                } else {
                    // 存在编辑对象
                    this.view.showBOPropertyValues(this.editBOPropertyInformationData.boPropertyValues.filterDeleted());
                }
            }
            /** 添加属性值事件 */
            addBOPropertyValue(): void {
                if (!this.editBOPropertyInformationData) {
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_edit")));
                    return;
                }
                this.editBOPropertyInformationData.boPropertyValues.create();
                // 仅显示没有标记删除的
                this.view.showBOPropertyValues(this.editBOPropertyInformationData.boPropertyValues.filterDeleted());
            }
            /** 删除属性值事件 */
            removeBOPropertyValue(items: bo.BOPropertyValue[]): void {
                if (!this.editBOPropertyInformationData) {
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_edit")));
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
                    if (this.editBOPropertyInformationData.boPropertyValues.indexOf(item) >= 0) {
                        if (item.isNew) {
                            // 新建的移除集合
                            this.editBOPropertyInformationData.boPropertyValues.remove(item);
                        } else {
                            // 非新建标记删除
                            item.delete();
                        }
                    }
                }
                // 仅显示没有标记删除的
                this.view.showBOPropertyValues(this.editBOPropertyInformationData.boPropertyValues.filterDeleted());
            }
            private boNumbering(): void {
                if (ibas.strings.isEmpty(this.editData.objectType)) {
                    return;
                }
                let app: BONumberingEditApp = new BONumberingEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(this.editData.code);
            }
        }
        /** 视图-业务对象信息 */
        export interface IBOInformationEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showBOInformation(data: bo.BOInformation): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 添加业务对象属性信息事件 */
            addBOPropertyInformationEvent: Function;
            /** 删除业务对象属性信息事件 */
            removeBOPropertyInformationEvent: Function;
            /** 显示数据 */
            showBOPropertyInformations(datas: bo.BOPropertyInformation[]): void;
            /** 编辑业务对象属性信息 */
            editBOPropertyInformationEvent: Function;
            /** 添加业务对象属性值事件 */
            addBOPropertyValueEvent: Function;
            /** 删除业务对象属性值事件 */
            removeBOPropertyValueEvent: Function;
            /** 显示数据 */
            showBOPropertyValues(datas: bo.BOPropertyValue[]): void;
            /** 业务对象编号 */
            boNumberingEvent: Function;
        }
    }
}