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
export * from "./BOCriteria";
export * from "./BOFiltering";
export * from "./Organization";
export * from "./Privilege";
export * from "./User";
export * from "./BOInformation";
export * from "./Project";
export * from "./BONumbering";

// 注册业务对象到工厂
import * as ibas from "ibas/index";
import { ApplicationFunction } from "./ApplicationFunction";
ibas.boFactory.register(ApplicationFunction.BUSINESS_OBJECT_CODE, ApplicationFunction);
import { ApplicationModule } from "./ApplicationModule";
ibas.boFactory.register(ApplicationModule.BUSINESS_OBJECT_CODE, ApplicationModule);
import { ApplicationPlatform } from "./ApplicationPlatform";
ibas.boFactory.register(ApplicationPlatform.BUSINESS_OBJECT_CODE, ApplicationPlatform);
import { BOCriteria } from "./BOCriteria";
ibas.boFactory.register(BOCriteria.BUSINESS_OBJECT_CODE, BOCriteria);
import { BOFiltering } from "./BOFiltering";
ibas.boFactory.register(BOFiltering.BUSINESS_OBJECT_CODE, BOFiltering);
import { Organization } from "./Organization";
ibas.boFactory.register(Organization.BUSINESS_OBJECT_CODE, Organization);
import { Privilege } from "./Privilege";
ibas.boFactory.register(Privilege.BUSINESS_OBJECT_CODE, Privilege);
import { User } from "./User";
ibas.boFactory.register(User.BUSINESS_OBJECT_CODE, User);
import { BOInformation } from "./BOInformation";
ibas.boFactory.register(BOInformation.BUSINESS_OBJECT_CODE, BOInformation);
import { Project } from "./Project";
ibas.boFactory.register(Project.BUSINESS_OBJECT_CODE, Project);
import { BONumbering, BOSeriesNumbering } from "./BONumbering";
ibas.boFactory.register(BONumbering);
ibas.boFactory.register(BOSeriesNumbering);
