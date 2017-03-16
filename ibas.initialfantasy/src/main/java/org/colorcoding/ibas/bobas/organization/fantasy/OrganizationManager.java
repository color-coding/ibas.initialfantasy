package org.colorcoding.ibas.bobas.organization.fantasy;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.core.Daemon;
import org.colorcoding.ibas.bobas.core.ISingleDaemonTask;
import org.colorcoding.ibas.bobas.core.InvalidDaemonTask;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.messages.RuntimeLog;
import org.colorcoding.ibas.bobas.organization.IOrganizationManager;
import org.colorcoding.ibas.bobas.organization.IUser;
import org.colorcoding.ibas.bobas.util.EncryptMD5;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;
import org.colorcoding.ibas.initialfantasy.bo.organizations.IOrganizationalRole;
import org.colorcoding.ibas.initialfantasy.bo.organizations.IOrganizationalStructure;
import org.colorcoding.ibas.initialfantasy.bo.organizations.IRoleMember;
import org.colorcoding.ibas.initialfantasy.bo.organizations.OrganizationalStructure;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;
import org.colorcoding.ibas.initialfantasy.repository.IBORepositoryInitialFantasyApp;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "organizations")
@XmlRootElement(name = "organizations")
public class OrganizationManager implements IOrganizationManager {

	public static String createToken(org.colorcoding.ibas.initialfantasy.bo.organizations.IUser user) {
		return createToken(user.getPassword(), user.getDocEntry());
	}

	public static String createToken(User user) {
		return createToken(user.getPassword(), user.getId());
	}

	private static String createToken(String password, int id) {
		return EncryptMD5.md5(password + String.valueOf(id));
	}

	public OrganizationManager() {
		// 设置组织结构刷新时间，默认180秒
		this.setFreshTime(MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_ORGANIZATION_REFRESH_TIME, 300));
	}

	/**
	 * 通过口令，获取用户（仅分配组织的用户）
	 */
	@Override
	public IUser getUser(String token) {
		// 系统用户
		if (User.SYSTEM_USER.getToken().equals(token)) {
			return User.SYSTEM_USER;
		}
		// 已分配组织的操作用户
		for (User user : this.getUsers()) {
			if (user.getToken().equals(token)) {
				return user;
			}
		}
		// 未分配组织的操作用户
		synchronized (this.getUndistributedUsers()) {
			// 锁住用户
			for (User user : this.getUndistributedUsers()) {
				if (user.getToken().equals(token)) {
					return user;
				}
			}
		}
		// 超级用户
		for (User user : this.getSupperUsers()) {
			if (user.getToken().equals(token)) {
				return user;
			}
		}
		return null;
	}

	/**
	 * 通过id，获取用户（含未分配组织的用户）
	 */
	@Override
	public IUser getUser(int id) {
		// 系统用户
		if (User.SYSTEM_USER.getId() == id) {
			return User.SYSTEM_USER;
		}
		for (IUser user : this.getUsers()) {
			if (user.getId() == id) {
				return user;
			}
		}
		synchronized (this.getUndistributedUsers()) {
			// 未分配组织的用户
			for (IUser user : this.getUndistributedUsers()) {
				if (user.getId() == id) {
					return user;
				}
			}
			// 从数据库中检索用户
			User user = this.createUser(id);
			if (user != null) {
				// 注册未分配组织用户
				this.getUndistributedUsers().add(user);
			}
			return user;
		}
	}

	public String[] getUserRoles(IUser user) {
		List<String> roles = new ArrayList<>();
		for (User item : this.getUsers()) {
			if (item.getId() == user.getId()) {
				if (roles.contains(item.getRole())) {
					continue;
				}
				roles.add(item.getRole());
			}
		}
		return roles.toArray(new String[] {});
	}

	private List<User> getUsers(Organization organization) {
		ArrayList<User> users = new ArrayList<>();
		for (Organization org : organization.getOrganizations()) {
			users.addAll(this.getUsers(org));
		}
		users.addAll(organization.getMembers());
		users.add(organization.getManager());
		return users;
	}

	public User[] getUsers() {
		ArrayList<User> users = new ArrayList<>();
		for (Organization org : this.getOrganizations(false)) {
			users.addAll(this.getUsers(org));
		}
		return users.toArray(new User[] {});
	}

	private ArrayList<User> undistributedUser;

	private ArrayList<User> getUndistributedUsers() {
		if (undistributedUser == null) {
			undistributedUser = new ArrayList<>();
		}
		return this.undistributedUser;
	}

	private ArrayList<User> getSupperUsers() {
		ArrayList<User> supperUsers = new ArrayList<>();

		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organizations.User.PROPERTY_SUPPER.getName());
		condition.setCondVal(emYesNo.YES);
		condition = criteria.getConditions().create();
		condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organizations.User.PROPERTY_ACTIVATED.getName());
		condition.setCondVal(emYesNo.YES);
		IBORepositoryInitialFantasyApp boRepository = this.createRepository();
		IOperationResult<org.colorcoding.ibas.initialfantasy.bo.organizations.IUser> operationResult = boRepository
				.fetchUser(criteria);
		for (org.colorcoding.ibas.initialfantasy.bo.organizations.IUser tmpUser : operationResult.getResultObjects()) {
			User user = User.create(tmpUser);
			user.setToken(createToken(tmpUser));
			supperUsers.add(user);
		}

		return supperUsers;
	}

	@XmlElement(name = "organization", type = Organization.class)
	private Organization[] organizations;

	/**
	 * 获取全部组织
	 * 
	 * @param flat
	 *            true，扁平的；false，仅根组织
	 * @return
	 */
	public Organization[] getOrganizations(boolean flat) {
		if (this.organizations == null) {
			return new Organization[] {};
		}
		if (!flat) {
			return this.organizations;
		}
		ArrayList<Organization> orgs = new ArrayList<>();
		for (Organization org : this.organizations) {
			orgs.addAll(this.getOrganizations(org));
		}
		return orgs.toArray(new Organization[] {});
	}

	private List<Organization> getOrganizations(Organization organization) {
		ArrayList<Organization> orgs = new ArrayList<>();
		for (Organization org : organization.getOrganizations()) {
			orgs.addAll(this.getOrganizations(org));
		}
		orgs.add(organization);
		return orgs;
	}

	/**
	 * 获取用户所属的组织
	 * 
	 * @param user
	 *            用户
	 * @return
	 */
	public Organization[] getOrganizations(IUser user) {
		ArrayList<Organization> orgs = new ArrayList<>();
		for (Organization org : this.getOrganizations(true)) {
			if (org.getManager().equals(user)) {
				orgs.add(org);
			}
			for (User item : org.getMembers()) {
				if (item.equals(user)) {
					orgs.add(org);
					break;
				}
			}
		}
		return orgs.toArray(new Organization[] {});
	}

	public void initialize() {
		this.initialize(false);
	}

	public synchronized void initialize(boolean force) {
		this.undistributedUser = null;
		this.organizations = null;
		this.repository = null;
		this.load(force);
		if (force) {
			// 强制初始化，不进行缓存相关处理
			return;
		}
		// 注册组织刷新任务
		try {
			Daemon.register(new ISingleDaemonTask() {

				@Override
				public void run() {
					if (organizations_time_stamp == 0) {
						// 未加载不做处理
						return;
					}
					load(false);// 重新加载组织
				}

				@Override
				public String getName() {
					return "organizations refresh";
				}

				@Override
				public long getInterval() {
					return getFreshTime();
				}

				@Override
				public boolean isActivated() {
					return true;
				}

				@Override
				public long getKeepTime() {
					return 120;
				}

				private volatile String lockSignature;

				@Override
				public String getLockSignature() {
					if (this.lockSignature == null) {
						synchronized (this) {
							if (this.lockSignature == null) {
								// 当前数据库地址和数据库名称作为锁标记
								String dbServer = MyConfiguration
										.getConfigValue("Master" + MyConfiguration.CONFIG_ITEM_DB_SERVER);
								String dbName = MyConfiguration
										.getConfigValue("Master" + MyConfiguration.CONFIG_ITEM_DB_NAME);
								String sign = EncryptMD5.md5("org_fresh_", dbServer, dbName);
								this.lockSignature = sign;
							}
						}
					}
					return this.lockSignature;
				}

			});
		} catch (InvalidDaemonTask e) {
			RuntimeLog.log(e);
		}
	}

	protected String getCacheFilePath() {
		// 当前数据库地址和数据库名称作为锁标记
		String dbServer = MyConfiguration.getConfigValue("Master" + MyConfiguration.CONFIG_ITEM_DB_SERVER);
		String dbName = MyConfiguration.getConfigValue("Master" + MyConfiguration.CONFIG_ITEM_DB_NAME);
		String sign = EncryptMD5.md5(dbServer, dbName);
		return MyConfiguration.getTempFolder() + File.separator + "~org_cache_" + sign + ".tmp";
	}

	private long freshTime;

	public long getFreshTime() {
		if (this.freshTime < 60) {
			this.freshTime = 60;
		}
		return this.freshTime;
	}

	public void setFreshTime(long value) {
		this.freshTime = value;
	}

	private long organizations_time_stamp;// 组织的时间戳

	protected void load(boolean force) {
		// 尝试从缓存中加载数据
		JAXBContext context = null;
		File file = new File(this.getCacheFilePath());
		if (file.isFile() && file.exists() && !force) {
			Long fileTime = file.lastModified();
			Long nowTime = System.currentTimeMillis();
			if ((nowTime - fileTime) <= (this.getFreshTime() * 1000)) {
				// 缓存文件有效期内
				try {
					context = JAXBContext.newInstance(OrganizationManager.class);
					Unmarshaller unmarshaller = context.createUnmarshaller();
					FileInputStream fileStream = new FileInputStream(file);
					OrganizationManager manager = (OrganizationManager) unmarshaller.unmarshal(fileStream);
					// if (manager != null && manager.organizations != null) {
					this.organizations = manager.organizations;
					this.organizations_time_stamp = System.currentTimeMillis();
					// 有效的数据
					RuntimeLog.log(String.format("organization: read the cached data, [%s].", file.getPath()));
					return;// 退出
					// }
				} catch (JAXBException | IOException e) {
					RuntimeLog.log(e);
				}
			}
		}
		List<Organization> organizations = this.load(-1);// 加载根
		synchronized (this.getUndistributedUsers()) {
			// 锁住
			this.organizations = organizations.toArray(new Organization[] {});
			this.getUndistributedUsers().clear();// 初始化未分配组织的用户
			this.organizations_time_stamp = System.currentTimeMillis();
		}
		RuntimeLog.log(String.format("organization: read data in the database."));
		try {
			if (!file.exists()) {
				file.getParentFile().mkdirs();
				file.createNewFile();
			} else {
				file.delete();
				file.createNewFile();
			}
			context = JAXBContext.newInstance(OrganizationManager.class);
			Marshaller marshaller = context.createMarshaller();
			marshaller.setProperty(Marshaller.JAXB_ENCODING, "UTF-8");
			FileOutputStream out = new FileOutputStream(file, false);
			marshaller.marshal(this, out);
			out.flush();
			out.close();
			RuntimeLog.log(String.format("organization: cache data in file, [%s].", file.getPath()));
		} catch (JAXBException | IOException e) {
			RuntimeLog.log(e);
		}
	}

	private BORepositoryInitialFantasy repository;

	private IBORepositoryInitialFantasyApp createRepository() {
		if (repository == null) {
			try {
				repository = new BORepositoryInitialFantasy();
				repository.setUserToken(User.SYSTEM_USER.getToken());
				repository.setUseCache(false);
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		}
		return repository;
	}

	protected List<Organization> load(Integer node) {
		List<Organization> results = new ArrayList<>();
		try {
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(OrganizationalStructure.PROPERTY_BELONGING.getName());
			condition.setCondVal(node);
			condition = criteria.getConditions().create();
			condition.setAlias(OrganizationalStructure.PROPERTY_VALIDDATE.getName());
			condition.setOperation(ConditionOperation.LESS_EQUAL);
			condition.setCondVal(DateTime.getToday());
			condition = criteria.getConditions().create();
			condition.setAlias(OrganizationalStructure.PROPERTY_INVALIDDATE.getName());
			condition.setOperation(ConditionOperation.GRATER_EQUAL);
			condition.setCondVal(DateTime.getToday());
			IBORepositoryInitialFantasyApp boRepository = this.createRepository();
			IOperationResult<IOrganizationalStructure> operationResult = boRepository
					.fetchOrganizationalStructure(criteria);
			if (operationResult.getError() != null) {
				throw operationResult.getError();
			}
			if (operationResult.getResultCode() != 0) {
				throw new Exception(operationResult.getMessage());
			}
			for (IOrganizationalStructure orgItem : operationResult.getResultObjects()) {
				Organization organization = new Organization();
				organization.setCode(orgItem.getOrganization());
				organization.setManager(this.createUser(orgItem.getManager()));
				for (IOrganizationalRole posItem : orgItem.getOrganizationalRoles()) {
					for (IRoleMember empItem : posItem.getRoleMembers()) {
						User user = this.createUser(empItem.getMember());
						user.setRole(posItem.getRole());
						organization.getMembers().add(user);
					}
				}
				// 加载子项
				organization.setOrganizations(this.load(orgItem.getObjectKey()));
				results.add(organization);
			}
		} catch (Exception e) {
			RuntimeLog.log(e);
		}
		return results;
	}

	private User createUser(String key) {
		if (key != null && !key.isEmpty()) {
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organizations.User.PROPERTY_CODE.getName());
			condition.setCondVal(key);
			condition = criteria.getConditions().create();
			condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organizations.User.PROPERTY_ACTIVATED.getName());
			condition.setCondVal(emYesNo.YES);
			IBORepositoryInitialFantasyApp boRepository = this.createRepository();
			IOperationResult<org.colorcoding.ibas.initialfantasy.bo.organizations.IUser> operationResult = boRepository
					.fetchUser(criteria);
			if (operationResult.getError() == null && operationResult.getResultCode() == 0) {
				org.colorcoding.ibas.initialfantasy.bo.organizations.IUser tmpUser = operationResult.getResultObjects()
						.firstOrDefault();
				if (tmpUser != null) {
					User user = User.create(tmpUser);
					user.setToken(createToken(tmpUser));
					return user;
				}
			}
		}
		return User.UNKNOWN_USER;
	}

	private User createUser(int id) {
		if (id < 1) {
			// 非正常用户编号，不进行检索
			return null;
		}
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organizations.User.PROPERTY_DOCENTRY.getName());
		condition.setCondVal(id);
		condition = criteria.getConditions().create();
		condition.setAlias(org.colorcoding.ibas.initialfantasy.bo.organizations.User.PROPERTY_ACTIVATED.getName());
		condition.setCondVal(emYesNo.YES);
		IBORepositoryInitialFantasyApp boRepository = this.createRepository();
		IOperationResult<org.colorcoding.ibas.initialfantasy.bo.organizations.IUser> operationResult = boRepository
				.fetchUser(criteria);
		if (operationResult.getError() == null && operationResult.getResultCode() == 0) {
			org.colorcoding.ibas.initialfantasy.bo.organizations.IUser tmpUser = operationResult.getResultObjects()
					.firstOrDefault();
			if (tmpUser != null) {
				User user = User.create(tmpUser);
				user.setToken(createToken(tmpUser));
				return user;
			}
		}
		return null;
	}

	/**
	 * 判断两者组织关系
	 * 
	 * someone是user的什么
	 * 
	 * @param user
	 * @param other
	 * @return
	 * 
	 * 		所属组织的manager即为领导，若本身为manager，则上级组织的manager为领导。所属同一组织且同角色即为同事，
	 *         领导没有同事 作为manager所属组织中的成员即为下属，而自身为上级组织manager的下属。
	 */
	public OrganizationalRelationship getRelationship(IUser user, IUser someone) {
		if (user == null || someone == null) {
			return OrganizationalRelationship.NONE;
		}
		if (user.equals(User.UNKNOWN_USER) || someone.equals(User.UNKNOWN_USER)) {
			return OrganizationalRelationship.NONE;
		}
		// 获取组织
		Organization[] userOrg = this.getOrganizations(user);
		if (userOrg == null || userOrg.length == 0) {
			return OrganizationalRelationship.NONE;
		}
		Organization[] someOrg = this.getOrganizations(someone);
		if (someOrg == null || someOrg.length == 0) {
			return OrganizationalRelationship.NONE;
		}
		// 所属组织的manager即为领导，若本身为manager，则上级组织的manager为领导
		for (Organization organization : someOrg) {
			// someone是领导
			if (organization.getManager().equals(someone)) {
				for (User item : organization.getMembers()) {
					if (item.equals(user)) {
						return OrganizationalRelationship.LEADER;
					}
				}
				// 上级组织的manager为领导
				if (this.isSubordinateManagers(organization, user)) {
					return OrganizationalRelationship.LEADER;
				}
			}
		}
		// 所属同一组织即为同事，领导没有同事
		for (Organization organization : someOrg) {
			for (User item : organization.getMembers()) {
				if (item instanceof User && user instanceof User) {
					if (item.equals(user) && item.getRole().equals(((User) user).getRole())) {
						return OrganizationalRelationship.COLLEAGUES;
					}
				} else {
					if (item.equals(user)) {
						return OrganizationalRelationship.COLLEAGUES;
					}
				}
			}
		}
		// 作为manager所属组织中的成员即为下属，而自身为上级组织manager的下属
		for (Organization organization : userOrg) {
			// user是领导
			if (organization.getManager().equals(user)) {
				for (User item : organization.getMembers()) {
					if (item.equals(someone)) {
						return OrganizationalRelationship.SUBORDINATE;
					}
				}
				// 上级组织manager的下属
				if (this.isSubordinateManagers(organization, someone)) {
					return OrganizationalRelationship.SUBORDINATE;
				}
			}
		}
		// 没有解析出来的均为无关系
		return OrganizationalRelationship.NONE;
	}

	/**
	 * 判断用户是否为下级组织manger
	 * 
	 * @param organization
	 *            组织
	 * @param user
	 *            用户
	 * @return
	 */
	private boolean isSubordinateManagers(Organization organization, IUser user) {
		if (organization.getManager().equals(user)) {
			return true;
		}
		for (Organization item : organization.getOrganizations()) {
			boolean status = this.isSubordinateManagers(item, user);
			if (status) {
				return true;
			}
		}
		return false;
	}
}
