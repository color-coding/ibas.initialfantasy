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
            /** 编辑视图-应用程序配置 */
            export class ApplicationConfigEditView extends ibas.DialogView implements app.IApplicationConfigEditView {
                /** 保存数据事件 */
                saveDataEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.formTop = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_applicationconfig_configgroup") }),
                            new sap.extension.m.Input("", {
                                editable: false,
                            }).bindProperty("bindingValue", {
                                path: "/configGroup",
                                formatter(data: any): any {
                                    return ibas.i18n.prop(data);
                                }
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_applicationconfig_configkey") }),
                            new sap.extension.m.Input("", {
                                editable: false,
                            }).bindProperty("bindingValue", {
                                path: "/configKey",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_applicationconfig_configdescription") }),
                            new sap.extension.m.Input("", {
                                editable: false,
                            }).bindProperty("bindingValue", {
                                path: "/configDescription",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_applicationconfig_activated") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "/activated",
                                type: new sap.extension.data.YesNo()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_applicationconfig_configvalue") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "/configValue",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 100
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_applicationconfig_settings") }),
                            new sap.extension.m.TextArea("", {
                                rows: 5,
                            }).bindProperty("bindingValue", {
                                path: "/settings",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                        ]
                    });
                    return new sap.extension.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        content: [
                            this.formTop
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_save"),
                                type: sap.m.ButtonType.Transparent,
                                icon: "sap-icon://save",
                                press: function (): void {
                                    that.fireViewEvents(that.saveDataEvent);
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                icon: "sap-icon://inspect-down",
                                press: function (): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ]
                    });
                }
                private formTop: sap.ui.layout.form.SimpleForm;
                /** 显示数据 */
                showApplicationConfig(data: bo.ApplicationConfig): void {
                    this.formTop.setModel(new sap.ui.model.json.JSONModel(data));
                }
            }
        }
    }
}
