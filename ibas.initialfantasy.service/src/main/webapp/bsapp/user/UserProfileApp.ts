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

/** 常驻应用-用户配置 */
export class UserProfileApp extends ibas.ResidentApplication<IUserProfileView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "53c3f324-211b-4037-9419-4e39ab359887";
    /** 应用名称 */
    static APPLICATION_NAME: string = "initialfantasy_app_user_profile";

    constructor() {
        super();
        this.id = UserProfileApp.APPLICATION_ID;
        this.name = UserProfileApp.APPLICATION_NAME;
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
        this.fetchUser();
    }
    private user: bo.User;
    private fetchUser(): void {
        let that: this = this;
        let criteria: ibas.ICriteria = new ibas.Criteria();
        let condition: ibas.ICondition = criteria.conditions.create();
        condition.alias = bo.User.PROPERTY_CODE_NAME;
        condition.value = ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_CODE);
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
}
/** 视图-用户配置 */
export interface IUserProfileView extends ibas.IResidentView {
    /** 显示用户信息 */
    showUser(user: bo.User): void;
    /** 保存用户事件 */
    saveUserEvent: Function;
}