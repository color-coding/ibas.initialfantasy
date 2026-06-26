package org.colorcoding.ibas.initialfantasy.service.rest.bind;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.lang.annotation.Annotation;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.json.JsonWriter;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.MessageBodyWriter;
import javax.ws.rs.ext.Provider;

import org.colorcoding.ibas.bobas.bo.IBOUserFields;
import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.bo.IUserField;
import org.colorcoding.ibas.bobas.common.DateTimes;
import org.colorcoding.ibas.bobas.common.IOperationInformation;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.initialfantasy.bo.organization.User;
import org.colorcoding.ibas.initialfantasy.data.Sensitive;

/**
 * 用户业务对象 JSON 序列化输出器。
 * 
 * 该 Writer 接管 {@code OperationResult<User>}（含 {@code User} 子类）的 JSON 输出，
 * 通过扫描属性上的 {@link Sensitive} 注解，对敏感字段进行掩码处理，避免诸如 password 等敏感值泄漏。
 * 
 * 与默认序列化器相比，本类的存在仅为安全过滤：业务字段仍按原始属性遍历输出。
 * 
 * @see Sensitive
 */
@Provider
@Produces(MediaType.APPLICATION_JSON)
public class UserMessageBodyWriter implements MessageBodyWriter<OperationResult<? extends User>> {

	public UserMessageBodyWriter() {
	}

	@Override
	public boolean isWriteable(Class<?> type, Type genericType, Annotation[] annotations, MediaType mediaType) {
		// 必须是 OperationResult<? extends User>
		if (!(genericType instanceof ParameterizedType)) {
			return false;
		}
		ParameterizedType pt = (ParameterizedType) genericType;
		if (pt.getRawType() != OperationResult.class) {
			return false;
		}
		Type[] arguments = pt.getActualTypeArguments();
		if (arguments.length != 1) {
			return false;
		}
		Type arg = arguments[0];
		if (arg instanceof Class) {
			return User.class.isAssignableFrom((Class<?>) arg);
		}
		return false;
	}

	@Override
	public long getSize(OperationResult<? extends User> t, Class<?> type, Type genericType, Annotation[] annotations,
			MediaType mediaType) {
		return -1;
	}

	@Override
	public void writeTo(OperationResult<? extends User> t, Class<?> type, Type genericType, Annotation[] annotations,
			MediaType mediaType, MultivaluedMap<String, Object> httpHeaders, OutputStream entityStream)
			throws IOException, WebApplicationException {
		try {
			JsonObjectBuilder resultBuilder = Json.createObjectBuilder();
			resultBuilder.add("type", t.getClass().getSimpleName());
			addNullable(resultBuilder, "SignID", t.getSignID());
			addNullable(resultBuilder, "Time", t.getTime() != null ? t.getTime().toString() : null);
			resultBuilder.add("ResultCode", t.getResultCode());
			addNullable(resultBuilder, "Message", t.getMessage());

			if (!t.getInformations().isEmpty()) {
				JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
				for (IOperationInformation data : t.getInformations()) {
					JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
					objectBuilder.add("type", data.getClass().getSimpleName());
					addNullable(objectBuilder, "Tag", data.getTag());
					addNullable(objectBuilder, "Name", data.getName());
					addNullable(objectBuilder, "Content", data.getContent());
					arrayBuilder.add(objectBuilder);
				}
				resultBuilder.add("Informations", arrayBuilder);
			}
			if (!t.getResultObjects().isEmpty()) {
				JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
				for (User data : t.getResultObjects()) {
					JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
					this.writeTo(data, objectBuilder);
					arrayBuilder.add(objectBuilder);
				}
				resultBuilder.add("ResultObjects", arrayBuilder);
			}
			// 显式指定 UTF-8，避免平台默认编码导致中文乱码
			try (JsonWriter jsonWriter = Json
					.createWriter(new OutputStreamWriter(entityStream, StandardCharsets.UTF_8))) {
				jsonWriter.write(resultBuilder.build());
			}
		} catch (Exception e) {
			Logger.log(MessageLevel.ERROR, e);
			throw new IOException("Error serializing OperationResult<User>.", e);
		}
	}

	/**
	 * 序列化单个用户业务对象。
	 * 
	 * 遍历所有属性，对带有 {@link Sensitive} 注解的属性以掩码值替代；其它字段按原值输出。
	 */
	protected void writeTo(User data, JsonObjectBuilder objectBuilder) {
		if (data == null) {
			return;
		}
		objectBuilder.add("type", data.getClass().getSimpleName());
		objectBuilder.add("isNew", data.isNew());
		objectBuilder.add("isDirty", data.isDirty());
		objectBuilder.add("isSavable", data.isSavable());
		objectBuilder.add("isDeleted", data.isDeleted());

		for (IPropertyInfo<?> propertyInfo : data.properties()) {
			if (Strings.isWith(propertyInfo.getName(), IBOUserFields.USER_FIELD_PREFIX_SIGN, null)) {
				continue;
			}
			Object value = data.getProperty(propertyInfo);
			Sensitive sensitive = propertyInfo.getAnnotation(Sensitive.class);
			// 敏感字段：根据注解决定输出与否、输出何值
			if (sensitive != null) {
				boolean empty = (value == null) || (value instanceof CharSequence
						&& ((CharSequence) value).length() == 0) || value == DateTimes.VALUE_MIN;
				if (empty && !sensitive.maskEmpty()) {
					continue;
				}
				objectBuilder.add(propertyInfo.getName(), sensitive.mask());
				continue;
			}
			if (value == null || value == DateTimes.VALUE_MIN) {
				continue;
			}
			writeProperty(objectBuilder, propertyInfo, value);
		}

		if (data instanceof IBOUserFields && data.getUserFields().size() > 0) {
			JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
			for (IUserField<?> userField : data.getUserFields()) {
				if (Strings.isNullOrEmpty(userField.getName())) {
					continue;
				}
				if (userField.getValue() == null) {
					continue;
				}
				JsonObjectBuilder fieldBuilder = Json.createObjectBuilder();
				fieldBuilder.add("Name", userField.getName());
				fieldBuilder.add("ValueType", userField.getValueType().getSimpleName());
				fieldBuilder.add("Value", String.valueOf(userField.getValue()));
				arrayBuilder.add(fieldBuilder);
			}
			objectBuilder.add("UserFields", arrayBuilder);
		}
	}

	/**
	 * 按属性值类型写入 JSON。
	 */
	private void writeProperty(JsonObjectBuilder objectBuilder, IPropertyInfo<?> propertyInfo, Object value) {
		Class<?> valueType = propertyInfo.getValueType();
		String name = propertyInfo.getName();
		if (valueType == Boolean.class) {
			objectBuilder.add(name, (Boolean) value);
		} else if (valueType == BigDecimal.class) {
			objectBuilder.add(name, (BigDecimal) value);
		} else if (valueType == Integer.class) {
			objectBuilder.add(name, (Integer) value);
		} else if (valueType == Long.class) {
			objectBuilder.add(name, (Long) value);
		} else if (valueType == Short.class) {
			objectBuilder.add(name, (Short) value);
		} else if (valueType == Double.class) {
			objectBuilder.add(name, (Double) value);
		} else if (valueType == Float.class) {
			objectBuilder.add(name, ((Float) value).doubleValue());
		} else if (valueType == DateTime.class) {
			objectBuilder.add(name, ((DateTime) value).toString());
		} else if (valueType.isEnum()) {
			objectBuilder.add(name, value.toString());
		} else if (value instanceof IBusinessObject) {
			// 嵌套 BO 暂不展开，避免循环引用；保持类型名提示
			objectBuilder.add(name, value.getClass().getSimpleName());
		} else {
			objectBuilder.add(name, Strings.valueOf(value));
		}
	}

	private static void addNullable(JsonObjectBuilder builder, String name, String value) {
		if (value == null) {
			builder.addNull(name);
		} else {
			builder.add(name, value);
		}
	}

}
