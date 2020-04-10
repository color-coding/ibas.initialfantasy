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
                draw() {
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
                    this.itemList = <any>new sap.extension.m.List("", {
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
                                subHeader: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.Label("", {
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
                                        new sap.m.ToolbarSeparator(""),
                                        new sap.m.Label("", {
                                            text: ibas.i18n.prop("bo_applicationconfigidentity_identitycode"),
                                        }),
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
                                        new sap.m.ToolbarSpacer(""),
                                        new sap.m.SearchField("", {
                                            width: "20rem",
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
                        let item: sap.m.InputListItem = new sap.m.InputListItem("", {
                            label: "{/description} - {/key}",
                            type: sap.m.ListType.Inactive,
                        });
                        if (ibas.strings.isWith(vItem.settings, "[", "]")) {
                            try {
                                let vObject: any = JSON.parse(vItem.settings);
                                if (vObject instanceof Array) {
                                    let select: sap.extension.m.Select = new sap.extension.m.Select("", {
                                        width: "100%",
                                        textAlign: sap.ui.core.TextAlign.Right,
                                    }).bindProperty("bindingValue", {
                                        path: "/value",
                                        type: new sap.extension.data.Alphanumeric()
                                    });
                                    for (let item of vObject) {
                                        if (item instanceof Object) {
                                            let properties: string[] = [];
                                            for (let pItem in item) {
                                                properties.push(pItem);
                                            }
                                            if (properties.length > 1) {
                                                select.addItem(new sap.ui.core.Item("", {
                                                    key: item[properties[0]],
                                                    text: item[properties[1]],
                                                }));
                                            } else if (properties.length > 0) {
                                                select.addItem(new sap.ui.core.Item("", {
                                                    key: item[properties[0]],
                                                    text: item[properties[0]],
                                                }));
                                            } else {
                                                select.addItem(new sap.ui.core.Item("", {
                                                    key: item,
                                                    text: item,
                                                }));
                                            }
                                        } else {
                                            select.addItem(new sap.ui.core.Item("", {
                                                key: item,
                                                text: item,
                                            }));
                                        }
                                    }
                                    item.addContent(select);
                                }
                            } catch (error) {
                                this.application.viewShower.messages({
                                    title: this.title,
                                    message: error,
                                    type: ibas.emMessageType.ERROR,
                                });
                            }
                        } else {
                            let criteria: ibas.ICriteria = null;
                            let property: string;
                            if (ibas.strings.isWith(vItem.settings, "#{", "}")) {
                                // #{CC_SYS_USER}.{Code}
                                // 替换变量
                                let value: string = ibas.config.applyVariables(vItem.settings);
                                let values: string[] = value.split(".");
                                if (values.length > 1) {
                                    criteria = new ibas.Criteria();
                                    if (!ibas.strings.isEmpty(values[0])) {
                                        criteria.businessObject = ibas.strings.remove(values[0], "#", "{", "}");
                                    }
                                    if (!ibas.strings.isEmpty(values[1])) {
                                        property = ibas.strings.remove(values[1], "#", "{", "}");
                                    }
                                }
                            } else if (ibas.strings.isWith(vItem.settings, "{", "}")) {
                                // {"businessObject":"CC_SYS_USER", "conditions":[]}
                                criteria = ibas.criterias.valueOf(vItem.settings);
                                if (ibas.strings.isEmpty(criteria.businessObject)) {
                                    criteria = null;
                                } else {
                                    criteria.businessObject = ibas.config.applyVariables(criteria.businessObject);
                                }
                                if (criteria.businessObject.indexOf(".") > 0) {
                                    property = criteria.businessObject.split(".")[1];
                                    criteria.businessObject = criteria.businessObject.split(".")[0];
                                }
                            }
                            let input: sap.m.Input = new sap.extension.m.Input("", {
                                showValueHelp: ibas.objects.isNull(criteria) ? false : true,
                                valueHelpRequest: function (event: sap.ui.base.Event): void {
                                    if (ibas.objects.isNull(criteria) || ibas.strings.isEmpty(criteria.businessObject)) {
                                        return;
                                    }
                                    let source: any = event.getSource();
                                    ibas.servicesManager.runChooseService<any>({
                                        boCode: criteria.businessObject,
                                        criteria: criteria,
                                        chooseType: ibas.emChooseType.MULTIPLE,
                                        onCompleted(selecteds: ibas.IList<any>): void {
                                            let builder: ibas.StringBuilder = new ibas.StringBuilder();
                                            for (let item of selecteds) {
                                                if (builder.length > 0) {
                                                    builder.append(ibas.DATA_SEPARATOR);
                                                }
                                                if (ibas.strings.isEmpty(property)) {
                                                    builder.append(item);
                                                } else {
                                                    builder.append(item[property]);
                                                }
                                            }
                                            source.setValue(builder.toString());
                                        }
                                    });
                                },
                            }).bindProperty("bindingValue", {
                                path: "/value",
                                type: new sap.extension.data.Alphanumeric()
                            });
                            item.addContent(input);
                        }
                        item.setModel(new sap.extension.model.JSONModel(vItem));
                        this.itemList.addItem(item);
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
                        let model: any = item.getModel();
                        if (model instanceof sap.extension.model.JSONModel) {
                            values.add(model.getData());
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
