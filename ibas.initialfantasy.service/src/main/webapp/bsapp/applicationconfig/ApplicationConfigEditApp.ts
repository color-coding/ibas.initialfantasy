/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        /** 编辑应用-应用程序配置 */
        export class ApplicationConfigEditApp extends ibas.BOEditApplication<IApplicationConfigEditView, bo.ApplicationConfig> {

            /** 应用标识 */
            static APPLICATION_ID: string = "627b6f73-e3a3-4809-a83d-63f8ff770ce5";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_applicationconfig_edit";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.ApplicationConfig.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = ApplicationConfigEditApp.APPLICATION_ID;
                this.name = ApplicationConfigEditApp.APPLICATION_NAME;
                this.boCode = ApplicationConfigEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.ApplicationConfig();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showApplicationConfig(this.editData);
            }
            run(): void;
            run(data: bo.ApplicationConfig): void;
            run(): void {
                let that: this = this;
                if (ibas.objects.instanceOf(arguments[0], bo.ApplicationConfig)) {
                    let data: bo.ApplicationConfig = arguments[0];
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
                        boRepository.fetchApplicationConfig({
                            criteria: criteria,
                            onCompleted(opRslt: ibas.IOperationResult<bo.ApplicationConfig>): void {
                                let data: bo.ApplicationConfig;
                                if (opRslt.resultCode === 0) {
                                    data = opRslt.resultObjects.firstOrDefault();
                                }
                                if (ibas.objects.instanceOf(data, bo.ApplicationConfig)) {
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
                        return; // 退出
                    }
                }
                super.run.apply(this, arguments);
            }
            /** 待编辑的数据 */
            protected editData: bo.ApplicationConfig;
            /** 保存数据 */
            protected saveData(): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.saveApplicationConfig({
                    beSaved: this.editData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.ApplicationConfig>): void {
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
        }
        /** 视图-应用程序配置 */
        export interface IApplicationConfigEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showApplicationConfig(data: bo.ApplicationConfig): void;
        }
    }
}
