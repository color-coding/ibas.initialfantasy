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
             * 视图-BOInformation
             */
            export class BOInformationEditView extends ibas.BOEditView implements app.IBOInformationEditView {
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 新建数据事件，参数1：是否克隆 */
                createDataEvent: Function;
                /** 添加业务对象属性信息事件 */
                addBOPropertyInformationEvent: Function;
                /** 删除业务对象属性信息事件 */
                removeBOPropertyInformationEvent: Function;
                /** 编辑业务对象属性信息 */
                editBOPropertyInformationEvent: Function;
                /** 添加业务对象属性值事件 */
                addBOPropertyValueEvent: Function;
                /** 删除业务对象属性值事件 */
                removeBOPropertyValueEvent: Function;
                /** 业务对象编号 */
                boNumberingEvent: Function;
                /** 选择链接的对象事件 */
                chooseLinkedObjectEvent: Function;
                /** 显示对象关系事件 */
                showBORelationshipEvent: Function;
                /** 编辑业务对象信息 */
                editBOInformationEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    jQuery.sap.require("sap.ui.codeeditor.CodeEditor");
                    let that: this = this;
                    let formTop: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_title_general") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_boinformation_code") }),
                            new sap.extension.m.Input("", {
                                editable: false,
                            }).bindProperty("bindingValue", {
                                path: "code",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_boinformation_name") }),
                            new sap.extension.m.Input("", {
                                editable: false,
                            }).bindProperty("bindingValue", {
                                path: "name",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_boinformation_description") }),
                            new sap.extension.m.Input("", {
                                editable: false,
                            }).bindProperty("bindingValue", {
                                path: "description",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_title_others") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_boinformation_objecttype") }),
                            new sap.extension.m.Input("", {
                                editable: false,
                            }).bindProperty("bindingValue", {
                                path: "objectType",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_boinformation_mapped") }),
                            new sap.extension.m.Input("", {
                                editable: false,
                            }).bindProperty("bindingValue", {
                                path: "mapped",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_boinformation_modified") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo,
                            }).bindProperty("bindingValue", {
                                path: "modified",
                                type: new sap.extension.data.YesNo()
                            }),
                        ]
                    });
                    this.tableBOPropertyInformation = new sap.extension.table.Table("", {
                        enableSelectAll: true,
                        visibleRowCount: sap.extension.table.visibleRowCount(8),
                        rows: "{/rows}",
                        rowActionCount: 1,
                        rowActionTemplate: new sap.ui.table.RowAction("", {
                            items: [
                                new sap.ui.table.RowActionItem("", {
                                    icon: "sap-icon://slim-arrow-right",
                                    press: function (oEvent: any): void {
                                        let data: any = this.getBindingContext().getObject();
                                        if (!ibas.objects.isNull(data)) {
                                            that.fireViewEvents(that.editBOPropertyInformationEvent, data);
                                            that.showBOPropertyValues(data);
                                        }
                                    },
                                }).bindProperty("visible", {
                                    path: "dataType",
                                    formatter(data: string): boolean {
                                        return ibas.strings.equalsIgnoreCase("Alphanumeric", data) ||
                                            ibas.strings.equalsIgnoreCase("Memo", data) ||
                                            ibas.strings.equalsIgnoreCase("Numeric", data) ? true : false;
                                    }
                                }),
                            ]
                        }),
                        columns: [
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyinformation_property"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "property",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                sortProperty: "property",
                                filterProperty: "property",
                                width: "25%",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyinformation_description"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "description",
                                    type: new sap.extension.data.Alphanumeric({
                                        maxLength: 100
                                    })
                                }).bindProperty("editable", {
                                    path: "property",
                                    formatter(data: string): boolean {
                                        return ibas.strings.isWith(data, "U_", undefined) ? true : false;
                                    }
                                }),
                                sortProperty: "description",
                                filterProperty: "description",
                                width: "30%",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyinformation_datatype"),
                                template: new sap.m.HBox("", {
                                    justifyContent: sap.m.FlexJustifyContent.Start,
                                    renderType: sap.m.FlexRendertype.Bare,
                                    items: [
                                        new sap.extension.m.DataLink("", {
                                            width: "100%",
                                            visible: {
                                                path: "editSize",
                                                formatter(data: number): boolean {
                                                    return data > 0 ? false : true;
                                                }
                                            },
                                            press(this: sap.m.Link): void {
                                                that.fireViewEvents(that.editBOInformationEvent, this.getBindingContext().getObject());
                                            }
                                        }).bindProperty("bindingValue", {
                                            path: "dataType",
                                            type: new sap.extension.data.Alphanumeric()
                                        }),
                                        new sap.extension.m.Text("", {
                                            width: "100%",
                                            visible: {
                                                path: "editSize",
                                                formatter(data: number): boolean {
                                                    return !(data > 0) ? false : true;
                                                }
                                            },
                                        }).bindProperty("bindingValue", {
                                            path: "dataType",
                                            type: new sap.extension.data.Alphanumeric()
                                        }),
                                    ]
                                }),
                                width: "20%",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyinformation_edittype"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "editType",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyinformation_editsize"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "editSize",
                                    type: new sap.extension.data.Numeric()
                                }),
                                width: "8rem",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyinformation_searched"),
                                template: new sap.extension.m.EnumSelect("", {
                                    enumType: ibas.emYesNo
                                }).bindProperty("bindingValue", {
                                    path: "searched",
                                    type: new sap.extension.data.YesNo(),
                                }).bindProperty("editable", {
                                    path: "editSize",
                                    formatter(data: number): boolean {
                                        return data > 0 ? true : false;
                                    }
                                }),
                                width: "8rem",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyinformation_mapped"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "mapped",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                sortProperty: "mapped",
                                width: "15%",
                            }),
                        ]
                    });
                    let formMiddle: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            this.tableTitle = new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_bopropertyinformation") }),
                            this.container = new sap.m.NavContainer("", {
                                height: ibas.strings.format("{0}rem", String(sap.extension.table.visibleRowCount(8) * 3)),
                                pages: [
                                    this.tableBOPropertyInformation,
                                    this.vboxBOPropertyValue = new sap.m.VBox("", {
                                        width: "100%",
                                        height: "100%",
                                        justifyContent: sap.m.FlexJustifyContent.Start,
                                        renderType: sap.m.FlexRendertype.Bare,
                                        items: [
                                            new sap.m.Toolbar("", {
                                                // style: sap.m.ToolbarStyle.Clear,
                                                content: [
                                                    new sap.m.SegmentedButton("", {
                                                        items: [
                                                            new sap.m.SegmentedButtonItem("", {
                                                                key: "VD",
                                                                text: ibas.i18n.prop("initialfantasy_user_vaildvalues"),
                                                            }),
                                                            new sap.m.SegmentedButtonItem("", {
                                                                key: "CL",
                                                                text: ibas.i18n.prop("initialfantasy_bo_choose_list"),
                                                            }),
                                                        ],
                                                        selectionChange(this: sap.m.SegmentedButton): void {
                                                            let parent: sap.m.Toolbar = <any>this.getParent();
                                                            if (this.getSelectedKey() === "VD") {
                                                                parent.getContent()[2].setVisible(true);
                                                                parent.getContent()[3].setVisible(true);
                                                                that.tableBOPropertyValue.setVisible(true);
                                                                parent.getContent()[4].setVisible(false);
                                                                that.textLinkedObject.setVisible(false);
                                                            } else {
                                                                parent.getContent()[2].setVisible(false);
                                                                parent.getContent()[3].setVisible(false);
                                                                that.tableBOPropertyValue.setVisible(false);
                                                                parent.getContent()[4].setVisible(true);
                                                                that.textLinkedObject.setVisible(true);
                                                            }
                                                        }
                                                    }),
                                                    new sap.m.ToolbarSeparator(""),
                                                    new sap.m.Button("", {
                                                        text: ibas.i18n.prop("shell_data_add"),
                                                        icon: "sap-icon://add",
                                                        width: "6rem",
                                                        press: function (): void {
                                                            that.fireViewEvents(that.addBOPropertyValueEvent);
                                                        }
                                                    }),
                                                    new sap.m.Button("", {
                                                        text: ibas.i18n.prop("shell_data_remove"),
                                                        icon: "sap-icon://less",
                                                        width: "6rem",
                                                        press: function (): void {
                                                            that.fireViewEvents(that.removeBOPropertyValueEvent, that.tableBOPropertyValue.getSelecteds());
                                                        }
                                                    }),
                                                    new sap.m.Button("", {
                                                        text: ibas.i18n.prop("bo_bopropertyinformation_linkedobject"),
                                                        icon: "sap-icon://value-help",
                                                        visible: false,
                                                        press: function (): void {
                                                            that.fireViewEvents(that.chooseLinkedObjectEvent,
                                                                (<sap.extension.model.JSONModel>that.vboxBOPropertyValue.getModel()).getData());
                                                        }
                                                    }),
                                                    new sap.m.ToolbarSeparator(""),
                                                    new sap.extension.m.Select("", {
                                                        items: [
                                                            new sap.extension.m.SelectItem("", {
                                                                key: "",
                                                                text: ibas.i18n.prop("em_chooosetype_default"),
                                                            }),
                                                            new sap.extension.m.SelectItem("", {
                                                                key: "SINGLE",
                                                                text: ibas.i18n.prop("em_chooosetype_single"),
                                                            }),
                                                            new sap.extension.m.SelectItem("", {
                                                                key: "MULTIPLE",
                                                                text: ibas.i18n.prop("em_chooosetype_multiple"),
                                                            }),
                                                            new sap.extension.m.SelectItem("", {
                                                                key: "SINGLE+INPUT",
                                                                text: ibas.i18n.prop("em_chooosetype_single_input"),
                                                            }),
                                                            new sap.extension.m.SelectItem("", {
                                                                key: "MULTIPLE+INPUT",
                                                                text: ibas.i18n.prop("em_chooosetype_multiple_input"),
                                                            })
                                                        ],
                                                    }).bindProperty("bindingValue", {
                                                        path: "/valueChooseType",
                                                    }).bindProperty("visible", {
                                                        path: "/systemed",
                                                        formatter(data: any): boolean {
                                                            return data === ibas.emYesNo.NO ? true : false;
                                                        }
                                                    }),
                                                    new sap.m.Label("", {
                                                        showColon: true,
                                                        text: ibas.i18n.prop("initialfantasy_trigger_property")
                                                    }).bindProperty("visible", {
                                                        parts: [
                                                            {
                                                                path: "/systemed",
                                                            }, {
                                                                path: "/valueChooseType",
                                                            }
                                                        ],
                                                        formatter(systemed: any, chooseType: any): boolean {
                                                            if (systemed === ibas.emYesNo.NO && ibas.strings.isWith(chooseType, "SINGLE", undefined)) {
                                                                return true;
                                                            }
                                                            return false;
                                                        }
                                                    }).addStyleClass("sapUiSmallMarginBegin"),
                                                    this.selectProperty = new sap.extension.m.Select("", {
                                                        items: [
                                                        ],
                                                    }).bindProperty("bindingValue", {
                                                        path: "/triggerByProperty",
                                                    }).bindProperty("visible", {
                                                        parts: [
                                                            {
                                                                path: "/systemed",
                                                            }, {
                                                                path: "/valueChooseType",
                                                            }
                                                        ],
                                                        formatter(systemed: any, chooseType: any): boolean {
                                                            if (systemed === ibas.emYesNo.NO && ibas.strings.isWith(chooseType, "SINGLE", undefined)) {
                                                                return true;
                                                            }
                                                            return false;
                                                        }
                                                    }),
                                                    new sap.m.ToolbarSpacer(""),
                                                    new sap.m.Button("", {
                                                        text: ibas.i18n.prop("shell_back"),
                                                        type: sap.m.ButtonType.Transparent,
                                                        icon: "sap-icon://nav-back",
                                                        press: function (): void {
                                                            that.fireViewEvents(that.editBOPropertyInformationEvent);
                                                        }
                                                    })
                                                ]
                                            }).addStyleClass("sapUiTinyMarginBottom"),
                                            this.tableBOPropertyValue = new sap.extension.table.DataTable("", {
                                                enableSelectAll: false,
                                                visibleRowCount: sap.extension.table.visibleRowCount(8),
                                                rows: "{/rows}",
                                                columns: [
                                                    new sap.extension.table.Column("", {
                                                        label: ibas.i18n.prop("bo_bopropertyvalue_value"),
                                                        template: new sap.extension.m.Input("", {
                                                        }).bindProperty("bindingValue", {
                                                            path: "value",
                                                            type: new sap.extension.data.Alphanumeric()
                                                        }).bindProperty("editable", {
                                                            path: "isNew"
                                                        }),
                                                        width: "40%",
                                                    }),
                                                    new sap.extension.table.Column("", {
                                                        label: ibas.i18n.prop("bo_bopropertyvalue_description"),
                                                        template: new sap.extension.m.Input("", {
                                                        }).bindProperty("bindingValue", {
                                                            path: "description",
                                                            type: new sap.extension.data.Alphanumeric()
                                                        }),
                                                        width: "60%",
                                                    }),
                                                    new sap.extension.table.Column("", {
                                                        label: ibas.i18n.prop("bo_bopropertyvalue_default"),
                                                        template: new sap.extension.m.CheckBox("", {
                                                        }).bindProperty("bindingValue", {
                                                            path: "default",
                                                            type: new sap.extension.data.YesNo(),
                                                        }),
                                                        width: "10rem",
                                                    }),
                                                ],
                                                sortProperty: "visOrder",
                                            }),
                                            this.textLinkedObject = new sap.ui.codeeditor.CodeEditor("", {
                                                height: "20rem",
                                                width: "100%",
                                                type: "json",
                                                visible: false,
                                                lineNumbers: false,
                                                value: {
                                                    path: "/linkedObject",
                                                    type: new sap.extension.data.Alphanumeric()
                                                }
                                            })
                                        ]
                                    })
                                ]
                            }),
                        ]
                    });
                    return this.page = new sap.extension.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_save"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://save",
                                    press: function (): void {
                                        that.fireViewEvents(that.saveDataEvent);
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("initialfantasy_func_bonumbering"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://number-sign",
                                    press: function (): void {
                                        that.fireViewEvents(that.boNumberingEvent);
                                    }
                                }),
                                new sap.m.ToolbarSpacer(""),
                                this.butRelation = new sap.m.Button("", {
                                    text: ibas.i18n.prop("bo_borelationship"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://broken-link",
                                    press: function (): void {
                                        that.fireViewEvents(that.showBORelationshipEvent);
                                    }
                                }),
                            ]
                        }),
                        content: [
                            formTop,
                            formMiddle,
                        ]
                    });
                }
                private page: sap.extension.m.Page;
                private tableTitle: sap.ui.core.Title;
                private container: sap.m.NavContainer;
                private tableBOPropertyInformation: sap.extension.table.Table;
                private vboxBOPropertyValue: sap.m.VBox;
                private tableBOPropertyValue: sap.extension.table.Table;
                private textLinkedObject: sap.ui.codeeditor.CodeEditor;
                private butRelation: sap.m.Button;
                private selectProperty: sap.m.Select;

                /** 显示数据 */
                showBOInformation(data: bo.BOInformation): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                }
                /** 显示数据 */
                showBOPropertyInformations(datas: bo.BOPropertyInformation[]): void {
                    this.tableTitle.setText(ibas.i18n.prop("bo_bopropertyinformation"));
                    this.container.backToTop();
                    this.tableBOPropertyInformation.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    this.selectProperty.destroyItems();
                    this.selectProperty.addItem(new sap.ui.core.ListItem("", {
                        key: "",
                        text: ibas.i18n.prop("em_chooosetype_none")
                    }));
                    for (let item of datas) {
                        this.selectProperty.addItem(new sap.ui.core.ListItem("", {
                            key: item.property,
                            text: item.description ? item.description : item.property
                        }));
                    }
                }
                /** 显示数据 */
                showBOPropertyValues(datas: bo.BOPropertyValue[] | bo.BOPropertyInformation): void {
                    this.tableTitle.setText(ibas.i18n.prop("bo_bopropertyvalue"));
                    if (datas instanceof Array) {
                        this.tableBOPropertyValue.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    } else {
                        this.vboxBOPropertyValue.setModel(new sap.extension.model.JSONModel(datas));
                        let toolbar: any = this.vboxBOPropertyValue.getItems()[0];
                        if (toolbar instanceof sap.m.Toolbar) {
                            let button: any = toolbar.getContent()[0];
                            if (button instanceof sap.m.SegmentedButton) {
                                if (!ibas.strings.isEmpty(datas.linkedObject)) {
                                    button.setSelectedKey("CL");
                                    (<any>button).fireSelectionChange({
                                        item: button.getItems()[1]
                                    });
                                } else {
                                    button.setSelectedKey("VD");
                                    (<any>button).fireSelectionChange({
                                        item: button.getItems()[0]
                                    });
                                }
                            }
                        }
                    }
                    this.container.to(this.vboxBOPropertyValue.getId());
                }
                /** 显示对象关系 */
                showBORelationships(datas: bo.BORelationship[]): void {
                    let popover: sap.m.ResponsivePopover = new sap.m.ResponsivePopover("", {
                        contentWidth: "36rem",
                        showCloseButton: false,
                        showHeader: false,
                        placement: sap.m.PlacementType.Bottom,
                        content: [
                            new sap.extension.m.Table("", {
                                showNoData: true,
                                autoPopinMode: true,
                                chooseType: ibas.emChooseType.NONE,
                                columns: [
                                    new sap.m.Column("", {
                                        header: new sap.m.Text("", {
                                            text: ibas.i18n.prop("bo_borelationship_relation"),
                                        }),
                                        width: "12rem",
                                    }),
                                    new sap.m.Column("", {
                                        header: new sap.m.Text("", {
                                            text: ibas.i18n.prop("bo_borelationship_target"),
                                        }),
                                        width: "12rem",
                                    }),
                                    new sap.m.Column("", {
                                        header: new sap.m.Text("", {
                                            text: ibas.i18n.prop("bo_borelationship_description"),
                                        }),
                                        width: "100%",
                                    }),
                                ],
                                items: {
                                    path: "/",
                                    templateShareable: false,
                                    template: new sap.m.ColumnListItem("", {
                                        cells: [
                                            new sap.extension.m.ObjectAttribute("", {
                                                bindingValue: {
                                                    path: "relation",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                },
                                            }),
                                            new sap.extension.m.RepositoryObjectAttribute("", {
                                                repository: bo.BORepositoryInitialFantasy,
                                                dataInfo: {
                                                    type: bo.BOInformation,
                                                    key: bo.BOInformation.PROPERTY_CODE_NAME,
                                                    text: bo.BOInformation.PROPERTY_DESCRIPTION_NAME
                                                },
                                                bindingValue: {
                                                    path: "target",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                },
                                            }),
                                            new sap.extension.m.ObjectAttribute("", {
                                                bindingValue: {
                                                    path: "description",
                                                    type: new sap.extension.data.Alphanumeric(),
                                                },
                                            }),
                                        ],
                                    })
                                },
                            })
                        ],
                    });
                    popover.setModel(new sap.extension.model.JSONModel(datas));
                    popover.openBy(this.butRelation);
                }
            }
        }
    }
}