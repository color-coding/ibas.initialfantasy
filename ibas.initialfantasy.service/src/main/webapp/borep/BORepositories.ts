/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as ibas from "ibas/index";
import * as bo from "./bo/index";
import { IBORepositoryInitialFantasy, BO_REPOSITORY_INITIALFANTASY } from "../api/index";
import { DataConverter4if } from "./DataConverters";

/** <%Domain.Name%> 业务仓库 */
export class BORepositoryInitialFantasy extends ibas.BORepositoryApplication implements IBORepositoryInitialFantasy {

    /** 创建此模块的后端与前端数据的转换者 */
    protected createConverter(): ibas.IDataConverter {
        return new DataConverter4if();
    }

    /**
     * 上传文件
     * @param caller 调用者
     */
    upload(caller: ibas.UploadFileCaller<ibas.FileData>): void {
        if (!this.address.endsWith("/")) { this.address += "/"; }
        let fileRepository: ibas.FileRepositoryUploadAjax = new ibas.FileRepositoryUploadAjax();
        fileRepository.address = this.address.replace("/services/rest/data/", "/services/rest/file/");
        fileRepository.token = this.token;
        fileRepository.converter = this.createConverter();
        fileRepository.upload("upload", caller);
    }
    /**
     * 下载文件
     * @param caller 调用者
     */
    download(caller: ibas.DownloadFileCaller<Blob>): void {
        if (!this.address.endsWith("/")) { this.address += "/"; }
        let fileRepository: ibas.FileRepositoryDownloadAjax = new ibas.FileRepositoryDownloadAjax();
        fileRepository.address = this.address.replace("/services/rest/data/", "/services/rest/file/");
        fileRepository.token = this.token;
        fileRepository.converter = this.createConverter();
        fileRepository.download("download", caller);
    }
    /**
     * 查询 应用程序功能
     * @param fetcher 查询者
     */
    fetchApplicationFunction(fetcher: ibas.FetchCaller<bo.ApplicationFunction>): void {
        super.fetch(bo.ApplicationFunction.name, fetcher);
    }
    /**
     * 保存 应用程序功能
     * @param saver 保存者
     */
    saveApplicationFunction(saver: ibas.SaveCaller<bo.ApplicationFunction>): void {
        super.save(bo.ApplicationFunction.name, saver);
    }

    /**
     * 查询 应用程序模块
     * @param fetcher 查询者
     */
    fetchApplicationModule(fetcher: ibas.FetchCaller<bo.ApplicationModule>): void {
        super.fetch(bo.ApplicationModule.name, fetcher);
    }
    /**
     * 保存 应用程序模块
     * @param saver 保存者
     */
    saveApplicationModule(saver: ibas.SaveCaller<bo.ApplicationModule>): void {
        super.save(bo.ApplicationModule.name, saver);
    }

    /**
     * 查询 应用程序平台
     * @param fetcher 查询者
     */
    fetchApplicationPlatform(fetcher: ibas.FetchCaller<bo.ApplicationPlatform>): void {
        super.fetch(bo.ApplicationPlatform.name, fetcher);
    }
    /**
     * 保存 应用程序平台
     * @param saver 保存者
     */
    saveApplicationPlatform(saver: ibas.SaveCaller<bo.ApplicationPlatform>): void {
        super.save(bo.ApplicationPlatform.name, saver);
    }

    /**
     * 查询 业务对象检索条件
     * @param fetcher 查询者
     */
    fetchBOCriteria(fetcher: ibas.FetchCaller<bo.BOCriteria>): void {
        super.fetch(bo.BOCriteria.name, fetcher);
    }
    /**
     * 保存 业务对象检索条件
     * @param saver 保存者
     */
    saveBOCriteria(saver: ibas.SaveCaller<bo.BOCriteria>): void {
        super.save(bo.BOCriteria.name, saver);
    }

    /**
     * 查询 业务对象筛选
     * @param fetcher 查询者
     */
    fetchBOFiltering(fetcher: ibas.FetchCaller<bo.BOFiltering>): void {
        super.fetch(bo.BOFiltering.name, fetcher);
    }
    /**
     * 保存 业务对象筛选
     * @param saver 保存者
     */
    saveBOFiltering(saver: ibas.SaveCaller<bo.BOFiltering>): void {
        super.save(bo.BOFiltering.name, saver);
    }

    /**
     * 查询 组织
     * @param fetcher 查询者
     */
    fetchOrganization(fetcher: ibas.FetchCaller<bo.Organization>): void {
        super.fetch(bo.Organization.name, fetcher);
    }
    /**
     * 保存 组织
     * @param saver 保存者
     */
    saveOrganization(saver: ibas.SaveCaller<bo.Organization>): void {
        super.save(bo.Organization.name, saver);
    }

    /**
     * 查询 系统权限
     * @param fetcher 查询者
     */
    fetchPrivilege(fetcher: ibas.FetchCaller<bo.Privilege>): void {
        super.fetch(bo.Privilege.name, fetcher);
    }
    /**
     * 保存 系统权限
     * @param saver 保存者
     */
    savePrivilege(saver: ibas.SaveCaller<bo.Privilege>): void {
        super.save(bo.Privilege.name, saver);
    }

    /**
     * 查询 用户
     * @param fetcher 查询者
     */
    fetchUser(fetcher: ibas.FetchCaller<bo.User>): void {
        super.fetch(bo.User.name, fetcher);
    }
    /**
     * 保存 用户
     * @param saver 保存者
     */
    saveUser(saver: ibas.SaveCaller<bo.User>): void {
        super.save(bo.User.name, saver);
    }
    /**
     * 查询 业务对象信息
     * @param fetcher 查询者
     */
    fetchBOInformation(fetcher: ibas.FetchCaller<bo.BOInformation>): void {
        super.fetch(bo.BOInformation.name, fetcher);
    }
    /**
     * 保存 业务对象信息
     * @param saver 保存者
     */
    saveBOInformation(saver: ibas.SaveCaller<bo.BOInformation>): void {
        super.save(bo.BOInformation.name, saver);
    }
    /**
     * 查询 业务对象编号方式
     * @param fetcher 查询者
     */
    fetchBONumbering(fetcher: ibas.FetchCaller<bo.BONumbering>): void {
        super.fetch(bo.BONumbering.name, fetcher);
    }
    /**
     * 查询 业务对象序列编号方式
     * @param fetcher 查询者
     */
    fetchBOSeriesNumbering(fetcher: ibas.FetchCaller<bo.BOSeriesNumbering>): void {
        super.fetch(bo.BOSeriesNumbering.name, fetcher);
    }
    /**
     * 保存 业务对象序列编号方式
     * @param saver 保存者
     */
    saveBOSeriesNumbering(saver: ibas.SaveCaller<bo.BOSeriesNumbering>): void {
        super.save(bo.BOSeriesNumbering.name, saver);
    }

    /**
     * 查询 项目
     * @param fetcher 查询者
     */
    fetchProject(fetcher: ibas.FetchCaller<bo.Project>): void {
        super.fetch(bo.Project.name, fetcher);
    }
    /**
     * 保存 项目
     * @param saver 保存者
     */
    saveProject(saver: ibas.SaveCaller<bo.Project>): void {
        super.save(bo.Project.name, saver);
    }
}
// 注册业务对象仓库到工厂
ibas.boFactory.register(BO_REPOSITORY_INITIALFANTASY, BORepositoryInitialFantasy);
