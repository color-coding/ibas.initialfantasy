/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

/// <reference path="../../../3rdparty/openui5/typings/index.d.ts" />
import * as ibas from "../../../3rdparty/ibas/index";
import * as bo from "../../../borep/bo/index";
import { utils } from "../../../3rdparty/openui5/typings/ibas.utils";
import { IOrganizationalStructureViewView } from "../../../bsapp/OrganizationalStructure/index";

/**
 * 视图-OrganizationalStructure
 */
export class OrganizationalStructureViewView extends ibas.BOViewView implements IOrganizationalStructureViewView {

    /** 绘制视图 */
    darw(): any {
        let that = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            content: [
            ]
        });
        this.form.addContent(new sap.ui.core.Title("", { text: "Items" }));
        this.table = new sap.ui.table.Table("", {
            visibleRowCount: 6,
            rows: "{/}",
            columns: [
            ]
        });
        this.form.addContent(this.table);
        this.page = new sap.m.Page("", {
            showHeader: false,
            subHeader: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_ui_data_edit"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://edit",
                        press: function (): void {
                            that.fireViewEvents(that.editDataEvent);
                        }
                    })
                ]
            }),
            content: [this.form]
        });
        this.id = this.page.getId();
        return this.page;
    }
    private page: sap.m.Page;
    private form: sap.ui.layout.form.SimpleForm;
    private table: sap.ui.table.Table;

    /** 显示数据 */
    showOrganizationalStructure(data: bo.OrganizationalStructure): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(data));
    }
    /** 显示数据 */
    showOrganizationalRoles(datas: bo.OrganizationalRole[]): void {
        this.table.setModel(new sap.ui.model.json.JSONModel(datas));
    }
    /** 显示数据 */
    showRoleMembers(datas: bo.RoleMember[]): void {
        this.table.setModel(new sap.ui.model.json.JSONModel(datas));
    }
}