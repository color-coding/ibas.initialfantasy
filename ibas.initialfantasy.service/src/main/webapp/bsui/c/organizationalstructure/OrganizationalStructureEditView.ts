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
    /** 添加组织-角色事件 */
    addOrganizationalRoleEvent: Function;
    /** 删除组织-角色事件 */
    removeOrganizationalRoleEvent: Function;

    /** 绘制视图 */
    darw(): any {
        let that = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            content: [
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
                            that.fireViewEvents(that.removeOrganizationalRoleEvent);
                        }
                    })
                ]
            }),
            enableSelectAll: false,
            visibleRowCount: 6,
            rows: "{/}",
            columns: [
            ]
        });
        this.form.addContent(this.tableOrganizationalRole);
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
                    new sap.m.ToolbarSeparator(""),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_delete"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://delete",
                        press: function (): void {
                            that.fireViewEvents(that.deleteDataEvent);
                        }
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
    private tableOrganizationalRole: sap.ui.table.Table;

    /** 显示数据 */
    showOrganizationalStructure(data: bo.OrganizationalStructure): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(data));
        // 监听属性改变，并更新控件
        utils.refreshModelChanged(this.form, data);
    }
    /** 显示数据 */
    showOrganizationalRoles(datas: bo.OrganizationalRole[]): void {
        this.tableOrganizationalRole.setModel(new sap.ui.model.json.JSONModel(datas));
        // 监听属性改变，并更新控件
        utils.refreshModelChanged(this.tableOrganizationalRole, datas);
    }
}
