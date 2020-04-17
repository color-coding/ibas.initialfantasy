/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        /** 列表应用-应用程序配置 */
        export class ApplicationConfigListApp extends ibas.Application<IApplicationConfigListView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "e247d37c-fffa-4cfc-bb40-335c9372fca2";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_applicationconfig_list";
            /** 构造函数 */
            constructor() {
                super();
                this.id = ApplicationConfigListApp.APPLICATION_ID;
                this.name = ApplicationConfigListApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.editConfigItemEvent = this.editConfigItem;
                this.view.changeConfigGroupEvent = this.changeConfigGroup;
                this.view.copyConfigValuesEvent = this.copyConfigValues;
                this.view.viewUserConfigsEvent = this.viewUserConfigs;
                this.view.saveEvent = this.save;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                this.busy(true);
                this.configGroups = new Map<ConfigGroup, ibas.IList<bo.IApplicationConfig>>();
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let sort: ibas.ISort = criteria.sorts.create();
                sort.alias = bo.ApplicationConfig.PROPERTY_CONFIGGROUP_NAME;
                sort.sortType = ibas.emSortType.ASCENDING;
                sort = criteria.sorts.create();
                sort.alias = bo.ApplicationConfig.PROPERTY_CONFIGKEY_NAME;
                sort.sortType = ibas.emSortType.ASCENDING;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchApplicationConfig({
                    criteria: criteria,
                    onCompleted: (opRslt) => {
                        try {
                            this.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            for (let item of opRslt.resultObjects) {
                                let group: ConfigGroup = ibas.arrays.create(this.configGroups.keys()).firstOrDefault(c => c.code === item.configGroup);
                                if (group === null) {
                                    group = new ConfigGroup();
                                    group.code = item.configGroup;
                                    group.name = "Unknown";
                                    group.icon = ibas.config.get("defalutModuleIcon");
                                    shell.app.modules.forEach((module) => {
                                        if (module.id === group.code) {
                                            group.name = ibas.strings.format("{0} - {1}", module.description, module.name);
                                            group.icon = module.icon;
                                        }
                                    });
                                    this.configGroups.set(group, new ibas.ArrayList<bo.IApplicationConfig>());
                                }
                                this.configGroups.get(group).add(item);
                            }
                            this.view.showConfigGroups(ibas.arrays.create(this.configGroups.keys()));
                        } catch (error) {
                            this.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            private configGroups: Map<ConfigGroup, ibas.IList<bo.IApplicationConfig>>;
            private editConfigItem(data: ConfigItemOrigin | ConfigItemIdentity): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_edit")
                    ));
                    return;
                }
                if (data.data instanceof bo.ApplicationConfig) {
                    let app: ApplicationConfigEditApp = new ApplicationConfigEditApp();
                    app.navigation = this.navigation;
                    app.viewShower = this.viewShower;
                    app.run(data.data);
                }
            }
            private changeConfigGroup(data: ConfigGroup): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_edit")
                    ));
                    return;
                }
                let role: string = this.view.role, identity: string = this.view.identity;
                if (!ibas.strings.isEmpty(identity) && ibas.strings.isEmpty(role)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("bo_applicationconfigidentity_rolecode")
                    ));
                    return;
                }
                if (ibas.strings.isEmpty(role) && ibas.strings.isEmpty(identity)) {
                    let values: ibas.IList<ConfigItem> = new ibas.ArrayList<ConfigItem>();
                    for (let item of this.configGroups.get(data)) {
                        values.add(new ConfigItemOrigin(item));
                    }
                    this.view.showConfigValues(values);
                } else {
                    this.busy(true);
                    this.fetchIdentityConfig(data, role, identity, (results) => {
                        if (results instanceof Error) {
                            this.messages(results);
                        } else {
                            this.view.showConfigValues(results);
                        }
                        this.busy(false);
                    });
                }
            }
            private fetchIdentityConfig(group: ConfigGroup, role: string, identity: string, onCompleted: (results: ibas.IList<ConfigItemIdentity> | Error) => void): void {
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.ApplicationConfigIdentity.PROPERTY_CONFIGGROUP_NAME;
                condition.value = group.code;
                condition = criteria.conditions.create();
                condition.alias = bo.ApplicationConfigIdentity.PROPERTY_ROLECODE_NAME;
                condition.value = role ? role : "";
                condition = criteria.conditions.create();
                condition.alias = bo.ApplicationConfigIdentity.PROPERTY_IDENTITYCODE_NAME;
                condition.value = identity ? identity : "";
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchApplicationConfigIdentity({
                    criteria: criteria,
                    onCompleted: (opRslt) => {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            let values: ibas.IList<ConfigItemIdentity> = new ibas.ArrayList<ConfigItemIdentity>();
                            for (let item of this.configGroups.get(group)) {
                                let idItem: bo.IApplicationConfigIdentity = opRslt.resultObjects.firstOrDefault(
                                    c => c.configGroup === item.configGroup && c.configKey === item.configKey
                                );
                                if (ibas.objects.isNull(idItem)) {
                                    idItem = new bo.ApplicationConfigIdentity();
                                    idItem.configGroup = item.configGroup;
                                    idItem.configKey = item.configKey;
                                    idItem.roleCode = role ? role : "";;
                                    idItem.identityCode = identity ? identity : "";
                                }
                                values.add(new ConfigItemIdentity(item, idItem));
                            }
                            if (onCompleted instanceof Function) {
                                onCompleted(values);
                            }
                        } catch (error) {
                            if (onCompleted instanceof Function) {
                                onCompleted(error);
                            }
                        }
                    }
                });
            }
            private copyConfigValues(data: ConfigGroup): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_edit")
                    ));
                    return;
                }
                let role: bo.IRole, identity: bo.IIdentity;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.Organization.PROPERTY_CODE_NAME;
                condition.operation = ibas.emConditionOperation.NOT_EQUAL;
                condition.value = this.view.role;
                ibas.servicesManager.runChooseService<bo.IRole>({
                    title: ibas.strings.format("{0}-{1}", ibas.i18n.prop("initialfantasy_copy_from"), ibas.i18n.prop("bo_applicationconfigidentity_rolecode")),
                    boCode: bo.BO_CODE_ROLE,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: criteria,
                    viewMode: ibas.emViewMode.VIEW,
                    onCompleted: (selecteds) => {
                        role = selecteds.firstOrDefault();
                        this.messages({
                            type: ibas.emMessageType.QUESTION,
                            message: ibas.i18n.prop(["shell_data_choose", "bo_identity", "shell_continue"]),
                            actions: [
                                ibas.emMessageAction.YES, ibas.emMessageAction.NO, ibas.emMessageAction.ABORT
                            ],
                            onCompleted: (action) => {
                                if (action === ibas.emMessageAction.YES) {
                                    condition.value = this.view.identity;
                                    ibas.servicesManager.runChooseService<bo.IIdentity>({
                                        title: ibas.strings.format("{0}-{1}", ibas.i18n.prop("initialfantasy_copy_from"), ibas.i18n.prop("bo_applicationconfigidentity_identitycode")),
                                        boCode: bo.BO_CODE_IDENTITY,
                                        chooseType: ibas.emChooseType.SINGLE,
                                        criteria: criteria,
                                        viewMode: ibas.emViewMode.VIEW,
                                        onCompleted: (selecteds) => {
                                            identity = selecteds.firstOrDefault();
                                            this.doCopyConfigValues(data, role, identity);
                                        }
                                    });
                                } else if (action === ibas.emMessageAction.NO) {
                                    this.doCopyConfigValues(data, role);
                                }
                            }
                        });
                    }
                });
            }
            private doCopyConfigValues(group: ConfigGroup, role: bo.IRole, identity?: bo.IIdentity): void {
                this.busy(true);
                this.fetchIdentityConfig(group, role.code, identity ? identity.code : "", (sResults) => {
                    if (sResults instanceof Error) {
                        this.busy(false);
                        this.messages(sResults);
                    } else {
                        this.fetchIdentityConfig(group, this.view.role, this.view.identity, (tResults) => {
                            if (tResults instanceof Error) {
                                this.messages(tResults);
                            } else {
                                let count: number = 0;
                                for (let tItem of tResults) {
                                    let sItem: ConfigItem = sResults.firstOrDefault(
                                        c => c.group === tItem.group && c.key === tItem.key
                                            && c.extra.isNew === false
                                    );
                                    if (!ibas.objects.isNull(sItem)) {
                                        tItem.value = sItem.value;
                                        count++;
                                    }
                                }
                                let builder: ibas.StringBuilder = new ibas.StringBuilder();
                                builder.map(null, "");
                                builder.map(undefined, "");
                                builder.append(ibas.i18n.prop("initialfantasy_copy_from"));
                                builder.append("[");
                                builder.append(role.name ? role.name : role.code);
                                if (identity) {
                                    builder.append("-");
                                    builder.append(identity.name ? identity.name : identity.code);
                                }
                                builder.append("]");
                                builder.append(ibas.i18n.prop("shell_sucessful"));
                                this.messages(ibas.emMessageType.SUCCESS, builder.toString());
                                this.view.showConfigValues(tResults);
                            }
                            this.busy(false);
                        });
                    }
                });
            }
            private save(datas: ConfigItem[]): void {
                let beSaved: ibas.IList<ConfigItem> = ibas.arrays.create(datas);
                if (beSaved.length === 0) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_save")
                    ));
                    return;
                }
                this.busy(true);
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                ibas.queues.execute(beSaved, (data, next) => {
                    if (data instanceof ConfigItemOrigin) {
                        if (data.data && data.data.isDirty === true) {
                            boRepository.saveApplicationConfig({
                                beSaved: <any>data.data,
                                onCompleted: (opRslt) => {
                                    try {
                                        if (opRslt.resultCode !== 0) {
                                            throw new Error(opRslt.message);
                                        }
                                        data.data.markOld();
                                        data.data.logInst++;
                                        next();
                                    } catch (error) {
                                        next(error);
                                    }
                                }
                            });
                        } else {
                            next();
                        }
                    } else if (data instanceof ConfigItemIdentity) {
                        if (data.extra && data.extra.isDirty === true) {
                            // 未设置值，则删除此条记录
                            if (ibas.objects.isNull(data.extra.configValue)) {
                                if (data.extra.isNew === true) {
                                    next(); return;
                                } else {
                                    data.extra.delete();
                                }
                            }
                            boRepository.saveApplicationConfigIdentity({
                                beSaved: <any>data.extra,
                                onCompleted: (opRslt) => {
                                    try {
                                        if (opRslt.resultCode !== 0) {
                                            throw new Error(opRslt.message);
                                        }
                                        data.extra.markOld();
                                        data.extra.logInst++;
                                        next();
                                    } catch (error) {
                                        next(error);
                                    }
                                }
                            });
                        } else {
                            next();
                        }
                    }
                }, (error) => {
                    this.busy(false);
                    if (error instanceof Error) {
                        this.messages(error);
                    } else {
                        this.messages(ibas.emMessageType.SUCCESS,
                            ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                    }
                });
            }
            private viewUserConfigs(): void {
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.User.PROPERTY_ACTIVATED_NAME;
                condition.operation = ibas.emConditionOperation.EQUAL;
                condition.value = ibas.emYesNo.YES.toString();
                ibas.servicesManager.runChooseService<bo.IUser>({
                    title: ibas.strings.format("{0} - {1}", ibas.i18n.prop("initialfantasy_view_user_configs"), ibas.i18n.prop("initialfantasy_app_user_choose")),
                    boCode: bo.BO_CODE_USER,
                    chooseType: ibas.emChooseType.SINGLE,
                    viewMode: ibas.emViewMode.VIEW,
                    criteria: criteria,
                    onCompleted: (selecteds) => {
                        let user: bo.IUser = selecteds.firstOrDefault();
                        if (!ibas.objects.isNull(user)) {
                            let boRepository: shell.bo.IBORepositoryShell = shell.bo.repository.create();
                            boRepository.fetchUserConfigs({
                                user: ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_CODE),
                                platform: ibas.config.get(ibas.CONFIG_ITEM_PLANTFORM),
                                onCompleted: (opRslt) => {
                                    try {
                                        if (opRslt.resultCode !== 0) {
                                            throw new Error(opRslt.message);
                                        }
                                        this.view.showUserConfigs(opRslt.resultObjects, user);
                                    } catch (error) {
                                        this.messages(error);
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
        export class ConfigGroup {
            constructor();
            constructor(code: string, name: string, icon?: string);
            constructor() {
                this.code = arguments[0];
                this.name = arguments[1];
                this.icon = arguments[2];
            }
            code: string;
            name: string;
            icon: string;
        }
        export abstract class ConfigItem extends ibas.Bindable {
            abstract readonly group: string;
            abstract readonly key: string;
            abstract readonly description: string;
            abstract readonly settings: string;
            abstract readonly category: bo.emConfigCategory;
            abstract value: string;
        }
        const PROPERTY_DATA: symbol = Symbol("data");
        const PROPERTY_EXTRA: symbol = Symbol("extra");
        export class ConfigItemOrigin extends ConfigItem {
            constructor(data: bo.IApplicationConfig) {
                super();
                this[PROPERTY_DATA] = data;
            }
            get data(): bo.IApplicationConfig {
                return this[PROPERTY_DATA];
            }
            get group(): string {
                return this.data.configGroup;
            }
            get key(): string {
                return this.data.configKey;
            }
            get description(): string {
                return this.data.configDescription;
            }
            get category(): bo.emConfigCategory {
                return this.data.category;
            }
            get settings(): string {
                return this.data.settings;
            }
            get value(): string {
                return this.data.configValue;
            }
            set value(value: string) {
                this.data.configValue = value;
                this.firePropertyChanged("value");
            }
        }
        export class ConfigItemIdentity extends ConfigItem {
            constructor(data: bo.IApplicationConfig, extra: bo.IApplicationConfigIdentity) {
                super();
                this[PROPERTY_DATA] = data;
                this[PROPERTY_EXTRA] = extra;
            }
            get data(): bo.IApplicationConfig {
                return this[PROPERTY_DATA];
            }
            get extra(): bo.IApplicationConfigIdentity {
                return this[PROPERTY_EXTRA];
            }
            get group(): string {
                return this.data.configGroup;
            }
            get key(): string {
                return this.data.configKey;
            }
            get description(): string {
                return this.data.configDescription;
            }
            get category(): bo.emConfigCategory {
                return this.data.category;
            }
            get settings(): string {
                return this.data.settings;
            }
            get roleCode(): string {
                return this.extra.roleCode;
            }
            set roleCode(value: string) {
                this.extra.roleCode = value;
            }
            get identityCode(): string {
                return this.extra.identityCode;
            }
            set identityCode(value: string) {
                this.extra.identityCode = value;
            }
            get value(): string {
                return this.extra.configValue;
            }
            set value(value: string) {
                this.extra.configValue = value;
                this.firePropertyChanged("value");
            }

        }
        /** 视图-应用程序配置 */
        export interface IApplicationConfigListView extends ibas.IView {
            /** 显示配置组 */
            showConfigGroups(datas: ConfigGroup[]): void;
            /** 改变配置组 */
            changeConfigGroupEvent: Function;
            /** 改变角色身份：参数1，角色；参数2，身份 */
            changeRoleIdentityEvent: Function;
            /** 显示配置值 */
            showConfigValues(values: ConfigItem[]): void;
            /** 保存 */
            saveEvent: Function;
            /** 编辑配置项目 */
            editConfigItemEvent: Function;
            /** 赋值配置项目值 */
            copyConfigValuesEvent: Function;
            /** 身份 */
            identity: string;
            /** 角色 */
            role: string;
            /** 预览用户配置项目值 */
            viewUserConfigsEvent: Function;
            /** 显示用户配置值 */
            showUserConfigs(values: shell.bo.IUserConfig[], user: bo.IUser): void;
        }
    }
}
