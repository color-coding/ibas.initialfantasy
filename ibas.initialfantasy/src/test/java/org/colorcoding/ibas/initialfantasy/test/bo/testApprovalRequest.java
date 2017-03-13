package org.colorcoding.ibas.initialfantasy.test.bo;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.initialfantasy.bo.approvalrequest.ApprovalRequest;
import org.colorcoding.ibas.initialfantasy.bo.approvalrequest.IApprovalRequestStep;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;
import org.colorcoding.ibas.initialfantasy.repository.IBORepositoryInitialFantasyApp;

import junit.framework.TestCase;

/**
 * 审批记录 测试
 * 
 */
public class testApprovalRequest extends TestCase {
	/**
	 * 获取连接口令
	 */
	String getToken() {
		return "";
	}

	/**
	 * 基本项目测试
	 * 
	 * @throws Exception
	 */
	public void testBasicItems() throws Exception {
		ApprovalRequest bo = new ApprovalRequest();
		// 测试属性赋值

		// 测试审批请求步骤
		IApprovalRequestStep approvalrequeststep = bo.getApprovalRequestSteps().create();
		// 测试属性赋值

		// 测试对象的保存和查询
		IOperationResult<?> operationResult = null;
		ICriteria criteria = null;
		IBORepositoryInitialFantasyApp boRepository = new BORepositoryInitialFantasy();
		// 设置用户口令
		boRepository.setUserToken(this.getToken());

		// 测试保存
		operationResult = boRepository.saveApprovalRequest(bo);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		ApprovalRequest boSaved = (ApprovalRequest) operationResult.getResultObjects().firstOrDefault();

		// 测试查询
		criteria = boSaved.getCriteria();
		criteria.setResultCount(10);
		operationResult = boRepository.fetchApprovalRequest(criteria);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);

	}

}
