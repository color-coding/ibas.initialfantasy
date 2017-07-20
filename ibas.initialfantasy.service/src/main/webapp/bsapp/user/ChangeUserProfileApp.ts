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

/** 应用-更改用户配置 */
export class ChangeUserProfileApp
    extends ibas.Application<IChangeUserProfileView>
    implements ibas.IService<ibas.IDataServiceContract> {

    /** 应用标识 */
    static APPLICATION_ID: string = "2868c3e7-52e3-409d-acba-a62ad0a668bb";
    /** 应用名称 */
    static APPLICATION_NAME: string = "initialfantasy_app_change_user_profile";

    constructor() {
        super();
        this.id = ChangeUserProfileApp.APPLICATION_ID;
        this.name = ChangeUserProfileApp.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.saveUserEvent = this.saveUser;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
    }
    /** 运行服务 */
    run(contract: ibas.IDataServiceContract): void {
        super.run();
        let criteria: ibas.ICriteria = new ibas.Criteria();
        let condition: ibas.ICondition = criteria.conditions.create();
        condition.alias = bo.User.PROPERTY_CODE_NAME;
        if (!ibas.objects.isNull(contract) && !ibas.objects.isNull(contract.data)) {
            condition.value = (<string>contract.data).substring((<string>contract.data).lastIndexOf("/") + 1);
        }
        if (ibas.objects.isNull(condition.value)) {
            condition.value = ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_CODE);
        }
        this.fetchUser(criteria);
    }
    private user: bo.User;
    private fetchUser(criteria: ibas.ICriteria): void {
        let that: this = this;
        let boRepository: BORepositoryInitialFantasy = new BORepositoryInitialFantasy();
        boRepository.fetchUser({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.User>): void {
                that.user = opRslt.resultObjects.firstOrDefault();
                if (ibas.objects.isNull(that.user)) {
                    that.user = new bo.User();
                    that.user.code = "UNKNOWN";
                    that.user.name = ibas.i18n.prop("initialfantasy_unknown_user");
                }
                that.view.showUser(that.user);
            }
        });
    }
    private saveUser(): void {
        let that: this = this;
        let boRepository: BORepositoryInitialFantasy = new BORepositoryInitialFantasy();
        boRepository.saveUser({
            beSaved: this.user,
            onCompleted(opRslt: ibas.IOperationResult<bo.User>): void {
                try {
                    that.busy(false);
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    that.messages(ibas.emMessageType.SUCCESS,
                        ibas.i18n.prop("sys_shell_data_save") + ibas.i18n.prop("sys_shell_sucessful"));
                    that.user = opRslt.resultObjects.firstOrDefault();
                    if (ibas.objects.isNull(that.user)) {
                        that.user = new bo.User();
                        that.user.code = "UNKNOWN";
                        that.user.name = ibas.i18n.prop("initialfantasy_unknown_user");
                    }
                    that.view.showUser(that.user);
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.busy(true);
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_saving_data"));
    }
}
/** 视图-更改用户配置 */
export interface IChangeUserProfileView extends ibas.IView {
    /** 显示用户信息 */
    showUser(user: bo.User): void;
    /** 保存用户事件 */
    saveUserEvent: Function;
}
/** 用户选择服务映射 */
export class ChangeUserProfileMapping extends ibas.ServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = ChangeUserProfileApp.APPLICATION_ID;
        this.name = ChangeUserProfileApp.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 创建服务并运行 */
    create(): ibas.IService<ibas.IServiceContract> {
        return new ChangeUserProfileApp();
    }
}