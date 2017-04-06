define(["require", "exports", "ibas/index"], function (require, exports, ibas) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BOFilteringViewView extends ibas.BOViewView {
        darw() {
            let that = this;
            this.form = new sap.ui.layout.form.SimpleForm("", {
                content: []
            });
            this.form.addContent(new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_bofilteringcondition") }));
            this.tableBOFilteringCondition = new sap.ui.table.Table("", {
                enableSelectAll: false,
                visibleRowCount: 6,
                rows: "{/}",
                columns: []
            });
            this.form.addContent(this.tableBOFilteringCondition);
            this.page = new sap.m.Page("", {
                showHeader: false,
                subHeader: new sap.m.Bar("", {
                    contentLeft: [
                        new sap.m.Button("", {
                            text: ibas.i18n.prop("sys_shell_ui_data_edit"),
                            type: sap.m.ButtonType.Transparent,
                            icon: "sap-icon://edit",
                            press: function () {
                                that.fireViewEvents(that.editDataEvent);
                            }
                        })
                    ],
                    contentRight: [
                        new sap.m.Button("", {
                            type: sap.m.ButtonType.Transparent,
                            icon: "sap-icon://action",
                            press: function (event) {
                                that.fireViewEvents(that.callServicesEvent, {
                                    displayServices(services) {
                                        let popover = new sap.m.Popover("", {
                                            showHeader: false,
                                            placement: sap.m.PlacementType.Bottom,
                                        });
                                        for (let service of services) {
                                            popover.addContent(new sap.m.Button({
                                                text: ibas.i18n.prop(service.name),
                                                type: sap.m.ButtonType.Transparent,
                                                icon: service.icon,
                                                press: function () {
                                                    service.run();
                                                    popover.close();
                                                }
                                            }));
                                        }
                                        popover.openBy(event.getSource(), true);
                                    }
                                });
                            }
                        })
                    ]
                }),
                content: [this.form]
            });
            this.id = this.page.getId();
            return this.page;
        }
        showBOFiltering(data) {
            this.form.setModel(new sap.ui.model.json.JSONModel(data));
        }
        showBOFilteringConditions(datas) {
            this.tableBOFilteringCondition.setModel(new sap.ui.model.json.JSONModel(datas));
        }
    }
    exports.BOFilteringViewView = BOFilteringViewView;
});
