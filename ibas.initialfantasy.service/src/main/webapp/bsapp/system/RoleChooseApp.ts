/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {

        /** 角色选择服务（用组织实现） */
        export class RoleChooseApp extends OrganizationChooseApp {
            /** 应用标识 */
            static APPLICATION_ID: string = "dc2c91f3-b732-407e-a163-9a1a205d2366";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_role_choose";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.BO_CODE_ROLE;

            /** 构造函数 */
            constructor() {
                super();
                this.id = OrganizationChooseApp.APPLICATION_ID;// 使用组织
                this.name = RoleChooseApp.APPLICATION_NAME;
                this.boCode = RoleChooseApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            protected fetchData(criteria: ibas.ICriteria): void {
                if (!ibas.objects.isNull(criteria)) {
                    if (criteria.sorts.length === 0) {
                        let sort: ibas.ISort = criteria.sorts.create();
                        sort.alias = bo.Organization.PROPERTY_DOCENTRY_NAME;
                        sort.sortType = ibas.emSortType.DESCENDING;
                    }
                }
                super.fetchData(criteria);
            }
        }
        /** 角色选择服务映射 */
        export class RoleChooseServiceMapping extends ibas.BOChooseServiceMapping {
            /** 构造函数 */
            constructor() {
                super();
                this.id = RoleChooseApp.APPLICATION_ID;
                this.name = RoleChooseApp.APPLICATION_NAME;
                this.boCode = RoleChooseApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IBOChooseServiceCaller<bo.IRole>> {
                return new RoleChooseApp();
            }
        }
    }
}