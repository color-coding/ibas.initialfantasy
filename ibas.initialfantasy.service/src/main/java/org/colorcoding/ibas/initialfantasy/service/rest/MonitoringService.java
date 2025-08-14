package org.colorcoding.ibas.initialfantasy.service.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.OperationMessage;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.expression.NotSupportOperationException;
import org.colorcoding.ibas.bobas.organization.IUser;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.bobas.repository.InvalidTokenException;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;
import org.colorcoding.ibas.initialfantasy.bo.organization.User;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;
import org.colorcoding.ibas.initialfantasy.routing.ServiceRouting;

@Path("monitor")
public class MonitoringService {

	@POST
	@Path("diagnose")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public OperationMessage diagnose(@HeaderParam("authorization") String authorization,
			@QueryParam("token") String token) {
		try {
			IUser user = OrganizationFactory.create().createManager()
					.getUser(MyConfiguration.optToken(authorization, token));
			if (user == null || user == OrganizationFactory.UNKNOWN_USER) {
				throw new InvalidTokenException();
			}
			// 判断超级用户
			Criteria criteria = new Criteria();
			criteria.setResultCount(1);
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(User.PROPERTY_DOCENTRY.getName());
			condition.setValue(user.getId());
			condition = criteria.getConditions().create();
			condition.setAlias(User.PROPERTY_SUPER.getName());
			condition.setValue(emYesNo.YES);
			condition = criteria.getConditions().create();
			condition.setAlias(User.PROPERTY_ACTIVATED.getName());
			condition.setValue(emYesNo.YES);
			BORepositoryInitialFantasy boRepository = new BORepositoryInitialFantasy();
			boRepository.setUserToken(MyConfiguration.optToken(authorization, token));
			if (boRepository.fetchUser(criteria).getResultObjects().isEmpty()) {
				throw new NotSupportOperationException();
			}
			ServiceRouting serviceRouting = ServiceRouting.create();
			serviceRouting.setRuntime(String.valueOf(DateTime.getNow().getTime() / 1000));
			return new OperationMessage();
		} catch (Exception e) {
			return new OperationMessage(e);
		}
	}
}
