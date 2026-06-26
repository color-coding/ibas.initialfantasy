package org.colorcoding.ibas.initialfantasy;

import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.configuration.Configuration;
import org.colorcoding.ibas.bobas.configuration.ConfigurationFactory;
import org.colorcoding.ibas.bobas.configuration.ConfigurationManager;
import org.colorcoding.ibas.bobas.data.IKeyText;

/**
 * 我的配置项
 */
public class MyConfiguration extends org.colorcoding.ibas.bobas.MyConfiguration {

	private volatile static ConfigurationManager instance;

	public static ConfigurationManager create() {
		if (instance == null) {
			synchronized (MyConfiguration.class) {
				if (instance == null) {
					instance = ConfigurationFactory.createManager();
					// 加载系统设置
					instance.setConfigSign("00000000-ibas-cc01-00000000000000000");
					instance.update();
					// 保存时截取小数，则同步小数位设置
					if (MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_TRUNCATE_DECIMALS_ON_SAVE, false)) {
						for (IKeyText keyText : instance.getElements()) {
							if (Strings.startsWith(keyText.getKey(), CONFIG_ITEM_DECIMAL_PLACES)) {
								Configuration.create().addConfigValue(keyText.getKey(), keyText.getText());
							}
						}
					}
					// 加载模块设置
					instance.setConfigSign(MODULE_ID);
					instance.update();
				}
			}
		}
		return instance;
	}

	public static <P> P getConfigValue(String key, P defaultValue) {
		return create().getConfigValue(key, defaultValue);
	}

	public static String getConfigValue(String key) {
		return create().getConfigValue(key);
	}

	/**
	 * 模块标识
	 */
	public static final String MODULE_ID = "c2b31c06-20d8-44a2-bb34-17f47ed01859";
	/**
	 * 命名空间
	 */
	public static final String NAMESPACE_ROOT = "http://colorcoding.org/ibas/initialfantasy/";
	/**
	 * 数据命名空间
	 */
	public static final String NAMESPACE_DATA = NAMESPACE_ROOT + "data";
	/**
	 * 业务对象命名空间
	 */
	public static final String NAMESPACE_BO = NAMESPACE_ROOT + "bo";
	/**
	 * 服务命名空间
	 */
	public static final String NAMESPACE_SERVICE = NAMESPACE_ROOT + "service";
	/**
	 * 配置项目-用户口令码
	 */
	public final static String CONFIG_ITEM_USER_TOKEN_KEY = "UserTokenKey";
	/**
	 * 配置项目-允许邮箱登录
	 */
	public final static String CONFIG_ITEM_ALLOWED_MAIL_LOGIN = "LoginMail";
	/**
	 * 配置项目-允许手机登录
	 */
	public final static String CONFIG_ITEM_ALLOWED_PHONE_LOGIN = "LoginPhone";
	/**
	 * 配置项目-允许用户编码登录
	 */
	public final static String CONFIG_ITEM_ALLOWED_USER_CODE_LOGIN = "LoginUserCode";
	/**
	 * 配置项目-禁用URL Token
	 */
	public final static String CONFIG_ITEM_DISABLED_URL_TOKEN = "DisabledUrlToken";
	/**
	 * 配置项目-用户口令超时时间（秒）
	 * <p>
	 * 空闲超时：超过此秒数无活动则口令失效，每次 API 调用会续期。
	 * <p>
	 * 设为大于 0 时，会同时触发以下效果：
	 * 1. 口令变为非确定性（哈希输入包含时间戳，每次登录不同）；
	 * 2. {@link #CONFIG_ITEM_USER_TOKEN_MAX_AGE} 才会生效（依赖 tokenCreateTime 被设置）。
	 * <p>
	 * 默认值 0，表示口令永久有效且为确定性生成。
	 */
	public final static String CONFIG_ITEM_USER_TOKEN_TIMEOUT_TIME = "UserTokenTimeout";
	/**
	 * 配置项目-用户口令可用实例
	 * <p>
	 * 每个用户允许同时有效的口令数量（多设备登录），超出时按时间戳淘汰最旧的。
	 * 设为大于 0 时，效果同 {@link #CONFIG_ITEM_USER_TOKEN_TIMEOUT_TIME}：触发非确定性口令并激活绝对有效期。
	 * <p>
	 * 默认值 0，表示不限制。
	 */
	public final static String CONFIG_ITEM_USER_TOKEN_INSTANCES = "UserTokenInstances";
	/**
	 * 配置项目-口令不超时用户（数组，";"分割并结尾）
	 * <p>
	 * 名单中的用户不受空闲超时和绝对有效期限制，口令永久有效且为确定性生成。
	 * 默认为空（所有用户均受限）。
	 */
	public final static String CONFIG_ITEM_TOKEN_NOT_EXPIRED_USERS = "TokenNotExpiredUsers";
	/**
	 * 配置项目-用户密码检查正则
	 */
	public final static String CONFIG_ITEM_PASSWORD_REGEX = "PasswordRegex";
	/**
	 * 配置项目-用户登录最大失败次数
	 */
	public final static String CONFIG_ITEM_LOGIN_MAX_FAIL_COUNT = "LoginMaxFailCount";
	/**
	 * 配置项目-用户登录失败记录时间窗口（秒）
	 */
	public final static String CONFIG_ITEM_LOGIN_FAIL_SPAN_TIME = "LoginFailSpanTime";

	/**
	 * 配置项目-用户口令最大绝对有效期（秒），从登录时刻计算，无论是否有操作都失效。
	 * <p>
	 * 值为 0 表示不限制绝对有效期，仅受空闲超时控制。
	 * <p>
	 * 注意：此项依赖 {@link #CONFIG_ITEM_USER_TOKEN_TIMEOUT_TIME} 或
	 * {@link #CONFIG_ITEM_USER_TOKEN_INSTANCES} 至少其一大于 0 才能生效，
	 * 因为 tokenCreateTime 仅在 needTimeout 为 true 时才被设置。
	 * 单独配置此项（其他两项为 0）不会生效。
	 */
	public final static String CONFIG_ITEM_USER_TOKEN_MAX_AGE = "UserTokenMaxAge";
	/**
	 * 配置项目-检查用户密码复杂性
	 */
	public final static String CONFIG_ITEM_CHECK_PASSWORD_COMPLEXITY = "checkPasswordComplexity";
	/**
	 * 配置项目-用户密码过期天数
	 */
	public final static String CONFIG_ITEM_PASSWORD_EXPIRATION_DAYS = "passwordExpirationDays";

	private static Boolean DISABLED_URL_TOKEN = null;
	/**
	 * 授权协议
	 */
	public static String AUTHENTICATION_SCHEMES_BEARER = "Bearer";

	/**
	 * 禁用地址Token方式
	 */
	public static boolean isDisabledUrlToken() {
		if (DISABLED_URL_TOKEN == null) {
			synchronized (MyConfiguration.class) {
				if (DISABLED_URL_TOKEN == null) {
					DISABLED_URL_TOKEN = MyConfiguration.getConfigValue(CONFIG_ITEM_DISABLED_URL_TOKEN, false);
				}
			}
		}
		return DISABLED_URL_TOKEN;
	}

	/**
	 * 选择Token
	 * 
	 * @param headerToken 消息头Token
	 * @param urlToken    地址Token
	 * @return
	 */
	public static String optToken(String headerToken, String urlToken) {
		if (!Strings.isNullOrEmpty(headerToken)) {
			String values[] = headerToken.split(" ");
			if (values.length > 1) {
				if (AUTHENTICATION_SCHEMES_BEARER.equalsIgnoreCase(values[0].trim())) {
					return values[1].trim();
				}
			}
		}
		if (isDisabledUrlToken()) {
			return Strings.VALUE_EMPTY;
		}
		return urlToken;
	}

	/**
	 * 配置项目-小数位数
	 */
	public final static String CONFIG_ITEM_DECIMAL_PLACES = "decimalPlaces";
	/**
	 * 配置项目-小数位数-价格
	 */
	public final static String CONFIG_ITEM_DECIMAL_PLACES_PRICE = "decimalPlaces|Price";
	/**
	 * 配置项目-小数位数-数量
	 */
	public final static String CONFIG_ITEM_DECIMAL_PLACES_QUANTITY = "decimalPlaces|Quantity";
	/**
	 * 配置项目-小数位数-总计
	 */
	public final static String CONFIG_ITEM_DECIMAL_PLACES_SUM = "decimalPlaces|Sum";
	/**
	 * 配置项目-小数位数-度量
	 */
	public final static String CONFIG_ITEM_DECIMAL_PLACES_MEASUREMENT = "decimalPlaces|Measurement";
	/**
	 * 配置项目-小数位数-率
	 */
	public final static String CONFIG_ITEM_DECIMAL_PLACES_RATE = "decimalPlaces|Rate";
	/**
	 * 配置项目-小数位数-百分比
	 */
	public final static String CONFIG_ITEM_DECIMAL_PLACES_PERCENTAGE = "decimalPlaces|Percentage";
}
