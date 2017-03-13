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
import { IBOFilteringEditView } from "../../../bsapp/BOFiltering/index";

/**
 * 视图-BOFiltering
 */
export class BOFilteringEditView extends ibas.BOEditView implements IBOFilteringEditView {

    /** 添加业务对象筛选-条件事件 */
    addBOFilteringConditionEvent: Function;
    /** 删除业务对象筛选-条件事件 */
    removeBOFilteringConditionEvent: Function;

    /** 绘制视图 */
    darw(): any {
        let that = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            content: [
            ]
        });
        this.form.addContent(new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_BOFilteringitem") }));
        this.table = new sap.ui.table.Table("", {
            extension: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_ui_data_add"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://add",
                        press: function (): void {
                            that.fireViewEvents(that.addBOFilteringItemEvent);
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_ui_data_remove"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://less",
                        press: function (): void {
                            that.fireViewEvents(that.removeBOFilteringItemEvent);
                        }
                    })
                ]
            }),
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
                        text: ibas.i18n.prop("sys_shell_ui_data_save"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://save",
                        press: function (): void {
                            that.fireViewEvents(that.saveDataEvent);
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
    showBOFiltering(data: bo.BOFiltering): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(data));
    }
    /** 显示数据 */
    showBOFilteringConditions(datas: bo.BOFilteringCondition[]): void {
        this.table.setModel(new sap.ui.model.json.JSONModel(datas));
    }
}
