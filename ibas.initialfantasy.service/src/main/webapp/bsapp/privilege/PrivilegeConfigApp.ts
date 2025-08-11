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
                this.view.copyPrivilegesEvent = this.copyPrivileges;
                this.view.deletePrivilegesEvent = this.deletePrivileges;
                this.view.editIdentityPrivilegesEvent = this.editIdentityPrivileges;
                this.view.editRefunctionsEvent = this.editRefunctions;
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
                boRepository.fetchRole({
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
            private privileges: ibas.IList<Privilege>;
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
                            let values: ibas.IList<Privilege> = new ibas.ArrayList<Privilege>();
                            shell.app.modules.forEach((module) => {
                                let privilege: bo.Privilege =
                                    opRslt.resultObjects.firstOrDefault(c => c.moduleId === module.id && c.platformId === platform && ibas.strings.isEmpty(c.target));
                                if (ibas.objects.isNull(privilege)) {
                                    privilege = new bo.Privilege();
                                    privilege.roleCode = role;
                                    privilege.platformId = platform;
                                    privilege.moduleId = module.id;
                                    privilege.authoriseValue = ibas.emAuthoriseType.NONE;
                                }
                                privilege.markOld(); // 权限一样的不保存
                                values.add(new Privilege(privilege, bo.emElementType.MODULE));
                                for (let item of module.elements()) {
                                    privilege = opRslt.resultObjects.firstOrDefault(c => c.moduleId === module.id && c.platformId === platform && c.target === item.id);
                                    if (ibas.objects.isNull(privilege)) {
                                        privilege = new bo.Privilege();
                                        privilege.roleCode = role;
                                        privilege.platformId = platform;
                                        privilege.moduleId = module.id;
                                        privilege.target = item.id;
                                        privilege.authoriseValue = ibas.emAuthoriseType.ALL;
                                    }
                                    privilege.markOld(); // 权限一样的不保存
                                    if (item instanceof ibas.ModuleFunction) {
                                        values.add(new Privilege(privilege, bo.emElementType.FUNCTION));
                                    } else if (item instanceof ibas.Application) {
                                        values.add(new Privilege(privilege, bo.emElementType.APPLICATION));
                                    } else if (item instanceof ibas.ServiceMapping) {
                                        values.add(new Privilege(privilege, bo.emElementType.SERVICE));
                                    } else {
                                        values.add(new Privilege(privilege, bo.emElementType.OTHER));
                                    }
                                }
                            });
                            that.privileges = ibas.arrays.sort(values, [
                                new ibas.Sort(bo.Privilege.PROPERTY_MODULEID_NAME, ibas.emSortType.ASCENDING),
                                new ibas.Sort(bo.Privilege.PROPERTY_TARGET_NAME, ibas.emSortType.ASCENDING)
                            ]);
                            that.view.showPrivileges(that.privileges);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 保存数据 */
            private savePrivileges(): void {
                if (!(this.privileges instanceof Array)) {
                    return;
                }
                this.busy(true);
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                ibas.queues.execute(this.privileges,
                    (data, next) => {
                        // 仅保存修改过的
                        if (!(data.data.isDirty)) {
                            next();
                        } else {
                            if (!(data.data.objectKey > 0)) {
                                // 没有主键，则认为是新数据
                                data.data.markNew();
                            }
                            boRepository.savePrivilege({
                                beSaved: data.data,
                                onCompleted(opRslt: ibas.IOperationResult<bo.Privilege>): void {
                                    if (opRslt.resultCode !== 0) {
                                        next(new Error(opRslt.message));
                                    } else {
                                        if (opRslt.resultObjects.length > 0) {
                                            data.data = opRslt.resultObjects.firstOrDefault();
                                        } else {
                                            data.data.logInst++;
                                            data.data.markOld(true);
                                        }
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
                        this.view.showPrivileges(this.privileges);
                    }
                );
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_saving_data"));
            }
            /** 复制权限  */
            private copyPrivileges(direction: "FROM" | "TO"): void {
                if (!(this.privileges instanceof Array)) {
                    return;
                }
                // 选择复制的平台
                let that: this = this;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.ApplicationPlatform.PROPERTY_PLATFORMCODE_NAME;
                condition.value = ibas.enums.toString(ibas.emPlantform, ibas.emPlantform.COMBINATION);
                condition.relationship = ibas.emConditionRelationship.OR;
                condition = criteria.conditions.create();
                condition.alias = bo.ApplicationPlatform.PROPERTY_PLATFORMCODE_NAME;
                condition.value = ibas.enums.toString(ibas.emPlantform, ibas.emPlantform.PHONE);
                condition.relationship = ibas.emConditionRelationship.OR;
                ibas.servicesManager.runChooseService<bo.ApplicationPlatform>({
                    title: ibas.strings.format("{0}-{1}",
                        ibas.i18n.prop(direction === "FROM" ? "initialfantasy_copy_from" : "initialfantasy_copy_to"),
                        ibas.i18n.prop("bo_privilege_platformid")),
                    boCode: bo.BO_CODE_APPLICATIONPLATFORM,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: criteria,
                    viewMode: ibas.emViewMode.VIEW,
                    onCompleted(selecteds: ibas.IList<bo.ApplicationPlatform>): void {
                        let platform: bo.ApplicationPlatform = selecteds.firstOrDefault();
                        criteria = new ibas.Criteria();
                        condition = criteria.conditions.create();
                        condition.alias = "Code";
                        condition.operation = ibas.emConditionOperation.NOT_NULL;
                        if (that.privileges.firstOrDefault()) {
                            condition = criteria.conditions.create();
                            condition.alias = "Code";
                            condition.operation = ibas.emConditionOperation.NOT_EQUAL;
                            condition.value = that.privileges.firstOrDefault().roleCode;
                        }
                        ibas.servicesManager.runChooseService<bo.IRole>({
                            title: ibas.strings.format("{0}-{1}",
                                ibas.i18n.prop(direction === "FROM" ? "initialfantasy_copy_from" : "bo_privilege_rolecode"),
                                ibas.i18n.prop("bo_privilege_platformid")),
                            boCode: bo.BO_CODE_ROLE,
                            chooseType: direction === "FROM" ? ibas.emChooseType.SINGLE : ibas.emChooseType.MULTIPLE,
                            criteria: criteria,
                            viewMode: ibas.emViewMode.VIEW,
                            onCompleted(selecteds: ibas.IList<bo.IRole>): void {
                                // 查询复制的权限
                                criteria = new ibas.Criteria();
                                for (let role of selecteds) {
                                    condition = criteria.conditions.create();
                                    condition.alias = bo.Privilege.PROPERTY_PLATFORMID_NAME;
                                    condition.value = platform.platformCode;
                                    if (criteria.conditions.length > 1) {
                                        condition.relationship = ibas.emConditionRelationship.OR;
                                    }
                                    condition.bracketOpen = 1;
                                    condition = criteria.conditions.create();
                                    condition.alias = bo.Privilege.PROPERTY_ROLECODE_NAME;
                                    condition.value = role.code;
                                    condition.bracketClose = 1;
                                }
                                that.busy(true);
                                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                                boRepository.fetchPrivilege({
                                    criteria: criteria,
                                    onCompleted(opRslt: ibas.IOperationResult<bo.Privilege>): void {
                                        try {
                                            if (direction === "FROM") {
                                                // 复制从权限
                                                that.busy(false);
                                                if (opRslt.resultCode !== 0) {
                                                    throw new Error(opRslt.message);
                                                }
                                                for (let item of that.privileges) {
                                                    let data: bo.IPrivilege = opRslt.resultObjects.firstOrDefault(
                                                        c => ibas.strings.equals(c.moduleId, item.moduleId)
                                                            && ibas.strings.equals(c.target, item.target)
                                                    );
                                                    if (ibas.objects.isNull(data)) {
                                                        continue;
                                                    }
                                                    item.data.isLoading = true;
                                                    item.authoriseValue = data.authoriseValue;
                                                    item.activated = data.activated;
                                                    item.automatic = data.automatic;
                                                    item.data.isLoading = false;
                                                    if (item.data.isDirty === false) {
                                                        item.data.markDirty();
                                                    }
                                                }
                                                that.proceeding(ibas.emMessageType.SUCCESS, ibas.i18n.prop("shell_sucessful"));
                                                that.view.showPrivileges(that.privileges);
                                            } else {
                                                // 复制到权限
                                                let newPrivileges: ibas.IList<bo.Privilege> = new ibas.ArrayList<bo.Privilege>();
                                                for (let privilege of that.privileges) {
                                                    // 默认值则跳过
                                                    if (!(privilege.data.objectKey > 0)) {
                                                        continue;
                                                    }
                                                    for (let role of selecteds) {
                                                        let item: bo.Privilege = opRslt.resultObjects.firstOrDefault(
                                                            c => c.platformId === platform.platformCode
                                                                && c.moduleId === privilege.moduleId
                                                                && c.target === privilege.target
                                                                && c.roleCode === role.code
                                                        );
                                                        if (ibas.objects.isNull(item)) {
                                                            item = new bo.Privilege();
                                                            item.platformId = platform.platformCode;
                                                            item.moduleId = privilege.moduleId;
                                                            item.target = privilege.target;
                                                            item.roleCode = role.code;
                                                        }
                                                        item.authoriseValue = privilege.authoriseValue;
                                                        item.activated = privilege.activated;
                                                        item.automatic = privilege.automatic;
                                                        if (item.isDirty === false) {
                                                            continue;
                                                        }
                                                        newPrivileges.add(item);
                                                    }
                                                }
                                                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                                                ibas.queues.execute(newPrivileges, (data, next) => {
                                                    // 处理数据
                                                    if (data.isDirty === true) {
                                                        boRepository.savePrivilege({
                                                            beSaved: data,
                                                            onCompleted(opRslt: ibas.IOperationResult<bo.Privilege>): void {
                                                                if (opRslt.resultCode !== 0) {
                                                                    next(new Error(ibas.i18n.prop("shell_data_save_error", data, opRslt.message)));
                                                                } else {
                                                                    next();
                                                                }
                                                            }
                                                        });
                                                    } else {
                                                        next();
                                                    }
                                                }, (error) => {
                                                    // 处理完成
                                                    if (error instanceof Error) {
                                                        that.messages(ibas.emMessageType.ERROR, error.message);
                                                    } else {
                                                        that.messages(ibas.emMessageType.SUCCESS,
                                                            ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                                                    }
                                                    that.busy(false);
                                                });
                                            }
                                        } catch (error) {
                                            that.messages(error);
                                        }
                                    }
                                });
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("initialfantasy_copying_privilege"));
                            }
                        });
                    }
                });
            }
            /** 删除权限 */
            private deletePrivileges(criteria: ibas.ICriteria): void {
                if (criteria.conditions.length === 0) {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "criteria"));
                }
                let that: this = this;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchPrivilege({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Privilege>): void {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            let beDeleteds: ibas.IList<bo.Privilege> = opRslt.resultObjects;
                            beDeleteds.forEach((value) => {
                                value.delete();
                            });
                            that.messages({
                                type: ibas.emMessageType.QUESTION,
                                title: ibas.i18n.prop(that.name),
                                message: ibas.i18n.prop("shell_multiple_data_delete_continue", beDeleteds.length),
                                actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                                onCompleted(action: ibas.emMessageAction): void {
                                    if (action !== ibas.emMessageAction.YES) {
                                        return;
                                    }
                                    that.busy(true);
                                    ibas.queues.execute(beDeleteds, (data, next) => {
                                        // 处理数据
                                        boRepository.savePrivilege({
                                            beSaved: data,
                                            onCompleted(opRslt: ibas.IOperationResult<bo.Privilege>): void {
                                                if (opRslt.resultCode !== 0) {
                                                    next(new Error(ibas.i18n.prop("shell_data_delete_error", data, opRslt.message)));
                                                } else {
                                                    next();
                                                }
                                            }
                                        });
                                    }, (error) => {
                                        // 处理完成
                                        if (error instanceof Error) {
                                            that.messages(ibas.emMessageType.ERROR, error.message);
                                        } else {
                                            that.messages(ibas.emMessageType.SUCCESS,
                                                ibas.i18n.prop("shell_data_delete") + ibas.i18n.prop("shell_sucessful"));
                                        }
                                        that.privileges = new ibas.ArrayList<Privilege>();
                                        that.view.showPrivileges(that.privileges);
                                        that.busy(false);
                                    });
                                }
                            });
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
            }
            /** 编辑身份权限 */
            private editIdentityPrivileges(role: string | bo.IRole, platform: string): void {
                role = typeof role !== "string" && role ? role.code : role;
                if (ibas.strings.isEmpty(role)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("bo_identityprivilege_rolecode")));
                    return;
                }
                if (ibas.strings.isEmpty(platform)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("bo_identityprivilege_platformid")));
                    return;
                }
                let privileges: ibas.IList<bo.IPrivilege> = new ibas.ArrayList<bo.IPrivilege>();
                for (let item of this.privileges) {
                    if (item.data.isDirty) {
                        this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please") +
                            ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("bo_privilege"));
                        return;
                    }
                    privileges.add(item.data);
                }
                ibas.servicesManager.runApplicationService<IIdentityPrivilegeConfigContract>({
                    proxy: new IdentityPrivilegeConfigServiceProxy({
                        platform: platform,
                        role: role,
                        privileges: privileges,
                    })
                });
            }
            private editRefunctions(role: string | bo.IRole): void {
                let name: string = typeof role !== "string" && role ? role.name : role.toString();
                role = typeof role !== "string" && role ? role.code : role;
                if (ibas.strings.isEmpty(role)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("bo_identityprivilege_rolecode")));
                    return;
                }
                let modules: ibas.ArrayList<ModuleProxy> = new ibas.ArrayList<ModuleProxy>();
                shell.app.modules.forEach((module) => {
                    let pModule: ModuleProxy = new ModuleProxy();
                    pModule.id = module.id;
                    pModule.description = module.description;
                    pModule.icon = module.icon;
                    for (let item of module.elements()) {
                        if (!(item instanceof ibas.ModuleFunction)) {
                            continue;
                        }
                        let pFunction: FunctionProxy = new FunctionProxy();
                        pFunction.id = item.id;
                        pFunction.name = item.name;
                        pFunction.description = item.description;

                        if (this.privileges.firstOrDefault(c => c.moduleId === pModule.id
                            && c.target === pFunction.id
                            && c.authoriseValue === ibas.emAuthoriseType.NONE
                        ) !== null) {
                            continue;
                        }
                        pModule.elements.push(pFunction);
                    }
                    if (this.privileges.firstOrDefault(c => c.moduleId === pModule.id
                        && ibas.strings.isEmpty(c.target)
                        && c.authoriseValue === ibas.emAuthoriseType.ALL
                    ) === null) {
                        return;
                    }
                    if (pModule.elements.length <= 0) {
                        return;
                    }
                    modules.add(pModule);
                });
                if (modules.length <= 0) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_fetched_none"));
                    return;
                }
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.Refunction.PROPERTY_ASSIGNEDTYPE_NAME;
                condition.value = bo.emAssignedType.ROLE.toString();
                condition = criteria.conditions.create();
                condition.alias = bo.Refunction.PROPERTY_ASSIGNED_NAME;
                condition.value = role.toString();
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchRefunction({
                    criteria: criteria,
                    onCompleted: (opRslt) => {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            let data: bo.Refunction = opRslt.resultObjects.firstOrDefault();
                            if (ibas.objects.isNull(data)) {
                                data = new bo.Refunction();
                                data.assignedType = bo.emAssignedType.ROLE;
                                data.assigned = role.toString();
                                data.name = name;
                            }
                            let app: RefunctionEditApp = new RefunctionEditApp();
                            app.navigation = this.navigation;
                            app.viewShower = this.viewShower;
                            app.run(data, modules);
                        } catch (error) {
                            this.messages(error);
                        }
                    }
                });
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
            /** 删除权限 */
            deletePrivilegesEvent: Function;
            /** 复制权限  */
            copyPrivilegesEvent: Function;
            /** 显示角色 */
            showRoles(datas: bo.IRole[]): void;
            /** 显示权限 */
            showPrivileges(datas: Privilege[]): void;
            /** 显示平台 */
            showPlatforms(datas: bo.ApplicationPlatform[]): void;
            /** 编辑身份权限  */
            editIdentityPrivilegesEvent: Function;
            /** 编辑重组功能 */
            editRefunctionsEvent: Function;
        }

        /** 系统权限 */
        export class Privilege extends ibas.Bindable {
            constructor(data: bo.Privilege, type: bo.emElementType) {
                super();
                this.data = data;
                this.type = type;
            }
            registerListener(listener: ibas.IPropertyChangedListener): void {
                this.data.registerListener.apply(this.data, arguments);
            }
            removeListener(listener: ibas.IPropertyChangedListener): void;
            removeListener(id: string): void;
            removeListener(): void;
            removeListener(): void {
                this.data.removeListener.apply(this.data, arguments);
            }
            data: bo.Privilege;
            type: bo.emElementType;
            get isDirty(): boolean {
                return this.data.isDirty;
            }
            get roleCode(): string {
                return this.data.roleCode;
            }
            set roleCode(value: string) {
                this.data.roleCode = value;
            }
            get platformId(): string {
                return this.data.platformId;
            }
            set platformId(value: string) {
                this.data.platformId = value;
            }
            get moduleId(): string {
                return this.data.moduleId;
            }
            set moduleId(value: string) {
                this.data.moduleId = value;
            }
            get target(): string {
                return this.data.target;
            }
            set target(value: string) {
                this.data.target = value;
            }
            get activated(): ibas.emYesNo {
                return this.data.activated;
            }
            set activated(value: ibas.emYesNo) {
                this.data.activated = value;
            }
            get authoriseValue(): ibas.emAuthoriseType {
                return this.data.authoriseValue;
            }
            set authoriseValue(value: ibas.emAuthoriseType) {
                this.data.authoriseValue = value;
            }
            get automatic(): ibas.emYesNo {
                return this.data.automatic;
            }
            set automatic(value: ibas.emYesNo) {
                this.data.automatic = value;
            }
        }
    }
}