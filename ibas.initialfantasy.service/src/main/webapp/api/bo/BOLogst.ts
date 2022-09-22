/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace bo {
        /** 业务对象日志 */
        export interface IBOLogst extends ibas.IBusinessObject {
            /** 类型 */
            boCode: string;
            /** 主键值 */
            boKeys: string;
            /** 实例号 */
            logInst: number;
            /** 修改用户 */
            modifyUser: number;
            /** 修改日期 */
            modifyDate: Date;
            /** 修改时间 */
            modifyTime: number;
            /** 事务标识 */
            transationId: string;
            /** 动机 */
            cause: string;
            /** 内容 */
            content: string | object;
        }


    }
}
