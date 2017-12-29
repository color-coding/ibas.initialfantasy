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
import { IBONumberingListView } from "../../../bsapp/bonumbering/index";

/**
 * 列表视图-业务对象编号方式
 */
export class BONumberingListView extends ibas.BOQueryView implements IBONumberingListView {
    /** 返回查询的对象 */
    get queryTarget(): any {
        return bo.BONumbering;
    }
    /** 编辑数据，参数：目标数据 */
    editDataEvent: Function;
    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.form = new sap.ui.layout.form.SimpleForm("");
        this.table = new sap.ui.table.Table("", {
            enableSelectAll: false,
            selectionMode: sap.ui.table.SelectionMode.Single,
            selectionBehavior: sap.ui.table.SelectionBehavior.Row,
            visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
            visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
            rows: "{/rows}",
            columns: [
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_bonumbering_objectcode"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "objectCode"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_bonumbering_documentsubtype"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "documentSubType"
                    })
                }),
                new sap.ui.table.Column("", {
                    label: ibas.i18n.prop("bo_bonumbering_autokey"),
                    template: new sap.m.Text("", {
                        wrapping: false
                    }).bindProperty("text", {
                        path: "autoKey"
                    })
                }),
            ]
        });
        this.form.addContent(this.table);
        this.page = new sap.m.Page("", {
            showHeader: false,
            subHeader: new sap.m.Toolbar("", {
                content: [
                    new sap.m.Button("", {
                        text: ibas.i18n.prop("shell_data_edit"),
                        type: sap.m.ButtonType.Transparent,
                        icon: "sap-icon://edit",
                        press: function (): void {
                            that.fireViewEvents(that.editDataEvent,
                                // 获取表格选中的对象
                                openui5.utils.getSelecteds<bo.BONumbering>(that.table).firstOrDefault()
                            );
                        }
                    }),
                    new sap.m.ToolbarSpacer(""),
                ]
            }),
            content: [this.form]
        });
        this.id = this.page.getId();
        // 添加列表自动查询事件
        openui5.utils.triggerNextResults({
            listener: this.table,
            next(data: any): void {
                if (ibas.objects.isNull(that.lastCriteria)) {
                    return;
                }
                let criteria: ibas.ICriteria = that.lastCriteria.next(data);
                if (ibas.objects.isNull(criteria)) {
                    return;
                }
                ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                that.fireViewEvents(that.fetchDataEvent, criteria);
            }
        });
        return this.page;
    }
    /** 嵌入查询面板 */
    embedded(view: any): void {
        this.page.addHeaderContent(view);
        this.page.setShowHeader(true);
    }
    private page: sap.m.Page;
    private form: sap.ui.layout.form.SimpleForm;
    private table: sap.ui.table.Table;
    /** 显示数据 */
    showData(datas: bo.BONumbering[]): void {
        let done: boolean = false;
        let model: sap.ui.model.Model = this.table.getModel(undefined);
        if (!ibas.objects.isNull(model)) {
            // 已存在绑定数据，添加新的
            let hDatas: any = (<any>model).getData();
            if (!ibas.objects.isNull(hDatas) && hDatas.rows instanceof Array) {
                for (let item of datas) {
                    hDatas.rows.push(item);
                }
                model.refresh(false);
                done = true;
            }
        }
        if (!done) {
            // 没有显示数据
            this.table.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
        }
        this.table.setBusy(false);
    }
    /** 记录上次查询条件，表格滚动时自动触发 */
    query(criteria: ibas.ICriteria): void {
        super.query(criteria);
        // 清除历史数据
        if (this.isDisplayed) {
            this.table.setBusy(true);
            this.table.setFirstVisibleRow(0);
            this.table.setModel(null);
        }
    }
}
