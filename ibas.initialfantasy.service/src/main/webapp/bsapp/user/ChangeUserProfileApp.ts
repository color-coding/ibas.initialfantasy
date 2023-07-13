/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        /** 应用-更改用户配置 */
        export class ChangeUserProfileApp extends ibas.Application<IChangeUserProfileView> implements ibas.IService<ibas.IServiceCaller<ibas.IServiceContract>> {
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
            /** 运行 */
            run(user?: bo.User | string | number | ibas.IServiceCaller<ibas.IServiceContract>): void {
                let criteria: ibas.ICriteria = new ibas.Criteria();
                if (user instanceof bo.User) {
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.User.PROPERTY_CODE_NAME;
                    condition.value = user.code;
                } else if (typeof user === "string") {
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.User.PROPERTY_CODE_NAME;
                    condition.value = user;
                } else if (typeof user === "number") {
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.User.PROPERTY_DOCENTRY_NAME;
                    condition.value = String(user);
                } else if (typeof user === "object") {
                    let contract: ibas.IServiceCaller<ibas.IServiceContract> = user;
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.User.PROPERTY_CODE_NAME;
                    if (!ibas.strings.isEmpty(contract.category)) {
                        condition.value = contract.category.substring(contract.category.lastIndexOf("/") + 1);
                        ibas.urls.changeHash("");
                    }
                    if (ibas.strings.isEmpty(condition.value)) {
                        condition.value = ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_CODE);
                    }
                }
                if (criteria.conditions.length > 0) {
                    this.fetchUser(criteria);
                } else {
                    this.messages(ibas.emMessageType.ERROR, ibas.i18n.prop("initialfantasy_unknown_user"));
                }
            }
            private user: bo.User;
            private fetchUser(criteria: ibas.ICriteria): void {
                let that: this = this;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchUser({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.User>): void {
                        that.user = opRslt.resultObjects.firstOrDefault();
                        if (ibas.objects.isNull(that.user)) {
                            that.messages(ibas.emMessageType.ERROR, ibas.i18n.prop("initialfantasy_unknown_user"));
                        } else {
                            if (!that.isViewShowed()) {
                                that.show();
                                that.view.showUser(that.user);
                            }
                        }
                    }
                });
            }
            private saveUser(): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.saveUser({
                    beSaved: this.user,
                    onCompleted(opRslt: ibas.IOperationResult<bo.User>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            that.messages(ibas.emMessageType.SUCCESS,
                                ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
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
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_saving_data"));
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
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract> {
                return new ChangeUserProfileApp();
            }
        }
    }
}