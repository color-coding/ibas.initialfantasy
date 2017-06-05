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
import { IOrganizationalStructureWizardView } from "../../../bsapp/organizationalstructure/index";

/**
 * 视图-OrganizationalStructure
 */
export class OrganizationalStructureWizardView extends ibas.View implements IOrganizationalStructureWizardView {

    /** 选择组织结构事件 */
    chooseOrgStructureEvent: Function;
    /** 添加组织结构事件 */
    addOrgStructureEvent: Function;
    /** 添加角色结构事件 */
    addRoleStructureEvent: Function;
    /** 添加成员结构事件 */
    addMemberStructureEvent: Function;
    /** 移出结构元素事件 */
    removeStructureItemEvent: Function;
    /** 保存结构 */
    saveEvent: Function;
    /** 加载组织所有节点 */
    loadStructuresEvent: Function;
    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.txtOrgStructure = new sap.m.Input("", {
            showValueHelp: true,
            placeholder: ibas.i18n.prop("initialfantasy_org_wizard_please_choose"),
            valueHelpRequest: function (): void {
                that.fireViewEvents(that.chooseOrgStructureEvent);
            }
        });
        this.txtOrgStructure.bindProperty("value", {
            path: "/objectKey"
        });
        this.tableOrgStructure = new sap.ui.table.TreeTable("", {
            enableSelectAll: false,
            visibleRowCount: ibas.config.get(utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
            rows: "{/rows}",
            extension: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_add") + ibas.i18n.prop("bo_organizationalstructure"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://add",
                        press: function (): void {
                            that.fireViewEvents(that.addOrgStructureEvent,
                                // 获取表格选中的对象
                                utils.getTableSelecteds<bo.OrganizationalRole>(that.tableOrgStructure)
                            );
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_add") + ibas.i18n.prop("bo_organizationalrole"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://add",
                        press: function (): void {
                            that.fireViewEvents(that.addRoleStructureEvent,
                                // 获取表格选中的对象
                                utils.getTableSelecteds<bo.OrganizationalRole>(that.tableOrgStructure)
                            );
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_remove"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://less",
                        press: function (): void {
                            that.fireViewEvents(that.removeStructureItemEvent,
                                // 获取表格选中的对象
                                utils.getTableSelecteds<bo.OrganizationalRole>(that.tableOrgStructure)
                            );
                        }
                    })
                ]
            }),
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_organizationalstructure_organization"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "organization"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_organizationalstructure_belonging"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "belonging"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_organizationalstructure_manager"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "manager"
                    })
                })
            ]
        });
        this.tableOrgMember = new sap.ui.table.TreeTable("", {
            enableSelectAll: false,
            visibleRowCount: ibas.config.get(utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
            rows: "{/rows}",
            extension: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_add") + ibas.i18n.prop("bo_rolemember"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://add",
                        press: function (): void {
                            that.fireViewEvents(that.addMemberStructureEvent,
                                // 获取表格选中的对象
                                utils.getTableSelecteds<bo.OrganizationalRole>(that.tableOrgStructure)
                            );
                        }
                    }),
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("sys_shell_data_remove"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://less",
                        press: function (): void {
                            that.fireViewEvents(that.removeStructureItemEvent,
                                // 获取表格选中的对象
                                utils.getTableSelecteds<bo.OrganizationalRole>(that.tableOrgStructure)
                            );
                        }
                    })
                ]
            }),
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_rolemember_member"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "member"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_rolemember_member"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "member",
                        formatter(data: Date): any {
                            return data;
                        }
                    })
                }),
            ]
        });
        this.form = new sap.ui.layout.form.SimpleForm("", {
            content: [
                new sap.m.Wizard("", {
                    stepActivate(oControlEvent: any): void {
                        /*
                        for (var index: number = 0; index < this.getSteps().length; index++) {
                            let step: sap.m.WizardStep = this.getSteps()[index];
                            if (index === oControlEvent.getParameters().index) {
                                step.setVisible(true);
                            } else {
                                step.setVisible(false);
                            }
                        }
                        */
                    },
                    steps: [
                        new sap.m.WizardStep("", {
                            title: ibas.i18n.prop("initialfantasy_org_wizard_choose"),
                            icon: "sap-icon://begin",
                            content: [
                                new sap.m.VBox("", {
                                    alignItems: sap.m.FlexAlignItems.Center,
                                    justifyContent: sap.m.FlexJustifyContent.Center,
                                    width: "100%",
                                    items: [
                                        new sap.m.Label("", {
                                            text: ibas.i18n.prop("bo_organizationalstructure_objectkey")
                                        }),
                                        this.txtOrgStructure,
                                    ]
                                })
                            ]
                        }),
                        new sap.m.WizardStep("", {
                            title: ibas.i18n.prop("initialfantasy_org_wizard_date"),
                            icon: "sap-icon://date-time",
                            content: [
                                new sap.m.VBox("", {
                                    alignItems: sap.m.FlexAlignItems.Center,
                                    justifyContent: sap.m.FlexJustifyContent.Center,
                                    width: "100%",
                                    items: [
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
                                    ]
                                })
                            ]
                        }),
                        new sap.m.WizardStep("", {
                            title: ibas.i18n.prop("initialfantasy_org_wizard_alter"),
                            icon: "sap-icon://edit",
                            content: [
                                new sap.ui.layout.Splitter("", {
                                    orientation: sap.ui.core.Orientation.Horizontal,
                                    contentAreas: [
                                        new sap.ui.layout.Splitter("", {
                                            layoutData: new sap.ui.layout.SplitterLayoutData("", {
                                                resizable: true,
                                                size: "60%",
                                            }),
                                            contentAreas: [
                                                this.tableOrgStructure,
                                            ]
                                        }),
                                        new sap.ui.layout.Splitter("", {
                                            layoutData: new sap.ui.layout.SplitterLayoutData("", {
                                                resizable: true,
                                                size: "40%",
                                            }),
                                            contentAreas: [
                                                this.tableOrgMember,
                                            ]
                                        }),
                                    ]
                                })
                            ]
                        }),
                        new sap.m.WizardStep("", {
                            title: ibas.i18n.prop("initialfantasy_org_wizard_save"),
                            icon: "sap-icon://save",
                            content: [

                            ]
                        }),
                    ]
                })
            ]
        });
        this.page = new sap.m.Page("", {
            showHeader: false,
            subHeader: null,
            content: [this.form]
        });
        this.id = this.page.getId();
        return this.page;
    }
    private page: sap.m.Page;
    private form: sap.ui.layout.form.SimpleForm;
    private txtOrgStructure: sap.m.Input;
    private tableOrgStructure: sap.ui.table.TreeTable;
    private tableOrgMember: sap.ui.table.TreeTable;

    /** 显示根节点 */
    showRoot(root: bo.OrganizationalStructure): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(root));
    }
    /** 显示所有节点 */
    showStructures(root: bo.OrganizationalStructure): void {

    }
}
