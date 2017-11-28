/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as openui5 from "openui5/index";
import * as bo from "../../../borep/bo/index";
import { IBONumberingEditView } from "../../../bsapp/bonumbering/index";

/**
 * 编辑视图-业务对象编号方式
 */
export class BONumberingEditView extends ibas.BOEditView implements IBONumberingEditView {

    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            editable: true, // 编辑模式影响行高
            content: [
                new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_bonumbering") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_bonumbering_objectcode") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                    editable: false,
                }).bindProperty("value", {
                    path: "/objectCode"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_bonumbering_documentsubtype") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                    editable: false,
                }).bindProperty("value", {
                    path: "/documentSubType"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_bonumbering_autokey") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                    editable: false,
                }).bindProperty("value", {
                    path: "/autoKey"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_bonumbering_defaultseries") }),
                new sap.m.Select("", {
                    type: sap.m.InputType.Text,
                }).bindProperty("selectedKey", {
                    path: "/defaultSeries",
                    type: "sap.ui.model.type.Integer"
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_boseriesnumbering") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_boseriesnumbering_series") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                    editable: false,
                }).bindProperty("value", {
                    path: "/series"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_boseriesnumbering_seriesname") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                }).bindProperty("value", {
                    path: "/seriesName"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_boseriesnumbering_locked") }),
                new sap.m.Select("", {
                    type: sap.m.InputType.Text,
                }).bindProperty("selectedKey", {
                    path: "/locked",
                    type: "sap.ui.model.type.Integer"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_boseriesnumbering_template") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                }).bindProperty("value", {
                    path: "/template"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_boseriesnumbering_nextnumber") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                    editable: false,
                }).bindProperty("value", {
                    path: "/nextNumber"
                }),
            ]
        });
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
    private changeViewStatus(data: bo.BONumbering): void {
        if (ibas.objects.isNull(data)) {
            return;
        }
    }

    /** 显示数据 */
    showBONumbering(data: bo.BONumbering): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(data));
        // 监听属性改变，并更新控件
        openui5.utils.refreshModelChanged(this.form, data);
        // 改变视图状态
        this.changeViewStatus(data);
    }
}
