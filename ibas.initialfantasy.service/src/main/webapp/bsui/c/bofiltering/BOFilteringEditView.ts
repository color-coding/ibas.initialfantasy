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
             * 视图-BOFiltering
             */
            export class BOFilteringEditView extends ibas.BOEditView implements app.IBOFilteringEditView {
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 新建数据事件，参数1：是否克隆 */
                createDataEvent: Function;
                /** 添加业务对象筛选-条件事件 */
                addBOFilteringConditionEvent: Function;
                /** 删除业务对象筛选-条件事件 */
                removeBOFilteringConditionEvent: Function;
                /** 选择角色事件 */
                chooseRoleEvent: Function;
                /** 选择业务对象事件 */
                chooseBusinessObjectEvent: Function;
                propertySelet: sap.m.ex.BOChildSelect;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.form = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_title_general") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_bofiltering_name") }),
                            new sap.m.Input("", {
                                type: sap.m.InputType.Text
                            }).bindProperty("value", {
                                path: "/name"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_bofiltering_rolecode") }),
                            new sap.m.Input("", {
                                showValueHelp: true,
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseRoleEvent);
                                }
                            }).bindProperty("value", {
                                path: "/roleCode"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_bofiltering_bocode") }),
                            new sap.m.Input("", {
                                showValueHelp: true,
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseBusinessObjectEvent);
                                }
                            }).bindProperty("value", {
                                path: "/boCode"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_bofiltering_activated") }),
                            new sap.m.Select("", {
                                items: openui5.utils.createComboBoxItems(ibas.emYesNo)
                            }).bindProperty("selectedKey", {
                                path: "/activated",
                                type: "sap.ui.model.type.Integer"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_bofiltering_filteringtype") }),
                            new sap.m.Select("", {
                                items: openui5.utils.createComboBoxItems(bo.emFilteringType)
                            }).bindProperty("selectedKey", {
                                path: "/filteringType",
                                type: "sap.ui.model.type.Integer"
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_title_others") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_bofiltering_objectkey") }),
                            new sap.m.Input("", {
                                enabled: false,
                                type: sap.m.InputType.Text
                            }).bindProperty("value", {
                                path: "/objectKey"
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_bofiltering_objectcode") }),
                            new sap.m.Input("", {
                                enabled: false,
                                type: sap.m.InputType.Text
                            }).bindProperty("value", {
                                path: "/objectCode"
                            }),
                        ]
                    });
                    this.form.addContent(new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_bofilteringcondition") }));
                    let columnBOProperty: sap.ui.table.Column = new sap.ui.table.Column("", {
                        label: ibas.i18n.prop("bo_bofilteringcondition_propertyname"),
                        template: that.propertySelet = new sap.m.ex.BOChildSelect("", {
                            blank:true,
                            width: "100%",
                            boKey: "property",
                            boText: "description",
                            boCode: ibas.config.applyVariables(bo.BO_CODE_BOINFORMATION),
                            repositoryName: bo.BORepositoryInitialFantasy.name,
                            childPropertyName: "boPropertyInformations",
                            bindingValue: {
                                path: "propertyName"
                            },
                            onLoadItemsCompleted: function (oEvent: any): void {
                                columnBOProperty.setTemplate(that.propertySelet);
                            }
                        })
                    });
                    this.tableBOFilteringCondition = new sap.ui.table.Table("", {
                        toolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_add"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://add",
                                    press: function (): void {
                                        that.fireViewEvents(that.addBOFilteringConditionEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_remove"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://less",
                                    press: function (): void {
                                        that.fireViewEvents(that.removeBOFilteringConditionEvent,
                                            // 获取表格选中的对象
                                            openui5.utils.getSelecteds<bo.BOFilteringCondition>(that.tableBOFilteringCondition)
                                        );
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
                                label: ibas.i18n.prop("bo_bofilteringcondition_relationship"),
                                template: new sap.m.Select("", {
                                    width: "100%",
                                    items: openui5.utils.createComboBoxItems(ibas.emConditionRelationship)
                                }).bindProperty("selectedKey", {
                                    path: "relationship",
                                    type: "sap.ui.model.type.Integer"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_bofilteringcondition_bracketopen"),
                                template: new sap.m.Select("", {
                                    width: "100%",
                                    selectedKey: "{bracketOpen}",
                                    items: this.getCharListItem("(")
                                })
                            }),
                            columnBOProperty,
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_bofilteringcondition_operation"),
                                template: new sap.m.Select("", {
                                    width: "100%",
                                    items: openui5.utils.createComboBoxItems(ibas.emConditionOperation)
                                }).bindProperty("selectedKey", {
                                    path: "operation",
                                    type: "sap.ui.model.type.Integer"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_bofilteringcondition_conditionvalue"),
                                template: new sap.m.Input("", {
                                    width: "100%",
                                    value: "{conditionValue}",
                                    type: sap.m.InputType.Text
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_bofilteringcondition_bracketclose"),
                                template: new sap.m.Select("", {
                                    width: "100%",
                                    selectedKey: "{bracketClose}",
                                    items: this.getCharListItem(")")
                                })
                            }),
                        ]
                    });
                    this.form.addContent(this.tableBOFilteringCondition);
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
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_delete"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://delete",
                                    press: function (): void {
                                        that.fireViewEvents(that.deleteDataEvent);
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.MenuButton("", {
                                    text: ibas.strings.format("{0}/{1}",
                                        ibas.i18n.prop("shell_data_new"), ibas.i18n.prop("shell_data_clone")),
                                    icon: "sap-icon://create",
                                    type: sap.m.ButtonType.Transparent,
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_new"),
                                                icon: "sap-icon://create",
                                                press: function (): void {
                                                    // 创建新的对象
                                                    that.fireViewEvents(that.createDataEvent, false);
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_clone"),
                                                icon: "sap-icon://copy",
                                                press: function (): void {
                                                    // 复制当前对象
                                                    that.fireViewEvents(that.createDataEvent, true);
                                                }
                                            }),
                                        ],
                                    })
                                }),
                            ]
                        }),
                        content: [this.form]
                    });
                    this.id = this.page.getId();
                    return this.page;
                }
                /** 获取重复的字符 */
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
                private page: sap.m.Page;
                private form: sap.ui.layout.form.SimpleForm;
                /** 改变视图状态 */
                private changeViewStatus(data: bo.BOFiltering): void {
                    if (ibas.objects.isNull(data)) {
                        return;
                    }
                    // 新建时：禁用删除，
                    if (data.isNew) {
                        if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                            openui5.utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
                        }
                    }
                }
                private tableBOFilteringCondition: sap.ui.table.Table;

                /** 显示数据 */
                showBOFiltering(data: bo.BOFiltering): void {
                    this.form.setModel(new sap.ui.model.json.JSONModel(data));
                    // 监听属性改变，并更新控件
                    openui5.utils.refreshModelChanged(this.form, data);
                    // 改变视图状态
                    this.changeViewStatus(data);
                    this.propertySelet.setCriteria([
                        new ibas.Condition("code", ibas.emConditionOperation.EQUAL, data.boCode)
                    ]);
                }
                /** 显示数据 */
                showBOFilteringConditions(datas: bo.BOFilteringCondition[]): void {
                    this.tableBOFilteringCondition.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    // 监听属性改变，并更新控件
                    openui5.utils.refreshModelChanged(this.tableBOFilteringCondition, datas);
                }
            }
        }
    }
}