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
             * 视图-BOCriteria
             */
            export class BOCriteriaEditView extends ibas.BOEditView implements app.IBOCriteriaEditView {
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 新建数据事件，参数1：是否克隆 */
                createDataEvent: Function;
                /** 选择应用 */
                chooseApplicationEvent: Function;
                /** 选择业务对象编码 */
                chooseBusinessObjectEvent: Function;
                /** 选择用户或角色 */
                chooseRoleUserEvent: Function;
                /** 编辑查询 */
                editCriteriaEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    let formTop: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_title_general") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_bocriteria_applicationid") }),
                            new sap.extension.m.SelectionInput("", {
                                showValueHelp: true,
                                valueHelpOnly: false,
                                repository: bo.BORepositoryInitialFantasy,
                                dataInfo: {
                                    type: initialfantasy.bo.ApplicationElement,
                                    key: bo.ApplicationElement.PROPERTY_ELEMENTID_NAME,
                                    text: bo.ApplicationElement.PROPERTY_ELEMENTNAME_NAME
                                },
                                criteria: [
                                    new ibas.Condition(
                                        bo.ApplicationElement.PROPERTY_ELEMENTTYPE_NAME,
                                        ibas.emConditionOperation.NOT_EQUAL,
                                        bo.emElementType.MODULE
                                    )
                                ],
                            }).bindProperty("bindingValue", {
                                path: "applicationId",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 36
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_bocriteria_name") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "name",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 60
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_bocriteria_activated") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "activated",
                                type: new sap.extension.data.YesNo()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_bocriteria_assignedtype") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: bo.emAssignedType
                            }).bindProperty("bindingValue", {
                                path: "assignedType",
                                type: new sap.extension.data.Enum({
                                    enumType: bo.emAssignedType
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_bocriteria_assigned") }),
                            new sap.m.FlexBox("", {
                                items: [
                                    new sap.extension.m.RepositoryInput("", {
                                        showValueHelp: true,
                                        width: "100%",
                                        layoutData: new sap.m.FlexItemData("", {
                                            growFactor: 1,
                                        }),
                                        repository: bo.BORepositoryInitialFantasy,
                                        dataInfo: {
                                            type: bo.User,
                                            key: bo.User.PROPERTY_CODE_NAME,
                                            text: bo.User.PROPERTY_NAME_NAME
                                        },
                                        valueHelpRequest: function (): void {
                                            that.fireViewEvents(that.chooseRoleUserEvent);
                                        }
                                    }).bindProperty("visible", {
                                        path: "assignedType",
                                        formatter(data: any): any {
                                            if (data === bo.emAssignedType.USER) {
                                                return true;
                                            } else if (data === bo.emAssignedType.ROLE) {
                                                return false;
                                            }
                                            return false;
                                        }
                                    }).bindProperty("bindingValue", {
                                        path: "assigned",
                                        type: new sap.extension.data.Alphanumeric({
                                            maxLength: 20
                                        })
                                    }),
                                    new sap.extension.m.RepositoryInput("", {
                                        showValueHelp: true,
                                        width: "100%",
                                        layoutData: new sap.m.FlexItemData("", {
                                            growFactor: 1,
                                        }),
                                        repository: bo.BORepositoryInitialFantasy,
                                        dataInfo: {
                                            type: bo.Organization,
                                            key: bo.Organization.PROPERTY_CODE_NAME,
                                            text: bo.Organization.PROPERTY_NAME_NAME
                                        },
                                        valueHelpRequest: function (): void {
                                            that.fireViewEvents(that.chooseRoleUserEvent);
                                        }
                                    }).bindProperty("visible", {
                                        path: "assignedType",
                                        formatter(data: any): any {
                                            if (data === bo.emAssignedType.USER) {
                                                return false;
                                            } else if (data === bo.emAssignedType.ROLE) {
                                                return true;
                                            }
                                            return false;
                                        }
                                    }).bindProperty("bindingValue", {
                                        path: "assigned",
                                        type: new sap.extension.data.Alphanumeric({
                                            maxLength: 20
                                        })
                                    }),
                                ]
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_bocriteria_remarks") }),
                            new sap.extension.m.TextArea("", {
                                rows: 3,
                            }).bindProperty("bindingValue", {
                                path: "remarks",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_bocriteria_setting") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("initialfantasy_bocriteria_bocode") }),
                            this.txtBOCode = new sap.extension.m.Input("", {
                                showValueHelp: true,
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseBusinessObjectEvent);
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_bocriteria_data") }),
                            new sap.extension.m.TextArea("", {
                                rows: 6,
                            }).bindProperty("bindingValue", {
                                path: "data",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", {}),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_edit"),
                                press: function (): void {
                                    that.fireViewEvents(that.editCriteriaEvent);
                                }
                            }),
                        ]
                    });
                    return this.page = new sap.extension.m.DataPage("", {
                        showHeader: false,
                        dataInfo: {
                            code: bo.BOCriteria.BUSINESS_OBJECT_CODE,
                        },
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
                        content: [
                            formTop,
                        ]
                    });
                }
                private page: sap.extension.m.Page;
                private txtBOCode: sap.m.Input;
                get target(): string {
                    return this.txtBOCode.getValue();
                }
                set target(value: string) {
                    this.txtBOCode.setValue(value);
                }
                /** 显示数据 */
                showBOCriteria(data: bo.BOCriteria): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                    // 改变页面状态
                    sap.extension.pages.changeStatus(this.page);
                }
            }
        }
    }
}