package org.colorcoding.ibas.initialfantasy.data;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 敏感字段标记。
 * 
 * 被该注解标记的业务对象属性，在序列化输出时将以掩码值替代真实值， 用于避免敏感数据（如密码、令牌、密钥等）泄漏到客户端。
 * 
 * 配合 {@code MessageBodyWriter} 实现统一脱敏，无需为每个敏感字段单独编写逻辑。
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface Sensitive {

	/**
	 * 默认掩码值
	 */
	String DEFAULT_MASK = "********";

	/**
	 * 序列化时输出的掩码值。
	 *
	 * @return 掩码字符串
	 */
	String mask() default DEFAULT_MASK;

	/**
	 * 当真实值为 {@code null} 或空时，是否仍然输出掩码值。
	 * 默认为 {@code false}，即 null/空值原样跳过。
	 *
	 * @return true 表示空值仍然输出掩码
	 */
	boolean maskEmpty() default false;
}
