/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { utils } from "openui5/typings/ibas.utils";
import * as bo from "../../../borep/bo/index";
import { IOrganizationalStructureWizardView } from "../../../bsapp/organizationalstructure/index";

/**
 * 视图-OrganizationalStructure
 */
export class OrganizationalStructureWizardView extends ibas.View implements IOrganizationalStructureWizardView {

    /** 绘制视图 */
    darw(): any {
        let that: this = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            content: [
                new sap.m.Wizard("", {
                    steps: [
                        new sap.m.WizardStep("", {
                            title: ibas.i18n.prop("initialfantasy_org_wizard_choose"),
                            icon: "sap-icon://begin",
                            content: [

                            ]
                        }),
                        new sap.m.WizardStep("", {
                            title: ibas.i18n.prop("initialfantasy_org_wizard_date"),
                            icon: "sap-icon://date-time",
                            content: [

                            ]
                        }),
                        new sap.m.WizardStep("", {
                            title: ibas.i18n.prop("initialfantasy_org_wizard_alter"),
                            icon: "sap-icon://edit",
                            content: [

                            ]
                        }),
                        new sap.m.WizardStep("", {
                            title: ibas.i18n.prop("initialfantasy_org_wizard_save"),
                            icon: "sap-icon://save",
                            content: [

                            ]
                        }),
                    ]
                })
            ]
        });
        this.page = new sap.m.Page("", {
            showHeader: false,
            subHeader: null,
            content: [this.form]
        });
        this.id = this.page.getId();
        return this.page;
    }
    private page: sap.m.Page;
    private form: sap.ui.layout.form.SimpleForm;

}
