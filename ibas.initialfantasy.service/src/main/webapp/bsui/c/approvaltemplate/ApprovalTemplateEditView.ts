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
import { emApprovalStepOwnerType, emApprovalConditionType } from '../../../api/index';
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
    /** 编辑审批模板步骤条件事件 */
    editApprovalTemplateStepConditionsStartEvent: Function;
    /** 编辑审批模板步骤条件结束事件 */
    editApprovalTemplateStepConditionsEndEvent
    /** 添加审批模板步骤条件事件 */
    addApprovalTemplateStepConditionEvent: Function;
    /** 删除审批模板步骤条件事件 */
    removeApprovalTemplateStepConditionEvent: Function;
    /** 选择业务对象类型 */
    chooseApprovalTemplateBOInformationEvent: Function;
    /** 审批步骤选择步骤所有者 */
    chooseApprovalTemplateStepUserEvent: Function;
    /** 审批步骤条件选择取值属性 */
    chooseApprovalTemplateStepConditionBOPropertyInformationEvent: Function;
    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            content: [
                new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_basis_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_approvaltemplate_name") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text
                }).bindProperty("value", {
                    path: "/name",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_approvaltemplate_approvalobjectcode") }),
                new sap.m.Input("", {
                    showValueHelp: true,
                    valueHelpRequest: function (): void {
                        that.fireViewEvents(that.chooseApprovalTemplateBOInformationEvent);
                    }
                }).bindProperty("value", {
                    path: "/approvalObjectCode",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_approvaltemplate_activated") }),
                new sap.m.Select("", {
                    items: utils.createComboBoxItems(ibas.emYesNo)
                }).bindProperty("selectedKey", {
                    path: "/activated",
                    type: "sap.ui.model.type.Integer"
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_other_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_approvaltemplate_objectkey") }),
                new sap.m.Input("", {
                    enable: false,
                    type: sap.m.InputType.Text
                }).bindProperty("value", {
                    path: "/objectKey",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_approvaltemplate_objectcode") }),
                new sap.m.Input("", {
                    enabled: false,
                    type: sap.m.InputType.Text
                }).bindProperty("value", {
                    path: "/objectCode",
                }),
            ]
        });
        this.tableTitle = new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_approvaltemplatestep") });
        this.form.addContent(this.tableTitle);
        this.splitterLayoutData = new sap.ui.layout.SplitterLayoutData("", {
            resizable: false,
            size: "100%"
        });
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
            layoutData: this.splitterLayoutData,
            enableSelectAll: false,
            visibleRowCount: ibas.config.get(utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 10),
            rows: "{/rows}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_approvaltemplatestep_stepname"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        value: "{stepName}",
                        type: sap.m.InputType.Text
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_approvaltemplatestep_stepownertype"),
                    template: new sap.m.Select("", {
                        width: "100%",
                        items: utils.createComboBoxItems(emApprovalStepOwnerType)
                    }).bindProperty("selectedKey", {
                        path: "stepOwnerType",
                        type: "sap.ui.model.type.Integer"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_approvaltemplatestep_stepowner"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        showValueHelp: true,
                        valueHelpRequest: function (): void {
                            that.fireViewEvents(that.chooseApprovalTemplateStepUserEvent,
                                // 获取当前对象
                                this.getBindingContext().getObject()
                            );
                        }
                    }).bindProperty("value", {
                        path: "stepOwner"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_approvaltemplatestep_steporder"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        value: "{stepOrder}",
                        type: sap.m.InputType.Text
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_approvaltemplatestep_stepcanmodify"),
                    template: new sap.m.Select("", {
                        width: "100%",
                        items: utils.createComboBoxItems(ibas.emYesNo)
                    }).bindProperty("selectedKey", {
                        path: "stepCanModify",
                        type: "sap.ui.model.type.Integer"
                    })
                }),
                new sap.ui.table.Column("", {
                    template: new sap.m.Button("", {
                        hAlign: sap.ui.core.HorizontalAlign.Center,
                        text: ibas.i18n.prop("initialfantasy_edit_target"),
                        type: sap.m.ButtonType.Transparent,
                        press: function () {
                            that.fireViewEvents(that.editApprovalTemplateStepConditionsStartEvent
                                , this.getBindingContext().getObject()
                            );
                        }
                    })
                }),
            ]
        });
        this.tableApprovalTemplateStepCondition = new sap.ui.table.Table("", {
            extension: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_back"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://nav-back",
                        press: function (): void {
                            that.fireViewEvents(that.editApprovalTemplateStepConditionsEndEvent);
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_add"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://add",
                        press: function (): void {
                            that.fireViewEvents(that.addApprovalTemplateStepConditionEvent);
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_remove"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://less",
                        press: function (): void {
                            that.fireViewEvents(that.removeApprovalTemplateStepConditionEvent,
                                // 获取表格选中的对象
                                utils.getTableSelecteds<bo.ApprovalTemplateStepCondition>(that.tableApprovalTemplateStepCondition)
                            );
                        }
                    })
                ]
            }),
            layoutData: new sap.ui.layout.SplitterLayoutData("", {
                size: "auto"
            }),
            enableSelectAll: false,
            visibleRowCount: ibas.config.get(utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 10),
            rows: "{/rows}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_approvaltemplatestepcondition_relationship"),
                    template: new sap.m.Select("", {
                        width: "100%",
                        items: utils.createComboBoxItems(ibas.emConditionRelationship)
                    }).bindProperty("selectedKey", {
                        path: "relationship",
                        type: "sap.ui.model.type.Integer"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_approvaltemplatestepcondition_bracketopen"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        value: "{bracketOpen}",
                        type: sap.m.InputType.Text
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_approvaltemplatestepcondition_conditiontype"),
                    template: new sap.m.Select("", {
                        width: "100%",
                        items: utils.createComboBoxItems(emApprovalConditionType)
                    }).bindProperty("selectedKey", {
                        path: "conditionType",
                        type: "sap.ui.model.type.Integer"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_approvaltemplatestepcondition_propertyname"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        value: "{propertyName}",
                        showValueHelp: true,
                        valueHelpRequest: function (): void {
                            that.fireViewEvents(that.chooseApprovalTemplateStepConditionBOPropertyInformationEvent,
                                // 获取当前对象
                                this.getBindingContext().getObject()
                            );
                        }
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_approvaltemplatestepcondition_operation"),
                    template: new sap.m.Select("", {
                        width: "100%",
                        items: utils.createComboBoxItems(ibas.emConditionOperation)
                    }).bindProperty("selectedKey", {
                        path: "operation",
                        type: "sap.ui.model.type.Integer"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_approvaltemplatestepcondition_conditionvalue"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        value: "{conditionValue}",
                        type: sap.m.InputType.Text
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_approvaltemplatestepcondition_bracketclose"),
                    template: new sap.m.Input("", {
                        width: "100%",
                        value: "{bracketClose}",
                        type: sap.m.InputType.Text
                    })
                }),
            ]
        });
        this.splitter = new sap.ui.layout.Splitter("", {
            contentAreas: [
                this.tableApprovalTemplateStep,
                this.tableApprovalTemplateStepCondition
            ]
        })
        this.form.addContent(this.splitter);
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
    private tableTitle: sap.ui.core.Title;
    private splitter: sap.ui.layout.Splitter;
    private splitterLayoutData: sap.ui.layout.SplitterLayoutData;
    private tableApprovalTemplateStep: sap.ui.table.Table;
    private tableApprovalTemplateStepCondition: sap.ui.table.Table;

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
        //this.tableApprovalTemplateStep.setVisible(true);
        //this.tableApprovalTemplateStepCondition.setVisible(false);
        this.splitterLayoutData.setSize("100%");
        this.tableTitle.setText(ibas.i18n.prop("bo_approvaltemplatestep"));

        this.tableApprovalTemplateStep.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
        // 监听属性改变，并更新控件
        utils.refreshModelChanged(this.tableApprovalTemplateStep, datas);
    }
    /** 显示数据 */
    showApprovalTemplateStepConditions(datas: bo.ApprovalTemplateStepCondition[]): void {
        //this.tableApprovalTemplateStepCondition.setVisible(true);
        //this.tableApprovalTemplateStep.setVisible(false);
        this.splitterLayoutData.setSize("0%");
        this.tableTitle.setText(ibas.i18n.prop("bo_approvaltemplatestepcondition"));

        this.tableApprovalTemplateStepCondition.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
        // 监听属性改变，并更新控件
        utils.refreshModelChanged(this.tableApprovalTemplateStepCondition, datas);
    }
}
