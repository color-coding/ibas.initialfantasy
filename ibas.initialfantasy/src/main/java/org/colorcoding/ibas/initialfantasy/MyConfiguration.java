package org.colorcoding.ibas.initialfantasy;

import org.colorcoding.ibas.bobas.configuration.ConfigurationFactory;
import org.colorcoding.ibas.bobas.configuration.IConfigurationManager;

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
	 * 配置项目-允许邮箱登录
	 */
	public final static String CONFIG_ITEM_ALLOWED_MAIL_LOGIN = "LoginMail";
	/**
	 * 配置项目-允许手机登录
	 */
	public final static String CONFIG_ITEM_ALLOWED_PHONE_LOGIN = "LoginPhone";

}
