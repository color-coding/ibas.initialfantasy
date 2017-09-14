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
import { IOrganizationalStructureEditView } from "../../../bsapp/organizationalstructure/index";

/**
 * 视图-OrganizationalStructure
 */
export class OrganizationalStructureEditView extends ibas.BOEditView implements IOrganizationalStructureEditView {
    /** 删除数据事件 */
    deleteDataEvent: Function;
    /** 新建数据事件，参数1：是否克隆 */
    createDataEvent: Function;
    /** 添加组织-角色事件 */
    addOrganizationalRoleEvent: Function;
    /** 删除组织-角色事件 */
    removeOrganizationalRoleEvent: Function;
    /** 选则-组织角色 */
    chooseOrganizationalRoleEvent: Function;
    /** 选择-角色成员 */
    choooseRoleMemberEvent: Function;
    /** 选则-组织 */
    chooseOrganizationEvent: Function;
    /** 选则-所属组织 */
    chooseOrganizationalStructureEvent: Function;
    /** 选中-组织角色 */
    selectedOrganizationalRoleEvent: Function;
    /** 选则-经理 */
    chooseManagerEvent: Function;
    /** 添加角色-成员事件 */
    addRoleMemberEvent: Function;
    /** 删除角色-成员事件 */
    removeRoleMemberEvent: Function;

    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            editable:true,
            content: [
                new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_basis_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_organizationalstructure_organization") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                    showValueHelp: true,
                    valueHelpRequest: function (): void {
                        that.fireViewEvents(that.chooseOrganizationEvent);
                    }
                }).bindProperty("value", {
                    path: "/organization"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_organizationalstructure_belonging") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                    showValueHelp: true,
                    valueHelpRequest: function (): void {
                        that.fireViewEvents(that.chooseOrganizationalStructureEvent);
                    }
                }).bindProperty("value", {
                    path: "/belonging"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_organizationalstructure_manager") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                    showValueHelp: true,
                    valueHelpRequest: function (): void {
                        that.fireViewEvents(that.chooseManagerEvent);
                    }
                }).bindProperty("value", {
                    path: "/manager"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_organizationalstructure_validdate") }),
                new sap.m.DatePicker("", {
                    valueFormat: "yyyy-MM-dd",
                }).bindProperty("dateValue", {
                    path: "/validDate"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_organizationalstructure_invaliddate") }),
                new sap.m.DatePicker("", {
                    valueFormat: "yyyy-MM-dd",
                }).bindProperty("dateValue", {
                    path: "/invalidDate"
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_other_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_organizationalstructure_objectkey") }),
                new sap.m.Input("", {
                    enabled: false,
                    type: sap.m.InputType.Text
                }).bindProperty("value", {
                    path: "/objectKey"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_organizationalstructure_objectcode") }),
                new sap.m.Input("", {
                    enabled: false,
                    type: sap.m.InputType.Text
                }).bindProperty("value", {
                    path: "/objectCode"
                }),
            ]
        });
        this.form.addContent(new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_organizationalrole") }));
        this.tableOrganizationalRole = new sap.ui.table.Table("", {
            extension: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_add"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://add",
                        press: function (): void {
                            that.fireViewEvents(that.addOrganizationalRoleEvent);
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_remove"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://less",
                        press: function (): void {
                            that.fireViewEvents(that.removeOrganizationalRoleEvent,
                                // 获取表格选中的对象
                                utils.getTableSelecteds<bo.OrganizationalRole>(that.tableOrganizationalRole)
                            );
                        }
                    })
                ]
            }),
            enableSelectAll: false,
            // selectionMode: sap.ui.table.SelectionMode.Single,
            visibleRowCount: 5,
            rows: "{/rows}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_organizationalrole_role"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        showValueHelp: true,
                        valueHelpRequest: function (): void {
                            that.fireViewEvents(that.chooseOrganizationalRoleEvent,
                                // 获取当前对象
                                this.getBindingContext().getObject()
                            );
                        }
                    }).bindProperty("value", {
                        path: "role"
                    })
                }),
            ],
            rowSelectionChange: function (): void {
                that.fireViewEvents(that.selectedOrganizationalRoleEvent,
                    utils.getTableSelecteds<bo.RoleMember>(that.tableOrganizationalRole).firstOrDefault()
                );
            }
        });
        this.form.addContent(this.tableOrganizationalRole);
        this.form.addContent(new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_rolemember") }));
        this.tableRoleMember = new sap.ui.table.Table("", {
            extension: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_add"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://add",
                        press: function (): void {
                            that.fireViewEvents(that.addRoleMemberEvent);
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_remove"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://less",
                        press: function (): void {
                            that.fireViewEvents(that.removeRoleMemberEvent,
                                utils.getTableSelecteds<bo.RoleMember>(that.tableRoleMember)
                            );
                        }
                    })
                ]
            }),
            enableSelectAll: false,
            visibleRowCount: 5,
            rows: "{/rows}",
            columns: [
                /*
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_rolemember_rolelineid"),
                    template: new sap.m.Text("", {
                        width: "100%",
                    }).bindProperty("text", {
                        path: "roleLineId"
                    })
                }),
                */
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_rolemember_member"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        showValueHelp: true,
                        valueHelpRequest: function (): void {
                            that.fireViewEvents(that.choooseRoleMemberEvent,
                                // 获取当前对象
                                this.getBindingContext().getObject()
                            );
                        }
                    }).bindProperty("value", {
                        path: "member"
                    })
                }),
            ]
        });
        this.form.addContent(this.tableRoleMember);
        this.page = new sap.m.Page("", {
            showHeader: false,
            subHeader: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_save"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://save",
                        press: function (): void {
                            that.fireViewEvents(that.saveDataEvent);
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_delete"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://delete",
                        press: function (): void {
                            that.fireViewEvents(that.deleteDataEvent);
                        }
                    }),
                    new sap.m.ToolbarSeparator(""),
                    new sap.m.MenuButton("", {
                        text: ibas.i18n.prop("sys_shell_data_new"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://create",
                        buttonMode: sap.m.MenuButtonMode.Split,
                        defaultAction: function (): void {
                            // 触发新建对象
                            that.fireViewEvents(that.createDataEvent, false);
                        },
                        menu: new sap.m.Menu("", {
                            items: [
                                new sap.m.MenuItem("", {
                                    text: ibas.i18n.prop("sys_shell_data_new"),
                                    icon: "sap-icon://create"
                                }),
                                new sap.m.MenuItem("", {
                                    text: ibas.i18n.prop("sys_shell_data_clone"),
                                    icon: "sap-icon://copy"
                                }),
                            ],
                            itemSelected: function (event: any): void {
                                let item: any = event.getParameter("item");
                                if (item instanceof sap.m.MenuItem) {
                                    if (item.getIcon() === "sap-icon://copy") {
                                        // 触发克隆对象
                                        that.fireViewEvents(that.createDataEvent, true);
                                    } else {
                                        // 触发新建对象
                                        that.fireViewEvents(that.createDataEvent, false);
                                    }
                                }
                            }
                        })
                    }),
                ]
            }),
            content: [this.form]
        });
        this.id = this.page.getId();
        return this.page;
    }
    private page: sap.m.Page;
    private form: sap.ui.layout.form.SimpleForm;
    /** 改变视图状态 */
    private changeViewStatus(data: bo.OrganizationalStructure): void {
        if (ibas.objects.isNull(data)) {
            return;
        }
        // 新建时：禁用删除，
        if (data.isNew) {
            if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
            }
        }
    }
    private tableOrganizationalRole: sap.ui.table.Table;
    private tableRoleMember: sap.ui.table.Table;

    /** 显示数据 */
    showOrganizationalStructure(data: bo.OrganizationalStructure): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(data));
        // 监听属性改变，并更新控件
        utils.refreshModelChanged(this.form, data);
        // 改变视图状态
        this.changeViewStatus(data);
    }
    /** 显示数据 */
    showOrganizationalRoles(datas: bo.OrganizationalRole[]): void {
        this.tableOrganizationalRole.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
        // 监听属性改变，并更新控件
        utils.refreshModelChanged(this.tableOrganizationalRole, datas);
    }
    /** 显示数据 */
    showRoleMembers(datas: bo.RoleMember[]): void {
        this.tableRoleMember.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
        // 监听属性改变，并更新控件
        utils.refreshModelChanged(this.tableRoleMember, datas);
    }
}
