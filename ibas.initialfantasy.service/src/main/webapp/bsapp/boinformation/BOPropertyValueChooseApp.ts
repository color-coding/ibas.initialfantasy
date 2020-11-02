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
        export class BOPropertyValueChooseApp extends ibas.BOChooseService<IBOPropertyValueChooseView, bo.IBOPropertyValue> {
            /** 应用标识 */
            static APPLICATION_ID: string = "5c1583a6-cfcd-4af1-b5a1-30157ce316df";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_bopropertyvalue_choose";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.BO_CODE_BOPROPERTY_VALUE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = BOPropertyValueChooseApp.APPLICATION_ID;
                this.name = BOPropertyValueChooseApp.APPLICATION_NAME;
                this.boCode = BOPropertyValueChooseApp.BUSINESS_OBJECT_CODE;
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
                let nCriteria: ibas.ICriteria = new ibas.Criteria();
                for (let codition of criteria.conditions) {
                    if (ibas.strings.equalsIgnoreCase(bo.BOInformation.PROPERTY_CODE_NAME, codition.alias)) {
                        nCriteria.conditions.add(codition);
                    } else if (ibas.strings.equalsIgnoreCase(bo.BOPropertyValue.PROPERTY_PROPERTY_NAME, codition.alias)) {
                        let pCriteria: ibas.IChildCriteria = nCriteria.childCriterias.firstOrDefault(
                            c => ibas.strings.equalsIgnoreCase(bo.BOInformation.PROPERTY_BOPROPERTYINFORMATIONS_NAME, c.propertyPath));
                        if (ibas.objects.isNull(pCriteria)) {
                            pCriteria = nCriteria.childCriterias.create();
                            pCriteria.propertyPath = bo.BOInformation.PROPERTY_BOPROPERTYINFORMATIONS_NAME;
                        }
                        pCriteria.conditions.add(codition);
                    }
                }
                let sort: ibas.ISort = nCriteria.sorts.create();
                sort.alias = bo.BOInformation.PROPERTY_CODE_NAME;
                sort.sortType = ibas.emSortType.DESCENDING;

                let that: this = this;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchBOInformation({
                    criteria: nCriteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.BOInformation>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            let datas: ibas.IList<bo.IBOPropertyValue> = new ibas.ArrayList<bo.IBOPropertyValue>();
                            for (let boItem of opRslt.resultObjects) {
                                for (let ptyItem of boItem.boPropertyInformations) {
                                    for (let vItem of ptyItem.boPropertyValues) {
                                        datas.add(vItem);
                                    }
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
        export interface IBOPropertyValueChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.IBOPropertyValue[]): void;
        }
        /** 业务对象信息选择服务映射 */
        export class BOPropertyValueChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = BOPropertyValueChooseApp.APPLICATION_ID;
                this.name = BOPropertyValueChooseApp.APPLICATION_NAME;
                this.boCode = BOPropertyValueChooseApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.IBOPropertyValue>> {
                return new BOPropertyValueChooseApp();
            }
        }
    }
}