package org.colorcoding.ibas.bobas.approval.test.fantasy;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.IOperationMessages;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emApprovalResult;
import org.colorcoding.ibas.bobas.data.emApprovalStatus;
import org.colorcoding.ibas.bobas.data.emConditionOperation;
import org.colorcoding.ibas.bobas.data.emConditionRelationship;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.organization.IOrganizationManager;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.bobas.repository.InvalidTokenException;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;
import org.colorcoding.ibas.initialfantasy.bo.approvalrequest.ApprovalRequest;
import org.colorcoding.ibas.initialfantasy.bo.approvalrequest.IApprovalRequest;
import org.colorcoding.ibas.initialfantasy.bo.approvaltemplate.ApprovalTemplate;
import org.colorcoding.ibas.initialfantasy.bo.approvaltemplate.IApprovalTemplate;
import org.colorcoding.ibas.initialfantasy.bo.approvaltemplate.IApprovalTemplateStep;
import org.colorcoding.ibas.initialfantasy.bo.approvaltemplate.IApprovalTemplateStepCondition;
import org.colorcoding.ibas.initialfantasy.bo.organizations.IUser;
import org.colorcoding.ibas.initialfantasy.bo.organizations.User;
import org.colorcoding.ibas.initialfantasy.data.emApprovalStepOwnerType;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;
import org.colorcoding.ibas.initialfantasy.repository.IBORepositoryInitialFantasyApp;

import junit.framework.TestCase;

public class testApprovalProcess extends TestCase {

	public void testCreateApprovalProcess() throws InvalidTokenException {
		// 禁止缓存
		MyConfiguration.addConfigValue(MyConfiguration.CONFIG_ITEM_BO_REPOSITORY_DISABLED_CACHE, true);
		User apBoss = new User();
		apBoss.setCode("UB" + DateTime.getNow().toString("HHmmss"));
		apBoss.setName(apBoss.getCode());
		apBoss.setActivated(emYesNo.YES);
		apBoss.setSupper(emYesNo.YES);
		IBORepositoryInitialFantasyApp boRepository = new BORepositoryInitialFantasy();
		boRepository.setUserToken(org.colorcoding.ibas.bobas.organization.fantasy.User.SYSTEM_USER.getToken());
		IOperationResult<IUser> opRsltUser = boRepository.saveUser(apBoss);
		assertEquals(opRsltUser.getMessage(), opRsltUser.getResultCode(), 0);
		User apManager = new User();
		apManager.setCode("UM" + DateTime.getNow().toString("HHmmss"));
		apManager.setName(apManager.getCode());
		apManager.setActivated(emYesNo.YES);
		apManager.setSupper(emYesNo.YES);
		opRsltUser = boRepository.saveUser(apManager);
		assertEquals(opRsltUser.getMessage(), opRsltUser.getResultCode(), 0);
		// 创建审批模板，激活的超级管理员需要进行审批
		ApprovalTemplate at = new ApprovalTemplate();
		at.setApprovalObjectCode(MyConfiguration.applyVariables(User.BUSINESS_OBJECT_CODE));
		at.setName("超级用户的审批");
		IApprovalTemplateStep atStep01 = at.getApprovalTemplateSteps().create();
		atStep01.setStepOrder(1);
		atStep01.setStepName("manager审批");
		atStep01.setStepOwner(apManager.getDocEntry());
		IApprovalTemplateStepCondition atStepCondition = atStep01.getApprovalTemplateStepConditions().create();
		atStepCondition.setRelationship(emConditionRelationship.NONE);
		atStepCondition.setPropertyName(User.PROPERTY_SUPPER);// 注意此处应为数据库字段
		atStepCondition.setOperation(emConditionOperation.EQUAL);
		atStepCondition.setConditionValue(emYesNo.YES);
		atStepCondition = atStep01.getApprovalTemplateStepConditions().create();
		atStepCondition.setRelationship(emConditionRelationship.AND);
		atStepCondition.setPropertyName(User.PROPERTY_ACTIVATED);// 注意此处应为数据库字段
		atStepCondition.setOperation(emConditionOperation.EQUAL);
		atStepCondition.setConditionValue(emYesNo.YES);
		IApprovalTemplateStep atStep02 = at.getApprovalTemplateSteps().create();
		atStep02.setStepOrder(2);
		atStep02.setStepName("boss审批");
		atStep02.setStepOwnerType(emApprovalStepOwnerType.User);
		atStep02.setStepOwner(apBoss.getDocEntry());
		// 步骤2的审批条件与步骤1相同
		atStepCondition = atStep02.getApprovalTemplateStepConditions().create();
		atStepCondition.setRelationship(emConditionRelationship.NONE);
		atStepCondition.setPropertyName(User.PROPERTY_SUPPER);// 注意此处应为数据库字段
		atStepCondition.setOperation(emConditionOperation.EQUAL);
		atStepCondition.setConditionValue(emYesNo.YES);
		atStepCondition = atStep02.getApprovalTemplateStepConditions().create();
		atStepCondition.setRelationship(emConditionRelationship.AND);
		atStepCondition.setPropertyName(User.PROPERTY_ACTIVATED);// 注意此处应为数据库字段
		atStepCondition.setOperation(emConditionOperation.EQUAL);
		atStepCondition.setConditionValue(emYesNo.YES);
		IBORepositoryInitialFantasyApp apRepository = new BORepositoryInitialFantasy();
		apRepository.setUserToken(org.colorcoding.ibas.bobas.organization.fantasy.User.SYSTEM_USER.getToken());
		IOperationResult<IApprovalTemplate> operationResult = apRepository.saveApprovalTemplate(at);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		// 测试进入审批流程
		User user01 = new User();
		user01.setCode("U" + DateTime.getNow().toString("HHmmss") + 1);
		user01.setName(user01.getCode());
		user01.setActivated(emYesNo.YES);
		user01.setSupper(emYesNo.YES);
		boRepository = new BORepositoryInitialFantasy();
		boRepository.setUserToken(org.colorcoding.ibas.bobas.organization.fantasy.User.SYSTEM_USER.getToken());
		opRsltUser = boRepository.saveUser(user01);
		assertEquals(opRsltUser.getMessage(), opRsltUser.getResultCode(), 0);
		// 检索审批请求
		Criteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(ApprovalRequest.PROPERTY_BOKEYS.getName());
		condition.setCondVal(user01.toString());
		apRepository = new BORepositoryInitialFantasy();
		apRepository.setUserToken(org.colorcoding.ibas.bobas.organization.fantasy.User.SYSTEM_USER.getToken());
		IOperationResult<IApprovalRequest> opRsltAQ = apRepository.fetchApprovalRequest(criteria);
		assertEquals(opRsltAQ.getMessage(), opRsltAQ.getResultCode(), 0);
		assertEquals("没有生成审批请求。", opRsltAQ.getResultObjects().size(), 1);
		IApprovalRequest ap = opRsltAQ.getResultObjects().firstOrDefault();
		// 对象状态是否改变
		assertEquals("业务对象状态应为审批中。", user01.getApprovalStatus(), emApprovalStatus.PROCESSING);
		// 测试不进入审批的数据
		User user02 = new User();
		user02.setCode("U" + DateTime.getNow().toString("HHmmss") + 2);
		user02.setName(user02.getCode());
		user02.setActivated(emYesNo.YES);
		user02.setSupper(emYesNo.NO);
		boRepository = new BORepositoryInitialFantasy();
		boRepository.setUserToken(org.colorcoding.ibas.bobas.organization.fantasy.User.SYSTEM_USER.getToken());
		opRsltUser = boRepository.saveUser(user02);
		assertEquals(opRsltUser.getMessage(), opRsltUser.getResultCode(), 0);
		// 检索审批请求
		criteria = new Criteria();
		condition = criteria.getConditions().create();
		condition.setAlias(ApprovalRequest.PROPERTY_BOKEYS.getName());
		condition.setCondVal(user02.toString());
		apRepository = new BORepositoryInitialFantasy();
		apRepository.setUserToken(org.colorcoding.ibas.bobas.organization.fantasy.User.SYSTEM_USER.getToken());
		opRsltAQ = apRepository.fetchApprovalRequest(criteria);
		assertEquals(opRsltAQ.getMessage(), opRsltAQ.getResultCode(), 0);
		assertEquals("生成了审批请求。", opRsltAQ.getResultObjects().size(), 0);
		// 对象状态是否改变
		assertEquals("业务对象状态应为不影响。", user02.getApprovalStatus(), emApprovalStatus.UNAFFECTED);
		// 测试未进入审批流程的对象修改
		opRsltUser = boRepository.fetchUser(user02.getCriteria());
		user02 = (User) opRsltUser.getResultObjects().firstOrDefault();
		user02.setName(user02.getName() + user02.hashCode());
		opRsltUser = boRepository.saveUser(user02);
		assertEquals(opRsltUser.getMessage(), opRsltUser.getResultCode(), 0);
		opRsltAQ = apRepository.fetchApprovalRequest(criteria);
		assertEquals(opRsltAQ.getMessage(), opRsltAQ.getResultCode(), 0);
		assertEquals("生成审批请求。", opRsltAQ.getResultObjects().size(), 0);
		// 测试修改的数据进入审批
		opRsltUser = boRepository.fetchUser(user02.getCriteria());
		user02 = (User) opRsltUser.getResultObjects().firstOrDefault();
		user02.setSupper(emYesNo.YES);
		opRsltUser = boRepository.saveUser(user02);
		assertEquals(opRsltUser.getMessage(), opRsltUser.getResultCode(), 0);
		opRsltAQ = apRepository.fetchApprovalRequest(criteria);
		assertEquals(opRsltAQ.getMessage(), opRsltAQ.getResultCode(), 0);
		assertEquals("没有生成审批请求。", opRsltAQ.getResultObjects().size(), 1);

		// 测试步骤审批
		IOrganizationManager orgManager = OrganizationFactory.create().createManager();
		orgManager.initialize();// 已缓存，重新加载组织
		// 获取组织用户，以获取口令
		org.colorcoding.ibas.bobas.organization.fantasy.User orgApBoss = (org.colorcoding.ibas.bobas.organization.fantasy.User) orgManager
				.getUser(apBoss.getDocEntry());
		org.colorcoding.ibas.bobas.organization.fantasy.User orgApManager = (org.colorcoding.ibas.bobas.organization.fantasy.User) orgManager
				.getUser(apManager.getDocEntry());

		IOperationMessages msgRslt = apRepository.approval(ap.getObjectKey(), atStep01.getStepOrder(),
				emApprovalResult.APPROVED, "批复，经理", orgApManager.getToken());
		assertEquals(msgRslt.getMessage(), msgRslt.getResultCode(), 0);
		msgRslt = apRepository.approval(ap.getObjectKey(), atStep02.getStepOrder(), emApprovalResult.APPROVED,
				"批复，BOSS", orgApBoss.getToken());
		assertEquals(msgRslt.getMessage(), msgRslt.getResultCode(), 0);
		opRsltUser = boRepository.fetchUser(user01.getCriteria());
		assertEquals(opRsltUser.getMessage(), opRsltUser.getResultCode(), 0);
		IUser user01n = opRsltUser.getResultObjects().firstOrDefault();
		assertEquals("业务对象状态应为批准。", user01n.getApprovalStatus(), emApprovalStatus.APPROVED);
		opRsltAQ = apRepository.fetchApprovalRequest(ap.getCriteria());
		assertEquals(opRsltAQ.getMessage(), opRsltAQ.getResultCode(), 0);
		ap = opRsltAQ.getResultObjects().firstOrDefault();
		assertEquals("审批流程状态应为批准。", ap.getApprovalStatus(), emApprovalStatus.APPROVED);

		// 已批准的数据不能被修改
		user01n.setMail("--");
		opRsltUser = boRepository.saveUser(user01n);
		System.out.println(opRsltUser.getMessage());
		assertNotNull("已批准的数据被修改了", opRsltUser.getError());

		// 重置第一步
		msgRslt = apRepository.approval(ap.getObjectKey(), atStep01.getStepOrder(), emApprovalResult.PROCESSING,
				"重置，经理", orgApManager.getToken());
		assertNotSame(msgRslt.getMessage(), msgRslt.getResultCode(), 0);
		// 重置最后一步
		msgRslt = apRepository.approval(ap.getObjectKey(), atStep02.getStepOrder(), emApprovalResult.PROCESSING,
				"重置，BOSS", orgApBoss.getToken());
		assertEquals(msgRslt.getMessage(), msgRslt.getResultCode(), 0);
		opRsltUser = boRepository.fetchUser(user01.getCriteria());
		assertEquals(opRsltUser.getMessage(), opRsltUser.getResultCode(), 0);
		user01n = opRsltUser.getResultObjects().firstOrDefault();
		assertEquals("业务对象状态应为进行中。", user01n.getApprovalStatus(), emApprovalStatus.PROCESSING);
		opRsltAQ = apRepository.fetchApprovalRequest(ap.getCriteria());
		assertEquals(opRsltAQ.getMessage(), opRsltAQ.getResultCode(), 0);
		ap = opRsltAQ.getResultObjects().firstOrDefault();
		assertEquals("审批流程状态应为进行中。", ap.getApprovalStatus(), emApprovalStatus.PROCESSING);
		// 拒绝最后一步
		msgRslt = apRepository.approval(ap.getObjectKey(), atStep02.getStepOrder(), emApprovalResult.REJECTED,
				"拒绝，BOSS", orgApBoss.getToken());
		assertEquals(msgRslt.getMessage(), msgRslt.getResultCode(), 0);
		opRsltUser = boRepository.fetchUser(user01.getCriteria());
		assertEquals(opRsltUser.getMessage(), opRsltUser.getResultCode(), 0);
		user01n = opRsltUser.getResultObjects().firstOrDefault();
		assertEquals("业务对象状态应为拒绝。", user01n.getApprovalStatus(), emApprovalStatus.REJECTED);
		opRsltAQ = apRepository.fetchApprovalRequest(ap.getCriteria());
		assertEquals(opRsltAQ.getMessage(), opRsltAQ.getResultCode(), 0);
		ap = opRsltAQ.getResultObjects().firstOrDefault();
		assertEquals("审批流程状态应为拒绝。", ap.getApprovalStatus(), emApprovalStatus.REJECTED);

		// 测试，待审批数据删除，审批请求删除
		User user03 = new User();
		user03.setCode("U" + DateTime.getNow().toString("HHmmss") + 3);
		user03.setName(user03.getCode());
		user03.setActivated(emYesNo.YES);
		user03.setSupper(emYesNo.YES);
		boRepository = new BORepositoryInitialFantasy();
		boRepository.setUserToken(org.colorcoding.ibas.bobas.organization.fantasy.User.SYSTEM_USER.getToken());
		opRsltUser = boRepository.saveUser(user03);
		assertEquals(opRsltUser.getMessage(), opRsltUser.getResultCode(), 0);
		// 检索审批请求
		criteria = new Criteria();
		condition = criteria.getConditions().create();
		condition.setAlias(ApprovalRequest.PROPERTY_BOKEYS.getName());
		condition.setCondVal(user03.toString());
		apRepository = new BORepositoryInitialFantasy();
		apRepository.setUserToken(org.colorcoding.ibas.bobas.organization.fantasy.User.SYSTEM_USER.getToken());
		opRsltAQ = apRepository.fetchApprovalRequest(criteria);
		assertEquals(opRsltAQ.getMessage(), opRsltAQ.getResultCode(), 0);
		assertEquals("没有生成审批请求。", opRsltAQ.getResultObjects().size(), 1);
		ap = opRsltAQ.getResultObjects().firstOrDefault();
		user03 = (User) opRsltUser.getResultObjects().firstOrDefault();
		user03.delete();
		opRsltUser = boRepository.saveUser(user03);
		assertEquals(opRsltUser.getMessage(), opRsltUser.getResultCode(), 0);
		opRsltAQ = apRepository.fetchApprovalRequest(criteria);
		assertEquals(opRsltAQ.getMessage(), opRsltAQ.getResultCode(), 0);
		assertEquals("没有生成审批请求。", opRsltAQ.getResultObjects().size(), 1);
		IApprovalRequest approvalRequest = opRsltAQ.getResultObjects().firstOrDefault();
		assertEquals("审批请求没有被取消。", approvalRequest.getApprovalStatus(), emApprovalStatus.CANCELLED);
	}

}
