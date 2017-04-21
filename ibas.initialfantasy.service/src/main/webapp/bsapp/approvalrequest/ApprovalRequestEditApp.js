define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories"], function (require, exports, ibas, bo, BORepositories_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApprovalRequestEditApp extends ibas.BOEditApplication {
        constructor() {
            super();
            this.id = ApprovalRequestEditApp.APPLICATION_ID;
            this.name = ApprovalRequestEditApp.APPLICATION_NAME;
            this.boCode = ApprovalRequestEditApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.deleteDataEvent = this.deleteData;
            this.view.addApprovalRequestStepEvent = this.addApprovalRequestStep;
            this.view.removeApprovalRequestStepEvent = this.removeApprovalRequestStep;
        }
        viewShowed() {
            this.view.showApprovalRequest(this.editData);
            this.view.showApprovalRequestSteps(this.editData.approvalRequestSteps.filterDeleted());
        }
        run(...args) {
            if (!ibas.objects.isNull(args) && args.length === 1 && ibas.objects.instanceOf(args[0], bo.ApprovalRequest)) {
                this.editData = args[0];
            }
            if (ibas.objects.isNull(this.editData)) {
                this.editData = new bo.ApprovalRequest();
                this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_ui_data_created_new"));
            }
            super.run();
        }
        saveData() {
            try {
                let that = this;
                let boRepository = new BORepositories_1.BORepositoryInitialFantasy();
                boRepository.saveApprovalRequest({
                    beSaved: this.editData,
                    onCompleted(opRslt) {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                this.messages(ibas.emMessageType.SUCCESS, "{0}{1}", ibas.i18n.prop("sys_shell_ui_data_delete"), ibas.i18n.prop("sys_shell_ui_sucessful"));
                                this.editData = new bo.ApprovalRequest();
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
        addApprovalRequestStep() {
            this.editData.approvalRequestSteps.create();
            this.view.showApprovalRequestSteps(this.editData.approvalRequestSteps.filterDeleted());
        }
        removeApprovalRequestStep(item) {
            if (this.editData.approvalRequestSteps.indexOf(item) >= 0) {
                this.editData.approvalRequestSteps.remove(item);
                this.view.showApprovalRequestSteps(this.editData.approvalRequestSteps.filterDeleted());
            }
        }
    }
    ApprovalRequestEditApp.APPLICATION_ID = "6e9d8c05-df59-4368-a779-af796d9e07ac";
    ApprovalRequestEditApp.APPLICATION_NAME = "initialfantasy_app_approvalrequest_edit";
    ApprovalRequestEditApp.BUSINESS_OBJECT_CODE = bo.ApprovalRequest.BUSINESS_OBJECT_CODE;
    exports.ApprovalRequestEditApp = ApprovalRequestEditApp;
});
