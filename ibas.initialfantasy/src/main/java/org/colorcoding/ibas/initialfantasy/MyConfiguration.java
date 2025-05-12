package org.colorcoding.ibas.initialfantasy;

import org.colorcoding.ibas.bobas.configuration.ConfigurationFactory;
import org.colorcoding.ibas.bobas.configuration.IConfigurationManager;
import org.colorcoding.ibas.initialfantasy.data.DataConvert;

/**
 * 我的配置项
 */
public class MyConfiguration extends org.colorcoding.ibas.bobas.MyConfiguration {

	private volatile static IConfigurationManager instance;

	public static IConfigurationManager create() {
		if (instance == null) {
			synchronized (MyConfiguration.class) {
				if (instance == null) {
					instance = ConfigurationFactory.create().createManager();
					// 加载系统设置
					instance.setConfigSign("00000000-ibas-cc01-00000000000000000");
					instance.update();
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
	 */
	public final static String CONFIG_ITEM_USER_TOKEN_TIMEOUT_TIME = "UserTokenTimeout";
	/**
	 * 配置项目-用户口令可用实例
	 */
	public final static String CONFIG_ITEM_USER_TOKEN_INSTANCES = "UserTokenInstances";
	/**
	 * 配置项目-口令不超时用户（数组，";"分割并结尾）
	 */
	public final static String CONFIG_ITEM_TOKEN_NOT_EXPIRED_USERS = "TokenNotExpiredUsers";
	/**
	 * 配置项目-用户密码检查正则
	 */
	public final static String CONFIG_ITEM_PASSWORD_REGEX = "PasswordRegex";
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
			return false;
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
		if (DISABLED_URL_TOKEN == null) {
			synchronized (MyConfiguration.class) {
				if (DISABLED_URL_TOKEN == null) {
					DISABLED_URL_TOKEN = MyConfiguration.getConfigValue(CONFIG_ITEM_DISABLED_URL_TOKEN, false);
				}
			}
		}
		if (!DataConvert.isNullOrEmpty(headerToken)) {
			String values[] = headerToken.split(" ");
			if (values.length > 1) {
				if (AUTHENTICATION_SCHEMES_BEARER.equalsIgnoreCase(values[0].trim())) {
					return values[1].trim();
				}
			}
		}
		if (DISABLED_URL_TOKEN) {
			return DataConvert.STRING_VALUE_EMPTY;
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
