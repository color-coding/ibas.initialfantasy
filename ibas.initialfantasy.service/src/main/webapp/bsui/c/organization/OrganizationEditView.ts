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
             * 视图-Organization
             */
            export class OrganizationEditView extends ibas.BOEditView implements app.IOrganizationEditView {
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 新建数据事件，参数1：是否克隆 */
                createDataEvent: Function;
                /** 选择父项资源事件 */
                chooseParentEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    let formTop: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.m.Toolbar("", { visible: false }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_organization_code") }),
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
                                objectCode: bo.BO_CODE_ORGANIZATION,
                            }).bindProperty("bindingValue", {
                                path: "series",
                                type: new sap.extension.data.Numeric()
                            }).bindProperty("editable", {
                                path: "isNew",
                                formatter(data: any): any {
                                    return data === false ? false : true;
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_organization_name") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "name",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 100
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_organization_category") }),
                            new sap.extension.m.PropertySelect("", {
                                dataInfo: {
                                    code: bo.Organization.BUSINESS_OBJECT_CODE,
                                },
                                propertyName: "category",
                            }).bindProperty("bindingValue", {
                                path: "category",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 30
                                }),
                            }),
                            new sap.m.Toolbar("", { visible: false }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_organization_activated") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "activated",
                                type: new sap.extension.data.YesNo()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_organization_validdate") }),
                            new sap.extension.m.DatePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "validDate",
                                type: new sap.extension.data.Date(),
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_organization_invaliddate") }),
                            new sap.extension.m.DatePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "invalidDate",
                                type: new sap.extension.data.Date(),
                            }),
                        ]
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
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_organization_dataowner") }),
                                                    new sap.extension.m.DataOwnerInput("", {
                                                        showValueHelp: true,
                                                    }).bindProperty("bindingValue", {
                                                        path: "dataOwner",
                                                        type: new sap.extension.data.Numeric()
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_organization_remarks") }),
                                                    new sap.extension.m.TextArea("", {
                                                        rows: 3,
                                                    }).bindProperty("bindingValue", {
                                                        path: "remarks",
                                                        type: new sap.extension.data.Alphanumeric()
                                                    }),
                                                    new sap.m.Toolbar("", { visible: false }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_organization_grouped") }),
                                                    new sap.extension.m.EnumSelect("", {
                                                        enumType: ibas.emYesNo
                                                    }).bindProperty("bindingValue", {
                                                        path: "grouped",
                                                        type: new sap.extension.data.YesNo(),
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_organization_parent") }),
                                                    new sap.extension.m.RepositoryInput("", {
                                                        showValueHelp: true,
                                                        repository: bo.BORepositoryInitialFantasy,
                                                        dataInfo: {
                                                            type: bo.Organization,
                                                            key: bo.Organization.PROPERTY_CODE_NAME,
                                                            text: bo.Organization.PROPERTY_NAME_NAME
                                                        },
                                                        editable: {
                                                            path: "grouped",
                                                            type: new sap.extension.data.YesNo(),
                                                            formatter(data: any): boolean {
                                                                return !data;
                                                            }
                                                        },
                                                        valueHelpRequest: function (): void {
                                                            that.fireViewEvents(that.chooseParentEvent);
                                                        }
                                                    }).bindProperty("bindingValue", {
                                                        path: "parent",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 30
                                                        }),
                                                    }),
                                                ]
                                            })
                                        ]
                                    }),
                                ]
                            }),
                        ]
                    });
                    return this.page = new sap.extension.m.DataPage("", {
                        showHeader: false,
                        dataInfo: {
                            code: bo.Organization.BUSINESS_OBJECT_CODE,
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
                            ]
                        }),
                        content: [
                            formTop,
                            formMiddle,
                        ]
                    });
                }
                private page: sap.extension.m.Page;
                /** 显示数据 */
                showOrganization(data: bo.Organization): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                    // 改变页面状态
                    sap.extension.pages.changeStatus(this.page);
                }
            }
        }
    }
}