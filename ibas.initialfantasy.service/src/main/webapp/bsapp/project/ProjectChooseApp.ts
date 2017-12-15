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
import { ProjectEditApp } from "./ProjectEditApp";

/** 选择应用-项目 */
export class ProjectChooseApp extends ibas.BOChooseService<IProjectChooseView, bo.Project> {

    /** 应用标识 */
    static APPLICATION_ID: string = "bc4e2d6b-76d6-42fd-8179-1251a448ab4f";
    /** 应用名称 */
    static APPLICATION_NAME: string = "initialfantasy_app_project_choose";
    /** 业务对象编码 */
    static BUSINESS_OBJECT_CODE: string = bo.Project.BUSINESS_OBJECT_CODE;
    /** 构造函数 */
    constructor() {
        super();
        this.id = ProjectChooseApp.APPLICATION_ID;
        this.name = ProjectChooseApp.APPLICATION_NAME;
        this.boCode = ProjectChooseApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 注册视图 */
    protected registerView(): void {
        super.registerView();
        // 其他事件
    }
    /** 视图显示后 */
    protected viewShowed(): void {
        // 视图加载完成
    }
    /** 查询数据 */
    protected fetchData(criteria: ibas.ICriteria): void {
        this.busy(true);
        let that: this = this;
        let boRepository: BORepositoryInitialFantasy = new BORepositoryInitialFantasy();
        boRepository.fetchProject({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<bo.Project>): void {
                try {
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    if (opRslt.resultObjects.length === 1
                        && ibas.config.get(ibas.CONFIG_ITEM_AUTO_CHOOSE_DATA, true)) {
                        // 仅一条数据，直接选择
                        that.chooseData(opRslt.resultObjects);
                    } else {
                        if (!that.isViewShowed()) {
                            // 没显示视图，先显示
                            that.show();
                        }
                        that.view.showData(opRslt.resultObjects);
                        that.busy(false);
                    }
                } catch (error) {
                    that.messages(error);
                }
            }
        });
        this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
    }
    /** 新建数据 */
    protected newData(): void {
        // 关闭自身
        this.destroy();
        // 调用编辑应用
        let app: ProjectEditApp = new ProjectEditApp();
        app.navigation = this.navigation;
        app.viewShower = this.viewShower;
        app.run();
    }
}
/** 视图-项目 */
export interface IProjectChooseView extends ibas.IBOChooseView {
    /** 显示数据 */
    showData(datas: bo.Project[]): void;
}
/** 项目选择服务映射 */
export class ProjectChooseServiceMapping extends ibas.BOChooseServiceMapping {
    /** 构造函数 */
    constructor() {
        super();
        this.id = ProjectChooseApp.APPLICATION_ID;
        this.name = ProjectChooseApp.APPLICATION_NAME;
        this.boCode = ProjectChooseApp.BUSINESS_OBJECT_CODE;
        this.description = ibas.i18n.prop(this.name);
    }
    /** 创建服务实例 */
    create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.Project>> {
        return new ProjectChooseApp();
    }
}
