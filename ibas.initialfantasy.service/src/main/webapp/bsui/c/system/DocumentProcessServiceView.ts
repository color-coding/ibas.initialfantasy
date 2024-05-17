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
                        /*
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                            ]
                        }),
                        */
                        content: [
                            new sap.ui.layout.Splitter("", {
                                orientation: sap.ui.core.Orientation.Horizontal,
                                layoutData: new sap.ui.layout.SplitterLayoutData("", {
                                    resizable: false,
                                }),
                                contentAreas: [
                                    new sap.m.Page("", {
                                        showHeader: false,
                                        subHeader: new sap.m.Toolbar("", {
                                            content: [
                                                new sap.m.Title("", {
                                                    text: ibas.i18n.prop("initialfantasy_document_source")
                                                }).addStyleClass("sapUiTinyMarginBegin sapUiTinyMarginEnd")
                                            ]
                                        }),
                                        content: [
                                            this.sourcePage = new sap.m.VBox("", {
                                                alignContent: sap.m.FlexAlignContent.Center,
                                                alignItems: sap.m.FlexAlignItems.Center,
                                                justifyContent: sap.m.FlexJustifyContent.Start,
                                                renderType: sap.m.FlexRendertype.Bare,
                                                fitContainer: true,
                                            })
                                        ]
                                    }).addStyleClass("sapUiContentPadding"),
                                    new sap.m.Page("", {
                                        showHeader: false,
                                        subHeader: new sap.m.Toolbar("", {
                                            content: [
                                                new sap.m.Title("", {
                                                    text: ibas.i18n.prop("initialfantasy_document_origin")
                                                }).addStyleClass("sapUiTinyMarginBegin sapUiTinyMarginEnd")
                                            ]
                                        }),
                                        content: [
                                            this.originPage = new sap.m.VBox("", {
                                                alignContent: sap.m.FlexAlignContent.Center,
                                                alignItems: sap.m.FlexAlignItems.Center,
                                                justifyContent: sap.m.FlexJustifyContent.Start,
                                                renderType: sap.m.FlexRendertype.Bare,
                                                fitContainer: true,

                                            })
                                        ]
                                    }).addStyleClass("sapUiContentPadding"),
                                    new sap.m.Page("", {
                                        showHeader: false,
                                        subHeader: new sap.m.Toolbar("", {
                                            content: [
                                                new sap.m.Title("", {
                                                    text: ibas.i18n.prop("initialfantasy_document_target")
                                                }).addStyleClass("sapUiTinyMarginBegin sapUiTinyMarginEnd")
                                            ]
                                        }),
                                        content: [
                                            this.targetPage = new sap.m.VBox("", {
                                                alignContent: sap.m.FlexAlignContent.Center,
                                                alignItems: sap.m.FlexAlignItems.Center,
                                                justifyContent: sap.m.FlexJustifyContent.Start,
                                                renderType: sap.m.FlexRendertype.Bare,
                                                fitContainer: true,

                                            })
                                        ]
                                    }).addStyleClass("sapUiContentPadding")
                                ]
                            }),
                        ]
                    });
                }

                private sourcePage: sap.m.VBox;
                private originPage: sap.m.VBox;
                private targetPage: sap.m.VBox;
                /** 显示数据 */
                showDocumentChain(data: app.DocumentChain): void {
                    for (let item of data.sources) {
                        this.sourcePage.addItem(this.createCard(item.data));
                    }
                    this.originPage.addItem(this.createCard(data.data));
                    for (let item of data.targets) {
                        this.targetPage.addItem(this.createCard(item.data));
                    }
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