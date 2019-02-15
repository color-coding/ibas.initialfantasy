/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        /** 应用-系统权限配置 */
        export class PrivilegeConfigApp extends ibas.Application<IPrivilegeConfigView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "7d621881-fefe-45ca-9016-a7284768cfe1";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_privilege_config";
            /** 构造函数 */
            constructor() {
                super();
                this.id = PrivilegeConfigApp.APPLICATION_ID;
                this.name = PrivilegeConfigApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.fetchPrivilegesEvent = this.fetchPrivileges;
                this.view.fetchRolesEvent = this.fetchRoles;
                this.view.savePrivilegesEvent = this.savePrivileges;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                // 加载平台信息，仅使用（桌面和平板，手机）
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.ApplicationPlatform.PROPERTY_PLATFORMCODE_NAME;
                condition.value = ibas.enums.toString(ibas.emPlantform, ibas.emPlantform.COMBINATION);
                condition.relationship = ibas.emConditionRelationship.OR;
                condition = criteria.conditions.create();
                condition.alias = bo.ApplicationPlatform.PROPERTY_PLATFORMCODE_NAME;
                condition.value = ibas.enums.toString(ibas.emPlantform, ibas.emPlantform.PHONE);
                condition.relationship = ibas.emConditionRelationship.OR;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchApplicationPlatform({
                    criteria: criteria,
                    onCompleted: (opRslt) => {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            this.view.showPlatforms(opRslt.resultObjects);
                        } catch (error) {
                            this.messages(error);
                        }
                    }
                });
            }
            /** 查询数据 */
            private fetchRoles(criteria: ibas.ICriteria): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchOrganization({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Organization>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.showRoles(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 查询数据 */
            private fetchPrivileges(criteria: ibas.ICriteria): void {
                this.busy(true);
                let platform: string = ibas.enums.toString(ibas.emPlantform, ibas.emPlantform.COMBINATION);
                let condition: ibas.ICondition = criteria.conditions.firstOrDefault(c => c.alias === bo.Privilege.PROPERTY_PLATFORMID_NAME);
                if (!ibas.objects.isNull(condition)) {
                    platform = condition.value;
                }
                let role: string;
                condition = criteria.conditions.firstOrDefault(c => c.alias === bo.Privilege.PROPERTY_ROLECODE_NAME);
                if (!ibas.objects.isNull(condition)) {
                    role = condition.value;
                }
                let that: this = this;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchPrivilege({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Privilege>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            let values: ibas.IList<bo.Privilege> = new ibas.ArrayList<bo.Privilege>();
                            shell.app.modules.forEach((module) => {
                                let privilege: bo.Privilege =
                                    opRslt.resultObjects.firstOrDefault(c => c.moduleId === module.id && c.platformId === platform && ibas.strings.isEmpty(c.target));
                                if (ibas.objects.isNull(privilege)) {
                                    privilege = new bo.Privilege();
                                    privilege.roleCode = role;
                                    privilege.platformId = platform;
                                    privilege.moduleId = module.id;
                                }
                                values.add(privilege);
                                for (let item of module.elements()) {
                                    privilege = opRslt.resultObjects.firstOrDefault(c => c.moduleId === module.id && c.platformId === platform && c.target === item.id);
                                    if (ibas.objects.isNull(privilege)) {
                                        privilege = new bo.Privilege();
                                        privilege.roleCode = role;
                                        privilege.platformId = platform;
                                        privilege.moduleId = module.id;
                                        privilege.target = item.id;
                                    }
                                    values.add(privilege);
                                }
                            });
                            values = ibas.arrays.sort(values, [
                                new ibas.Sort(bo.Privilege.PROPERTY_MODULEID_NAME, ibas.emSortType.ASCENDING),
                                new ibas.Sort(bo.Privilege.PROPERTY_TARGET_NAME, ibas.emSortType.ASCENDING)
                            ]);
                            that.view.showPrivileges(values);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 保存数据 */
            protected savePrivileges(datas: bo.Privilege[]): void {
                this.busy(true);
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                ibas.queues.execute(datas,
                    (data, next) => {
                        // 仅保存修改过的
                        if (!(data.isDirty)) {
                            next();
                        } else {
                            boRepository.savePrivilege({
                                beSaved: data,
                                onCompleted(opRslt: ibas.IOperationResult<bo.Privilege>): void {
                                    if (opRslt.resultCode !== 0) {
                                        next(new Error(opRslt.message));
                                    } else {
                                        data.markOld(true);
                                        next();
                                    }
                                }
                            });
                        }
                    }, (error) => {
                        this.busy(false);
                        if (error instanceof Error) {
                            this.messages(error);
                        } else {
                            this.messages(ibas.emMessageType.SUCCESS,
                                ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                        }
                    }
                );
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_saving_data"));
            }
        }
        /** 视图-系统权限 */
        export interface IPrivilegeConfigView extends ibas.IView {
            /** 查询角色 */
            fetchRolesEvent: Function;
            /** 查询权限  */
            fetchPrivilegesEvent: Function;
            /** 保存权限 */
            savePrivilegesEvent: Function;
            /** 显示角色 */
            showRoles(datas: bo.IRole[]): void;
            /** 显示权限 */
            showPrivileges(datas: bo.Privilege[]): void;
            /** 显示平台 */
            showPlatforms(datas: bo.ApplicationPlatform[]): void;
        }
    }
}