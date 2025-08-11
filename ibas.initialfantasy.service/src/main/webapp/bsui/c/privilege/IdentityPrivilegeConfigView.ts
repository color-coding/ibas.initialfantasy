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
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "code",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
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
                    this.tableIdentityPrivileges = new sap.extension.table.Table("", {
                        enableSelectAll: true,
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto,
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
                                width: "40%",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_privilege_target"),
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
                                width: "60%",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_applicationelement_elementtype"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "type",
                                    type: new sap.extension.data.Enum({
                                        enumType: bo.emElementType,
                                        describe: true,
                                    }),
                                }),
                                width: "8rem"
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_privilege_activated"),
                                template: new sap.extension.m.CheckBox("", {
                                }).bindProperty("bindingValue", {
                                    path: "activated",
                                    type: new sap.extension.data.YesNo()
                                }),
                                width: "8rem"
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_privilege_authorisevalue"),
                                template: new sap.extension.m.EnumSelect("", {
                                    enumType: ibas.emAuthoriseType,
                                }).bindProperty("bindingValue", {
                                    path: "authoriseValue",
                                    type: new sap.extension.data.AuthoriseType()
                                }),
                                width: "8rem"
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_privilege_automatic"),
                                template: new sap.extension.m.CheckBox("", {
                                    select(event: sap.ui.base.Event): void {
                                        let source: any = event.getSource();
                                        if (source instanceof sap.m.CheckBox) {
                                            if (source.getSelected() === true) {
                                                // 如果选择，则其他选中的取消选中
                                                let select: any = source.getBindingContext().getObject();
                                                let datas: app.Privilege[] = that.tableIdentityPrivileges.getModel().getData<app.Privilege[]>("rows");
                                                if (datas instanceof Array) {
                                                    for (let item of datas) {
                                                        if (item === select) {
                                                            continue;
                                                        }
                                                        if (item.automatic === ibas.emYesNo.YES) {
                                                            item.automatic = ibas.emYesNo.NO;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    editable: {
                                        path: "type",
                                        formatter(data: bo.emElementType): boolean {
                                            return data === bo.emElementType.FUNCTION ? true : false;
                                        }
                                    }
                                }).bindProperty("bindingValue", {
                                    path: "automatic",
                                    type: new sap.extension.data.YesNo()
                                }),
                                width: "8rem"
                            }),
                        ]
                    });
                    return new sap.m.SplitContainer("", {
                        masterPages: [
                            this.pageIdentities = new sap.m.Page("", {
                                showHeader: false,
                                content: [
                                    this.tableIdentities
                                ]
                            })
                        ],
                        detailPages: [
                            new sap.m.Page("", {
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
                                                        if (item.isBound("items")) {
                                                            if (item.getKey() === "moduleId") {
                                                                (<any>item.getBinding("items")).filter(
                                                                    new sap.ui.model.Filter("moduleName", sap.ui.model.FilterOperator.Contains, ""),
                                                                    sap.ui.model.FilterType.Application);
                                                            } else if (item.getKey() === "type") {
                                                                (<any>item.getBinding("items")).filter(
                                                                    new sap.ui.model.Filter("type", sap.ui.model.FilterOperator.Contains, ""),
                                                                    sap.ui.model.FilterType.Application);
                                                            } else {
                                                                (<any>item.getBinding("items")).filter(
                                                                    new sap.ui.model.Filter("authoriseValue", sap.ui.model.FilterOperator.Contains, ""),
                                                                    sap.ui.model.FilterType.Application);
                                                            }
                                                        }
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
                                                that.fireViewEvents(that.copyIdentityPrivilegesEvent, "FROM");
                                            },
                                        }),
                                        new sap.m.ToolbarSeparator(""),
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("initialfantasy_copy_to"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://documents",
                                            press: function (): void {
                                                that.fireViewEvents(that.copyIdentityPrivilegesEvent, "TO");
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
                                        new sap.m.MenuButton("", {
                                            text: ibas.i18n.prop("shell_data_choose"),
                                            icon: "sap-icon://bullet-text",
                                            type: sap.m.ButtonType.Transparent,
                                            menu: new sap.m.Menu("", {
                                                items: [
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("shell_all"),
                                                        icon: "sap-icon://multiselect-all",
                                                        press: function (): void {
                                                            let model: any = that.tableIdentityPrivileges.getModel();
                                                            if (model instanceof sap.extension.model.JSONModel) {
                                                                for (let index: number = 0; index < model.size(); index++) {
                                                                    if (!that.tableIdentityPrivileges.isIndexSelected(index)) {
                                                                        that.tableIdentityPrivileges.addSelectionInterval(index, index);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }),
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("shell_reverse"),
                                                        icon: "sap-icon://multi-select",
                                                        press: function (): void {
                                                            let model: any = that.tableIdentityPrivileges.getModel();
                                                            if (model instanceof sap.extension.model.JSONModel) {
                                                                let selects: ibas.IList<number> = ibas.arrays.create(that.tableIdentityPrivileges.getSelectedIndices());
                                                                that.tableIdentityPrivileges.clearSelection();
                                                                for (let index: number = 0; index < model.size(); index++) {
                                                                    if (!selects.contain(index)) {
                                                                        that.tableIdentityPrivileges.addSelectionInterval(index, index);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }),
                                                ],
                                            })
                                        }),
                                        new sap.m.ToolbarSpacer(""),
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
                                                            for (let item of that.tableIdentityPrivileges.getSelecteds<bo.IIdentityPrivilege>()) {
                                                                item.activated = ibas.emYesNo.YES;
                                                            }
                                                        }
                                                    }),
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.enums.describe(ibas.emYesNo, ibas.emYesNo.NO),
                                                        icon: "sap-icon://decline",
                                                        press: function (): void {
                                                            for (let item of that.tableIdentityPrivileges.getSelecteds<bo.IIdentityPrivilege>()) {
                                                                item.activated = ibas.emYesNo.NO;
                                                            }
                                                        }
                                                    }),
                                                ],
                                            })
                                        }),
                                        new sap.m.ToolbarSeparator(),
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
                                                            for (let item of that.tableIdentityPrivileges.getSelecteds<bo.IIdentityPrivilege>()) {
                                                                item.authoriseValue = ibas.emAuthoriseType.ALL;
                                                            }
                                                        }
                                                    }),
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.enums.describe(ibas.emAuthoriseType, ibas.emAuthoriseType.READ),
                                                        icon: "sap-icon://multi-select",
                                                        press: function (): void {
                                                            for (let item of that.tableIdentityPrivileges.getSelecteds<bo.IIdentityPrivilege>()) {
                                                                item.authoriseValue = ibas.emAuthoriseType.READ;
                                                            }
                                                        }
                                                    }),
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.enums.describe(ibas.emAuthoriseType, ibas.emAuthoriseType.NONE),
                                                        icon: "sap-icon://multiselect-none",
                                                        press: function (): void {
                                                            for (let item of that.tableIdentityPrivileges.getSelecteds<bo.IIdentityPrivilege>()) {
                                                                item.authoriseValue = ibas.emAuthoriseType.NONE;
                                                            }
                                                        }
                                                    }),
                                                ],
                                            })
                                        }),
                                    ]
                                }),
                            })
                        ],
                    });
                }
                private facetFilter: sap.m.FacetFilter;
                private pageIdentities: sap.m.Page;
                private tableIdentities: sap.extension.m.List;
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
                    let dataBinding: any = this.tableIdentityPrivileges.getBinding("rows");
                    dataBinding.filter(filter);
                }
                private refreshPrivilegeFilter(datas: app.IdentityPrivilege[]): void {
                    this.facetFilter.removeAllLists();
                    if (datas.length === 0) {
                        this.facetFilter.setVisible(false);
                        return;
                    }
                    //#region 模块标识过滤
                    let moduleIdFacetFilterList: sap.m.FacetFilterList = new sap.m.FacetFilterList("", {
                        title: ibas.i18n.prop("bo_privilege_moduleid"),
                        growingThreshold: 1000,
                        key: "moduleId",
                        search: function (oEvent: any): void {
                            let oFacetFilterList: any = oEvent.getSource();
                            let searchString: string = oEvent.getParameter("term");
                            let bClearButtonPressed: any = oEvent.getParameter("clearButtonPressed");
                            let oFilter: any = bClearButtonPressed ? new sap.ui.model.Filter("moduleName", sap.ui.model.FilterOperator.Contains, "")
                                : new sap.ui.model.Filter("moduleName", sap.ui.model.FilterOperator.Contains, searchString.toLowerCase());
                            oEvent.preventDefault();
                            if (oFacetFilterList.isBound("items")) {
                                oFacetFilterList.getBinding("items").filter(oFilter);
                            }
                        },
                        items: {
                            path: "/rows",
                            template: new sap.m.FacetFilterItem("", {
                                text: {
                                    path: "moduleName",
                                },
                                key: "{moduleId}"
                            })
                        }
                    });
                    let modules: any = datas.filter(c => {
                        return ibas.strings.isEmpty(c.target);
                    });
                    // 模块名称赋值
                    for (let item of modules) {
                        (<any>item).moduleName = ibas.i18n.prop(item.moduleId);
                    }
                    moduleIdFacetFilterList.setModel(new sap.extension.model.JSONModel({ rows: modules }));
                    this.facetFilter.addList(moduleIdFacetFilterList);
                    //#endregion

                    //#region 元素类型过滤
                    let targetFacetList: ibas.ArrayList<{ type: string; typeKey: number; }> = new ibas.ArrayList<{ type: string; typeKey: number; }>();
                    targetFacetList.add({
                        type: ibas.enums.describe(initialfantasy.bo.emElementType, initialfantasy.bo.emElementType.FUNCTION),
                        typeKey: initialfantasy.bo.emElementType.FUNCTION
                    });
                    targetFacetList.add({
                        type: ibas.enums.describe(initialfantasy.bo.emElementType, initialfantasy.bo.emElementType.APPLICATION),
                        typeKey: initialfantasy.bo.emElementType.APPLICATION
                    });
                    targetFacetList.add({
                        type: ibas.enums.describe(initialfantasy.bo.emElementType, initialfantasy.bo.emElementType.MODULE),
                        typeKey: initialfantasy.bo.emElementType.MODULE
                    });
                    targetFacetList.add({
                        type: ibas.enums.describe(initialfantasy.bo.emElementType, initialfantasy.bo.emElementType.SERVICE),
                        typeKey: initialfantasy.bo.emElementType.SERVICE
                    });
                    let targetFacetFilterList: sap.m.FacetFilterList = new sap.m.FacetFilterList("", {
                        title: ibas.i18n.prop("bo_applicationelement_elementtype"),
                        key: "type",
                        search: function (oEvent: any): void {
                            let oFacetFilterList: any = oEvent.getSource();
                            let searchString: string = oEvent.getParameter("term");
                            let bClearButtonPressed: any = oEvent.getParameter("clearButtonPressed");
                            let oFilter: any = bClearButtonPressed ? new sap.ui.model.Filter("type", sap.ui.model.FilterOperator.Contains, "")
                                : new sap.ui.model.Filter("type", sap.ui.model.FilterOperator.Contains, searchString.toLowerCase());
                            oEvent.preventDefault();
                            if (oFacetFilterList.isBound("items")) {
                                oFacetFilterList.getBinding("items").filter(oFilter);
                            }
                        },
                        items: {
                            path: "/rows",
                            template: new sap.m.FacetFilterItem("", {
                                text: {
                                    path: "type",
                                },
                                key: "{typeKey}"
                            })
                        }
                    });
                    targetFacetFilterList.setModel(new sap.extension.model.JSONModel({ rows: targetFacetList }));
                    this.facetFilter.addList(targetFacetFilterList);
                    //#endregion
                    //#region 权限类型过滤
                    let authoriseTypeList: ibas.ArrayList<{ authoriseValue: string; authoriseValueKey: number; }> =
                        new ibas.ArrayList<{ authoriseValue: string; authoriseValueKey: number; }>();
                    authoriseTypeList.add({
                        authoriseValue: ibas.enums.describe(ibas.emAuthoriseType, ibas.emAuthoriseType.ALL),
                        authoriseValueKey: ibas.emAuthoriseType.ALL
                    });
                    authoriseTypeList.add({
                        authoriseValue: ibas.enums.describe(ibas.emAuthoriseType, ibas.emAuthoriseType.NONE),
                        authoriseValueKey: ibas.emAuthoriseType.NONE
                    });
                    authoriseTypeList.add({
                        authoriseValue: ibas.enums.describe(ibas.emAuthoriseType, ibas.emAuthoriseType.READ),
                        authoriseValueKey: ibas.emAuthoriseType.READ
                    });
                    let authoriseTypeFacetFilterList: sap.m.FacetFilterList = new sap.m.FacetFilterList("", {
                        title: ibas.i18n.prop("bo_privilege_authorisevalue"),
                        key: "authoriseValue",
                        search: function (oEvent: any): void {
                            let oFacetFilterList: any = oEvent.getSource();
                            let searchString: string = oEvent.getParameter("term");
                            let bClearButtonPressed: any = oEvent.getParameter("clearButtonPressed");
                            let oFilter: any = bClearButtonPressed ? new sap.ui.model.Filter("authoriseValue", sap.ui.model.FilterOperator.Contains, "")
                                : new sap.ui.model.Filter("authoriseValue", sap.ui.model.FilterOperator.Contains, searchString.toLowerCase());
                            oEvent.preventDefault();
                            if (oFacetFilterList.isBound("items")) {
                                oFacetFilterList.getBinding("items").filter(oFilter);
                            }
                        },
                        items: {
                            path: "/rows",
                            template: new sap.m.FacetFilterItem("", {
                                text: {
                                    path: "authoriseValue",
                                },
                                key: "{authoriseValueKey}"
                            })
                        }
                    });
                    authoriseTypeFacetFilterList.setModel(new sap.extension.model.JSONModel({ rows: authoriseTypeList }));
                    this.facetFilter.addList(authoriseTypeFacetFilterList);
                    //#endregion
                    this.facetFilter.setVisible(true);
                }
            }
        }
    }
}