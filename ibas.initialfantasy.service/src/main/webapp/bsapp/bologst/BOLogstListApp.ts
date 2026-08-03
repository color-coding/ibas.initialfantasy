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
        export class BOLogstListApp extends ibas.BOQueryApplication<IBOLogstListView> {
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
                this.view.selectedBusinessObjectEvent = this.selectedBusinessObject;
                this.view.viewDataEvent = this.viewData;
                this.view.fetchLogstEvent = this.fetchLogsts;
                this.view.deleteLogstEvent = this.deleteLogsts;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
            }
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void {
                this.busy(true);
                if (criteria instanceof ibas.Criteria) {
                    criteria.noChilds = true;
                    // 确保只查询开启了修改日志的对象
                    let existCondition: boolean = false;
                    for (let condition of criteria.conditions) {
                        if (ibas.strings.equalsIgnoreCase(condition.alias, bo.BOInformation.PROPERTY_MODIFIED_NAME)) {
                            existCondition = true;
                            break;
                        }
                    }
                    if (!existCondition) {
                        let condition: ibas.ICondition = criteria.conditions.create();
                        condition.alias = bo.BOInformation.PROPERTY_MODIFIED_NAME;
                        condition.value = ibas.emYesNo.YES.toString();
                    }
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
                            if (!that.isViewShowed()) {
                                // 没显示视图，先显示
                                that.show();
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.showBusinessObjects(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 当前选中的业务对象 */
            private selectedBO: bo.BOInformation;
            /** 选择业务对象 */
            private selectedBusinessObject(data: bo.BOInformation): void {
                this.selectedBO = data;
            }
            /** 查询日志数据 */
            private fetchLogsts(criteria: ibas.ICriteria): void {
                if (ibas.objects.isNull(criteria)) {
                    return;
                }
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
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.showData(opRslt.resultObjects, true);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 删除日志数据，参数：保留天数（0表示清理全部） */
            private deleteLogsts(days: number): void {
                // 前端校验：未选择对象且清理全部时，条件为空
                if (days <= 0 && ibas.objects.isNull(this.selectedBO)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("initialfantasy_clean_logs")
                    ));
                    return;
                }
                let that: this = this;
                this.messages({
                    type: ibas.emMessageType.QUESTION,
                    title: ibas.i18n.prop(this.name),
                    message: days > 0
                        ? ibas.i18n.prop("initialfantasy_confirm_delete_logs", days)
                        : ibas.i18n.prop("initialfantasy_confirm_delete_all_logs"),
                    actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                    onCompleted: (action: ibas.emMessageAction) => {
                        if (action !== ibas.emMessageAction.YES) {
                            return;
                        }
                        let criteria: ibas.ICriteria = new ibas.Criteria();
                        // 如果选中对象则加对象条件
                        if (!ibas.objects.isNull(that.selectedBO)) {
                            let condition: ibas.ICondition = criteria.conditions.create();
                            condition.alias = bo.BOLogst.PROPERTY_BOCODE_NAME;
                            condition.value = that.selectedBO.code;
                        }
                        // 按天数构建条件
                        if (days > 0) {
                            let date: Date = ibas.dates.today();
                            date.setDate(date.getDate() - days);
                            let condition: ibas.ICondition = criteria.conditions.create();
                            condition.alias = bo.BOLogst.PROPERTY_MODIFYDATE_NAME;
                            condition.operation = ibas.emConditionOperation.LESS_THAN;
                            condition.value = ibas.dates.toString(date);
                        }
                        that.busy(true);
                        let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                        boRepository.deleteBOLogst({
                            criteria: criteria,
                            onCompleted(opRslt: ibas.IOperationResult<bo.BOLogst>): void {
                                try {
                                    that.busy(false);
                                    if (opRslt.resultCode !== 0) {
                                        throw new Error(opRslt.message);
                                    }
                                    that.messages(ibas.emMessageType.SUCCESS, opRslt.message);
                                    // 删除成功后刷新日志数据
                                    if (!ibas.objects.isNull(that.selectedBO)) {
                                        that.view.queryLogsts(that.selectedBO.code);
                                    }
                                } catch (error) {
                                    that.messages(error);
                                }
                            }
                        });
                        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_delete"));
                    }
                });
            }
            /** 查看数据，参数：目标数据 */
            private viewData(data: bo.BOLogst | bo.BOLogst[], mode?: "SUMMARY" | "COMPARISON"): void {
                // 检查目标数据
                if (ibas.objects.isNull(data) || (data instanceof Array && data.length === 0)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_view")
                    ));
                    return;
                }
                let app: BOLogstViewApp = new BOLogstViewApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.showSummary = mode === "SUMMARY" ? true : false;
                app.run(data);
            }
        }
        /** 视图-业务对象日志 */
        export interface IBOLogstListView extends ibas.IBOQueryView {
            /** 选择业务对象信息，参数：选择对象 */
            selectedBusinessObjectEvent: Function;
            /** 查询日志数据（分页），参数：查询条件 */
            fetchLogstEvent: Function;
            /** 删除日志数据，参数：保留天数（0表示清理全部） */
            deleteLogstEvent: Function;
            /** 显示业务对象信息 */
            showBusinessObjects(datas: bo.BOInformation[]): void;
            /** 显示数据，参数：数据集合，是否追加 */
            showData(datas: bo.BOLogst[], append: boolean): void;
            /** 查询日志数据，参数：业务对象编码 */
            queryLogsts(boCode: string): void;
            /** 查看数据，参数：目标数据，模式 */
            viewDataEvent: Function;
        }
    }
}
