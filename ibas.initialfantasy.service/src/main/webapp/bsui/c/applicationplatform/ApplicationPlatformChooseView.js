define(["require", "exports", "ibas/index", "openui5/typings/ibas.utils", "../../../borep/bo/index"], function (require, exports, ibas, ibas_utils_1, bo) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApplicationPlatformChooseView extends ibas.BOChooseView {
        get queryTarget() {
            return bo.ApplicationPlatform;
        }
        darwBars() {
            let that = this;
            return [
                new sap.m.Button("", {
                    text: ibas.i18n.prop("sys_shell_ui_data_new"),
                    type: sap.m.ButtonType.Transparent,
                    press: function () {
                        that.fireViewEvents(that.newDataEvent);
                    }
                }),
                new sap.m.Button("", {
                    text: ibas.i18n.prop("sys_shell_ui_data_choose"),
                    type: sap.m.ButtonType.Transparent,
                    press: function () {
                        that.fireViewEvents(that.chooseDataEvent, ibas_utils_1.utils.getTableSelecteds(that.table));
                    }
                }),
                new sap.m.Button("", {
                    text: ibas.i18n.prop("sys_shell_ui_exit"),
                    type: sap.m.ButtonType.Transparent,
                    press: function () {
                        that.fireViewEvents(that.closeEvent);
                    }
                }),
            ];
        }
        darw() {
            let that = this;
            this.table = new sap.ui.table.Table("", {
                enableSelectAll: false,
                visibleRowCount: 15,
                rows: "{/}",
                columns: []
            });
            this.id = this.table.getId();
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
            return this.table;
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
    exports.ApplicationPlatformChooseView = ApplicationPlatformChooseView;
});
