/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        /** 应用-用户身份 */
        export class UserIdentityApp extends ibas.Application<IUserIdentityView>  {
            /** 应用标识 */
            static APPLICATION_ID: string = "9416ff05-1a43-4c2c-8133-4837d0983b91";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_user_identity";

            constructor() {
                super();
                this.id = UserIdentityApp.APPLICATION_ID;
                this.name = UserIdentityApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.addIdentityEvent = this.addUserIdentity;
                this.view.removeIdentityEvent = this.removeUserIdentity;
                this.view.saveIdentityEvent = this.saveUserIdentity;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                if (this.user instanceof bo.User) {
                    let criteria: ibas.Criteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.UserIdentity.PROPERTY_USER_NAME;
                    condition.value = this.user.code;
                    let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                    boRepository.fetchUserIdentity({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                this.identities.clear();
                                this.identities.add(opRslt.resultObjects);
                                this.view.showUsers(this.user);
                                this.view.showIdentities(this.identities.filter(c => c.isDeleted === false));
                            } catch (error) {
                                this.messages(error);
                            }
                        }
                    });
                } else {
                    this.view.showUsers(this.user);
                    this.view.showIdentities(this.identities.filter(c => c.isDeleted === false));
                }
            }
            run(user?: bo.User): void {
                if (ibas.objects.isNull(user)) {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "user"));
                } else {
                    this.user = user;
                    super.run();
                }
            }
            private user: bo.User;
            private identities: bo.UserIdentities = new bo.UserIdentities();

            protected removeUserIdentity(data: bo.UserIdentity | bo.UserIdentity[]): void {
                let beDeleteds: ibas.IList<bo.UserIdentity> = ibas.arrays.create(data);
                // 没有选择删除的对象
                if (beDeleteds.length === 0) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_delete")
                    ));
                    return;
                }
                this.messages({
                    type: ibas.emMessageType.QUESTION,
                    title: ibas.i18n.prop(this.name),
                    message: ibas.i18n.prop("shell_multiple_data_delete_continue", beDeleteds.length),
                    actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                    onCompleted: (action) => {
                        if (action !== ibas.emMessageAction.YES) {
                            return;
                        }
                        beDeleteds.forEach((value) => {
                            if (value.isNew === true) {
                                this.identities.remove(value);
                            } else {
                                value.delete();
                            }
                        });
                        this.view.showIdentities(this.identities.filter(c => c.isDeleted === false));
                    }
                });
            }
            protected addUserIdentity(caller?: bo.UserIdentity): void {
                ibas.servicesManager.runChooseService<bo.Identity>({
                    boCode: bo.Identity.BUSINESS_OBJECT_CODE,
                    chooseType: ibas.emChooseType.MULTIPLE,
                    criteria: [
                        new ibas.Condition(bo.Identity.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                    ],
                    onCompleted: (selecteds) => {
                        let created: boolean = false;
                        for (let selected of selecteds) {
                            if (ibas.objects.isNull(caller)) {
                                created = true;
                                caller = new bo.UserIdentity();
                                caller.user = this.user.code;
                                this.identities.add(caller);
                            }
                            caller.identity = selected.code;
                            caller = null;
                        }
                        if (created) {
                            this.view.showIdentities(this.identities.filter(c => c.isDeleted === false));
                        }
                    }
                });
            }
            protected saveUserIdentity(beSaveds: bo.UserIdentity[]): void {
                if (ibas.objects.isNull(beSaveds)) {
                    beSaveds = new ibas.ArrayList<bo.UserIdentity>();
                    for (let item of this.identities) {
                        if (item.isSavable === false) {
                            continue;
                        }
                        if (item.isDirty === false) {
                            continue;
                        }
                        beSaveds.push(item);
                    }
                }
                this.busy(true);
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                ibas.queues.execute(beSaveds, (data, next) => {
                    if (data.isNew === true && data.isDeleted === true) {
                        this.identities.remove(data);
                        next();
                    } else {
                        boRepository.saveUserIdentity({
                            beSaved: data,
                            onCompleted: (opRslt) => {
                                if (opRslt.resultCode !== 0) {
                                    next(new Error(opRslt.message));
                                } else {
                                    let index: number = this.identities.indexOf(data);
                                    if (index >= 0) {
                                        if (opRslt.resultObjects.length > 0) {
                                            // 更新or新建
                                            this.identities[index] = opRslt.resultObjects.firstOrDefault();
                                        } else {
                                            // 删除操作
                                            this.identities.removeAt(index);
                                        }
                                    }
                                    next();
                                }
                            }
                        });
                    }
                }, (error) => {
                    this.busy(false);
                    if (error instanceof Error) {
                        this.messages(ibas.emMessageType.ERROR, error.message);
                    } else {
                        this.messages(ibas.emMessageType.SUCCESS, ibas.i18n.prop("shell_sucessful"));
                    }
                    this.view.showIdentities(this.identities.filter(c => c.isDeleted === false));
                });
            }
            /** 关闭视图 */
            close(): void {
                if (this.identities?.where(c => c.isSavable === true && c.isDirty === true).length > 0) {
                    this.messages({
                        type: ibas.emMessageType.QUESTION,
                        message: ibas.i18n.prop("sys_data_modified_continue_close_view"),
                        actions: [
                            ibas.emMessageAction.YES,
                            ibas.emMessageAction.NO
                        ],
                        onCompleted: (action) => {
                            if (action === ibas.emMessageAction.YES) {
                                super.close();
                            }
                        }
                    });
                } else {
                    super.close();
                }
            }
        }
        /** 视图-物料替代 */
        export interface IUserIdentityView extends ibas.IView {
            /** 保存数据事件 */
            saveIdentityEvent: Function;
            /** 添加数据事件 */
            addIdentityEvent: Function;
            /** 移除数据事件 */
            removeIdentityEvent: Function;
            /** 显示数据 */
            showIdentities(datas: bo.UserIdentity[]): void;
            /** 显示数据 */
            showUsers(data: bo.User): void;
        }
    }
}