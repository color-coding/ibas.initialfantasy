/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../index.d.ts" />
/// <reference path="./organization/index.ts" />
/// <reference path="./identity/index.ts" />
/// <reference path="./user/index.ts" />
/// <reference path="./boinformation/index.ts" />
namespace initialfantasy {
    export namespace ui {
        /**
         * 视图导航
         */
        export class Navigation extends ibas.ViewNavigation {
            /**
             * 创建实例
             * @param id 应用id
             */
            protected newView(id: string): ibas.IView {
                let view: ibas.IView = null;
                switch (id) {
                    case app.UserChooseApp.APPLICATION_ID:
                        view = new m.UserChooseView();
                        break;
                    case app.OrganizationChooseApp.APPLICATION_ID:
                        view = new m.OrganizationChooseView();
                        break;
                    case app.BOInformationChooseApp.APPLICATION_ID:
                        view = new m.BOInformationChooseView();
                        break;
                    case app.IdentityChooseApp.APPLICATION_ID:
                        view = new m.IdentityChooseView();
                        break;
                    default:
                        break;
                }
                return view;
            }
        }
    }
}