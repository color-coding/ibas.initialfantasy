package org.colorcoding.ibas.bobas.approval.fantasy;

import java.util.Iterator;

import org.colorcoding.ibas.bobas.approval.IApprovalProcess;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.ISort;
import org.colorcoding.ibas.bobas.common.SortType;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.messages.RuntimeLog;
import org.colorcoding.ibas.bobas.repository.InvalidTokenException;
import org.colorcoding.ibas.initialfantasy.bo.approvalrequest.ApprovalRequest;
import org.colorcoding.ibas.initialfantasy.bo.approvalrequest.IApprovalRequest;
import org.colorcoding.ibas.initialfantasy.bo.approvaltemplate.ApprovalTemplate;
import org.colorcoding.ibas.initialfantasy.bo.approvaltemplate.IApprovalTemplate;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;
import org.colorcoding.ibas.initialfantasy.repository.IBORepositoryInitialFantasyApp;

/**
 * 审批流程管理员
 * 
 * 需要在app.xml中配置 <add key="ApprovalWay" value="fantasy" />
 * 
 * @author Niuren.Zhu
 *
 */
public class ApprovalProcessManager extends org.colorcoding.ibas.bobas.approval.ApprovalProcessManager {

	public ApprovalProcessManager() {

	}

	private BORepositoryInitialFantasy repository;

	/**
	 * 创建业务仓库实例，集中创建充分利用缓存提升性能。
	 * 
	 * @return
	 */
	private IBORepositoryInitialFantasyApp createRepository() {
		if (repository == null) {
			// 设置用户口令，系统用户
			try {
				repository = new BORepositoryInitialFantasy();
				repository.setUserToken(org.colorcoding.ibas.bobas.organization.fantasy.User.SYSTEM_USER.getToken());
				repository.setUseCache(false);
			} catch (InvalidTokenException e) {
				throw new RuntimeException(e);
			}
		}
		return repository;
	}

	/**
	 * 根据 boCode 查询审批流程模板 AT 创建审批流程
	 */
	@Override
	protected Iterator<IApprovalProcess> createApprovalProcess(String boCode) {
		if (boCode == null || boCode.isEmpty())
			return null;
		// 根据 boCode 查询审批流程模板 AT
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(ApprovalTemplate.PROPERTY_APPROVALOBJECTCODE.getName());
		condition.setCondVal(boCode);
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(ApprovalTemplate.PROPERTY_ACTIVATED.getName());
		condition.setCondVal(emYesNo.YES);
		ISort sort = criteria.getSorts().create();
		sort.setAlias(ApprovalTemplate.PROPERTY_OBJECTKEY.getName());
		sort.setSortType(SortType.DESCENDING);

		IBORepositoryInitialFantasyApp boRepository = this.createRepository();

		IOperationResult<IApprovalTemplate> operationResult = boRepository.fetchApprovalTemplate(criteria);
		if (operationResult.getError() != null) {
			RuntimeLog.log(operationResult.getError());
		}
		return new Iterator<IApprovalProcess>() {
			int curIndex = 0;
			int lastIndex = -1;

			@Override
			public boolean hasNext() {
				curIndex = lastIndex + 1;
				if (curIndex >= operationResult.getResultObjects().size()) {
					return false;
				}
				return true;
			}

			@Override
			public IApprovalProcess next() {
				IApprovalTemplate ApprovalTemplate = operationResult.getResultObjects().get(curIndex);
				lastIndex = curIndex;
				return ApprovalProcess.create(ApprovalTemplate);
			}

		};

	}

	/**
	 * 根据 boKey 查询审批流程请求AQ 所在的 审批流程
	 */
	@Override
	protected IApprovalProcess loadApprovalProcess(String boKey) {
		if (boKey == null || boKey.isEmpty()) {
			return null;
		}
		// 根据boKey查询审批请求
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(ApprovalRequest.PROPERTY_BOKEYS.getName());
		condition.setCondVal(boKey);
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(ApprovalTemplate.PROPERTY_ACTIVATED.getName());
		condition.setCondVal(emYesNo.YES);

		IBORepositoryInitialFantasyApp boRepository = this.createRepository();
		IOperationResult<IApprovalRequest> operationResult = boRepository.fetchApprovalRequest(criteria);
		if (operationResult.getError() != null) {
			RuntimeLog.log(operationResult.getError());
		}
		return ApprovalProcess.create(operationResult.getResultObjects().firstOrDefault());
	}

	/**
	 * 加载审批过程
	 * 
	 * @param key
	 *            审批请求编号
	 * @return
	 */
	public IApprovalProcess loadApprovalProcess(int key) {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(ApprovalRequest.PROPERTY_OBJECTKEY.getName());
		condition.setCondVal(key);
		condition = criteria.getConditions().create();
		condition.setRelationship(ConditionRelationship.AND);
		condition.setAlias(ApprovalTemplate.PROPERTY_ACTIVATED.getName());
		condition.setCondVal(emYesNo.YES);

		IBORepositoryInitialFantasyApp boRepository = this.createRepository();
		IOperationResult<IApprovalRequest> operationResult = boRepository.fetchApprovalRequest(criteria);
		if (operationResult.getError() != null) {
			RuntimeLog.log(operationResult.getError());
		}
		return ApprovalProcess.create(operationResult.getResultObjects().firstOrDefault());
	}
}
