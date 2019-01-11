﻿/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace ui {
        export namespace c {
            /**
             * 视图-更改用户配置
             */
            export class ChangeUserProfileView extends ibas.DialogView implements app.IChangeUserProfileView {
                /** 保存用户事件 */
                saveUserEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.form = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
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
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_user_phone") }),
                            new sap.m.Input("", {
                                type: sap.m.InputType.Text
                            }).bindProperty("value", {
                                path: "/phone"
                            }),
                        ]
                    });
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretchOnPhone: true,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        content: [this.form],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_save"),
                                type: sap.m.ButtonType.Transparent,
                                // icon: "sap-icon://create",
                                press: function (): void {
                                    that.fireViewEvents(that.saveUserEvent);
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                // icon: "sap-icon://inspect-down",
                                press: function (): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ]
                    });
                }
                private form: sap.ui.layout.form.SimpleForm;
                /** 显示用户信息 */
                showUser(user: bo.User): void {
                    this.form.setModel(new sap.ui.model.json.JSONModel(user));
                    // 监听属性改变，并更新控件
                    openui5.utils.refreshModelChanged(this.form, user);
                }
            }
        }
    }
}