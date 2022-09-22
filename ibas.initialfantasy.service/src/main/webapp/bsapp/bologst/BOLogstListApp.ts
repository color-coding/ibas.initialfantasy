/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        /** 列表应用-业务对象日志 */
        export class BOLogstListApp extends ibas.BOListApplication<IBOLogstListView, bo.BOLogst> {
            /** 应用标识 */
            static APPLICATION_ID: string = "a48e281c-b01a-45f2-b69c-578f5bc15017";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_bologst_list";
            /** 构造函数 */
            constructor() {
                super();
                this.id = BOLogstListApp.APPLICATION_ID;
                this.name = BOLogstListApp.APPLICATION_NAME;
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
                let that: this = this;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchBOLogst({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.BOLogst>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (!that.isViewShowed()) {
                                // 没显示视图，先显示
                                that.show();
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.showData(opRslt.resultObjects);
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
            /** 查看数据，参数：目标数据 */
            protected viewData(data: bo.BOLogst): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_view")
                    ));
                    return;
                }
                let app: BOLogstViewApp = new BOLogstViewApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(data);
            }
        }
        /** 视图-业务对象日志 */
        export interface IBOLogstListView extends ibas.IBOListView {
            /** 删除数据 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.BOLogst[]): void;
            /** 查看数据 */
            viewDataEvent: Function;
        }
    }
}
