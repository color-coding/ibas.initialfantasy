/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        /** 应用-身份权限配置 */
        export class IdentityPrivilegeConfigApp extends ibas.ServiceApplication<IIdentityPrivilegeConfigView, IIdentityPrivilegeConfigContract> {

            /** 应用标识 */
            static APPLICATION_ID: string = "3ce858a3-3f89-49be-b20c-face27231bad";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_identityprivilege_config";
            /** 构造函数 */
            constructor() {
                super();
                this.id = IdentityPrivilegeConfigApp.APPLICATION_ID;
                this.name = IdentityPrivilegeConfigApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.fetchIdentitiesEvent = this.fetchIdentities;
                this.view.fetchIdentityPrivilegesEvent = this.fetchIdentityPrivileges;
                this.view.saveIdentityPrivilegesEvent = this.saveIdentityPrivileges;
                this.view.copyIdentityPrivilegesEvent = this.copyIdentityPrivileges;
                this.view.deleteIdentityPrivilegesEvent = this.deleteIdentityPrivileges;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                this.view.showPlatform(this.oPlatform);
                this.view.showRole(this.oRole);
                if (!(this.oPrivileges instanceof Array)) {
                    this.busy(true);
                    let criteria: ibas.ICriteria, condition: ibas.ICondition;
                    criteria = new ibas.Criteria();
                    condition = criteria.conditions.create();
                    condition.alias = bo.Privilege.PROPERTY_ROLECODE_NAME;
                    condition.value = this.oRole.code;
                    condition = criteria.conditions.create();
                    condition.alias = bo.Privilege.PROPERTY_PLATFORMID_NAME;
                    condition.value = this.oPlatform.platformCode;
                    let sort: ibas.ISort = criteria.sorts.create();
                    sort.alias = bo.IdentityPrivilege.PROPERTY_MODULEID_NAME;
                    sort.sortType = ibas.emSortType.ASCENDING;
                    sort = criteria.sorts.create();
                    sort.alias = bo.IdentityPrivilege.PROPERTY_TARGET_NAME;
                    sort.sortType = ibas.emSortType.ASCENDING;
                    let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                    boRepository.fetchPrivilege({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            try {
                                this.busy(false);
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                this.oPrivileges = opRslt.resultObjects;
                            } catch (error) {
                                this.messages(error);
                            }
                        }
                    });
                }
            }
            /** 运行服务 */
            protected runService(contract: IIdentityPrivilegeConfigContract): void {
                let criteria: ibas.ICriteria, condition: ibas.ICondition;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                // 设置平台信息
                if (typeof contract.platform === "object") {
                    this.oPlatform = contract.platform;
                } else {
                    criteria = new ibas.Criteria();
                    condition = criteria.conditions.create();
                    condition.alias = bo.ApplicationPlatform.PROPERTY_PLATFORMCODE_NAME;
                    if (typeof contract.platform === "number") {
                        condition.value = ibas.enums.toString(ibas.emPlantform, contract.platform);
                    } else {
                        condition.value = contract.platform;
                    }
                    boRepository.fetchApplicationPlatform({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                this.oPlatform = opRslt.resultObjects.firstOrDefault();
                                if (!ibas.objects.isNull(this.oPlatform) && !ibas.objects.isNull(this.oRole)) {
                                    this.show();
                                }
                            } catch (error) {
                                this.messages(error);
                            }
                        }
                    });
                }
                // 设置角色信息
                if (typeof contract.role === "object") {
                    this.oRole = contract.role;
                } else {
                    criteria = new ibas.Criteria();
                    condition = criteria.conditions.create();
                    condition.alias = "Code";
                    condition.value = contract.role;
                    boRepository.fetchRole({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                this.oRole = opRslt.resultObjects.firstOrDefault();
                                if (!ibas.objects.isNull(this.oPlatform) && !ibas.objects.isNull(this.oRole)) {
                                    this.show();
                                }
                            } catch (error) {
                                this.messages(error);
                            }
                        }
                    });
                }
                // 设置权限
                if (contract.privileges instanceof Array) {
                    this.oPrivileges = new ibas.ArrayList<bo.IPrivilege>();
                    for (let item of ibas.arrays.sort(contract.privileges, [
                        new ibas.Sort(bo.IdentityPrivilege.PROPERTY_MODULEID_NAME, ibas.emSortType.ASCENDING),
                        new ibas.Sort(bo.IdentityPrivilege.PROPERTY_TARGET_NAME, ibas.emSortType.ASCENDING)
                    ])) {
                        // 复制对象，避免污染
                        this.oPrivileges.add(item.clone());
                    }
                }
            }
            show(): void {
                this.description = ibas.strings.format("{0} - {1}", this.description, this.oRole.name);
                super.show.apply(this, arguments);
            }
            /** 查询数据 */
            protected fetchIdentities(criteria: ibas.ICriteria): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchIdentity({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Identity>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.showIdentities(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            private oRole: bo.IRole;
            private oPlatform: bo.IApplicationPlatform;
            private oPrivileges: ibas.IList<bo.IPrivilege>;
            private oIdentityPrivileges: ibas.IList<IdentityPrivilege>;
            /** 查询数据 */
            private fetchIdentityPrivileges(identity: string | bo.IIdentity): void {
                this.busy(true);
                let criteria: ibas.ICriteria = new ibas.Criteria(), condition: ibas.ICondition;
                condition = criteria.conditions.create();
                condition.alias = bo.IdentityPrivilege.PROPERTY_PLATFORMID_NAME;
                condition.value = this.oPlatform.platformCode;
                condition = criteria.conditions.create();
                condition.alias = bo.IdentityPrivilege.PROPERTY_ROLECODE_NAME;
                condition.value = this.oRole.code;
                condition = criteria.conditions.create();
                condition.alias = bo.IdentityPrivilege.PROPERTY_IDENTITYCODE_NAME;
                condition.value = typeof identity === "object" ? identity.code : identity;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchIdentityPrivilege({
                    criteria: criteria,
                    onCompleted: (opRslt) => {
                        try {
                            this.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            // 查询结果先标记删除
                            opRslt.resultObjects.forEach((item) => {
                                item.delete();
                            });
                            // 构建显示对象
                            this.oIdentityPrivileges = new ibas.ArrayList<IdentityPrivilege>();
                            for (let privilege of this.oPrivileges) {
                                if (privilege.authoriseValue === ibas.emAuthoriseType.NONE) {
                                    // 模块无权限，则元素无权限
                                    if (!ibas.strings.isEmpty(privilege.moduleId) && ibas.strings.isEmpty(privilege.target)) {
                                        this.oPrivileges.forEach((item) => {
                                            if (item.moduleId === privilege.moduleId) {
                                                item.authoriseValue = ibas.emAuthoriseType.NONE;
                                            }
                                        });
                                    }
                                    continue;
                                }
                                let item: bo.IdentityPrivilege =
                                    opRslt.resultObjects.firstOrDefault(
                                        c => c.platformId === privilege.platformId && c.roleCode === privilege.roleCode
                                            && c.moduleId === privilege.moduleId && c.target === privilege.target);
                                if (ibas.objects.isNull(item)) {
                                    item = new bo.IdentityPrivilege();
                                    item.platformId = privilege.platformId;
                                    item.roleCode = privilege.roleCode;
                                    item.identityCode = typeof identity === "object" ? identity.code : identity;
                                    item.moduleId = privilege.moduleId;
                                    item.target = privilege.target;
                                    item.authoriseValue = privilege.authoriseValue;
                                    item.automatic = privilege.automatic;
                                    item.activated = privilege.activated;
                                }
                                item.markOld(); // 权限一样的不保存
                                let identityPrivilege: IdentityPrivilege = new IdentityPrivilege(item, bo.emElementType.OTHER);
                                identityPrivilege.original = privilege.authoriseValue;
                                shell.app.modules.forEach((module) => {
                                    if (identityPrivilege.moduleId !== module.id) {
                                        return;
                                    }
                                    if (ibas.strings.isEmpty(identityPrivilege.target)) {
                                        identityPrivilege.type = bo.emElementType.MODULE;
                                    } else {
                                        for (let item of module.elements()) {
                                            if (item.id === identityPrivilege.target) {
                                                if (item instanceof ibas.ModuleFunction) {
                                                    identityPrivilege.type = bo.emElementType.FUNCTION;
                                                } else if (item instanceof ibas.Application) {
                                                    identityPrivilege.type = bo.emElementType.APPLICATION;
                                                } else if (item instanceof ibas.ServiceMapping) {
                                                    identityPrivilege.type = bo.emElementType.SERVICE;
                                                }
                                            }
                                        }
                                    }
                                });
                                this.oIdentityPrivileges.add(identityPrivilege);
                            }
                            this.view.showIdentityPrivileges(this.oIdentityPrivileges.filter((item) => { return !item.data.isDeleted; }));
                        } catch (error) {
                            this.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 保存数据 */
            private saveIdentityPrivileges(): void {
                if (!(this.oIdentityPrivileges instanceof Array)) {
                    return;
                }
                this.busy(true);
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                ibas.queues.execute(this.oIdentityPrivileges,
                    (data, next) => {
                        // 仅保存修改过的
                        if (!data.data.isDirty) {
                            next();
                        } else {
                            if (!(data.data.objectKey > 0)) {
                                // 没有主键，则认为是新数据
                                data.data.markNew();
                            }
                            boRepository.saveIdentityPrivilege({
                                beSaved: data.data,
                                onCompleted(opRslt: ibas.IOperationResult<bo.IdentityPrivilege>): void {
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
                        this.view.showIdentityPrivileges(this.oIdentityPrivileges.filter((item) => { return !item.data.isDeleted; }));
                    }
                );
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_saving_data"));
            }
            /** 复制身份权限  */
            private copyIdentityPrivileges(): void {
                if (!(this.oIdentityPrivileges instanceof Array)) {
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
                    title: ibas.strings.format("{0}-{1}", ibas.i18n.prop("initialfantasy_copy_from"), ibas.i18n.prop("bo_identityprivilege_platformid")),
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
                        ibas.servicesManager.runChooseService<bo.IIdentity>({
                            title: ibas.strings.format("{0}-{1}", ibas.i18n.prop("initialfantasy_copy_from"), ibas.i18n.prop("bo_identityprivilege_identitycode")),
                            boCode: bo.BO_CODE_IDENTITY,
                            chooseType: ibas.emChooseType.SINGLE,
                            criteria: criteria,
                            viewMode: ibas.emViewMode.VIEW,
                            onCompleted(selecteds: ibas.IList<bo.IIdentity>): void {
                                let identity: bo.IRole = selecteds.firstOrDefault();
                                // 查询复制的权限
                                criteria = new ibas.Criteria();
                                condition = criteria.conditions.create();
                                condition.alias = bo.IdentityPrivilege.PROPERTY_PLATFORMID_NAME;
                                condition.value = platform.platformCode;
                                condition = criteria.conditions.create();
                                condition.alias = bo.IdentityPrivilege.PROPERTY_ROLECODE_NAME;
                                condition.value = that.oRole.code;
                                condition = criteria.conditions.create();
                                condition.alias = bo.IdentityPrivilege.PROPERTY_IDENTITYCODE_NAME;
                                condition.value = identity.code;
                                that.busy(true);
                                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                                boRepository.fetchIdentityPrivilege({
                                    criteria: criteria,
                                    onCompleted(opRslt: ibas.IOperationResult<bo.IdentityPrivilege>): void {
                                        try {
                                            that.busy(false);
                                            if (opRslt.resultCode !== 0) {
                                                throw new Error(opRslt.message);
                                            }
                                            for (let item of that.oIdentityPrivileges) {
                                                let data: bo.IPrivilege = opRslt.resultObjects.firstOrDefault(
                                                    c => ibas.strings.equals(c.moduleId, item.moduleId)
                                                        && ibas.strings.equals(c.target, item.target)
                                                        && ibas.strings.equals(c.roleCode, item.roleCode)
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
                                            that.view.showIdentityPrivileges(that.oIdentityPrivileges.filter((item) => { return !item.data.isDeleted; }));
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
            private deleteIdentityPrivileges(identity: string | bo.IIdentity): void {
                if (ibas.objects.isNull(identity)) {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "identity"));
                }
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.IdentityPrivilege.PROPERTY_ROLECODE_NAME;
                condition.value = this.oRole.code;
                condition = criteria.conditions.create();
                condition.alias = bo.IdentityPrivilege.PROPERTY_PLATFORMID_NAME;
                condition.value = this.oRole.code;
                condition = criteria.conditions.create();
                condition.alias = bo.IdentityPrivilege.PROPERTY_IDENTITYCODE_NAME;
                condition.value = typeof identity === "string" ? identity : identity.code;

                let that: this = this;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchIdentityPrivilege({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.IdentityPrivilege>): void {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            let beDeleteds: ibas.IList<bo.IdentityPrivilege> = opRslt.resultObjects;
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
                                        boRepository.saveIdentityPrivilege({
                                            beSaved: data,
                                            onCompleted(opRslt: ibas.IOperationResult<bo.IdentityPrivilege>): void {
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
                                        that.oIdentityPrivileges = new ibas.ArrayList<IdentityPrivilege>();
                                        that.view.showIdentityPrivileges(that.oIdentityPrivileges.filter((item) => { return !item.data.isDeleted; }));
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
        }
        /** 视图-身份权限 */
        export interface IIdentityPrivilegeConfigView extends ibas.IView {
            /** 显示平台 */
            showPlatform(data: bo.IApplicationPlatform): void;
            /** 显示角色 */
            showRole(data: bo.IRole): void;
            /** 查询身份  */
            fetchIdentitiesEvent: Function;
            /** 显示身份 */
            showIdentities(datas: bo.IIdentity[]): void;
            /** 查询身份权限  */
            fetchIdentityPrivilegesEvent: Function;
            /** 显示身份权限 */
            showIdentityPrivileges(datas: IdentityPrivilege[]): void;
            /** 保存身份权限 */
            saveIdentityPrivilegesEvent: Function;
            /** 删除身份权限 */
            deleteIdentityPrivilegesEvent: Function;
            /** 复制身份权限  */
            copyIdentityPrivilegesEvent: Function;
        }
        /** 身份权限 */
        export class IdentityPrivilege extends ibas.Bindable {
            constructor(data: bo.IdentityPrivilege, type: bo.emElementType) {
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
            data: bo.IdentityPrivilege;
            type: bo.emElementType;
            original: ibas.emAuthoriseType;
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
            get identityCode(): string {
                return this.data.identityCode;
            }
            set identityCode(value: string) {
                this.data.identityCode = value;
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
        /** 身份权限服务映射 */
        export class IdentityPrivilegeConfigServiceMapping extends ibas.ServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = IdentityPrivilegeConfigApp.APPLICATION_ID;
                this.name = IdentityPrivilegeConfigApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
                this.proxy = IdentityPrivilegeConfigServiceProxy;
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract> {
                return new IdentityPrivilegeConfigApp();
            }
        }
    }
}