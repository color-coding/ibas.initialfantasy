/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    object,
    IBORemoteRepository,
    ICriteria,
    IOperationResult,
    IDataConverter,
    BORepositoryApplication,
    FetchCaller,
    SaveCaller
} from '../3rdparty/ibas/index';
import { IBORepositoryInitialFantasy } from '../api/BORepository.d';
import { DataConverter4InitialFantasy } from './DataConverters';
import { ApplicationFunction } from './bo/ApplicationFunction';
import { ApplicationModule } from './bo/ApplicationModule';
import { ApplicationPlatform } from './bo/ApplicationPlatform';
import { ApprovalTemplate } from './bo/ApprovalTemplate';
import { ApprovalRequest } from './bo/ApprovalRequest';
import { BOCriteria } from './bo/BOCriteria';
import { BOFiltering } from './bo/BOFiltering';
import { Organization } from './bo/Organization';
import { OrganizationalStructure } from './bo/OrganizationalStructure';
import { Ownership } from './bo/Ownership';
import { Privilege } from './bo/Privilege';
import { Role } from './bo/Role';
import { User } from './bo/User';

/** <%Domain.Name%> 业务仓库 */
export class BORepositoryInitialFantasy extends BORepositoryApplication implements IBORepositoryInitialFantasy {

    private converter: DataConverter4InitialFantasy;
    /** 创建此模块的后端与前端数据的转换者 */
    protected createDataConverter(): IDataConverter {
        if (object.isNull(this.converter)) {
            this.converter = new DataConverter4InitialFantasy();
        }
        return this.converter;
    }

    /**
     * 查询 应用程序功能
     * @param fetcher 查询者
     */
    fetchApplicationFunction(fetcher: FetchCaller<ApplicationFunction>) {
        super.fetch("ApplicationFunction", fetcher);
    }

    /**
     * 保存 应用程序功能
     * @param saver 保存者
     */
    saveApplicationFunction(saver: SaveCaller<ApplicationFunction>) {
        super.save("ApplicationFunction", saver);
    }
    /**
     * 查询 应用程序模块
     * @param fetcher 查询者
     */
    fetchApplicationModule(fetcher: FetchCaller<ApplicationModule>) {
        super.fetch("ApplicationModule", fetcher);
    }

    /**
     * 保存 应用程序模块
     * @param saver 保存者
     */
    saveApplicationModule(saver: SaveCaller<ApplicationModule>) {
        super.save("ApplicationModule", saver);
    }
    /**
     * 查询 应用程序平台
     * @param fetcher 查询者
     */
    fetchApplicationPlatform(fetcher: FetchCaller<ApplicationPlatform>) {
        super.fetch("ApplicationPlatform", fetcher);
    }

    /**
     * 保存 应用程序平台
     * @param saver 保存者
     */
    saveApplicationPlatform(saver: SaveCaller<ApplicationPlatform>) {
        super.save("ApplicationPlatform", saver);
    }
    /**
     * 查询 审批模板
     * @param fetcher 查询者
     */
    fetchApprovalTemplate(fetcher: FetchCaller<ApprovalTemplate>) {
        super.fetch("ApprovalTemplate", fetcher);
    }

    /**
     * 保存 审批模板
     * @param saver 保存者
     */
    saveApprovalTemplate(saver: SaveCaller<ApprovalTemplate>) {
        super.save("ApprovalTemplate", saver);
    }
    /**
     * 查询 审批记录
     * @param fetcher 查询者
     */
    fetchApprovalRequest(fetcher: FetchCaller<ApprovalRequest>) {
        super.fetch("ApprovalRequest", fetcher);
    }

    /**
     * 保存 审批记录
     * @param saver 保存者
     */
    saveApprovalRequest(saver: SaveCaller<ApprovalRequest>) {
        super.save("ApprovalRequest", saver);
    }
    /**
     * 查询 业务对象检索条件
     * @param fetcher 查询者
     */
    fetchBOCriteria(fetcher: FetchCaller<BOCriteria>) {
        super.fetch("BOCriteria", fetcher);
    }

    /**
     * 保存 业务对象检索条件
     * @param saver 保存者
     */
    saveBOCriteria(saver: SaveCaller<BOCriteria>) {
        super.save("BOCriteria", saver);
    }
    /**
     * 查询 业务对象筛选
     * @param fetcher 查询者
     */
    fetchBOFiltering(fetcher: FetchCaller<BOFiltering>) {
        super.fetch("BOFiltering", fetcher);
    }

    /**
     * 保存 业务对象筛选
     * @param saver 保存者
     */
    saveBOFiltering(saver: SaveCaller<BOFiltering>) {
        super.save("BOFiltering", saver);
    }
    /**
     * 查询 组织
     * @param fetcher 查询者
     */
    fetchOrganization(fetcher: FetchCaller<Organization>) {
        super.fetch("Organization", fetcher);
    }

    /**
     * 保存 组织
     * @param saver 保存者
     */
    saveOrganization(saver: SaveCaller<Organization>) {
        super.save("Organization", saver);
    }
    /**
     * 查询 组织-结构
     * @param fetcher 查询者
     */
    fetchOrganizationalStructure(fetcher: FetchCaller<OrganizationalStructure>) {
        super.fetch("OrganizationalStructure", fetcher);
    }

    /**
     * 保存 组织-结构
     * @param saver 保存者
     */
    saveOrganizationalStructure(saver: SaveCaller<OrganizationalStructure>) {
        super.save("OrganizationalStructure", saver);
    }
    /**
     * 查询 数据权限
     * @param fetcher 查询者
     */
    fetchOwnership(fetcher: FetchCaller<Ownership>) {
        super.fetch("Ownership", fetcher);
    }

    /**
     * 保存 数据权限
     * @param saver 保存者
     */
    saveOwnership(saver: SaveCaller<Ownership>) {
        super.save("Ownership", saver);
    }
    /**
     * 查询 系统权限
     * @param fetcher 查询者
     */
    fetchPrivilege(fetcher: FetchCaller<Privilege>) {
        super.fetch("Privilege", fetcher);
    }

    /**
     * 保存 系统权限
     * @param saver 保存者
     */
    savePrivilege(saver: SaveCaller<Privilege>) {
        super.save("Privilege", saver);
    }
    /**
     * 查询 角色
     * @param fetcher 查询者
     */
    fetchRole(fetcher: FetchCaller<Role>) {
        super.fetch("Role", fetcher);
    }

    /**
     * 保存 角色
     * @param saver 保存者
     */
    saveRole(saver: SaveCaller<Role>) {
        super.save("Role", saver);
    }
    /**
     * 查询 用户
     * @param fetcher 查询者
     */
    fetchUser(fetcher: FetchCaller<User>) {
        super.fetch("User", fetcher);
    }

    /**
     * 保存 用户
     * @param saver 保存者
     */
    saveUser(saver: SaveCaller<User>) {
        super.save("User", saver);
    }



}
