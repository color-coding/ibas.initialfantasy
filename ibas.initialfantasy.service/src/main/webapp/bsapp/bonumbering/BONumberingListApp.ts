/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {

        /** 列表应用-业务对象编号方式 */
        export class BONumberingListApp extends ibas.Application<IBONumberingListView> {

            /** 应用标识 */
            static APPLICATION_ID: string = "e3c69665-6b92-48ab-a645-00480aa762d4";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_bonumbering_list";
            /** 构造函数 */
            constructor() {
                super();
                this.id = BONumberingListApp.APPLICATION_ID;
                this.name = BONumberingListApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.editDataEvent = this.editData;
                this.view.fetchDataEvent = this.fetchData;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
            }
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void {
                this.busy(true);
                criteria.result = -1;// 解决不了多主键分页问题，目前都查
                let that: this = this;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchBONumbering({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.BONumbering>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
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
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.BONumbering): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_edit")
                    ));
                    return;
                }
                let app: BONumberingEditApp = new BONumberingEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(data);
            }
        }
        /** 视图-业务对象编号方式 */
        export interface IBONumberingListView extends ibas.IBOQueryView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.BONumbering[]): void;
        }
    }
}