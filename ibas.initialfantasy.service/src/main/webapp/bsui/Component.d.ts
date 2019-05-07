/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
declare namespace initialfantasy {
    export namespace ui {
        namespace component {
            /**
             * 用户或角色
             */
            class UserOrRoleText extends sap.extension.m.ConversionText {
                /** 获取-用户或角色类型属性 */
                getTypeProperty(): string;
                /** 设置-用户或角色类型属性 */
                setTypeProperty(value: string): UserOrRoleText;
            }
        }
    }
}