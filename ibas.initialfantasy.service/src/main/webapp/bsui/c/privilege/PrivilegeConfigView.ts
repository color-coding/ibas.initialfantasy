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
                /** 编辑身份权限  */
                editIdentityPrivilegesEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.tableRoles = new sap.extension.m.List("", {
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
                            that.fireFetchPrivilegesEvent();
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
                    this.pageRoles = new sap.m.Page("", {
                        showHeader: false,
                        content: [
                            this.tableRoles
                        ],
                        floatingFooter: true,
                        footer: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("bo_identityprivilege"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://edit",
                                    press: function (): void {
                                        let role: bo.IRole = that.tableRoles.getSelecteds<bo.IRole>().firstOrDefault();
                                        let platform: string = that.selectPlatforms.getSelectedKey();
                                        that.fireViewEvents(that.editIdentityPrivilegesEvent, role, platform);
                                    }
                                }),
                            ]
                        }),
                    });
                    this.tablePrivileges = new sap.extension.table.Table("", {
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
                                    select(event: sap.ui.base.Event): void {
                                        let source: any = event.getSource();
                                        if (source instanceof sap.m.CheckBox) {
                                            if (source.getSelected() === true) {
                                                // 如果选择，则其他选中的取消选中
                                                let select: any = source.getBindingContext().getObject();
                                                let datas: app.Privilege[] = that.tablePrivileges.getModel().getData<app.Privilege[]>("rows");
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
                                    }
                                }).bindProperty("bindingValue", {
                                    path: "automatic",
                                    type: new sap.extension.data.YesNo()
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
                                                    let role: bo.IRole = that.tableRoles.getSelecteds<bo.IRole>().firstOrDefault();
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
                                                        that.tablePrivileges.getUnSelecteds<bo.IPrivilege>() :
                                                        that.tablePrivileges.getSelecteds<bo.IPrivilege>()) {
                                                        item.activated = ibas.emYesNo.YES;
                                                    }
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.enums.describe(ibas.emYesNo, ibas.emYesNo.NO),
                                                icon: "sap-icon://decline",
                                                press: function (): void {
                                                    for (let item of that.check.getSelected() ?
                                                        that.tablePrivileges.getUnSelecteds<bo.IPrivilege>() :
                                                        that.tablePrivileges.getSelecteds<bo.IPrivilege>()) {
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
                                                        that.tablePrivileges.getUnSelecteds<bo.IPrivilege>() :
                                                        that.tablePrivileges.getSelecteds<bo.IPrivilege>()) {
                                                        item.authoriseValue = ibas.emAuthoriseType.ALL;
                                                    }
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.enums.describe(ibas.emAuthoriseType, ibas.emAuthoriseType.READ),
                                                icon: "sap-icon://multi-select",
                                                press: function (): void {
                                                    for (let item of that.check.getSelected() ?
                                                        that.tablePrivileges.getUnSelecteds<bo.IPrivilege>() :
                                                        that.tablePrivileges.getSelecteds<bo.IPrivilege>()) {
                                                        item.authoriseValue = ibas.emAuthoriseType.READ;
                                                    }
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.enums.describe(ibas.emAuthoriseType, ibas.emAuthoriseType.NONE),
                                                icon: "sap-icon://multiselect-none",
                                                press: function (): void {
                                                    for (let item of that.check.getSelected() ?
                                                        that.tablePrivileges.getUnSelecteds<bo.IPrivilege>() :
                                                        that.tablePrivileges.getSelecteds<bo.IPrivilege>()) {
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
                private tableRoles: sap.extension.m.List;
                private pagePrivileges: sap.m.Page;
                private tablePrivileges: sap.extension.table.Table;
                private selectPlatforms: sap.m.Select;
                private fireFetchPrivilegesEvent(): void {
                    let role: bo.IRole = this.tableRoles.getSelecteds<bo.IRole>().firstOrDefault();
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
                        view.setStyle(sap.m.ToolbarStyle.Clear);
                        view.setHeight("100%");
                    }
                    this.pageRoles.addHeaderContent(view);
                    this.pageRoles.setShowHeader(true);
                }
                showRoles(datas: bo.IRole[]): void {
                    let model: sap.ui.model.Model = this.tableRoles.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.tableRoles.setModel(new sap.extension.model.JSONModel({ rows: datas }));
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
                    this.tablePrivileges.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    this.refreshPrivilegeFilter(datas);
                }
                /** 刷新过滤器 */
                private refreshPrivilegeFilter(datas: app.Privilege[]): void {
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
                private filterPrivileges(filter: sap.ui.model.Filter): void {
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