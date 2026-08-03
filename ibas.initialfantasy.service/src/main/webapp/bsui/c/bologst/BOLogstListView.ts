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
            /** 列表视图-业务对象日志 */
            export class BOLogstListView extends ibas.BOQueryViewWithPanel implements app.IBOLogstListView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.BOInformation;
                }
                /** 选择业务对象信息，参数：选择对象 */
                selectedBusinessObjectEvent: Function;
                /** 查询日志数据（分页），参数：查询条件 */
                fetchLogstEvent: Function;
                /** 删除日志数据，参数：保留天数（0表示清理全部） */
                deleteLogstEvent: Function;
                /** 上次日志查询条件（用于分页） */
                lastLogstCriteria: ibas.ICriteria;
                /** 查看数据事件，参数：目标数据，模式 */
                viewDataEvent: Function;
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
                        selectionChange(event: sap.ui.base.Event): void {
                            // 选中不自动查询，通过查询按钮触发
                            // 但需通知应用当前选中的对象，供删除等操作使用
                            let data: any = that.list.getSelecteds().firstOrDefault();
                            that.fireViewEvents(that.selectedBusinessObjectEvent, data);
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
                    this.table = new sap.extension.table.DataTable("", {
                        enableSelectAll: false,
                        visibleRowCount: sap.extension.table.visibleRowCount(15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        dataInfo: bo.BOLogst,
                        rows: "{/rows}",
                        rowSettingsTemplate: new sap.ui.table.RowSettings("", {
                        }).bindProperty("highlight", {
                            path: "cause",
                            formatter(value: any): string {
                                if (ibas.strings.equalsIgnoreCase("DELETED", value)) {
                                    return sap.ui.core.MessageType.Error;
                                }
                                return sap.ui.core.MessageType.Warning;
                            }
                        }),
                        columns: [
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_bologst_bokeys"),
                                width: "16rem",
                                template: new sap.extension.m.Link("", {
                                    press(this: sap.m.Link): void {
                                        let data: any = this.getBindingContext().getObject();
                                        if (ibas.objects.isNull(data)) {
                                            return;
                                        }
                                        // 解析boKeys，格式：FieldName = Value 或 FieldName1 = Value1&FieldName2 = Value2
                                        let boKeys: string = data.boKeys;
                                        let linkValue: string;
                                        if (!ibas.strings.isEmpty(boKeys)) {
                                            let parts: string[] = boKeys.split("&");
                                            let values: string[] = [];
                                            for (let part of parts) {
                                                let index: number = part.indexOf("=");
                                                if (index > 0) {
                                                    values.push(part.substring(index + 1).trim());
                                                }
                                            }
                                            if (values.length === 1) {
                                                linkValue = values[0];
                                            }
                                        }
                                        if (ibas.strings.isEmpty(linkValue)) {
                                            // 无主键或多个主键，不支持跳转
                                            that.application.viewShower.messages({
                                                title: that.title,
                                                type: ibas.emMessageType.WARNING,
                                                message: ibas.strings.format("{0}: {1}",
                                                    ibas.i18n.prop("shell_data_invalid"), boKeys)
                                            });
                                            return;
                                        }
                                        ibas.servicesManager.runLinkService({
                                            boCode: data.boCode,
                                            linkValue: linkValue,
                                        });
                                    }
                                }).bindProperty("bindingValue", {
                                    path: "boKeys",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_bologst_loginst"),
                                width: "5rem",
                                template: new sap.extension.m.Link("", {
                                    press(this: sap.m.Link): void {
                                        let data: any = this.getBindingContext().getObject();
                                        if (ibas.objects.isNull(data)) {
                                            return;
                                        }
                                        that.showContentDialog(data);
                                    }
                                }).bindProperty("bindingValue", {
                                    path: "logInst",
                                    type: new sap.extension.data.Numeric(),
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_bologst_modifyuser"),
                                width: "8rem",
                                template: new sap.extension.m.UserText("", {
                                }).bindProperty("bindingValue", {
                                    path: "modifyUser",
                                    type: new sap.extension.data.Numeric(),
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_bologst_modifydate"),
                                width: "9rem",
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "modifyDate",
                                    type: new sap.extension.data.Date(),
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_bologst_modifytime"),
                                width: "7rem",
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "modifyTime",
                                    type: new sap.extension.data.Time(),
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_bologst_transactionid"),
                                width: "22rem",
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "transactionId",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_bologst_cause"),
                                width: "100%",
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "cause",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                            }),
                        ],
                        nextDataSet(event: sap.ui.base.Event): void {
                            // 查询下一页日志数据
                            let data: any = event.getParameter("data");
                            if (ibas.objects.isNull(data)) {
                                return;
                            }
                            if (ibas.objects.isNull(that.lastLogstCriteria)) {
                                return;
                            }
                            // 使用TransactionId（UUID v7，具有时间顺序）+ LogInst作为分页游标
                            // 排序为降序，取小于游标值的数据，确保分页不遗漏数据
                            let criteria: ibas.ICriteria = that.lastLogstCriteria.clone();
                            // 原始条件用括号括起，并与分页条件AND连接
                            if (criteria.conditions.length > 0) {
                                let firstCondition: ibas.ICondition = criteria.conditions.firstOrDefault();
                                firstCondition.bracketOpen = firstCondition.bracketOpen + 1;
                                let lastCondition: ibas.ICondition = criteria.conditions.lastOrDefault();
                                lastCondition.bracketClose = lastCondition.bracketClose + 1;
                                lastCondition.relationship = ibas.emConditionRelationship.AND;
                            }
                            // 分页条件：(TransactionId < data.transactionId) OR (TransactionId = data.transactionId AND LogInst < data.logInst)
                            let condition: ibas.ICondition = criteria.conditions.create();
                            condition.bracketOpen = 2;
                            condition.bracketClose = 1;
                            condition.alias = bo.BOLogst.PROPERTY_TRANSACTIONID_NAME;
                            condition.operation = ibas.emConditionOperation.LESS_THAN;
                            condition.value = data.transactionId;
                            condition.relationship = ibas.emConditionRelationship.AND;
                            condition = criteria.conditions.create();
                            condition.bracketOpen = 1;
                            condition.alias = bo.BOLogst.PROPERTY_TRANSACTIONID_NAME;
                            condition.operation = ibas.emConditionOperation.EQUAL;
                            condition.value = data.transactionId;
                            condition.relationship = ibas.emConditionRelationship.OR;
                            condition = criteria.conditions.create();
                            condition.bracketClose = 2;
                            condition.alias = bo.BOLogst.PROPERTY_LOGINST_NAME;
                            condition.operation = ibas.emConditionOperation.LESS_THAN;
                            condition.value = data.logInst.toString();
                            condition.relationship = ibas.emConditionRelationship.AND;
                            ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                            that.fireViewEvents(that.fetchLogstEvent, criteria);
                        }
                    });
                    return new sap.m.SplitContainer("", {
                        masterPages: [
                            this.pageList = new sap.extension.m.Page("", {
                                showHeader: false,
                                floatingFooter: true,
                                footer: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.ToolbarSpacer(""),
                                        new sap.m.MenuButton("", {
                                            text: ibas.i18n.prop("initialfantasy_clean_logs"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://delete",
                                            visible: ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_SUPER),
                                            menu: new sap.m.Menu("", {
                                                items: [
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("initialfantasy_clean_logs_90"),
                                                        press: function (): void {
                                                            that.fireViewEvents(that.deleteLogstEvent, 90);
                                                        }
                                                    }),
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("initialfantasy_clean_logs_30"),
                                                        press: function (): void {
                                                            that.fireViewEvents(that.deleteLogstEvent, 30);
                                                        }
                                                    }),
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("initialfantasy_clean_logs_all"),
                                                        press: function (): void {
                                                            that.fireViewEvents(that.deleteLogstEvent, 0);
                                                        }
                                                    }),
                                                ],
                                            })
                                        }),
                                    ]
                                }),
                                content: [
                                    this.list
                                ]
                            })
                        ],
                        detailPages: [
                            new sap.extension.m.Page("", {
                                showHeader: false,
                                subHeader: new sap.m.Toolbar("", {
                                    content: [
                                        new sap.m.Label("", {
                                            width: "auto",
                                            showColon: true,
                                            text: ibas.i18n.prop("bo_bologst_bokeys"),
                                        }),
                                        this.inputBOKeys = new sap.extension.m.Input("", {
                                            width: "10rem",
                                            placeholder: ibas.i18n.prop("bo_bologst_bokeys"),
                                        }),
                                        new sap.m.Label("", {
                                            width: "auto",
                                            showColon: true,
                                            text: ibas.i18n.prop("bo_bologst_modifyuser"),
                                        }).addStyleClass("sapUiTinyMarginBegin"),
                                        this.inputModifyUser = new sap.extension.m.UserInput("", {
                                            width: "8rem",
                                            showValueHelp: true,
                                            dataInfo: {
                                                type: bo.User,
                                                key: bo.User.PROPERTY_DOCENTRY_NAME,
                                                text: bo.User.PROPERTY_NAME_NAME
                                            },
                                        }),
                                        new sap.m.Label("", {
                                            width: "auto",
                                            showColon: true,
                                            text: ibas.i18n.prop("bo_bologst_modifydate"),
                                        }).addStyleClass("sapUiTinyMarginBegin"),
                                        this.inputDateFrom = new sap.extension.m.DatePicker("", {
                                            width: "9rem",
                                        }),
                                        new sap.m.Label("", {
                                            text: ibas.i18n.prop("initialfantasy_to"),
                                            width: "2rem",
                                        }),
                                        this.inputDateTo = new sap.extension.m.DatePicker("", {
                                            width: "9rem",
                                        }),
                                        this.checkDeletedOnly = new sap.m.CheckBox("", {
                                            text: ibas.i18n.prop("initialfantasy_only_deleted"),
                                            selected: false,
                                        }).addStyleClass("sapUiTinyMarginBegin"),
                                        new sap.m.MenuButton("", {
                                            text: ibas.i18n.prop("shell_query"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://search",
                                            buttonMode: sap.m.MenuButtonMode.Split,
                                            useDefaultActionOnly: true,
                                            defaultAction: function (): void {
                                                let data: any = that.list.getSelecteds().firstOrDefault();
                                                if (ibas.objects.isNull(data)) {
                                                    that.application.viewShower.messages({
                                                        title: that.title,
                                                        type: ibas.emMessageType.WARNING,
                                                        message: ibas.i18n.prop("shell_please_chooose_data",
                                                            ibas.i18n.prop("initialfantasy_func_bologst"))
                                                    });
                                                    return;
                                                }
                                                that.queryLogsts(data.code);
                                            },
                                            menu: new sap.m.Menu("", {
                                                items: [
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.strings.format("{0} ({1})", ibas.i18n.prop("bo_bologst_modifydate"), 30),
                                                        icon: "sap-icon://date-time",
                                                        press: function (): void {
                                                            let dateTo: Date = ibas.dates.today();
                                                            let dateFrom: Date = ibas.dates.today();
                                                            dateFrom.setDate(dateFrom.getDate() - 30);
                                                            that.filterDateFrom = dateFrom;
                                                            that.filterDateTo = dateTo;
                                                            let data: any = that.list.getSelecteds().firstOrDefault();
                                                            if (ibas.objects.isNull(data)) {
                                                                that.application.viewShower.messages({
                                                                    title: that.title,
                                                                    type: ibas.emMessageType.WARNING,
                                                                    message: ibas.i18n.prop("shell_please_chooose_data",
                                                                        ibas.i18n.prop("initialfantasy_func_bologst"))
                                                                });
                                                                return;
                                                            }
                                                            that.queryLogsts(data.code);
                                                        }
                                                    }),
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("shell_reset"),
                                                        icon: "sap-icon://reset",
                                                        press: function (): void {
                                                            that.filterBOKeys = "";
                                                            that.filterModifyUser = 0;
                                                            that.filterDateFrom = null;
                                                            that.filterDateTo = null;
                                                            that.filterDeletedOnly = false;
                                                        }
                                                    }),
                                                ],
                                            })
                                        }),
                                        new sap.m.ToolbarSpacer(""),
                                        new sap.m.MenuButton("", {
                                            text: ibas.i18n.prop("initialfantasy_display_comparison"),
                                            type: sap.m.ButtonType.Transparent,
                                            icon: "sap-icon://compare",
                                            buttonMode: sap.m.MenuButtonMode.Split,
                                            useDefaultActionOnly: true,
                                            defaultAction(): void {
                                                that.fireViewEvents(that.viewDataEvent, that.table.getSelecteds(), "COMPARISON");
                                            },
                                            menu: new sap.m.Menu("", {
                                                items: [
                                                    new sap.m.MenuItem("", {
                                                        text: ibas.i18n.prop("initialfantasy_display_summary"),
                                                        icon: "sap-icon://comment",
                                                        press: function (): void {
                                                            that.fireViewEvents(that.viewDataEvent, that.table.getSelecteds(), "SUMMARY");
                                                        }
                                                    }),
                                                ],
                                            })
                                        }),
                                    ]
                                }),
                                content: [
                                    this.table,
                                ]
                            })
                        ],
                    });
                }
                private pageList: sap.extension.m.Page;
                private list: sap.extension.m.List;
                private table: sap.extension.table.Table;
                private inputBOKeys: sap.extension.m.Input;
                private inputModifyUser: sap.extension.m.Input;
                private inputDateFrom: sap.extension.m.DatePicker;
                private inputDateTo: sap.extension.m.DatePicker;
                private checkDeletedOnly: sap.m.CheckBox;
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
                /** 查询日志数据，参数：业务对象编码 */
                queryLogsts(boCode: string): void {
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.BOLogst.PROPERTY_BOCODE_NAME;
                    condition.value = boCode;
                    // 主键值筛选（支持拆合查询）
                    if (!ibas.strings.isEmpty(this.filterBOKeys)) {
                        condition = criteria.conditions.create();
                        condition.alias = bo.BOLogst.PROPERTY_BOKEYS_NAME;
                        condition.operation = ibas.emConditionOperation.CONTAIN;
                        condition.value = this.filterBOKeys;
                    }
                    // 修改用户筛选
                    if (this.filterModifyUser > 0) {
                        condition = criteria.conditions.create();
                        condition.alias = bo.BOLogst.PROPERTY_MODIFYUSER_NAME;
                        condition.value = this.filterModifyUser.toString();
                    }
                    // 修改日期筛选（从）
                    if (!ibas.objects.isNull(this.filterDateFrom)) {
                        condition = criteria.conditions.create();
                        condition.alias = bo.BOLogst.PROPERTY_MODIFYDATE_NAME;
                        condition.operation = ibas.emConditionOperation.GREATER_EQUAL;
                        condition.value = ibas.dates.toString(this.filterDateFrom);
                    }
                    // 修改日期筛选（到）
                    if (!ibas.objects.isNull(this.filterDateTo)) {
                        condition = criteria.conditions.create();
                        condition.alias = bo.BOLogst.PROPERTY_MODIFYDATE_NAME;
                        condition.operation = ibas.emConditionOperation.LESS_EQUAL;
                        condition.value = ibas.dates.toString(this.filterDateTo);
                    }
                    // 仅删除筛选
                    if (this.filterDeletedOnly === true) {
                        condition = criteria.conditions.create();
                        condition.alias = bo.BOLogst.PROPERTY_CAUSE_NAME;
                        condition.value = "DELETED";
                    }
                    // 排序：使用TransactionId（UUID v7，具有时间顺序）为主排序，LogInst为次排序
                    // 确保排序字段与分页游标一致，避免分页时遗漏数据
                    let sort: ibas.ISort = criteria.sorts.create();
                    sort.alias = bo.BOLogst.PROPERTY_TRANSACTIONID_NAME;
                    sort.sortType = ibas.emSortType.DESCENDING;
                    sort = criteria.sorts.create();
                    sort.alias = bo.BOLogst.PROPERTY_LOGINST_NAME;
                    sort.sortType = ibas.emSortType.DESCENDING;
                    // 分页，一次查询30条
                    criteria.result = 30;
                    this.lastLogstCriteria = criteria;
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.table.setModel(null);
                    }
                    this.fireViewEvents(this.fetchLogstEvent, criteria);
                }
                /** 筛选-主键值 */
                get filterBOKeys(): string {
                    return this.inputBOKeys.getValue();
                }
                set filterBOKeys(value: string) {
                    this.inputBOKeys.setValue(value);
                }
                /** 筛选-修改日期（从） */
                get filterDateFrom(): Date {
                    return this.inputDateFrom.getDateValue();
                }
                set filterDateFrom(value: Date) {
                    this.inputDateFrom.setDateValue(value);
                }
                /** 筛选-修改日期（到） */
                get filterDateTo(): Date {
                    return this.inputDateTo.getDateValue();
                }
                set filterDateTo(value: Date) {
                    this.inputDateTo.setDateValue(value);
                }
                /** 筛选-仅删除 */
                get filterDeletedOnly(): boolean {
                    return this.checkDeletedOnly.getSelected();
                }
                set filterDeletedOnly(value: boolean) {
                    this.checkDeletedOnly.setSelected(value);
                }
                /** 筛选-修改用户 */
                get filterModifyUser(): number {
                    let value: any = this.inputModifyUser.getSelectedKey();
                    if (ibas.strings.isEmpty(value)) {
                        return 0;
                    }
                    return parseInt(value, 10);
                }
                set filterModifyUser(value: number) {
                    if (value > 0) {
                        this.inputModifyUser.setSelectedKey(value.toString());
                    } else {
                        this.inputModifyUser.setValue("");
                    }
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
                /** 显示数据 */
                showData(datas: bo.BOLogst[], append: boolean): void {
                    if (append === true) {
                        // 追加数据（分页加载）
                        let model: sap.ui.model.Model = this.table.getModel();
                        if (model instanceof sap.extension.model.JSONModel) {
                            model.addData(datas);
                        } else {
                            this.table.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                        }
                    } else {
                        // 替换数据（初始查询）
                        this.table.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.table.setBusy(false);
                }
                /** 显示内容对话框 */
                private showContentDialog(data: bo.BOLogst): void {
                    let content: any = data.content;
                    if (ibas.objects.isNull(content)) {
                        return;
                    }
                    let jsonText: string;
                    if (typeof content === "string") {
                        try {
                            jsonText = JSON.stringify(JSON.parse(content.replace(/[\u0000-\u001F\u007F]/g, "")), null, 2);
                        } catch (error) {
                            jsonText = content;
                        }
                    } else {
                        try {
                            jsonText = JSON.stringify(content, null, 2);
                        } catch (error) {
                            jsonText = String(content);
                        }
                    }
                    jQuery.sap.require("sap.ui.codeeditor.CodeEditor");
                    let dialog: sap.m.Dialog = new sap.m.Dialog("", {
                        customHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.ToolbarSpacer(),
                                new sap.m.Title("", {
                                    text: ibas.strings.format("{0} - {1}", ibas.i18n.prop("bo_bologst_content"), data.logInst)
                                }),
                                new sap.m.ToolbarSpacer(),
                                new sap.m.Button("", {
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://decline",
                                    press: function (): void {
                                        dialog.close();
                                    }
                                })
                            ]
                        }),
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        contentHeight: "60%",
                        contentWidth: "60%",
                        verticalScrolling: false,
                        horizontalScrolling: false,
                        content: [
                            new sap.ui.codeeditor.CodeEditor("", {
                                height: "100%",
                                width: "100%",
                                type: "json",
                                colorTheme: "eclipse",
                                valueSelection: true,
                                syntaxHints: true,
                                lineNumbers: true,
                            }).setValue(jsonText)
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                icon: "sap-icon://inspect-down",
                                press: function (): void {
                                    dialog.close();
                                    dialog = null;
                                }
                            }),
                        ],
                        afterOpen(this: sap.m.Dialog): void {
                            setTimeout(() => {
                                let codeEditor: any = this.getContent()[0];
                                if (codeEditor instanceof sap.ui.codeeditor.CodeEditor) {
                                    codeEditor.prettyPrint();
                                }
                            }, 150);
                        }
                    }).addStyleClass("sapUiNoContentPadding").open();
                }
            }
        }
    }
}
