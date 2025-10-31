package org.colorcoding.ibas.initialfantasy.service.rest;

import java.net.URLDecoder;
import java.util.Base64;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.BeanParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;
import org.colorcoding.ibas.initialfantasy.bo.organization.UserActionLog;
import org.colorcoding.ibas.initialfantasy.bo.shell.User;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasyShell;
import org.glassfish.jersey.media.multipart.BodyPart;
import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataMultiPart;

/**
 * InitialFantasy 数据服务JSON
 */
@Path("data")
public class ConnectService extends BORepositoryInitialFantasyShell {

	/**
	 * 配置项目-启用登录验证
	 */
	private final static String CONFIG_ITEM_ENABLE_LOGIN_VERIFICATION = "EnableLoginVerification";
	/**
	 * 配置项目-启用用户登录日志
	 */
	public final static String CONFIG_ITEM_ENABLE_USER_LOGIN_LOG = "EnableUserLoginLog";

	protected OperationResult<User> userConnect(ConnectionInfo connInfo) {
		if (MyConfiguration.getConfigValue(CONFIG_ITEM_ENABLE_LOGIN_VERIFICATION, false)) {
			try {
				if (!Strings.isNullOrEmpty(connInfo.verification)) {
					String[] values = ConnectionInfo.decode(ConnectionInfo.atob(connInfo.verification)).split("=");
					if (values.length == 2) {
						if (!VerificationService.check(values[0], Integer.valueOf(values[1]))) {
							throw new Exception(I18N.prop("msg_if_user_verification_code_invalid"));
						}
					} else {
						throw new Exception(I18N.prop("msg_if_user_verification_code_invalid"));
					}
				} else {
					throw new Exception(I18N.prop("msg_if_user_verification_code_invalid"));
				}
			} catch (Exception e) {
				return new OperationResult<>(e);
			}
		}
		return this.loggingConnectedUser(
				super.userConnect(connInfo.user, ConnectionInfo.decode(ConnectionInfo.atob(connInfo.password))),
				connInfo.userAgent, connInfo.remoteAddress, connInfo.xForwardedFor);
	}

	protected OperationResult<User> tokenConnect(ConnectionInfo connInfo) {
		return this.loggingConnectedUser(super.tokenConnect(connInfo.token), connInfo.userAgent, connInfo.remoteAddress,
				connInfo.xForwardedFor);
	}

	protected OperationResult<User> loggingConnectedUser(OperationResult<User> operationResult, String... contents) {
		if (MyConfiguration.getConfigValue(CONFIG_ITEM_ENABLE_USER_LOGIN_LOG, true)) {
			for (User user : operationResult.getResultObjects()) {
				try (BORepositoryInitialFantasy boRepository = new BORepositoryInitialFantasy()) {
					// 记录登录日志
					StringBuilder builder = new StringBuilder();
					if (contents != null) {
						for (String item : contents) {
							if (Strings.isNullOrEmpty(item)) {
								continue;
							}
							if (builder.length() > 0) {
								builder.append("; ");
							}
							builder.append(item);
						}
					}
					UserActionLog actionLog = new UserActionLog();
					actionLog.setAction("SYS_USER_LOGIN");
					actionLog.setUserId(user.getId());
					actionLog.setUserName(user.getName());
					actionLog.setContent(builder.toString());
					boRepository.setUserToken(OrganizationFactory.SYSTEM_USER.getToken());
					boRepository.saveUserActionLog(actionLog);
				} catch (Exception e) {
				}
			}
		}
		return operationResult;
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("tokenConnect")
	public OperationResult<User> tokenConnect(@QueryParam("token") String token, @Context HttpServletRequest request) {
		ConnectionInfo connInfo = ConnectionInfo.create(request);
		connInfo.token = token;
		return this.tokenConnect(connInfo);
	}

	@POST
	@Path("tokenConnect")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public OperationResult<User> tokenConnect(@BeanParam ConnectionInfo connInfo, @Context HttpServletRequest request) {
		connInfo.remoteAddress = request.getRemoteAddr();
		return this.tokenConnect(connInfo);
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("userConnect")
	public OperationResult<User> userConnect(@QueryParam("user") String user, @QueryParam("password") String password,
			@QueryParam("verification") String verification, @Context HttpServletRequest request) {
		try {
			ConnectionInfo connInfo = ConnectionInfo.create(request);
			connInfo.user = user;
			connInfo.password = password;
			connInfo.verification = verification;
			return this.userConnect(connInfo);
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	@POST
	@Path("userConnect")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public OperationResult<User> userConnect(FormDataMultiPart formData, @Context HttpServletRequest request) {
		ConnectionInfo connInfo = ConnectionInfo.create(request);
		for (BodyPart item : formData.getBodyParts()) {
			FormDataBodyPart bodyPart = (FormDataBodyPart) item;
			if (bodyPart.getName().equalsIgnoreCase("user")) {
				connInfo.user = bodyPart.getValue();
			} else if (bodyPart.getName().equalsIgnoreCase("password")) {
				connInfo.password = bodyPart.getValue();
			} else if (bodyPart.getName().equalsIgnoreCase("verification")) {
				connInfo.verification = bodyPart.getValue();
			}
		}
		return this.userConnect(connInfo);
	}

	@POST
	@Path("userConnect")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public OperationResult<User> userConnect(@BeanParam ConnectionInfo connInfo, @Context HttpServletRequest request) {
		connInfo.remoteAddress = request.getRemoteAddr();
		return this.userConnect(connInfo);
	}

}

class ConnectionInfo {

	public static ConnectionInfo create(HttpServletRequest request) {
		ConnectionInfo connInfo = new ConnectionInfo();
		connInfo.remoteAddress = request.getRemoteAddr();
		connInfo.xForwardedFor = request.getHeader("X-Forwarded-For");
		connInfo.userAgent = request.getHeader("User-Agent");
		return connInfo;
	}

	public static String decode(String value) {
		if (value == null) {
			return null;
		}
		try {
			return URLDecoder.decode(value, "UTF-8");
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}
	}

	public static String atob(String value) {
		if (value == null) {
			return null;
		}
		try {
			byte[] decodedBytes = Base64.getDecoder().decode(value);
			return new String(decodedBytes, "utf-8");
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}
	}

	@FormParam("user")
	public String user;
	@FormParam("password")
	public String password;
	@FormParam("verification")
	public String verification;
	@FormParam("token")
	public String token;
	@HeaderParam("User-Agent")
	public String userAgent;
	@HeaderParam("X-Forwarded-For")
	public String xForwardedFor;

	public String remoteAddress;
}
