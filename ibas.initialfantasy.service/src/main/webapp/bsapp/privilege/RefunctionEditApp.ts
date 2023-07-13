/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        export class ModuleProxy extends ibas.Element {
            constructor() {
                super();
                this.elements = new ibas.ArrayList<FunctionProxy>();
            }
            version: string;
            copyright: string;
            icon: string;
            elements: FunctionProxy[];
        }
        export class FunctionProxy extends ibas.Element implements ibas.IFunction {
            constructor() {
                super();
                this.assigned = false;
            }
            assigned: boolean;
        }
        /** 编辑应用-重组功能 */
        export class RefunctionEditApp extends ibas.Application<IRefunctionEditView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "db299573-d7b8-4c15-8148-3ac98e1f1878";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_refunction_edit";
            /** 构造函数 */
            constructor() {
                super();
                this.id = RefunctionEditApp.APPLICATION_ID;
                this.name = RefunctionEditApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.saveDataEvent = this.saveData;
                this.view.deleteDataEvent = this.deleteData;
                this.view.createDataEvent = this.createData;
                this.view.addRefunctionItemEvent = this.addRefunctionItem;
                this.view.removeRefunctionItemEvent = this.removeRefunctionItem;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.Refunction();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showRefunction(this.editData);
                this.view.showRefunctionItems(this.editData.refunctionItems.filterDeleted());
                this.view.showFunctions(this.modules);
            }
            run(data?: bo.Refunction, modules?: app.ModuleProxy[]): void {
                this.editData = data;
                this.modules = ibas.arrays.create(modules);
                super.run.apply(this, arguments);
            }
            protected editData: bo.Refunction;
            protected modules: ibas.ArrayList<app.ModuleProxy>;
            /** 保存数据 */
            protected saveData(): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.saveRefunction({
                    beSaved: this.editData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Refunction>): void {
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
                        that.editData = new bo.Refunction();
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
            /** 添加重组功能-项目事件 */
            protected addRefunctionItem(target?: ModuleProxy | FunctionProxy, parent?: bo.RefunctionItem): void {
                if (arguments.length === 0) {
                    let item: bo.RefunctionItem = this.editData.refunctionItems.create();
                    item.image = ibas.config.get("defalutModuleIcon");
                    item.function = ibas.uuids.random();
                    item.description = ibas.i18n.prop(["shell_my", "shell_apply"]);
                } else {
                    if (ibas.objects.isNull(parent)) {
                        if (target instanceof ModuleProxy) {
                            parent = this.editData.refunctionItems.create();
                            parent.image = target.icon;
                            parent.function = target.id;
                            parent.description = target.description;
                        } else if (target instanceof FunctionProxy) {
                            parent = this.editData.refunctionItems.create();
                            parent.image = ibas.config.get("defalutModuleIcon");
                            parent.function = ibas.uuids.random();
                            parent.description = ibas.i18n.prop(["shell_my", "shell_apply"]);
                        }
                    } else {
                        if (parent.parent > 0) {
                            this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("initialfantasy_node_not_support_operation"));
                            return;
                        }
                    }
                    if (target instanceof ModuleProxy) {
                        let item: bo.RefunctionItem = null;
                        for (let eItem of target.elements) {
                            item = parent.refunctionItems.create();
                            item.function = eItem.id;
                            item.description = eItem.description;
                        }
                    } else if (target instanceof FunctionProxy) {
                        let item: bo.RefunctionItem = null;
                        item = parent.refunctionItems.create();
                        item.function = target.id;
                        item.description = target.description;
                    }
                }
                this.view.showRefunctionItems(this.editData.refunctionItems.filterDeleted());
            }
            /** 删除重组功能-项目事件 */
            protected removeRefunctionItem(item: bo.RefunctionItem, parent?: bo.RefunctionItems): void {
                if (ibas.objects.isNull(parent)) {
                    parent = this.editData.refunctionItems;
                }
                if (parent.indexOf(item) >= 0) {
                    if (item.isNew) {
                        parent.remove(item);
                    } else {
                        item.delete();
                    }
                    this.view.showRefunctionItems(this.editData.refunctionItems.filterDeleted());
                } else {
                    for (let eItem of parent) {
                        this.removeRefunctionItem(item, eItem.refunctionItems);
                    }
                }
            }
            /** 关闭视图 */
            close(): void {
                if (ibas.config.get(ibas.CONFIG_ITEM_DEBUG_MODE) === true) {
                    super.close();
                } else if (this.editData.isDirty === true
                    || this.editData.refunctionItems.where(c => c.isDirty === true).length > 0) {
                    this.messages({
                        type: ibas.emMessageType.QUESTION,
                        message: ibas.i18n.prop("sys_data_modified_continue_close_view"),
                        actions: [
                            ibas.emMessageAction.YES,
                            ibas.emMessageAction.NO
                        ],
                        onCompleted: (action) => {
                            if (action === ibas.emMessageAction.YES) {
                                super.close();
                            }
                        }
                    });
                } else {
                    super.close();
                }
            }
        }

        /** 视图-重组功能 */
        export interface IRefunctionEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showRefunction(data: bo.Refunction): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 添加重组功能-项目事件 */
            addRefunctionItemEvent: Function;
            /** 删除重组功能-项目事件 */
            removeRefunctionItemEvent: Function;
            /** 显示数据-重组功能-项目 */
            showRefunctionItems(datas: bo.RefunctionItem[]): void;
            /** 显示数据-模块功能 */
            showFunctions(datas: app.ModuleProxy[]): void;
        }
    }
}
