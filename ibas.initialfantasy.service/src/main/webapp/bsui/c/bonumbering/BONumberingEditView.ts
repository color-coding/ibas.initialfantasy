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
export class BONumberingEditView extends ibas.BOView implements IBONumberingEditView {

    /** 保存系列编号方式 */
    saveBOSeriesNumberingEvent: Function;
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
            ]
        });
        this.form.addContent(new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_boseriesnumbering") }));
        this.table = new sap.ui.table.Table("", {
            selectionMode: sap.ui.table.SelectionMode.None,
            extension: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("shell_data_add"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://add",
                        press: function (): void {
                            let model: sap.ui.model.Model = that.table.getModel(undefined);
                            if (!ibas.objects.isNull(model)) {
                                // 已存在绑定数据，添加新的
                                let hDatas: any = (<any>model).getData();
                                hDatas.rows.push(new bo.BOSeriesNumbering());
                                model.refresh(false);
                            }
                        }
                    }),
                ]
            }),
            enableSelectAll: false,
            visibleRowCount: 5,
            rows: "{/rows}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_boseriesnumbering_series"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "series"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_boseriesnumbering_seriesname"),
                    template: new sap.m.Input("", {
                        width: "100%",
                    }).bindProperty("value", {
                        path: "seriesName"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_boseriesnumbering_template") + " [format()]",
                    template: new sap.m.Input("", {
                        width: "100%",
                    }).bindProperty("value", {
                        path: "template"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_boseriesnumbering_locked"),
                    template: new sap.m.Select("", {
                        width: "100%",
                        items: openui5.utils.createComboBoxItems(ibas.emYesNo)
                    }).bindProperty("selectedKey", {
                        path: "locked",
                        type: "sap.ui.model.type.Integer"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_boseriesnumbering_nextnumber"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "nextNumber"
                    })
                }),
                new sap.ui.table.Column("", {
                    template: new sap.m.Button("", {
                        width: "100%",
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://save",
                        press: function (): void {
                            that.fireViewEvents(that.saveBOSeriesNumberingEvent, this.getBindingContext().getObject());
                        }
                    })
                }),
            ]
        });
        this.form.addContent(this.table);
        this.page = new sap.m.Page("", {
            showHeader: false,
            content: [this.form]
        });
        this.id = this.page.getId();
        return this.page;
    }
    private page: sap.m.Page;
    private form: sap.ui.layout.form.SimpleForm;
    private table: sap.ui.table.Table;
    /** 显示数据 */
    showBONumbering(data: bo.BONumbering): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(data));
    }
    /** 显示数据 */
    showBOSeriesNumbering(datas: bo.BOSeriesNumbering[]): void {
        this.table.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
    }
}
