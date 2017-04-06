define(["require", "exports", "ibas/index", "../../borep/bo/index", "../../borep/BORepositories"], function (require, exports, ibas, bo, BORepositories_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApprovalTemplateEditApp extends ibas.BOEditApplication {
        constructor() {
            super();
            this.id = ApprovalTemplateEditApp.APPLICATION_ID;
            this.name = ApprovalTemplateEditApp.APPLICATION_NAME;
            this.boCode = ApprovalTemplateEditApp.BUSINESS_OBJECT_CODE;
            this.description = ibas.i18n.prop(this.name);
        }
        registerView() {
            super.registerView();
            this.view.deleteDataEvent = this.deleteData;
            this.view.addApprovalTemplateStepEvent = this.addApprovalTemplateStep;
            this.view.removeApprovalTemplateStepEvent = this.removeApprovalTemplateStep;
        }
        viewShowed() {
            this.view.showApprovalTemplate(this.editData);
            this.view.showApprovalTemplateSteps(this.editData.approvalTemplateSteps.filterDeleted());
        }
        run(...args) {
            if (!ibas.objects.isNull(args) && args.length === 1 && ibas.objects.instanceOf(args[0], bo.ApprovalTemplate)) {
                this.editData = args[0];
            }
            if (ibas.objects.isNull(this.editData)) {
                this.editData = new bo.ApprovalTemplate();
                this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("sys_shell_ui_data_created_new"));
            }
            super.run();
        }
        saveData() {
            try {
                let that = this;
                let boRepository = new BORepositories_1.BORepositoryInitialFantasy();
                boRepository.saveApprovalTemplate({
                    beSaved: this.editData,
                    onCompleted(opRslt) {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                this.messages(ibas.emMessageType.SUCCESS, "{0}{1}", ibas.i18n.prop("sys_shell_ui_data_delete"), ibas.i18n.prop("sys_shell_ui_sucessful"));
                                this.editData = new bo.ApprovalTemplate();
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
        addApprovalTemplateStep() {
            this.editData.approvalTemplateSteps.create();
            this.view.showApprovalTemplateSteps(this.editData.approvalTemplateSteps.filterDeleted());
        }
        removeApprovalTemplateStep(item) {
            if (this.editData.approvalTemplateSteps.indexOf(item) >= 0) {
                this.editData.approvalTemplateSteps.remove(item);
                this.view.showApprovalTemplateSteps(this.editData.approvalTemplateSteps.filterDeleted());
            }
        }
    }
    ApprovalTemplateEditApp.APPLICATION_ID = "0d871664-ac02-4751-9afa-51bcc0de50fa";
    ApprovalTemplateEditApp.APPLICATION_NAME = "initialfantasy_app_approvaltemplate_edit";
    ApprovalTemplateEditApp.BUSINESS_OBJECT_CODE = bo.ApprovalTemplate.BUSINESS_OBJECT_CODE;
    exports.ApprovalTemplateEditApp = ApprovalTemplateEditApp;
});
