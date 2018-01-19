/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as openui5 from "openui5/index";
import { ICriteriaEditorView } from "../../../bsapp/system/index";

/**
 * 视图-查询编辑
 */
export class CriteriaEditorView extends ibas.BODialogView implements ICriteriaEditorView {
    /** 添加查询条件 */
    addConditionEvent: Function;
    /** 移出查询 */
    removeConditionEvent: Function;
    /** 确定 */
    confirmEvent: Function;
    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.txtTarget = new sap.m.Input("", {
            editable: false
        });
        this.form = new sap.ui.layout.form.SimpleForm("", {
            content: [
                new sap.m.Toolbar("", {
                    content: [
                        new sap.m.Label("", {
                            text: ibas.i18n.prop("initialfantasy_edit_target"),
                            width: "20%"
                        }),
                        this.txtTarget,
                    ]
                })
            ]
        });
        return new sap.m.Dialog("", {
            title: this.title,
            type: sap.m.DialogType.Standard,
            state: sap.ui.core.ValueState.None,
            stretchOnPhone: true,
            horizontalScrolling: true,
            verticalScrolling: true,
            content: [this.form],
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
    }
    private page: sap.m.Page;
    private form: sap.ui.layout.form.SimpleForm;
    private table: sap.ui.table.Table;
    private txtTarget: sap.m.Input;

    /** 显示目标 */
    showTarget(target: string, aliases: ibas.KeyText[]): void {
        this.txtTarget.setValue(target);
        this.table = this.createTable(aliases);
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
                        selectedKey: "{relationship}",
                        items: openui5.utils.createComboBoxItems(ibas.emConditionRelationship)
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("shell_query_condition_bracketopen"),
                    width: "100px",
                    autoResizable: true,
                    template: new sap.m.Select("", {
                        width: "100%",
                        selectedKey: "{bracketOpen}",
                        items: this.getCharListItem("(")
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("shell_query_condition_alias"),
                    width: "200px",
                    autoResizable: true,
                    template: new sap.m.Select("", {
                        width: "100%",
                        selectedKey: "{alias}",
                        items: this.getPropertyListItem(aliases)
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("shell_query_condition_operation"),
                    width: "140px",
                    autoResizable: true,
                    template: new sap.m.Select("", {
                        width: "100%",
                        selectedKey: "{operation}",
                        items: openui5.utils.createComboBoxItems(ibas.emConditionOperation)
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("shell_query_condition_value"),
                    width: "120px",
                    autoResizable: true,
                    template: new sap.m.Input("", {
                        value: "{value}"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("shell_query_condition_bracketclose"),
                    width: "100px",
                    autoResizable: true,
                    template: new sap.m.Select("", {
                        width: "100%",
                        selectedKey: "{bracketClose}",
                        items: this.getCharListItem(")")
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
