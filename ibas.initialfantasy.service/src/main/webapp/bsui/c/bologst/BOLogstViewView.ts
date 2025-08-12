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
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("initialfantasy_display_summary"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://comment",
                                    press(): void {
                                        that.showSummaryDifferent();
                                    }
                                }),
                            ]
                        }),
                    });
                }

                private splitter: sap.ui.layout.Splitter;

                private template: sap.ui.core.Control;

                drawView(template: app.outs.BOType): void {
                    this.template = this.createView(template);
                }
                createView(template: app.outs.BOType, root: boolean = true): sap.m.Panel {
                    let list: sap.m.List = new sap.m.List();
                    for (let pty of template.properties) {
                        if (pty instanceof app.outs.BOTypePropertyDate) {
                            list.addItem(new sap.m.StandardListItem("", {
                                tooltip: ibas.strings.format("{0}: {1}", pty.name, pty.type.name),
                                title: pty.description,
                                info: {
                                    path: root ? ibas.strings.format("/{0}", pty.name) : pty.name,
                                    type: new sap.extension.data.Date()
                                }
                            }));
                        } else if (pty instanceof app.outs.BOTypePropertyTime) {
                            list.addItem(new sap.m.StandardListItem("", {
                                tooltip: ibas.strings.format("{0}: {1}", pty.name, pty.type.name),
                                title: pty.description,
                                info: {
                                    path: root ? ibas.strings.format("/{0}", pty.name) : pty.name,
                                    type: new sap.extension.data.Time()
                                }
                            }));
                        } else if (pty instanceof app.outs.BOTypePropertyDecimal) {
                            list.addItem(new sap.m.StandardListItem("", {
                                tooltip: ibas.strings.format("{0}: {1}", pty.name, pty.type.name),
                                title: pty.description,
                                info: {
                                    path: root ? ibas.strings.format("/{0}", pty.name) : pty.name,
                                    type: new sap.extension.data.Decimal()
                                }
                            }));
                        } else if (pty instanceof app.outs.BOTypePropertyNumeric) {
                            list.addItem(new sap.m.StandardListItem("", {
                                tooltip: ibas.strings.format("{0}: {1}", pty.name, pty.type.name),
                                title: pty.description,
                                info: {
                                    path: root ? ibas.strings.format("/{0}", pty.name) : pty.name,
                                    type: new sap.extension.data.Numeric()
                                }
                            }));
                        } else if (pty instanceof app.outs.BOTypePropertyString) {
                            list.addItem(new sap.m.StandardListItem("", {
                                tooltip: ibas.strings.format("{0}: {1}", pty.name, pty.type.name),
                                title: pty.description,
                                info: {
                                    path: root ? ibas.strings.format("/{0}", pty.name) : pty.name,
                                    type: new sap.extension.data.Alphanumeric()
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
                                                            type: new sap.extension.data.Date(),
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
                private systemProperties: string = "LogInst,ObjectCode,Series,DataSource,CreateActionId,UpdateActionId,Referenced,VisOrder,UpdateDate,UpdateTime,";

                private markDifferent(panel: any, count: number): void {
                    let ignoreSystem: boolean = this.ignoreSystem.getSelected();
                    let onlyCheck: boolean = this.onlyCheck.getSelected();
                    if (panel instanceof sap.m.Panel) {
                        for (let pItem of panel.getContent()) {
                            if (pItem instanceof sap.m.List) {
                                for (let lItem of pItem.getItems()) {
                                    if (lItem instanceof sap.m.StandardListItem) {
                                        let same: boolean = true;
                                        let value: any = lItem.getInfo();
                                        let group: string = lItem.getId();
                                        if (group.lastIndexOf("__item") > 0) {
                                            // __item245-0-__item297-0-1; __item192-0
                                            // __item245-1-__item297-1-1; __item192-1
                                            let builder: ibas.StringBuilder = new ibas.StringBuilder();
                                            builder.map(null, "");
                                            builder.map(undefined, "");
                                            for (let sItem of group.split("__")) {
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
                                            group = builder.toString();
                                        } else {
                                            group = group.substring(0, group.lastIndexOf("-")) + "-{0}";
                                        }
                                        for (let index: number = 1; index < count; index++) {
                                            let tmpItem: any = sap.ui.getCore().byId(ibas.strings.format(group, index));
                                            if (tmpItem instanceof sap.m.StandardListItem) {
                                                if (tmpItem.getInfo() !== value) {
                                                    same = false;
                                                }
                                            }
                                        }
                                        if (same === false) {
                                            for (let index: number = 0; index < count; index++) {
                                                let tmpItem: any = sap.ui.getCore().byId(ibas.strings.format(group, index));
                                                if (tmpItem instanceof sap.m.StandardListItem) {
                                                    tmpItem.setHighlight(sap.ui.core.MessageType.Error);
                                                }
                                            }
                                        }
                                        if (onlyCheck === true) {
                                            for (let index: number = 0; index < count; index++) {
                                                let tmpItem: any = sap.ui.getCore().byId(ibas.strings.format(group, index));
                                                if (tmpItem instanceof sap.m.StandardListItem) {
                                                    if (ignoreSystem === true
                                                        && this.systemProperties.indexOf(String(tmpItem.getTooltip()).split(": ")[0] + ",") >= 0) {
                                                        tmpItem.setVisible(false);
                                                    } else if (same === false) {
                                                        tmpItem.setVisible(true);
                                                    } else {
                                                        tmpItem.setVisible(false);
                                                    }
                                                }
                                            }
                                        } else {
                                            for (let index: number = 0; index < count; index++) {
                                                let tmpItem: any = sap.ui.getCore().byId(ibas.strings.format(group, index));
                                                if (tmpItem instanceof sap.m.StandardListItem) {
                                                    if (ignoreSystem === true
                                                        && this.systemProperties.indexOf(String(tmpItem.getTooltip()).split(": ")[0] + ",") >= 0) {
                                                        tmpItem.setVisible(false);
                                                    } else {
                                                        tmpItem.setVisible(true);
                                                    }
                                                }
                                            }
                                        }
                                    } else if (lItem instanceof sap.m.CustomListItem) {
                                        for (let cItem of lItem.getContent()) {
                                            this.markDifferent(cItem, count);
                                        }
                                    }
                                }
                                /*
                                let group: string = pItem.getId();
                                if (group.indexOf("__list") >= 0) {
                                    group = group.substring(0, group.indexOf("-")) + "-{0}";
                                    for (let index: number = 1; index < count; index++) {
                                        let tmpItem: any = sap.ui.getCore().byId(ibas.strings.format(group, index));
                                        if (tmpItem instanceof sap.m.List) {
                                            if (tmpItem.getItems().find(c => c.getVisible() === true)) {
                                                tmpItem.setVisible(true);
                                            } else {
                                                tmpItem.setVisible(false);
                                            }
                                        }
                                    }
                                }
                                */
                            }
                        }
                    }
                }
                private showSummaryDifferent(): void {
                    let content: ibas.ArrayList<any>
                        = this.summaryDifferent(sap.ui.getCore().byId(ibas.strings.format("{0}-{1}", this.template.getId(), 0)), this.splitter.getContentAreas().length);
                    let table: sap.m.Table = new sap.extension.m.Table("", {
                        autoPopinMode: true,
                        columns: [
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_bologst_loginst"),
                                width: "5rem",
                                hAlign: sap.ui.core.TextAlign.Center,
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_bologst_modify_content"),
                                width: "10rem",
                                hAlign: sap.ui.core.TextAlign.Center,
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_bologst_before_modified"),
                                width: "100%",
                                hAlign: sap.ui.core.TextAlign.Center,
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_bologst_after_modified"),
                                width: "100%",
                                hAlign: sap.ui.core.TextAlign.Center,
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_bologst_modifyuser"),
                                width: "8rem",
                                hAlign: sap.ui.core.TextAlign.Center,
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_bologst_modifytime"),
                                width: "8rem",
                                hAlign: sap.ui.core.TextAlign.Center,
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
                    (<sap.m.Page>this.splitter.getParent()).setShowFooter(false);
                }
                private summaryDifferent(panel: any, count: number): ibas.ArrayList<LogInstSummary> {
                    let ignoreSystem: boolean = this.ignoreSystem.getSelected();
                    let summaries: ibas.ArrayList<LogInstSummary> = new ibas.ArrayList<LogInstSummary>();
                    if (panel instanceof sap.m.Panel) {
                        for (let pItem of panel.getContent()) {
                            if (pItem instanceof sap.m.List) {
                                for (let lItem of pItem.getItems()) {
                                    if (lItem instanceof sap.m.StandardListItem) {
                                        let same: boolean = true;
                                        let value: any = lItem.getInfo();
                                        let group: string = lItem.getId();
                                        if (group.lastIndexOf("__item") > 0) {
                                            // __item245-0-__item297-0-1; __item192-0
                                            // __item245-1-__item297-1-1; __item192-1
                                            let builder: ibas.StringBuilder = new ibas.StringBuilder();
                                            builder.map(null, "");
                                            builder.map(undefined, "");
                                            for (let sItem of group.split("__")) {
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
                                            group = builder.toString();
                                        } else {
                                            group = group.substring(0, group.lastIndexOf("-")) + "-{0}";
                                        }
                                        for (let index: number = 1; index < count; index++) {
                                            let tmpItem: any = sap.ui.getCore().byId(ibas.strings.format(group, index));
                                            if (tmpItem instanceof sap.m.StandardListItem) {
                                                if (tmpItem.getInfo() !== value) {
                                                    same = false;
                                                }
                                            }
                                        }
                                        if (same === false) {
                                            let summary: LogInstSummary = null;
                                            for (let index: number = 0; index < count; index++) {
                                                let data: any = (<any>this.splitter.getContentAreas()[index].getModel()).getData();
                                                let tmpItem: any = sap.ui.getCore().byId(ibas.strings.format(group, index));
                                                if (tmpItem instanceof sap.m.StandardListItem) {
                                                    if (ignoreSystem === true
                                                        && this.systemProperties.indexOf(String(tmpItem.getTooltip()).split(": ")[0] + ",") >= 0) {
                                                        continue;
                                                    }
                                                    if (summary === null) {
                                                        summary = new LogInstSummary();
                                                        summary.logInst = data.LogInst;
                                                        summary.modifyDate = data.UpdateDate;
                                                        summary.modifyTime = data.UpdateTime;
                                                        summary.modifyUser = data.UpdateUserSign;
                                                        summary.modifyContent = tmpItem.getTitle();
                                                        summary.afterModified = tmpItem.getInfo();

                                                        summaries.add(summary);
                                                    } else {
                                                        summary.beforeModified = tmpItem.getInfo();
                                                        if (summary.beforeModified === summary.afterModified) {
                                                            summaries.remove(summary);
                                                        }
                                                        if (index < count - 1) {
                                                            let nSummary: LogInstSummary = new LogInstSummary();
                                                            nSummary.logInst = data.LogInst;
                                                            nSummary.modifyDate = data.UpdateDate;
                                                            nSummary.modifyTime = data.UpdateTime;
                                                            nSummary.modifyUser = data.UpdateUserSign;
                                                            nSummary.modifyContent = tmpItem.getTitle();
                                                            nSummary.afterModified = tmpItem.getInfo();

                                                            summaries.add(nSummary);
                                                            summary = nSummary;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } else if (lItem instanceof sap.m.CustomListItem) {
                                        for (let cItem of lItem.getContent()) {
                                            summaries.add(this.summaryDifferent(cItem, count));
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return summaries;
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
