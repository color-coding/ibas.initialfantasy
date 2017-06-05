/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "../../borep/bo/index";
import { BORepositoryInitialFantasy } from "../../borep/BORepositories";

/** 向导应用-组织-结构 */
export class OrganizationalStructureWizardApp extends ibas.Application<IOrganizationalStructureWizardView> {

    /** 应用标识 */
    static APPLICATION_ID: string = "62eb02de-54be-43f5-b13e-a8acc76c1091";
    /** 应用名称 */
    static APPLICATION_NAME: string = "initialfantasy_app_organizationalstructure_wizard";
    /** 构造函数 */
    constructor() {
        super();
        this.id = OrganizationalStructureWizardApp.APPLICATION_ID;
        this.name = OrganizationalStructureWizardApp.APPLICATION_NAME;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
        this.view.chooseOrgStructureEvent = this.chooseOrgStructure;
        this.view.addOrgStructureEvent = this.addOrgStructure;
        this.view.addRoleStructureEvent = this.addRoleStructure;
        this.view.addMemberStructureEvent = this.addMemberStructure;
        this.view.removeStructureItemEvent = this.removeStructureItem;
        this.view.loadStructuresEvent = this.loadStructures;
        this.view.saveStructuresEvent = this.saveStructures;
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        super.run();
    }
    /** 选择组织结构事件 */
    chooseOrgStructure(): void {
        let that: this = this;
        ibas.servicesManager.runChooseService<bo.OrganizationalStructure>({
            boCode: bo.BO_CODE_ORGANIZATIONALSTRUCTURE,
            criteria: [
                // 根节点
                new ibas.Condition(bo.OrganizationalStructure.PROPERTY_BELONGING_NAME, ibas.emConditionOperation.EQUAL, "-1"),
            ],
            onCompleted(selecteds: ibas.List<bo.OrganizationalStructure>): void {
                that.view.showRoot(selecteds.firstOrDefault());
            }
        });
    }
    /** 添加组织结构事件 */
    addOrgStructure(selected: bo.OrganizationalStructure): void {
        if (!(selected instanceof bo.OrganizationalStructure)) {
            throw new Error(ibas.i18n.prop("initialfantasy_org_wizard_must_be_organizationalstructure"));
        }
    }
    /** 添加角色结构事件 */
    addRoleStructure(selected: bo.OrganizationalStructure): void {
        if (!(selected instanceof bo.OrganizationalStructure)) {
            throw new Error(ibas.i18n.prop("initialfantasy_org_wizard_must_be_organizationalstructure"));
        }

    }
    /** 添加成员结构事件 */
    addMemberStructure(selected: bo.OrganizationalRole): void {
        if (!(selected instanceof bo.OrganizationalStructure)) {
            throw new Error(ibas.i18n.prop("initialfantasy_org_wizard_must_be_role"));
        }

    }
    /** 移出结构元素事件 */
    removeStructureItem(): void {

    }
    /** 加载组织所有节点 */
    loadStructures(): void {

    }
    /** 保存结构 */
    saveStructures(): void {

    }
}
/** 视图-组织-结构 */
export interface IOrganizationalStructureWizardView extends ibas.IView {
    /** 选择组织结构事件 */
    chooseOrgStructureEvent: Function;
    /** 添加组织结构事件 */
    addOrgStructureEvent: Function;
    /** 添加角色结构事件 */
    addRoleStructureEvent: Function;
    /** 添加成员结构事件 */
    addMemberStructureEvent: Function;
    /** 移出结构元素事件 */
    removeStructureItemEvent: Function;
    /** 保存结构 */
    saveStructuresEvent: Function;
    /** 显示根节点 */
    showRoot(root: bo.OrganizationalStructure): void;
    /** 加载组织所有节点 */
    loadStructuresEvent: Function;
    /** 显示所有节点 */
    showStructures(root: bo.OrganizationalStructure): void;
}