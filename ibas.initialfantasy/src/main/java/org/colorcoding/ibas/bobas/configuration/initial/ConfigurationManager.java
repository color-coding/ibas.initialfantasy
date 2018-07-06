package org.colorcoding.ibas.bobas.configuration.initial;

import org.colorcoding.ibas.bobas.MyConfiguration;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.core.Daemon;
import org.colorcoding.ibas.bobas.core.IDaemonTask;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationConfig;
import org.colorcoding.ibas.initialfantasy.bo.application.IApplicationConfig;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;

public class ConfigurationManager extends org.colorcoding.ibas.bobas.configuration.ConfigurationManager {

	/**
	 * 配置项目-配置管理员失效时间
	 */
	public final static String CONFIG_ITEM_CONFIGURATION_MANAGER_EXPIRY_VALUE = "ConfigurationManagerExpiry";

	@Override
	public String getConfigValue(String key) {
		String value = super.getConfigValue(key);
		if (value != null) {
			return value;
		}
		return MyConfiguration.getConfigValue(key);
	}

	@Override
	public void save() {
	}

	private volatile boolean initialized = false;

	@Override
	public synchronized void update() {
		try {
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(ApplicationConfig.PROPERTY_CONFIGGROUP.getName());
			condition.setValue(this.getConfigSign());
			BORepositoryInitialFantasy boRepository = new BORepositoryInitialFantasy();
			boRepository.setUserToken(OrganizationFactory.SYSTEM_USER.getToken());
			IOperationResult<IApplicationConfig> operationResult = boRepository.fetchApplicationConfig(criteria);
			if (operationResult.getError() != null) {
				throw operationResult.getError();
			}
			for (IApplicationConfig item : operationResult.getResultObjects()) {
				this.addConfigValue(item.getConfigKey(), item.getConfigValue());
			}
			if (!this.initialized) {
				this.initialized = true;
				Daemon.register(new IDaemonTask() {

					@Override
					public void run() {
						ConfigurationManager.this.update();
					}

					@Override
					public boolean isActivated() {
						return true;
					}

					private String name = "configuration updater";

					@Override
					public String getName() {
						return this.name;
					}

					private long interval = MyConfiguration.getConfigValue(
							CONFIG_ITEM_CONFIGURATION_MANAGER_EXPIRY_VALUE, MyConfiguration.isDebugMode() ? 180 : 600);

					@Override
					public long getInterval() {
						return this.interval;
					}
				});
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
