package org.colorcoding.ibas.bobas.ownership.initial;

import java.util.HashMap;
import java.util.List;

import org.colorcoding.ibas.bobas.MyConfiguration;
import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.core.fields.IFieldData;
import org.colorcoding.ibas.bobas.core.fields.IFieldDataDb;
import org.colorcoding.ibas.bobas.core.fields.IManagedFields;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.emConditionRelationship;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.expression.BOJudgmentLink;
import org.colorcoding.ibas.bobas.expression.IPropertyValueOperator;
import org.colorcoding.ibas.bobas.expression.IValueOperator;
import org.colorcoding.ibas.bobas.expression.JudgmentLinkException;
import org.colorcoding.ibas.bobas.expression.JudgmentLinkItem;
import org.colorcoding.ibas.bobas.expression.JudmentOperation;
import org.colorcoding.ibas.bobas.expression.JudmentOperationException;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.organization.IUser;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.bobas.ownership.IDataOwnership;
import org.colorcoding.ibas.bobas.ownership.IOwnershipJudger;
import org.colorcoding.ibas.bobas.ownership.UnauthorizedException;
import org.colorcoding.ibas.bobas.repository.InvalidTokenException;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.BOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.IBOFiltering;
import org.colorcoding.ibas.initialfantasy.bo.bofiltering.IBOFilteringCondition;
import org.colorcoding.ibas.initialfantasy.data.emFilteringType;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;
import org.colorcoding.ibas.initialfantasy.repository.IBORepositoryInitialFantasyApp;

public class OwnershipJudger implements IOwnershipJudger {

	/**
	 * 配置项目-数据读取默认值
	 */
	public final static String CONFIG_ITEM_DATA_READABLE_DEFAULT_VALUE = "DataReadableDefault";

	public static final String MSG_OWNERSHIP_JUDGER_DATA_FILTERED = "judger: role [%s] filtered data [%s].";

	@Override
	public boolean canRead(IDataOwnership data, IUser user, boolean throwError) throws UnauthorizedException {
		boolean status = this.canRead(data, user);
		if (throwError && !status) {
			throw new UnauthorizedException();
		}
		return status;
	}

	@Override
	public boolean canSave(IDataOwnership data, IUser user, boolean throwError) throws UnauthorizedException {
		boolean status = this.canSave(data, user);
		if (throwError && !status) {
			throw new UnauthorizedException();
		}
		return status;
	}

	@Override
	public boolean canSave(IDataOwnership data, IUser user) {
		// 不控制保存，进控制读取
		return true;
	}

	@Override
	public boolean canRead(IDataOwnership data, IUser user) {
		try {
			if (data == null || user == null) {
				return false;
			}
			return this.filtering(data, user);
		} catch (Exception e) {
			Logger.log(e);
			throw new RuntimeException(e);
		}
	}

	/**
	 * 过滤数据
	 * 
	 * 注意，配置的条件中，任意一个不满足则不满足
	 * 
	 * @param bo
	 *            数据
	 * @param role
	 *            角色
	 * @return true,被过滤；false,未被过滤
	 * @throws InvalidTokenException
	 * @throws JudmentOperationException
	 */
	protected boolean filtering(IDataOwnership bo, IUser user) throws InvalidTokenException, JudmentOperationException {
		boolean status = MyConfiguration.getConfigValue(CONFIG_ITEM_DATA_READABLE_DEFAULT_VALUE, true);
		String[] roles = OrganizationFactory.create().createManager().getRoles(user);
		if (bo == null || roles == null || roles.length == 0) {
			return status;
		}
		List<IBOFiltering> filterings = this.getBOFilterings(bo.getObjectCode(), roles);
		for (IBOFiltering filtering : filterings) {
			if (filtering == null) {
				continue;
			}
			BOFilteringJudgmentLink judgmentLink = new BOFilteringJudgmentLink();
			judgmentLink.setCurrentUser(user);
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
				Logger.log(MSG_OWNERSHIP_JUDGER_DATA_FILTERED, filtering.getRoleCode(), bo.toString());
				break;
			}
		}
		return status;
	}

	private HashMap<String, IBOFiltering> boFilterings = new HashMap<>();
	private static String FILTERING_KEY_TEMPLATE = "%s|%s";

	protected List<IBOFiltering> getBOFilterings(String boCode, String[] roles) throws InvalidTokenException {
		ArrayList<IBOFiltering> filterings = new ArrayList<>();
		ArrayList<String> doRoles = new ArrayList<>();
		for (String role : roles) {
			String key = String.format(FILTERING_KEY_TEMPLATE, boCode, role);
			if (this.boFilterings.containsKey(key)) {
				filterings.add(this.boFilterings.get(key));
			} else {
				// 不存在的角色权限
				doRoles.add(role);
			}
		}
		// 构建查询条件， (BOCode = 'XXXX' AND Activated = 'Y')
		// AND (Role = 'A' OR Role = 'B')
		if (doRoles.size() > 0) {
			// 存在未缓存的角色权限
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setBracketOpen(1);
			condition.setAlias(BOFiltering.PROPERTY_BOCODE.getName());
			condition.setValue(boCode);
			condition = criteria.getConditions().create();
			condition.setAlias(BOFiltering.PROPERTY_ACTIVATED.getName());
			condition.setValue(emYesNo.YES);
			condition.setBracketClose(1);
			for (int i = 0; i < doRoles.size(); i++) {
				condition = criteria.getConditions().create();
				condition.setAlias(BOFiltering.PROPERTY_ROLECODE.getName());
				condition.setValue(doRoles.get(i));
				condition.setRelationship(ConditionRelationship.OR);
				if (i == 0) {
					// first.
					condition.setRelationship(ConditionRelationship.AND);
					condition.setBracketOpen(1);
				}
				if (i == doRoles.size() - 1) {
					// last.
					condition.setBracketClose(1);
				}
			}
			IBORepositoryInitialFantasyApp boRepository = new BORepositoryInitialFantasy();
			boRepository.setUserToken(OrganizationFactory.SYSTEM_USER.getToken());
			IOperationResult<IBOFiltering> operationResult = boRepository.fetchBOFiltering(criteria);
			for (IBOFiltering filtering : operationResult.getResultObjects()) {
				this.boFilterings.put(
						String.format(FILTERING_KEY_TEMPLATE, filtering.getBOCode(), filtering.getRoleCode()),
						filtering);// 缓存数据
				filterings.add(filtering);// 返回数据
			}
			// 缓存未配置的
			for (String role : doRoles) {
				if (filterings.firstOrDefault(c -> c.getRoleCode().equals(role)) == null) {
					this.boFilterings.put(String.format(FILTERING_KEY_TEMPLATE, boCode, role), null);// 缓存数据
				}
			}
		}
		return filterings;
	}
}

class BOFilteringJudgmentLink extends BOJudgmentLink {

	/** 变量-用户ID */
	public static final String VARIABLE_NAME_USER_ID = "${USER_ID}";
	/** 变量-用户归属 */
	public static final String VARIABLE_NAME_USER_BELONG = "${USER_BELONG}";

	private IUser currentUser;

	public final IUser getCurrentUser() {
		return currentUser;
	}

	public final void setCurrentUser(IUser currentUser) {
		this.currentUser = currentUser;
	}

	public void parsingConditions(List<IBOFilteringCondition> conditions) {
		// 判断无条件
		if (conditions == null || conditions.size() == 0) {
			return;
		}
		ArrayList<JudgmentLinkItem> jLinkItems = new ArrayList<JudgmentLinkItem>();
		for (IBOFilteringCondition item : conditions) {
			JudgmentLinkItem jItem = new JudgmentLinkItem();
			jItem.setOpenBracket(0);
			jItem.setCloseBracket(0);
			if (item.getRelationship() == emConditionRelationship.NONE || item.getRelationship() == null) {
				jItem.setRelationship(JudmentOperation.AND);
			} else {
				jItem.setRelationship(JudmentOperation.valueOf(item.getRelationship()));
			}
			jItem.setOperation(JudmentOperation.valueOf(item.getOperation()));
			// 左边取值
			IPropertyValueOperator propertyValueOperator = this.createPropertyValueOperator();
			propertyValueOperator.setPropertyName(item.getPropertyName());
			jItem.setLeftOperter(propertyValueOperator);
			// 右边取值
			// 与值比较
			IValueOperator ValueOperator = this.createValueOperator();
			if (VARIABLE_NAME_USER_ID.equals(item.getConditionValue())) {
				ValueOperator.setValue(this.getCurrentUser().getId());
			} else if (VARIABLE_NAME_USER_BELONG.equals(item.getConditionValue())) {
				ValueOperator.setValue(this.getCurrentUser().getBelong());
			} else {
				ValueOperator.setValue(item.getConditionValue());
			}
			jItem.setRightOperter(ValueOperator);
			// 设置括号
			jItem.setOpenBracket(item.getBracketOpen());
			jItem.setCloseBracket(item.getBracketClose());
			jLinkItems.add(jItem);
		}
		super.setJudgmentItems(jLinkItems.toArray(new JudgmentLinkItem[] {}));
	}

	@Override
	protected IPropertyValueOperator createPropertyValueOperator() {
		// 使用数据库字段属性比较
		return new IPropertyValueOperator() {
			private IManagedFields value;
			private IFieldData field = null;

			private IFieldData getField() {
				if (this.field == null) {
					for (IFieldData item : value.getFields()) {
						if (item instanceof IFieldDataDb) {
							IFieldDataDb dbField = (IFieldDataDb) item;
							if (dbField.getDbField().equalsIgnoreCase(this.getPropertyName())) {
								this.field = dbField;
								break;
							}
						}
					}
				}
				if (this.field == null) {
					throw new JudgmentLinkException(I18N.prop("msg_bobas_not_found_bo_field", this.getPropertyName()));
				}
				return this.field;
			}

			@Override
			public void setValue(Object value) {
				if (value != null && !(value instanceof IManagedFields)) {
					throw new JudgmentLinkException(I18N.prop("msg_bobas_invaild_bo_type"));
				}
				this.value = (IManagedFields) value;
				this.field = null;
			}

			@Override
			public Object getValue() {
				if (this.value == null) {
					return null;
				}
				return this.getField().getValue();
			}

			@Override
			public Class<?> getValueClass() {
				if (this.value == null) {
					return null;
				}
				return this.getField().getValueType();
			}

			private String propertyName;

			@Override
			public void setPropertyName(String value) {
				this.propertyName = value;
			}

			@Override
			public String getPropertyName() {
				return this.propertyName;
			}

			private static final String format_template = "{property's value: %s}";

			@Override
			public String toString() {
				return String.format(format_template, this.getPropertyName());
			}
		};
	}

}