package org.colorcoding.ibas.initialfantasy.test.bo;

import java.util.UUID;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.OperationMessages;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.initialfantasy.bo.applications.ApplicationModule;
import org.colorcoding.ibas.initialfantasy.bo.shells.BOInfo;
import org.colorcoding.ibas.initialfantasy.bo.shells.BOPropertyInfo;
import org.colorcoding.ibas.initialfantasy.bo.shells.User;
import org.colorcoding.ibas.initialfantasy.bo.shells.UserModule;
import org.colorcoding.ibas.initialfantasy.bo.shells.UserPrivilege;
import org.colorcoding.ibas.initialfantasy.bo.shells.UserQuery;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasyShell;
import org.colorcoding.ibas.initialfantasy.repository.IBORepositoryShell;

import junit.framework.TestCase;

public class testRepositoryShell extends TestCase {

	private static String USER = "admin";
	private static String PASSWORD = "admin";
	private static String PLANTFORM = "html5";

	public void testUserConnect() {
		IBORepositoryShell boRepository = new BORepositoryInitialFantasyShell();
		IOperationResult<User> opRslt = boRepository.userConnect(USER, PASSWORD);
		assertEquals(opRslt.getMessage(), 0, opRslt.getResultCode());
	}

	private String getToken() throws Exception {
		IBORepositoryShell boRepository = new BORepositoryInitialFantasyShell();
		IOperationResult<User> opRslt = boRepository.userConnect(USER, PASSWORD);
		if (opRslt.getResultCode() != 0) {
			throw new Exception(opRslt.getMessage());
		}
		return opRslt.getUserSign();
	}

	public void testFetchUserModules() throws Exception {
		IBORepositoryShell boRepository = new BORepositoryInitialFantasyShell();
		IOperationResult<UserModule> opRslt = boRepository.fetchUserModules(USER, PLANTFORM, this.getToken());
		assertEquals(opRslt.getMessage(), 0, opRslt.getResultCode());
	}

	public void testFetchUserPrivileges() throws Exception {
		IBORepositoryShell boRepository = new BORepositoryInitialFantasyShell();
		IOperationResult<UserPrivilege> opRslt = boRepository.fetchUserPrivileges(USER, PLANTFORM, this.getToken());
		assertEquals(opRslt.getMessage(), 0, opRslt.getResultCode());
		for (UserPrivilege item : opRslt.getResultObjects()) {
			System.out.println(item.toString());
		}
	}

	public void testFetchBOInfos() throws Exception {
		IBORepositoryShell boRepository = new BORepositoryInitialFantasyShell();
		IOperationResult<BOInfo> opRslt = boRepository.fetchBOInfos("ApplicationModule", this.getToken());
		assertEquals(opRslt.getMessage(), 0, opRslt.getResultCode());
		for (BOInfo boInfo : opRslt.getResultObjects()) {
			System.out.println(boInfo.toString());
			for (BOPropertyInfo propertyInfo : boInfo.getProperties()) {
				System.out.println(propertyInfo.toString());
			}
		}
	}

	public void testUserQueries() throws Exception {
		String id = UUID.randomUUID().toString();
		IBORepositoryShell boRepository = new BORepositoryInitialFantasyShell();
		UserQuery userQuery = new UserQuery();
		userQuery.setId(id);
		userQuery.setName("Test-" + DateTime.getNow().toString());
		userQuery.setOrder(10);
		ICriteria criteria = new Criteria();
		criteria.setBOCode(ApplicationModule.BUSINESS_OBJECT_CODE);
		criteria.setResultCount(30);
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(ApplicationModule.PROPERTY_MODULEID.getName());
		condition.setValue("");
		condition.setOperation(ConditionOperation.EQUAL);
		condition = criteria.getConditions().create();
		condition.setAlias(ApplicationModule.PROPERTY_MODULEID.getName());
		condition.setOperation(ConditionOperation.IS_NULL);
		condition.setRelationship(ConditionRelationship.OR);
		userQuery.setCriteria(criteria);
		OperationMessages opRsltSave = boRepository.saveUserQuery(userQuery, this.getToken());
		assertEquals(opRsltSave.getMessage(), 0, opRsltSave.getResultCode());
		IOperationResult<UserQuery> opRsltFetch = boRepository.fetchUserQueries(USER, userQuery.getId(),
				this.getToken());
		assertEquals(opRsltFetch.getMessage(), 0, opRsltFetch.getResultCode());
		UserQuery nUserQuery = opRsltFetch.getResultObjects().firstOrDefault();
		assertEquals(userQuery.getId(), nUserQuery.getId());
		assertEquals(userQuery.getName(), nUserQuery.getName());
		assertEquals(userQuery.getOrder(), nUserQuery.getOrder());
		assertEquals(userQuery.getCriteria(), nUserQuery.getCriteria());
		// 测试更新
		userQuery.setOrder(100);
		opRsltSave = boRepository.saveUserQuery(userQuery, this.getToken());
		assertEquals(opRsltSave.getMessage(), 0, opRsltSave.getResultCode());
		opRsltFetch = boRepository.fetchUserQueries(USER, userQuery.getId(), this.getToken());
		nUserQuery = opRsltFetch.getResultObjects().firstOrDefault();
		assertEquals(userQuery.getId(), nUserQuery.getId());
		assertEquals(userQuery.getName(), nUserQuery.getName());
		assertEquals(userQuery.getOrder(), nUserQuery.getOrder());
		assertEquals(userQuery.getCriteria(), nUserQuery.getCriteria());
		// 测试删除，条件置空即为删除
		userQuery.setCriteria("");
		opRsltSave = boRepository.saveUserQuery(userQuery, this.getToken());
		assertEquals(opRsltSave.getMessage(), 0, opRsltSave.getResultCode());
		opRsltFetch = boRepository.fetchUserQueries(USER, userQuery.getId(), this.getToken());
		assertEquals(opRsltFetch.getMessage(), 0, opRsltFetch.getResultCode());
		assertEquals("not deleted.", 0, opRsltFetch.getResultObjects().size());

	}
}
