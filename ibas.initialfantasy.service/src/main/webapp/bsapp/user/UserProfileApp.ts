/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {

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
                this.view.editUserEvent = this.editUser;
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
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchUser({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.User>): void {
                        that.user = opRslt.resultObjects.firstOrDefault();
                        if (ibas.objects.isNull(that.user)) {
                            that.user = new bo.User();
                            that.user.docEntry = ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_ID);
                            that.user.code = ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_CODE);
                            that.user.name = ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_NAME);
                        }
                        that.view.showUser(that.user);
                    }
                });
            }
            private editUser(): void {
                let app: ChangeUserProfileApp = new ChangeUserProfileApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(this.user);
            }
            protected barShowed(): void {
                super.barShowed();
                let expDays: number = config.get(config.CONFIG_VALUE_USER_PASSWORD_EXPIRATION_DAYS, 0);
                if (expDays > 0) {
                    setTimeout(() => {
                        let criteria: ibas.ICriteria = new ibas.Criteria();
                        let condition: ibas.ICondition = criteria.conditions.create();
                        condition.alias = bo.User.PROPERTY_CODE_NAME;
                        condition.value = ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_CODE);
                        let that: this = this;
                        let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                        boRepository.fetchUser({
                            criteria: criteria,
                            onCompleted(opRslt: ibas.IOperationResult<bo.User>): void {
                                for (let item of opRslt.resultObjects) {
                                    let date: Date = item.lastPwdSetDate;
                                    if (ibas.objects.isNull(date)) {
                                        date = item.createDate;
                                    }
                                    if (!ibas.objects.isNull(date)) {
                                        let warnDays: number = expDays / 5;
                                        date = ibas.dates.add(ibas.dates.emDifferenceType.DAY, date, expDays);
                                        if (ibas.dates.difference(ibas.dates.emDifferenceType.DAY, date, ibas.dates.today()) <= warnDays) {
                                            that.messages({
                                                type: ibas.emMessageType.QUESTION,
                                                title: ibas.i18n.prop(that.name),
                                                message: ibas.i18n.prop("initialfantasy_password_about_to_expire"),
                                                actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                                                onCompleted(action: ibas.emMessageAction): void {
                                                    if (action !== ibas.emMessageAction.YES) {
                                                        return;
                                                    }
                                                    let app: ChangeUserProfileApp = new ChangeUserProfileApp();
                                                    app.navigation = that.navigation;
                                                    app.viewShower = that.viewShower;
                                                    app.run(item);
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        });
                    }, 60000);
                }
            }
        }
        /** 视图-用户配置 */
        export interface IUserProfileView extends ibas.IResidentView {
            /** 显示用户信息 */
            showUser(user: bo.User): void;
            /** 编辑用户 */
            editUserEvent: Function;
        }
        export class UserProfileApplicationMapping extends ibas.ResidentApplicationMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = UserProfileApp.APPLICATION_ID;
                this.name = UserProfileApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            create(): ibas.ResidentApplication<ibas.IResidentView> {
                return new UserProfileApp();
            }
        }
    }
}