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
import { ApplicationPlatformViewApp } from "./ApplicationPlatformViewApp";
import { ApplicationPlatformEditApp } from "./ApplicationPlatformEditApp";

/** 列表应用-应用程序平台 */
export class ApplicationPlatformListApp extends ibas.BOListApplication<IApplicationPlatformListView, bo.ApplicationPlatform> {

    /** 应用标识 */
    static APPLICATION_ID: string = "950142b1-1512-4cb0-90d3-46092c16b726";
    /** 应用名称 */
    static APPLICATION_NAME: string = "initialfantasy_app_applicationplatform_list";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.ApplicationPlatform.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = ApplicationPlatformListApp.APPLICATION_ID;
        this.name = ApplicationPlatformListApp.APPLICATION_NAME;
        this.boCode = ApplicationPlatformListApp.BUSINESS_OBJECT_CODE;
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
        let boRepository: BORepositoryInitialFantasy = new BORepositoryInitialFantasy();
        boRepository.fetchApplicationPlatform({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.ApplicationPlatform>): void {
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
        let app: ApplicationPlatformEditApp = new ApplicationPlatformEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run();
    }
    /** 查看数据，参数：目标数据 */
    protected viewData(data: bo.ApplicationPlatform): void {
        // 检查目标数据
        if (ibas.objects.isNull(data)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("shell_data_view")
            ));
            return;
        }
        let app: ApplicationPlatformViewApp = new ApplicationPlatformViewApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run(data);

    }
    /** 编辑数据，参数：目标数据 */
    protected editData(data: bo.ApplicationPlatform): void {
        // 检查目标数据
        if (ibas.objects.isNull(data)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("shell_data_edit")
            ));
            return;
        }
        let app: ApplicationPlatformEditApp = new ApplicationPlatformEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run(data);
    }
    /** 删除数据，参数：目标数据集合 */
    protected deleteData(data: bo.ApplicationPlatform | bo.ApplicationPlatform[]): void {
        // 检查目标数据
        if (ibas.objects.isNull(data)) {
            this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                ibas.i18n.prop("shell_data_delete")
            ));
            return;
        }
        let beDeleteds: ibas.ArrayList<bo.ApplicationPlatform> = new ibas.ArrayList<bo.ApplicationPlatform>();
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
            return;
        }
        let that: this = this;
        this.messages({
            type: ibas.emMessageType.QUESTION,
            title: ibas.i18n.prop(this.name),
            message: ibas.i18n.prop("shell_whether_to_delete", beDeleteds.length),
            actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
            onCompleted(action: ibas.emMessageAction): void {
                if (action === ibas.emMessageAction.YES) {
                    try {
                        let boRepository: BORepositoryInitialFantasy = new BORepositoryInitialFantasy();
                        let saveMethod: Function = function (beSaved: bo.ApplicationPlatform): void {
                            boRepository.saveApplicationPlatform({
                                beSaved: beSaved,
                                onCompleted(opRslt: ibas.IOperationResult<bo.ApplicationPlatform>): void {
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
    /** 获取服务的契约 */
    protected getServiceProxies(): ibas.IServiceProxy<ibas.IServiceContract>[] {
        return [];
    }
}
/** 视图-应用程序平台 */
export interface IApplicationPlatformListView extends ibas.IBOListView {
    /** 编辑数据事件，参数：编辑对象 */
    editDataEvent: Function;
    /** 删除数据事件，参数：删除对象集合 */
    deleteDataEvent: Function;
    /** 显示数据 */
    showData(datas: bo.ApplicationPlatform[]): void;
}
