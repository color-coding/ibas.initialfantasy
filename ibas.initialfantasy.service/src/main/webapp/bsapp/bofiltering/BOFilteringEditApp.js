define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories"], function (require, exports, ibas, bo, BORepositories_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BOFilteringEditApp extends ibas.BOEditApplication {
        constructor() {
            super();
            this.id = BOFilteringEditApp.APPLICATION_ID;
            this.name = BOFilteringEditApp.APPLICATION_NAME;
            this.boCode = BOFilteringEditApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.deleteDataEvent = this.deleteData;
            this.view.addBOFilteringConditionEvent = this.addBOFilteringCondition;
            this.view.removeBOFilteringConditionEvent = this.removeBOFilteringCondition;
        }
        viewShowed() {
            this.view.showBOFiltering(this.editData);
            this.view.showBOFilteringConditions(this.editData.bOFilteringConditions.filterDeleted());
        }
        run(...args) {
            if (!ibas.objects.isNull(args) && args.length === 1 && ibas.objects.instanceOf(args[0], bo.BOFiltering)) {
                this.editData = args[0];
            }
            if (ibas.objects.isNull(this.editData)) {
                this.editData = new bo.BOFiltering();
                this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_ui_data_created_new"));
            }
            super.run();
        }
        saveData() {
            try {
                let that = this;
                let boRepository = new BORepositories_1.BORepositoryInitialFantasy();
                boRepository.saveBOFiltering({
                    beSaved: this.editData,
                    onCompleted(opRslt) {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                this.messages(ibas.emMessageType.SUCCESS, "{0}{1}", ibas.i18n.prop("sys_shell_ui_data_delete"), ibas.i18n.prop("sys_shell_ui_sucessful"));
                                this.editData = new bo.BOFiltering();
                            }
                            else {
                                this.editData = opRslt.resultObjects.firstOrDefault();
                                this.messages(ibas.emMessageType.SUCCESS, "{0}{1}", ibas.i18n.prop("sys_shell_ui_data_save"), ibas.i18n.prop("sys_shell_ui_sucessful"));
                            }
                            this.viewShowed();
                        }
                        catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.busy(true);
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("sys_shell_saving_data"));
            }
            catch (error) {
                this.messages(error);
            }
        }
        deleteData() {
            let that = this;
            this.messages({
                type: ibas.emMessageType.QUESTION,
                title: ibas.i18n.prop(this.name),
                message: ibas.i18n.prop("msg_whether_to_delete"),
                actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                onCompleted(action) {
                    if (action === ibas.emMessageAction.YES) {
                        that.editData.delete();
                        that.saveData();
                    }
                }
            });
        }
        addBOFilteringCondition() {
            this.editData.bOFilteringConditions.create();
            this.view.showBOFilteringConditions(this.editData.bOFilteringConditions.filterDeleted());
        }
        removeBOFilteringCondition(item) {
            if (this.editData.bOFilteringConditions.indexOf(item) >= 0) {
                this.editData.bOFilteringConditions.remove(item);
                this.view.showBOFilteringConditions(this.editData.bOFilteringConditions.filterDeleted());
            }
        }
    }
    BOFilteringEditApp.APPLICATION_ID = "0361eba8-03b7-48a4-bb2a-2a3410a9e996";
    BOFilteringEditApp.APPLICATION_NAME = "initialfantasy_app_bofiltering_edit";
    BOFilteringEditApp.BUSINESS_OBJECT_CODE = bo.BOFiltering.BUSINESS_OBJECT_CODE;
    exports.BOFilteringEditApp = BOFilteringEditApp;
});
