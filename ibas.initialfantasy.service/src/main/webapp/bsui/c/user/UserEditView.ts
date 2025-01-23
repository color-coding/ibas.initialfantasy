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
             * 视图-User
             */
            export class UserEditView extends ibas.BOEditView implements app.IUserEditView {
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 新建数据事件，参数1：是否克隆 */
                createDataEvent: Function;
                /** 选择组织 */
                chooseOrganizationEvent: Function;
                /** 编辑用户身份 */
                editUserIdentityEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    let formTop: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.m.Toolbar("", { visible: false }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_user_code") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "code",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 8
                                })
                            }).bindProperty("editable", {
                                path: "series",
                                formatter(data: any): any {
                                    return data > 0 ? false : true;
                                }
                            }),
                            new sap.extension.m.SeriesSelect("", {
                                objectCode: bo.BO_CODE_USER,
                            }).bindProperty("bindingValue", {
                                path: "series",
                                type: new sap.extension.data.Numeric()
                            }).bindProperty("editable", {
                                path: "isNew",
                                formatter(data: any): any {
                                    return data === false ? false : true;
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_user_name") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "name",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 100
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_user_category") }),
                            new sap.extension.m.PropertySelect("", {
                                dataInfo: {
                                    code: bo.User.BUSINESS_OBJECT_CODE,
                                },
                                propertyName: "category",
                            }).bindProperty("bindingValue", {
                                path: "category",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 30
                                }),
                            }),
                            new sap.m.Toolbar("", { visible: false }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_user_activated") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "activated",
                                type: new sap.extension.data.YesNo()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_user_validdate") }),
                            new sap.extension.m.DatePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "validDate",
                                type: new sap.extension.data.Date(),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_user_invaliddate") }),
                            new sap.extension.m.DatePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "invalidDate",
                                type: new sap.extension.data.Date(),
                            }),
                        ],
                    });
                    let formMiddle: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.m.IconTabBar("", {
                                headerBackgroundDesign: sap.m.BackgroundDesign.Transparent,
                                backgroundDesign: sap.m.BackgroundDesign.Transparent,
                                expandable: false,
                                items: [
                                    new sap.m.IconTabFilter("", {
                                        text: ibas.i18n.prop("initialfantasy_title_general"),
                                        content: [
                                            new sap.ui.layout.form.SimpleForm("", {
                                                editable: true,
                                                content: [
                                                    new sap.m.Toolbar("", { visible: false }),
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
                                                                path: "password",
                                                                type: new sap.extension.data.Alphanumeric()
                                                            }),
                                                            new sap.m.Button("", {
                                                                width: "auto",
                                                                icon: "sap-icon://edit-outside",
                                                                type: sap.m.ButtonType.Transparent,
                                                                press: function (): void {
                                                                    let user: bo.User = this.getBindingContext().getObject();
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
                                                        path: "mail",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 100
                                                        })
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_user_phone") }),
                                                    new sap.extension.m.Input("", {
                                                        autocomplete: false,
                                                    }).bindProperty("bindingValue", {
                                                        path: "phone",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 20
                                                        })
                                                    }),
                                                    new sap.m.Toolbar("", { visible: false }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_user_lastpwdsetdate") }),
                                                    new sap.extension.m.DatePicker("", {
                                                        enabled: false,
                                                    }).bindProperty("bindingValue", {
                                                        path: "lastPwdSetDate",
                                                        type: new sap.extension.data.Date(),
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_user_docentry") }),
                                                    new sap.extension.m.Input("", {
                                                        enabled: false,
                                                        type: sap.m.InputType.Number
                                                    }).bindProperty("bindingValue", {
                                                        path: "docEntry",
                                                        type: new sap.extension.data.Numeric()
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_user_super") }),
                                                    new sap.extension.m.EnumSelect("", {
                                                        enumType: ibas.emYesNo
                                                    }).bindProperty("bindingValue", {
                                                        path: "super",
                                                        type: new sap.extension.data.YesNo()
                                                    }),
                                                ]
                                            })
                                        ]
                                    }),
                                ]
                            }),
                        ]
                    });
                    let formBottom: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.m.Toolbar("", { visible: false }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_user_belongs") }),
                            new sap.extension.m.RepositoryInput("", {
                                showValueHelp: true,
                                repository: bo.BORepositoryInitialFantasy,
                                dataInfo: {
                                    type: bo.Organization,
                                    key: bo.Organization.PROPERTY_CODE_NAME,
                                    text: bo.Organization.PROPERTY_NAME_NAME
                                },
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseOrganizationEvent);
                                }
                            }).bindProperty("bindingValue", {
                                path: "organization",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_user_remarks") }),
                            new sap.extension.m.TextArea("", {
                                rows: 3,
                            }).bindProperty("bindingValue", {
                                path: "remarks",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Toolbar("", { visible: false }),
                        ]
                    });
                    return this.page = new sap.extension.m.DataPage("", {
                        showHeader: false,
                        dataInfo: {
                            code: bo.User.BUSINESS_OBJECT_CODE,
                        },
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_save"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://save",
                                    press: function (): void {
                                        that.fireViewEvents(that.saveDataEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_delete"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://delete",
                                    press: function (): void {
                                        that.fireViewEvents(that.deleteDataEvent);
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.MenuButton("", {
                                    text: ibas.strings.format("{0}/{1}",
                                        ibas.i18n.prop("shell_data_new"), ibas.i18n.prop("shell_data_clone")),
                                    icon: "sap-icon://create",
                                    type: sap.m.ButtonType.Transparent,
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_new"),
                                                icon: "sap-icon://create",
                                                press: function (): void {
                                                    // 创建新的对象
                                                    that.fireViewEvents(that.createDataEvent, false);
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_clone"),
                                                icon: "sap-icon://copy",
                                                press: function (): void {
                                                    // 复制当前对象
                                                    that.fireViewEvents(that.createDataEvent, true);
                                                }
                                            }),
                                        ],
                                    })
                                }),
                                new sap.m.ToolbarSeparator(),
                                new sap.extension.m.MenuButton("", {
                                    autoHide: true,
                                    text: ibas.i18n.prop("shell_quick_to"),
                                    icon: "sap-icon://generate-shortcut",
                                    type: sap.m.ButtonType.Transparent,
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("initialfantasy_app_user_identity"),
                                                icon: "sap-icon://account",
                                                press: function (): void {
                                                    that.fireViewEvents(that.editUserIdentityEvent);
                                                },
                                                visible: shell.app.privileges.canRun({
                                                    id: app.UserIdentityFunc.FUNCTION_ID,
                                                    name: app.UserIdentityFunc.FUNCTION_NAME,
                                                })
                                            }),
                                        ],
                                    })
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://action",
                                    press: function (event: any): void {
                                        ibas.servicesManager.showServices({
                                            proxy: new ibas.BOServiceProxy({
                                                data: that.page.getModel().getData(),
                                                converter: new bo.DataConverter(),
                                            }),
                                            displayServices(services: ibas.IServiceAgent[]): void {
                                                if (ibas.objects.isNull(services) || services.length === 0) {
                                                    return;
                                                }
                                                let actionSheet: sap.m.ActionSheet = new sap.m.ActionSheet("", {
                                                    placement: sap.m.PlacementType.Bottom,
                                                    buttons: {
                                                        path: "/",
                                                        template: new sap.m.Button("", {
                                                            type: sap.m.ButtonType.Transparent,
                                                            text: {
                                                                path: "name",
                                                                type: new sap.extension.data.Alphanumeric(),
                                                                formatter(data: string): string {
                                                                    return data ? ibas.i18n.prop(data) : "";
                                                                }
                                                            },
                                                            icon: {
                                                                path: "icon",
                                                                type: new sap.extension.data.Alphanumeric(),
                                                                formatter(data: string): string {
                                                                    return data ? data : "sap-icon://e-care";
                                                                }
                                                            },
                                                            press(this: sap.m.Button): void {
                                                                let service: ibas.IServiceAgent = this.getBindingContext().getObject();
                                                                if (service) {
                                                                    service.run();
                                                                }
                                                            }
                                                        })
                                                    }
                                                });
                                                actionSheet.setModel(new sap.extension.model.JSONModel(services));
                                                actionSheet.openBy(event.getSource());
                                            }
                                        });
                                    }
                                })
                            ]
                        }),
                        content: [
                            formTop,
                            formMiddle,
                            formBottom,
                        ]
                    });
                }
                private page: sap.extension.m.Page;
                /** 显示数据 */
                showUser(data: bo.User): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                    // 改变页面状态
                    sap.extension.pages.changeStatus(this.page);
                }
            }
        }
    }
}