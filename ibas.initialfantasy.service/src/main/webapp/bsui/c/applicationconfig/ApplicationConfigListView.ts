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
            /** 列表视图-应用程序配置 */
            export class ApplicationConfigListView extends ibas.View implements app.IApplicationConfigListView {
                /** 改变配置组 */
                changeConfigGroupEvent: Function;
                /** 改变角色身份：参数1，角色；参数2，身份 */
                changeRoleIdentityEvent: Function;
                /** 编辑配置项目 */
                editConfigItemEvent: Function;
                /** 赋值配置项目值 */
                copyConfigValuesEvent: Function;
                /** 预览配置项目值 */
                viewUserConfigsEvent: Function;
                /** 保存 */
                saveEvent: Function;
                /** 删除 */
                deleteEvent: Function;
                draw(): any {
                    let that: this = this;
                    this.groupList = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.SINGLE,
                        mode: sap.m.ListMode.SingleSelectMaster,
                        growing: false,
                        items: {
                            path: "/rows",
                            template: new sap.m.FeedListItem("", {
                                icon: "{icon}",
                                text: "{name}",
                                info: "{code}",
                            })
                        },
                        selectionChange(event: sap.ui.base.Event): void {
                            let selected: boolean = event.getParameter("selected");
                            if (selected === true) {
                                that.fireViewEvents(that.changeConfigGroupEvent, that.groupList.getSelecteds().firstOrDefault());
                            }
                        }
                    });
                    this.itemList = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.MULTIPLE,
                        mode: sap.m.ListMode.MultiSelect,
                        growing: false,
                    });
                    return new sap.m.SplitContainer("", {
                        masterPages: [
                            new sap.extension.m.Page("", {
                                showHeader: false,
                                subHeader: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.SearchField("", {
                                            search(event: sap.ui.base.Event): void {
                                                let source: any = event.getSource();
                                                if (source instanceof sap.m.SearchField) {
                                                    that.groupList.setBusy(true);
                                                    let search: string = source.getValue();
                                                    let content: string;
                                                    if (search) {
                                                        search = search.trim().toLowerCase();
                                                    }
                                                    for (let item of that.groupList.getItems()) {
                                                        if (item instanceof sap.m.FeedListItem) {
                                                            item.setVisible(true);
                                                            if (ibas.strings.isEmpty(search)) {
                                                                continue;
                                                            }
                                                            content = item.getText(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                                                continue;
                                                            }
                                                            content = item.getInfo(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                                                continue;
                                                            }
                                                            item.setVisible(false);
                                                        }
                                                    }
                                                    that.groupList.setBusy(false);
                                                }
                                            }
                                        }),
                                        new sap.m.Button("", {
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://personnel-view",
                                            tooltip: ibas.i18n.prop("initialfantasy_view_user_configs"),
                                            press: function (): void {
                                                that.fireViewEvents(that.viewUserConfigsEvent);
                                            },
                                        })
                                    ]
                                }),
                                content: [
                                    this.groupList
                                ]
                            })
                        ],
                        detailPages: [
                            new sap.extension.m.Page("", {
                                showHeader: false,
                                subHeader: new sap.m.Bar("", {
                                    contentLeft: [
                                        new sap.m.Label("", {
                                            width: "auto",
                                            showColon: true,
                                            text: ibas.i18n.prop("bo_applicationconfigidentity_rolecode"),
                                        }),
                                        this.roleInput = new sap.extension.m.SelectionInput("", {
                                            width: "auto",
                                            placeholder: ibas.i18n.prop("initialfantasy_all_roles"),
                                            showValueHelp: true,
                                            repository: bo.BORepositoryInitialFantasy,
                                            dataInfo: {
                                                type: bo.Organization,
                                                key: bo.Organization.PROPERTY_CODE_NAME,
                                                text: bo.Organization.PROPERTY_NAME_NAME
                                            },
                                            criteria: [
                                                new ibas.Condition(bo.Organization.PROPERTY_CODE_NAME, ibas.emConditionOperation.NOT_EQUAL, null),
                                            ],
                                            change(event: sap.ui.base.Event): void {
                                                let source: any = event.getSource();
                                                if (source instanceof sap.m.Input) {
                                                    let data: any = that.groupList.getSelecteds().firstOrDefault();
                                                    if (!ibas.objects.isNull(data)) {
                                                        that.fireViewEvents(that.changeConfigGroupEvent, data);
                                                    }
                                                }
                                            }
                                        }),
                                        new sap.m.Label("", {
                                            width: "auto",
                                            showColon: true,
                                            text: ibas.i18n.prop("bo_applicationconfigidentity_identitycode"),
                                        }).addStyleClass("sapUiTinyMarginBegin"),
                                        this.identityInput = new sap.extension.m.SelectionInput("", {
                                            width: "auto",
                                            placeholder: ibas.i18n.prop("initialfantasy_all_identities"),
                                            showValueHelp: true,
                                            repository: bo.BORepositoryInitialFantasy,
                                            dataInfo: {
                                                type: bo.Identity,
                                                key: bo.Identity.PROPERTY_CODE_NAME,
                                                text: bo.Identity.PROPERTY_NAME_NAME
                                            },
                                            criteria: [
                                                new ibas.Condition(bo.Identity.PROPERTY_CODE_NAME, ibas.emConditionOperation.NOT_EQUAL, null),
                                            ],
                                            change(event: sap.ui.base.Event): void {
                                                let source: any = event.getSource();
                                                if (source instanceof sap.m.Input) {
                                                    let data: any = that.groupList.getSelecteds().firstOrDefault();
                                                    if (!ibas.objects.isNull(data)) {
                                                        that.fireViewEvents(that.changeConfigGroupEvent, data);
                                                    }
                                                }
                                            }
                                        }),
                                    ],
                                    contentMiddle: [
                                        new sap.m.ToolbarSeparator(""),
                                        new sap.m.SearchField("", {
                                            width: "100%",
                                            search(event: sap.ui.base.Event): void {
                                                let source: any = event.getSource();
                                                if (source instanceof sap.m.SearchField) {
                                                    that.itemList.setBusy(true);
                                                    let search: string = source.getValue();
                                                    let content: string;
                                                    if (search) {
                                                        search = search.trim().toLowerCase();
                                                    }
                                                    for (let item of that.itemList.getItems()) {
                                                        if (item instanceof sap.m.InputListItem) {
                                                            item.setVisible(true);
                                                            if (ibas.strings.isEmpty(search)) {
                                                                continue;
                                                            }
                                                            content = item.getLabel(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                                                continue;
                                                            }
                                                            item.setVisible(false);
                                                        }
                                                    }
                                                    that.itemList.setBusy(false);
                                                }
                                            }
                                        }),
                                    ],
                                    contentRight: [
                                        new sap.m.ToolbarSeparator(""),
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("initialfantasy_copy_from"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://copy",
                                            press: function (): void {
                                                that.fireViewEvents(that.copyConfigValuesEvent, that.groupList.getSelecteds().firstOrDefault());
                                            },
                                        }),
                                        new sap.m.ToolbarSeparator(""),
                                        new sap.m.MenuButton("", {
                                            text: ibas.i18n.prop("shell_data_save"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://save",
                                            menuPosition: sap.ui.core.Popup.Dock.EndBottom,
                                            buttonMode: sap.m.MenuButtonMode.Split,
                                            useDefaultActionOnly: true,
                                            defaultAction(): void {
                                                that.fireViewEvents(that.saveEvent, that.getConfigValues(that.itemList));
                                            },
                                            menu: new sap.m.Menu("", {
                                                items: [
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("shell_data_edit"),
                                                        icon: "sap-icon://edit",
                                                        visible: ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_SUPER),
                                                        press: function (): void {
                                                            that.fireViewEvents(that.editConfigItemEvent, that.getConfigValues(that.itemList, true).firstOrDefault());
                                                        }
                                                    }),
                                                ]
                                            })
                                        })
                                    ]
                                }),
                                content: [
                                    this.itemList
                                ],
                                floatingFooter: true,
                                footer: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.MenuButton("", {
                                            text: ibas.i18n.prop("shell_data_choose"),
                                            icon: "sap-icon://menu",
                                            type: sap.m.ButtonType.Transparent,
                                            menuPosition: sap.ui.core.Popup.Dock.BeginTop,
                                            menu: new sap.m.Menu("", {
                                                items: [
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("shell_all"),
                                                        icon: "sap-icon://multiselect-all",
                                                        press: function (): void {
                                                            for (let item of that.itemList.getItems()) {
                                                                that.itemList.setSelectedItem(item, true);
                                                            }
                                                        }
                                                    }),
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("shell_reverse"),
                                                        icon: "sap-icon://multi-select",
                                                        press: function (): void {
                                                            for (let item of that.itemList.getItems()) {
                                                                if (item.getSelected() === true) {
                                                                    that.itemList.setSelectedItem(item, false);
                                                                } else {
                                                                    that.itemList.setSelectedItem(item, true);
                                                                }
                                                            }
                                                        }
                                                    }),
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("shell_none"),
                                                        icon: "sap-icon://multiselect-none",
                                                        press: function (): void {
                                                            for (let item of that.itemList.getItems()) {
                                                                that.itemList.setSelectedItem(item, false);
                                                            }
                                                        }
                                                    }),
                                                ],
                                            })
                                        }),
                                        new sap.m.ToolbarSpacer(""),
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("shell_reset"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://reset",
                                            press: function (): void {
                                                for (let item of that.getConfigValues(that.itemList, true)) {
                                                    item.value = null;
                                                }
                                            },
                                        }),
                                    ]
                                })
                            })
                        ],
                    });
                }
                private groupList: sap.extension.m.List;
                private itemList: sap.extension.m.List;
                private identityInput: sap.extension.m.Input;
                private roleInput: sap.extension.m.Input;
                /** 身份 */
                get identity(): string {
                    return this.identityInput.getSelectedKey();
                }
                set identity(value: string) {
                    this.identityInput.setSelectedKey(value);
                }
                /** 角色 */
                get role(): string {
                    return this.roleInput.getSelectedKey();
                }
                set role(value: string) {
                    this.roleInput.setSelectedKey(value);
                }
                showConfigGroups(datas: app.ConfigGroup[]): void {
                    this.groupList.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
                showConfigValues(values: app.ConfigItem[]): void {
                    this.itemList.destroyItems();
                    for (let vItem of values) {
                        this.itemList.addItem(new sap.m.InputListItem("", {
                            label: ibas.strings.format("{0} - {1} ({2})", vItem.description, vItem.key, vItem.category
                                ? ibas.enums.describe(bo.emConfigCategory, vItem.category) : ibas.enums.describe(bo.emConfigCategory, bo.emConfigCategory.SERVER)
                            ),
                            type: sap.m.ListType.Inactive,
                            content: [
                                sap.extension.factories.newInput(
                                    vItem.settings,
                                    function (event: sap.ui.base.Event): void {
                                        // 仅值改变时执行
                                        if (!ibas.strings.isWith(event.getId(), "change", undefined)) {
                                            return;
                                        }
                                        // 控件值改变时，赋值到对象
                                        let source: any = event.getSource();
                                        if (source instanceof sap.m.Input || source instanceof sap.m.ComboBox) {
                                            if (!ibas.strings.isEmpty(source.getSelectedKey())) {
                                                vItem.value = source.getSelectedKey();
                                            } else if (!ibas.strings.isEmpty(source.getValue())) {
                                                vItem.value = source.getValue();
                                            } else {
                                                vItem.value = source.getPlaceholder();
                                            }
                                        } else if (source instanceof sap.m.InputBase) {
                                            if (!ibas.strings.isEmpty(source.getValue())) {
                                                vItem.value = source.getValue();
                                            } else {
                                                vItem.value = source.getPlaceholder();
                                            }
                                        }
                                    }).setTextAlign(
                                        sap.ui.core.TextAlign.Right
                                    ).setValue(
                                        vItem.value
                                    )
                            ],
                            customData: [
                                new sap.ui.core.CustomData("", {
                                    key: "DATA",
                                    value: vItem,
                                    writeToDom: false,
                                })
                            ]
                        }));
                    }
                }
                getConfigValues(list: sap.extension.m.List, isSelected?: boolean): ibas.IList<app.ConfigItem> {
                    let values: ibas.IList<app.ConfigItem> = new ibas.ArrayList<app.ConfigItem>();
                    for (let item of list.getItems()) {
                        if (isSelected === true) {
                            if (item.getSelected() !== true) {
                                continue;
                            }
                        } else if (isSelected === false) {
                            if (item.getSelected() !== false) {
                                continue;
                            }
                        }
                        for (let cItem of item.getCustomData()) {
                            if (cItem.getKey() === "DATA") {
                                values.add(cItem.getValue());
                            }
                        }
                    }
                    return values;
                }
                /** 显示用户配置值 */
                showUserConfigs(values: shell.bo.IUserConfig[], user: bo.IUser): void {
                    let dialog: sap.m.Dialog = new sap.m.Dialog("", {
                        title: ibas.strings.format("{0} - {1}", ibas.i18n.prop("initialfantasy_view_user_configs"), user.name ? user.name : user.code),
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        content: [
                            new sap.extension.m.List("", {
                                mode: sap.m.ListMode.None,
                                growing: false,
                                items: {
                                    path: "/rows",
                                    template: new sap.m.DisplayListItem("", {
                                        label: "{key}",
                                        value: "{value}",
                                    })
                                },
                            })
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                icon: "sap-icon://inspect-down",
                                press: (event: sap.ui.base.Event) => {
                                    let button: any = event.getSource();
                                    if (button instanceof sap.m.Button) {
                                        let parent: any = button.getParent();
                                        if (parent instanceof sap.m.Dialog) {
                                            parent.close();
                                        }
                                    }
                                }
                            }),
                        ]
                    });
                    dialog.setModel(new sap.extension.model.JSONModel({ rows: values }));
                    dialog.open();
                }
            }
        }
    }
}
