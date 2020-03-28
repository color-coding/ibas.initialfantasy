/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        /** 应用-业务对象信息 */
        export class BOPropertyChooseApp extends ibas.BOChooseService<IBOPropertyChooseView, bo.IBOPropertyInformation> {
            /** 应用标识 */
            static APPLICATION_ID: string = "f4c91c58-5422-4bc1-b240-57f353350252";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_boproperty_choose";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.BO_CODE_BOPROPERTY;
            /** 构造函数 */
            constructor() {
                super();
                this.id = BOPropertyChooseApp.APPLICATION_ID;
                this.name = BOPropertyChooseApp.APPLICATION_NAME;
                this.boCode = BOPropertyChooseApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
            }
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void {
                this.busy(true);
                if (criteria.sorts instanceof Array) {
                    // 仅保留Code排序
                    let sort: ibas.ISort = criteria.sorts.firstOrDefault(c => c.alias === bo.BOInformation.PROPERTY_CODE_NAME);
                    criteria.sorts.clear();
                    criteria.sorts.add(sort);
                }
                let that: this = this;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchBOInformation({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.BOInformation>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            let datas: ibas.IList<bo.IBOPropertyInformation> = new ibas.ArrayList<bo.IBOPropertyInformation>();
                            for (let boItem of opRslt.resultObjects) {
                                for (let ptyItem of boItem.boPropertyInformations) {
                                    datas.add(ptyItem);
                                }
                            }
                            if (datas.length === 1
                                && ibas.config.get(ibas.CONFIG_ITEM_AUTO_CHOOSE_DATA, true) && !that.isViewShowed()) {
                                // 仅一条数据，直接选择
                                that.chooseData(datas);
                            } else {
                                if (!that.isViewShowed()) {
                                    // 没显示视图，先显示
                                    that.show();
                                }
                                if (opRslt.resultObjects.length === 0) {
                                    that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                                }
                                that.view.showData(datas);
                            }
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 新建数据 */
            protected newData(): void {
            }
        }
        /** 视图-业务对象信息 */
        export interface IBOPropertyChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.IBOPropertyInformation[]): void;
        }
        /** 业务对象信息选择服务映射 */
        export class BOPropertyChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = BOPropertyChooseApp.APPLICATION_ID;
                this.name = BOPropertyChooseApp.APPLICATION_NAME;
                this.boCode = BOPropertyChooseApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.IBOPropertyInformation>> {
                return new BOPropertyChooseApp();
            }
        }
    }
}