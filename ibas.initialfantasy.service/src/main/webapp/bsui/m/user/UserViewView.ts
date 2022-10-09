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
            /** 查看视图-用户 */
            export class UserViewView extends ibas.BOViewView implements app.IUserViewView {
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return this.page = new sap.extension.uxap.DataObjectPageLayout("", {
                        dataInfo: {
                            code: bo.User.BUSINESS_OBJECT_CODE,
                        },
                        headerTitle: new sap.uxap.ObjectPageHeader("", {
                            objectTitle: {
                                path: "name",
                                type: new sap.extension.data.Alphanumeric(),
                            },
                            objectSubtitle: {
                                path: "code",
                                type: new sap.extension.data.Alphanumeric(),
                            },
                            actions: [
                                new sap.extension.m.ObjectYesNoStatus("", {
                                    title: ibas.i18n.prop("bo_user_activated"),
                                    enumValue: {
                                        path: "activated",
                                        type: new sap.extension.data.YesNo(),
                                    }
                                }),
                                new sap.extension.m.ObjectYesNoStatus("", {
                                    title: ibas.i18n.prop("bo_user_super"),
                                    enumValue: {
                                        path: "super",
                                        type: new sap.extension.data.YesNo(),
                                    }
                                }),
                            ]
                        }),
                        headerContent: [
                        ],
                        sections: [
                            new sap.uxap.ObjectPageSection("", {
                                showTitle: false,
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_user_phone"),
                                                bindingValue: {
                                                    path: "phone",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            }),
                                        ],
                                    }),
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_user_mail"),
                                                bindingValue: {
                                                    path: "mail",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            }),
                                        ],
                                    }),
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            new sap.extension.m.RepositoryObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_user_organization"),
                                                repository: bo.BORepositoryInitialFantasy,
                                                dataInfo: {
                                                    type: bo.Organization,
                                                    key: bo.Organization.PROPERTY_CODE_NAME,
                                                    text: bo.Organization.PROPERTY_NAME_NAME
                                                },
                                                bindingValue: {
                                                    path: "organization",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            }),
                                        ],
                                    }),
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_user_remarks"),
                                                bindingValue: {
                                                    path: "remarks",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                }
                                            }),
                                        ],
                                    })
                                ]
                            }),
                        ]
                    });
                }

                private page: sap.extension.uxap.ObjectPageLayout;

                /** 显示数据 */
                showUser(data: bo.User): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                    // 改变页面状态
                    sap.extension.pages.changeStatus(this.page);
                }
                protected onClosed(): void {
                    super.onClosed();
                }
            }
        }
    }
}
