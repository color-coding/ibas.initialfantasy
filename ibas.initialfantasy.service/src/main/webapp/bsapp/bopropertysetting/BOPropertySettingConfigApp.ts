/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        /** 列表应用-业务对象属性设置 */
        export class BOPropertySettingConfigApp extends ibas.BOQueryApplication<IBOPropertySettingConfigView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "0c930308-47c7-4b07-b2a9-f0da5e85307d";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_bopropertysetting_list";
            /** 构造函数 */
            constructor() {
                super();
                this.id = BOPropertySettingConfigApp.APPLICATION_ID;
                this.name = BOPropertySettingConfigApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.editBusinessObjectEvent = this.editBusinessObject;
                this.view.selectedBusinessObjectEvent = this.selectedBusinessObject;
                this.view.deleteSettingsEvent = this.deleteSettings;
                this.view.saveSettingsEvent = this.saveSettings;
                this.view.copySettingsEvent = this.copySettings;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
            }
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void {
                this.busy(true);
                if (criteria instanceof ibas.Criteria) {
                    criteria.noChilds = true;
                }
                let that: this = this;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchBOInformation({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.BOInformation>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (!that.isViewShowed()) {
                                // 没显示视图，先显示
                                that.show();
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.showBusinessObjects(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            private propertySettings: ibas.IList<PropertySetting>;
            private selectedBusinessObject(data: bo.BOInformation): void {
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_edit")
                    ));
                    return;
                }
                if (this.propertySettings instanceof Array) {
                    for (let item of this.propertySettings) {
                        if (item.isDirty) {
                            this.messages({
                                type: ibas.emMessageType.QUESTION,
                                title: ibas.i18n.prop(this.name),
                                message: ibas.i18n.prop("shell_data_not_saved_continue"),
                                actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                                onCompleted: (action: ibas.emMessageAction) => {
                                    if (action === ibas.emMessageAction.YES) {
                                        this.fetchSettings(data);
                                    }
                                }
                            });
                            return;
                        }
                    }
                }
                this.fetchSettings(data);
            }
            private fetchSettings(data: bo.BOInformation): void {
                this.busy(true);
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.BOInformation.PROPERTY_CODE_NAME;
                condition.value = data.code;
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchBOInformation({
                    criteria: criteria,
                    onCompleted: (opRslt) => {
                        if (opRslt.resultCode !== 0) {
                            this.busy(false);
                            this.messages(new Error(opRslt.message));
                        } else {
                            data = opRslt.resultObjects.firstOrDefault();
                            criteria = new ibas.Criteria();
                            condition = criteria.conditions.create();
                            condition.alias = bo.BOPropertySetting.PROPERTY_BOCODE_NAME;
                            condition.value = data.code;
                            condition = criteria.conditions.create();
                            condition.alias = bo.BOPropertySetting.PROPERTY_IDENTITYCODE_NAME;
                            condition.value = this.view.identity;
                            boRepository.fetchBOPropertySetting({
                                criteria: criteria,
                                onCompleted: (opRslt) => {
                                    this.busy(false);
                                    if (opRslt.resultCode !== 0) {
                                        this.messages(new Error(opRslt.message));
                                    } else {
                                        let identity: string = this.view.identity;
                                        if (ibas.objects.isNull(identity)) {
                                            identity = "";
                                        }
                                        let datas: ibas.IList<PropertySetting> = new ibas.ArrayList<PropertySetting>();
                                        for (let property of data.boPropertyInformations) {
                                            if (property.editSize < 0) {
                                                continue;
                                            }
                                            let setting: bo.BOPropertySetting = opRslt.resultObjects.firstOrDefault(
                                                c => c.boCode === property.code && c.propertyCode === property.property
                                            );
                                            if (ibas.objects.isNull(setting)) {
                                                setting = new bo.BOPropertySetting();
                                                setting.boCode = property.code;
                                                setting.propertyCode = property.property;
                                                setting.identityCode = identity;
                                                setting.authorised = bo.emAuthorisedValue.DEFAULT;
                                                setting.searched = bo.emSearchedValue.DEFAULT;
                                                setting.required = bo.emRequiredValue.DEFAULT;
                                                setting.position = undefined;
                                            }
                                            datas.add(new PropertySetting(property, setting));
                                        }
                                        this.propertySettings = ibas.arrays.sort(datas, [
                                            new ibas.Sort("position", ibas.emSortType.ASCENDING),
                                            new ibas.Sort("propertyCode", ibas.emSortType.ASCENDING)
                                        ]);
                                        this.view.showPropertySettings(this.propertySettings);
                                    }
                                }
                            });
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            private editBusinessObject(data: bo.BOInformation): void {
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_edit")
                    ));
                    return;
                }
                let app: BOInformationEditApp = new BOInformationEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(data);
            }
            private saveSettings(): void {
                if (!(this.propertySettings instanceof Array)) {
                    return;
                }
                this.busy(true);
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                ibas.queues.execute(this.propertySettings,
                    (data, next) => {
                        if (data.isDirty !== true) {
                            next();
                        } else if (data.setting.isNew === true && data.setting.isDeleted === true) {
                            next();
                        } else {
                            boRepository.saveBOPropertySetting({
                                beSaved: data.setting,
                                onCompleted: (opRslt) => {
                                    if (opRslt.resultCode !== 0) {
                                        next(new Error(opRslt.message));
                                    } else {
                                        if (opRslt.resultObjects.length > 0) {
                                            data.reset(opRslt.resultObjects.firstOrDefault());
                                        } else {
                                            data.reset();
                                        }
                                        next();
                                    }
                                }
                            });
                        }
                    },
                    (error) => {
                        this.busy(false);
                        if (error instanceof Error) {
                            this.messages(error);
                        } else {
                            this.messages(ibas.emMessageType.SUCCESS, ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                        }
                    }
                );
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_saving_data"));
            }
            private deleteSettings(): void {
                if (!(this.propertySettings instanceof Array)) {
                    return;
                }
                for (let item of this.propertySettings) {
                    item.delete();
                }
                this.saveSettings();
            }
            private copySettings(): void {
                if (!(this.propertySettings instanceof Array)) {
                    return;
                }
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.Identity.PROPERTY_CODE_NAME;
                condition.operation = ibas.emConditionOperation.NOT_EQUAL;
                condition.value = this.view.identity;
                ibas.servicesManager.runChooseService<bo.IIdentity>({
                    title: ibas.strings.format("{0}-{1}", ibas.i18n.prop("initialfantasy_copy_from"), ibas.i18n.prop("bo_bopropertysetting_identitycode")),
                    boCode: bo.BO_CODE_IDENTITY,
                    chooseType: ibas.emChooseType.SINGLE,
                    criteria: criteria,
                    viewMode: ibas.emViewMode.VIEW,
                    onCompleted: (selecteds) => {
                        let identity: bo.IIdentity = selecteds.firstOrDefault();
                        criteria = new ibas.Criteria();
                        condition = criteria.conditions.create();
                        condition.alias = bo.BOPropertySetting.PROPERTY_BOCODE_NAME;
                        condition.value = this.propertySettings.firstOrDefault().setting.boCode;
                        condition = criteria.conditions.create();
                        condition.alias = bo.BOPropertySetting.PROPERTY_IDENTITYCODE_NAME;
                        condition.value = identity.code;
                        let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                        boRepository.fetchBOPropertySetting({
                            criteria: criteria,
                            onCompleted: (opRslt) => {
                                if (opRslt.resultCode !== 0) {
                                    this.messages(new Error(opRslt.message));
                                } else {
                                    for (let item of opRslt.resultObjects) {
                                        let setting: any = this.propertySettings.firstOrDefault(c => c.propertyCode === item.propertyCode);
                                        if (setting instanceof PropertySetting) {
                                            setting.searched = item.searched;
                                            setting.authorised = item.authorised;
                                            setting.position = item.position;
                                            setting.required = item.required;
                                        }
                                    }
                                }
                            }
                        });
                    }
                });
            }
        }
        /** 视图-业务对象属性设置 */
        export interface IBOPropertySettingConfigView extends ibas.IBOQueryView {
            /** 选择业务对象信息，参数：编辑对象 */
            selectedBusinessObjectEvent: Function;
            /** 编辑业务对象信息 */
            editBusinessObjectEvent: Function;
            /** 显示业务对象信息 */
            showBusinessObjects(datas: bo.BOInformation[]): void;
            /** 保存设置 */
            saveSettingsEvent: Function;
            /** 删除设置 */
            deleteSettingsEvent: Function;
            /** 复制设置 */
            copySettingsEvent: Function;
            /** 显示对象属性设置 */
            showPropertySettings(datas: PropertySetting[]): void;
            /** 身份 */
            identity: string;
        }
        export class PropertySetting extends ibas.Bindable {
            constructor(property: bo.BOPropertyInformation, setting: bo.BOPropertySetting) {
                super();
                this.isDirty = false;
                this.property = property;
                this.setting = setting;
            }
            property: bo.BOPropertyInformation;
            setting: bo.BOPropertySetting;
            isDirty: boolean;
            get propertyCode(): string {
                return this.property.property;
            }
            get propertyName(): string {
                return this.property.description;
            }
            get propertyAlias(): string {
                return this.property.mapped;
            }
            get dataType(): string {
                return this.property.dataType;
            }
            get editType(): string {
                return this.property.editType;
            }
            get editSize(): number {
                return this.property.editSize;
            }
            get systemed(): ibas.emYesNo {
                return this.property.systemed;
            }
            get searched(): bo.emSearchedValue {
                return this.setting.searched;
            }
            set searched(value: bo.emSearchedValue) {
                this.setting.searched = value;
                this.firePropertyChanged("searched");
            }
            get authorised(): bo.emAuthorisedValue {
                return this.setting.authorised;
            }
            set authorised(value: bo.emAuthorisedValue) {
                this.setting.authorised = value;
                this.firePropertyChanged("authorised");
            }
            get position(): number {
                return this.setting.position;
            }
            set position(value: number) {
                this.setting.position = value;
                this.firePropertyChanged("position");
            }
            get required(): bo.emRequiredValue {
                return this.setting.required;
            }
            set required(value: bo.emRequiredValue) {
                this.setting.required = value;
                this.firePropertyChanged("required");
            }
            protected firePropertyChanged(property: string): void {
                super.firePropertyChanged(property);
                this.isDirty = true;
                // 都是默认值，则标记删除
                if (this.authorised === bo.emAuthorisedValue.DEFAULT
                    && this.searched === bo.emSearchedValue.DEFAULT
                    && this.required === bo.emRequiredValue.DEFAULT
                    && !(this.position > 0)) {
                    this.delete();
                }
            }
            delete(): void {
                if (this.setting.isNew === false) {
                    this.setting.delete();
                    this.isDirty = true;
                } else {
                    this.isDirty = false;
                }
            }
            reset(setting: bo.BOPropertySetting = undefined): void {
                if (setting instanceof bo.BOPropertySetting) {
                    this.setting = setting;
                    this.setting.markOld();
                } else {
                    this.setting.authorised = bo.emAuthorisedValue.DEFAULT;
                    this.setting.searched = bo.emSearchedValue.DEFAULT;
                    this.setting.required = bo.emRequiredValue.DEFAULT;
                    this.setting.position = undefined;
                    this.setting.markNew();
                }
                this.isDirty = false;
                super.firePropertyChanged("setting");
            }
        }
    }
}
