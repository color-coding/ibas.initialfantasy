define(["require", "exports", "ibas/index", "openui5/typings/ibas.utils", "../../../borep/bo/index"], function (require, exports, ibas, ibas_utils_1, bo) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PrivilegeListView extends ibas.BOListView {
        get queryTarget() {
            return bo.Privilege;
        }
        darw() {
            let that = this;
            this.form = new sap.ui.layout.form.SimpleForm("");
            this.table = new sap.ui.table.Table("", {
                enableSelectAll: false,
                visibleRowCount: 15,
                visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                rows: "{/}",
                columns: []
            });
            this.form.addContent(this.table);
            this.page = new sap.m.Page("", {
                showHeader: false,
                subHeader: new sap.m.Bar("", {
                    contentLeft: [
                        new sap.m.Button("", {
                            text: ibas.i18n.prop("sys_shell_ui_data_new"),
                            type: sap.m.ButtonType.Transparent,
                            icon: "sap-icon://create",
                            press: function () {
                                that.fireViewEvents(that.newDataEvent);
                            }
                        }),
                        new sap.m.Button("", {
                            text: ibas.i18n.prop("sys_shell_ui_data_view"),
                            type: sap.m.ButtonType.Transparent,
                            icon: "sap-icon://display",
                            press: function () {
                                that.fireViewEvents(that.viewDataEvent, ibas_utils_1.utils.getTableSelecteds(that.table).firstOrDefault());
                            }
                        }),
                        new sap.m.Button("", {
                            text: ibas.i18n.prop("sys_shell_ui_data_edit"),
                            type: sap.m.ButtonType.Transparent,
                            icon: "sap-icon://edit",
                            press: function () {
                                that.fireViewEvents(that.editDataEvent, ibas_utils_1.utils.getTableSelecteds(that.table).firstOrDefault());
                            }
                        }),
                        new sap.m.Button("", {
                            text: ibas.i18n.prop("sys_shell_ui_data_delete"),
                            type: sap.m.ButtonType.Transparent,
                            icon: "sap-icon://delete",
                            press: function () {
                                that.fireViewEvents(that.deleteDataEvent, ibas_utils_1.utils.getTableSelecteds(that.table));
                            }
                        }),
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
            ibas_utils_1.utils.triggerNextResults({
                listener: this.table,
                next(data) {
                    if (ibas.objects.isNull(that.lastCriteria)) {
                        return;
                    }
                    let criteria = that.lastCriteria.next(data);
                    if (ibas.objects.isNull(criteria)) {
                        return;
                    }
                    ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                    that.fireViewEvents(that.fetchDataEvent, criteria);
                }
            });
            return this.page;
        }
        embedded(view) {
            this.page.addHeaderContent(view);
            this.page.setShowHeader(true);
        }
        showData(datas) {
            let done = false;
            let model = this.table.getModel(undefined);
            if (!ibas.objects.isNull(model)) {
                let hDatas = model.getData();
                if (!ibas.objects.isNull(hDatas)) {
                    for (let item of datas) {
                        hDatas.push(item);
                    }
                    model.refresh(false);
                    done = true;
                }
            }
            if (!done) {
                this.table.setModel(new sap.ui.model.json.JSONModel(datas));
            }
            this.table.setBusy(false);
        }
        query(criteria) {
            super.query(criteria);
            this.lastCriteria = criteria;
            this.table.setBusy(true);
            this.table.setFirstVisibleRow(0);
            this.table.setModel(null);
        }
    }
    exports.PrivilegeListView = PrivilegeListView;
});
