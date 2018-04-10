/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {

        /** 列表应用-组织 */
        export class OrganizationListApp extends ibas.BOListApplication<IOrganizationListView, bo.Organization> {

            /** 应用标识 */
            static APPLICATION_ID: string = "80b337ff-61cb-4690-b6af-bc7d1c169fe3";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_organization_list";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.Organization.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = OrganizationListApp.APPLICATION_ID;
                this.name = OrganizationListApp.APPLICATION_NAME;
                this.boCode = OrganizationListApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.editDataEvent = this.editData;
                this.view.deleteDataEvent = this.deleteData;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
            }
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchOrganization({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Organization>): void {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.showData(opRslt.resultObjects);
                            that.busy(false);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 新建数据 */
            protected newData(): void {
                let app: OrganizationEditApp = new OrganizationEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run();
            }
            /** 查看数据，参数：目标数据 */
            protected viewData(data: bo.Organization): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_view")
                    ));
                    return;
                }
            }
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.Organization): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_edit")
                    ));
                    return;
                }
                let app: OrganizationEditApp = new OrganizationEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(data);
            }
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.Organization | bo.Organization[]): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_delete")
                    ));
                    return;
                }
                let beDeleteds: ibas.ArrayList<bo.Organization> = new ibas.ArrayList<bo.Organization>();
                if (data instanceof Array) {
                    for (let item of data) {
                        item.delete();
                        beDeleteds.add(item);
                    }
                } else {
                    data.delete();
                    beDeleteds.add(data);
                }
                // 没有选择删除的对象
                if (beDeleteds.length === 0) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_delete")
                    ));
                    return;
                }
                let that: this = this;
                this.messages({
                    type: ibas.emMessageType.QUESTION,
                    title: ibas.i18n.prop(this.name),
                    message: ibas.i18n.prop("shell_multiple_data_delete_continue", beDeleteds.length),
                    actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                    onCompleted(action: ibas.emMessageAction): void {
                        if (action === ibas.emMessageAction.YES) {
                            try {
                                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                                let saveMethod: Function = function (beSaved: bo.Organization): void {
                                    boRepository.saveOrganization({
                                        beSaved: beSaved,
                                        onCompleted(opRslt: ibas.IOperationResult<bo.Organization>): void {
                                            try {
                                                if (opRslt.resultCode !== 0) {
                                                    throw new Error(opRslt.message);
                                                }
                                                // 保存下一个数据
                                                let index: number = beDeleteds.indexOf(beSaved) + 1;
                                                if (index > 0 && index < beDeleteds.length) {
                                                    saveMethod(beDeleteds[index]);
                                                } else {
                                                    // 处理完成
                                                    that.busy(false);
                                                    that.messages(ibas.emMessageType.SUCCESS,
                                                        ibas.i18n.prop("shell_data_delete") + ibas.i18n.prop("shell_sucessful"));
                                                }
                                            } catch (error) {
                                                that.messages(ibas.emMessageType.ERROR,
                                                    ibas.i18n.prop("shell_data_delete_error", beSaved, error.message));
                                            }
                                        }
                                    });
                                    that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_deleting", beSaved));
                                };
                                that.busy(true);
                                // 开始保存
                                saveMethod(beDeleteds.firstOrDefault());
                            } catch (error) {
                                that.busy(false);
                                that.messages(error);
                            }
                        }
                    }
                });
            }
        }
        /** 视图-组织 */
        export interface IOrganizationListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.Organization[]): void;
        }
    }
}