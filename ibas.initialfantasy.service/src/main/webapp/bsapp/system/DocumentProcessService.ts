/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace app {
        /** 单据流程服务 */
        export class DocumentProcessService extends ibas.ServiceApplication<IDocumentProcessServiceView, ibas.IBOServiceContract> {
            /** 应用标识 */
            static APPLICATION_ID: string = "fe1823d4-7a4a-4c44-ab4b-3d150cd3ba5e";
            /** 应用名称 */
            static APPLICATION_NAME: string = "initialfantasy_app_documentprocess";
            /** 构造函数 */
            constructor() {
                super();
                this.id = DocumentProcessService.APPLICATION_ID;
                this.name = DocumentProcessService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                this.proceeding(ibas.i18n.prop("initialfantasy_display_bo_datas"));
                this.chainData(this.originData, () => {
                    this.view.showDocumentChain(this.originData);
                    this.proceeding(ibas.i18n.prop("shell_sucessful"));
                });
            }
            protected runService(contract: ibas.IBOServiceContract): void {
                if (ibas.arrays.create(contract.data).filter(c => c instanceof ibas.BODocument).length === 0) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("initialfantasy_not_document_data"));
                    return;
                }
                if (ibas.objects.isNull(this.documentRepository)) {
                    this.documentRepository = new DocumentRepository();
                    this.documentRepository.init((error) => {
                        if (error instanceof Error) {
                            this.messages(error);
                        } else {
                            this.runService(contract);
                        }
                    });
                } else {
                    this.originData = new DocumentChain(<any>ibas.arrays.create(contract.data).firstOrDefault());
                    this.show();
                }
            }
            protected documentRepository: DocumentRepository;
            protected originData: DocumentChain;

            protected chainData(origin: DocumentChain, onCompleted: () => void): void {
                this.documentRepository.fetchSources({
                    origin: origin.data,
                    onCompleted: (opRslt) => {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            for (let item of opRslt.resultObjects) {
                                origin.sources.add(new DocumentChain(item));
                            }
                            this.documentRepository.fetchTargets({
                                origin: origin.data,
                                onCompleted: (opRslt) => {
                                    try {
                                        if (opRslt.resultCode !== 0) {
                                            throw new Error(opRslt.message);
                                        }
                                        for (let item of opRslt.resultObjects) {
                                            origin.targets.add(new DocumentChain(item));
                                        }
                                        if (onCompleted instanceof Function) {
                                            onCompleted();
                                        }
                                    } catch (error) {
                                        this.messages(error);
                                    }
                                }
                            });
                        } catch (error) {
                            this.messages(error);
                        }
                    }
                });
            }
        }
        interface IFetchCallerEx extends ibas.IFetchCaller<ibas.IBODocument> {
            type: any;
        }
        interface IFetchSourceCaller extends ibas.IMethodCaller<ibas.IBODocument> {
            origin: ibas.IBODocument;
        }
        interface IFetchTargetCaller extends ibas.IMethodCaller<ibas.IBODocument> {
            origin: ibas.IBODocument;
        }
        const REPOSITORY_MAP: Map<any, any> = new Map<any, any>();
        class DocumentRepository {
            constructor() {
                this.boShipMap = new ibas.ArrayList<bo.IBORelationship>();
            }
            init(onCompleted: (error?: Error) => void): void {
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.BORelationship.PROPERTY_RELATION_NAME;
                condition.value = "DOCUMENT_BASED";
                let boRepository: bo.BORepositoryInitialFantasy = new bo.BORepositoryInitialFantasy();
                boRepository.fetchBORelationship({
                    criteria: criteria,
                    onCompleted: (opRslt) => {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            for (let item of opRslt.resultObjects) {
                                this.boShipMap.add(item);
                            }
                            if (onCompleted instanceof Function) {
                                onCompleted();
                            }
                        } catch (error) {
                            if (onCompleted instanceof Function) {
                                onCompleted(error);
                            }
                        }
                    }
                });
            }
            protected getRepository(boType: any): any {
                if (REPOSITORY_MAP.has(boType)) {
                    return REPOSITORY_MAP.get(boType);
                } else {
                    for (let nsItem in globalThis) {
                        if (typeof nsItem === "string") {
                            let ns: any = globalThis[nsItem];
                            if (typeof ns === "object") {
                                let boNs: any = ibas.objects.propertyValue(ns, "bo");
                                if (typeof boNs === "object") {
                                    for (let boItem in boNs) {
                                        if (ibas.strings.isWith(boItem, "BORepository", undefined)) {
                                            let repository: any = boNs[boItem];
                                            if (ibas.objects.isAssignableFrom(repository, ibas.BORepositoryApplication)) {
                                                if (typeof repository.prototype["fetch" + ibas.objects.nameOf(boType)] === "function") {
                                                    REPOSITORY_MAP.set(boType, repository);
                                                    return this.getRepository(boType);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return undefined;
            }
            fetch(fetcher: IFetchCallerEx): void {
                let repository: any = this.getRepository(fetcher.type);
                if (repository instanceof Function) {
                    let fetch: Function = repository.prototype["fetch" + ibas.objects.nameOf(fetcher.type)];
                    if (fetch instanceof Function) {
                        fetch.call(new repository, fetcher);
                    }
                } else {
                    if (fetcher.onCompleted instanceof Function) {
                        fetcher.onCompleted(new ibas.OperationResult(new Error("object can not be fetched.")));
                    }
                }
            }
            protected boShipMap: ibas.IList<bo.IBORelationship>;
            fetchSources(fetcher: IFetchSourceCaller): void {
                let originCode: string = ibas.objects.propertyValue(fetcher.origin, ibas.BO_PROPERTY_NAME_OBJECTCODE, true);
                if (ibas.strings.isEmpty(originCode)) {
                    if (fetcher.onCompleted instanceof Function) {
                        fetcher.onCompleted(new ibas.OperationResult(new Error("object can not be fetched.")));
                    }
                } else {
                    let docConditions: Map<string, ibas.ICondition[]> = new Map<string, ibas.ICondition[]>();
                    for (let ship of this.boShipMap.where(c => ibas.strings.equalsIgnoreCase(c.code, originCode))) {
                        if (ibas.strings.isEmpty(ship.associatedProperty)) {
                            let bsType: string = ibas.objects.propertyValue(fetcher.origin, "BaseDocumentType", true);
                            let bsEntry: number = ibas.objects.propertyValue(fetcher.origin, "BaseDocumentEntry", true);
                            if (!ibas.strings.isEmpty(bsType) && bsEntry > 0) {
                                let conditions: ibas.ICondition[] = docConditions.get(bsType);
                                if (ibas.objects.isNull(conditions)) {
                                    conditions = [];
                                    docConditions.set(bsType, conditions);
                                }
                                conditions.push(new ibas.Condition("DocEntry", ibas.emConditionOperation.EQUAL, bsEntry));
                            }
                        } else {
                            let values: any = ibas.objects.propertyValue(fetcher.origin, ship.associatedProperty, true);
                            if (values instanceof Array) {
                                for (let item of values) {
                                    let bsType: string = ibas.objects.propertyValue(item, "BaseDocumentType", true);
                                    let bsEntry: number = ibas.objects.propertyValue(item, "BaseDocumentEntry", true);
                                    if (!ibas.strings.isEmpty(bsType) && bsEntry > 0) {
                                        let conditions: ibas.ICondition[] = docConditions.get(bsType);
                                        if (ibas.objects.isNull(conditions)) {
                                            conditions = [];
                                            docConditions.set(bsType, conditions);
                                        }
                                        conditions.push(new ibas.Condition("DocEntry", ibas.emConditionOperation.EQUAL, bsEntry));
                                    }
                                }
                            }
                        }
                    }
                    let criterias: ibas.IList<ibas.ICriteria> = new ibas.ArrayList<ibas.ICriteria>();
                    for (let key of docConditions.keys()) {
                        let conditions: ibas.ICondition[] = docConditions.get(key);
                        if (conditions instanceof Array) {
                            let criteria: ibas.Criteria = new ibas.Criteria();
                            criteria.businessObject = key;
                            for (let item of conditions) {
                                criteria.conditions.add(item);
                                if (criteria.conditions.length > 1) {
                                    item.relationship = ibas.emConditionRelationship.OR;
                                }
                            }
                            if (criteria.conditions.length > 0) {
                                criterias.add(criteria);
                            }
                        }
                    }
                    this.fetchDatas(criterias, fetcher.onCompleted);
                }
            }
            fetchTargets(fetcher: IFetchTargetCaller): void {
                let originCode: string = ibas.objects.propertyValue(fetcher.origin, ibas.BO_PROPERTY_NAME_OBJECTCODE, true);
                if (ibas.strings.isEmpty(originCode)) {
                    if (fetcher.onCompleted instanceof Function) {
                        fetcher.onCompleted(new ibas.OperationResult(new Error("object can not be fetched.")));
                    }
                } else {
                    let criteria: ibas.ICriteria;
                    let condition: ibas.ICondition;
                    let criterias: ibas.IList<ibas.ICriteria> = new ibas.ArrayList<ibas.ICriteria>();
                    for (let ship of this.boShipMap.where(c => ibas.strings.equalsIgnoreCase(c.target, originCode))) {
                        let bsType: string = ship.target;
                        let bsEntry: number = fetcher.origin.docEntry;
                        if (!ibas.strings.isEmpty(bsType) && bsEntry > 0) {
                            if (ibas.strings.isEmpty(ship.associatedProperty)) {
                                criteria = new ibas.Criteria();
                                criteria.businessObject = ship.code;
                                condition = criteria.conditions.create();
                                condition.alias = "BaseDocumentType";
                                condition.value = String(bsType);
                                condition = criteria.conditions.create();
                                condition.alias = "BaseDocumentEntry";
                                condition.value = String(bsEntry);
                                criterias.add(criteria);
                            } else {
                                criteria = new ibas.Criteria();
                                criteria.businessObject = ship.code;
                                let cCriteria: ibas.IChildCriteria = criteria.childCriterias.create();
                                cCriteria.onlyHasChilds = true;
                                cCriteria.propertyPath = ship.associatedProperty;
                                condition = cCriteria.conditions.create();
                                condition.alias = "BaseDocumentType";
                                condition.value = String(bsType);
                                condition = cCriteria.conditions.create();
                                condition.alias = "BaseDocumentEntry";
                                condition.value = String(bsEntry);
                                criterias.add(criteria);
                            }
                        }
                    }
                    this.fetchDatas(criterias, fetcher.onCompleted);
                }
            }
            protected fetchDatas(criterias: ibas.ICriteria[], onCompleted: (opRslt: ibas.IOperationResult<ibas.IBODocument>) => void): void {
                if (criterias.length > 0) {
                    let boRepository: DocumentRepository = new DocumentRepository();
                    let results: ibas.IList<ibas.IBODocument> = new ibas.ArrayList<ibas.IBODocument>();
                    ibas.queues.execute(
                        criterias,
                        (criteria, next) => {
                            try {
                                let boType: any = ibas.boFactory.classOf(criteria.businessObject);
                                if (ibas.objects.isNull(boType)) {
                                    next();
                                } else {
                                    boRepository.fetch({
                                        type: boType,
                                        criteria: criteria,
                                        onCompleted: (opRslt) => {
                                            if (opRslt.resultCode !== 0) {
                                                ibas.logger.log(new Error(opRslt.message));
                                            }
                                            results.add(opRslt.resultObjects);
                                            next();
                                        }
                                    });
                                }
                            } catch (error) {
                                ibas.logger.log(error);
                                next();
                            }
                        },
                        (error) => {
                            if (onCompleted instanceof Function) {
                                if (error instanceof Error) {
                                    onCompleted(new ibas.OperationResult<ibas.IBODocument>(error));
                                } else {
                                    onCompleted(new ibas.OperationResult<ibas.IBODocument>().addResults(results));
                                }
                            }
                        }
                    );
                } else {
                    if (onCompleted instanceof Function) {
                        onCompleted(new ibas.OperationResult<ibas.IBODocument>());
                    }
                }
            }
        }

        export class DocumentChain {
            constructor(data?: ibas.IBODocument) {
                this.data = data;
                this.sources = new ibas.ArrayList<DocumentChain>();
                this.targets = new ibas.ArrayList<DocumentChain>();
            }
            data: ibas.IBODocument;
            sources: ibas.IList<DocumentChain>;
            targets: ibas.IList<DocumentChain>;
        }
        /** 视图-单据流程 */
        export interface IDocumentProcessServiceView extends ibas.IView {
            /** 显示数据 */
            showDocumentChain(data: DocumentChain): void;
        }
        /** 单据流程服务映射 */
        export class DocumentProcessServiceMapping extends ibas.ServiceMapping {
            constructor() {
                super();
                this.id = DocumentProcessService.APPLICATION_ID;
                this.name = DocumentProcessService.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
                this.proxy = ibas.BOServiceProxy;
                this.icon = ibas.i18n.prop("initialfantasy_document_process_icon");
            }
            /** 创建服务实例 */
            create(): ibas.IService<ibas.IServiceContract> {
                return new DocumentProcessService();
            }
        }
    }
}