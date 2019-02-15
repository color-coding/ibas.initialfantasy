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
             * 视图-系统权限配置
             */
            export class PrivilegeConfigView extends ibas.BOQueryViewWithPanel implements app.IPrivilegeConfigView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.Organization;
                }
                get fetchDataEvent(): Function {
                    return this.fetchRolesEvent;
                }
                set fetchDataEvent(value: Function) {
                    this.fetchRolesEvent = value;
                }
                /** 查询角色 */
                fetchRolesEvent: Function;
                /** 查询权限  */
                fetchPrivilegesEvent: Function;
                /** 保存权限 */
                savePrivilegesEvent: Function;
                /** 复制权限  */
                copyPrivilegesEvent: Function;
                /** 删除权限 */
                deletePrivilegesEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.tableRoles = new sap.m.List("", {
                        inset: false,
                        growing: true,
                        growingThreshold: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
                        growingScrollToLoad: true,
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
                            that.fireFetchPrivilegesEvent();
                        }
                    });
                    // 添加列表自动查询事件
                    openui5.utils.triggerNextResults({
                        listener: this.tableRoles,
                        next(data: any): void {
                            if (ibas.objects.isNull(that.lastCriteria)) {
                                return;
                            }
                            let criteria: ibas.ICriteria = that.lastCriteria.next(data);
                            if (ibas.objects.isNull(criteria)) {
                                return;
                            }
                            ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                            that.fireViewEvents(that.fetchDataEvent, criteria);
                        }
                    });
                    this.pageRoles = new sap.m.Page("", {
                        showHeader: false,
                        content: [
                            this.tableRoles
                        ]
                    });
                    this.tablePrivileges = new sap.ui.table.Table("", {
                        enableSelectAll: true,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15) - 1,
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        rows: "{/rows}",
                        rowSettingsTemplate: new sap.ui.table.RowSettings("", {
                        }).bindProperty("highlight", {
                            path: "isNew",
                            formatter(value: boolean): string {
                                if (!!value) {
                                    return sap.ui.core.MessageType.Warning;
                                } else {
                                    return sap.ui.core.MessageType.Information;
                                }
                            }
                        }),
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_privilege_moduleid"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                    tooltip: {
                                        path: "moduleId"
                                    }
                                }).bindProperty("text", {
                                    path: "moduleId",
                                    formatter(data: any): any {
                                        return ibas.i18n.prop(data);
                                    }
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_privilege_target"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                    tooltip: {
                                        path: "target"
                                    }
                                }).bindProperty("text", {
                                    path: "target",
                                    formatter(data: any): any {
                                        if (ibas.strings.isEmpty(data)) {
                                            return data;
                                        }
                                        return ibas.i18n.prop(data);
                                    }
                                }),
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_applicationelement_elementtype"),
                                template: new sap.m.Text("", {
                                    wrapping: false,
                                }).bindProperty("text", {
                                    path: "type",
                                    formatter(data: any): any {
                                        return ibas.enums.describe(bo.emElementType, data);
                                    }
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_privilege_activated"),
                                template: new sap.m.Select("", {
                                    width: "100%",
                                    items: openui5.utils.createComboBoxItems(ibas.emYesNo),
                                }).bindProperty("selectedKey", {
                                    path: "activated",
                                    type: "sap.ui.model.type.Integer",
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_privilege_authorisevalue"),
                                template: new sap.m.Select("", {
                                    width: "100%",
                                    items: openui5.utils.createComboBoxItems(ibas.emAuthoriseType),
                                }).bindProperty("selectedKey", {
                                    path: "authoriseValue",
                                    type: "sap.ui.model.type.Integer",
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_privilege_automatic"),
                                template: new sap.m.Select("", {
                                    width: "100%",
                                    items: openui5.utils.createComboBoxItems(ibas.emYesNo),
                                }).bindProperty("selectedKey", {
                                    path: "automatic",
                                    type: "sap.ui.model.type.Integer",
                                })
                            }),
                        ]
                    });
                    this.pagePrivileges = new sap.m.Page("", {
                        showHeader: true,
                        customHeader: new sap.m.Toolbar("", {
                            content: [
                                this.facetFilter = new sap.m.FacetFilter("", {
                                    type: sap.m.FacetFilterType.Simple,
                                    showPersonalization: true,
                                    showReset: true,
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
                                this.selectPlatforms = new sap.m.Select("", {
                                    width: "auto",
                                    change(): void {
                                        that.fireFetchPrivilegesEvent();
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("initialfantasy_copy_from"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://copy",
                                    press: function (): void {
                                        that.fireViewEvents(that.copyPrivilegesEvent);
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
                                        that.fireViewEvents(that.savePrivilegesEvent);
                                    },
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_delete"),
                                                icon: "sap-icon://delete",
                                                press: function (): void {
                                                    let role: bo.IRole = openui5.utils.getSelecteds<bo.IRole>(that.tableRoles).firstOrDefault();
                                                    if (!ibas.objects.isNull(role)) {
                                                        let criteria: ibas.ICriteria = new ibas.Criteria();
                                                        let condition: ibas.ICondition = criteria.conditions.create();
                                                        condition.alias = bo.Privilege.PROPERTY_PLATFORMID_NAME;
                                                        condition.value = that.selectPlatforms.getSelectedKey();
                                                        condition = criteria.conditions.create();
                                                        condition.alias = bo.Privilege.PROPERTY_ROLECODE_NAME;
                                                        condition.value = role.code;
                                                        that.fireViewEvents(that.deletePrivilegesEvent, criteria);
                                                    }
                                                }
                                            }),
                                        ],
                                    })
                                }),
                            ]
                        }),
                        content: [
                            this.tablePrivileges
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
                                                        openui5.utils.getUnSelecteds<bo.IPrivilege>(that.tablePrivileges) :
                                                        openui5.utils.getSelecteds<bo.IPrivilege>(that.tablePrivileges)) {
                                                        item.activated = ibas.emYesNo.YES;
                                                    }
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.enums.describe(ibas.emYesNo, ibas.emYesNo.NO),
                                                icon: "sap-icon://decline",
                                                press: function (): void {
                                                    for (let item of that.check.getSelected() ?
                                                        openui5.utils.getUnSelecteds<bo.IPrivilege>(that.tablePrivileges) :
                                                        openui5.utils.getSelecteds<bo.IPrivilege>(that.tablePrivileges)) {
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
                                                        openui5.utils.getUnSelecteds<bo.IPrivilege>(that.tablePrivileges) :
                                                        openui5.utils.getSelecteds<bo.IPrivilege>(that.tablePrivileges)) {
                                                        item.authoriseValue = ibas.emAuthoriseType.ALL;
                                                    }
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.enums.describe(ibas.emAuthoriseType, ibas.emAuthoriseType.READ),
                                                icon: "sap-icon://multi-select",
                                                press: function (): void {
                                                    for (let item of that.check.getSelected() ?
                                                        openui5.utils.getUnSelecteds<bo.IPrivilege>(that.tablePrivileges) :
                                                        openui5.utils.getSelecteds<bo.IPrivilege>(that.tablePrivileges)) {
                                                        item.authoriseValue = ibas.emAuthoriseType.READ;
                                                    }
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.enums.describe(ibas.emAuthoriseType, ibas.emAuthoriseType.NONE),
                                                icon: "sap-icon://multiselect-none",
                                                press: function (): void {
                                                    for (let item of that.check.getSelected() ?
                                                        openui5.utils.getUnSelecteds<bo.IPrivilege>(that.tablePrivileges) :
                                                        openui5.utils.getSelecteds<bo.IPrivilege>(that.tablePrivileges)) {
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
                            this.pageRoles,
                        ],
                        detailPages: [
                            this.pagePrivileges
                        ],
                    });
                }
                private facetFilter: sap.m.FacetFilter;
                private check: sap.m.CheckBox;
                private pageRoles: sap.m.Page;
                private tableRoles: sap.m.List;
                private pagePrivileges: sap.m.Page;
                private tablePrivileges: sap.ui.table.Table;
                private selectPlatforms: sap.m.Select;
                private fireFetchPrivilegesEvent(): void {
                    let role: bo.IRole = openui5.utils.getSelecteds<bo.IRole>(this.tableRoles).firstOrDefault();
                    if (!ibas.objects.isNull(role)) {
                        let criteria: ibas.ICriteria = new ibas.Criteria();
                        let condition: ibas.ICondition = criteria.conditions.create();
                        condition.alias = bo.Privilege.PROPERTY_PLATFORMID_NAME;
                        condition.value = this.selectPlatforms.getSelectedKey();
                        condition = criteria.conditions.create();
                        condition.alias = bo.Privilege.PROPERTY_ROLECODE_NAME;
                        condition.value = role.code;
                        this.fireViewEvents(this.fetchPrivilegesEvent, criteria);
                    }
                }
                /** 嵌入查询面板 */
                embedded(view: any): void {
                    if (view instanceof sap.m.Toolbar) {
                        view.setDesign(sap.m.ToolbarDesign.Transparent);
                        view.setHeight("100%");
                    }
                    this.pageRoles.addHeaderContent(view);
                    this.pageRoles.setShowHeader(true);
                }
                showRoles(datas: bo.IRole[]): void {
                    let done: boolean = false;
                    let model: sap.ui.model.Model = this.tableRoles.getModel(undefined);
                    if (!ibas.objects.isNull(model)) {
                        // 已存在绑定数据，添加新的
                        let hDatas: any = (<any>model).getData();
                        if (!ibas.objects.isNull(hDatas) && hDatas.rows instanceof Array) {
                            for (let item of datas) {
                                hDatas.rows.push(item);
                            }
                            model.refresh(false);
                            done = true;
                        }
                    }
                    if (!done) {
                        // 没有显示数据
                        this.tableRoles.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    }
                    this.tableRoles.setBusy(false);
                }
                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.tableRoles.setBusy(true);
                        this.tableRoles.setModel(null);
                    }
                }
                /** 显示数据 */
                showPrivileges(datas: app.Privilege[]): void {
                    this.tablePrivileges.setFirstVisibleRow(0);
                    this.tablePrivileges.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                    openui5.utils.refreshModelChanged(this.tablePrivileges, datas);
                    this.refreshPrivilegeFilter(datas);
                }
                /** 刷新过滤器 */
                refreshPrivilegeFilter(datas: app.Privilege[]): void {
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
                filterPrivileges(filter: sap.ui.model.Filter): void {
                    let dataBinding: any = this.tablePrivileges.getBinding("");
                    dataBinding.filter(filter);
                }
                /** 显示平台 */
                showPlatforms(datas: bo.ApplicationPlatform[]): void {
                    for (let item of datas) {
                        this.selectPlatforms.addItem(new sap.ui.core.ListItem("", {
                            key: item.platformCode,
                            text: item.platformDescription,
                            additionalText: item.platformId
                        }));
                        if (ibas.strings.isEmpty(this.selectPlatforms.getSelectedKey())) {
                            this.selectPlatforms.setSelectedKey(item.platformCode);
                        }
                    }
                }
            }
        }
    }
}