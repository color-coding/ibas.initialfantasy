/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        /** 业务对象日志服务 */
        export class BOLogstService extends ibas.ServiceApplication<IBOLogstServiceView, ibas.IBOServiceContract> {
            /** 应用标识 */
            static APPLICATION_ID: string = "e69bfdd7-6ba5-473b-9216-a74395001b0f";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_bologst_service";

            constructor() {
                super();
                this.id = BOLogstService.APPLICATION_ID;
                this.name = BOLogstService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                this.view.viewDataEvent = this.viewData;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                this.view.showBusinessObject(this.bo);
                let boKeys: string = this.bo.toString();
                let condition: ibas.ICondition = null;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                if (boKeys.startsWith("{[") && boKeys.endsWith("]}")) {
                    boKeys = boKeys.substring(1, boKeys.length - 1);
                    boKeys = ibas.strings.remove(boKeys, "[", "]");
                    let values: string[] = boKeys.split(".");
                    if (values.length === 2) {
                        condition = criteria.conditions.create();
                        condition.alias = bo.BOLogst.PROPERTY_BOCODE_NAME;
                        condition.value = values[0];
                        condition = criteria.conditions.create();
                        condition.alias = bo.BOLogst.PROPERTY_BOKEYS_NAME;
                        condition.value = values[1];
                    }
                }
                if (criteria.conditions.length === 2) {
                    // 解析到主键相关
                    let sort: ibas.ISort = criteria.sorts.create();
                    sort.alias = bo.BOLogst.PROPERTY_MODIFYDATE_NAME;
                    sort.sortType = ibas.emSortType.DESCENDING;
                    sort = criteria.sorts.create();
                    sort.alias = bo.BOLogst.PROPERTY_MODIFYTIME_NAME;
                    sort.sortType = ibas.emSortType.DESCENDING;
                    let that: this = this;
                    let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                    boRepository.fetchBOLogst({
                        criteria: criteria,
                        onCompleted(opRslt: ibas.IOperationResult<bo.BOLogst>): void {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                that.view.showLogsts(opRslt.resultObjects);
                            } catch (error) {
                                that.messages(error);
                            }
                        }
                    });
                }
            }
            /** 运行服务 */
            runService(contract: ibas.IBOServiceContract): void {
                if (!ibas.objects.isNull(contract)) {
                    // 传入的数据可能是数组
                    if (contract.data instanceof Array) {
                        // 数组只处理第一个
                        this.bo = contract.data[0];
                    } else {
                        this.bo = contract.data;
                    }
                }
                if (ibas.objects.isNull(this.bo)) {
                    // 输入数据无效，服务不运行
                    this.proceeding(ibas.emMessageType.WARNING,
                        ibas.i18n.prop("documents_bo_document_service") + ibas.i18n.prop("sys_invalid_parameter", "data"));
                } else if (this.bo instanceof ibas.BusinessObject && this.bo.isNew) {
                    // 单据未保存，服务不运行
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_saved_first"));
                } else {
                    super.show();
                }
            }
            /** 关联的数据 */
            private bo: ibas.IBusinessObject;

            private viewData(data: bo.BOLogst | bo.BOLogst[]): void {
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_view")
                    ));
                    return;
                }
                try {
                    let app: BOLogstViewApp = new BOLogstViewApp();
                    app.viewShower = this.viewShower;
                    app.navigation = this.navigation;
                    app.description = ibas.strings.format("{0} —— {1}", app.description, ibas.businessobjects.describe(this.bo.toString()));
                    app.onViewShowed = () => {
                        this.close();
                    };
                    app.run(data);
                } catch (error) {
                    this.messages(error);
                }
            }
        }
        /** 业务对象日志服务-视图 */
        export interface IBOLogstServiceView extends ibas.IView {
            /** 显示关联对象 */
            showBusinessObject(bo: ibas.IBusinessObject): void;
            /** 显示已存在日志 */
            showLogsts(datas: bo.BOLogst[]): void;
            /** 查看数据 */
            viewDataEvent: Function;
        }
        /** 业务对象日志服务映射 */
        export class BOLogstServiceMapping extends ibas.ServiceMapping {

            constructor() {
                super();
                this.id = BOLogstService.APPLICATION_ID;
                this.name = BOLogstService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
                this.proxy = ibas.BOServiceProxy;
                this.icon = ibas.i18n.prop("initialfantasy_bologst_icon");
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract> {
                return new BOLogstService();
            }
        }
    }
}