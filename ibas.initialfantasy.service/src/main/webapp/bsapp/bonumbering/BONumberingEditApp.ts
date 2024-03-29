/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {

        /** 编辑应用-业务对象编号方式 */
        export class BONumberingEditApp extends ibas.Application<IBONumberingEditView> {

            /** 应用标识 */
            static APPLICATION_ID: string = "912d9c69-a50b-4b96-a71e-681f1fd635ee";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_bonumbering_edit";
            /** 构造函数 */
            constructor() {
                super();
                this.id = BONumberingEditApp.APPLICATION_ID;
                this.name = BONumberingEditApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.saveBOSeriesNumberingEvent = this.saveBOSeriesNumbering;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                this.view.showBONumbering(this.editData);
                this.fetchBOSeriesNumbering();
            }
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.BONumbering): void;
            run(boCode: string): void;
            run(): void {
                if (arguments[0] instanceof bo.BONumbering) {
                    this.editData = arguments[0];
                    super.run.apply(this, arguments);
                } else if (typeof arguments[0] === "string") {
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.BONumbering.PROPERTY_OBJECTCODE_NAME;
                    condition.value = arguments[0];
                    let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                    boRepository.fetchBONumbering({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            this.run(opRslt.resultObjects.firstOrDefault());
                        }
                    });
                } else {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "data"));
                }
            }
            /** 待编辑的数据 */
            protected editData: bo.BONumbering;
            /** 保存数据 */
            protected saveBOSeriesNumbering(data: bo.BOSeriesNumbering | bo.BOSeriesNumbering[]): void {
                let datas: ibas.IList<bo.BOSeriesNumbering> = ibas.arrays.create(data);
                for (let data of datas) {
                    if (ibas.strings.isEmpty(data.objectCode)) {
                        data.objectCode = this.editData.objectCode;
                    }
                    if (ibas.strings.isEmpty(data.template)) {
                        // 默认编码，八位流水，不足补零
                        data.template = "I%06d";
                    }
                }
                this.busy(true);
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                ibas.queues.execute(datas.filter(c => c.isDirty === true),
                    (data, next) => {
                        boRepository.saveBOSeriesNumbering({
                            beSaved: data,
                            onCompleted(opRslt: ibas.IOperationResult<bo.BOSeriesNumbering>): void {
                                try {
                                    if (opRslt.resultCode !== 0) {
                                        throw new Error(opRslt.message);
                                    }
                                    next();
                                } catch (error) {
                                    next(error);
                                }
                            }
                        });
                    },
                    (error) => {
                        if (error instanceof Error) {
                            this.busy(false);
                            this.messages(error);
                        } else {
                            this.fetchBOSeriesNumbering();
                            this.messages(ibas.emMessageType.SUCCESS,
                                ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                        }
                    }
                );
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_saving_data"));
            }
            /** 查询数据 */
            protected fetchBOSeriesNumbering(): void {
                if (ibas.objects.isNull(this.editData)) {
                    return;
                }
                this.busy(true);
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.BOSeriesNumbering.PROPERTY_OBJECTCODE_NAME;
                condition.value = this.editData.objectCode;
                let that: this = this;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchBOSeriesNumbering({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.BOSeriesNumbering>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            that.view.showBOSeriesNumbering(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
        }
        /** 视图-业务对象编号方式 */
        export interface IBONumberingEditView extends ibas.IBOView {
            /** 显示数据 */
            showBONumbering(data: bo.BONumbering): void;
            /** 保存系列编号方式 */
            saveBOSeriesNumberingEvent: Function;
            /** 显示数据 */
            showBOSeriesNumbering(datas: bo.BOSeriesNumbering[]): void;
        }
    }
}