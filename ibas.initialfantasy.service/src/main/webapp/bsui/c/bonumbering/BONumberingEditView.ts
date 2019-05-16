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
             * 编辑视图-业务对象编号方式
             */
            export class BONumberingEditView extends ibas.View implements app.IBONumberingEditView {
                /** 保存系列编号方式 */
                saveBOSeriesNumberingEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    let formTop: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_bonumbering") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_bonumbering_objectcode") }),
                            new sap.extension.m.BusinessObjectInput("", {
                                editable: false,
                            }).bindProperty("bindingValue", {
                                path: "objectCode",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_bonumbering_autokey") }),
                            new sap.extension.m.Input("", {
                                editable: false,
                            }).bindProperty("bindingValue", {
                                path: "autoKey",
                                type: new sap.extension.data.Numeric()
                            }),
                            new sap.ui.core.Title("", {}),
                        ]
                    });
                    this.table = new sap.extension.table.Table("", {
                        enableSelectAll: false,
                        visibleRowCount: sap.extension.table.visibleRowCount(5),
                        toolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_add"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://add",
                                    press: function (): void {
                                        let model: sap.ui.model.Model = that.table.getModel(undefined);
                                        if (!ibas.objects.isNull(model)) {
                                            // 已存在绑定数据，添加新的
                                            let hDatas: any = (<any>model).getData();
                                            hDatas.rows.push(new bo.BOSeriesNumbering());
                                            model.refresh(false);
                                        }
                                    }
                                }),
                            ]
                        }),
                        rowActionCount: 2,
                        rowActionTemplate: new sap.ui.table.RowAction("", {
                            items: [
                                new sap.ui.table.RowActionItem("", {
                                    icon: "sap-icon://save",
                                    press: function (oEvent: any): void {
                                        that.fireViewEvents(that.saveBOSeriesNumberingEvent, this.getBindingContext().getObject());
                                    },
                                }),
                                new sap.ui.table.RowActionItem("", {
                                    icon: "sap-icon://delete",
                                    press: function (oEvent: any): void {
                                        let bo: bo.BOSeriesNumbering = this.getBindingContext().getObject();
                                        if (!ibas.objects.isNull(bo)) {
                                            bo.delete();
                                            that.fireViewEvents(that.saveBOSeriesNumberingEvent, bo);
                                        }
                                    },
                                }),
                            ]
                        }),
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_boseriesnumbering_series"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "series",
                                    type: new sap.extension.data.Numeric()
                                })
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_boseriesnumbering_seriesname"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "seriesName",
                                    type: new sap.extension.data.Alphanumeric()
                                })
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_boseriesnumbering_template") + " [format()]",
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "template",
                                    type: new sap.extension.data.Alphanumeric()
                                })
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_boseriesnumbering_locked"),
                                template: new sap.extension.m.EnumSelect("", {
                                    enumType: ibas.emYesNo
                                }).bindProperty("bindingValue", {
                                    path: "locked",
                                    type: new sap.extension.data.YesNo()
                                })
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_boseriesnumbering_nextnumber"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "nextNumber",
                                    type: new sap.extension.data.Numeric()
                                })
                            }),
                        ]
                    });
                    let formMiddle: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_boseriesnumbering") }),
                            this.table,
                        ]
                    });
                    return this.page = new sap.extension.m.DataPage("", {
                        showHeader: false,
                        content: [
                            formTop,
                            formMiddle,
                        ]
                    });
                }
                private page: sap.extension.m.Page;
                private table: sap.extension.table.Table;

                /** 显示数据 */
                showBONumbering(data: bo.BONumbering): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                }
                /** 显示数据 */
                showBOSeriesNumbering(datas: bo.BOSeriesNumbering[]): void {
                    this.table.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
        }
    }
}