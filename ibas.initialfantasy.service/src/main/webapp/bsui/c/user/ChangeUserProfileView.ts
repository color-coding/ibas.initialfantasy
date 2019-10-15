/**
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
                            new sap.extension.m.Input("", {
                                editable: false,
                            }).bindProperty("bindingValue", {
                                path: "/code",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_user_name") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "/name",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_user_password") }),
                            new sap.extension.m.Input("", {
                                type: sap.m.InputType.Password
                            }).bindProperty("bindingValue", {
                                path: "/password",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_user_mail") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "/mail",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_user_phone") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "/phone",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                        ]
                    });
                    return new sap.extension.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretchOnPhone: true,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        content: [
                            this.form
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_save"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.saveUserEvent);
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
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
                    this.form.setModel(new sap.extension.model.JSONModel(user));
                }
            }
        }
    }
}