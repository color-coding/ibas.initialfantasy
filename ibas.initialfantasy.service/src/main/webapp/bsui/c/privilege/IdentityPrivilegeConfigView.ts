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
             * 视图-系统身份权限配置
             */
            export class IdentityPrivilegeConfigView extends ibas.BOQueryViewWithPanel implements app.IIdentityPrivilegeConfigView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.Identity;
                }
                get fetchDataEvent(): Function {
                    return this.fetchIdentitiesEvent;
                }
                set fetchDataEvent(value: Function) {
                    this.fetchIdentitiesEvent = value;
                }
                /** 查询身份 */
                fetchIdentitiesEvent: Function;
                /** 查询身份权限  */
                fetchIdentityPrivilegesEvent: Function;
                /** 保存身份权限 */
                saveIdentityPrivilegesEvent: Function;
                /** 复制身份权限  */
                copyIdentityPrivilegesEvent: Function;
                /** 删除身份权限 */
                deleteIdentityPrivilegesEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.tableIdentities = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.SINGLE,
                        growingThreshold: sap.extension.table.visibleRowCount(15),
                        mode: sap.m.ListMode.SingleSelectMaster,
                        items: {
                            path: "/rows",
                            template: new sap.m.ObjectListItem("", {
                                title: "{name}",
                                firstStatus: new sap.m.ObjectStatus("", {
                                    text: {
                                        path: "activated",
                                        formatter(value: any): any {
                                            if (value === ibas.emYesNo.YES) {
                                                return ibas.i18n.prop("shell_available");
                                            }
                                            return ibas.i18n.prop("shell_unavailable");
                                        }
                                    },
                                    state: {
                                        path: "activated",
                                        formatter(data: any): any {
                                            return data === ibas.emYesNo.YES ? sap.ui.core.ValueState.Success : sap.ui.core.ValueState.Warning;
                                        }
                                    },
                                }),
                                attributes: [
                                    new sap.m.ObjectAttribute("", {
                                        text: "{code}"
                                    }),
                                ]
                            })
                        },
                        selectionChange(): void {
                            that.fireFetchIdentityPrivilegesEvent();
                        },
                        nextDataSet(event: sap.ui.base.Event): void {
                            // 查询下一个数据集
                            let data: any = event.getParameter("data");
                            if (ibas.objects.isNull(data)) {
                                return;
                            }
                            if (ibas.objects.isNull(that.lastCriteria)) {
                                return;
                            }
                            let criteria: ibas.ICriteria = that.lastCriteria.next(data);
                            if (ibas.objects.isNull(criteria)) {
                                return;
                            }
                            ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                            that.fireViewEvents(that.fetchDataEvent, criteria);
                        },
                    });
                    this.pageIdentities = new sap.m.Page("", {
                        showHeader: false,
                        content: [
                            this.tableIdentities
                        ]
                    });
                    this.tableIdentityPrivileges = new sap.extension.table.Table("", {
                        enableSelectAll: true,
                        visibleRowCount: sap.extension.table.visibleRowCount(12),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        rows: "{/rows}",
                        rowSettingsTemplate: new sap.ui.table.RowSettings("", {
                        }).bindProperty("highlight", {
                            path: "isDirty",
                            formatter(value: boolean): string {
                                if (!!value) {
                                    return sap.ui.core.MessageType.Warning;
                                } else {
                                    return sap.ui.core.MessageType.Information;
                                }
                            }
                        }),
                        columns: [
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_privilege_moduleid"),
                                template: new sap.extension.m.Text("", {
                                    tooltip: {
                                        path: "moduleId"
                                    }
                                }).bindProperty("bindingValue", {
                                    path: "moduleId",
                                    formatter(data: any): any {
                                        return ibas.i18n.prop(data);
                                    }
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_privilege_target"),
                                width: "16rem",
                                template: new sap.extension.m.Text("", {
                                    tooltip: {
                                        path: "target"
                                    }
                                }).bindProperty("bindingValue", {
                                    path: "target",
                                    formatter(data: any): any {
                                        if (ibas.strings.isEmpty(data)) {
                                            return data;
                                        }
                                        return ibas.i18n.prop(data);
                                    }
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_applicationelement_elementtype"),
                                width: "8rem",
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "type",
                                    type: new sap.extension.data.Enum({
                                        enumType: bo.emElementType,
                                        describe: true,
                                    }),
                                })
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_privilege_activated"),
                                width: "6rem",
                                template: new sap.extension.m.CheckBox("", {
                                }).bindProperty("bindingValue", {
                                    path: "activated",
                                    type: new sap.extension.data.YesNo()
                                })
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_privilege_authorisevalue"),
                                width: "8rem",
                                template: new sap.extension.m.EnumSelect("", {
                                    enumType: ibas.emAuthoriseType,
                                }).bindProperty("bindingValue", {
                                    path: "authoriseValue",
                                    type: new sap.extension.data.AuthoriseType()
                                })
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_privilege_automatic"),
                                width: "6rem",
                                template: new sap.extension.m.CheckBox("", {
                                }).bindProperty("bindingValue", {
                                    path: "automatic",
                                    type: new sap.extension.data.YesNo()
                                })
                            }),
                        ]
                    });
                    this.pageIdentityPrivileges = new sap.m.Page("", {
                        showHeader: true,
                        customHeader: new sap.m.Toolbar("", {
                            content: [
                                this.facetFilter = new sap.m.FacetFilter("", {
                                    type: sap.m.FacetFilterType.Simple,
                                    showReset: true,
                                    showPopoverOKButton: true,
                                    showPersonalization: false,
                                    visible: false,
                                    reset: function (oEvent: sap.ui.base.Event): void {
                                        let oFacetFilter: any = oEvent.getSource();
                                        if (oFacetFilter instanceof sap.m.FacetFilter) {
                                            for (let item of oFacetFilter.getLists()) {
                                                item.removeSelectedKeys();
                                            }
                                            that.filterPrivileges(null);
                                        }
                                    },
                                    confirm: function (oEvent: sap.ui.base.Event): void {
                                        let oFacetFilter: any = oEvent.getSource();
                                        if (oFacetFilter instanceof sap.m.FacetFilter && oFacetFilter.getLists() instanceof Array) {
                                            let mFacetFilterLists: Array<sap.m.FacetFilterList> = oFacetFilter.getLists().filter((oList) => {
                                                return oList.getSelectedItems().length;
                                            });
                                            if (mFacetFilterLists.length) {
                                                let oFilter: sap.ui.model.Filter = new sap.ui.model.Filter(mFacetFilterLists.map(function (oList: sap.m.FacetFilterList): any {
                                                    return new sap.ui.model.Filter(oList.getSelectedItems().map(function (oItem: sap.m.FacetFilterItem): any {
                                                        return new sap.ui.model.Filter(oList.getKey(), sap.ui.model.FilterOperator.EQ, oItem.getKey());
                                                    }), false);
                                                }), true);
                                                that.filterPrivileges(oFilter);
                                            } else {
                                                that.filterPrivileges(null);
                                            }
                                        } else {
                                            that.filterPrivileges(null);
                                        }
                                    },
                                }),
                                new sap.m.ToolbarSpacer(""),
                                this.titlePlatform = new sap.m.Title("", {
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("initialfantasy_copy_from"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://copy",
                                    press: function (): void {
                                        that.fireViewEvents(that.copyIdentityPrivilegesEvent);
                                    },
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.MenuButton("", {
                                    text: ibas.i18n.prop("shell_data_save"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://save",
                                    buttonMode: sap.m.MenuButtonMode.Split,
                                    useDefaultActionOnly: true,
                                    defaultAction(): void {
                                        that.fireViewEvents(that.saveIdentityPrivilegesEvent);
                                    },
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_delete"),
                                                icon: "sap-icon://delete",
                                                press: function (): void {
                                                    let identity: bo.IIdentity = that.tableIdentities.getSelecteds<bo.IIdentity>().firstOrDefault();
                                                    if (!ibas.objects.isNull(identity)) {
                                                        that.fireViewEvents(that.deleteIdentityPrivilegesEvent, identity);
                                                    }
                                                }
                                            }),
                                        ],
                                    })
                                }),
                            ]
                        }),
                        content: [
                            this.tableIdentityPrivileges
                        ],
                        floatingFooter: true,
                        footer: new sap.m.Toolbar("", {
                            content: [
                                this.check = new sap.m.CheckBox("", {
                                    text: ibas.i18n.prop("shell_reverse"),
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Text("", {
                                    text: ibas.i18n.prop("shell_batch"),
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.MenuButton("", {
                                    text: ibas.i18n.prop("bo_privilege_activated"),
                                    icon: "sap-icon://validate",
                                    type: sap.m.ButtonType.Transparent,
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.enums.describe(ibas.emYesNo, ibas.emYesNo.YES),
                                                icon: "sap-icon://accept",
                                                press: function (): void {
                                                    for (let item of that.check.getSelected() ?
                                                        that.tableIdentityPrivileges.getUnSelecteds<bo.IIdentityPrivilege>() :
                                                        that.tableIdentityPrivileges.getSelecteds<bo.IIdentityPrivilege>()) {
                                                        item.activated = ibas.emYesNo.YES;
                                                    }
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.enums.describe(ibas.emYesNo, ibas.emYesNo.NO),
                                                icon: "sap-icon://decline",
                                                press: function (): void {
                                                    for (let item of that.check.getSelected() ?
                                                        that.tableIdentityPrivileges.getUnSelecteds<bo.IIdentityPrivilege>() :
                                                        that.tableIdentityPrivileges.getSelecteds<bo.IIdentityPrivilege>()) {
                                                        item.activated = ibas.emYesNo.NO;
                                                    }
                                                }
                                            }),
                                        ],
                                    })
                                }),
                                new sap.m.MenuButton("", {
                                    text: ibas.i18n.prop("bo_privilege_authorisevalue"),
                                    icon: "sap-icon://bullet-text",
                                    type: sap.m.ButtonType.Transparent,
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.enums.describe(ibas.emAuthoriseType, ibas.emAuthoriseType.ALL),
                                                icon: "sap-icon://multiselect-all",
                                                press: function (): void {
                                                    for (let item of that.check.getSelected() ?
                                                        that.tableIdentityPrivileges.getUnSelecteds<bo.IIdentityPrivilege>() :
                                                        that.tableIdentityPrivileges.getSelecteds<bo.IIdentityPrivilege>()) {
                                                        item.authoriseValue = ibas.emAuthoriseType.ALL;
                                                    }
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.enums.describe(ibas.emAuthoriseType, ibas.emAuthoriseType.READ),
                                                icon: "sap-icon://multi-select",
                                                press: function (): void {
                                                    for (let item of that.check.getSelected() ?
                                                        that.tableIdentityPrivileges.getUnSelecteds<bo.IIdentityPrivilege>() :
                                                        that.tableIdentityPrivileges.getSelecteds<bo.IIdentityPrivilege>()) {
                                                        item.authoriseValue = ibas.emAuthoriseType.READ;
                                                    }
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.enums.describe(ibas.emAuthoriseType, ibas.emAuthoriseType.NONE),
                                                icon: "sap-icon://multiselect-none",
                                                press: function (): void {
                                                    for (let item of that.check.getSelected() ?
                                                        that.tableIdentityPrivileges.getUnSelecteds<bo.IIdentityPrivilege>() :
                                                        that.tableIdentityPrivileges.getSelecteds<bo.IIdentityPrivilege>()) {
                                                        item.authoriseValue = ibas.emAuthoriseType.NONE;
                                                    }
                                                }
                                            }),
                                        ],
                                    })
                                }),
                            ]
                        }),
                    });
                    return new sap.m.SplitContainer("", {
                        masterPages: [
                            this.pageIdentities,
                        ],
                        detailPages: [
                            this.pageIdentityPrivileges
                        ],
                    });
                }
                private facetFilter: sap.m.FacetFilter;
                private check: sap.m.CheckBox;
                private pageIdentities: sap.m.Page;
                private tableIdentities: sap.extension.m.List;
                private pageIdentityPrivileges: sap.m.Page;
                private tableIdentityPrivileges: sap.extension.table.Table;
                private titlePlatform: sap.m.Title;
                private fireFetchIdentityPrivilegesEvent(): void {
                    let identity: bo.IIdentity = this.tableIdentities.getSelecteds<bo.IIdentity>().firstOrDefault();
                    if (!ibas.objects.isNull(identity)) {
                        this.fireViewEvents(this.fetchIdentityPrivilegesEvent, identity);
                    }
                }
                /** 嵌入查询面板 */
                embedded(view: any): void {
                    if (view instanceof sap.m.Toolbar) {
                        view.setDesign(sap.m.ToolbarDesign.Transparent);
                        view.setStyle(sap.m.ToolbarStyle.Clear);
                        view.setHeight("100%");
                    }
                    this.pageIdentities.addHeaderContent(view);
                    this.pageIdentities.setShowHeader(true);
                }
                showPlatform(data: bo.IApplicationPlatform): void {
                    this.titlePlatform.setText(data.platformDescription);
                }
                showRole(data: bo.IIdentity): void {
                }
                showIdentities(datas: bo.IIdentity[]): void {
                    let model: sap.ui.model.Model = this.tableIdentities.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.tableIdentities.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.tableIdentities.setBusy(false);
                }
                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.tableIdentities.setBusy(true);
                        this.tableIdentities.setModel(null);
                    }
                }
                /** 显示数据 */
                showIdentityPrivileges(datas: app.IdentityPrivilege[]): void {
                    this.tableIdentityPrivileges.setFirstVisibleRow(0);
                    this.tableIdentityPrivileges.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    this.refreshPrivilegeFilter(datas);
                }
                private filterPrivileges(filter: sap.ui.model.Filter): void {
                    let dataBinding: any = this.tableIdentityPrivileges.getBinding("");
                    dataBinding.filter(filter);
                }
                private refreshPrivilegeFilter(datas: app.IdentityPrivilege[]): void {
                    this.facetFilter.removeAllLists();
                    if (datas.length === 0) {
                        this.facetFilter.setVisible(false);
                        return;
                    }
                    let moduleIdFacetFilterList: sap.m.FacetFilterList = new sap.m.FacetFilterList("", {
                        title: ibas.i18n.prop("bo_privilege_moduleid"),
                        key: "moduleId",
                    });
                    for (let item of datas.filter(c => { return ibas.strings.isEmpty(c.target); })) {
                        moduleIdFacetFilterList.addItem(new sap.m.FacetFilterItem("", {
                            text: ibas.i18n.prop(item.moduleId),
                            key: item.moduleId
                        }));
                    }
                    this.facetFilter.addList(moduleIdFacetFilterList);
                    let targetFacetFilterList: sap.m.FacetFilterList = new sap.m.FacetFilterList("", {
                        title: ibas.i18n.prop("bo_applicationelement_elementtype"),
                        key: "type",
                        items: [
                            new sap.m.FacetFilterItem("", {
                                text: ibas.enums.describe(bo.emElementType, bo.emElementType.FUNCTION),
                                key: bo.emElementType.FUNCTION
                            }),
                            new sap.m.FacetFilterItem("", {
                                text: ibas.enums.describe(bo.emElementType, bo.emElementType.APPLICATION),
                                key: bo.emElementType.APPLICATION
                            }),
                            new sap.m.FacetFilterItem("", {
                                text: ibas.enums.describe(bo.emElementType, bo.emElementType.MODULE),
                                key: bo.emElementType.MODULE
                            }),
                            new sap.m.FacetFilterItem("", {
                                text: ibas.enums.describe(bo.emElementType, bo.emElementType.SERVICE),
                                key: bo.emElementType.SERVICE
                            }),
                        ]
                    });
                    this.facetFilter.addList(targetFacetFilterList);
                    let authoriseTypeFacetFilterList: sap.m.FacetFilterList = new sap.m.FacetFilterList("", {
                        title: ibas.i18n.prop("bo_privilege_authorisevalue"),
                        key: "authoriseValue",
                        items: [
                            new sap.m.FacetFilterItem("", {
                                text: ibas.enums.describe(ibas.emAuthoriseType, ibas.emAuthoriseType.ALL),
                                key: ibas.emAuthoriseType.ALL
                            }),
                            new sap.m.FacetFilterItem("", {
                                text: ibas.enums.describe(ibas.emAuthoriseType, ibas.emAuthoriseType.NONE),
                                key: ibas.emAuthoriseType.NONE
                            }),
                            new sap.m.FacetFilterItem("", {
                                text: ibas.enums.describe(ibas.emAuthoriseType, ibas.emAuthoriseType.READ),
                                key: ibas.emAuthoriseType.READ
                            }),
                        ]
                    });
                    this.facetFilter.addList(authoriseTypeFacetFilterList);
                    this.facetFilter.setVisible(true);
                }
            }
        }
    }
}