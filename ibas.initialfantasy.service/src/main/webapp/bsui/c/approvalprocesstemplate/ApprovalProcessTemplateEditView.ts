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
import { IApprovalTemplateEditView } from "../../../bsapp/ApprovalTemplate/index";

/**
 * 视图-ApprovalTemplate
 */
export class ApprovalTemplateEditView extends ibas.BOEditView implements IApprovalTemplateEditView {

    /** 添加审批模板步骤事件 */
    addApprovalProcessStepTemplateEvent: Function;
    /** 删除审批模板步骤事件 */
    removeApprovalProcessStepTemplateEvent: Function;
    /** 添加审批流程步骤条件事件 */
    addApprovalProcessStepConditionTemplateEvent: Function;
    /** 删除审批流程步骤条件事件 */
    removeApprovalProcessStepConditionTemplateEvent: Function;

    /** 绘制视图 */
    darw(): any {
        let that = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            content: [
            ]
        });
        this.form.addContent(new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_ApprovalTemplateitem") }));
        this.table = new sap.ui.table.Table("", {
            extension: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_ui_data_add"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://add",
                        press: function (): void {
                            that.fireViewEvents(that.addApprovalTemplateItemEvent);
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_ui_data_remove"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://less",
                        press: function (): void {
                            that.fireViewEvents(that.removeApprovalTemplateItemEvent);
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
    showApprovalTemplate(data: bo.ApprovalTemplate): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(data));
    }
    /** 显示数据 */
    showApprovalProcessStepTemplates(datas: bo.ApprovalProcessStepTemplate[]): void {
        this.table.setModel(new sap.ui.model.json.JSONModel(datas));
    }
    /** 显示数据 */
    showApprovalProcessStepConditionTemplates(datas: bo.ApprovalProcessStepConditionTemplate[]): void {
        this.table.setModel(new sap.ui.model.json.JSONModel(datas));
    }
}
