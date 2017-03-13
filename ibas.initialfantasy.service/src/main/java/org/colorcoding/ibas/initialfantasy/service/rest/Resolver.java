package org.colorcoding.ibas.initialfantasy.service.rest;

import javax.ws.rs.Produces;
import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;

import org.colorcoding.ibas.bobas.bo.UserFieldProxy;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.initialfantasy.bo.applications.ApplicationFunction;
import org.colorcoding.ibas.initialfantasy.bo.applications.ApplicationModule;
import org.colorcoding.ibas.initialfantasy.bo.applications.ApplicationPlatform;
import org.colorcoding.ibas.initialfantasy.bo.approvalrequest.ApprovalRequest;
import org.colorcoding.ibas.initialfantasy.bo.approvaltemplate.ApprovalTemplate;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.BOCriteria;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.BOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.organization.Organization;
import org.colorcoding.ibas.initialfantasy.bo.organization.Role;
import org.colorcoding.ibas.initialfantasy.bo.organization.User;
import org.colorcoding.ibas.initialfantasy.bo.organizationalstructure.OrganizationalStructure;
import org.colorcoding.ibas.initialfantasy.bo.ownership.Ownership;
import org.colorcoding.ibas.initialfantasy.bo.privilege.Privilege;

/**
 * 序列化解释器
 */
@Provider
@Produces({ "application/json" })
public class Resolver implements ContextResolver<JAXBContext> {

	private static JAXBContext jaxbContext = null;

	public JAXBContext getContext(Class<?> type) {
		try {
			if (jaxbContext == null) {
				jaxbContext = JAXBContext.newInstance(Criteria.class, OperationResult.class, UserFieldProxy.class,
						ApplicationFunction.class, ApplicationModule.class, ApplicationPlatform.class,
						ApprovalTemplate.class, ApprovalRequest.class, BOCriteria.class, BOFiltering.class,
						Organization.class, OrganizationalStructure.class, Ownership.class, Privilege.class, Role.class,
						User.class);
			}
		} catch (JAXBException e) {
			e.printStackTrace();
		}
		return jaxbContext;
	}

}
