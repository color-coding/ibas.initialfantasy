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
                            new sap.m.FlexBox("", {
                                width: "100%",
                                justifyContent: sap.m.FlexJustifyContent.Start,
                                renderType: sap.m.FlexRendertype.Bare,
                                items: [
                                    // 封装控件，密码方式有异常
                                    new sap.m.Input("", {
                                        editable: false,
                                        autocomplete: false,
                                        type: sap.m.InputType.Password,
                                    }).bindProperty("value", {
                                        path: "/password",
                                        type: new sap.extension.data.Alphanumeric()
                                    }),
                                    new sap.m.Button("", {
                                        width: "auto",
                                        icon: "sap-icon://edit-outside",
                                        type: sap.m.ButtonType.Transparent,
                                        press: function (): void {
                                            let user: bo.User = this.getModel().getData();
                                            if (!ibas.objects.isNull(user)) {
                                                let popover: sap.m.Popover = new sap.m.Popover("", {
                                                    modal: true,
                                                    showHeader: false,
                                                    contentWidth: "12rem",
                                                    titleAlignment: sap.m.TitleAlignment.Start,
                                                    placement: sap.m.PlacementType.HorizontalPreferredLeft,
                                                    content: [
                                                        new sap.m.Input("", {
                                                            visible: false,
                                                            type: sap.m.InputType.Password,
                                                        }),
                                                        new sap.ui.layout.form.SimpleForm("", {
                                                            content: [
                                                                new sap.m.Input("", {
                                                                    autocomplete: false,
                                                                    type: sap.m.InputType.Password,
                                                                    placeholder: ibas.i18n.prop("bo_user_password")
                                                                }),
                                                                new sap.m.Input("", {
                                                                    autocomplete: false,
                                                                    type: sap.m.InputType.Password,
                                                                    placeholder: ibas.i18n.prop("bo_user_password")
                                                                })
                                                            ]
                                                        })
                                                    ],
                                                    footer: [
                                                        new sap.m.Toolbar("", {
                                                            content: [
                                                                new sap.m.Button("", {
                                                                    width: "100%",
                                                                    text: ibas.i18n.prop("shell_confirm"),
                                                                    press(): void {
                                                                        let form: any = popover.getContent()[1];
                                                                        if (form instanceof sap.ui.layout.form.SimpleForm) {
                                                                            let password: string = null;
                                                                            for (let item of form.getContent()) {
                                                                                if (!(item instanceof sap.m.Input)) {
                                                                                    continue;
                                                                                }
                                                                                if (item.getVisible() === false) {
                                                                                    continue;
                                                                                }
                                                                                if (password === null) {
                                                                                    password = item.getValue();
                                                                                } else {
                                                                                    if (password !== item.getValue()) {
                                                                                        that.application.viewShower.messages({
                                                                                            title: that.title,
                                                                                            type: ibas.emMessageType.ERROR,
                                                                                            message: ibas.i18n.prop("initialfantasy_inconsistent_user_password")
                                                                                        });
                                                                                    } else {
                                                                                        user.password = password;
                                                                                        popover.close();
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }),
                                                                new sap.m.Button("", {
                                                                    width: "100%",
                                                                    text: ibas.i18n.prop("shell_exit"),
                                                                    press(): void {
                                                                        popover.close();
                                                                    }
                                                                }),
                                                            ]
                                                        })
                                                    ],
                                                });
                                                popover.openBy(this, false);
                                            }
                                        }
                                    }).addStyleClass("sapUiTinyMarginBegin"),
                                ]
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_user_mail") }),
                            new sap.extension.m.Input("", {
                                autocomplete: false,
                            }).bindProperty("bindingValue", {
                                path: "/mail",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_user_phone") }),
                            new sap.extension.m.Input("", {
                                autocomplete: false,
                            }).bindProperty("bindingValue", {
                                path: "/phone",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                        ]
                    });
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretch: ibas.config.get(ibas.CONFIG_ITEM_PLANTFORM) === ibas.emPlantform.PHONE ? true : false,
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
                    }).addStyleClass("sapUiNoContentPadding");
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