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
import { IOwnershipEditView } from "../../../bsapp/ownership/index";

/**
 * 视图-Ownership
 */
export class OwnershipEditView extends ibas.BOEditView implements IOwnershipEditView {

    /** 删除数据事件 */
    deleteDataEvent: Function;

    /** 绘制视图 */
    darw(): any {
        let that = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            content: [
                new sap.ui.core.Title("", { text: "Edit" }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_ownership_usercode") }),
                new sap.m.Input("", {
                    value: "{/userCode}",
                    type: sap.m.InputType.Text
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_ownership_bocode") }),
                new sap.m.Input("", {
                    value: "{/bOCode}",
                    type: sap.m.InputType.Text
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_ownership_activated") }),
                new sap.m.Select("", {
                    items: utils.createComboBoxItems(ibas.emYesNo)
                }).bindProperty("selectedKey", {
                    path: "/activated",
                    type: "sap.ui.model.type.Integer"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_ownership_self") }),
                new sap.m.Select("", {
                    items: utils.createComboBoxItems(ibas.emYesNo)
                }).bindProperty("selectedKey", {
                    path: "/self",
                    type: "sap.ui.model.type.Integer"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_ownership_lowerlevel") }),
                new sap.m.Select("", {
                    items: utils.createComboBoxItems(ibas.emYesNo)
                }).bindProperty("selectedKey", {
                    path: "/lowerLevel",
                    type: "sap.ui.model.type.Integer"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_ownership_equallevel") }),
                new sap.m.Select("", {
                    items: utils.createComboBoxItems(ibas.emYesNo)
                }).bindProperty("selectedKey", {
                    path: "/equalLevel",
                    type: "sap.ui.model.type.Integer"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_ownership_higherlevel") }),
                new sap.m.Select("", {
                    items: utils.createComboBoxItems(ibas.emYesNo)
                }).bindProperty("selectedKey", {
                    path: "/higherLevel",
                    type: "sap.ui.model.type.Integer"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_ownership_others") }),
                new sap.m.Select("", {
                    items: utils.createComboBoxItems(ibas.emYesNo)
                }).bindProperty("selectedKey", {
                    path: "/others",
                    type: "sap.ui.model.type.Integer"
                }),
                new sap.ui.core.Title("", { text: "Show" }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_ownership_objectkey") }),
                new sap.m.Input("", {
                    value: "{/objectKey}",
                    enabled: false,
                    type: sap.m.InputType.Text
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_ownership_objectcode") }),
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
    showOwnership(data: bo.Ownership): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(data));
        // 监听属性改变，并更新控件
        utils.refreshModelChanged(this.form, data);
    }
}
