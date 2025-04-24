package org.colorcoding.ibas.initialfantasy.service.rest.bind;

import java.io.IOException;
import java.io.OutputStream;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;
import java.math.BigDecimal;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.json.JsonWriter;
import javax.ws.rs.Consumes;
import javax.ws.rs.ProcessingException;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.MessageBodyWriter;
import javax.ws.rs.ext.Provider;

import org.colorcoding.ibas.bobas.bo.IBOUserFields;
import org.colorcoding.ibas.bobas.bo.IUserField;
import org.colorcoding.ibas.bobas.common.DateTimes;
import org.colorcoding.ibas.bobas.common.IOperationInformation;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.initialfantasy.bo.organization.User;

@Provider
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserMessageBodyWriter implements MessageBodyWriter<OperationResult<User>> {

	public final static String TYPE_NAME = String.format("%s<%s>", OperationResult.class.getName(),
			User.class.getName());

	public UserMessageBodyWriter() {
	}

	@Override
	public boolean isWriteable(Class<?> type, Type genericType, Annotation[] annotations, MediaType mediaType) {
		if (genericType.getTypeName().equals(TYPE_NAME)) {
			return true;
		}
		return false;
	}

	@Override
	public void writeTo(OperationResult<User> t, Class<?> type, Type genericType, Annotation[] annotations,
			MediaType mediaType, MultivaluedMap<String, Object> httpHeaders, OutputStream entityStream)
			throws IOException, WebApplicationException {
		try {
			JsonObjectBuilder resultBuilder = Json.createObjectBuilder();
			resultBuilder.add("type", t.getClass().getSimpleName());
			resultBuilder.add("SignID", t.getSignID());
			resultBuilder.add("Time", t.getTime().toString(DateTime.FORMAT_DATETIME));
			resultBuilder.add("ResultCode", t.getResultCode());
			resultBuilder.add("Message", t.getMessage());

			if (!t.getInformations().isEmpty()) {
				JsonObjectBuilder objectBuilder;
				JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
				for (IOperationInformation data : t.getInformations()) {
					objectBuilder = Json.createObjectBuilder();
					objectBuilder.add("type", data.getClass().getSimpleName());
					objectBuilder.add("Tag", data.getTag());
					objectBuilder.add("Name", data.getName());
					objectBuilder.add("Content", data.getContent());
					arrayBuilder.add(objectBuilder);
				}
				resultBuilder.add("Informations", arrayBuilder);
			}
			if (!t.getResultObjects().isEmpty()) {
				JsonObjectBuilder objectBuilder;
				JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
				for (User data : t.getResultObjects()) {
					objectBuilder = Json.createObjectBuilder();
					this.writeTo(data, objectBuilder);
					arrayBuilder.add(objectBuilder);
				}
				resultBuilder.add("ResultObjects", arrayBuilder);
			}
			try (JsonWriter jsonWriter = Json.createWriter(entityStream)) {
				jsonWriter.write(resultBuilder.build());
			}
		} catch (Exception e) {
			throw new ProcessingException("Error Serializing Master data.", e);
		}
	}

	protected void writeTo(User data, JsonObjectBuilder objectBuilder) throws IOException {
		objectBuilder.add("type", data.getClass().getSimpleName());
		objectBuilder.add("isNew", data.isNew());
		objectBuilder.add("isDirty", data.isDirty());
		objectBuilder.add("isSavable", data.isSavable());
		objectBuilder.add("isDeleted", data.isDeleted());

		Object value;
		for (IPropertyInfo<?> propertyInfo : data.properties()) {
			if (Strings.isWith(propertyInfo.getName(), IBOUserFields.USER_FIELD_PREFIX_SIGN, null)) {
				continue;
			}
			value = data.getProperty(propertyInfo);
			if (value == null || value == DateTimes.VALUE_MIN) {
				continue;
			}
			if (User.PROPERTY_PASSWORD.getName().equals(propertyInfo.getName())) {
				objectBuilder.add(propertyInfo.getName(), User.PASSWORD_MASK);
			} else if (propertyInfo.getValueType() == Boolean.class) {
				objectBuilder.add(propertyInfo.getName(), (Boolean) value);
			} else if (propertyInfo.getValueType() == BigDecimal.class) {
				objectBuilder.add(propertyInfo.getName(), (BigDecimal) value);
			} else if (propertyInfo.getValueType() == Integer.class) {
				objectBuilder.add(propertyInfo.getName(), (Integer) value);
			} else if (propertyInfo.getValueType() == Short.class) {
				objectBuilder.add(propertyInfo.getName(), (Short) value);
			} else if (propertyInfo.getValueType() == DateTime.class) {
				objectBuilder.add(propertyInfo.getName(),
						DateTimes.toString((DateTime) value, DateTime.FORMAT_DATETIME));
			} else if (propertyInfo.getValueType().isEnum()) {
				objectBuilder.add(propertyInfo.getName(), value.toString());
			} else {
				objectBuilder.add(propertyInfo.getName(), Strings.valueOf(value));
			}
		}

		if (data.getUserFields().size() > 0) {
			JsonObjectBuilder fieldBuilder;
			JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
			for (IUserField<?> userField : data.getUserFields()) {
				if (Strings.isNullOrEmpty(userField.getName())) {
					continue;
				}
				if (userField.getValue() == null) {
					continue;
				}
				fieldBuilder = Json.createObjectBuilder();
				fieldBuilder.add("Name", userField.getName());
				fieldBuilder.add("ValueType", userField.getValueType().getSimpleName());
				fieldBuilder.add("Value", String.valueOf(userField.getValue()));
				arrayBuilder.add(fieldBuilder);
			}
			objectBuilder.add("UserFields", arrayBuilder);
		}
	}

}
