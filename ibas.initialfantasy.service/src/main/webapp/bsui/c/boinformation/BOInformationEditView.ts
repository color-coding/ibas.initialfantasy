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
             * 视图-BOInformation
             */
            export class BOInformationEditView extends ibas.BOEditView implements app.IBOInformationEditView {
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 新建数据事件，参数1：是否克隆 */
                createDataEvent: Function;
                /** 添加业务对象属性信息事件 */
                addBOPropertyInformationEvent: Function;
                /** 删除业务对象属性信息事件 */
                removeBOPropertyInformationEvent: Function;
                /** 编辑业务对象属性信息 */
                editBOPropertyInformationEvent: Function;
                /** 添加业务对象属性值事件 */
                addBOPropertyValueEvent: Function;
                /** 删除业务对象属性值事件 */
                removeBOPropertyValueEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.form = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_title_general") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_boinformation_name") }),
                            new sap.m.Input("", {
                                type: sap.m.InputType.Text,
                                editable: false,
                            }).bindProperty("value", {
                                path: "/name"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_boinformation_description") }),
                            new sap.m.Input("", {
                                type: sap.m.InputType.Text
                            }).bindProperty("value", {
                                path: "/description"
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_title_others") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_boinformation_objecttype") }),
                            new sap.m.Input("", {
                                type: sap.m.InputType.Text,
                                editable: false,
                            }).bindProperty("value", {
                                path: "/objectType"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_boinformation_code") }),
                            new sap.m.Input("", {
                                type: sap.m.InputType.Text,
                                editable: false,
                            }).bindProperty("value", {
                                path: "/code"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_boinformation_mapped") }),
                            new sap.m.Input("", {
                                type: sap.m.InputType.Text,
                                editable: false,
                            }).bindProperty("value", {
                                path: "/mapped"
                            }),
                        ]
                    });
                    this.tableTitle = new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_bopropertyinformation") });
                    this.form.addContent(this.tableTitle);
                    this.tableBOPropertyInformation = new sap.ui.table.Table("", {
                        toolbar: new sap.m.Toolbar("", {
                            content: [
                            ]
                        }),
                        selectionMode: sap.ui.table.SelectionMode.None,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 10),
                        rows: "{/rows}",
                        rowActionCount: 1,
                        rowActionTemplate: new sap.ui.table.RowAction({
                            items: [
                                new sap.ui.table.RowActionItem({
                                    icon: "sap-icon://slim-arrow-right",
                                    press: function (oEvent: any): void {
                                        that.fireViewEvents(that.editBOPropertyInformationEvent
                                            , this.getBindingContext().getObject()
                                        );
                                    },
                                }),
                            ]
                        }),
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyinformation_property"),
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "property"
                                }),
                                sortProperty: "property",
                                filterProperty: "property"
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyinformation_description"),
                                template: new sap.m.Input("", {
                                    width: "100%",
                                }).bindProperty("value", {
                                    path: "description"
                                }),
                                sortProperty: "description",
                                filterProperty: "description"
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyinformation_searched"),
                                template: new sap.m.Select("", {
                                    width: "100%",
                                    items: openui5.utils.createComboBoxItems(ibas.emYesNo)
                                }).bindProperty("selectedKey", {
                                    path: "searched",
                                    type: "sap.ui.model.type.Integer"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyinformation_editable"),
                                template: new sap.m.Select("", {
                                    width: "100%",
                                    items: openui5.utils.createComboBoxItems(ibas.emYesNo)
                                }).bindProperty("selectedKey", {
                                    path: "editable",
                                    type: "sap.ui.model.type.Integer"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyinformation_mapped"),
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "mapped"
                                }),
                                sortProperty: "mapped",
                                filterProperty: "mapped"
                            }),
                        ]
                    });
                    this.tableBOPropertyValue = new sap.ui.table.Table("", {
                        toolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_add"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://add",
                                    press: function (): void {
                                        that.fireViewEvents(that.addBOPropertyValueEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_remove"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://less",
                                    press: function (): void {
                                        that.fireViewEvents(that.removeBOPropertyValueEvent,
                                            // 获取表格选中的对象
                                            openui5.utils.getSelecteds<bo.BOPropertyValue>(that.tableBOPropertyValue)
                                        );
                                    }
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_back"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://nav-back",
                                    press: function (): void {
                                        that.fireViewEvents(that.editBOPropertyInformationEvent);
                                    }
                                })
                            ]
                        }),
                        enableSelectAll: false,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 10),
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyvalue_value"),
                                template: new sap.m.Input("", {
                                    width: "100%",
                                }).bindProperty("value", {
                                    path: "value"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyvalue_description"),
                                template: new sap.m.Input("", {
                                    width: "100%",
                                }).bindProperty("value", {
                                    path: "description"
                                })
                            }),
                        ]
                    });
                    this.splitContainer = new sap.m.SplitContainer("", {
                        mode: sap.m.SplitAppMode.HideMode,
                        detailPages: [
                            this.tableBOPropertyInformation,
                            this.tableBOPropertyValue
                        ]
                    });
                    this.form.addContent(this.splitContainer);
                    this.page = new sap.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_save"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://save",
                                    press: function (): void {
                                        that.fireViewEvents(that.saveDataEvent);
                                    }
                                }),
                            ]
                        }),
                        content: [this.form]
                    });
                    this.id = this.page.getId();
                    return this.page;
                }
                private page: sap.m.Page;
                private form: sap.ui.layout.form.SimpleForm;
                /** 改变视图状态 */
                private changeViewStatus(data: bo.BOInformation): void {
                    if (ibas.objects.isNull(data)) {
                        return;
                    }
                    // 新建时：禁用删除，
                    if (data.isNew) {
                        if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                            openui5.utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
                        }
                    }
                    // 不可编辑：已批准，
                }
                private tableTitle: sap.ui.core.Title;
                private splitContainer: sap.m.SplitContainer;
                private tableBOPropertyInformation: sap.ui.table.Table;
                private tableBOPropertyValue: sap.ui.table.Table;

                /** 显示数据 */
                showBOInformation(data: bo.BOInformation): void {
                    this.form.setModel(new sap.ui.model.json.JSONModel(data));
                    // 监听属性改变，并更新控件
                    openui5.utils.refreshModelChanged(this.form, data);
                    // 改变视图状态
                    this.changeViewStatus(data);
                }
                /** 显示数据 */
                showBOPropertyInformations(datas: bo.BOPropertyInformation[]): void {
                    this.tableTitle.setText(ibas.i18n.prop("bo_bopropertyinformation"));
                    this.splitContainer.backToTopDetail(null, null);
                    this.tableBOPropertyInformation.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    // 监听属性改变，并更新控件
                    openui5.utils.refreshModelChanged(this.tableBOPropertyInformation, datas);
                }
                /** 显示数据 */
                showBOPropertyValues(datas: bo.BOPropertyValue[]): void {
                    this.tableTitle.setText(ibas.i18n.prop("bo_bopropertyvalue"));
                    this.splitContainer.toDetail(this.tableBOPropertyValue.getId(), null, null, null);
                    this.tableBOPropertyValue.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    // 监听属性改变，并更新控件
                    openui5.utils.refreshModelChanged(this.tableBOPropertyValue, datas);
                }
            }
        }
    }
}