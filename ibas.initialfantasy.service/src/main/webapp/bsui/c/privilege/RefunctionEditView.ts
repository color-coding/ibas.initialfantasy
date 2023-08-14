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
            /** 编辑视图-重组功能 */
            export class RefunctionEditView extends ibas.DialogView implements app.IRefunctionEditView {
                /** 保存数据事件 */
                saveDataEvent: Function;
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 新建数据事件，参数1：是否克隆 */
                createDataEvent: Function;
                /** 添加重组功能-项目事件 */
                addRefunctionItemEvent: Function;
                /** 删除重组功能-项目事件 */
                removeRefunctionItemEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretch: ibas.config.get(ibas.CONFIG_ITEM_PLANTFORM) === ibas.emPlantform.PHONE ? true : false,
                        contentWidth: "65%",
                        contentHeight: "65%",
                        content: [
                            new sap.m.SplitContainer("", {
                                masterPages: [
                                    this.pageLeft = new sap.m.Page("", {
                                        showHeader: false,
                                        content: [
                                            new sap.ui.layout.form.SimpleForm("", {
                                                editable: true,
                                                content: [
                                                    /*
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_refunction_assigned") }),
                                                    new sap.extension.m.Input("", {
                                                        editable: false,
                                                    }).bindProperty("bindingValue", {
                                                        path: "/assigned",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 20
                                                        }),
                                                    }),
                                                    new sap.extension.m.EnumSelect("", {
                                                        editable: false,
                                                        enumType: bo.emAssignedType
                                                    }).bindProperty("bindingValue", {
                                                        path: "/assignedType",
                                                        type: new sap.extension.data.Enum({
                                                            enumType: bo.emAssignedType
                                                        }),
                                                    }),
                                                    */
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_refunction_name") }),
                                                    new sap.extension.m.Input("", {
                                                    }).bindProperty("bindingValue", {
                                                        path: "/name",
                                                        type: new sap.extension.data.Alphanumeric({
                                                            maxLength: 60
                                                        }),
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_refunction_activated") }),
                                                    new sap.extension.m.EnumSelect("", {
                                                        enumType: ibas.emYesNo
                                                    }).bindProperty("bindingValue", {
                                                        path: "/activated",
                                                        type: new sap.extension.data.YesNo(),
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_refunction_validdate") }),
                                                    new sap.extension.m.DatePicker("", {
                                                    }).bindProperty("bindingValue", {
                                                        path: "/validDate",
                                                        type: new sap.extension.data.Date(),
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_refunction_invaliddate") }),
                                                    new sap.extension.m.DatePicker("", {
                                                    }).bindProperty("bindingValue", {
                                                        path: "/invalidDate",
                                                        type: new sap.extension.data.Date(),
                                                    }),
                                                    new sap.m.Label("", { text: ibas.i18n.prop("bo_refunction_remarks") }),
                                                    new sap.extension.m.TextArea("", {
                                                        rows: 3,
                                                    }).bindProperty("bindingValue", {
                                                        path: "/remarks",
                                                        type: new sap.extension.data.Alphanumeric(),
                                                    }),
                                                ]
                                            })
                                        ],
                                    })
                                ],
                                detailPages: [
                                    this.pageRight = new sap.m.Page("", {
                                        showHeader: false,
                                        content: [
                                            new sap.m.HBox("", {
                                                width: "100%",
                                                height: "100%",
                                                renderType: sap.m.FlexRendertype.Bare,
                                                items: [
                                                    new sap.m.FlexBox("", {
                                                        renderType: sap.m.FlexRendertype.Bare,
                                                        width: "60%",
                                                        items: [
                                                            new sap.m.Page("", {
                                                                showHeader: false,
                                                                subHeader: new sap.extension.m.Toolbar("", {
                                                                    design: sap.m.ToolbarDesign.Transparent,
                                                                    style: sap.m.ToolbarStyle.Clear,
                                                                    content: [
                                                                        new sap.m.Text("", {
                                                                            text: ibas.i18n.prop("initialfantasy_assigned"),
                                                                        }),
                                                                        new sap.m.Button("", {
                                                                            type: sap.m.ButtonType.Transparent,
                                                                            icon: "sap-icon://navigation-right-arrow",
                                                                            press: function (this: sap.m.Button): void {
                                                                                if (this.getIcon() === "sap-icon://navigation-right-arrow") {
                                                                                    that.listRefunction.expandToLevel(99);
                                                                                    this.setIcon("sap-icon://navigation-down-arrow");
                                                                                } else {
                                                                                    that.listRefunction.collapseAll();
                                                                                    this.setIcon("sap-icon://navigation-right-arrow");
                                                                                }
                                                                            }
                                                                        }),
                                                                        new sap.m.ToolbarSpacer("", {}),
                                                                        new sap.m.Button("", {
                                                                            icon: "sap-icon://add-folder",
                                                                            press(): void {
                                                                                that.fireViewEvents(that.addRefunctionItemEvent);
                                                                            },
                                                                        }),
                                                                    ],
                                                                    dragDropConfig: [
                                                                        new sap.ui.core.dnd.DropInfo("", {
                                                                            targetAggregation: "content",
                                                                            dropPosition: sap.ui.core.dnd.DropPosition.On,
                                                                            drop(event: sap.ui.base.Event): void {
                                                                                let dragged: any = event.getParameter("draggedControl")?.getBindingContext()?.getObject();
                                                                                let dropped: any = event.getParameter("droppedControl")?.getBindingContext()?.getObject();
                                                                                if (dragged instanceof app.ModuleProxy) {
                                                                                    that.fireViewEvents(that.addRefunctionItemEvent, dragged, dropped);
                                                                                } else if (dragged instanceof app.FunctionProxy) {
                                                                                    that.fireViewEvents(that.addRefunctionItemEvent, dragged, dropped);
                                                                                }
                                                                            },
                                                                        })
                                                                    ]
                                                                }),
                                                                content: [
                                                                    this.listRefunction = new sap.extension.m.Tree("", {
                                                                        showNoData: false,
                                                                        items: {
                                                                            path: "/",
                                                                            parameters: {
                                                                                arrayNames: [
                                                                                    "refunctionItems",
                                                                                ]
                                                                            },
                                                                            sorter: [
                                                                                new sap.ui.model.Sorter("visOrder", false)
                                                                            ],
                                                                            templateShareable: false,
                                                                            template: new sap.m.CustomTreeItem("", {
                                                                                content: [
                                                                                    new sap.m.HBox("", {
                                                                                        width: "100%",
                                                                                        alignContent: sap.m.FlexAlignContent.Start,
                                                                                        alignItems: sap.m.FlexAlignItems.Center,
                                                                                        renderType: sap.m.FlexRendertype.Bare,
                                                                                        items: [
                                                                                            new sap.ui.core.Icon("", {
                                                                                                size: "1.2rem",
                                                                                                src: {
                                                                                                    path: "image",
                                                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                                                    formatter(data: string): string {
                                                                                                        return ibas.strings.isEmpty(data) ? "sap-icon://nutrition-activity" : data;
                                                                                                    }
                                                                                                },
                                                                                                press(this: sap.ui.core.Icon, event: sap.ui.base.Event): void {
                                                                                                    let source: sap.ui.core.Icon = <any>event.getSource();
                                                                                                    let selectDialog: sap.m.SelectDialog = new sap.m.SelectDialog("", {
                                                                                                        title: ibas.i18n.prop("openui5_please_select_icon"),
                                                                                                        items: {
                                                                                                            path: "/",
                                                                                                            template: new sap.m.StandardListItem("", {
                                                                                                                title: {
                                                                                                                    path: "name",
                                                                                                                },
                                                                                                                icon: {
                                                                                                                    path: "name",
                                                                                                                }
                                                                                                            })
                                                                                                        },
                                                                                                        search: function (event: sap.ui.base.Event): void {
                                                                                                            let source: any = event.getSource();
                                                                                                            if (source instanceof sap.m.SelectDialog) {
                                                                                                                let oBinding: any = source.getBinding("items");
                                                                                                                if (oBinding instanceof sap.ui.model.json.JSONListBinding) {
                                                                                                                    let value: string = event.getParameter("value");
                                                                                                                    oBinding.filter([
                                                                                                                        new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, value)
                                                                                                                    ]);
                                                                                                                }
                                                                                                            }
                                                                                                        },
                                                                                                        confirm(event: sap.ui.base.Event): void {
                                                                                                            let value: string = event.getParameter("selectedItem").getTitle();
                                                                                                            let data: any = source.getBindingContext().getObject();
                                                                                                            if (data instanceof bo.RefunctionItem) {
                                                                                                                data.image = value;
                                                                                                                source.getBindingContext().getModel().refresh();
                                                                                                            } else {
                                                                                                                source.setSrc(value);
                                                                                                            }
                                                                                                            setTimeout(() => {
                                                                                                                selectDialog.destroy();
                                                                                                                selectDialog = undefined;
                                                                                                            }, 5);
                                                                                                        },
                                                                                                        cancel(): void {
                                                                                                            setTimeout(() => {
                                                                                                                selectDialog.destroy();
                                                                                                                selectDialog = undefined;
                                                                                                            }, 5);
                                                                                                        }
                                                                                                    });
                                                                                                    let icons: ibas.ArrayList<{ name: string }> = new ibas.ArrayList<{ name: string }>();
                                                                                                    for (let item of sap.ui.core.IconPool.getIconNames(undefined)) {
                                                                                                        icons.add({
                                                                                                            name: ibas.strings.format("sap-icon://{0}", item)
                                                                                                        });
                                                                                                    }
                                                                                                    selectDialog.setModel(new sap.ui.model.json.JSONModel(icons));
                                                                                                    selectDialog.open(undefined);
                                                                                                }
                                                                                            }).addStyleClass("sapUiTinyMarginEnd"),
                                                                                            new sap.extension.m.Input("", {
                                                                                                bindingValue: {
                                                                                                    path: "description",
                                                                                                    type: new sap.extension.data.Alphanumeric(),
                                                                                                }
                                                                                            }).addStyleClass("sapUiTinyMarginBegin sapUiTinyMarginEnd"),
                                                                                            new sap.m.Button("", {
                                                                                                icon: "sap-icon://delete",
                                                                                                type: sap.m.ButtonType.Transparent,
                                                                                                press(this: sap.m.Button): void {
                                                                                                    that.fireViewEvents(that.removeRefunctionItemEvent, this.getBindingContext().getObject());
                                                                                                }
                                                                                            }),
                                                                                        ]
                                                                                    })
                                                                                ],
                                                                                highlight: {
                                                                                    path: "isDirty",
                                                                                    formatter(data: boolean): sap.ui.core.MessageType {
                                                                                        return data === true ? sap.ui.core.MessageType.Warning : sap.ui.core.MessageType.Information;
                                                                                    }
                                                                                },
                                                                                visible: {
                                                                                    path: "isDeleted",
                                                                                    formatter(data: boolean): boolean {
                                                                                        return data === true ? false : true;
                                                                                    }
                                                                                }
                                                                            }),
                                                                        },
                                                                        dragDropConfig: [
                                                                            new sap.ui.core.dnd.DragInfo("", {
                                                                                sourceAggregation: "items",
                                                                            }),
                                                                            new sap.ui.core.dnd.DropInfo("", {
                                                                                targetAggregation: "items",
                                                                                dropPosition: sap.ui.core.dnd.DropPosition.OnOrBetween,
                                                                                drop(event: sap.ui.base.Event): void {
                                                                                    let dragged: any = event.getParameter("draggedControl")?.getBindingContext()?.getObject();
                                                                                    let dropped: any = event.getParameter("droppedControl")?.getBindingContext()?.getObject();
                                                                                    if (dragged instanceof app.ModuleProxy) {
                                                                                        that.fireViewEvents(that.addRefunctionItemEvent, dragged, dropped);
                                                                                    } else if (dragged instanceof app.FunctionProxy) {
                                                                                        that.fireViewEvents(that.addRefunctionItemEvent, dragged, dropped);
                                                                                    } else if (dragged instanceof bo.RefunctionItem && dropped instanceof bo.RefunctionItem
                                                                                        && dragged.parent === dropped.parent) {
                                                                                        let index: number = 1;
                                                                                        let tree: sap.m.Tree = (<any>event.getSource())?.getDropTarget();
                                                                                        let dropPosition: string = event.getParameter("dropPosition");
                                                                                        if ((dropPosition === "Before" || dropPosition === "After")) {
                                                                                            // 功能菜单移动
                                                                                            for (let item of tree.getItems()) {
                                                                                                let iData: any = item.getBindingContext()?.getObject();
                                                                                                if (ibas.objects.isNull(iData)) {
                                                                                                    continue;
                                                                                                }
                                                                                                if (iData.parent !== dragged.parent) {
                                                                                                    continue;
                                                                                                }
                                                                                                if (dragged === iData) {
                                                                                                    continue;
                                                                                                }
                                                                                                if (dropped === iData) {
                                                                                                    if (dropPosition === "Before") {
                                                                                                        dragged.visOrder = index;
                                                                                                        index++;
                                                                                                        dropped.visOrder = index;
                                                                                                        index++;
                                                                                                    } else if (dropPosition === "After") {
                                                                                                        dropped.visOrder = index;
                                                                                                        index++;
                                                                                                        dragged.visOrder = index;
                                                                                                        index++;
                                                                                                    }
                                                                                                } else {
                                                                                                    iData.visOrder = index;
                                                                                                    index++;
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                        if (index > 1) {
                                                                                            tree.getModel().refresh(false);
                                                                                        }
                                                                                    } else if (dragged instanceof bo.RefunctionItem && dropped instanceof bo.RefunctionItem
                                                                                        && dragged.parent === dropped.parent) {
                                                                                    }
                                                                                },
                                                                            }),
                                                                        ]
                                                                    }),
                                                                ]
                                                            }),

                                                        ]
                                                    }),
                                                    new sap.m.FlexBox("", {
                                                        renderType: sap.m.FlexRendertype.Bare,
                                                        width: "40%",
                                                        items: [
                                                            new sap.m.Page("", {
                                                                showHeader: false,
                                                                subHeader: new sap.m.Toolbar("", {
                                                                    design: sap.m.ToolbarDesign.Transparent,
                                                                    style: sap.m.ToolbarStyle.Clear,
                                                                    content: [
                                                                        new sap.m.Text("", {
                                                                            text: ibas.i18n.prop("initialfantasy_to_be_assigned"),
                                                                        }),
                                                                        new sap.m.Button("", {
                                                                            type: sap.m.ButtonType.Transparent,
                                                                            icon: "sap-icon://navigation-right-arrow",
                                                                            press: function (this: sap.m.Button): void {
                                                                                if (this.getIcon() === "sap-icon://navigation-right-arrow") {
                                                                                    that.listFunction.expandToLevel(99);
                                                                                    this.setIcon("sap-icon://navigation-down-arrow");
                                                                                } else {
                                                                                    that.listFunction.collapseAll();
                                                                                    this.setIcon("sap-icon://navigation-right-arrow");
                                                                                }
                                                                            }
                                                                        }),
                                                                        new sap.m.ToolbarSpacer(),
                                                                    ]
                                                                }),
                                                                content: [
                                                                    this.listFunction = new sap.extension.m.Tree("", {
                                                                        showNoData: false,
                                                                        items: {
                                                                            path: "/",
                                                                            parameters: {
                                                                                arrayNames: [
                                                                                    "elements",
                                                                                ]
                                                                            },
                                                                            templateShareable: false,
                                                                            template: new sap.m.StandardTreeItem("", {
                                                                                icon: {
                                                                                    path: "icon",
                                                                                    formatter(data: any): string {
                                                                                        return data;
                                                                                    }
                                                                                },
                                                                                title: {
                                                                                    path: "description",
                                                                                    formatter(data: any): string {
                                                                                        return data;
                                                                                    }
                                                                                },
                                                                                /*
                                                                                highlight: {
                                                                                    path: "assigned",
                                                                                    formatter(data: boolean): sap.ui.core.MessageType {
                                                                                        return data === true ? sap.ui.core.MessageType.Success : sap.ui.core.MessageType.Warning;
                                                                                    }
                                                                                },
                                                                                */
                                                                            }),
                                                                        },
                                                                        dragDropConfig: [
                                                                            new sap.ui.core.dnd.DragInfo("", {
                                                                                sourceAggregation: "items",
                                                                            })
                                                                        ]
                                                                    }).addStyleClass("sapUiTinyMarginBegin")
                                                                ],
                                                            }),
                                                        ]
                                                    }),
                                                ],
                                            })
                                        ],
                                    })
                                ],
                            })
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_save"),
                                type: sap.m.ButtonType.Transparent,
                                press(): void {
                                    that.fireViewEvents(that.saveDataEvent);
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                press(): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ],
                    }).addStyleClass("sapUiNoContentPadding");
                }


                private pageLeft: sap.m.Page;
                private pageRight: sap.m.Page;
                private listRefunction: sap.extension.m.Tree;
                private listFunction: sap.extension.m.Tree;

                /** 显示数据 */
                showRefunction(data: bo.Refunction): void {
                    this.pageLeft.setModel(new sap.extension.model.JSONModel(data));
                }
                /** 显示数据-重组功能-项目 */
                showRefunctionItems(datas: bo.RefunctionItem[]): void {
                    this.listRefunction.setModel(new sap.extension.model.JSONModel(datas));
                }
                /** 显示数据-模块功能 */
                showFunctions(datas: app.ModuleProxy[]): void {
                    this.listFunction.setModel(new sap.extension.model.JSONModel(datas));
                }
            }
        }
    }
}
