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
                    this.txtTarget = new sap.m.Input("", {
                        editable: false
                    });
                    this.form = new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretchOnPhone: true,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.ToolbarSpacer("", { width: "5px" }),
                                new sap.m.Label("", {
                                    text: ibas.i18n.prop("initialfantasy_edit_target"),
                                }),
                                this.txtTarget,
                                new sap.m.ToolbarSpacer("", { width: "5px" }),
                            ]
                        }),
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_confirm"),
                                type: sap.m.ButtonType.Transparent,
                                // icon: "sap-icon://accept",
                                press: function (): void {
                                    that.fireViewEvents(that.confirmEvent);
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                // icon: "sap-icon://inspect-down",
                                press: function (): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ]
                    });
                    return this.form;
                }
                private form: sap.m.Dialog;
                private table: sap.ui.table.Table;
                private txtTarget: sap.m.Input;

                /** 显示目标 */
                showTarget(target: string, aliases: ibas.KeyText[]): void {
                    this.txtTarget.setValue(target);
                    this.table = this.createTable(aliases);
                    this.form.addContent(this.table);
                }
                /** 显示查询条件 */
                showConditions(datas: ibas.ICondition[]): void {
                    this.table.setModel(new sap.ui.model.json.JSONModel(datas));
                }
                private createTable(aliases: ibas.KeyText[]): sap.ui.table.Table {
                    let that: this = this;
                    let table: sap.ui.table.Table = new sap.ui.table.Table("", {
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
                                        let selected: any = openui5.utils.getSelecteds(that.table).firstOrDefault();
                                        that.fireViewEvents(that.removeConditionEvent, selected);
                                    }
                                })
                            ]
                        }),
                        visibleRowCount: 5,
                        enableSelectAll: false,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        rows: "{/}",
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("shell_query_condition_relationship"),
                                width: "100px",
                                autoResizable: true,
                                template: new sap.m.Select("", {
                                    width: "100%",
                                    items: openui5.utils.createComboBoxItems(ibas.emConditionRelationship)
                                }).bindProperty("selectedKey", {
                                    path: "relationship",
                                    type: "sap.ui.model.type.Integer"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("shell_query_condition_bracketopen"),
                                width: "100px",
                                autoResizable: true,
                                template: new sap.m.Select("", {
                                    width: "100%",
                                    items: this.getCharListItem("(")
                                }).bindProperty("selectedKey", {
                                    path: "bracketOpen",
                                    type: "sap.ui.model.type.Integer"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("shell_query_condition_alias"),
                                width: "200px",
                                autoResizable: true,
                                template: new sap.m.Select("", {
                                    width: "100%",
                                    items: this.getPropertyListItem(aliases)
                                }).bindProperty("selectedKey", {
                                    path: "alias",
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("shell_query_condition_operation"),
                                width: "140px",
                                autoResizable: true,
                                template: new sap.m.Select("", {
                                    width: "100%",
                                    items: openui5.utils.createComboBoxItems(ibas.emConditionOperation)
                                }).bindProperty("selectedKey", {
                                    path: "operation",
                                    type: "sap.ui.model.type.Integer"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("shell_query_condition_value"),
                                width: "120px",
                                autoResizable: true,
                                template: new sap.m.Input("", {
                                    width: "100%",
                                }).bindProperty("value", {
                                    path: "value",
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("shell_query_condition_bracketclose"),
                                width: "100px",
                                autoResizable: true,
                                template: new sap.m.Select("", {
                                    width: "100%",
                                    items: this.getCharListItem(")")
                                }).bindProperty("selectedKey", {
                                    path: "bracketClose",
                                    type: "sap.ui.model.type.Integer"
                                })
                            })
                        ]
                    });
                    return table;
                }
                private getCharListItem(char: string): sap.ui.core.ListItem[] {
                    // 获取重复的字符
                    let count: number = 4;
                    let items: Array<sap.ui.core.ListItem> = [];
                    items.push(new sap.ui.core.ListItem("", {
                        key: 0,
                        text: "",
                    }));
                    let vChar: string = char;
                    for (let i: number = 1; i < count; i++) {
                        items.push(new sap.ui.core.ListItem("", {
                            key: i,
                            text: vChar,
                        }));
                        vChar = vChar + char;
                    }
                    return items;
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