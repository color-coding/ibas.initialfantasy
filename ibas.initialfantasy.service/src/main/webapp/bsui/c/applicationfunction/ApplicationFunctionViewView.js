define(["require", "exports", "ibas/index"], function (require, exports, ibas) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApplicationFunctionViewView extends ibas.BOViewView {
        darw() {
            let that = this;
            this.form = new sap.ui.layout.form.SimpleForm("", {
                content: []
            });
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
        showApplicationFunction(data) {
            this.form.setModel(new sap.ui.model.json.JSONModel(data));
        }
    }
    exports.ApplicationFunctionViewView = ApplicationFunctionViewView;
});
