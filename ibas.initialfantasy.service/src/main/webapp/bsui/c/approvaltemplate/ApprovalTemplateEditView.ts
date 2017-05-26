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
import { IApprovalTemplateEditView } from "../../../bsapp/approvaltemplate/index";

/**
 * 视图-ApprovalTemplate
 */
export class ApprovalTemplateEditView extends ibas.BOEditView implements IApprovalTemplateEditView {
    /** 删除数据事件 */
    deleteDataEvent: Function;
    /** 新建数据事件，参数1：是否克隆 */
    createDataEvent: Function;
    /** 添加审批模板步骤事件 */
    addApprovalTemplateStepEvent: Function;
    /** 删除审批模板步骤事件 */
    removeApprovalTemplateStepEvent: Function;

    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            content: [
                new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_base_type") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_approvaltemplate_name") }),
                new sap.m.Input("", {
                    value: "{/name}",
                    type: sap.m.InputType.Text
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_approvaltemplate_approvalobjectcode") }),
                // new sap.m.Select("", {
                //     items: utils.createComboBoxItems(ibas.emApprovalStatus)
                // }).bindProperty("selectedKey", {
                //     value: "{/approvalObjectCode}",
                //     type: "sap.ui.model.type.Integer"
                // }),
                new sap.m.Input("", {
                    value: "{/approvalObjectCode}",
                    type: sap.m.InputType.Text
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_approvaltemplate_activated") }),
                new sap.m.Select("", {
                    items: utils.createComboBoxItems(ibas.emYesNo)
                }).bindProperty("selectedKey", {
                    path: "{/activated}",
                    type: "sap.ui.model.type.Integer"
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_other_infor") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_approvaltemplate_objectkey") }),
                new sap.m.Input("", {
                    value: "{/objectKey}",
                    enable: false,
                    type: sap.m.InputType.Text
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_approvaltemplate_objectcode") }),
                new sap.m.Input("", {
                    value: "{/objectCode}",
                    enable: false,
                    type: sap.m.InputType.Text
                }),
            ]
        });
        this.form.addContent(new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_approvaltemplatestep") }));
        this.tableApprovalTemplateStep = new sap.ui.table.Table("", {
            extension: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_add"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://add",
                        press: function (): void {
                            that.fireViewEvents(that.addApprovalTemplateStepEvent);
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_remove"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://less",
                        press: function (): void {
                            that.fireViewEvents(that.removeApprovalTemplateStepEvent,
                                // 获取表格选中的对象
                                utils.getTableSelecteds<bo.ApprovalTemplateStep>(that.tableApprovalTemplateStep)
                            );
                        }
                    })
                ]
            }),
            enableSelectAll: false,
            visibleRowCount: ibas.config.get(utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 10),
            rows: "{/rows}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_approvaltemplatestep_objectkey"),
                    template: new sap.m.Text("", {
                        width: "100%",
                    }).bindProperty("text", {
                        path: "objectKey"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_approvaltemplatestep_objectcode"),
                    template: new sap.m.Select("", {
                        width: "100%",
                        items: utils.createComboBoxItems(ibas.emDocumentStatus)
                    }).bindProperty("selectedKey", {
                        path: "objectCode",
                        type: "sap.ui.model.type.Integer"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_approvaltemplatestep_lineid"),
                    template: new sap.m.Text("", {
                        width: "100%",
                    }).bindProperty("text", {
                        path: "lineId"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_approvaltemplatestep_loginst"),
                    template: new sap.m.Text("", {
                        width: "100%",
                    }).bindProperty("text", {
                        path: "logInst"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_approvaltemplatestep_stepname"),
                    template: new sap.m.Text("", {
                        width: "100%",
                    }).bindProperty("text", {
                        path: "stepName"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_approvaltemplatestep_stepownertype"),
                    template: new sap.m.Text("", {
                        width: "100%",
                    }).bindProperty("text", {
                        path: "stepOwnerType"
                    })
                }),
            ]
        });
        this.form.addContent(this.tableApprovalTemplateStep);
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
    private changeViewStatus(data: bo.ApprovalTemplate): void {
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
    private tableApprovalTemplateStep: sap.ui.table.Table;

    /** 显示数据 */
    showApprovalTemplate(data: bo.ApprovalTemplate): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(data));
        // 监听属性改变，并更新控件
        utils.refreshModelChanged(this.form, data);
        // 改变视图状态
        this.changeViewStatus(data);
    }
    /** 显示数据 */
    showApprovalTemplateSteps(datas: bo.ApprovalTemplateStep[]): void {
        this.tableApprovalTemplateStep.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
        // 监听属性改变，并更新控件
        utils.refreshModelChanged(this.tableApprovalTemplateStep, datas);
    }
}
