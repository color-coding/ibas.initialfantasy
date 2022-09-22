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
                                layoutData: new sap.ui.layout.SplitterLayoutData("", {
                                    resizable: false,
                                }),
                                contentAreas: [
                                ]
                            }),
                        ]
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
                        expandable: true,
                        expanded: root ? true : false,
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
                        content: [
                            list
                        ]
                    });
                    return panel;
                }
                showData(datas: object[]): void {
                    this.splitter.destroyContentAreas();
                    for (let data of datas) {
                        let view: sap.ui.layout.Splitter = new sap.ui.layout.Splitter("", {
                            contentAreas: [
                                new sap.m.Page("", {
                                    showHeader: false,
                                    subHeader: new sap.m.Toolbar("", {
                                        content: [
                                            new sap.m.Title("", {
                                                text: {
                                                    path: "/LogInst",
                                                    formatter(logInst: number): string {
                                                        if (logInst > 0) {
                                                            return ibas.strings.format("{0}: {1}", ibas.i18n.prop("bo_bologst_loginst"), logInst);
                                                        }
                                                        return "";
                                                    }
                                                }
                                            }).addStyleClass("sapUiTinyMarginBegin sapUiTinyMarginEnd"),
                                            new sap.m.Label("", {
                                                text: {
                                                    path: "/UpdateDate",
                                                    type: new sap.extension.data.Date(),
                                                }
                                            }),
                                            new sap.m.Label("", {
                                                text: {
                                                    path: "/UpdateTime",
                                                    type: new sap.extension.data.Time(),
                                                }
                                            }),
                                            new sap.m.ToolbarSpacer(),
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
                        setTimeout(() => {
                            this.markDifferent(sap.ui.getCore().byId(ibas.strings.format("{0}-{1}", this.template.getId(), 0)), datas.length);
                        }, 600);
                    }
                }

                private markDifferent(panel: any, count: number): void {
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
                                    } else if (lItem instanceof sap.m.CustomListItem) {
                                        for (let cItem of lItem.getContent()) {
                                            this.markDifferent(cItem, count);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            }
        }
    }
}
