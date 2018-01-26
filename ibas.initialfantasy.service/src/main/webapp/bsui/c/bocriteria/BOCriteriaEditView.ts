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
import { IBOCriteriaEditView } from "../../../bsapp/bocriteria/index";

/**
 * 视图-BOCriteria
 */
export class BOCriteriaEditView extends ibas.BOEditView implements IBOCriteriaEditView {
    /** 删除数据事件 */
    deleteDataEvent: Function;
    /** 新建数据事件，参数1：是否克隆 */
    createDataEvent: Function;
    /** 选择应用 */
    chooseApplicationEvent: Function;
    /** 选择业务对象编码 */
    chooseBusinessObjectEvent: Function;
    /** 选择用户或角色 */
    chooseRoleUserEvent: Function;
    /** 编辑查询 */
    editCriteriaEvent: Function;

    /** 绘制视图 */
    draw(): any {
        let that: this = this;
        this.txtBOCode = new sap.m.Input("", {
            showValueHelp: true,
            valueHelpRequest: function (): void {
                that.fireViewEvents(that.chooseBusinessObjectEvent);
            }
        });
        this.form = new sap.ui.layout.form.SimpleForm("", {
            editable: true,
            content: [
                new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_title_general") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_bocriteria_applicationid") }),
                new sap.m.Input("", {
                    showValueHelp: true,
                    valueHelpRequest: function (): void {
                        that.fireViewEvents(that.chooseApplicationEvent);
                    }
                }).bindProperty("value", {
                    path: "/applicationId"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_bocriteria_name") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text
                }).bindProperty("value", {
                    path: "/name",
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_bocriteria_activated") }),
                new sap.m.Select("", {
                    items: openui5.utils.createComboBoxItems(ibas.emYesNo)
                }).bindProperty("selectedKey", {
                    path: "/activated",
                    type: "sap.ui.model.type.Integer"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_bocriteria_assignedtype") }),
                new sap.m.Select("", {
                    items: openui5.utils.createComboBoxItems(bo.emAssignedType)
                }).bindProperty("selectedKey", {
                    path: "/assignedType",
                    type: "sap.ui.model.type.Integer"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_bocriteria_assigned") }),
                new sap.m.Input("", {
                    showValueHelp: true,
                    valueHelpRequest: function (): void {
                        that.fireViewEvents(that.chooseRoleUserEvent);
                    }
                }).bindProperty("value", {
                    path: "/assigned",
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_bocriteria_setting") }),
                new sap.m.Label("", { text: ibas.i18n.prop("initialfantasy_bocriteria_bocode") }),
                this.txtBOCode,
                new sap.m.Label("", { text: ibas.i18n.prop("bo_bocriteria_data") }),
                new sap.m.TextArea("", {
                    rows: 6,
                }).bindProperty("value", {
                    path: "/data",
                }),
                new sap.m.Label("", {}),
                new sap.m.Button("", {
                    text: ibas.i18n.prop("shell_data_edit"),
                    press: function (): void {
                        that.fireViewEvents(that.editCriteriaEvent);
                    }
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
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("shell_data_delete"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://delete",
                        press: function (): void {
                            that.fireViewEvents(that.deleteDataEvent);
                        }
                    }),
                    new sap.m.ToolbarSeparator(""),
                    new sap.m.MenuButton("", {
                        text: ibas.strings.format("{0}/{1}",
                            ibas.i18n.prop("shell_data_new"), ibas.i18n.prop("shell_data_clone")),
                        icon: "sap-icon://create",
                        type: sap.m.ButtonType.Transparent,
                        menu: new sap.m.Menu("", {
                            items: [
                                new sap.m.MenuItem("", {
                                    text: ibas.i18n.prop("shell_data_new"),
                                    icon: "sap-icon://create",
                                    press: function (): void {
                                        // 创建新的对象
                                        that.fireViewEvents(that.createDataEvent, false);
                                    }
                                }),
                                new sap.m.MenuItem("", {
                                    text: ibas.i18n.prop("shell_data_clone"),
                                    icon: "sap-icon://copy",
                                    press: function (): void {
                                        // 复制当前对象
                                        that.fireViewEvents(that.createDataEvent, true);
                                    }
                                }),
                            ],
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
    private txtBOCode: sap.m.Input;
    get target(): string {
        return this.txtBOCode.getValue();
    }
    set target(value: string) {
        this.txtBOCode.setValue(value);
    }

    /** 改变视图状态 */
    private changeViewStatus(data: bo.BOCriteria): void {
        if (ibas.objects.isNull(data)) {
            return;
        }
        // 新建时：禁用删除，
        if (data.isNew) {
            if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                openui5.utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
            }
        }
    }

    /** 显示数据 */
    showBOCriteria(data: bo.BOCriteria): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(data));
        // 监听属性改变，并更新控件
        openui5.utils.refreshModelChanged(this.form, data);
        // 改变视图状态
        this.changeViewStatus(data);
    }
}
