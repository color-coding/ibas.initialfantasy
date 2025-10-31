package org.colorcoding.ibas.bobas.configuration.initial;

import java.util.Map.Entry;

import org.colorcoding.ibas.bobas.MyConfiguration;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.logic.common.BOInstanceLogService;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.bobas.task.Daemon;
import org.colorcoding.ibas.bobas.task.IDaemonTask;
import org.colorcoding.ibas.initialfantasy.bo.application.ApplicationConfig;
import org.colorcoding.ibas.initialfantasy.bo.application.IApplicationConfig;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.BOInformation;
import org.colorcoding.ibas.initialfantasy.bo.boinformation.IBOInformation;
import org.colorcoding.ibas.initialfantasy.data.emConfigCategory;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;

public class ConfigurationManager extends org.colorcoding.ibas.bobas.configuration.ConfigurationManager {

	@Override
	public String getConfigValue(String key) {
		String value = super.getConfigValue(key);
		if (value != null) {
			return value;
		}
		return MyConfiguration.getConfigValue(key);
	}

	private volatile long taskId = -1;

	@Override
	public synchronized void update() {
		try {
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(ApplicationConfig.PROPERTY_CONFIGGROUP.getName());
			condition.setValue(this.getConfigSign());
			condition = criteria.getConditions().create();
			condition.setAlias(ApplicationConfig.PROPERTY_CATEGORY.getName());
			condition.setOperation(ConditionOperation.IS_NULL);
			condition.setBracketOpen(1);
			condition = criteria.getConditions().create();
			condition.setAlias(ApplicationConfig.PROPERTY_CATEGORY.getName());
			condition.setValue(emConfigCategory.SERVER);
			condition.setRelationship(ConditionRelationship.OR);
			condition = criteria.getConditions().create();
			condition.setAlias(ApplicationConfig.PROPERTY_CATEGORY.getName());
			condition.setValue(emConfigCategory.ALL);
			condition.setRelationship(ConditionRelationship.OR);
			condition.setBracketClose(1);
			condition = criteria.getConditions().create();
			condition.setAlias(ApplicationConfig.PROPERTY_ACTIVATED.getName());
			condition.setOperation(ConditionOperation.IS_NULL);
			condition.setBracketOpen(1);
			condition = criteria.getConditions().create();
			condition.setAlias(ApplicationConfig.PROPERTY_ACTIVATED.getName());
			condition.setValue(emYesNo.YES);
			condition.setRelationship(ConditionRelationship.OR);
			condition.setBracketClose(1);

			try (BORepositoryInitialFantasy boRepository = new BORepositoryInitialFantasy()) {
				boRepository.setUserToken(OrganizationFactory.SYSTEM_USER.getToken());
				IOperationResult<IApplicationConfig> opRsltAP = boRepository.fetchApplicationConfig(criteria);
				if (opRsltAP.getError() != null) {
					throw opRsltAP.getError();
				}
				for (IApplicationConfig item : opRsltAP.getResultObjects()) {
					this.addConfigValue(item.getConfigKey(), item.getConfigValue());
				}
				// 读取对象实例日志配置
				criteria = new Criteria();
				criteria.setNoChilds(true);
				condition = criteria.getConditions().create();
				condition.setAlias(BOInformation.PROPERTY_MODIFIED);
				condition.setValue(emYesNo.YES);
				IOperationResult<IBOInformation> opRsltBI = boRepository.fetchBOInformation(criteria);
				if (opRsltAP.getError() != null) {
					throw opRsltAP.getError();
				}
				for (IBOInformation item : opRsltBI.getResultObjects()) {
					BOInstanceLogService.BO_LOGST_SETTING.put(item.getCode(), true);
				}
				for (Entry<String, Boolean> item : BOInstanceLogService.BO_LOGST_SETTING.entrySet()) {
					if (!opRsltBI.getResultObjects().contains(c -> c.getCode().equals(item.getKey()))) {
						BOInstanceLogService.BO_LOGST_SETTING.remove(item.getKey());
					}
				}
			}
			if (this.taskId < 0) {
				this.taskId = Daemon.register(new IDaemonTask() {

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

					private long interval = MyConfiguration.isDebugMode() ? 180 : 900;

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

	@Override
	protected void finalize() throws Throwable {
		if (this.taskId > 0) {
			Daemon.unRegister(this.taskId);
		}
		super.finalize();
	}

}
