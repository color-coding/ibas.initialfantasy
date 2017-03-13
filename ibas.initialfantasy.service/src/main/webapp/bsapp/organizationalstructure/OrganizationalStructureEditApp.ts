/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "../../3rdparty/ibas/index";
import { BORepositoryInitialFantasy } from "../../borep/BORepositories";
import * as bo from "../../borep/bo/index";

/** 应用-组织-结构 */
export class OrganizationalStructureEditApp extends ibas.BOEditApplication<IOrganizationalStructureEditView, bo.OrganizationalStructure> {

    /** 应用标识 */
    static APPLICATION_ID: string = "8f64c509-c295-424d-8da0-5aba3a65f970";
    /** 应用名称 */
    static APPLICATION_NAME: string = "mu_initialfantasy_app_organizationalstructure_edit";

    constructor() {
        super();
        this.id = OrganizationalStructureEditApp.APPLICATION_ID;
        this.name = OrganizationalStructureEditApp.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.addOrganizationalRoleEvent = this.addOrganizationalRole;
        this.view.removeOrganizationalRoleEvent = this.removeOrganizationalRole;
        this.view.addRoleMemberEvent = this.addRoleMember;
        this.view.removeRoleMemberEvent = this.removeRoleMember;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
        this.view.showOrganizationalStructure(this.editData);
        this.view.showOrganizationalRoles(this.editData.organizationalRoles);
        this.view.showRoleMembers(this.editData.roleMembers);
    }
    /** 待编辑的数据 */
    protected editData: bo.OrganizationalStructure;
    /** 保存数据 */
    protected saveData(): void {
        this.messages(ibas.emMessageType.SUCCESS, ibas.i18n.prop("sys_shell_ui_sucessful"));
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let data: bo.OrganizationalStructure = arguments[0];
        if (ibas.object.isNull(data)) {
            data = new bo.OrganizationalStructure();

        }
        this.editData = data;
        super.run();
    }

    /** 添加组织-角色事件 */
    addOrganizationalRole(): void {
        this.editData.organizationalRoles.create();
        this.view.showOrganizationalRoles(this.editData.organizationalRoles);
    }
    /** 删除组织-角色事件 */
    removeOrganizationalRole(item: bo.OrganizationalRole): void {
        if (this.editData.organizationalRoles.indexOf(item) >= 0) {
            this.editData.organizationalRoles.remove(item);
            this.view.showOrganizationalRoles(this.editData.organizationalRoles);
        }
    }


    /** 添加组织-角色-成员事件 */
    addRoleMember(): void {
        this.editData.roleMembers.create();
        this.view.showRoleMembers(this.editData.roleMembers);
    }
    /** 删除组织-角色-成员事件 */
    removeRoleMember(item: bo.RoleMember): void {
        if (this.editData.roleMembers.indexOf(item) >= 0) {
            this.editData.roleMembers.remove(item);
            this.view.showRoleMembers(this.editData.roleMembers);
        }
    }

}
/** 视图-组织-结构 */
export interface IOrganizationalStructureEditView extends ibas.IBOEditView {
    /** 添加组织-角色事件 */
    addOrganizationalRoleEvent: Function;
    /** 删除组织-角色事件 */
    removeOrganizationalRoleEvent: Function;
    /** 显示数据 */
    showOrganizationalRoles(datas: bo.OrganizationalRole[]): void;
    /** 添加组织-角色-成员事件 */
    addRoleMemberEvent: Function;
    /** 删除组织-角色-成员事件 */
    removeRoleMemberEvent: Function;
    /** 显示数据 */
    showRoleMembers(datas: bo.RoleMember[]): void;
    /** 显示数据 */
    showOrganizationalStructure(data: bo.OrganizationalStructure): void;
}
