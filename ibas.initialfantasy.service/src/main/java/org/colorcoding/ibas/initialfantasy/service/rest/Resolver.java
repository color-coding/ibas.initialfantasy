package org.colorcoding.ibas.initialfantasy.service.rest;

import javax.ws.rs.Produces;
import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;

import org.colorcoding.ibas.bobas.bo.UserFieldProxy;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationConfig;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationConfigIdentity;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationElement;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationFunction;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationModule;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationPlatform;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.BOCriteria;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.BOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.BOInformation;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.BOPropertySetting;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.BORelationship;
import org.colorcoding.ibas.initialfantasy.bo.bologst.BOLogst;
import org.colorcoding.ibas.initialfantasy.bo.bonumbering.BONumbering;
import org.colorcoding.ibas.initialfantasy.bo.organization.Organization;
import org.colorcoding.ibas.initialfantasy.bo.organization.User;
import org.colorcoding.ibas.initialfantasy.bo.privilege.Privilege;
import org.colorcoding.ibas.initialfantasy.bo.refunction.Refunction;

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
				jaxbContext = JAXBContext.newInstance(Criteria.class, UserFieldProxy.class, ApplicationFunction.class,
						ApplicationModule.class, ApplicationPlatform.class, ApplicationElement.class, BOCriteria.class,
						BOFiltering.class, BOInformation.class, BONumbering.class, Organization.class, Privilege.class,
						User.class, BOPropertySetting.class, ApplicationConfig.class, ApplicationConfigIdentity.class,
						BOLogst.class, BORelationship.class, Refunction.class);
			}
		} catch (JAXBException e) {
			e.printStackTrace();
		}
		return jaxbContext;
	}

}
