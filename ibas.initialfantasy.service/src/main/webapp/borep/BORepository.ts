/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace bo {

        /** <%Domain.Name%> 业务仓库 */
        export class BORepositoryInitialFantasy extends ibas.BORepositoryApplication implements IBORepositoryInitialFantasy {
            /** 创建此模块的后端与前端数据的转换者 */
            protected createConverter(): ibas.IDataConverter {
                return new DataConverter();
            }

            /**
             * 上传文件
             * @param caller 调用者
             */
            upload(caller: ibas.IUploadFileCaller<ibas.FileData>): void {
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
            download(caller: ibas.IDownloadFileCaller<Blob>): void {
                if (!this.address.endsWith("/")) { this.address += "/"; }
                let fileRepository: ibas.FileRepositoryDownloadAjax = new ibas.FileRepositoryDownloadAjax();
                fileRepository.address = this.address.replace("/services/rest/data/", "/services/rest/file/");
                fileRepository.token = this.token;
                fileRepository.converter = this.createConverter();
                fileRepository.download("download", caller);
            }
            /**
             * 查询 应用程序配置
             * @param fetcher 查询者
             */
            fetchApplicationConfig(fetcher: ibas.IFetchCaller<bo.ApplicationConfig>): void {
                super.fetch(bo.ApplicationConfig.name, fetcher);
            }
            /**
             * 保存 应用程序配置
             * @param saver 保存者
             */
            saveApplicationConfig(saver: ibas.ISaveCaller<bo.ApplicationConfig>): void {
                super.save(bo.ApplicationConfig.name, saver);
            }
            /**
             * 查询 应用程序元素
             * @param fetcher 查询者
             */
            fetchApplicationElement(fetcher: ibas.IFetchCaller<bo.ApplicationElement>): void {
                super.fetch(bo.ApplicationElement.name, fetcher);
            }
            /**
             * 保存 应用程序元素
             * @param saver 保存者
             */
            saveApplicationElement(saver: ibas.ISaveCaller<bo.ApplicationElement>): void {
                super.save(bo.ApplicationElement.name, saver);
            }

            /**
             * 查询 应用程序模块
             * @param fetcher 查询者
             */
            fetchApplicationModule(fetcher: ibas.IFetchCaller<bo.ApplicationModule>): void {
                super.fetch(bo.ApplicationModule.name, fetcher);
            }
            /**
             * 保存 应用程序模块
             * @param saver 保存者
             */
            saveApplicationModule(saver: ibas.ISaveCaller<bo.ApplicationModule>): void {
                super.save(bo.ApplicationModule.name, saver);
            }

            /**
             * 查询 应用程序平台
             * @param fetcher 查询者
             */
            fetchApplicationPlatform(fetcher: ibas.IFetchCaller<bo.ApplicationPlatform>): void {
                super.fetch(bo.ApplicationPlatform.name, fetcher);
            }
            /**
             * 保存 应用程序平台
             * @param saver 保存者
             */
            saveApplicationPlatform(saver: ibas.ISaveCaller<bo.ApplicationPlatform>): void {
                super.save(bo.ApplicationPlatform.name, saver);
            }

            /**
             * 查询 业务对象检索条件
             * @param fetcher 查询者
             */
            fetchBOCriteria(fetcher: ibas.IFetchCaller<bo.BOCriteria>): void {
                super.fetch(bo.BOCriteria.name, fetcher);
            }
            /**
             * 保存 业务对象检索条件
             * @param saver 保存者
             */
            saveBOCriteria(saver: ibas.ISaveCaller<bo.BOCriteria>): void {
                super.save(bo.BOCriteria.name, saver);
            }

            /**
             * 查询 业务对象筛选
             * @param fetcher 查询者
             */
            fetchBOFiltering(fetcher: ibas.IFetchCaller<bo.BOFiltering>): void {
                super.fetch(bo.BOFiltering.name, fetcher);
            }
            /**
             * 保存 业务对象筛选
             * @param saver 保存者
             */
            saveBOFiltering(saver: ibas.ISaveCaller<bo.BOFiltering>): void {
                super.save(bo.BOFiltering.name, saver);
            }

            /**
             * 查询 组织
             * @param fetcher 查询者
             */
            fetchOrganization(fetcher: ibas.IFetchCaller<bo.Organization>): void {
                super.fetch(bo.Organization.name, fetcher);
            }
            /**
             * 保存 组织
             * @param saver 保存者
             */
            saveOrganization(saver: ibas.ISaveCaller<bo.Organization>): void {
                super.save(bo.Organization.name, saver);
            }

            /**
             * 查询 角色
             * @param fetcher 查询者
             */
            fetchRole(fetcher: ibas.IFetchCaller<IRole>): void {
                super.fetch(bo.Organization.name, fetcher);
            }


            /**
             * 查询 系统权限
             * @param fetcher 查询者
             */
            fetchPrivilege(fetcher: ibas.IFetchCaller<bo.Privilege>): void {
                super.fetch(bo.Privilege.name, fetcher);
            }
            /**
             * 保存 系统权限
             * @param saver 保存者
             */
            savePrivilege(saver: ibas.ISaveCaller<bo.Privilege>): void {
                super.save(bo.Privilege.name, saver);
            }

            /**
             * 查询 用户
             * @param fetcher 查询者
             */
            fetchUser(fetcher: ibas.IFetchCaller<bo.User>): void {
                super.fetch(bo.User.name, fetcher);
            }
            /**
             * 保存 用户
             * @param saver 保存者
             */
            saveUser(saver: ibas.ISaveCaller<bo.User>): void {
                super.save(bo.User.name, saver);
            }
            /**
             * 查询 业务对象信息
             * @param fetcher 查询者
             */
            fetchBOInformation(fetcher: ibas.IFetchCaller<bo.BOInformation>): void {
                super.fetch(bo.BOInformation.name, fetcher);
            }
            /**
             * 保存 业务对象信息
             * @param saver 保存者
             */
            saveBOInformation(saver: ibas.ISaveCaller<bo.BOInformation>): void {
                super.save(bo.BOInformation.name, saver);
            }
            /**
             * 查询 业务对象编号方式
             * @param fetcher 查询者
             */
            fetchBONumbering(fetcher: ibas.IFetchCaller<bo.BONumbering>): void {
                super.fetch(bo.BONumbering.name, fetcher);
            }
            /**
             * 查询 业务对象序列编号方式
             * @param fetcher 查询者
             */
            fetchBOSeriesNumbering(fetcher: ibas.IFetchCaller<bo.BOSeriesNumbering>): void {
                super.fetch(bo.BOSeriesNumbering.name, fetcher);
            }
            /**
             * 保存 业务对象序列编号方式
             * @param saver 保存者
             */
            saveBOSeriesNumbering(saver: ibas.ISaveCaller<bo.BOSeriesNumbering>): void {
                super.save(bo.BOSeriesNumbering.name, saver);
            }

            /**
             * 查询 身份
             * @param fetcher 查询者
             */
            fetchIdentity(fetcher: ibas.IFetchCaller<bo.Identity>): void {
                super.fetch(bo.Identity.name, fetcher);
            }
            /**
             * 保存 身份
             * @param saver 保存者
             */
            saveIdentity(saver: ibas.ISaveCaller<bo.Identity>): void {
                super.save(bo.Identity.name, saver);
            }

            /**
             * 查询 用户身份
             * @param fetcher 查询者
             */
            fetchUserIdentity(fetcher: ibas.IFetchCaller<bo.UserIdentity>): void {
                super.fetch(bo.UserIdentity.name, fetcher);
            }
            /**
             * 保存 用户身份
             * @param saver 保存者
             */
            saveUserIdentity(saver: ibas.ISaveCaller<bo.UserIdentity>): void {
                super.save(bo.UserIdentity.name, saver);
            }
            /**
             * 查询 身份权限
             * @param fetcher 查询者
             */
            fetchIdentityPrivilege(fetcher: ibas.IFetchCaller<bo.IdentityPrivilege>): void {
                super.fetch(bo.IdentityPrivilege.name, fetcher);
            }
            /**
             * 保存 身份权限
             * @param saver 保存者
             */
            saveIdentityPrivilege(saver: ibas.ISaveCaller<bo.IdentityPrivilege>): void {
                super.save(bo.IdentityPrivilege.name, saver);
            }
            /**
             * 查询 业务对象属性设置
             * @param fetcher 查询者
             */
            fetchBOPropertySetting(fetcher: ibas.IFetchCaller<bo.BOPropertySetting>): void {
                super.fetch(bo.BOPropertySetting.name, fetcher);
            }
            /**
             * 保存 业务对象属性设置
             * @param saver 保存者
             */
            saveBOPropertySetting(saver: ibas.ISaveCaller<bo.BOPropertySetting>): void {
                super.save(bo.BOPropertySetting.name, saver);
            }

            /**
             * 查询 应用程序配置-身份
             * @param fetcher 查询者
             */
            fetchApplicationConfigIdentity(fetcher: ibas.IFetchCaller<bo.ApplicationConfigIdentity>): void {
                super.fetch(bo.ApplicationConfigIdentity.name, fetcher);
            }
            /**
             * 保存 应用程序配置-身份
             * @param saver 保存者
             */
            saveApplicationConfigIdentity(saver: ibas.ISaveCaller<bo.ApplicationConfigIdentity>): void {
                super.save(bo.ApplicationConfigIdentity.name, saver);
            }
        }
    }
}