/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace ui {
        export namespace m {
            /**
             * 视图-用户配置
             */
            export class UserProfileView extends ibas.ResidentView implements app.IUserProfileView {
                /** 编辑用户 */
                editUserEvent: Function;
                /** 绘制工具条视图 */
                drawBar(): any {
                    let that: this = this;
                    return new sap.m.Button("", {
                        tooltip: this.title,
                        icon: "sap-icon://my-view",
                        type: sap.m.ButtonType.Transparent,
                        press: function (): void {
                            that.fireViewEvents(that.showFullViewEvent);
                        }
                    });
                }
                /** 激活完整视图事件 */
                showFullViewEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return this.form = new sap.m.ResponsivePopover("", {
                        contentWidth: "auto",
                        placement: sap.m.PlacementType.Bottom,
                        customHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.ToolbarSpacer(),
                                new sap.m.Title("", {
                                    text: this.application.description,
                                }),
                                new sap.m.ToolbarSpacer(),
                                new sap.m.Button("", {
                                    icon: "sap-icon://user-edit",
                                    press(event: sap.ui.base.Event): void {
                                        that.fireViewEvents(that.editUserEvent);
                                        that.fireViewEvents(that.closeEvent);
                                    }
                                })
                            ]
                        }),
                        content: [
                            new sap.m.VBox("", {
                                width: "100%",
                                alignContent: sap.m.FlexAlignContent.Center,
                                alignItems: sap.m.FlexAlignItems.Start,
                                items: [
                                    new sap.m.HBox("", {
                                        width: "100%",
                                        alignContent: sap.m.FlexAlignContent.Stretch,
                                        alignItems: sap.m.FlexAlignItems.Start,
                                        items: [
                                            new sap.m.Avatar("", {
                                                displayShape: sap.m.AvatarShape.Square,
                                                src: {
                                                    path: "/image",
                                                    formatter(image: string): string {
                                                        return image ? image : "sap-icon://business-card";
                                                    }
                                                },
                                            }).addStyleClass("sapUiTinyMargin"),
                                            new sap.m.VBox("", {
                                                alignContent: sap.m.FlexAlignContent.Center,
                                                alignItems: sap.m.FlexAlignItems.Start,
                                                items: [
                                                    new sap.m.Title("", {
                                                        level: sap.ui.core.TitleLevel.H2,
                                                        text: {
                                                            path: "/docEntry",
                                                            formatter(docEntry: string): string {
                                                                return ibas.strings.format("# {0}", docEntry);
                                                            }
                                                        }
                                                    }),
                                                    new sap.m.Title("", {
                                                        level: sap.ui.core.TitleLevel.H3,
                                                        text: {
                                                            path: "/code",
                                                        }
                                                    }),
                                                ]
                                            }).addStyleClass("sapUiTinyMargin")
                                        ]
                                    }).addStyleClass("sapUiForceWidthAuto sapUiTinyMargin"),
                                    new sap.ui.layout.form.SimpleForm("", {
                                        width: "100%",
                                        editable: false,
                                        content: [
                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_user_name") }),
                                            new sap.extension.m.Link("", {
                                                press(event: sap.ui.base.Event): void {
                                                    that.fireViewEvents(that.editUserEvent);
                                                    that.fireViewEvents(that.closeEvent);
                                                }
                                            }).bindProperty("bindingValue", {
                                                path: "/name",
                                                type: new sap.extension.data.Alphanumeric()
                                            }),
                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_user_mail") }),
                                            new sap.extension.m.Text("", {
                                            }).bindProperty("bindingValue", {
                                                path: "/mail",
                                                type: new sap.extension.data.Alphanumeric()
                                            }),
                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_user_phone") }),
                                            new sap.extension.m.Text("", {
                                                visible: {
                                                    path: "/phone",
                                                    formatter(data: any): boolean {
                                                        return data ? true : false;
                                                    }
                                                }
                                            }).bindProperty("bindingValue", {
                                                path: "/phone",
                                                type: new sap.extension.data.Alphanumeric()
                                            }),
                                            new sap.m.Label("", { text: ibas.i18n.prop("bo_user_belongs") }),
                                            new sap.extension.m.OrganizationText("", {
                                                visible: {
                                                    path: "/organization",
                                                    formatter(data: any): boolean {
                                                        return data ? true : false;
                                                    }
                                                },
                                            }).bindProperty("bindingValue", {
                                                path: "/organization",
                                                type: new sap.extension.data.Alphanumeric()
                                            }),
                                        ]
                                    }).addStyleClass("sapUiNoContentPadding")
                                ]
                            })
                        ],
                    }).addStyleClass("sapUiNoContentPadding");
                }
                private form: sap.m.ResponsivePopover;
                /** 显示用户信息 */
                showUser(user: bo.User): void {
                    if (!ibas.objects.isNull(this.form)) {
                        this.form.setModel(new sap.extension.model.JSONModel(user));
                    }
                }
            }
        }
    }
}