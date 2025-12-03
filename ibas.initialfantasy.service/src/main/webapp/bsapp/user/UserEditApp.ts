/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {

        /** 应用-用户 */
        export class UserEditApp extends ibas.BOEditApplication<IUserEditView, bo.User> {

            /** 应用标识 */
            static APPLICATION_ID: string = "c71ee76b-6bba-4184-afcd-c64a3a2e75a9";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_user_edit";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.User.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = UserEditApp.APPLICATION_ID;
                this.name = UserEditApp.APPLICATION_NAME;
                this.boCode = UserEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.deleteDataEvent = this.deleteData;
                this.view.createDataEvent = this.createData;
                this.view.chooseOrganizationEvent = this.chooseOrganization;
                this.view.editUserIdentityEvent = this.editUserIdentity;
                this.view.addUserSpecificEvent = this.addUserSpecific;
                this.view.removeUserSpecificEvent = this.removeUserSpecific;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.User();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.editSpecifics = new ibas.ArrayList<ibas.KeyText>();
                if (!ibas.strings.isEmpty(this.editData.specifics)) {
                    for (let item of this.editData.specifics.split(";")) {
                        if (ibas.strings.isEmpty(item)) {
                            continue;
                        }
                        let values: string[] = item.split("=");
                        if (values.length > 1) {
                            this.editSpecifics.add(new ibas.KeyText(values[0], values[1]));
                        } else {
                            this.editSpecifics.add(new ibas.KeyText(values[0], values[0]));
                        }
                    }
                }
                this.view.showUser(this.editData);
                this.view.showUserSpecifics(this.editSpecifics);
            }
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.User): void;
            run(): void {
                let that: this = this;
                if (ibas.objects.instanceOf(arguments[0], bo.User)) {
                    let data: bo.User = arguments[0];
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
                        boRepository.fetchUser({
                            criteria: criteria,
                            onCompleted(opRslt: ibas.IOperationResult<bo.User>): void {
                                let data: bo.User;
                                if (opRslt.resultCode === 0) {
                                    data = opRslt.resultObjects.firstOrDefault();
                                }
                                if (ibas.objects.instanceOf(data, bo.User)) {
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
                        // 开始查询数据
                        return;
                    }
                }
                super.run.apply(this, arguments);
            }

            protected editSpecifics: ibas.IList<ibas.KeyText>;
            /** 保存数据 */
            protected saveData(): void {
                this.busy(true);
                let specifics: ibas.StringBuilder = new ibas.StringBuilder();
                specifics.map(null, "");
                specifics.map(undefined, "");
                for (let item of this.editSpecifics) {
                    if (ibas.strings.equalsIgnoreCase(ibas.VARIABLE_NAME_USER_ID, item.key)
                        || ibas.strings.equalsIgnoreCase(ibas.VARIABLE_NAME_USER_CODE, item.key)
                        || ibas.strings.equalsIgnoreCase(ibas.VARIABLE_NAME_USER_NAME, item.key)
                        || ibas.strings.equalsIgnoreCase(ibas.VARIABLE_NAME_USER_BELONG, item.key)
                        || ibas.strings.equalsIgnoreCase(ibas.VARIABLE_NAME_USER_IDENTITIES, item.key)
                    ) {
                        continue;
                    }
                    if (specifics.length > 0) {
                        specifics.append(";");
                    }
                    specifics.append(item.key);
                    specifics.append("=");
                    specifics.append(item.text);
                }
                this.editData.specifics = specifics.toString();
                let that: this = this;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.saveUser({
                    beSaved: this.editData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.User>): void {
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
            /** 删除数据 */
            protected deleteData(): void {
                let that: this = this;
                this.messages({
                    type: ibas.emMessageType.QUESTION,
                    title: ibas.i18n.prop(this.name),
                    message: ibas.i18n.prop("shell_delete_continue"),
                    actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                    onCompleted(action: ibas.emMessageAction): void {
                        if (action === ibas.emMessageAction.YES) {
                            that.editData.delete();
                            that.saveData();
                        }
                    }
                });
            }
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void {
                let that: this = this;
                let createData: Function = function (): void {
                    if (clone) {
                        // 克隆对象
                        that.editData = that.editData.clone();
                        that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_cloned_new"));
                        that.viewShowed();
                    } else {
                        // 新建对象
                        that.editData = new bo.User();
                        that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                        that.viewShowed();
                    }
                };
                if (that.editData.isDirty) {
                    this.messages({
                        type: ibas.emMessageType.QUESTION,
                        title: ibas.i18n.prop(this.name),
                        message: ibas.i18n.prop("shell_data_not_saved_continue"),
                        actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                        onCompleted(action: ibas.emMessageAction): void {
                            if (action === ibas.emMessageAction.YES) {
                                createData();
                            }
                        }
                    });
                } else {
                    createData();
                }
            }
            /** 选择组织标识 */
            private chooseOrganization(): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.Organization>({
                    boCode: bo.BO_CODE_ORGANIZATION,
                    criteria: [
                        new ibas.Condition("Activated", ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                    ],
                    onCompleted(selecteds: ibas.IList<bo.Organization>): void {
                        that.editData.organization = selecteds.firstOrDefault().code;
                    }
                });
            }
            protected editUserIdentity(): void {
                let app: UserIdentityApp = new UserIdentityApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(this.editData);
            }
            /** 添加业务对象属性信息事件 */
            protected addUserSpecific(type: string): void {
                let specific: ibas.KeyText = new ibas.KeyText();
                specific.key = type;
                this.editSpecifics.add(specific);
                this.view.showUserSpecifics(this.editSpecifics);
            }
            /** 删除业务对象属性信息事件 */
            protected removeUserSpecific(items: ibas.KeyText[]): void {
                items = ibas.arrays.create(items);
                if (items.length === 0) {
                    return;
                }
                // 移除项目
                for (let item of items) {
                    if (this.editSpecifics.indexOf(item) >= 0) {
                        this.editSpecifics.remove(item);
                    }
                }
                this.view.showUserSpecifics(this.editSpecifics);
            }
        }
        /** 视图-用户 */
        export interface IUserEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showUser(data: bo.User): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 选择组织 */
            chooseOrganizationEvent: Function;
            /** 编辑用户身份 */
            editUserIdentityEvent: Function;
            /** 显示特征数据 */
            showUserSpecifics(datas: ibas.KeyText[]): void;
            /** 添加用户特征 */
            addUserSpecificEvent: Function;
            /** 移除用户特征 */
            removeUserSpecificEvent: Function;
        }
    }
}