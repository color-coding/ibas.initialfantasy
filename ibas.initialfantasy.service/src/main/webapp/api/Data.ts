/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    /** 模块-标识 */
    export const CONSOLE_ID: string = "c2b31c06-20d8-44a2-bb34-17f47ed01859";
    /** 模块-名称 */
    export const CONSOLE_NAME: string = "InitialFantasy";
    /** 模块-版本 */
    export const CONSOLE_VERSION: string = "0.1.0";
    /** 配置值-组织方式 */
    export const CONFIG_VALUE_ORGANIZATION_WAY: string = "initial";
    /** 配置值-数据权限方式 */
    export const CONFIG_VALUE_OWNERSHIP_WAY: string = "initial";

    export namespace config {
        /**
         * 获取此模块配置
         * @param key 配置项
         * @param defalut 默认值
         */
        export function get<T>(key: string, defalut?: T): T {
            return ibas.config.get(ibas.strings.format("{0}|{1}", CONSOLE_ID, key), defalut);
        }
    }

    export namespace bo {
        /** 业务仓库名称 */
        export const BO_REPOSITORY_INITIALFANTASY: string = ibas.strings.format(ibas.MODULE_REPOSITORY_NAME_TEMPLATE, CONSOLE_NAME);
        /** 业务对象编码-应用程序配置 */
        export const BO_CODE_APPLICATIONCONFIG: string = "${Company}_SYS_CONFIG";
        /** 业务对象编码-应用程序元素 */
        export const BO_CODE_APPLICATIONELEMENT: string = "${Company}_SYS_ELEMENT";
        /** 业务对象编码-应用程序模块 */
        export const BO_CODE_APPLICATIONMODULE: string = "${Company}_SYS_MODULE";
        /** 业务对象编码-应用程序平台 */
        export const BO_CODE_APPLICATIONPLATFORM: string = "${Company}_SYS_PLATFORM";
        /** 业务对象编码-业务对象检索条件 */
        export const BO_CODE_BOCRITERIA: string = "${Company}_SYS_BOCRITERIA";
        /** 业务对象编码-业务对象筛选 */
        export const BO_CODE_BOFILTERING: string = "${Company}_SYS_BOFILTERING";
        /** 业务对象编码-组织 */
        export const BO_CODE_ORGANIZATION: string = "${Company}_SYS_ORGANIZATION";
        /** 业务对象编码-系统权限 */
        export const BO_CODE_PRIVILEGE: string = "${Company}_SYS_PRIVILEGE";
        /** 业务对象编码-用户 */
        export const BO_CODE_USER: string = "${Company}_SYS_USER";
        /** 业务对象编码-业务对象信息 */
        export const BO_CODE_BOINFORMATION: string = "${Company}_SYS_BOINFO";
        /** 业务对象编码-业务对象属性 */
        export const BO_CODE_BOPROPERTY: string = "${Company}_SYS_BOPRTY";
        /** 业务对象编码-系统变量 */
        export const BO_CODE_SYSTEM_VARIABLE: string = "${Company}_SYS_VARIABLE";
        /** 业务对象编码-系统配置 */
        export const BO_CODE_SYSTEM_CONFIG: string = "${Company}_SYS_CONFIG";
        /** 业务对象编码-用户角色（默认与组织相同） */
        export const BO_CODE_ROLE: string = "${Company}_SYS_ROLE";
        /** 业务对象编码-身份 */
        export const BO_CODE_IDENTITY: string = "${Company}_SYS_IDENTITY";
        /** 业务对象编码-用户身份 */
        export const BO_CODE_USERIDENTITY: string = "${Company}_SYS_USERIDENTITY";
        /** 业务对象编码-身份权限 */
        export const BO_CODE_IDENTITYPRIVILEGE: string = "${Company}_SYS_IDENTPRIVILEGE";
        /** 业务对象编码-业务对象属性设置 */
        export const BO_CODE_BOPROPERTYSETTING: string = "${Company}_SYS_BOPRTYSETTING";
        /** 业务对象编码-应用程序配置-身份 */
        export const BO_CODE_APPLICATIONCONFIGIDENTITY: string = "${Company}_SYS_CONFIDENTITY";
        /** 业务对象编码-业务对象属性值 */
        export const BO_CODE_BOPROPERTY_VALUE: string = "${Company}_SYS_BOPRTYVALUE";

        /**
         * 分配类型
         */
        export enum emAssignedType {
            /** 用户 */
            USER,
            /** 角色 */
            ROLE,
        }
        /**
         * 筛选类型
         */
        export enum emFilteringType {
            /** 不可用的 */
            UNAVAILABLE,
            /** 可用的 */
            AVAILABLE
        }
        /**
         * 元素类型
         */
        export enum emElementType {
            /** 模块 */
            MODULE,
            /** 功能 */
            FUNCTION,
            /** 应用 */
            APPLICATION,
            /** 服务 */
            SERVICE,
            /** 其他 */
            OTHER
        }
        /**
         * 筛选种类
         */
        export enum emFilteringCategory {
            /** 读取 */
            READ,
            /** 保存 */
            SAVE,
            /** 新建 */
            CREATE,
            /** 更新 */
            UPDATE,
            /** 删除 */
            DELETE
        }
        /** 分配-角色 */
        export interface IRole {
            /** 编码 */
            code: string;
            /** 名称 */
            name: string;
            /** 激活 */
            activated: ibas.emYesNo;
        }
        /** 比较操作 */
        export enum emConditionOperation {
            /** 等于(=) */
            EQUAL,
            /** 大于(>) */
            GRATER_THAN,
            /** 小于(<) */
            LESS_THAN,
            /** 大于等于(>=) */
            GRATER_EQUAL,
            /** 小于等于(<=) */
            LESS_EQUAL,
            /** 不等于(<>) */
            NOT_EQUAL,
            /** 开始于 */
            BEGIN_WITH,
            /** 不是开始于 */
            NOT_BEGIN_WITH,
            /** 结束于 */
            END_WITH,
            /** 不是结束于 */
            NOT_END_WITH,
            /** 包括 */
            CONTAIN,
            /** 不包含 */
            NOT_CONTAIN,
        }
        /** 比较关系 */
        export enum emConditionRelationship {
            /** 无 */
            NONE,
            /** 并且 */
            AND,
            /** 或者 */
            OR
        }
        export enum emSearchedValue {
            /** 默认值 */
            DEFAULT,
            /** 否 */
            NO,
            /** 是 */
            YES,
        }
        export enum emAuthorisedValue {
            /** 默认值 */
            DEFAULT,
            /** 完全 */
            ALL,
            /** 只读 */
            READ,
            /** 没有 */
            NONE,
        }
        /**
         * 配置种类
         * 
         * @author Niuren.Zhu
         *
         */
        export enum emConfigCategory {
            /** 服务端 */
            SERVER,
            /** 客户端 */
            CLIENT,
        }
    }

    export namespace app {
        /** 身份权限配置契约 */
        export interface IIdentityPrivilegeConfigContract extends ibas.IServiceContract {
            /** 平台 */
            platform: ibas.emPlantform | string | bo.IApplicationPlatform;
            /** 角色 */
            role: string | bo.IRole;
            /** 角色权限 */
            privileges?: bo.IPrivilege[];
        }
        /** 身份权限配置服务代理 */
        export class IdentityPrivilegeConfigServiceProxy extends ibas.ServiceProxy<IIdentityPrivilegeConfigContract> {

        }
    }
}