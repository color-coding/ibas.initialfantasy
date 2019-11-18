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
                    return this.form = new sap.extension.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.ToolbarSpacer("", { width: "5px" }),
                                new sap.m.Label("", {
                                    text: ibas.i18n.prop("initialfantasy_edit_target"),
                                }),
                                this.txtTarget = new sap.extension.m.Input("", {
                                    editable: false
                                }),
                                new sap.m.ToolbarSpacer("", { width: "5px" }),
                            ]
                        }),
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_confirm"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.confirmEvent);
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
                private form: sap.m.Dialog;
                private table: sap.extension.table.Table;
                private txtTarget: sap.extension.m.Input;

                /** 显示目标 */
                showTarget(target: string, aliases: ibas.KeyText[]): void {
                    this.txtTarget.setValue(target);
                    this.table = this.createTable(aliases);
                    this.form.addContent(this.table);
                }
                /** 显示查询条件 */
                showConditions(datas: ibas.ICondition[]): void {
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
                                        let selected: any = that.table.getSelecteds().firstOrDefault();
                                        that.fireViewEvents(that.removeConditionEvent, selected);
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
                                })
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("shell_query_condition_bracketopen"),
                                template: new sap.extension.m.RepeatCharSelect("", {
                                    repeatText: "(",
                                    maxCount: 5,
                                }).bindProperty("bindingValue", {
                                    path: "bracketOpen",
                                    type: "sap.ui.model.type.Integer"
                                })
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("shell_query_condition_alias"),
                                template: new sap.extension.m.Select("", {
                                    items: this.getPropertyListItem(aliases)
                                }).bindProperty("bindingValue", {
                                    path: "alias",
                                    type: new sap.extension.data.Alphanumeric()
                                })
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("shell_query_condition_operation"),
                                template: new sap.extension.m.EnumSelect("", {
                                    enumType: ibas.emConditionOperation
                                }).bindProperty("bindingValue", {
                                    path: "operation",
                                    type: new sap.extension.data.ConditionOperation()
                                })
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("shell_query_condition_value"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "value",
                                    type: new sap.extension.data.Alphanumeric({
                                        maxLength: 30
                                    })
                                })
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("shell_query_condition_bracketclose"),
                                template: new sap.extension.m.RepeatCharSelect("", {
                                    repeatText: ")",
                                    maxCount: 5,
                                }).bindProperty("bindingValue", {
                                    path: "bracketClose",
                                    type: "sap.ui.model.type.Integer"
                                })
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