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
             * 视图-单据流程服务
             */
            export class DocumentProcessServiceView extends ibas.View implements app.IDocumentProcessServiceView {
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return new sap.extension.m.Page("", {
                        showHeader: false,
                        content: [
                            this.splitter = new sap.ui.layout.Splitter("", {
                                orientation: sap.ui.core.Orientation.Horizontal,
                                layoutData: new sap.ui.layout.SplitterLayoutData("", {
                                    resizable: false,
                                }),
                            })
                        ]
                    });
                }
                private splitter: sap.ui.layout.Splitter;
                /** 显示数据 */
                showDocumentChain(data: app.DocumentChain): void {
                    this.splitter.removeAllContentAreas();
                    this.splitter.addContentArea(new sap.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Title("", {
                                    text: ibas.i18n.prop("initialfantasy_document_origin")
                                }).addStyleClass("sapUiTinyMarginBegin sapUiTinyMarginEnd")
                            ]
                        }),
                        content: [
                            this.createCard(data.data)
                        ]
                    }).addStyleClass("sapUiContentPadding"));
                    let sourceDepth: number = this.getSourceMaxDepth(data);
                    this.currentDepth = sourceDepth;
                    let targetDepth: number = this.getTargetsMaxDepth(data);
                    for (let i: number = 0; i < sourceDepth; i++) {
                        this.splitter.insertContentArea(new sap.m.Page("", {
                            showHeader: false,
                            subHeader: new sap.m.Toolbar("", {
                                content: [
                                    new sap.m.Title("", {
                                        text: ibas.i18n.prop("initialfantasy_document_source")
                                    }).addStyleClass("sapUiTinyMarginBegin sapUiTinyMarginEnd")
                                ]
                            }),
                        }).addStyleClass("sapUiContentPadding"), 0);
                    }
                    for (let i: number = 0; i < targetDepth; i++) {
                        this.splitter.addContentArea(new sap.m.Page("", {
                            showHeader: false,
                            subHeader: new sap.m.Toolbar("", {
                                content: [
                                    new sap.m.Title("", {
                                        text: ibas.i18n.prop("initialfantasy_document_target")
                                    }).addStyleClass("sapUiTinyMarginBegin sapUiTinyMarginEnd")
                                ]
                            }),
                        }).addStyleClass("sapUiContentPadding"));
                    }
                    this.insertSourceProcess(data);
                    this.insertTargetsProcess(data);
                }
                private currentDepth: number = 0;
                insertSourceProcess(data: app.DocumentChain, depth: number = 1): void {
                    if (!data) {
                        return;
                    }
                    if (data.sources.length === 0) {
                        return;
                    }
                    let box: sap.m.Page = <sap.m.Page>this.splitter.getContentAreas()[this.currentDepth - depth];
                    for (let node of data.sources) {
                        box.addContent(this.createCard(node.data));
                    }
                    depth++;
                    for (let node of data.sources) {
                        this.insertSourceProcess(node, depth);
                    }
                }
                insertTargetsProcess(data: app.DocumentChain, depth: number = 1): void {
                    if (!data) {
                        return;
                    }
                    if (data.targets.length === 0) {
                        return;
                    }
                    let box: sap.m.Page = <sap.m.Page>this.splitter.getContentAreas()[this.currentDepth + depth];
                    for (let node of data.targets) {
                        box.addContent(this.createCard(node.data));
                    }
                    depth++;
                    for (let node of data.targets) {
                        this.insertTargetsProcess(node, depth);
                    }
                }

                getSourceMaxDepth(root: app.DocumentChain, currentDepth: number = 0): number {
                    if (!root) {
                        return currentDepth;
                    }
                    let maxDepth: number = currentDepth;
                    for (let node of root.sources) {
                        maxDepth = Math.max(maxDepth, this.getSourceMaxDepth(node, currentDepth + 1));
                    }
                    return maxDepth;
                }
                getTargetsMaxDepth(root: app.DocumentChain, currentDepth: number = 0): number {
                    if (!root) {
                        return currentDepth;
                    }
                    let maxDepth: number = currentDepth;
                    for (let node of root.targets) {
                        maxDepth = Math.max(maxDepth, this.getTargetsMaxDepth(node, currentDepth + 1));
                    }
                    return maxDepth;
                }

                private createCard(data: ibas.IBODocument): sap.f.Card {
                    let list: sap.m.List = new sap.m.List("", {
                        showNoData: false,
                    });
                    if ((<any>data).canceled === ibas.emYesNo.YES) {
                        list.addItem(new sap.m.StandardListItem("", {
                            title: ibas.i18n.prop("initialfantasy_document_status"),
                            info: ibas.i18n.prop("shell_data_cancel"),
                            infoState: sap.ui.core.ValueState.Error
                        }));
                    } else if ((<any>data).approvalStatus === ibas.emApprovalStatus.PROCESSING
                        || (<any>data).approvalStatus === ibas.emApprovalStatus.REJECTED
                        || (<any>data).approvalStatus === ibas.emApprovalStatus.RETURNED) {
                        list.addItem(new sap.m.StandardListItem("", {
                            title: ibas.i18n.prop("initialfantasy_document_status"),
                            info: ibas.enums.describe(ibas.emApprovalStatus, (<any>data).approvalStatus),
                            infoState: sap.ui.core.ValueState.Warning
                        }));
                    } else {
                        list.addItem(new sap.m.StandardListItem("", {
                            title: ibas.i18n.prop("initialfantasy_document_status"),
                            info: ibas.enums.describe(ibas.emDocumentStatus, data.documentStatus),
                            infoState: sap.extension.data.status(data.documentStatus, undefined, undefined)
                        }));
                    }
                    list.addItem(new sap.m.StandardListItem("", {
                        title: ibas.i18n.prop("initialfantasy_document_date"),
                        info: ibas.dates.toString(data.documentDate, "yyyy-MM-dd")
                    }));
                    return new sap.f.Card("", {
                        width: "100%",
                        header: new sap.f.cards.Header("", {
                            title: ibas.businessobjects.resource(ibas.objects.nameOf(data)),
                            subtitle: ibas.strings.format("# {0}", data.docEntry),
                            iconSrc: "sap-icon://document-text",
                            press(): void {
                                ibas.servicesManager.runLinkService({
                                    boCode: ibas.objects.propertyValue(data, "ObjectCode"),
                                    linkValue: String(data.docEntry)
                                });
                            }
                        }),
                        content: [
                            list
                        ]
                    }).addStyleClass("sapUiTinyMarginBottom");
                }
            }
        }
    }
}