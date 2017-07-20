/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { utils } from "openui5/typings/ibas.utils";
import { IChangeUserProfileView } from "../../../bsapp/user/index";
import * as bo from "../../../borep/bo/index";

/**
 * 视图-更改用户配置
 */
export class ChangeUserProfileView extends ibas.BODialogView implements IChangeUserProfileView {
    /** 保存用户事件 */
    saveUserEvent: Function;
    /** 绘制工具条 */
    darwBars(): any {
        let that: this = this;
        return [
            new sap.m.Button("", {
                text: ibas.i18n.prop("sys_shell_data_save"),
                type: sap.m.ButtonType.Transparent,
                // icon: "sap-icon://create",
                press: function (): void {
                    that.fireViewEvents(that.saveUserEvent);
                }
            }),
            new sap.m.Button("", {
                text: ibas.i18n.prop("sys_shell_exit"),
                type: sap.m.ButtonType.Transparent,
                // icon: "sap-icon://inspect-down",
                press: function (): void {
                    that.fireViewEvents(that.closeEvent);
                }
            }),
        ];
    }
    /** 绘制视图 */
    darw(): any {
        this.form = new sap.m.QuickView("", {
            placement: sap.m.PlacementType.Bottom,
            pages: [
            ]
        });
        return this.form;
    }
    private form: sap.m.QuickView;
    /** 显示用户信息 */
    showUser(user: bo.User): void {
    }
}