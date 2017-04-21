define(["require", "exports", "ibas/index", "./applicationfunction/index", "./applicationmodule/index", "./applicationplatform/index", "./approvalrequest/index", "./approvaltemplate/index", "./bocriteria/index", "./bofiltering/index", "./organization/index", "./organizationalstructure/index", "./ownership/index", "./privilege/index", "./role/index", "./user/index"], function (require, exports, ibas, index_1, index_2, index_3, index_4, index_5, index_6, index_7, index_8, index_9, index_10, index_11, index_12, index_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Console extends ibas.ModuleConsole {
        constructor() {
            super();
            this.id = Console.CONSOLE_ID;
            this.name = Console.CONSOLE_NAME;
        }
        navigation() {
            return this._navigation;
        }
        registers() {
            this.register(new index_1.ApplicationFunctionFunc());
            this.register(new index_2.ApplicationModuleFunc());
            this.register(new index_3.ApplicationPlatformFunc());
            this.register(new index_4.ApprovalRequestFunc());
            this.register(new index_5.ApprovalTemplateFunc());
            this.register(new index_6.BOCriteriaFunc());
            this.register(new index_7.BOFilteringFunc());
            this.register(new index_8.OrganizationFunc());
            this.register(new index_9.OrganizationalStructureFunc());
            this.register(new index_10.OwnershipFunc());
            this.register(new index_11.PrivilegeFunc());
            this.register(new index_12.RoleFunc());
            this.register(new index_13.UserFunc());
            this.register(new index_1.ApplicationFunctionChooseServiceMapping());
            this.register(new index_1.ApplicationFunctionLinkServiceMapping());
            this.register(new index_2.ApplicationModuleChooseServiceMapping());
            this.register(new index_2.ApplicationModuleLinkServiceMapping());
            this.register(new index_3.ApplicationPlatformChooseServiceMapping());
            this.register(new index_3.ApplicationPlatformLinkServiceMapping());
            this.register(new index_4.ApprovalRequestChooseServiceMapping());
            this.register(new index_4.ApprovalRequestLinkServiceMapping());
            this.register(new index_5.ApprovalTemplateChooseServiceMapping());
            this.register(new index_5.ApprovalTemplateLinkServiceMapping());
            this.register(new index_6.BOCriteriaChooseServiceMapping());
            this.register(new index_6.BOCriteriaLinkServiceMapping());
            this.register(new index_7.BOFilteringChooseServiceMapping());
            this.register(new index_7.BOFilteringLinkServiceMapping());
            this.register(new index_8.OrganizationChooseServiceMapping());
            this.register(new index_8.OrganizationLinkServiceMapping());
            this.register(new index_9.OrganizationalStructureChooseServiceMapping());
            this.register(new index_9.OrganizationalStructureLinkServiceMapping());
            this.register(new index_10.OwnershipChooseServiceMapping());
            this.register(new index_10.OwnershipLinkServiceMapping());
            this.register(new index_11.PrivilegeChooseServiceMapping());
            this.register(new index_11.PrivilegeLinkServiceMapping());
            this.register(new index_12.RoleChooseServiceMapping());
            this.register(new index_12.RoleLinkServiceMapping());
            this.register(new index_13.UserChooseServiceMapping());
            this.register(new index_13.UserLinkServiceMapping());
        }
        run() {
            let rootUrl = ibas.url.rootUrl(Console.ROOT_FILE_NAME);
            ibas.i18n.load(ibas.strings.format("{0}/resources/languages/initialfantasy.{1}.json", rootUrl, ibas.i18n.language));
            ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/applicationfunction.{1}.json", rootUrl, ibas.i18n.language));
            ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/applicationmodule.{1}.json", rootUrl, ibas.i18n.language));
            ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/applicationplatform.{1}.json", rootUrl, ibas.i18n.language));
            ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/approvalrequest.{1}.json", rootUrl, ibas.i18n.language));
            ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/approvaltemplate.{1}.json", rootUrl, ibas.i18n.language));
            ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/bocriteria.{1}.json", rootUrl, ibas.i18n.language));
            ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/bofiltering.{1}.json", rootUrl, ibas.i18n.language));
            ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/organization.{1}.json", rootUrl, ibas.i18n.language));
            ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/organizationalstructure.{1}.json", rootUrl, ibas.i18n.language));
            ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/ownership.{1}.json", rootUrl, ibas.i18n.language));
            ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/privilege.{1}.json", rootUrl, ibas.i18n.language));
            ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/role.{1}.json", rootUrl, ibas.i18n.language));
            ibas.i18n.load(ibas.strings.format("{0}/resources/languages/bo/user.{1}.json", rootUrl, ibas.i18n.language));
            this.description = ibas.i18n.prop(this.name.toLowerCase());
            this.icon = ibas.i18n.prop(this.name.toLowerCase() + "_icon");
            let uiModules = [];
            if (!ibas.config.get(ibas.ModuleConsole.CONFIG_ITEM_DISABLE_PLATFORM_VIEW, false)
                && this.plantform === ibas.emPlantform.PHONE) {
                uiModules.push("../bsui/m/Navigation");
            }
            else {
                uiModules.push("../bsui/c/Navigation");
            }
            let that = this;
            require(uiModules, function (ui) {
                that._navigation = new ui.default();
                that.initialize();
            });
            super.run();
        }
    }
    Console.CONSOLE_ID = "${ProjectId}";
    Console.CONSOLE_NAME = "InitialFantasy";
    Console.ROOT_FILE_NAME = "initialfantasy/index";
    exports.Console = Console;
});
