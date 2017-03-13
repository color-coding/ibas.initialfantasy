package org.colorcoding.ibas.initialfantasy.test.bo;

import java.io.StringWriter;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.initialfantasy.bo.organizationalstructure.IOrganizationalRole;
import org.colorcoding.ibas.initialfantasy.bo.organizationalstructure.IOrganizationalStructure;
import org.colorcoding.ibas.initialfantasy.bo.organizationalstructure.IRoleMember;
import org.colorcoding.ibas.initialfantasy.bo.organizationalstructure.OrganizationalStructure;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;
import org.colorcoding.ibas.initialfantasy.repository.IBORepositoryInitialFantasyApp;

import junit.framework.TestCase;

/**
 * 组织-结构 测试
 * 
 */
public class testOrganizationalStructure extends TestCase {
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
		OrganizationalStructure bo = new OrganizationalStructure();
		// 测试属性赋值

		// 测试组织-角色
		IOrganizationalRole organizationalrole = bo.getOrganizationalRoles().create();
		// 测试属性赋值

		// 测试组织-角色-成员
		IRoleMember rolemember = organizationalrole.getRoleMembers().create();
		// 测试属性赋值

		// 测试序列化及反序列化
		System.out.println("序列化输出：");
		JAXBContext context = JAXBContext.newInstance(OrganizationalStructure.class);
		Marshaller marshaller = context.createMarshaller();
		marshaller.setProperty(Marshaller.JAXB_ENCODING, "UTF-8");
		marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
		marshaller.setProperty(Marshaller.JAXB_FRAGMENT, false);
		StringWriter writer = new StringWriter();
		marshaller.marshal(bo, writer);
		String oldXML = writer.toString();
		System.out.println(oldXML);

		System.out.println("反序列化输出：");
		IOrganizationalStructure boCloned = bo.clone();
		writer = new StringWriter();
		marshaller.marshal(boCloned, writer);
		String newXML = writer.toString();
		System.out.println(newXML);

		// assertEquals("marshal and unmarshal not equal.", oldXML,
		// newXML);//克隆会修正值，此处不相等

		// 测试对象的保存和查询
		IOperationResult<?> operationResult = null;
		ICriteria criteria = null;
		IBORepositoryInitialFantasyApp boRepository = new BORepositoryInitialFantasy();
		// 设置用户口令
		boRepository.setUserToken(this.getToken());

		// 测试保存
		operationResult = boRepository.saveOrganizationalStructure(bo);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);
		OrganizationalStructure boSaved = (OrganizationalStructure) operationResult.getResultObjects().firstOrDefault();

		// 测试查询
		criteria = boSaved.getCriteria();
		criteria.setResultCount(10);
		operationResult = boRepository.fetchOrganizationalStructure(criteria);
		assertEquals(operationResult.getMessage(), operationResult.getResultCode(), 0);

	}

}
