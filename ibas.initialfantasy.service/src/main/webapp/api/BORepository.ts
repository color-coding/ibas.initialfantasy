/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace bo {

        /** InitialFantasy 业务仓库 */
        export interface IBORepositoryInitialFantasy extends ibas.IBORepositoryApplication {

            /**
             * 上传文件
             * @param caller 调用者
             */
            upload(caller: ibas.IUploadFileCaller<ibas.FileData>): void;
            /**
             * 下载文件
             * @param caller 调用者
             */
            download(caller: ibas.IDownloadFileCaller<Blob>): void;
            /**
             * 查询 应用程序配置
             * @param fetcher 查询者
             */
            fetchApplicationConfig(fetcher: ibas.IFetchCaller<bo.IApplicationConfig>): void;
            /**
             * 保存 应用程序配置
             * @param saver 保存者
             */
            saveApplicationConfig(saver: ibas.ISaveCaller<bo.IApplicationConfig>): void;
            /**
             * 查询 应用程序元素
             * @param fetcher 查询者
             */
            fetchApplicationElement(fetcher: ibas.IFetchCaller<bo.IApplicationElement>): void;
            /**
             * 保存 应用程序元素
             * @param saver 保存者
             */
            saveApplicationElement(saver: ibas.ISaveCaller<bo.IApplicationElement>): void;

            /**
             * 查询 应用程序模块
             * @param fetcher 查询者
             */
            fetchApplicationModule(fetcher: ibas.IFetchCaller<bo.IApplicationModule>): void;
            /**
             * 保存 应用程序模块
             * @param saver 保存者
             */
            saveApplicationModule(saver: ibas.ISaveCaller<bo.IApplicationModule>): void;

            /**
             * 查询 应用程序平台
             * @param fetcher 查询者
             */
            fetchApplicationPlatform(fetcher: ibas.IFetchCaller<bo.IApplicationPlatform>): void;
            /**
             * 保存 应用程序平台
             * @param saver 保存者
             */
            saveApplicationPlatform(saver: ibas.ISaveCaller<bo.IApplicationPlatform>): void;

            /**
             * 查询 业务对象检索条件
             * @param fetcher 查询者
             */
            fetchBOCriteria(fetcher: ibas.IFetchCaller<bo.IBOCriteria>): void;
            /**
             * 保存 业务对象检索条件
             * @param saver 保存者
             */
            saveBOCriteria(saver: ibas.ISaveCaller<bo.IBOCriteria>): void;

            /**
             * 查询 业务对象筛选
             * @param fetcher 查询者
             */
            fetchBOFiltering(fetcher: ibas.IFetchCaller<bo.IBOFiltering>): void;
            /**
             * 保存 业务对象筛选
             * @param saver 保存者
             */
            saveBOFiltering(saver: ibas.ISaveCaller<bo.IBOFiltering>): void;

            /**
             * 查询 组织
             * @param fetcher 查询者
             */
            fetchOrganization(fetcher: ibas.IFetchCaller<bo.IOrganization>): void;
            /**
             * 保存 组织
             * @param saver 保存者
             */
            saveOrganization(saver: ibas.ISaveCaller<bo.IOrganization>): void;
            /**
             * 查询 角色
             * @param fetcher 查询者
             */
            fetchRole(fetcher: ibas.IFetchCaller<bo.IRole>): void;

            /**
             * 查询 系统权限
             * @param fetcher 查询者
             */
            fetchPrivilege(fetcher: ibas.IFetchCaller<bo.IPrivilege>): void;
            /**
             * 保存 系统权限
             * @param saver 保存者
             */
            savePrivilege(saver: ibas.ISaveCaller<bo.IPrivilege>): void;

            /**
             * 查询 用户
             * @param fetcher 查询者
             */
            fetchUser(fetcher: ibas.IFetchCaller<bo.IUser>): void;
            /**
             * 保存 用户
             * @param saver 保存者
             */
            saveUser(saver: ibas.ISaveCaller<bo.IUser>): void;

            /**
             * 查询 业务对象信息
             * @param fetcher 查询者
             */
            fetchBOInformation(fetcher: ibas.IFetchCaller<bo.IBOInformation>): void;
            /**
             * 保存 业务对象信息
             * @param saver 保存者
             */
            saveBOInformation(saver: ibas.ISaveCaller<bo.IBOInformation>): void;
            /**
             * 查询 身份
             * @param fetcher 查询者
             */
            fetchIdentity(fetcher: ibas.IFetchCaller<bo.IIdentity>): void;
            /**
             * 保存 身份
             * @param saver 保存者
             */
            saveIdentity(saver: ibas.ISaveCaller<bo.IIdentity>): void;
            /**
             * 查询 用户身份
             * @param fetcher 查询者
             */
            fetchUserIdentity(fetcher: ibas.IFetchCaller<bo.IUserIdentity>): void;
            /**
             * 保存 用户身份
             * @param saver 保存者
             */
            saveUserIdentity(saver: ibas.ISaveCaller<bo.IUserIdentity>): void;
            /**
             * 查询 身份权限
             * @param fetcher 查询者
             */
            fetchIdentityPrivilege(fetcher: ibas.IFetchCaller<bo.IIdentityPrivilege>): void;
            /**
             * 保存 身份权限
             * @param saver 保存者
             */
            saveIdentityPrivilege(saver: ibas.ISaveCaller<bo.IIdentityPrivilege>): void;
            /**
             * 查询 业务对象属性设置
             * @param fetcher 查询者
             */
            fetchBOPropertySetting(fetcher: ibas.IFetchCaller<bo.IBOPropertySetting>): void;
            /**
             * 保存 业务对象属性设置
             * @param saver 保存者
             */
            saveBOPropertySetting(saver: ibas.ISaveCaller<bo.IBOPropertySetting>): void;
            /**
             * 查询 应用程序配置-身份
             * @param fetcher 查询者
             */
            fetchApplicationConfigIdentity(fetcher: ibas.IFetchCaller<bo.IApplicationConfigIdentity>): void;
            /**
             * 保存 应用程序配置-身份
             * @param saver 保存者
             */
            saveApplicationConfigIdentity(saver: ibas.ISaveCaller<bo.IApplicationConfigIdentity>): void;
            /**
             * 查询 重组功能
             * @param fetcher 查询者
             */
            fetchRefunction(fetcher: ibas.IFetchCaller<bo.IRefunction>): void;
            /**
             * 保存 重组功能
             * @param saver 保存者
             */
            saveRefunction(saver: ibas.ISaveCaller<bo.IRefunction>): void;
        }
    }
}
