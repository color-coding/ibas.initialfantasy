package org.colorcoding.ibas.bobas.ownership.test.fantasy;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emAuthoriseType;
import org.colorcoding.ibas.bobas.data.emConditionOperation;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.bobas.organization.fantasy.OrganizationManager;
import org.colorcoding.ibas.bobas.repository.InvalidTokenException;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.BOCriteria;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.IBOCriteria;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.BOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.IBOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.IBOFilteringCondition;
import org.colorcoding.ibas.initialfantasy.bo.organizations.IOrganization;
import org.colorcoding.ibas.initialfantasy.bo.organizations.IOrganizationalRole;
import org.colorcoding.ibas.initialfantasy.bo.organizations.IOrganizationalStructure;
import org.colorcoding.ibas.initialfantasy.bo.organizations.IRole;
import org.colorcoding.ibas.initialfantasy.bo.organizations.IRoleMember;
import org.colorcoding.ibas.initialfantasy.bo.organizations.IUser;
import org.colorcoding.ibas.initialfantasy.bo.organizations.Organization;
import org.colorcoding.ibas.initialfantasy.bo.organizations.OrganizationalStructure;
import org.colorcoding.ibas.initialfantasy.bo.organizations.Role;
import org.colorcoding.ibas.initialfantasy.bo.organizations.User;
import org.colorcoding.ibas.initialfantasy.bo.ownership.IOwnership;
import org.colorcoding.ibas.initialfantasy.bo.ownership.Ownership;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;
import org.colorcoding.ibas.initialfantasy.repository.IBORepositoryInitialFantasyApp;

import junit.framework.TestCase;

public class testPrivileges extends TestCase {

	public void testOwnership() throws InvalidTokenException {
		IOperationResult<?> operationResult = null;
		ICriteria criteria = null;
		IBORepositoryInitialFantasyApp boRepository = new BORepositoryInitialFantasy();
		boRepository.setUserToken(org.colorcoding.ibas.bobas.organization.fantasy.User.SYSTEM_USER.getToken());
		// 创建组织结构

		// 公司/总经理
		// ....销售部/销售经理
		// ........m.销售员
		// 定义基本数据
		String tmp = String.valueOf(DateTime.getNow().getTime());
		int tmpCode = Integer.valueOf(tmp.substring(tmp.length() - 6));
		IOrganization organization01 = new Organization();
		organization01.setCode(String.format("OR%06d", tmpCode + 0));
		organization01.setName(organization01.getCode() + "-公司");
		operationResult = boRepository.saveOrganization(organization01);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		IOrganization organization02 = new Organization();
		organization02.setCode(String.format("OR%06d", tmpCode + 1));
		organization02.setName(organization02.getCode() + "-销售部");
		operationResult = boRepository.saveOrganization(organization02);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		IRole Role01 = new Role();
		Role01.setCode(String.format("PO%06d", tmpCode + 0));
		Role01.setName(Role01.getCode() + "-销售员");
		operationResult = boRepository.saveRole(Role01);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		IUser User01 = new User();
		User01.setCode(String.format("UR%06d", tmpCode + 0));
		User01.setName(User01.getCode() + "-总经理-习大大");
		User01.setOrganization(organization01.getCode());
		operationResult = boRepository.saveUser(User01);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		IUser User02 = new User();
		User02.setCode(String.format("UR%06d", tmpCode + 1));
		User02.setName(User02.getCode() + "-经理-老王");
		User02.setOrganization(organization01.getCode());
		operationResult = boRepository.saveUser(User02);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		IUser User03 = new User();
		User03.setCode(String.format("UR%06d", tmpCode + 2));
		User03.setName(User03.getCode() + "-销售员-张三");
		User03.setOrganization(organization01.getCode());
		operationResult = boRepository.saveUser(User03);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		IUser User04 = new User();
		User04.setCode(String.format("UR%06d", tmpCode + 3));
		User04.setName(User04.getCode() + "-销售员-李四");
		User04.setOrganization(organization01.getCode());
		operationResult = boRepository.saveUser(User04);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		// 创建结构
		IOrganizationalStructure orgStructure01 = new OrganizationalStructure();
		orgStructure01.setOrganization(organization01.getCode());
		orgStructure01.setBelonging(-1);
		orgStructure01.setManager(User01.getCode());
		operationResult = boRepository.saveOrganizationalStructure(orgStructure01);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		// 销售公司
		IOrganizationalStructure orgStructure02 = new OrganizationalStructure();
		orgStructure02.setOrganization(organization02.getCode());
		orgStructure02.setBelonging(orgStructure01.getObjectKey());
		orgStructure02.setManager(User02.getCode());
		IOrganizationalRole orgRole = orgStructure02.getOrganizationalRoles().create();
		orgRole.setRole(Role01.getCode());
		IRoleMember Member = orgRole.getRoleMembers().create();
		Member.setMember(User03.getCode());
		Member = orgRole.getRoleMembers().create();
		Member.setMember(User04.getCode());
		operationResult = boRepository.saveOrganizationalStructure(orgStructure02);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);

		// 定义所有权设置，张三，自，all；同事，no；下属，no；上级，view
		IOwnership ownership = new Ownership();
		ownership.setBOCode(MyConfiguration.applyVariables(BOCriteria.BUSINESS_OBJECT_CODE));
		ownership.setUserCode(User03.getCode());
		ownership.setSelf(emAuthoriseType.ALL);
		ownership.setEqualLevel(emAuthoriseType.NONE);
		ownership.setLowerLevel(emAuthoriseType.NONE);
		ownership.setHigherLevel(emAuthoriseType.READ);
		operationResult = boRepository.saveOwnership(ownership);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);

		// 开始测试
		OrganizationManager orgManager = (OrganizationManager) OrganizationFactory.create().createManager();
		orgManager.initialize(true);// 已缓存，重新加载组织
		// 获取组织用户，以获取口令
		org.colorcoding.ibas.bobas.organization.fantasy.User orgUser03 = (org.colorcoding.ibas.bobas.organization.fantasy.User) orgManager
				.getUser(User03.getDocEntry());
		org.colorcoding.ibas.bobas.organization.fantasy.User orgUser04 = (org.colorcoding.ibas.bobas.organization.fantasy.User) orgManager
				.getUser(User04.getDocEntry());
		org.colorcoding.ibas.bobas.organization.fantasy.User orgUser02 = (org.colorcoding.ibas.bobas.organization.fantasy.User) orgManager
				.getUser(User02.getDocEntry());
		// 创建张三的数据
		IBOCriteria data = new BOCriteria();
		// data.setDataOwner(User03.getObjectKey());
		boRepository = new BORepositoryInitialFantasy();
		boRepository.setUserToken(orgUser03.getToken());// 设置当前用户
		operationResult = boRepository.saveBOCriteria(data);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		// 其他人查询数据
		boRepository = new BORepositoryInitialFantasy();
		boRepository.setUserToken(orgUser04.getToken());// 设置当前用户，同级李四
		criteria = data.getCriteria();
		operationResult = boRepository.fetchBOCriteria(criteria);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		assertEquals("同事李四检索到张三的数据。", operationResult.getResultObjects().size(), 0);
		boRepository = new BORepositoryInitialFantasy();
		boRepository.setUserToken(orgUser02.getToken());// 设置当前用户，上级老王
		criteria = data.getCriteria();
		operationResult = boRepository.fetchBOCriteria(criteria);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		assertEquals("经理老王没有检索到张三的数据。", operationResult.getResultObjects().size(), 1);
		data = (IBOCriteria) operationResult.getResultObjects().firstOrDefault();
		data.setName("经理老王修改了数据");
		operationResult = boRepository.saveBOCriteria(data);
		assertNotNull("经理老王成功修改了张三的数据。", operationResult.getError());
		// 启用过滤数据，更新过的数据
		IBOFiltering boFiltering = new BOFiltering();
		boFiltering.setBOCode(MyConfiguration.applyVariables(BOCriteria.BUSINESS_OBJECT_CODE));
		boFiltering.setRoleCode(Role01.getCode());
		IBOFilteringCondition condition = boFiltering.getBOFilteringConditions().create();
		condition.setPropertyName(BOFiltering.PROPERTY_LOGINST.getName());// 更新次数
		condition.setOperation(emConditionOperation.GRATER_THAN);
		condition.setConditionValue("1");
		boRepository = new BORepositoryInitialFantasy();
		boRepository.setUserToken(orgUser03.getToken());// 设置当前用户，张三
		operationResult = boRepository.saveBOFiltering(boFiltering);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);

		criteria = data.getCriteria();
		operationResult = boRepository.fetchBOCriteria(criteria);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		assertEquals("加了过滤条件的 张三数据被检索到了。", operationResult.getResultObjects().size(), 0);
		data.setName("updated.");
		operationResult = boRepository.saveBOCriteria(data);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		operationResult = boRepository.fetchBOCriteria(criteria);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		assertEquals("没有检索到加了过滤条件的 数据。", operationResult.getResultObjects().size(), 1);
	}

}
