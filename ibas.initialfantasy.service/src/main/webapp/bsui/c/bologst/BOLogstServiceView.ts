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
             * 日志服务视图
             */
            export class BOLogstServiceView extends ibas.DialogView implements app.IBOLogstServiceView {
                /** 显示数据 */
                viewDataEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.list = new sap.extension.m.Table("", {
                        chooseType: ibas.emChooseType.MULTIPLE,
                        columns: [
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_bologst_loginst"),
                                width: "5rem",
                                hAlign: sap.ui.core.TextAlign.Center,
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_bologst_modifyuser"),
                                width: "10rem",
                                hAlign: sap.ui.core.TextAlign.Center,
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_bologst_modifydate"),
                                width: "8rem",
                                hAlign: sap.ui.core.TextAlign.Center,
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_bologst_modifytime"),
                                width: "6rem",
                                hAlign: sap.ui.core.TextAlign.Center,
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_bologst_cause"),
                                width: "100%",
                                hAlign: sap.ui.core.TextAlign.Center,
                            }),
                        ],
                        items: {
                            path: "/rows",
                            template: new sap.extension.m.ColumnListItem("", {
                                type: sap.m.ListType.Inactive,
                                detailIcon: "sap-icon://detail-view",
                                detailTooltip: ibas.i18n.prop("initialfantasy_modify_content"),
                                detailPress(this: sap.m.ListItemBase): void {
                                    that.fireViewEvents(that.viewDataEvent, this.getBindingContext().getObject());
                                },
                                cells: [
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "logInst",
                                            type: new sap.extension.data.Numeric(),
                                        }
                                    }),
                                    new sap.extension.m.UserObjectAttribute("", {
                                        bindingValue: {
                                            path: "modifyUser",
                                            type: new sap.extension.data.Numeric(),
                                        },
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "modifyDate",
                                            type: new sap.extension.data.Date(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "modifyTime",
                                            type: new sap.extension.data.Time(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "cause",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                ]
                            }),
                        }
                    });
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretch: ibas.config.get(ibas.CONFIG_ITEM_PLANTFORM) === ibas.emPlantform.PHONE ? true : false,
                        horizontalScrolling: false,
                        verticalScrolling: true,
                        contentWidth: "60%",
                        contentHeight: "40%",
                        subHeader: this.headerBar = new sap.m.Bar("", {
                            contentLeft: [
                                new sap.m.Title("", {
                                    titleStyle: sap.ui.core.TitleLevel.H4
                                }),
                            ],
                            contentRight: [
                            ]
                        }),
                        content: [
                            this.list
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("initialfantasy_display_comparison"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.viewDataEvent, that.list.getSelecteds(), "COMPARISON");
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("initialfantasy_display_summary"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.viewDataEvent, that.list.getSelecteds(), "SUMMARY");
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ],
                    }).addStyleClass("sapUiNoContentPadding");
                }
                private list: sap.extension.m.Table;
                private headerBar: sap.m.Bar;
                /** 显示日志 */
                showLogsts(datas: bo.BOLogst[]): void {
                    this.list.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
                /** 显示关联对象 */
                showBusinessObject(bo: ibas.IBusinessObject): void {
                    let title: any = this.headerBar.getContentLeft()[0];
                    if (title instanceof sap.m.Title) {
                        title.setText(ibas.businessobjects.describe(bo.toString()));
                    }
                }

            }
        }
    }
}