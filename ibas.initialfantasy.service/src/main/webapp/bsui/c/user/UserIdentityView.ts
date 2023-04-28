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
             * 视图-用户身份
             */
            export class UserIdentityView extends ibas.DialogView implements app.IUserIdentityView {
                /** 保存数据事件 */
                saveIdentityEvent: Function;
                /** 添加数据事件 */
                addIdentityEvent: Function;
                /** 移除数据事件 */
                removeIdentityEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.table = new sap.extension.table.DataTable("", {
                        enableSelectAll: false,
                        visibleRowCount: sap.extension.table.visibleRowCount(15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        rows: "{/rows}",
                        rowActionCount: 1,
                        rowActionTemplate: new sap.ui.table.RowAction("", {
                            items: [
                                new sap.ui.table.RowActionItem("", {
                                    icon: "sap-icon://sys-cancel",
                                    press: function (oEvent: any): void {
                                        that.fireViewEvents(that.removeIdentityEvent, this.getBindingContext().getObject());
                                    },
                                }),
                            ]
                        }),
                        rowSettingsTemplate: new sap.ui.table.RowSettings("", {
                        }).bindProperty("highlight", {
                            path: "isDirty",
                            formatter(value: boolean): string {
                                if (!!value) {
                                    return sap.ui.core.MessageType.Warning;
                                } else {
                                    return sap.ui.core.MessageType.Information;
                                }
                            }
                        }),
                        columns: [
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_useridentity_position"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "position",
                                    type: new sap.extension.data.Numeric()
                                }),
                                width: "5rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_useridentity_identity"),
                                template: new sap.extension.m.Input("", {
                                    showValueHelp: true,
                                    valueHelpRequest: function (): void {
                                        that.fireViewEvents(that.addIdentityEvent, this.getBindingContext().getObject());
                                    },
                                    showValueLink: false,
                                }).bindProperty("bindingValue", {
                                    path: "identity",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                                width: "12rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_useridentity_identity") + ibas.i18n.prop("bo_identity_name"),
                                template: new sap.extension.m.RepositoryText("", {
                                    repository: bo.BORepositoryInitialFantasy,
                                    dataInfo: {
                                        type: bo.Identity,
                                        key: bo.Identity.PROPERTY_CODE_NAME,
                                        text: bo.Identity.PROPERTY_NAME_NAME
                                    },
                                }).bindProperty("bindingValue", {
                                    path: "identity",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                width: "16rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_useridentity_validdate"),
                                template: new sap.extension.m.DatePicker("", {
                                }).bindProperty("bindingValue", {
                                    path: "validDate",
                                    type: new sap.extension.data.Date(),
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_useridentity_invaliddate"),
                                template: new sap.extension.m.DatePicker("", {
                                }).bindProperty("bindingValue", {
                                    path: "invalidDate",
                                    type: new sap.extension.data.Date(),
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_useridentity_remarks"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "remarks",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                                width: "100%",
                            }),
                        ],
                        sortProperty: "position",
                        sortIntervalStep: 10,
                    });
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretch: ibas.config.get(ibas.CONFIG_ITEM_PLANTFORM) === ibas.emPlantform.PHONE ? true : false,
                        horizontalScrolling: false,
                        verticalScrolling: false,
                        content: [
                            this.titleBar = new sap.m.VBox("", {
                                alignContent: sap.m.FlexAlignContent.Center,
                                alignItems: sap.m.FlexAlignItems.Start,
                                justifyContent: sap.m.FlexJustifyContent.Start,
                                renderType: sap.m.FlexRendertype.Bare,
                                items: [
                                    new sap.m.Toolbar("", {
                                        width: "100%",
                                        content: [
                                            new sap.m.Title("", {
                                                titleStyle: sap.ui.core.TitleLevel.H4,
                                                text: {
                                                    path: "/code",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            }).addStyleClass("sapUiTinyMarginBegin"),
                                            new sap.m.Title("", {
                                                titleStyle: sap.ui.core.TitleLevel.H4,
                                                text: {
                                                    path: "/name",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            }).addStyleClass("sapUiTinyMarginBegin"),
                                            new sap.m.ToolbarSpacer(),
                                            new sap.m.Button("", {
                                                text: ibas.i18n.prop("shell_data_add"),
                                                type: sap.m.ButtonType.Transparent,
                                                icon: "sap-icon://create",
                                                press: function (): void {
                                                    that.fireViewEvents(that.addIdentityEvent);
                                                }
                                            }),
                                        ],
                                    }),
                                ]
                            }),
                            this.table
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_save"),
                                type: sap.m.ButtonType.Transparent,
                                press(): void {
                                    that.fireViewEvents(that.saveIdentityEvent);
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                press(): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ],
                    }).addStyleClass("sapUiNoContentPadding");
                }
                private titleBar: sap.m.VBox;
                private table: sap.extension.table.Table;
                showUsers(data: bo.User): void {
                    this.titleBar.setModel(new sap.extension.model.JSONModel(data));
                }
                showIdentities(datas: bo.UserIdentity[]): void {
                    this.table.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
        }
    }
}