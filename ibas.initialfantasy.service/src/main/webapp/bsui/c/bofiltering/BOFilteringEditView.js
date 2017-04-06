define(["require", "exports", "ibas/index", "openui5/typings/ibas.utils"], function (require, exports, ibas, ibas_utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BOFilteringEditView extends ibas.BOEditView {
        darw() {
            let that = this;
            this.form = new sap.ui.layout.form.SimpleForm("", {
                content: []
            });
            this.form.addContent(new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_bofilteringcondition") }));
            this.tableBOFilteringCondition = new sap.ui.table.Table("", {
                extension: new sap.m.Toolbar("", {
                    content: [
                        new sap.m.Button("", {
                            text: ibas.i18n.prop("sys_shell_ui_data_add"),
                            type: sap.m.ButtonType.Transparent,
                            icon: "sap-icon://add",
                            press: function () {
                                that.fireViewEvents(that.addBOFilteringConditionEvent);
                            }
                        }),
                        new sap.m.Button("", {
                            text: ibas.i18n.prop("sys_shell_ui_data_remove"),
                            type: sap.m.ButtonType.Transparent,
                            icon: "sap-icon://less",
                            press: function () {
                                that.fireViewEvents(that.removeBOFilteringConditionEvent);
                            }
                        })
                    ]
                }),
                enableSelectAll: false,
                visibleRowCount: 6,
                rows: "{/}",
                columns: []
            });
            this.form.addContent(this.tableBOFilteringCondition);
            this.page = new sap.m.Page("", {
                showHeader: false,
                subHeader: new sap.m.Toolbar("", {
                    content: [
                        new sap.m.Button("", {
                            text: ibas.i18n.prop("sys_shell_ui_data_save"),
                            type: sap.m.ButtonType.Transparent,
                            icon: "sap-icon://save",
                            press: function () {
                                that.fireViewEvents(that.saveDataEvent);
                            }
                        }),
                        new sap.m.ToolbarSeparator(""),
                        new sap.m.Button("", {
                            text: ibas.i18n.prop("sys_shell_ui_data_delete"),
                            type: sap.m.ButtonType.Transparent,
                            icon: "sap-icon://delete",
                            press: function () {
                                that.fireViewEvents(that.deleteDataEvent);
                            }
                        }),
                    ]
                }),
                content: [this.form]
            });
            this.id = this.page.getId();
            return this.page;
        }
        showBOFiltering(data) {
            this.form.setModel(new sap.ui.model.json.JSONModel(data));
            ibas_utils_1.utils.refreshModelChanged(this.form, data);
        }
        showBOFilteringConditions(datas) {
            this.tableBOFilteringCondition.setModel(new sap.ui.model.json.JSONModel(datas));
            ibas_utils_1.utils.refreshModelChanged(this.tableBOFilteringCondition, datas);
        }
    }
    exports.BOFilteringEditView = BOFilteringEditView;
});
