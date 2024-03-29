/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        /** 查看应用-组织 */
        export class OrganizationViewApp extends ibas.BOViewService<IOrganizationViewView, bo.Organization> {
            /** 应用标识 */
            static APPLICATION_ID: string = "51f698a3-6de1-4dde-a2e3-1471af19572c";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_organization_view";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.Organization.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = OrganizationViewApp.APPLICATION_ID;
                this.name = OrganizationViewApp.APPLICATION_NAME;
                this.boCode = OrganizationViewApp.BUSINESS_OBJECT_CODE;
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
                    this.viewData = new bo.Organization();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showOrganization(this.viewData);
                if (this.viewData.isNew === false && this.viewData.grouped === ibas.emYesNo.YES) {
                    this.busy(true);
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.Organization.PROPERTY_PARENT_NAME;
                    condition.value = this.viewData.code;
                    condition = criteria.conditions.create();
                    condition.alias = bo.Organization.PROPERTY_ACTIVATED_NAME;
                    condition.value = ibas.emYesNo.YES.toString();
                    let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                    boRepository.fetchOrganization({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            try {
                                this.busy(false);
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                this.view.showChildOrganizations(opRslt.resultObjects);
                            } catch (error) {
                                this.messages(error);
                            }

                        }
                    });
                }
            }
            /** 编辑数据，参数：目标数据 */
            protected editData(): void {
                let app: OrganizationEditApp = new OrganizationEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(this.viewData);
            }
            run(): void;
            run(data: bo.Organization): void;
            /** 运行 */
            run(): void {
                if (ibas.objects.instanceOf(arguments[0], bo.Organization)) {
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
                    condition.alias = bo.Organization.PROPERTY_CODE_NAME;
                    condition.value = value;
                }
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchOrganization({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Organization>): void {
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
        /** 视图-组织 */
        export interface IOrganizationViewView extends ibas.IBOViewView {
            /** 显示数据 */
            showOrganization(data: bo.Organization): void;
            /** 显示数据子项 */
            showChildOrganizations(datas: bo.Organization[]): void;
        }
        /** 组织连接服务映射 */
        export class OrganizationLinkServiceMapping extends ibas.BOLinkServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = OrganizationViewApp.APPLICATION_ID;
                this.name = OrganizationViewApp.APPLICATION_NAME;
                this.boCode = OrganizationViewApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IBOLinkService {
                return new OrganizationViewApp();
            }
        }
    }
}
