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
            /** 查看视图-组织 */
            export class OrganizationViewView extends ibas.BOViewView implements app.IOrganizationViewView {

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.tableOrganizations = new sap.extension.m.DataTable("", {
                        autoPopinMode: true,
                        dataInfo: {
                            code: bo.Organization.BUSINESS_OBJECT_CODE,
                        },
                        columns: [
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_organization_code"),
                                width: "10rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_organization_name"),
                                width: "16rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_organization_category"),
                                width: "10rem",
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_organization_remarks"),
                            }),
                        ],
                        items: {
                            path: "/rows",
                            template: new sap.extension.m.ColumnListItem("", {
                                cells: [
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "code",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "name",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                    new sap.extension.m.PropertyObjectAttribute("", {
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
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "remarks",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                ],
                                type: sap.m.ListType.Detail,
                                detailIcon: "sap-icon://shortcut",
                                detailPress(this: sap.m.ColumnListItem): void {
                                    let data: any = this.getBindingContext().getObject();
                                    if (data instanceof bo.Organization) {
                                        ibas.servicesManager.runLinkService({
                                            boCode: bo.Organization.BUSINESS_OBJECT_CODE,
                                            linkValue: data.code,
                                        });
                                    }
                                },
                            }),
                        }
                    });
                    return this.page = new sap.extension.uxap.DataObjectPageLayout("", {
                        dataInfo: {
                            code: bo.Organization.BUSINESS_OBJECT_CODE,
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
                            navigationBar: new sap.m.Bar("", {
                                contentLeft: [
                                    new sap.m.Button("", {
                                        text: ibas.i18n.prop("shell_data_edit"),
                                        type: sap.m.ButtonType.Transparent,
                                        icon: "sap-icon://edit",
                                        visible: this.mode === ibas.emViewMode.VIEW ? false : true,
                                        press(): void {
                                            that.fireViewEvents(that.editDataEvent);
                                        }
                                    })
                                ],
                                contentRight: [
                                    new sap.m.Button("", {
                                        type: sap.m.ButtonType.Transparent,
                                        icon: "sap-icon://action",
                                        press(event: sap.ui.base.Event): void {
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
                            actions: [
                                new sap.extension.m.ObjectYesNoStatus("", {
                                    title: ibas.i18n.prop("bo_organization_activated"),
                                    enumValue: {
                                        path: "activated",
                                        type: new sap.extension.data.YesNo(),
                                    }
                                }),
                            ]
                        }),
                        headerContent: [
                            new sap.extension.m.PropertyObjectAttribute("", {
                                title: ibas.i18n.prop("bo_organization_category"),
                                bindingValue: {
                                    path: "category",
                                    type: new sap.extension.data.Alphanumeric(),
                                },
                                dataInfo: {
                                    code: bo.Organization.BUSINESS_OBJECT_CODE,
                                },
                                propertyName: "category",
                            }),
                            new sap.extension.m.ObjectAttribute("", {
                                title: ibas.i18n.prop("bo_organization_validdate"),
                                bindingValue: {
                                    path: "validDate",
                                    type: new sap.extension.data.Date(),
                                }
                            }),
                            new sap.extension.m.ObjectAttribute("", {
                                title: ibas.i18n.prop("bo_organization_invaliddate"),
                                bindingValue: {
                                    path: "invalidDate",
                                    type: new sap.extension.data.Date(),
                                }
                            }),
                        ],
                        sections: [
                            new sap.uxap.ObjectPageSection("", {
                                title: ibas.i18n.prop("initialfantasy_title_organization"),
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            this.tableOrganizations
                                        ],
                                    })
                                ],
                                visible: false,
                            }),
                            new sap.uxap.ObjectPageSection("", {
                                showTitle: false,
                                subSections: [
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            new sap.extension.m.RepositoryObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_organization_dataowner"),
                                                repository: bo.BORepositoryInitialFantasy,
                                                dataInfo: {
                                                    type: bo.User,
                                                    key: bo.User.PROPERTY_DOCENTRY_NAME,
                                                    text: bo.User.PROPERTY_NAME_NAME
                                                },
                                                bindingValue: {
                                                    path: "dataOwner",
                                                    type: new sap.extension.data.Numeric(),
                                                }
                                            }),
                                        ],
                                    }),
                                    new sap.uxap.ObjectPageSubSection("", {
                                        blocks: [
                                            new sap.extension.m.ObjectAttribute("", {
                                                title: ibas.i18n.prop("bo_organization_remarks"),
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
                private tableOrganizations: sap.extension.m.Table;

                /** 显示数据 */
                showOrganization(data: bo.Organization): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                }
                /** 显示数据-子项资源 */
                showChildOrganizations(datas: bo.Organization[]): void {
                    if (datas.length > 0) {
                        (<any>this.tableOrganizations.getParent().getParent()).setVisible(false);
                        (<any>this.tableOrganizations.getParent().getParent()).setVisible(true);
                    }
                    this.tableOrganizations.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
        }
    }
}
