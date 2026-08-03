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
            /** 查看视图-业务对象日志 */
            export class BOLogstViewView extends ibas.BOViewView implements app.IBOLogstViewView {
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return new sap.extension.m.Page("", {
                        showHeader: false,
                        /*
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                            ]
                        }),
                        */
                        content: [
                            this.splitter = new sap.ui.layout.Splitter("", {
                                orientation: sap.ui.core.Orientation.Horizontal,
                                contentAreas: [
                                ]
                            }),
                        ],
                        floatingFooter: true,
                        footer: new sap.m.Toolbar("", {
                            content: [
                                this.ignoreSystem = new sap.m.CheckBox("", {
                                    selected: true,
                                    text: ibas.i18n.prop("initialfantasy_ignore_system_content"),
                                    select: function (): void {
                                        that.markDifferent(sap.ui.getCore().byId(ibas.strings.format("{0}-{1}", that.template.getId(), 0)), that.splitter.getContentAreas().length);
                                    }
                                }),
                                this.onlyCheck = new sap.m.CheckBox("", {
                                    selected: true,
                                    text: ibas.i18n.prop("initialfantasy_only_modified_content"),
                                    select: function (): void {
                                        that.markDifferent(sap.ui.getCore().byId(ibas.strings.format("{0}-{1}", that.template.getId(), 0)), that.splitter.getContentAreas().length);
                                    }
                                }),
                                new sap.m.ToolbarSpacer(""),
                                this.btnToggle = new sap.m.Button("", {
                                    text: ibas.i18n.prop("initialfantasy_display_summary"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://comment",
                                    press(): void {
                                        if (that.isSummary) {
                                            that.showComparison();
                                        } else {
                                            that.showSummaryDifferent();
                                        }
                                    }
                                }),
                            ]
                        }),
                    });
                }

                private splitter: sap.ui.layout.Splitter;
                private template: sap.ui.core.Control;
                private boTemplate: app.outs.BOType;
                private btnToggle: sap.m.Button;
                private viewDatas: object[];
                private isSummary: boolean = false;

                drawView(template: app.outs.BOType): void {
                    this.boTemplate = template;
                    this.template = this.createView(template);
                }
                createView(template: app.outs.BOType, root: boolean = true): sap.m.Panel {
                    let list: sap.m.List = new sap.m.List("", {
                        showNoData: false,
                    });
                    for (let pty of template.properties) {
                        let dataType: any = this.getPropertyDataType(pty);
                        if (dataType !== null) {
                            list.addItem(new sap.m.StandardListItem("", {
                                tooltip: ibas.strings.format("{0}: {1}", pty.name, pty.type.name),
                                title: pty.description,
                                info: {
                                    path: root ? ibas.strings.format("/{0}", pty.name) : pty.name,
                                    type: dataType
                                }
                            }));
                        } else if (pty instanceof app.outs.BOTypePropertyArray) {
                            let subList: sap.m.Panel = this.createView(pty.type, false);
                            list.addItem(new sap.m.CustomListItem("", {
                                tooltip: ibas.strings.format("{0}: {1}", pty.name, pty.type.name),
                                content: {
                                    path: root ? ibas.strings.format("/{0}", pty.name) : pty.name,
                                    templateShareable: false,
                                    template: subList,
                                }
                            }));
                        } else if (pty instanceof app.outs.BOTypePropertyObject) {
                            list.addItem(new sap.m.CustomListItem("", {
                                tooltip: ibas.strings.format("{0}: {1}", pty.name, pty.type.name),
                                content: [
                                    this.createView(pty.type, false)
                                ]
                            }));
                        }
                    }
                    let panel: sap.m.Panel = new sap.m.Panel("", {
                        height: "100%",
                        expandable: true,
                        expanded: true,
                        backgroundDesign: sap.m.BackgroundDesign.Transparent,
                        accessibleRole: sap.m.PanelAccessibleRole.Region,
                        headerToolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Label("", {
                                    text: template.description
                                }),
                                new sap.m.ToolbarSpacer(),
                                new sap.m.Label("", {
                                    text: {
                                        parts: [
                                            {
                                                path: (root ? "/" : "") + "LineId",
                                            },
                                            {
                                                path: (root ? "/" : "") + "ObjectKey",
                                            },
                                            {
                                                path: (root ? "/" : "") + "Code",
                                            },
                                            {
                                                path: (root ? "/" : "") + "DocEntry",
                                            }
                                        ],
                                        formatter(lineId: number, objectKey: number, code: string, docEntry: number): string {
                                            if (lineId > 0) {
                                                return ibas.strings.format("{0}: {1}", ibas.i18n.prop("bo_bologst_lineid"), lineId);
                                            } else if (objectKey > 0) {
                                                return ibas.strings.format("{0}: {1}", ibas.i18n.prop("bo_bologst_objectkey"), objectKey);
                                            } else if (typeof code === "string" && !ibas.strings.isEmpty(code)) {
                                                return ibas.strings.format("{0}: {1}", ibas.i18n.prop("bo_bologst_code"), code);
                                            } else if (docEntry > 0) {
                                                return ibas.strings.format("{0}: {1}", ibas.i18n.prop("bo_bologst_docentry"), docEntry);
                                            }
                                            return "";
                                        }
                                    }
                                }).addStyleClass("sapUiSmallMarginEnd")
                            ]
                        }),
                        expand(event: sap.ui.base.Event): void {
                            let source: any = event.getSource();
                            if (source instanceof sap.m.Panel) {
                                for (let sItem of source.getContent()) {
                                    if (sItem instanceof sap.m.List) {
                                        for (let iItem of sItem.getItems()) {
                                            if (iItem instanceof sap.m.CustomListItem) {
                                                for (let cItem of iItem.getContent()) {
                                                    if (cItem instanceof sap.m.Panel) {
                                                        cItem.setExpanded(source.getExpanded());
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        content: [
                            list
                        ]
                    });
                    return panel;
                }
                showData(datas: object[], summary?: boolean): void {
                    this.viewDatas = datas;
                    this.isSummary = summary === true;
                    this.splitter.destroyContentAreas();
                    for (let data of datas) {
                        let view: sap.ui.layout.Splitter = new sap.ui.layout.Splitter("", {
                            height: "100%",
                            contentAreas: [
                                new sap.m.Page("", {
                                    showHeader: false,
                                    subHeader: new sap.m.Toolbar("", {
                                        content: [
                                            new sap.m.Label("", {
                                                text: ibas.i18n.prop("bo_bologst_loginst"),
                                                showColon: true,
                                            }).addStyleClass("sapUiTinyMarginStart"),
                                            new sap.m.Text("", {
                                                text: {
                                                    path: "/LogInst",
                                                },
                                            }).addStyleClass("sapUiTinyMarginEnd"),
                                            new sap.m.ToolbarSpacer(),
                                            new sap.m.Label("", {
                                                text: ibas.i18n.prop("bo_bologst_modifytime"),
                                                showColon: true,
                                            }).addStyleClass("sapUiTinyMarginStart"),
                                            new sap.m.Text("", {
                                                text: {
                                                    parts: [
                                                        {
                                                            path: "/UpdateDate",
                                                            type: new sap.extension.data.Date({
                                                                format: "yyyy-MM-dd"
                                                            }),
                                                        }, {
                                                            path: "/UpdateTime",
                                                            type: new sap.extension.data.Time(),
                                                        }
                                                    ]
                                                },
                                            }).addStyleClass("sapUiTinyMarginEnd"),
                                            new sap.m.Label("", {
                                                text: ibas.i18n.prop("bo_bologst_modifyuser"),
                                                showColon: true,
                                            }).addStyleClass("sapUiTinyMarginStart"),
                                            new sap.extension.m.UserText("", {
                                                bindingValue: {
                                                    path: "/UpdateUserSign",
                                                    type: new sap.extension.data.Numeric(),
                                                }
                                            }).addStyleClass("sapUiTinyMarginEnd"),
                                        ]
                                    }),
                                    content: [
                                        this.template.clone(datas.indexOf(data).toString()
                                            , undefined, { cloneChildren: true, cloneBindings: true })
                                    ]
                                })
                            ]
                        });
                        view.setModel(new sap.extension.model.JSONModel(data));
                        this.splitter.addContentArea(view);
                    }
                    setTimeout(() => {
                        if (summary === true) {
                            this.showSummaryDifferent();
                        } else {
                            this.markDifferent(sap.ui.getCore().byId(ibas.strings.format("{0}-{1}", this.template.getId(), 0)), datas.length);
                        }
                    }, 600);
                }

                private onlyCheck: sap.m.CheckBox;
                private ignoreSystem: sap.m.CheckBox;
                private systemProperties: string[] = ["LogInst", "ObjectCode", "Series", "DataSource", "CreateActionId", "UpdateActionId", "Referenced", "VisOrder", "UpdateDate", "UpdateTime", "UpdateUserSign", "CreateDate", "CreateTime", "CreateUserSign"];

                /** 构建属性项的分组ID模板，用于匹配不同版本间的对应属性 */
                private buildGroupId(itemId: string): string {
                    if (itemId.lastIndexOf("__item") > 0) {
                        let builder: ibas.StringBuilder = new ibas.StringBuilder();
                        builder.map(null, "");
                        builder.map(undefined, "");
                        for (let sItem of itemId.split("__")) {
                            if (ibas.strings.isEmpty(sItem)) {
                                continue;
                            }
                            builder.append("__");
                            let index: number = sItem.indexOf("-");
                            if (index > 0) {
                                let temp: string = sItem.substring(0, index) + "-{0}";
                                if (sItem.indexOf("-", index + 1) > 0) {
                                    temp += sItem.substring(sItem.indexOf("-", index + 1));
                                }
                                builder.append(temp);
                            } else {
                                builder.append(sItem);
                            }
                        }
                        return builder.toString();
                    } else {
                        return itemId.substring(0, itemId.lastIndexOf("-")) + "-{0}";
                    }
                }
                /** 检查属性项在不同版本间是否存在差异 */
                private isItemSame(groupId: string, value: any, count: number): boolean {
                    let same: boolean = true;
                    for (let index: number = 1; index < count; index++) {
                        let tmpItem: any = sap.ui.getCore().byId(ibas.strings.format(groupId, index));
                        if (tmpItem instanceof sap.m.StandardListItem) {
                            if (!this.isValueEqual(tmpItem.getInfo(), value)) {
                                same = false;
                            }
                        } else if (ibas.objects.isNull(tmpItem)) {
                            same = false;
                        }
                    }
                    return same;
                }
                /** 判断属性项是否为系统属性 */
                private isSystemProperty(item: sap.m.StandardListItem): boolean {
                    return this.systemProperties.indexOf(String(item.getTooltip()).split(": ")[0]) >= 0;
                }
                /** 获取属性对应的数据类型 */
                private getPropertyDataType(pty: any): any {
                    if (pty instanceof app.outs.BOTypePropertyDate) { return new sap.extension.data.Date(); }
                    if (pty instanceof app.outs.BOTypePropertyTime) { return new sap.extension.data.Time(); }
                    if (pty instanceof app.outs.BOTypePropertyDecimal) { return new sap.extension.data.Decimal(); }
                    if (pty instanceof app.outs.BOTypePropertyNumeric) { return new sap.extension.data.Numeric(); }
                    if (pty instanceof app.outs.BOTypePropertyString) { return new sap.extension.data.Alphanumeric(); }
                    return null;
                }
                /** 更新面板可见性：有可见项则显示，否则隐藏 */
                private updatePanelVisibility(list: sap.m.List): void {
                    let hasVisible: boolean = list.getItems().some(
                        (c: any) => c.getVisible()
                            && (c instanceof sap.m.StandardListItem
                                || (c instanceof sap.m.CustomListItem && c.getContent()?.length > 0))
                    );
                    (<sap.m.Panel>list.getParent()).setVisible(hasVisible);
                }

                private markDifferent(panel: any, count: number): void {
                    let ignoreSystem: boolean = this.ignoreSystem.getSelected();
                    let onlyCheck: boolean = this.onlyCheck.getSelected();
                    if (panel instanceof sap.m.Panel) {
                        for (let pItem of panel.getContent()) {
                            if (pItem instanceof sap.m.List) {
                                let group: string;
                                for (let lItem of pItem.getItems()) {
                                    if (lItem instanceof sap.m.StandardListItem) {
                                        let value: any = lItem.getInfo();
                                        group = this.buildGroupId(lItem.getId());
                                        let same: boolean = this.isItemSame(group, value, count);
                                        if (same === false) {
                                            for (let index: number = 0; index < count; index++) {
                                                let tmpItem: any = sap.ui.getCore().byId(ibas.strings.format(group, index));
                                                if (tmpItem instanceof sap.m.StandardListItem) {
                                                    tmpItem.setHighlight(sap.ui.core.MessageType.Error);
                                                }
                                            }
                                        }
                                        for (let index: number = 0; index < count; index++) {
                                            let tmpItem: any = sap.ui.getCore().byId(ibas.strings.format(group, index));
                                            if (tmpItem instanceof sap.m.StandardListItem) {
                                                if (ignoreSystem === true && this.isSystemProperty(tmpItem)) {
                                                    tmpItem.setVisible(false);
                                                } else if (onlyCheck === true && same === true) {
                                                    tmpItem.setVisible(false);
                                                } else {
                                                    tmpItem.setVisible(true);
                                                }
                                            }
                                        }
                                    } else if (lItem instanceof sap.m.CustomListItem) {
                                        for (let cItem of lItem.getContent()) {
                                            this.markDifferent(cItem, count);
                                        }
                                    }
                                }
                                if (!ibas.strings.isEmpty(group)) {
                                    for (let index: number = 0; index < count; index++) {
                                        let tmpItem: any = sap.ui.getCore().byId(ibas.strings.format(group, index));
                                        if (tmpItem instanceof sap.m.StandardListItem) {
                                            let parent: any = tmpItem.getParent();
                                            if (parent instanceof sap.m.List) {
                                                this.updatePanelVisibility(parent);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    // 处理其他版本中多出的子行（版本0中不存在的行）
                    if (panel === sap.ui.getCore().byId(ibas.strings.format("{0}-{1}", this.template.getId(), 0))) {
                        this.markExtraRows(count);
                    }
                }
                /** 标记其他版本中多出的子行（在版本0中不存在的行） */
                private markExtraRows(count: number): void {
                    let ignoreSystem: boolean = this.ignoreSystem.getSelected();
                    for (let version: number = 1; version < count; version++) {
                        let versionPanel: any = sap.ui.getCore().byId(
                            ibas.strings.format("{0}-{1}", this.template.getId(), version));
                        this.markExtraRowsInPanel(versionPanel, count, ignoreSystem);
                    }
                }
                /** 在面板中查找并标记版本0中不存在的行 */
                private markExtraRowsInPanel(panel: any, count: number, ignoreSystem: boolean): void {
                    if (panel instanceof sap.m.Panel) {
                        for (let pItem of panel.getContent()) {
                            if (pItem instanceof sap.m.List) {
                                for (let lItem of pItem.getItems()) {
                                    if (lItem instanceof sap.m.StandardListItem) {
                                        let group: string = this.buildGroupId(lItem.getId());
                                        // 检查版本0中是否存在对应项
                                        let baseItem: any = sap.ui.getCore().byId(ibas.strings.format(group, 0));
                                        if (ibas.objects.isNull(baseItem)) {
                                            // 版本0中不存在，标记所有版本中对应的项为差异
                                            for (let index: number = 0; index < count; index++) {
                                                let tmpItem: any = sap.ui.getCore().byId(ibas.strings.format(group, index));
                                                if (tmpItem instanceof sap.m.StandardListItem) {
                                                    if (ignoreSystem === true && this.isSystemProperty(tmpItem)) {
                                                        tmpItem.setVisible(false);
                                                    } else {
                                                        tmpItem.setHighlight(sap.ui.core.MessageType.Error);
                                                        tmpItem.setVisible(true);
                                                    }
                                                }
                                            }
                                        }
                                    } else if (lItem instanceof sap.m.CustomListItem) {
                                        for (let cItem of lItem.getContent()) {
                                            this.markExtraRowsInPanel(cItem, count, ignoreSystem);
                                        }
                                    }
                                }
                                this.updatePanelVisibility(pItem);
                            }
                        }
                    }
                }
                private showSummaryDifferent(): void {
                    let content: ibas.ArrayList<LogInstSummary> = this.summaryDifferentByData();
                    let table: sap.m.Table = new sap.extension.m.Table("", {
                        autoPopinMode: true,
                        showNoData: false,
                        columns: [
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_bologst_loginst"),
                                width: "5rem",
                                hAlign: sap.ui.core.TextAlign.Center,
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_bologst_modify_content"),
                                width: "30%",
                                hAlign: sap.ui.core.TextAlign.Left,
                            }),
                            new sap.extension.m.Column("", {
                                width: "30%",
                                header: ibas.i18n.prop("bo_bologst_before_modified"),
                                hAlign: sap.ui.core.TextAlign.Center,
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_bologst_after_modified"),
                                width: "40%",
                                hAlign: sap.ui.core.TextAlign.Center,
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_bologst_modifyuser"),
                                width: "8rem",
                                hAlign: sap.ui.core.TextAlign.Left,
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_bologst_modifytime"),
                                width: "8rem",
                                hAlign: sap.ui.core.TextAlign.Left,
                            }),
                        ],
                        items: {
                            path: "/",
                            template: new sap.extension.m.ColumnListItem("", {
                                cells: [
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "logInst",
                                            type: new sap.extension.data.Numeric(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "modifyContent",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "beforeModified",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "afterModified",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                    new sap.extension.m.UserObjectAttribute("", {
                                        bindingValue: {
                                            path: "modifyUser",
                                            type: new sap.extension.data.Numeric(),
                                        },
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            parts: [
                                                {
                                                    path: "modifyDate",
                                                    type: new sap.extension.data.Date(),
                                                }, {
                                                    path: "modifyTime",
                                                    type: new sap.extension.data.Time(),
                                                }
                                            ]
                                        }
                                    }),
                                ]
                            }),
                        }

                    });
                    table.setModel(new sap.extension.model.JSONModel(content));
                    this.splitter.destroyContentAreas();
                    this.splitter.addContentArea(table);
                    // 切换为摘要模式：更新按钮文本，隐藏对比模式专属的复选框
                    this.isSummary = true;
                    this.btnToggle.setText(ibas.i18n.prop("initialfantasy_display_comparison"));
                    this.ignoreSystem.setVisible(false);
                    this.onlyCheck.setVisible(false);
                }
                /** 切换回对比视图 */
                private showComparison(): void {
                    this.isSummary = false;
                    this.btnToggle.setText(ibas.i18n.prop("initialfantasy_display_summary"));
                    this.ignoreSystem.setVisible(true);
                    this.onlyCheck.setVisible(true);
                    this.showData(this.viewDatas, false);
                }
                /** 基于数据驱动的差异对比，生成差异摘要 */
                private summaryDifferentByData(): ibas.ArrayList<LogInstSummary> {
                    let summaries: ibas.ArrayList<LogInstSummary> = new ibas.ArrayList<LogInstSummary>();
                    if (ibas.objects.isNull(this.viewDatas) || this.viewDatas.length < 2) {
                        return summaries;
                    }
                    let ignoreSystem: boolean = this.ignoreSystem.getSelected();
                    // viewDatas 按实例号降序排列（最新在前），逐对比较相邻版本
                    for (let i: number = 0; i < this.viewDatas.length - 1; i++) {
                        let currentData: any = this.viewDatas[i];
                        let previousData: any = this.viewDatas[i + 1];
                        this.compareData(currentData, previousData, this.boTemplate, "", summaries, ignoreSystem);
                    }
                    return summaries;
                }
                /** 获取子行的行标识与描述，优先级：LineId > ObjectKey > Code > DocEntry */
                private getRowInfo(row: any): { key: string; description: string } {
                    if (ibas.objects.isNull(row)) {
                        return { key: "", description: "" };
                    }
                    let keyFields: { field: string; label: string }[] = [
                        { field: "LineId", label: ibas.i18n.prop("bo_bologst_lineid") },
                        { field: "ObjectKey", label: ibas.i18n.prop("bo_bologst_objectkey") },
                        { field: "Code", label: ibas.i18n.prop("bo_bologst_code") },
                        { field: "DocEntry", label: ibas.i18n.prop("bo_bologst_docentry") },
                    ];
                    for (let { field, label } of keyFields) {
                        let value: any = ibas.objects.propertyValue(row, field, true);
                        if (value !== undefined && value !== null && value !== "" && value !== 0) {
                            return { key: field + ":" + value, description: ibas.strings.format("{0}: {1}", label, value) };
                        }
                    }
                    // 无标识字段，使用序列化的行数据作为键
                    return { key: "DATA:" + JSON.stringify(row), description: "" };
                }
                /** 格式化属性值用于摘要显示 */
                private formatValue(value: any): string {
                    if (value === undefined || value === null) {
                        return "";
                    }
                    if (value instanceof Date) {
                        return ibas.dates.toString(value);
                    }
                    return String(value);
                }
                /** 判断两个属性值是否相同（0、""与undefined、null等效） */
                private isValueEqual(a: any, b: any): boolean {
                    if (a === b) {
                        return true;
                    }
                    // 0、""、undefined、null 互相视为相等
                    if (this.isEmptyValue(a)) {
                        return this.isEmptyValue(b);
                    }
                    if (this.isEmptyValue(b)) {
                        return false;
                    }
                    return this.formatValue(a) === this.formatValue(b);
                }
                /** 判断值是否为空值（0、"0.000000"、""、undefined、null 等效） */
                private isEmptyValue(value: any): boolean {
                    if (value === undefined || value === null || value === "" || value === 0) {
                        return true;
                    }
                    // 字符串形式的0，如 "0"、"0.00"、"0.000000"
                    if (typeof value === "string") {
                        let num: number = parseFloat(value);
                        if (!isNaN(num) && num === 0) {
                            return true;
                        }
                    }
                    return false;
                }
                /** 创建差异摘要 */
                private createSummary(currentData: any, modifyContent: string, beforeModified: string, afterModified: string): LogInstSummary {
                    let summary: LogInstSummary = new LogInstSummary();
                    summary.logInst = currentData.LogInst;
                    summary.modifyDate = currentData.UpdateDate;
                    summary.modifyTime = currentData.UpdateTime;
                    summary.modifyUser = currentData.UpdateUserSign;
                    summary.modifyContent = modifyContent;
                    summary.beforeModified = beforeModified;
                    summary.afterModified = afterModified;
                    return summary;
                }
                /** 比较两个数据对象的属性差异 */
                private compareData(
                    currentData: any, previousData: any,
                    template: app.outs.BOType, parentDesc: string,
                    summaries: ibas.ArrayList<LogInstSummary>, ignoreSystem: boolean
                ): void {
                    if (ibas.objects.isNull(template)) {
                        return;
                    }
                    for (let pty of template.properties) {
                        if (ignoreSystem === true && this.systemProperties.indexOf(pty.name) >= 0) {
                            continue;
                        }
                        let ptyDesc: string = ibas.strings.isEmpty(parentDesc)
                            ? pty.description : parentDesc + " - " + pty.description;
                        if (pty instanceof app.outs.BOTypePropertyArray) {
                            // 子对象数组，按键匹配行
                            let currentRows: any[] = this.getArrayData(currentData, pty.name);
                            let previousRows: any[] = this.getArrayData(previousData, pty.name);
                            this.compareArray(currentRows, previousRows, pty.type, ptyDesc,
                                currentData, summaries, ignoreSystem);
                        } else if (pty instanceof app.outs.BOTypePropertyObject) {
                            // 子对象（非数组），递归比较
                            let currentChild: any = ibas.objects.propertyValue(currentData, pty.name, true);
                            let previousChild: any = ibas.objects.propertyValue(previousData, pty.name, true);
                            if (!ibas.objects.isNull(currentChild) && !ibas.objects.isNull(previousChild)) {
                                this.compareData(currentChild, previousChild, pty.type, ptyDesc, summaries, ignoreSystem);
                            } else if (!ibas.objects.isNull(currentChild) || !ibas.objects.isNull(previousChild)) {
                                // 子对象在一个版本存在，在另一个版本不存在
                                summaries.add(this.createSummary(currentData, ptyDesc,
                                    ibas.objects.isNull(previousChild) ? "" : this.formatRowContent(previousChild, pty.type, ignoreSystem),
                                    ibas.objects.isNull(currentChild) ? "" : this.formatRowContent(currentChild, pty.type, ignoreSystem)
                                ));
                            }
                        } else {
                            // 简单属性，直接比较值
                            let currentValue: any = ibas.objects.propertyValue(currentData, pty.name, true);
                            let previousValue: any = ibas.objects.propertyValue(previousData, pty.name, true);
                            if (!this.isValueEqual(currentValue, previousValue)) {
                                summaries.add(this.createSummary(currentData, ptyDesc,
                                    this.formatValue(previousValue), this.formatValue(currentValue)));
                            }
                        }
                    }
                }
                /** 获取对象中的数组属性 */
                private getArrayData(data: any, propertyName: string): any[] {
                    if (ibas.objects.isNull(data)) {
                        return [];
                    }
                    let value: any = ibas.objects.propertyValue(data, propertyName, true);
                    if (value instanceof Array) {
                        return value;
                    }
                    return [];
                }
                /** 比较子对象数组的差异，按键匹配行 */
                private compareArray(
                    currentRows: any[], previousRows: any[],
                    childType: app.outs.BOType, parentDesc: string,
                    currentData: any,
                    summaries: ibas.ArrayList<LogInstSummary>, ignoreSystem: boolean
                ): void {
                    // 构建行映射：键 -> 行数据
                    let currentMap: { [key: string]: any } = {};
                    let previousMap: { [key: string]: any } = {};
                    for (let row of currentRows) { currentMap[this.getRowInfo(row).key] = row; }
                    for (let row of previousRows) { previousMap[this.getRowInfo(row).key] = row; }
                    // 检查新增和修改的行
                    for (let row of currentRows) {
                        let info: { key: string; description: string } = this.getRowInfo(row);
                        let fullDesc: string = ibas.strings.isEmpty(info.description)
                            ? parentDesc : parentDesc + " (" + info.description + ")";
                        if (previousMap[info.key]) {
                            // 行在两个版本中都存在，递归比较属性
                            this.compareData(row, previousMap[info.key], childType, fullDesc, summaries, ignoreSystem);
                        } else {
                            // 新增行
                            summaries.add(this.createSummary(currentData,
                                fullDesc + " - " + ibas.i18n.prop("initialfantasy_new_row"),
                                "", this.formatRowContent(row, childType, ignoreSystem)));
                        }
                    }
                    // 检查删除的行
                    for (let row of previousRows) {
                        let info: { key: string; description: string } = this.getRowInfo(row);
                        if (!currentMap[info.key]) {
                            let fullDesc: string = ibas.strings.isEmpty(info.description)
                                ? parentDesc : parentDesc + " (" + info.description + ")";
                            summaries.add(this.createSummary(currentData,
                                fullDesc + " - " + ibas.i18n.prop("initialfantasy_deleted_row"),
                                this.formatRowContent(row, childType, ignoreSystem), ""));
                        }
                    }
                }
                /** 格式化行内容用于摘要显示 */
                private formatRowContent(row: any, childType: app.outs.BOType, ignoreSystem: boolean): string {
                    if (ibas.objects.isNull(row) || ibas.objects.isNull(childType)) {
                        return "";
                    }
                    let builder: ibas.StringBuilder = new ibas.StringBuilder();
                    for (let pty of childType.properties) {
                        if (ignoreSystem === true && this.systemProperties.indexOf(pty.name) >= 0) {
                            continue;
                        }
                        let value: any = ibas.objects.propertyValue(row, pty.name, true);
                        if (value === undefined || value === null || value === "") {
                            continue;
                        }
                        if (builder.length > 0) {
                            builder.append("; ");
                        }
                        builder.append(pty.description + ": " + this.formatValue(value));
                    }
                    return builder.toString();
                }
            }
            class LogInstSummary {
                key: string;
                logInst: number;
                modifyContent: string;
                beforeModified: string;
                afterModified: string;
                modifyUser: string;
                modifyTime: string;
                modifyDate: string;
            }
        }
    }
}
