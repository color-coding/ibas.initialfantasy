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
import { IOrganizationEditView } from "../../../bsapp/organization/index";

/**
 * 视图-Organization
 */
export class OrganizationEditView extends ibas.BOEditView implements IOrganizationEditView {

    /** 删除数据事件 */
    deleteDataEvent: Function;

    /** 绘制视图 */
    darw(): any {
        let that = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            content: [
                new sap.ui.core.Title("", { text: "Edit" }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_organization_code") }),
                new sap.m.Input("", {
                    value: "{/code}",
                    type: sap.m.InputType.Text
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_organization_name") }),
                new sap.m.Input("", {
                    value: "{/name}",
                    type: sap.m.InputType.Text
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_organization_activated") }),
                new sap.m.Select("", {
                    items: utils.createComboBoxItems(ibas.emYesNo)
                }).bindProperty("selectedKey", {
                    path: "/activated",
                    type: "sap.ui.model.type.Integer"
                }),
                new sap.ui.core.Title("", { text: "Show" }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_organization_docentry") }),
                new sap.m.Input("", {
                    value: "{/docEntry}",
                    enabled: false,
                    type: sap.m.InputType.Text
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_organization_objectcode") }),
                new sap.m.Input("", {
                    value: "{/objectCode}",
                    enabled: false,
                    type: sap.m.InputType.Text
                }),
            ]
        });
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

    /** 显示数据 */
    showOrganization(data: bo.Organization): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(data));
        // 监听属性改变，并更新控件
        utils.refreshModelChanged(this.form, data);
    }
}
