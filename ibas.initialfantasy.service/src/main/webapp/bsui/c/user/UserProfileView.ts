/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import { utils } from "openui5/typings/ibas.utils";
import { IUserProfileView, UserEditApp } from "../../../bsapp/user/index";
import * as bo from "../../../borep/bo/index";

const URL_HASH_SIGN_CHANGE_USER_NAME: string = "/change_user_name";
const URL_HASH_SIGN_CHANGE_USER_MAIL: string = "/change_user_mail";
const URL_HASH_SIGN_CHANGE_USER_PASSWORD: string = "/change_user_password";
/**
 * 视图-建议
 */
export class UserProfileView extends ibas.BOResidentView implements IUserProfileView {
    /** 保存用户事件 */
    saveUserEvent: Function;
    /** 绘制工具条视图 */
    darwBar(): any {
        let that: this = this;
        // 不重复创建工具条钮
        if (ibas.objects.isNull(this.bar)) {
            this.bar = new sap.m.Button("", {
                icon: "sap-icon://my-view",
                type: sap.m.ButtonType.Transparent,
                press: function (): void {
                    that.fireViewEvents(that.showFullViewEvent);
                }
            });
        }
        return this.bar;
    }
    private bar: sap.m.Button;
    /** 激活完整视图事件 */
    showFullViewEvent: Function;
    /** 绘制视图 */
    darw(): any {
        this.form = new sap.m.QuickView("", {
            placement: sap.m.PlacementType.Bottom,
            pages: []
        });
        return this.form;
    }
    private form: sap.m.QuickView;
    /** 显示用户信息 */
    showUser(user: bo.User): void {
        if (!ibas.objects.isNull(this.form)) {
            let page: sap.m.QuickViewPage = new sap.m.QuickViewPage("", {
                header: this.application.description,
                title: ibas.strings.format("#{0}", "{/docEntry}"),
                description: "{/code}",
                icon: "sap-icon://business-card",
            });
            // 详细信息组
            let group: sap.m.QuickViewGroup = new sap.m.QuickViewGroup("", {
            });
            // 用户名称
            if (!ibas.objects.isNull(user.name)) {
                group.addElement(
                    new sap.m.QuickViewGroupElement("", {
                        target: "_self",
                        label: ibas.i18n.prop("bo_user_name"),
                        value: "{/name}",
                        url: ibas.URL_HASH_SIGN_VIEWS + this.id + URL_HASH_SIGN_CHANGE_USER_NAME,
                        type: sap.m.QuickViewGroupElementType.link
                    }));
            }
            // 电子邮件
            if (!ibas.objects.isNull(user.mail)) {
                group.addElement(
                    new sap.m.QuickViewGroupElement("", {
                        target: "_self",
                        label: ibas.i18n.prop("bo_user_mail"),
                        value: "{/mail}",
                        url: ibas.URL_HASH_SIGN_VIEWS + this.id + URL_HASH_SIGN_CHANGE_USER_MAIL,
                        type: sap.m.QuickViewGroupElementType.link
                    }));
            }
            // 用户密码
            if (!ibas.objects.isNull(user.password)) {
                group.addElement(
                    new sap.m.QuickViewGroupElement("", {
                        target: "_self",
                        label: ibas.i18n.prop("bo_user_password"),
                        value: ibas.i18n.prop("initialfantasy_user_change_password"),
                        url: ibas.URL_HASH_SIGN_VIEWS + this.id + URL_HASH_SIGN_CHANGE_USER_PASSWORD,
                        type: sap.m.QuickViewGroupElementType.link
                    }));
            }
            // 组，存在元素则添加到页面
            if (group.getElements().length > 0) {
                page.addGroup(group);
            }
            this.form.addPage(page);
        }
        this.form.setModel(new sap.ui.model.json.JSONModel(user));
    }
    // 地址哈希值变化
    onHashChange(event: HashChangeEvent): void {
        super.onHashChange(event);
        if (event.newURL.endsWith(URL_HASH_SIGN_CHANGE_USER_NAME)) {
            this.showChangeUI(URL_HASH_SIGN_CHANGE_USER_NAME, [
                new sap.m.Input("", {
                    type: sap.m.InputType.Password,
                    value: "{/password}",
                })
            ]);
        } else if (event.newURL.endsWith(URL_HASH_SIGN_CHANGE_USER_MAIL)) {
            this.showChangeUI(URL_HASH_SIGN_CHANGE_USER_MAIL, [
                new sap.m.Input("", {
                    type: sap.m.InputType.Password,
                    value: "{/mail}",
                })
            ]);
        } else if (event.newURL.endsWith(URL_HASH_SIGN_CHANGE_USER_PASSWORD)) {
            this.showChangeUI(URL_HASH_SIGN_CHANGE_USER_PASSWORD, [
                new sap.m.Input("", {
                    type: sap.m.InputType.Password,
                    value: "{/password}",
                })
            ]);
        }
    }
    private showChangeUI(sign: string, content: sap.ui.core.Control[]): void {
        let that: this = this;
        // 获取打开位置
        let pos: number = 0;
        for (let page of this.form.getPages()) {
            for (let group of page.getGroups()) {
                for (let item of group.getElements()) {
                    pos = pos - 40;
                }
            }
        }
        // 生成打开视图
        let popover: sap.m.Popover = new sap.m.Popover("", {
            showHeader: false,
            placement: sap.m.PlacementType.Bottom,
            offsetY: pos,
            afterClose(event: any): void {
                // 关闭后自动触发保存事件
                that.fireViewEvents(that.saveUserEvent);
            },
            content: content
        });
        (<any>popover).addStyleClass("sapMOTAPopover sapTntToolHeaderPopover");
        popover.openBy(this.form, false);
    }
}