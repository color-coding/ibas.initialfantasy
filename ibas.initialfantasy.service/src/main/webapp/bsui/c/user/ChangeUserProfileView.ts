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
        let that: this = this;
        this.form = new sap.ui.layout.form.SimpleForm("", {
            content: [
                new sap.m.Label("", { text: ibas.i18n.prop("bo_user_code") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text,
                    editable: false,
                }).bindProperty("value", {
                    path: "/code"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_user_name") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text
                }).bindProperty("value", {
                    path: "/name"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_user_password") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Password
                }).bindProperty("value", {
                    path: "/password"
                }),
                new sap.m.Label("", { text: ibas.i18n.prop("bo_user_mail") }),
                new sap.m.Input("", {
                    type: sap.m.InputType.Text
                }).bindProperty("value", {
                    path: "/mail"
                }),
            ]
        });
        return this.form;
    }
    private form: sap.ui.layout.form.SimpleForm;
    /** 显示用户信息 */
    showUser(user: bo.User): void {
        this.form.setModel(new sap.ui.model.json.JSONModel(user));
        // 监听属性改变，并更新控件
        utils.refreshModelChanged(this.form, user);
    }
}