/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        /** 查看应用-用户 */
        export class UserViewApp extends ibas.BOViewService<IUserViewView, bo.User> {
            /** 应用标识 */
            static APPLICATION_ID: string = "40e34ed7-5890-4f7b-9206-a3dec5a60a23";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_user_view";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.User.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = UserViewApp.APPLICATION_ID;
                this.name = UserViewApp.APPLICATION_NAME;
                this.boCode = UserViewApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.editDataEvent = this.editData;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成，基类方法更新地址
                super.viewShowed();
                if (ibas.objects.isNull(this.viewData)) {
                    // 创建编辑对象实例
                    this.viewData = new bo.User();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showUser(this.viewData);
            }
            /** 编辑数据，参数：目标数据 */
            protected editData(): void {
                let app: UserEditApp = new UserEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(this.viewData);
            }
            run(): void;
            run(data: bo.User): void;
            /** 运行 */
            run(): void {
                if (ibas.objects.instanceOf(arguments[0], bo.User)) {
                    this.viewData = arguments[0];
                    this.show();
                } else {
                    super.run.apply(this, arguments);
                }
            }
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria | string): void {
                this.busy(true);
                let that: this = this;
                if (typeof criteria === "string") {
                    let condition: ibas.ICondition;
                    let value: string = criteria;
                    criteria = new ibas.Criteria();
                    criteria.result = 1;
                    condition = criteria.conditions.create();
                    if (ibas.numbers.isNumber(value)) {
                        condition.alias = bo.User.PROPERTY_DOCENTRY_NAME;
                    } else {
                        condition.alias = bo.User.PROPERTY_CODE_NAME;
                    }
                    condition.value = value;
                }
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchUser({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.User>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            that.viewData = opRslt.resultObjects.firstOrDefault();
                            if (!that.isViewShowed()) {
                                // 没显示视图，先显示
                                that.show();
                            } else {
                                that.viewShowed();
                            }
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
        }
        /** 视图-用户 */
        export interface IUserViewView extends ibas.IBOViewView {
            /** 显示数据 */
            showUser(data: bo.User): void;

        }
        /** 用户连接服务映射 */
        export class UserLinkServiceMapping extends ibas.BOLinkServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = UserViewApp.APPLICATION_ID;
                this.name = UserViewApp.APPLICATION_NAME;
                this.boCode = UserViewApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IBOLinkService {
                return new UserViewApp();
            }
        }
    }
}
