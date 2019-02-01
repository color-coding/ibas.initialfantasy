/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        /** 列表应用-应用程序元素 */
        export class ApplicationElementListApp extends ibas.BOListApplication<IApplicationElementListView, bo.ApplicationElement> {

            /** 应用标识 */
            static APPLICATION_ID: string = "59eca6f3-6a45-4ea4-a722-1f76ac9f6a0f";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_applicationelement_list";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.ApplicationElement.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = ApplicationElementListApp.APPLICATION_ID;
                this.name = ApplicationElementListApp.APPLICATION_NAME;
                this.boCode = ApplicationElementListApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.editDataEvent = this.editData;
                this.view.deleteDataEvent = this.deleteData;
                this.view.registerElementsEvent = this.registerElements;
                this.view.applicationModuleEvent = this.applicationModule;
                this.view.applicationPlatformEvent = this.applicationPlatform;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
            }
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchApplicationElement({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.ApplicationElement>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (!that.isViewShowed()) {
                                // 没显示视图，先显示
                                that.show();
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.showData(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 新建数据 */
            protected newData(): void {
                let app: ApplicationElementEditApp = new ApplicationElementEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run();
            }
            /** 查看数据，参数：目标数据 */
            protected viewData(data: bo.ApplicationElement): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_view")
                    ));
                    return;
                }
            }
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.ApplicationElement): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_edit")
                    ));
                    return;
                }
                let app: ApplicationElementEditApp = new ApplicationElementEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(data);
            }
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.ApplicationElement | bo.ApplicationElement[]): void {
                let beDeleteds: ibas.IList<bo.ApplicationElement> = ibas.arrays.create(data);
                // 没有选择删除的对象
                if (beDeleteds.length === 0) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_delete")
                    ));
                    return;
                }
                // 标记删除对象
                beDeleteds.forEach((value) => {
                    value.delete();
                });
                let that: this = this;
                this.messages({
                    type: ibas.emMessageType.QUESTION,
                    title: ibas.i18n.prop(this.name),
                    message: ibas.i18n.prop("shell_multiple_data_delete_continue", beDeleteds.length),
                    actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                    onCompleted(action: ibas.emMessageAction): void {
                        if (action !== ibas.emMessageAction.YES) {
                            return;
                        }
                        let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                        ibas.queues.execute(beDeleteds, (data, next) => {
                            // 处理数据
                            boRepository.saveApplicationElement({
                                beSaved: data,
                                onCompleted(opRslt: ibas.IOperationResult<bo.ApplicationElement>): void {
                                    if (opRslt.resultCode !== 0) {
                                        next(new Error(ibas.i18n.prop("shell_data_delete_error", data, opRslt.message)));
                                    } else {
                                        next();
                                    }
                                }
                            });
                            that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_deleting", data));
                        }, (error) => {
                            // 处理完成
                            if (error instanceof Error) {
                                that.messages(ibas.emMessageType.ERROR, error.message);
                            } else {
                                that.messages(ibas.emMessageType.SUCCESS,
                                    ibas.i18n.prop("shell_data_delete") + ibas.i18n.prop("shell_sucessful"));
                            }
                            that.busy(false);
                        });
                        that.busy(true);
                    }
                });
            }
            private registerElements(): void {
                let that: this = this;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let conditionModule: ibas.ICondition = criteria.conditions.create();
                conditionModule.alias = bo.ApplicationElement.PROPERTY_MODULEID_NAME;
                conditionModule.operation = ibas.emConditionOperation.EQUAL;
                let conditionElement: ibas.ICondition = criteria.conditions.create();
                conditionElement.alias = bo.ApplicationElement.PROPERTY_ELEMENTID_NAME;
                conditionElement.operation = ibas.emConditionOperation.EQUAL;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                shell.app.modules.forEach((module) => {
                    this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("initialfantasy_register_module_elements", module.description));
                    conditionModule.value = module.id;
                    for (let element of module.elements()) {
                        conditionElement.value = element.id;
                        boRepository.fetchApplicationElement({
                            criteria: criteria,
                            onCompleted(opRslt: ibas.IOperationResult<bo.ApplicationElement>): void {
                                if (opRslt.resultCode === 0 && opRslt.resultObjects.length === 0) {
                                    let boElement: bo.ApplicationElement = new bo.ApplicationElement;
                                    boElement.moduleId = module.id;
                                    boElement.elementId = element.id;
                                    boElement.elementName = element.name;
                                    if (element instanceof ibas.ModuleFunction) {
                                        boElement.elementType = bo.emElementType.FUNCTION;
                                    } else if (element instanceof ibas.Application) {
                                        boElement.elementType = bo.emElementType.APPLICATION;
                                    } else if (element instanceof ibas.ServiceMapping) {
                                        boElement.elementType = bo.emElementType.SERVICE;
                                    } else {
                                        boElement.elementType = bo.emElementType.OTHER;
                                    }
                                    boRepository.saveApplicationElement({
                                        beSaved: boElement,
                                        onCompleted(opRslt: ibas.IOperationResult<bo.ApplicationElement>): void {
                                            if (opRslt.resultCode !== 0) {
                                                that.proceeding(new Error(opRslt.message));
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            }
            /** 应用程序平台 */
            private applicationPlatform(): void {
                let app: ApplicationPlatformListApp = new ApplicationPlatformListApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run();
            }
            /** 应用程序平台 */
            private applicationModule(): void {
                let app: ApplicationModuleListApp = new ApplicationModuleListApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run();
            }
        }
        /** 视图-应用程序元素 */
        export interface IApplicationElementListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 应用程序平台 */
            applicationPlatformEvent: Function;
            /** 应用程序模块 */
            applicationModuleEvent: Function;
            /** 显示数据 */
            showData(datas: bo.ApplicationElement[]): void;
            /** 注册元素 */
            registerElementsEvent: Function;
        }
    }
}
