﻿/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../api/index.ts" />
/// <reference path="./bo/ApplicationConfig.ts" />
/// <reference path="./bo/ApplicationConfigIdentity.ts" />
/// <reference path="./bo/ApplicationElement.ts" />
/// <reference path="./bo/ApplicationModule.ts" />
/// <reference path="./bo/ApplicationPlatform.ts" />
/// <reference path="./bo/BOCriteria.ts" />
/// <reference path="./bo/BOFiltering.ts" />
/// <reference path="./bo/BOInformation.ts" />
/// <reference path="./bo/BONumbering.ts" />
/// <reference path="./bo/Organization.ts" />
/// <reference path="./bo/Privilege.ts" />
/// <reference path="./bo/User.ts" />
/// <reference path="./bo/Identity.ts" />
/// <reference path="./bo/UserIdentity.ts" />
/// <reference path="./bo/IdentityPrivilege.ts" />
/// <reference path="./bo/BOPropertySetting.ts" />
/// <reference path="./bo/BOLogst.ts" />
/// <reference path="./bo/Refunction.ts" />
/// <reference path="./DataConverter.ts" />
/// <reference path="./BORepository.ts" />

namespace initialfantasy {
    export namespace bo {
        // 注册业务对象仓库到工厂
        boFactory.register(BO_REPOSITORY_INITIALFANTASY, BORepositoryInitialFantasy);
        // 注册业务对象到工厂
        boFactory.register(BONumbering);
        boFactory.register(BOSeriesNumbering);
        boFactory.register(BOLogst);
        boFactory.register(ApplicationConfig.BUSINESS_OBJECT_CODE, ApplicationConfig);
        boFactory.register(ApplicationElement.BUSINESS_OBJECT_CODE, ApplicationElement);
        boFactory.register(ApplicationModule.BUSINESS_OBJECT_CODE, ApplicationModule);
        boFactory.register(ApplicationPlatform.BUSINESS_OBJECT_CODE, ApplicationPlatform);
        boFactory.register(BOCriteria.BUSINESS_OBJECT_CODE, BOCriteria);
        boFactory.register(BOFiltering.BUSINESS_OBJECT_CODE, BOFiltering);
        boFactory.register(Organization.BUSINESS_OBJECT_CODE, Organization);
        boFactory.register(Privilege.BUSINESS_OBJECT_CODE, Privilege);
        boFactory.register(User.BUSINESS_OBJECT_CODE, User);
        boFactory.register(Identity.BUSINESS_OBJECT_CODE, Identity);
        boFactory.register(UserIdentity.BUSINESS_OBJECT_CODE, UserIdentity);
        boFactory.register(BOInformation.BUSINESS_OBJECT_CODE, BOInformation);
        boFactory.register(IdentityPrivilege.BUSINESS_OBJECT_CODE, IdentityPrivilege);
        boFactory.register(BOPropertySetting.BUSINESS_OBJECT_CODE, BOPropertySetting);
        boFactory.register(ApplicationConfigIdentity.BUSINESS_OBJECT_CODE, ApplicationConfigIdentity);
        boFactory.register(BORelationship.BUSINESS_OBJECT_CODE, BORelationship);
        boFactory.register(Refunction.BUSINESS_OBJECT_CODE, Refunction);
        boFactory.register(BO_CODE_BOPROPERTY, BOPropertyInformation);
    }
}