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

/** 应用-应用程序平台 */
export class ApplicationPlatformEditApp extends ibas.BOEditApplication<IApplicationPlatformEditView, bo.ApplicationPlatform> {

    /** 应用标识 */
    static APPLICATION_ID: string = "ca7f45c4-d64e-4870-80a5-c5d85a11224c";
    /** 应用名称 */
    static APPLICATION_NAME: string = "mu_initialfantasy_app_applicationplatform_edit";

    constructor() {
        super();
        this.id = ApplicationPlatformEditApp.APPLICATION_ID;
        this.name = ApplicationPlatformEditApp.APPLICATION_NAME;
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
        this.view.showApplicationPlatform(this.editData);
    }
    /** 待编辑的数据 */
    protected editData: bo.ApplicationPlatform;
    /** 保存数据 */
    protected saveData(): void {
        this.messages(ibas.emMessageType.SUCCESS, ibas.i18n.prop("sys_shell_ui_sucessful"));
    }
    /** 运行,覆盖原方法 */
    run(...args: any[]): void {
        let data: bo.ApplicationPlatform = arguments[0];
        if (ibas.object.isNull(data)) {
            data = new bo.ApplicationPlatform();

        }
        this.editData = data;
        super.run();
    }
}
/** 视图-应用程序平台 */
export interface IApplicationPlatformEditView extends ibas.IBOEditView {
    /** 显示数据 */
    showApplicationPlatform(data: bo.ApplicationPlatform): void;
}
