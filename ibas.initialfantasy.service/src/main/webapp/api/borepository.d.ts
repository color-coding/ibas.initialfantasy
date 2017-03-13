/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    IBORemoteRepository,
    ICriteria,
    IOperationResult,
    FetchCaller,
    SaveCaller
} from '../3rdparty/ibas/index';
import { IApplicationFunction } from './applicationfunction/applicationfunction.data.d';
import { IApplicationModule } from './applicationmodule/applicationmodule.data.d';
import { IApplicationPlatform } from './applicationplatform/applicationplatform.data.d';
import { IApprovalTemplate } from './ApprovalTemplate/ApprovalTemplate.data.d';
import { IApprovalRequest } from './approvalrequest/approvalrequest.data.d';
import { IBOCriteria } from './bocriteria/bocriteria.data.d';
import { IBOFiltering } from './bofiltering/bofiltering.data.d';
import { IOrganization } from './organization/organization.data.d';
import { IOrganizationalStructure } from './organizationalstructure/organizationalstructure.data.d';
import { IOwnership } from './ownership/ownership.data.d';
import { IPrivilege } from './privilege/privilege.data.d';
import { IRole } from './role/role.data.d';
import { IUser } from './user/user.data.d';

/** InitialFantasy 业务仓库 */
export interface IBORepositoryInitialFantasy extends IBORemoteRepository {

    /**
     * 查询 应用程序功能
     * @param fetcher 查询者
     */
    fetchApplicationFunction(fetcher: FetchCaller<IApplicationFunction>);

    /**
     * 保存 应用程序功能
     * @param saver 保存者
     */
    saveApplicationFunction(saver: SaveCaller<IApplicationFunction>);
    /**
     * 查询 应用程序模块
     * @param fetcher 查询者
     */
    fetchApplicationModule(fetcher: FetchCaller<IApplicationModule>);

    /**
     * 保存 应用程序模块
     * @param saver 保存者
     */
    saveApplicationModule(saver: SaveCaller<IApplicationModule>);
    /**
     * 查询 应用程序平台
     * @param fetcher 查询者
     */
    fetchApplicationPlatform(fetcher: FetchCaller<IApplicationPlatform>);

    /**
     * 保存 应用程序平台
     * @param saver 保存者
     */
    saveApplicationPlatform(saver: SaveCaller<IApplicationPlatform>);
    /**
     * 查询 审批模板
     * @param fetcher 查询者
     */
    fetchApprovalTemplate(fetcher: FetchCaller<IApprovalTemplate>);

    /**
     * 保存 审批模板
     * @param saver 保存者
     */
    saveApprovalTemplate(saver: SaveCaller<IApprovalTemplate>);
    /**
     * 查询 审批记录
     * @param fetcher 查询者
     */
    fetchApprovalRequest(fetcher: FetchCaller<IApprovalRequest>);

    /**
     * 保存 审批记录
     * @param saver 保存者
     */
    saveApprovalRequest(saver: SaveCaller<IApprovalRequest>);
    /**
     * 查询 业务对象检索条件
     * @param fetcher 查询者
     */
    fetchBOCriteria(fetcher: FetchCaller<IBOCriteria>);

    /**
     * 保存 业务对象检索条件
     * @param saver 保存者
     */
    saveBOCriteria(saver: SaveCaller<IBOCriteria>);
    /**
     * 查询 业务对象筛选
     * @param fetcher 查询者
     */
    fetchBOFiltering(fetcher: FetchCaller<IBOFiltering>);

    /**
     * 保存 业务对象筛选
     * @param saver 保存者
     */
    saveBOFiltering(saver: SaveCaller<IBOFiltering>);
    /**
     * 查询 组织
     * @param fetcher 查询者
     */
    fetchOrganization(fetcher: FetchCaller<IOrganization>);

    /**
     * 保存 组织
     * @param saver 保存者
     */
    saveOrganization(saver: SaveCaller<IOrganization>);
    /**
     * 查询 组织-结构
     * @param fetcher 查询者
     */
    fetchOrganizationalStructure(fetcher: FetchCaller<IOrganizationalStructure>);

    /**
     * 保存 组织-结构
     * @param saver 保存者
     */
    saveOrganizationalStructure(saver: SaveCaller<IOrganizationalStructure>);
    /**
     * 查询 数据权限
     * @param fetcher 查询者
     */
    fetchOwnership(fetcher: FetchCaller<IOwnership>);

    /**
     * 保存 数据权限
     * @param saver 保存者
     */
    saveOwnership(saver: SaveCaller<IOwnership>);
    /**
     * 查询 系统权限
     * @param fetcher 查询者
     */
    fetchPrivilege(fetcher: FetchCaller<IPrivilege>);

    /**
     * 保存 系统权限
     * @param saver 保存者
     */
    savePrivilege(saver: SaveCaller<IPrivilege>);
    /**
     * 查询 角色
     * @param fetcher 查询者
     */
    fetchRole(fetcher: FetchCaller<IRole>);

    /**
     * 保存 角色
     * @param saver 保存者
     */
    saveRole(saver: SaveCaller<IRole>);
    /**
     * 查询 用户
     * @param fetcher 查询者
     */
    fetchUser(fetcher: FetchCaller<IUser>);

    /**
     * 保存 用户
     * @param saver 保存者
     */
    saveUser(saver: SaveCaller<IUser>);

}
