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

/** 应用-组织 */
export class OrganizationEditApp extends ibas.BOEditApplication<IOrganizationEditView, bo.Organization> {

    /** 应用标识 */
    static APPLICATION_ID: string = "33a09f75-3896-4e82-85ed-85ed7af7bb65";
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
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        this.view.showOrganization(this.editData);
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        // 尝试设置编辑对象
        if (!ibas.objects.isNull(args) && args.length === 1 && ibas.objects.instanceOf(args[0], bo.Organization)) {
            this.editData = args[0];
        }
        // 创建编辑对象实例
        if (ibas.objects.isNull(this.editData)) {
            this.editData = new bo.Organization();
            this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_data_created_new"));

        }
        super.run();
    }
    /** 待编辑的数据 */
    protected editData: bo.Organization;
    /** 保存数据 */
    protected saveData(): void {
        try {
            let that = this;
            let boRepository: BORepositoryInitialFantasy = new BORepositoryInitialFantasy();
            boRepository.saveOrganization({
                beSaved: this.editData,
                onCompleted(opRslt: ibas.IOperationResult<bo.Organization>): void {
                    try {
                        that.busy(false);
                        if (opRslt.resultCode !== 0) {
                            throw new Error(opRslt.message);
                        }
                        if (opRslt.resultObjects.length === 0) {
                            that.messages(ibas.emMessageType.SUCCESS,
                                ibas.i18n.prop("sys_shell_data_delete") + ibas.i18n.prop("sys_shell_sucessful"));
                            // 创建新的对象
                            that.editData = new bo.Organization();
                        } else {
                            // 替换编辑对象
                            that.editData = opRslt.resultObjects.firstOrDefault();
                            that.messages(ibas.emMessageType.SUCCESS,
                                ibas.i18n.prop("sys_shell_data_save") + ibas.i18n.prop("sys_shell_sucessful"));
                        }
                        // 刷新当前视图
                        that.viewShowed();
                    } catch (error) {
                        that.messages(error);
                    }
                }
            });
            this.busy(true);
            this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_saving_data"));
        } catch (error) {
            this.messages(error);
        }
    }
    /** 删除数据 */
    protected deleteData(): void {
        let that = this;
        this.messages({
            type: ibas.emMessageType.QUESTION,
            title: ibas.i18n.prop(this.name),
            message: ibas.i18n.prop("sys_whether_to_delete"),
            actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
            onCompleted(action: ibas.emMessageAction): void {
                if (action === ibas.emMessageAction.YES) {
                    that.editData.delete();
                    that.saveData();
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
}
