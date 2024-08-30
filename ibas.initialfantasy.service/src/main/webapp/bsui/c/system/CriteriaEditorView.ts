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
             * 视图-查询编辑
             */
            export class CriteriaEditorView extends ibas.DialogView implements app.ICriteriaEditorView {
                /** 添加查询条件 */
                addConditionEvent: Function;
                /** 移出查询 */
                removeConditionEvent: Function;
                /** 确定 */
                confirmEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return this.form = new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: false,
                        verticalScrolling: false,
                        contentHeight: "auto",
                        contentWidth: "65%",
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Label("", {
                                    showColon: true,
                                    text: ibas.i18n.prop("initialfantasy_edit_target"),
                                }).addStyleClass("sapUiSmallMarginBegin"),
                                this.txtTarget = new sap.extension.m.RepositoryInput("", {
                                    editable: false,
                                    textFormatMode: sap.m.InputTextFormatMode.ValueKey,
                                    repository: bo.BORepositoryInitialFantasy,
                                    dataInfo: {
                                        type: bo.BOInformation,
                                        key: bo.BOInformation.PROPERTY_CODE_NAME,
                                        text: bo.BOInformation.PROPERTY_DESCRIPTION_NAME
                                    },
                                }).addStyleClass("sapUiSmallMarginBegin"),
                            ]
                        }),
                        beginButton: new sap.m.Button("", {
                            text: ibas.i18n.prop("shell_confirm"),
                            type: sap.m.ButtonType.Transparent,
                            press: function (): void {
                                that.fireViewEvents(that.confirmEvent);
                            }
                        }),
                        endButton: new sap.m.Button("", {
                            text: ibas.i18n.prop("shell_exit"),
                            type: sap.m.ButtonType.Transparent,
                            press: function (): void {
                                that.fireViewEvents(that.closeEvent);
                            }
                        }),
                    }).addStyleClass("sapUiNoContentPadding");
                }
                private form: sap.m.Dialog;
                private table: sap.extension.table.Table;
                private txtTarget: sap.extension.m.Input;

                /** 显示目标 */
                showTarget(target: string, aliases: ibas.KeyText[]): void {
                    this.form.setInitialFocus(this.form.getBeginButton());
                    this.txtTarget.setBindingValue(target);
                    this.table = this.createTable(aliases);
                    this.form.addContent(this.table);
                }
                /** 显示查询条件 */
                showConditions(datas: ibas.ICondition[]): void {
                    this.table.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
                private createTable(aliases: ibas.KeyText[]): sap.extension.table.Table {
                    let that: this = this;
                    let table: sap.extension.table.Table = new sap.extension.table.Table("", {
                        enableSelectAll: false,
                        visibleRowCount: sap.extension.table.visibleRowCount(8),
                        toolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_add"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://add",
                                    press: function (): void {
                                        that.fireViewEvents(that.addConditionEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_remove"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://less",
                                    press: function (): void {
                                        that.fireViewEvents(that.removeConditionEvent, that.table.getSelecteds());
                                    }
                                })
                            ]
                        }),
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("shell_query_condition_relationship"),
                                template: new sap.extension.m.EnumSelect("", {
                                    enumType: ibas.emConditionRelationship
                                }).bindProperty("bindingValue", {
                                    path: "relationship",
                                    type: new sap.extension.data.ConditionRelationship()
                                }),
                                width: "8rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("shell_query_condition_bracketopen"),
                                template: new sap.extension.m.RepeatCharSelect("", {
                                    repeatText: "(",
                                    maxCount: 5,
                                }).bindProperty("bindingValue", {
                                    path: "bracketOpen",
                                    type: "sap.ui.model.type.Integer"
                                }),
                                width: "8rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("shell_query_condition_alias"),
                                template: new sap.extension.m.Select("", {
                                    items: this.getPropertyListItem(aliases)
                                }).bindProperty("bindingValue", {
                                    path: "alias",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                width: "12rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("shell_query_condition_operation"),
                                template: new sap.extension.m.EnumSelect("", {
                                    enumType: ibas.emConditionOperation
                                }).bindProperty("bindingValue", {
                                    path: "operation",
                                    type: new sap.extension.data.ConditionOperation()
                                }),
                                width: "10rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("shell_query_condition_value"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "value",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                width: "12rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("shell_query_condition_bracketclose"),
                                template: new sap.extension.m.RepeatCharSelect("", {
                                    repeatText: ")",
                                    maxCount: 5,
                                }).bindProperty("bindingValue", {
                                    path: "bracketClose",
                                    type: "sap.ui.model.type.Integer"
                                }),
                                width: "8rem",
                            })
                        ]
                    });
                    return table;
                }
                private getPropertyListItem(aliases: ibas.KeyText[]): sap.ui.core.ListItem[] {
                    let items: Array<sap.ui.core.ListItem> = [];
                    items.push(new sap.ui.core.ListItem("", {
                        key: "",
                        text: ibas.i18n.prop("shell_please_chooose_data", ""),
                    }));
                    if (!ibas.objects.isNull(aliases)) {
                        for (let property of aliases) {
                            items.push(new sap.ui.core.ListItem("", {
                                key: property.key,
                                text: property.text,
                            }));
                        }
                    }
                    return items;
                }
            }
        }
    }
}