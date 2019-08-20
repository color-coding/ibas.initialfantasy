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
             * 视图-Privilege
             */
            export class PrivilegeEditView extends ibas.BOEditView implements app.IPrivilegeEditView {
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 新建数据事件，参数1：是否克隆 */
                createDataEvent: Function;
                /** 选择角色标识 */
                chooseRoleEvent: Function;
                /** 选择平台标识 */
                choosePlatformEvent: Function;
                /** 选择模块标识 */
                chooseModuleEvent: Function;
                /** 选择目标标识 */
                chooseTargetEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    let formTop: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_title_general") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_privilege_rolecode") }),
                            new sap.extension.m.RepositoryInput("", {
                                showValueHelp: true,
                                repository: bo.BORepositoryInitialFantasy,
                                dataInfo: {
                                    type: bo.Organization,
                                    key: bo.Organization.PROPERTY_CODE_NAME,
                                    text: bo.Organization.PROPERTY_NAME_NAME
                                },
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseRoleEvent);
                                }
                            }).bindProperty("bindingValue", {
                                path: "roleCode",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_privilege_platformid") }),
                            new sap.extension.m.RepositoryInput("", {
                                showValueHelp: true,
                                repository: bo.BORepositoryInitialFantasy,
                                dataInfo: {
                                    type: bo.ApplicationPlatform,
                                    key: bo.ApplicationPlatform.PROPERTY_PLATFORMCODE_NAME,
                                    text: bo.ApplicationPlatform.PROPERTY_PLATFORMDESCRIPTION_NAME
                                },
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.choosePlatformEvent);
                                }
                            }).bindProperty("bindingValue", {
                                path: "platformId",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_privilege_moduleid") }),
                            new sap.extension.m.RepositoryInput("", {
                                showValueHelp: true,
                                repository: bo.BORepositoryInitialFantasy,
                                dataInfo: {
                                    type: bo.ApplicationModule,
                                    key: bo.ApplicationModule.PROPERTY_MODULEID_NAME,
                                    text: bo.ApplicationModule.PROPERTY_MODULENAME_NAME
                                },
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseModuleEvent);
                                },
                            }).bindProperty("bindingValue", {
                                path: "moduleId",
                                formatter(data: any): any {
                                    return ibas.i18n.prop(data);
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_privilege_target") }),
                            new sap.extension.m.RepositoryInput("", {
                                showValueHelp: true,
                                repository: bo.BORepositoryInitialFantasy,
                                dataInfo: {
                                    type: bo.ApplicationElement,
                                    key: bo.ApplicationElement.PROPERTY_ELEMENTID_NAME,
                                    text: bo.ApplicationElement.PROPERTY_ELEMENTNAME_NAME
                                },
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseTargetEvent);
                                },
                            }).bindProperty("bindingValue", {
                                path: "target",
                                formatter(data: any): any {
                                    return ibas.i18n.prop(data);
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_privilege_activated") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "activated",
                                type: new sap.extension.data.YesNo()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_privilege_authorisevalue") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emAuthoriseType
                            }).bindProperty("bindingValue", {
                                path: "authoriseValue",
                                type: new sap.extension.data.AuthoriseType()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_privilege_automatic") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "automatic",
                                type: new sap.extension.data.YesNo()
                            }).bindProperty("enabled", {
                                path: "authoriseValue",
                                formatter(data: any): any {
                                    return data === ibas.emAuthoriseType.ALL ? true : false;
                                }
                            }),
                            new sap.ui.core.Title("", {}),
                        ]
                    });
                    return this.page = new sap.extension.m.DataPage("", {
                        showHeader: false,
                        dataInfo: {
                            code: bo.Privilege.BUSINESS_OBJECT_CODE,
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

                /** 显示数据 */
                showPrivilege(data: bo.Privilege): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                    // 改变页面状态
                    sap.extension.pages.changeStatus(this.page);
                }
            }
        }
    }
}