/**
 * @license
 * Copyright color-coding studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    emYesNo,
    emDocumentStatus,
    emBOStatus,
    emApprovalStatus,
    IBusinessObject,
    IBusinessObjects
} from '../../3rdparty/ibas/index';

/** 系统权限 */
export interface IPrivilege extends IBusinessObject<IPrivilege> {

    /** 角色标识 */
    roleCode: string;
    
    /** 平台标识 */
    platformID: string;
    
    /** 模块标识 */
    moduleID: string;
    
    /** 功能标识 */
    functionID: string;
    
    /** 是否可用 */
    activated: emYesNo;
    
    /** 权限类型 */
    authoriseValue: emAuthoriseType;
    
    /** 对象编号 */
    objectKey: number;
    
    /** 对象类型 */
    objectCode: string;
    
    /** 创建日期 */
    createDate: Date;
    
    /** 创建时间 */
    createTime: number;
    
    /** 修改日期 */
    updateDate: Date;
    
    /** 修改时间 */
    updateTime: number;
    
    /** 实例号（版本） */
    logInst: number;
    
    /** 服务系列 */
    series: number;
    
    /** 数据源 */
    dataSource: string;
    
    /** 创建用户 */
    createUserSign: number;
    
    /** 修改用户 */
    updateUserSign: number;
    
    /** 创建动作标识 */
    createActionId: string;
    
    /** 更新动作标识 */
    updateActionId: string;
    

}



