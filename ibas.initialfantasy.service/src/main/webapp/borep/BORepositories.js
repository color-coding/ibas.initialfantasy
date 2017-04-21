define(["require", "exports", "ibas/index", "./bo/index", "./DataConverters"], function (require, exports, ibas, bo, DataConverters_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BORepositoryInitialFantasy extends ibas.BORepositoryApplication {
        createConverter() {
            if (this.offline) {
                return new DataConverters_1.DataConverterOffline();
            }
            else {
                return new DataConverters_1.DataConverterOnline();
            }
        }
        fetchApplicationFunction(fetcher) {
            super.fetch(bo.ApplicationFunction.name, fetcher);
        }
        saveApplicationFunction(saver) {
            super.save(bo.ApplicationFunction.name, saver);
        }
        fetchApplicationModule(fetcher) {
            super.fetch(bo.ApplicationModule.name, fetcher);
        }
        saveApplicationModule(saver) {
            super.save(bo.ApplicationModule.name, saver);
        }
        fetchApplicationPlatform(fetcher) {
            super.fetch(bo.ApplicationPlatform.name, fetcher);
        }
        saveApplicationPlatform(saver) {
            super.save(bo.ApplicationPlatform.name, saver);
        }
        fetchApprovalRequest(fetcher) {
            super.fetch(bo.ApprovalRequest.name, fetcher);
        }
        saveApprovalRequest(saver) {
            super.save(bo.ApprovalRequest.name, saver);
        }
        fetchApprovalTemplate(fetcher) {
            super.fetch(bo.ApprovalTemplate.name, fetcher);
        }
        saveApprovalTemplate(saver) {
            super.save(bo.ApprovalTemplate.name, saver);
        }
        fetchBOCriteria(fetcher) {
            super.fetch(bo.BOCriteria.name, fetcher);
        }
        saveBOCriteria(saver) {
            super.save(bo.BOCriteria.name, saver);
        }
        fetchBOFiltering(fetcher) {
            super.fetch(bo.BOFiltering.name, fetcher);
        }
        saveBOFiltering(saver) {
            super.save(bo.BOFiltering.name, saver);
        }
        fetchOrganization(fetcher) {
            super.fetch(bo.Organization.name, fetcher);
        }
        saveOrganization(saver) {
            super.save(bo.Organization.name, saver);
        }
        fetchOrganizationalStructure(fetcher) {
            super.fetch(bo.OrganizationalStructure.name, fetcher);
        }
        saveOrganizationalStructure(saver) {
            super.save(bo.OrganizationalStructure.name, saver);
        }
        fetchOwnership(fetcher) {
            super.fetch(bo.Ownership.name, fetcher);
        }
        saveOwnership(saver) {
            super.save(bo.Ownership.name, saver);
        }
        fetchPrivilege(fetcher) {
            super.fetch(bo.Privilege.name, fetcher);
        }
        savePrivilege(saver) {
            super.save(bo.Privilege.name, saver);
        }
        fetchRole(fetcher) {
            super.fetch(bo.Role.name, fetcher);
        }
        saveRole(saver) {
            super.save(bo.Role.name, saver);
        }
        fetchUser(fetcher) {
            super.fetch(bo.User.name, fetcher);
        }
        saveUser(saver) {
            super.save(bo.User.name, saver);
        }
    }
    exports.BORepositoryInitialFantasy = BORepositoryInitialFantasy;
});
