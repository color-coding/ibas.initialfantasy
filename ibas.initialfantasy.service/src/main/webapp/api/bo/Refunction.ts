/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace bo {
        /** 重组功能 */
        export interface IRefunction extends ibas.IBOSimple {
            /** 名称 */
            name: string;
            /** 指派类型 */
            assignedType: emAssignedType;
            /** 指派目标 */
            assigned: string;
            /** 激活的 */
            activated: ibas.emYesNo;
            /** 生效日期 */
            validDate: Date;
            /** 失效日期 */
            invalidDate: Date;
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
            /** 备注 */
            remarks: string;

            /** 重组功能-项目集合 */
            refunctionItems: IRefunctionItems;

        }

        /** 重组功能-项目 集合 */
        export interface IRefunctionItems extends ibas.IBusinessObjects<IRefunctionItem> {
            /** 创建并添加子项 */
            create(): IRefunctionItem;
        }

        /** 重组功能-项目 */
        export interface IRefunctionItem extends ibas.IBOSimpleLine {
            /** 编号 */
            objectKey: number;
            /** 类型 */
            objectCode: string;
            /** 行号 */
            lineId: number;
            /** 显示顺序 */
            visOrder: number;
            /** 实例号（版本） */
            logInst: number;
            /** 数据源 */
            dataSource: string;
            /** 创建日期 */
            createDate: Date;
            /** 创建时间 */
            createTime: number;
            /** 修改日期 */
            updateDate: Date;
            /** 修改时间 */
            updateTime: number;
            /** 创建用户 */
            createUserSign: number;
            /** 修改用户 */
            updateUserSign: number;
            /** 创建动作标识 */
            createActionId: string;
            /** 更新动作标识 */
            updateActionId: string;
            /** 父项 */
            parent: number;
            /** 功能 */
            function: string;
            /** 描述 */
            description: string;
            /** 图片 */
            image: string;
            /** 备注 */
            remarks: string;
            /** 重组功能-项目集合 */
            refunctionItems: IRefunctionItems;

        }


    }
}
