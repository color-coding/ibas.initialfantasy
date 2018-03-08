/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../3rdparty/ibas/index.d.ts" />
/// <reference path="../api/index.ts" />
/// <reference path="./bo/ApplicationFunction.ts" />
/// <reference path="./bo/ApplicationModule.ts" />
/// <reference path="./bo/ApplicationPlatform.ts" />
/// <reference path="./bo/BOCriteria.ts" />
/// <reference path="./bo/BOFiltering.ts" />
/// <reference path="./bo/BOInformation.ts" />
/// <reference path="./bo/BONumbering.ts" />
/// <reference path="./bo/Organization.ts" />
/// <reference path="./bo/Privilege.ts" />
/// <reference path="./bo/Project.ts" />
/// <reference path="./bo/User.ts" />
/// <reference path="./DataConverter.ts" />
/// <reference path="./BORepository.ts" />

namespace initialfantasy {
    export namespace bo {
        // 注册业务对象仓库到工厂
        ibas.boFactory.register(BO_REPOSITORY_INITIALFANTASY, BORepositoryInitialFantasy);
        // 注册业务对象到工厂
        ibas.boFactory.register(BONumbering);
        ibas.boFactory.register(BOSeriesNumbering);
        ibas.boFactory.register(ApplicationFunction.BUSINESS_OBJECT_CODE, ApplicationFunction);
        ibas.boFactory.register(ApplicationModule.BUSINESS_OBJECT_CODE, ApplicationModule);
        ibas.boFactory.register(ApplicationPlatform.BUSINESS_OBJECT_CODE, ApplicationPlatform);
        ibas.boFactory.register(BOCriteria.BUSINESS_OBJECT_CODE, BOCriteria);
        ibas.boFactory.register(BOFiltering.BUSINESS_OBJECT_CODE, BOFiltering);
        ibas.boFactory.register(Organization.BUSINESS_OBJECT_CODE, Organization);
        ibas.boFactory.register(Privilege.BUSINESS_OBJECT_CODE, Privilege);
        ibas.boFactory.register(User.BUSINESS_OBJECT_CODE, User);
        ibas.boFactory.register(BOInformation.BUSINESS_OBJECT_CODE, BOInformation);
        ibas.boFactory.register(Project.BUSINESS_OBJECT_CODE, Project);
    }
}