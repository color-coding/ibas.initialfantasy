/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {

        /** 应用-业务对象检索条件 */
        export class BOCriteriaChooseApp extends ibas.BOChooseService<IBOCriteriaChooseView, bo.BOCriteria> {

            /** 应用标识 */
            static APPLICATION_ID: string = "ac9a1df9-8047-4bd9-8b30-236798d9ec6d";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_bocriteria_choose";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.BOCriteria.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = BOCriteriaChooseApp.APPLICATION_ID;
                this.name = BOCriteriaChooseApp.APPLICATION_NAME;
                this.boCode = BOCriteriaChooseApp.BUSINESS_OBJECT_CODE;
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
            }
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchBOCriteria({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.BOCriteria>): void {
                        try {
                                that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 1
                                && ibas.config.get(ibas.CONFIG_ITEM_AUTO_CHOOSE_DATA, true) && !that.isViewShowed()) {
                                // 仅一条数据，直接选择
                                that.chooseData(opRslt.resultObjects);
                            } else {
                                if (!that.isViewShowed()) {
                                    // 没显示视图，先显示
                                    that.show();
                                }
                                if (opRslt.resultObjects.length === 0) {
                                    that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                                }
                                that.view.showData(opRslt.resultObjects);
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
                // 关闭自身
                this.destroy();
                // 调用编辑应用
                let app: BOCriteriaEditApp = new BOCriteriaEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run();
            }
        }
        /** 视图-业务对象检索条件 */
        export interface IBOCriteriaChooseView extends ibas.IBOChooseView {
            /** 显示数据 */
            showData(datas: bo.BOCriteria[]): void;
        }
        /** 业务对象检索条件选择服务映射 */
        export class BOCriteriaChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = BOCriteriaChooseApp.APPLICATION_ID;
                this.name = BOCriteriaChooseApp.APPLICATION_NAME;
                this.boCode = BOCriteriaChooseApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.BOCriteria>> {
                return new BOCriteriaChooseApp();
            }
        }
    }
}