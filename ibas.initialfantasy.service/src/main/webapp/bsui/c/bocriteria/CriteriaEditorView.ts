/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { utils } from "openui5/typings/ibas.utils";
import * as bo from "../../../borep/bo/index";
import { BORepositoryInitialFantasy } from "../../../borep/BORepositories";
import { ICriteriaEditorView } from "../../../bsapp/bocriteria/index";

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
    /** 绘制工具条 */
    darwBars(): any {
        let that: this = this;
        return [
            new sap.m.Button("", {
                text: ibas.i18n.prop("sys_shell_confirm"),
                type: sap.m.ButtonType.Transparent,
                // icon: "sap-icon://accept",
                press: function (): void {
                    that.fireViewEvents(that.confirmEvent);
                }
            }),
            new sap.m.Button("", {
                text: ibas.i18n.prop("sys_shell_exit"),
                type: sap.m.ButtonType.Transparent,
                // icon: "sap-icon://inspect-down",
                press: function (): void {
                    that.fireViewEvents(that.closeEvent);
                }
            }),
        ];
    }
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
        this.id = this.form.getId();
        return this.form;
    }
    private page: sap.m.Page;
    private form: sap.ui.layout.form.SimpleForm;
    private table: sap.ui.table.Table;
    private txtTarget: sap.m.Input;

    /** 显示目标 */
    showTarget(target: string): void {
        this.txtTarget.setValue(target);
    }
    /** 显示查询条件 */
    showConditions(datas: ibas.ICondition[]): void {
        if (ibas.objects.isNull(this.table)) {
            // 尚未初始化表格
            if (!ibas.objects.isNull(this.txtTarget.getValue())) {
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.BOInformation.PROPERTY_NAME_NAME;
                condition.value = this.txtTarget.getValue();
                let that: this = this;
                let boRepository: BORepositoryInitialFantasy = new BORepositoryInitialFantasy();
                boRepository.fetchBOInformation({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.BOInformation>): void {
                        let boInfo: bo.BOInformation = opRslt.resultObjects.firstOrDefault();
                        if (ibas.objects.isNull(boInfo)) {
                            that.table = that.createTable([]);
                            that.form.addContent(that.table);
                        } else {
                            that.table = that.createTable(boInfo.boPropertyInformations);
                            that.form.addContent(that.table);
                        }
                        that.table.setModel(new sap.ui.model.json.JSONModel(datas));
                    }
                });
            } else {
                this.table = this.createTable([]);
                this.form.addContent(this.table);
                this.table.setModel(new sap.ui.model.json.JSONModel(datas));
            }
        } else {
            this.table.setModel(new sap.ui.model.json.JSONModel(datas));
        }
    }
    private createTable(properies: bo.BOPropertyInformation[]): sap.ui.table.Table {
        let that: this = this;
        let table: sap.ui.table.Table = new sap.ui.table.Table("", {
            extension: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_add"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://add",
                        press: function (): void {
                            that.fireViewEvents(that.addConditionEvent);
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_remove"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://less",
                        press: function (): void {
                            let selected: any = utils.getTableSelecteds(that.table).firstOrDefault();
                            that.fireViewEvents(that.removeConditionEvent, selected);
                        }
                    })
                ]
            }),
            visibleRowCount: 5,
            enableSelectAll: false,
            rows: "{/}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("sys_shell_query_condition_relationship"),
                    width: "100px",
                    autoResizable: true,
                    template: new sap.m.Select("", {
                        width: "100%",
                        selectedKey: "{relationship}",
                        items: utils.createComboBoxItems(ibas.emConditionRelationship)
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("sys_shell_query_condition_bracketopen"),
                    width: "100px",
                    autoResizable: true,
                    template: new sap.m.Select("", {
                        width: "100%",
                        selectedKey: "{bracketOpen}",
                        items: this.getCharListItem("(")
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("sys_shell_query_condition_alias"),
                    width: "200px",
                    autoResizable: true,
                    template: new sap.m.Select("", {
                        width: "100%",
                        selectedKey: "{alias}",
                        items: this.getPropertyListItem(properies)
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("sys_shell_query_condition_operation"),
                    width: "140px",
                    autoResizable: true,
                    template: new sap.m.Select("", {
                        width: "100%",
                        selectedKey: "{operation}",
                        items: utils.createComboBoxItems(ibas.emConditionOperation)
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("sys_shell_query_condition_value"),
                    width: "120px",
                    autoResizable: true,
                    template: new sap.m.Input("", {
                        value: "{value}"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("sys_shell_query_condition_bracketclose"),
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
    private getPropertyListItem(properies: bo.BOPropertyInformation[]): sap.ui.core.ListItem[] {
        let items: Array<sap.ui.core.ListItem> = [];
        items.push(new sap.ui.core.ListItem("", {
            key: "",
            text: ibas.i18n.prop("sys_shell_please_chooose_data", ""),
        }));
        if (!ibas.objects.isNull(properies)) {
            for (let property of properies) {
                items.push(new sap.ui.core.ListItem("", {
                    key: property.property,
                    text: property.description,
                }));
            }
        }
        return items;
    }
}
