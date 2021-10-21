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
            /** 列表视图-业务对象属性设置 */
            export class BOPropertySettingConfigView extends ibas.BOQueryViewWithPanel implements app.IBOPropertySettingConfigView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.BOInformation;
                }
                /** 编辑业务对象信息 */
                editBusinessObjectEvent: Function;
                /** 选择业务对象信息，参数：编辑对象 */
                selectedBusinessObjectEvent: Function;
                /** 保存设置 */
                saveSettingsEvent: Function;
                /** 删除设置 */
                deleteSettingsEvent: Function;
                /** 复制设置 */
                copySettingsEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.list = new sap.extension.m.List("", {
                        chooseType: ibas.emChooseType.SINGLE,
                        growingThreshold: sap.extension.table.visibleRowCount(15),
                        mode: sap.m.ListMode.SingleSelectMaster,
                        items: {
                            path: "/rows",
                            template: new sap.m.ObjectListItem("", {
                                title: "{description}",
                                firstStatus: new sap.m.ObjectStatus("", {
                                    text: "{objectType}"
                                }),
                                attributes: [
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "name",
                                            type: new sap.extension.data.Alphanumeric(),
                                        },
                                    }),
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
                            that.fireViewEvents(that.selectedBusinessObjectEvent, that.list.getSelecteds().firstOrDefault());
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
                        }
                    });
                    this.table = new sap.extension.table.Table("", {
                        enableSelectAll: false,
                        visibleRowCount: sap.extension.table.visibleRowCount(14),
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
                                label: ibas.i18n.prop("bo_bopropertyinformation_property"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "propertyCode",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                sortProperty: "propertyCode",
                                filterProperty: "propertyCode"
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyinformation_description"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "propertyName",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                sortProperty: "propertyName",
                                filterProperty: "propertyName"
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyinformation_mapped"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "propertyAlias",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                sortProperty: "propertyAlias"
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertysetting_position"),
                                template: new sap.extension.m.Input("", {
                                    type: sap.m.InputType.Number
                                }).bindProperty("bindingValue", {
                                    path: "position",
                                    type: new sap.extension.data.Numeric()
                                }),
                                sortProperty: "position"
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertysetting_searched"),
                                template: new sap.extension.m.EnumSelect("", {
                                    enumType: bo.emSearchedValue,
                                }).bindProperty("bindingValue", {
                                    path: "searched",
                                    type: new sap.extension.data.Enum({
                                        enumType: bo.emSearchedValue,
                                    }),
                                }),
                                sortProperty: "searched"
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertysetting_authorised"),
                                template: new sap.extension.m.EnumSelect("", {
                                    enumType: bo.emAuthorisedValue,
                                }).bindProperty("bindingValue", {
                                    path: "authorised",
                                    type: new sap.extension.data.Enum({
                                        enumType: bo.emAuthorisedValue,
                                    }),
                                }),
                                sortProperty: "authorised",
                            }),
                        ]
                    });
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
                                    let oFilter: sap.ui.model.Filter = new sap.ui.model.Filter(
                                        mFacetFilterLists.map(function (oList: sap.m.FacetFilterList): any {
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
                    });
                    return new sap.m.SplitContainer("", {
                        masterPages: [
                            this.pageList = new sap.extension.m.Page("", {
                                showHeader: false,
                                floatingFooter: true,
                                footer: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.ToolbarSpacer(""),
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("shell_data_edit"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://edit",
                                            press: function (): void {
                                                that.fireViewEvents(that.editBusinessObjectEvent, that.list.getSelecteds().firstOrDefault());
                                            }
                                        }),
                                    ]
                                }),
                                showFooter: ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_SUPER),
                                content: [
                                    this.list
                                ]
                            })
                        ],
                        detailPages: [
                            new sap.extension.m.Page("", {
                                showHeader: true,
                                customHeader: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.Label("", {
                                            text: ibas.i18n.prop("bo_bopropertysetting_identitycode"),
                                        }),
                                        this.inputIdentity = new sap.extension.m.SelectionInput("", {
                                            width: "auto",
                                            placeholder: ibas.i18n.prop("initialfantasy_all_identities"),
                                            showValueHelp: true,
                                            repository: bo.BORepositoryInitialFantasy,
                                            dataInfo: {
                                                type: bo.Identity,
                                                key: bo.Identity.PROPERTY_CODE_NAME,
                                                text: bo.Identity.PROPERTY_NAME_NAME
                                            },
                                            criteria: [
                                                new ibas.Condition(bo.Identity.PROPERTY_CODE_NAME, ibas.emConditionOperation.NOT_EQUAL, null),
                                            ],
                                            change(event: sap.ui.base.Event): void {
                                                let source: any = event.getSource();
                                                if (source instanceof sap.m.Input) {
                                                    let data: any = that.list.getSelecteds().firstOrDefault();
                                                    if (!ibas.objects.isNull(data)) {
                                                        that.fireViewEvents(that.selectedBusinessObjectEvent, data);
                                                    }
                                                }
                                            }
                                        }),
                                        new sap.m.ToolbarSeparator(),
                                        this.facetFilter,
                                        new sap.m.ToolbarSpacer(""),
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("initialfantasy_copy_from"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://copy",
                                            press: function (): void {
                                                that.fireViewEvents(that.copySettingsEvent);
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
                                                that.fireViewEvents(that.saveSettingsEvent);
                                            },
                                            menu: new sap.m.Menu("", {
                                                items: [
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("shell_data_delete"),
                                                        icon: "sap-icon://delete",
                                                        press: function (): void {
                                                            that.fireViewEvents(that.deleteSettingsEvent);
                                                        }
                                                    }),
                                                ],
                                            })
                                        }),
                                    ]
                                }),
                                content: [
                                    this.table
                                ],
                                floatingFooter: true,
                                footer: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.MenuButton("", {
                                            text: ibas.i18n.prop("shell_data_choose"),
                                            icon: "sap-icon://menu",
                                            type: sap.m.ButtonType.Transparent,
                                            menu: new sap.m.Menu("", {
                                                items: [
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("shell_all"),
                                                        icon: "sap-icon://multiselect-all",
                                                        press: function (): void {
                                                            let model: any = that.table.getModel();
                                                            if (model instanceof sap.extension.model.JSONModel) {
                                                                for (let index: number = 0; index < model.size(); index++) {
                                                                    if (!that.table.isIndexSelected(index)) {
                                                                        that.table.addSelectionInterval(index, index);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }),
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("shell_reverse"),
                                                        icon: "sap-icon://multiselect-none",
                                                        press: function (): void {
                                                            let model: any = that.table.getModel();
                                                            if (model instanceof sap.extension.model.JSONModel) {
                                                                let selects: ibas.IList<number> = ibas.arrays.create(that.table.getSelectedIndices());
                                                                that.table.clearSelection();
                                                                for (let index: number = 0; index < model.size(); index++) {
                                                                    if (!selects.contain(index)) {
                                                                        that.table.addSelectionInterval(index, index);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }),
                                                ],
                                            })
                                        }),
                                        new sap.m.ToolbarSpacer(""),
                                        new sap.m.Button("", {
                                            text: ibas.i18n.prop("initialfantasy_reset_position"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://reset",
                                            press: function (): void {
                                                for (let item of that.table.getSelecteds<app.PropertySetting>()) {
                                                    item.position = undefined;
                                                }
                                            }
                                        }),
                                        new sap.m.MenuButton("", {
                                            text: ibas.i18n.prop("bo_bopropertysetting_authorised"),
                                            icon: "sap-icon://bullet-text",
                                            type: sap.m.ButtonType.Transparent,
                                            menu: new sap.m.Menu("", {
                                                items: [
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.enums.describe(bo.emAuthorisedValue, bo.emAuthorisedValue.ALL),
                                                        icon: "sap-icon://multiselect-all",
                                                        press: function (): void {
                                                            for (let item of that.table.getSelecteds<app.PropertySetting>()) {
                                                                item.authorised = bo.emAuthorisedValue.ALL;
                                                            }
                                                        }
                                                    }),
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.enums.describe(bo.emAuthorisedValue, bo.emAuthorisedValue.READ),
                                                        icon: "sap-icon://multi-select",
                                                        press: function (): void {
                                                            for (let item of that.table.getSelecteds<app.PropertySetting>()) {
                                                                item.authorised = bo.emAuthorisedValue.READ;
                                                            }
                                                        }
                                                    }),
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.enums.describe(bo.emAuthorisedValue, bo.emAuthorisedValue.NONE),
                                                        icon: "sap-icon://multiselect-none",
                                                        press: function (): void {
                                                            for (let item of that.table.getSelecteds<app.PropertySetting>()) {
                                                                item.authorised = bo.emAuthorisedValue.NONE;
                                                            }
                                                        }
                                                    }),
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("initialfantasy_default"),
                                                        icon: "sap-icon://horizontal-bar-chart",
                                                        press: function (): void {
                                                            for (let item of that.table.getSelecteds<app.PropertySetting>()) {
                                                                item.authorised = bo.emAuthorisedValue.DEFAULT;
                                                            }
                                                        }
                                                    }),
                                                ],
                                            })
                                        }),
                                    ]
                                })
                            })
                        ],
                    });
                }
                private facetFilter: sap.m.FacetFilter;
                private pageList: sap.extension.m.Page;
                private list: sap.extension.m.List;
                private table: sap.extension.table.Table;
                private inputIdentity: sap.extension.m.Input;
                /** 嵌入查询面板 */
                embedded(view: any): void {
                    if (view instanceof sap.m.Toolbar) {
                        view.setDesign(sap.m.ToolbarDesign.Transparent);
                        view.setStyle(sap.m.ToolbarStyle.Clear);
                        view.setHeight("100%");
                    }
                    this.pageList.addHeaderContent(view);
                    this.pageList.setShowHeader(true);
                }
                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.list.setBusy(true);
                        this.list.setModel(null);
                    }
                }
                /** 身份 */
                get identity(): string {
                    return this.inputIdentity.getSelectedKey();
                }
                set identity(value: string) {
                    this.inputIdentity.setSelectedKey(value);
                }
                /** 显示业务对象信息 */
                showBusinessObjects(datas: bo.BOInformation[]): void {
                    let model: sap.ui.model.Model = this.list.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.list.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.list.setBusy(false);
                }
                showPropertySettings(datas: app.PropertySetting[]): void {
                    this.table.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    this.refreshFilter();
                }
                private filterPrivileges(filter: sap.ui.model.Filter): void {
                    let dataBinding: any = this.table.getBinding("");
                    dataBinding.filter(filter);
                }
                /** 刷新过滤器 */
                private refreshFilter(): void {
                    this.facetFilter.removeAllLists();
                    this.facetFilter.setVisible(true);
                    let searchFacetFilterList: sap.m.FacetFilterList = new sap.m.FacetFilterList("", {
                        title: ibas.i18n.prop("bo_bopropertysetting_searched"),
                        key: "searched",
                    });
                    for (let item in bo.emSearchedValue) {
                        if (ibas.objects.isNull(item)) {
                            continue;
                        }
                        let key: any = item;
                        let text: any = bo.emSearchedValue[key];
                        if (typeof key !== "string" || typeof text !== "string") {
                            continue;
                        }
                        if (!isNaN(Number(key))) {
                            key = Number(key);
                        }
                        searchFacetFilterList.addItem(new sap.m.FacetFilterItem("", {
                            text: ibas.enums.describe(bo.emSearchedValue, key),
                            key: key
                        }));
                    }
                    this.facetFilter.addList(searchFacetFilterList);
                    let authorisedFacetFilterList: sap.m.FacetFilterList = new sap.m.FacetFilterList("", {
                        title: ibas.i18n.prop("bo_bopropertysetting_authorised"),
                        key: "authorised",
                    });
                    for (let item in bo.emAuthorisedValue) {
                        if (ibas.objects.isNull(item)) {
                            continue;
                        }
                        let key: any = item;
                        let text: any = bo.emAuthorisedValue[key];
                        if (typeof key !== "string" || typeof text !== "string") {
                            continue;
                        }
                        if (!isNaN(Number(key))) {
                            key = Number(key);
                        }
                        authorisedFacetFilterList.addItem(new sap.m.FacetFilterItem("", {
                            text: ibas.enums.describe(bo.emAuthorisedValue, key),
                            key: key
                        }));
                    }
                    this.facetFilter.addList(authorisedFacetFilterList);
                }
            }
        }
    }
}
