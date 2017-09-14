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
import { IBOInformationEditView } from "../../../bsapp/boinformation/index";

/**
 * 视图-BOInformation
 */
export class BOInformationEditView extends ibas.BOEditView implements IBOInformationEditView {
    /** 删除数据事件 */
    deleteDataEvent: Function;
    /** 新建数据事件，参数1：是否克隆 */
    createDataEvent: Function;
    /** 添加业务对象属性信息事件 */
    addBOPropertyInformationEvent: Function;
    /** 删除业务对象属性信息事件 */
    removeBOPropertyInformationEvent: Function;

    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            editable: true,
            content: [
                new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_basis_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_boinformation_name") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                    editable: false,
                }).bindProperty("value", {
                    path: "/name"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_boinformation_description") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text
                }).bindProperty("value", {
                    path: "/description"
                }),
                new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_other_information") }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_boinformation_objecttype") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                    editable: false,
                }).bindProperty("value", {
                    path: "/objectType"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_boinformation_code") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                    editable: false,
                }).bindProperty("value", {
                    path: "/code"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_boinformation_mapped") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                    editable: false,
                }).bindProperty("value", {
                    path: "/mapped"
                }),
            ]
        });
        this.form.addContent(new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_bopropertyinformation") }));
        this.tableBOPropertyInformation = new sap.ui.table.Table("", {
            extension: new sap.m.Toolbar("", {
                content: [
                ]
            }),
            enableSelectAll: false,
            visibleRowCount: ibas.config.get(utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 10),
            rows: "{/rows}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_bopropertyinformation_property"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "property"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_bopropertyinformation_description"),
                    template: new sap.m.Input("", {
                        width: "100%",
                    }).bindProperty("value", {
                        path: "description"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_bopropertyinformation_searched"),
                    template: new sap.m.Select("", {
                        width: "100%",
                        items: utils.createComboBoxItems(ibas.emYesNo)
                    }).bindProperty("selectedKey", {
                        path: "searched",
                        type: "sap.ui.model.type.Integer"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_bopropertyinformation_editable"),
                    template: new sap.m.Select("", {
                        width: "100%",
                        items: utils.createComboBoxItems(ibas.emYesNo)
                    }).bindProperty("selectedKey", {
                        path: "editable",
                        type: "sap.ui.model.type.Integer"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_bopropertyinformation_mapped"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "mapped"
                    })
                }),
            ]
        });
        this.form.addContent(this.tableBOPropertyInformation);
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
    private changeViewStatus(data: bo.BOInformation): void {
        if (ibas.objects.isNull(data)) {
            return;
        }
        // 新建时：禁用删除，
        if (data.isNew) {
            if (this.page.getSubHeader() instanceof sap.m.Toolbar) {
                utils.changeToolbarDeletable(<sap.m.Toolbar>this.page.getSubHeader(), false);
            }
        }
        // 不可编辑：已批准，
    }
    private tableBOPropertyInformation: sap.ui.table.Table;

    /** 显示数据 */
    showBOInformation(data: bo.BOInformation): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(data));
        // 监听属性改变，并更新控件
        utils.refreshModelChanged(this.form, data);
        // 改变视图状态
        this.changeViewStatus(data);
    }
    /** 显示数据 */
    showBOPropertyInformations(datas: bo.BOPropertyInformation[]): void {
        this.tableBOPropertyInformation.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
        // 监听属性改变，并更新控件
        utils.refreshModelChanged(this.tableBOPropertyInformation, datas);
    }
}
