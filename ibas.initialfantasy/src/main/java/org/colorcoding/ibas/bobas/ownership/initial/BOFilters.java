package org.colorcoding.ibas.bobas.ownership.initial;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;

import org.colorcoding.ibas.bobas.MyConfiguration;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.expression.JudmentOperationException;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.organization.IUser;
import org.colorcoding.ibas.bobas.organization.InvalidAuthorizationException;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.bobas.ownership.IDataOwnership;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.BOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.IBOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.shell.User;
import org.colorcoding.ibas.initialfantasy.data.emFilteringCategory;
import org.colorcoding.ibas.initialfantasy.data.emFilteringType;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;

abstract class BOFilter {
	public BOFilter() {
		this.setFiltertingDefault(true);
	}

	public final static String MSG_OWNERSHIP_JUDGER_DATA_FILTERED = "judger: role [%s] filtered data [%s], by [%s].";

	private static String FILTERING_KEY_TEMPLATE = "%s|%s";

	private boolean filtertingDefault;

	public final boolean getFiltertingDefault() {
		return filtertingDefault;
	}

	public final void setFiltertingDefault(boolean value) {
		this.filtertingDefault = value;
	}

	private HashMap<String, IBOFiltering> filterings = new HashMap<>();

	public List<IBOFiltering> getFilterings(String boCode, Iterable<String> roles)
			throws InvalidAuthorizationException {
		ArrayList<IBOFiltering> filterings = new ArrayList<>();
		ArrayList<String> doRoles = new ArrayList<>();
		for (String role : roles) {
			String key = String.format(FILTERING_KEY_TEMPLATE, boCode, role);
			if (this.filterings.containsKey(key)) {
				IBOFiltering filtering = this.filterings.get(key);
				if (filtering != null) {
					filterings.add(filtering);
				}
			} else {
				// 不存在的角色权限
				doRoles.add(role);
			}
		}
		// 构建查询条件， (BOCode = 'XXXX' AND Activated = 'Y')
		// AND (Role = 'A' OR Role = 'B')
		int roleCount = doRoles.size();
		if (roleCount > 0) {
			// 存在未缓存的角色权限
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setBracketOpen(1);
			condition.setAlias(BOFiltering.PROPERTY_BOCODE.getName());
			condition.setValue(boCode);
			condition = criteria.getConditions().create();
			condition.setAlias(BOFiltering.PROPERTY_CATEGORY.getName());
			condition.setValue(this.getCategory());
			condition = criteria.getConditions().create();
			condition.setAlias(BOFiltering.PROPERTY_ACTIVATED.getName());
			condition.setValue(emYesNo.YES);
			condition.setBracketClose(1);
			for (int i = 0; i < roleCount; i++) {
				String role = doRoles.get(i);
				condition = criteria.getConditions().create();
				condition.setAlias(BOFiltering.PROPERTY_ROLECODE.getName());
				condition.setValue(role);
				if (i > 0) {
					condition.setRelationship(ConditionRelationship.OR);
				}
				if (roleCount > 1 && i == 0) {
					// first.
					condition.setBracketOpen(1);
				}
				if (roleCount > 1 && i == roleCount - 1) {
					// last.
					condition.setBracketClose(1);
				}
			}
			try (BORepositoryInitialFantasy boRepository = new BORepositoryInitialFantasy()) {
				boRepository.setUserToken(OrganizationFactory.SYSTEM_USER.getToken());
				IOperationResult<IBOFiltering> operationResult = boRepository.fetchBOFiltering(criteria);
				for (IBOFiltering filtering : operationResult.getResultObjects()) {
					// 缓存数据并返回数据
					this.filterings.put(String.format(FILTERING_KEY_TEMPLATE, filtering.getBOCode(),
							filtering.getRoleCode() == null ? "" : filtering.getRoleCode()), filtering);
					filterings.add(filtering);
				}
				// 缓存未配置的
				for (String role : doRoles) {
					if (filterings.firstOrDefault(c -> c.getRoleCode().equals(role)) == null) {
						this.filterings.put(String.format(FILTERING_KEY_TEMPLATE, boCode, role), null);// 缓存数据
					}
				}
			}
		}
		// 过滤排序
		filterings.sort(new Comparator<IBOFiltering>() {
			@Override
			public int compare(IBOFiltering o1, IBOFiltering o2) {
				// 未设置角色的优先
				if ((o1.getRoleCode() == null || o1.getRoleCode().isEmpty())
						&& (o2.getRoleCode() != null && !o2.getRoleCode().isEmpty())) {
					return 1;
				} else if ((o1.getRoleCode() != null && !o1.getRoleCode().isEmpty())
						&& (o2.getRoleCode() == null || o2.getRoleCode().isEmpty())) {
					return -1;
				}
				// 新对象优先
				return Integer.compare(o2.getObjectKey(), o1.getObjectKey());
			}
		});
		return filterings;
	}

	public boolean filtering(IDataOwnership bo, IUser user)
			throws InvalidAuthorizationException, JudmentOperationException {
		boolean status = this.getFiltertingDefault();
		if (bo == null) {
			return status;
		}
		List<String> roles = new ArrayList<>(2);
		if (user.getBelong() != null && !user.getBelong().isEmpty()) {
			roles.add(user.getBelong());
		}
		// 增加全局角色
		roles.add("");
		if (roles == null || roles.size() == 0) {
			return status;
		}
		List<IBOFiltering> filterings = this.getFilterings(bo.getObjectCode(), roles);
		for (IBOFiltering filtering : filterings) {
			if (filtering == null) {
				continue;
			}
			BOFilteringJudgmentLink judgmentLink = new BOFilteringJudgmentLink();
			if (user instanceof User) {
				judgmentLink.setCurrentUser((User) user);
			} else {
				User sUser = new User();
				sUser.setId(user.getId());
				sUser.setBelong(user.getBelong());
				sUser.setCode("");
				sUser.setIdentities("");
				sUser.setName("");
				judgmentLink.setCurrentUser(sUser);
			}
			judgmentLink.parsingConditions(filtering.getBOFilteringConditions());
			boolean matching = judgmentLink.judge(bo);
			if (filtering.getFilteringType() == emFilteringType.AVAILABLE) {
				// 可用过滤
				if (matching) {
					// 可读
					status = true;
				} else {
					// 不可读
					status = false;
				}
			} else if (filtering.getFilteringType() == emFilteringType.UNAVAILABLE) {
				// 不可用过滤
				if (!matching) {
					// 可读
					status = true;
				} else {
					// 不可读
					status = false;
				}
			}
			if (!status) {
				Logger.log(MSG_OWNERSHIP_JUDGER_DATA_FILTERED, filtering.getRoleCode(), bo.toString(),
						this.getClass().getSimpleName());
				break;
			}
		}
		return status;
	}

	protected abstract emFilteringCategory getCategory();
}

class BOFilterRead extends BOFilter {
	/**
	 * 配置项目-数据读取默认值
	 */
	public final static String CONFIG_ITEM_DATA_READABLE_DEFAULT_VALUE = "DataReadableDefault";

	public BOFilterRead() {
		super();
		this.setFiltertingDefault(MyConfiguration.getConfigValue(CONFIG_ITEM_DATA_READABLE_DEFAULT_VALUE, true));
	}

	@Override
	protected emFilteringCategory getCategory() {
		return emFilteringCategory.READ;
	}

}

class BOFilterSave extends BOFilter {
	/**
	 * 配置项目-数据读取默认值
	 */
	public final static String CONFIG_ITEM_DATA_SAVABLE_DEFAULT_VALUE = "DataSavableDefault";

	public BOFilterSave() {
		super();
		this.setFiltertingDefault(MyConfiguration.getConfigValue(CONFIG_ITEM_DATA_SAVABLE_DEFAULT_VALUE, true));
	}

	@Override
	protected emFilteringCategory getCategory() {
		return emFilteringCategory.SAVE;
	}
}

class BOFilterCreate extends BOFilterSave {
	@Override
	protected emFilteringCategory getCategory() {
		return emFilteringCategory.CREATE;
	}
}

class BOFilterUpdate extends BOFilterSave {
	@Override
	protected emFilteringCategory getCategory() {
		return emFilteringCategory.UPDATE;
	}
}

class BOFilterDelete extends BOFilterSave {
	@Override
	protected emFilteringCategory getCategory() {
		return emFilteringCategory.DELETE;
	}
}