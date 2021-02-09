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
                            new sap.extension.m.Input("", {
                                editable: false,
                            }).bindProperty("bindingValue", {
                                path: "objectCode",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_bonumbering_objectname") }),
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
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_boseriesnumbering") }),
                            this.list = new sap.extension.m.List("", {
                                chooseType: ibas.emChooseType.NONE,
                                mode: sap.m.ListMode.Delete,
                                growing: false,
                                headerToolbar: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.ToolbarSpacer(""),
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("shell_data_save"),
                                            // type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://save",
                                            press: function (): void {
                                                let model: any = that.list.getModel();
                                                if (model instanceof sap.extension.model.JSONModel) {
                                                    let rows: any = model.getData("rows");
                                                    if (rows instanceof Array) {
                                                        let datas: any = [];
                                                        for (let row of rows) {
                                                            if (row instanceof bo.BOSeriesNumbering) {
                                                                if (row.isNew && row.isDeleted) {
                                                                    continue;
                                                                }
                                                                datas.push(row);
                                                            }
                                                        }
                                                        that.fireViewEvents(that.saveBOSeriesNumberingEvent, datas);
                                                    }
                                                }
                                            }
                                        }),
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("shell_data_add"),
                                            // type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://add",
                                            press: function (): void {
                                                let model: sap.ui.model.Model = that.list.getModel(undefined);
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
                                items: {
                                    path: "/rows",
                                    template: new sap.m.CustomListItem("", {
                                        content: [
                                            new sap.ui.layout.form.SimpleForm("", {
                                                editable: true,
                                                content: [
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_boseriesnumbering_series") }),
                                                    new sap.extension.m.Input("", {
                                                        editable: true
                                                    }).bindProperty("bindingValue", {
                                                        path: "seriesName",
                                                        type: new sap.extension.data.Alphanumeric
                                                    }),
                                                    new sap.extension.m.Input("", {
                                                        editable: false,
                                                    }).bindProperty("bindingValue", {
                                                        path: "series",
                                                        type: new sap.extension.data.Numeric
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_boseriesnumbering_template") }),
                                                    new sap.extension.m.Input("", {
                                                        editable: true,
                                                        placeholder: "I%06d"
                                                    }).bindProperty("bindingValue", {
                                                        path: "template",
                                                        type: new sap.extension.data.Alphanumeric
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_boseriesnumbering_nextnumber") }),
                                                    new sap.extension.m.Input("", {
                                                        editable: false,
                                                        type: sap.m.InputType.Number
                                                    }).bindProperty("bindingValue", {
                                                        path: "nextNumber",
                                                        type: new sap.extension.data.Numeric()
                                                    }),
                                                    new sap.extension.m.CheckBox("", {
                                                        text: ibas.i18n.prop("bo_boseriesnumbering_locked")
                                                    }).bindProperty("bindingValue", {
                                                        path: "locked",
                                                        type: new sap.extension.data.YesNo()
                                                    }),

                                                ]
                                            }),
                                        ],
                                        visible: {
                                            path: "isDeleted",
                                            formatter(data: boolean): boolean {
                                                return data === true ? false : true;
                                            }
                                        },
                                        type: sap.m.ListType.Inactive
                                    })
                                },
                                delete(event: sap.ui.base.Event): void {
                                    let listItem: any = event.getParameter("listItem");
                                    if (listItem instanceof sap.m.CustomListItem) {
                                        let data: any = listItem.getBindingContext().getObject();
                                        if (data instanceof bo.BOSeriesNumbering) {
                                            if (data.isNew) {
                                                data.markDeleted();
                                                listItem.getModel().refresh(false);
                                            } else {
                                                data.delete();
                                            }
                                        }
                                    }
                                },
                            })
                        ]
                    });
                    return this.page = new sap.extension.m.DataPage("", {
                        showHeader: false,
                        content: [
                            formTop,
                        ]
                    });
                }
                private page: sap.extension.m.Page;
                private list: sap.extension.m.List;

                /** 显示数据 */
                showBONumbering(data: bo.BONumbering): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                }
                /** 显示数据 */
                showBOSeriesNumbering(datas: bo.BOSeriesNumbering[]): void {
                    this.list.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
        }
    }
}