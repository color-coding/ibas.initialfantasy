/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace ui {
        export namespace c {
            /**
             * 视图-Variable
             */
            export class VariableChooseView extends ibas.BOChooseView implements app.IVariableChooseView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return ibas.KeyValue;
                }
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.table = new sap.extension.table.Table("", {
                        chooseType: this.chooseType,
                        visibleRowCount: sap.extension.table.visibleRowCount(15),
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_variable_key"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "key",
                                    type: new sap.extension.data.Alphanumeric()
                                })
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_variable_value"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "value",
                                    type: new sap.extension.data.Alphanumeric()
                                })
                            }),
                        ]
                    });
                    return new sap.extension.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        content: [
                            this.table
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_choose"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.chooseDataEvent, that.table.getSelecteds());
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ]
                    });
                }
                private table: sap.extension.table.Table;
                /** 显示数据 */
                showData(datas: ibas.KeyValue[]): void {
                    let model: sap.ui.model.Model = this.table.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.table.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.table.setBusy(false);
                }
                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                }
            }
        }
    }
}