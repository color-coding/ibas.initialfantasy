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
import { ApprovalRequestViewApp } from "./ApprovalRequestViewApp";
import { ApprovalRequestEditApp } from "./ApprovalRequestEditApp";

/** 列表应用-审批请求 */
export class ApprovalRequestListApp extends ibas.BOListApplication<IApprovalRequestListView, bo.ApprovalRequest> {

    /** 应用标识 */
    static APPLICATION_ID: string = "9638ac8e-b83c-45f3-b7dd-dd0fe1bba7fd";
    /** 应用名称 */
    static APPLICATION_NAME: string = "initialfantasy_app_approvalrequest_list";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.ApprovalRequest.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = ApprovalRequestListApp.APPLICATION_ID;
        this.name = ApprovalRequestListApp.APPLICATION_NAME;
        this.boCode = ApprovalRequestListApp.BUSINESS_OBJECT_CODE;
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
        try {
            this.busy(true);
            let that = this;
            let boRepository = new BORepositoryInitialFantasy();
            boRepository.fetchApprovalRequest({
                criteria: criteria,
                onCompleted(opRslt: ibas.IOperationResult<bo.ApprovalRequest>): void {
                    try {
                        if (opRslt.resultCode !== 0) {
                            throw new Error(opRslt.message);
                        }
                        that.view.showData(opRslt.resultObjects);
                        that.busy(false);
                    } catch (error) {
                        that.messages(error);
                    }
                }
            });
            this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_fetching_data"));
        } catch (error) {
            this.messages(error);
        }
    }
    /** 新建数据 */
    protected newData(): void {
        let app = new ApprovalRequestEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run();
    }
    /** 查看数据，参数：目标数据 */
    protected viewData(data: bo.ApprovalRequest): void {
        // 检查目标数据
        if (ibas.objects.isNull(data)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_ui_please_chooose_data",
                ibas.i18n.prop("sys_shell_ui_data_view")
            ));
            return;
        }
        let app = new ApprovalRequestViewApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run(data);

    }
    /** 编辑数据，参数：目标数据 */
    protected editData(data: bo.ApprovalRequest): void {
        // 检查目标数据
        if (ibas.objects.isNull(data)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_ui_please_chooose_data",
                ibas.i18n.prop("sys_shell_ui_data_edit")
            ));
            return;
        }
        let app = new ApprovalRequestEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run(data);
    }
    /** 删除数据，参数：目标数据集合 */
    protected deleteData(data: bo.ApprovalRequest): void {
        // 检查目标数据
        if (ibas.objects.isNull(data)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_ui_please_chooose_data",
                ibas.i18n.prop("sys_shell_ui_data_delete")
            ));
            return;
        }
        let beDeleteds:ibas.ArrayList<bo.ApprovalRequest> = new ibas.ArrayList<bo.ApprovalRequest>();
        if (data instanceof Array ) {
            for (let item of data) {
                if (ibas.objects.instanceOf(item, bo.ApprovalRequest)) {
                    item.delete();
                    beDeleteds.add(item);
                }
            }
        }
        // 没有选择删除的对象
        if (beDeleteds.length === 0) {
            return;
        }
        let that = this;
        this.messages({
            type: ibas.emMessageType.QUESTION,
            title: ibas.i18n.prop(this.name),
            message: ibas.i18n.prop("sys_shell_ui_whether_to_delete", beDeleteds.length),
            actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
            onCompleted(action: ibas.emMessageAction): void {
                if (action === ibas.emMessageAction.YES) {
                    try {
                        let boRepository: BORepositoryInitialFantasy = new BORepositoryInitialFantasy();
                        let saveMethod: Function = function(beSaved: bo.ApprovalRequest):void {
                            boRepository.saveApprovalRequest({
                                beSaved: beSaved,
                                onCompleted(opRslt: ibas.IOperationResult<bo.ApprovalRequest>): void {
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
                                            ibas.i18n.prop("sys_shell_ui_data_delete") + ibas.i18n.prop("sys_shell_ui_sucessful"));
                                        }
                                    } catch (error) {
                                        that.messages(ibas.emMessageType.ERROR,
                                            ibas.i18n.prop("sys_shell_ui_data_delete_error", beSaved, error.message));
                                    }
                                }
                            });
                            that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_ui_data_deleting", beSaved));
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
    /** 获取服务的契约 */
    protected getServiceProxies(): ibas.IServiceProxy<ibas.IServiceContract>[] {
        return [];
    }
}
/** 视图-审批请求 */
export interface IApprovalRequestListView extends ibas.IBOListView {
    /** 编辑数据事件，参数：编辑对象 */
    editDataEvent: Function;
    /** 删除数据事件，参数：删除对象集合 */
    deleteDataEvent: Function;
    /** 显示数据 */
    showData(datas: bo.ApprovalRequest[]): void;
}
