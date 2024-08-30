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
                    this.allDocuments = new ibas.ArrayList<ibas.IBODocument>();
                    let page: sap.m.Page = new sap.m.Page("", {
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
                    }).addStyleClass("sapUiContentPadding");
                    page.setModel(new sap.extension.model.JSONModel(data.data));
                    this.splitter.addContentArea(page);
                    let sourceDepth: number = this.getSourceMaxDepth(data);
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
                    for (let item of this.splitter.getContentAreas()) {
                        if (item instanceof sap.m.Page) {
                            if (item.getContent().length === 0) {
                                this.splitter.removeContentArea(item);
                            }
                        }
                    }
                }
                insertSourceProcess(data: app.DocumentChain): void {
                    if (!data) {
                        return;
                    }
                    if (data.sources.length === 0) {
                        return;
                    }
                    let page: sap.m.Page = this.getCardPage(data, emDocumentType.SOURCE);
                    for (let node of data.sources) {
                        if (ibas.objects.isNull(page)) {
                            continue;
                        }
                        if (!ibas.objects.isNull(this.allDocuments.find(c => c.docEntry === node.data.docEntry && ibas.objects.typeOf(c) === ibas.objects.typeOf(node.data)))) {
                            continue;
                        }
                        page.addContent(this.createCard(node.data));
                    }
                    for (let node of data.sources) {
                        this.insertSourceProcess(node);
                        this.insertTargetsProcess(node);
                    }
                }
                insertTargetsProcess(data: app.DocumentChain): void {
                    if (!data) {
                        return;
                    }
                    if (data.targets.length === 0) {
                        return;
                    }
                    let page: sap.m.Page = this.getCardPage(data, emDocumentType.TARGETS);
                    for (let node of data.targets) {
                        if (ibas.objects.isNull(page)) {
                            continue;
                        }
                        if (!ibas.objects.isNull(this.allDocuments.find(c => c.docEntry === node.data.docEntry && ibas.objects.typeOf(c) === ibas.objects.typeOf(node.data)))) {
                            continue;
                        }
                        page.addContent(this.createCard(node.data));
                    }
                    for (let node of data.targets) {
                        this.insertTargetsProcess(node);
                        this.insertSourceProcess(node);
                    }
                }
                getCardPage(data: app.DocumentChain, documentType: emDocumentType): sap.m.Page {
                    let cardPage: sap.m.Page;
                    for (let num: number = 0; num < this.splitter.getContentAreas().length; num++) {
                        let page: any = this.splitter.getContentAreas()[num];
                        if (page instanceof sap.m.Page) {
                            for (let item of page.getContent()) {
                                let bindData: any = (<any>item.getModel()).getData();
                                if (bindData instanceof ibas.BODocument) {
                                    if (bindData.getProperty("ObjectCode") === data.data.getProperty("ObjectCode") && bindData.getProperty("DocEntry") === data.data.getProperty("DocEntry")) {
                                        cardPage = documentType === emDocumentType.SOURCE ? <sap.m.Page>this.splitter.getContentAreas()[num - 1] : <sap.m.Page>this.splitter.getContentAreas()[num + 1];
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    return cardPage;
                }
                getSourceMaxDepth(root: app.DocumentChain, currentDepth: number = 0): number {
                    if (!root) {
                        return currentDepth;
                    }
                    let maxDepth: number = currentDepth;
                    for (let node of root.sources) {
                        maxDepth = Math.max(maxDepth, this.getSourceMaxDepth(node, currentDepth + 1));
                        maxDepth = Math.max(maxDepth, this.getTargetsMaxDepth(node, currentDepth + 1));
                    }
                    return maxDepth + 1;
                }
                getTargetsMaxDepth(root: app.DocumentChain, currentDepth: number = 0): number {
                    if (!root) {
                        return currentDepth;
                    }
                    let maxDepth: number = currentDepth;
                    for (let node of root.targets) {
                        maxDepth = Math.max(maxDepth, this.getTargetsMaxDepth(node, currentDepth + 1));
                        maxDepth = Math.max(maxDepth, this.getSourceMaxDepth(node, currentDepth + 1));
                    }
                    return maxDepth + 1;
                }
                private allDocuments: ibas.ArrayList<ibas.IBODocument> = null;
                private createCard(data: ibas.IBODocument): sap.f.Card {
                    this.allDocuments.add(data);
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
                    let card: sap.f.Card = new sap.f.Card("", {
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
                    card.setModel(new sap.extension.model.JSONModel(data));
                    return card;
                }
            }
        }
    }
    export enum emDocumentType {
        /** 上游 */
        SOURCE,
        /** 下游 */
        TARGETS
    }
}