/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

// 模块索引文件，此文件集中导出类
export * from "../../api/Datas";
export * from "./ApplicationFunction";
export * from "./ApplicationModule";
export * from "./ApplicationPlatform";
export * from "./ApprovalRequest";
export * from "./ApprovalTemplate";
export * from "./BOCriteria";
export * from "./BOFiltering";
export * from "./Organization";
export * from "./OrganizationalStructure";
export * from "./Ownership";
export * from "./Privilege";
export * from "./Role";
export * from "./User";
export * from "./BOInformation";

// 注册业务对象到工厂
import * as ibas from "ibas/index";
import { ApplicationFunction } from "./ApplicationFunction";
ibas.boFactory.register(ApplicationFunction.BUSINESS_OBJECT_CODE, ApplicationFunction);
import { ApplicationModule } from "./ApplicationModule";
ibas.boFactory.register(ApplicationModule.BUSINESS_OBJECT_CODE, ApplicationModule);
import { ApplicationPlatform } from "./ApplicationPlatform";
ibas.boFactory.register(ApplicationPlatform.BUSINESS_OBJECT_CODE, ApplicationPlatform);
import { ApprovalRequest } from "./ApprovalRequest";
ibas.boFactory.register(ApprovalRequest);
import { ApprovalTemplate } from "./ApprovalTemplate";
ibas.boFactory.register(ApprovalTemplate.BUSINESS_OBJECT_CODE, ApprovalTemplate);
import { BOCriteria } from "./BOCriteria";
ibas.boFactory.register(BOCriteria.BUSINESS_OBJECT_CODE, BOCriteria);
import { BOFiltering } from "./BOFiltering";
ibas.boFactory.register(BOFiltering.BUSINESS_OBJECT_CODE, BOFiltering);
import { Organization } from "./Organization";
ibas.boFactory.register(Organization.BUSINESS_OBJECT_CODE, Organization);
import { OrganizationalStructure } from "./OrganizationalStructure";
ibas.boFactory.register(OrganizationalStructure.BUSINESS_OBJECT_CODE, OrganizationalStructure);
import { Ownership } from "./Ownership";
ibas.boFactory.register(Ownership.BUSINESS_OBJECT_CODE, Ownership);
import { Privilege } from "./Privilege";
ibas.boFactory.register(Privilege.BUSINESS_OBJECT_CODE, Privilege);
import { Role } from "./Role";
ibas.boFactory.register(Role.BUSINESS_OBJECT_CODE, Role);
import { User } from "./User";
ibas.boFactory.register(User.BUSINESS_OBJECT_CODE, User);
import { BOInformation } from "./BOInformation";
ibas.boFactory.register(BOInformation.BUSINESS_OBJECT_CODE, BOInformation);
