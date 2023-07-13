/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace bo {
        /** 重组功能 */
        export class Refunction extends ibas.BOSimple<Refunction> implements IRefunction {
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_REFUNCTION;
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-名称 */
            static PROPERTY_NAME_NAME: string = "Name";
            /** 获取-名称 */
            get name(): string {
                return this.getProperty<string>(Refunction.PROPERTY_NAME_NAME);
            }
            /** 设置-名称 */
            set name(value: string) {
                this.setProperty(Refunction.PROPERTY_NAME_NAME, value);
            }

            /** 映射的属性名称-指派类型 */
            static PROPERTY_ASSIGNEDTYPE_NAME: string = "AssignedType";
            /** 获取-指派类型 */
            get assignedType(): emAssignedType {
                return this.getProperty<emAssignedType>(Refunction.PROPERTY_ASSIGNEDTYPE_NAME);
            }
            /** 设置-指派类型 */
            set assignedType(value: emAssignedType) {
                this.setProperty(Refunction.PROPERTY_ASSIGNEDTYPE_NAME, value);
            }

            /** 映射的属性名称-指派目标 */
            static PROPERTY_ASSIGNED_NAME: string = "Assigned";
            /** 获取-指派目标 */
            get assigned(): string {
                return this.getProperty<string>(Refunction.PROPERTY_ASSIGNED_NAME);
            }
            /** 设置-指派目标 */
            set assigned(value: string) {
                this.setProperty(Refunction.PROPERTY_ASSIGNED_NAME, value);
            }

            /** 映射的属性名称-激活的 */
            static PROPERTY_ACTIVATED_NAME: string = "Activated";
            /** 获取-激活的 */
            get activated(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(Refunction.PROPERTY_ACTIVATED_NAME);
            }
            /** 设置-激活的 */
            set activated(value: ibas.emYesNo) {
                this.setProperty(Refunction.PROPERTY_ACTIVATED_NAME, value);
            }

            /** 映射的属性名称-生效日期 */
            static PROPERTY_VALIDDATE_NAME: string = "ValidDate";
            /** 获取-生效日期 */
            get validDate(): Date {
                return this.getProperty<Date>(Refunction.PROPERTY_VALIDDATE_NAME);
            }
            /** 设置-生效日期 */
            set validDate(value: Date) {
                this.setProperty(Refunction.PROPERTY_VALIDDATE_NAME, value);
            }

            /** 映射的属性名称-失效日期 */
            static PROPERTY_INVALIDDATE_NAME: string = "InvalidDate";
            /** 获取-失效日期 */
            get invalidDate(): Date {
                return this.getProperty<Date>(Refunction.PROPERTY_INVALIDDATE_NAME);
            }
            /** 设置-失效日期 */
            set invalidDate(value: Date) {
                this.setProperty(Refunction.PROPERTY_INVALIDDATE_NAME, value);
            }

            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(Refunction.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(Refunction.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(Refunction.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(Refunction.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(Refunction.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(Refunction.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(Refunction.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(Refunction.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-修改日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(Refunction.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-修改日期 */
            set updateDate(value: Date) {
                this.setProperty(Refunction.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-修改时间 */
            get updateTime(): number {
                return this.getProperty<number>(Refunction.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-修改时间 */
            set updateTime(value: number) {
                this.setProperty(Refunction.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-实例号（版本） */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号（版本） */
            get logInst(): number {
                return this.getProperty<number>(Refunction.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号（版本） */
            set logInst(value: number) {
                this.setProperty(Refunction.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string = "Series";
            /** 获取-服务系列 */
            get series(): number {
                return this.getProperty<number>(Refunction.PROPERTY_SERIES_NAME);
            }
            /** 设置-服务系列 */
            set series(value: number) {
                this.setProperty(Refunction.PROPERTY_SERIES_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(Refunction.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(Refunction.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(Refunction.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(Refunction.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-修改用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(Refunction.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-修改用户 */
            set updateUserSign(value: number) {
                this.setProperty(Refunction.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(Refunction.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(Refunction.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(Refunction.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(Refunction.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string = "Remarks";
            /** 获取-备注 */
            get remarks(): string {
                return this.getProperty<string>(Refunction.PROPERTY_REMARKS_NAME);
            }
            /** 设置-备注 */
            set remarks(value: string) {
                this.setProperty(Refunction.PROPERTY_REMARKS_NAME, value);
            }


            /** 映射的属性名称-重组功能-项目集合 */
            static PROPERTY_REFUNCTIONITEMS_NAME: string = "RefunctionItems";
            /** 获取-重组功能-项目集合 */
            get refunctionItems(): RefunctionItems {
                return this.getProperty<RefunctionItems>(Refunction.PROPERTY_REFUNCTIONITEMS_NAME);
            }
            /** 设置-重组功能-项目集合 */
            set refunctionItems(value: RefunctionItems) {
                this.setProperty(Refunction.PROPERTY_REFUNCTIONITEMS_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
                this.refunctionItems = new RefunctionItems(this);
                this.objectCode = ibas.config.applyVariables(Refunction.BUSINESS_OBJECT_CODE);
                this.activated = ibas.emYesNo.YES;
                this.assignedType = bo.emAssignedType.ROLE;
            }
        }

        /** 重组功能-项目 集合 */
        export class RefunctionItems extends ibas.BusinessObjects<RefunctionItem, Refunction | RefunctionItem> implements IRefunctionItems {
            /** 创建并添加子项 */
            create(): RefunctionItem {
                let item: RefunctionItem = new RefunctionItem();
                this.add(item);
                return item;
            }
            protected afterAdd(item: RefunctionItem): void {
                super.afterAdd(item);
                if (this.parent instanceof Refunction) {
                    item.parent = -1;
                } else if (this.parent instanceof RefunctionItem) {
                    item.parent = this.parent.lineId;
                }
                let max: number = 0;
                for (let element of this) {
                    if (item === element) {
                        continue;
                    }
                    if (element.visOrder > max) {
                        max = element.visOrder;
                    }
                }
                item.visOrder = max + 1;
                if (item.visOrder <= 0) {
                    item.visOrder = 1;
                }
            }
        }

        /** 重组功能-项目 */
        export class RefunctionItem extends ibas.BOSimpleLine<RefunctionItem> implements IRefunctionItem {
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-编号 */
            get objectKey(): number {
                return this.getProperty<number>(RefunctionItem.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-编号 */
            set objectKey(value: number) {
                this.setProperty(RefunctionItem.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-类型 */
            get objectCode(): string {
                return this.getProperty<string>(RefunctionItem.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-类型 */
            set objectCode(value: string) {
                this.setProperty(RefunctionItem.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-行号 */
            static PROPERTY_LINEID_NAME: string = "LineId";
            /** 获取-行号 */
            get lineId(): number {
                return this.getProperty<number>(RefunctionItem.PROPERTY_LINEID_NAME);
            }
            /** 设置-行号 */
            set lineId(value: number) {
                this.setProperty(RefunctionItem.PROPERTY_LINEID_NAME, value);
            }

            /** 映射的属性名称-显示顺序 */
            static PROPERTY_VISORDER_NAME: string = "VisOrder";
            /** 获取-显示顺序 */
            get visOrder(): number {
                return this.getProperty<number>(RefunctionItem.PROPERTY_VISORDER_NAME);
            }
            /** 设置-显示顺序 */
            set visOrder(value: number) {
                this.setProperty(RefunctionItem.PROPERTY_VISORDER_NAME, value);
            }

            /** 映射的属性名称-实例号（版本） */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号（版本） */
            get logInst(): number {
                return this.getProperty<number>(RefunctionItem.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号（版本） */
            set logInst(value: number) {
                this.setProperty(RefunctionItem.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(RefunctionItem.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(RefunctionItem.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(RefunctionItem.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(RefunctionItem.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(RefunctionItem.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(RefunctionItem.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-修改日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-修改日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(RefunctionItem.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-修改日期 */
            set updateDate(value: Date) {
                this.setProperty(RefunctionItem.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-修改时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-修改时间 */
            get updateTime(): number {
                return this.getProperty<number>(RefunctionItem.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-修改时间 */
            set updateTime(value: number) {
                this.setProperty(RefunctionItem.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(RefunctionItem.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(RefunctionItem.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-修改用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-修改用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(RefunctionItem.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-修改用户 */
            set updateUserSign(value: number) {
                this.setProperty(RefunctionItem.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(RefunctionItem.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(RefunctionItem.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(RefunctionItem.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(RefunctionItem.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-父项 */
            static PROPERTY_PARENT_NAME: string = "Parent";
            /** 获取-父项 */
            get parent(): number {
                return this.getProperty<number>(RefunctionItem.PROPERTY_PARENT_NAME);
            }
            /** 设置-父项 */
            set parent(value: number) {
                this.setProperty(RefunctionItem.PROPERTY_PARENT_NAME, value);
            }

            /** 映射的属性名称-功能 */
            static PROPERTY_FUNCTION_NAME: string = "Function";
            /** 获取-功能 */
            get function(): string {
                return this.getProperty<string>(RefunctionItem.PROPERTY_FUNCTION_NAME);
            }
            /** 设置-功能 */
            set function(value: string) {
                this.setProperty(RefunctionItem.PROPERTY_FUNCTION_NAME, value);
            }

            /** 映射的属性名称-描述 */
            static PROPERTY_DESCRIPTION_NAME: string = "Description";
            /** 获取-描述 */
            get description(): string {
                return this.getProperty<string>(RefunctionItem.PROPERTY_DESCRIPTION_NAME);
            }
            /** 设置-描述 */
            set description(value: string) {
                this.setProperty(RefunctionItem.PROPERTY_DESCRIPTION_NAME, value);
            }

            /** 映射的属性名称-图片 */
            static PROPERTY_IMAGE_NAME: string = "Image";
            /** 获取-图片 */
            get image(): string {
                return this.getProperty<string>(RefunctionItem.PROPERTY_IMAGE_NAME);
            }
            /** 设置-图片 */
            set image(value: string) {
                this.setProperty(RefunctionItem.PROPERTY_IMAGE_NAME, value);
            }

            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string = "Remarks";
            /** 获取-备注 */
            get remarks(): string {
                return this.getProperty<string>(RefunctionItem.PROPERTY_REMARKS_NAME);
            }
            /** 设置-备注 */
            set remarks(value: string) {
                this.setProperty(RefunctionItem.PROPERTY_REMARKS_NAME, value);
            }

            /** 映射的属性名称-重组功能-项目集合 */
            static PROPERTY_REFUNCTIONITEMS_NAME: string = "RefunctionItems";
            /** 获取-重组功能-项目集合 */
            get refunctionItems(): RefunctionItems {
                return this.getProperty<RefunctionItems>(Refunction.PROPERTY_REFUNCTIONITEMS_NAME);
            }
            /** 设置-重组功能-项目集合 */
            set refunctionItems(value: RefunctionItems) {
                this.setProperty(Refunction.PROPERTY_REFUNCTIONITEMS_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
                this.refunctionItems = new RefunctionItems(this);
            }
        }

    }
}
