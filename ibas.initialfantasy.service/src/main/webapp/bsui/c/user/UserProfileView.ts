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
             * 视图-用户配置
             */
            export class UserProfileView extends ibas.ResidentView implements app.IUserProfileView {
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
                    if (!ibas.objects.isNull(this.form)) {
                        this.form.addPage(new sap.m.QuickViewPage("", {
                            header: this.application.description,
                            title: ibas.strings.format("# {0}", user.docEntry),
                            description: user.code,
                            icon: "sap-icon://business-card",
                            groups: [
                                new sap.m.QuickViewGroup("", {
                                    elements: [
                                        new sap.m.QuickViewGroupElement("", {
                                            target: "_self",
                                            label: ibas.i18n.prop("bo_user_name"),
                                            value: user.name,
                                            url: ibas.URL_HASH_SIGN_SERVICES + app.ChangeUserProfileApp.APPLICATION_ID
                                                + ibas.strings.format("/user/{0}", user.code),
                                            type: sap.m.QuickViewGroupElementType.link
                                        }),
                                        new sap.m.QuickViewGroupElement("", {
                                            target: "_self",
                                            label: ibas.i18n.prop("bo_user_mail"),
                                            value: user.mail,
                                            url: ibas.URL_HASH_SIGN_SERVICES + app.ChangeUserProfileApp.APPLICATION_ID
                                                + ibas.strings.format("/user/{0}", user.code),
                                            type: sap.m.QuickViewGroupElementType.link
                                        })
                                    ]
                                })
                            ]
                        }));
                    }
                }
            }
        }
    }
}