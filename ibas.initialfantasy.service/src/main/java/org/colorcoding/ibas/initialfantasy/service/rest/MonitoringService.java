package org.colorcoding.ibas.initialfantasy.service.rest;

import java.util.function.Function;

import javax.ws.rs.Consumes;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.DateTimes;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.organization.IUser;
import org.colorcoding.ibas.bobas.organization.InvalidAuthorizationException;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.bobas.ownership.UnauthorizedException;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;
import org.colorcoding.ibas.initialfantasy.bo.organization.User;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;
import org.colorcoding.ibas.initialfantasy.routing.ServiceRouting;

@Path("monitor")
public class MonitoringService {

	public static final String RUNTIME_INFORMATION_TAG_MEMORY = "MEMORY";
	public static final String RUNTIME_INFORMATION_MAX_MEMORY = "MAX_MEMORY";
	public static final String RUNTIME_INFORMATION_TOTAL_MEMORY = "TOTAL_MEMORY";
	public static final String RUNTIME_INFORMATION_FREE_MEMORY = "FREE_MEMORY";
	public static final String RUNTIME_INFORMATION_USED_MEMORY = "USED_MEMORY";
	public static final String RUNTIME_INFORMATION_TAG_SYSTEM = "SYSTEM";
	public static final String RUNTIME_INFORMATION_OS_SYSTEM = "OS";

	@POST
	@Path("diagnose")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public OperationResult<String> diagnose(@HeaderParam("authorization") String authorization,
			@QueryParam("token") String token) {
		try {
			IUser user = OrganizationFactory.createManager().getUser(MyConfiguration.optToken(authorization, token));
			if (user == null || user == OrganizationFactory.UNKNOWN_USER) {
				throw new InvalidAuthorizationException();
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
			try (BORepositoryInitialFantasy boRepository = new BORepositoryInitialFantasy()) {
				boRepository.setUserToken(MyConfiguration.optToken(authorization, token));
				if (boRepository.fetchUser(criteria).getResultObjects().isEmpty()) {
					throw new UnauthorizedException();
				}
			}
			ServiceRouting serviceRouting = ServiceRouting.create();
			serviceRouting.setRuntime(String.valueOf(DateTimes.now().getTime() / 1000));
			OperationResult<String> operationResult = new OperationResult<>();
			Function<Long, String> computingMemory = new Function<Long, String>() {
				@Override
				public String apply(Long value) {
					return String.format("%sMB", value / (1024L * 1024L));
				}
			};
			// 获取内存信息
			Runtime runtime = Runtime.getRuntime();
			operationResult.addInformations(RUNTIME_INFORMATION_MAX_MEMORY, computingMemory.apply(runtime.maxMemory()),
					RUNTIME_INFORMATION_TAG_MEMORY);
			operationResult.addInformations(RUNTIME_INFORMATION_TOTAL_MEMORY,
					computingMemory.apply(runtime.totalMemory()), RUNTIME_INFORMATION_TAG_MEMORY);
			operationResult.addInformations(RUNTIME_INFORMATION_FREE_MEMORY,
					computingMemory.apply(runtime.freeMemory()), RUNTIME_INFORMATION_TAG_MEMORY);
			operationResult.addInformations(RUNTIME_INFORMATION_USED_MEMORY,
					computingMemory.apply(runtime.totalMemory() - runtime.freeMemory()),
					RUNTIME_INFORMATION_TAG_MEMORY);
			// 获取操作系统
			operationResult.addInformations(RUNTIME_INFORMATION_OS_SYSTEM, System.getProperty("os.name"),
					RUNTIME_INFORMATION_TAG_SYSTEM);
			return operationResult;
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}
}
