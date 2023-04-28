package org.colorcoding.ibas.initialfantasy.service.rest.bind;

import java.io.IOException;
import java.io.OutputStream;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;
import java.math.BigDecimal;

import javax.ws.rs.Consumes;
import javax.ws.rs.ProcessingException;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.ext.MessageBodyWriter;
import javax.ws.rs.ext.Provider;

import org.colorcoding.ibas.bobas.bo.IUserField;
import org.colorcoding.ibas.bobas.common.IOperationInformation;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.core.fields.IFieldData;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.initialfantasy.bo.organization.User;
import org.colorcoding.ibas.initialfantasy.data.DataConvert;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;

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
			JsonFactory jsonFactory = new JsonFactory();
			JsonGenerator jsonGenerator = jsonFactory.createGenerator(entityStream);
			// write Operation Result
			jsonGenerator.writeStartObject();
			jsonGenerator.writeStringField("type", t.getClass().getSimpleName());
			jsonGenerator.writeStringField("SignID", t.getSignID());
			jsonGenerator.writeStringField("Time", t.getTime().toString(DateTime.FORMAT_DATETIME));
			jsonGenerator.writeNumberField("ResultCode", t.getResultCode());
			jsonGenerator.writeStringField("Message", t.getMessage());

			jsonGenerator.writeArrayFieldStart("Informations");
			for (IOperationInformation data : t.getInformations()) {
				this.writeTo(data, jsonGenerator);
			}
			jsonGenerator.writeEndArray();

			jsonGenerator.writeArrayFieldStart("ResultObjects");
			for (User data : t.getResultObjects()) {
				this.writeTo(data, jsonGenerator);
			}
			jsonGenerator.writeEndArray();

			jsonGenerator.writeEndObject();
			jsonGenerator.flush();
			jsonGenerator.close();
		} catch (Exception e) {
			throw new ProcessingException("Error Serializing Master data.", e);
		}
	}

	protected void writeTo(User data, JsonGenerator jsonGenerator) throws IOException {
		jsonGenerator.writeStartObject();
		jsonGenerator.writeStringField("type", data.getClass().getSimpleName());
		jsonGenerator.writeBooleanField("isNew", data.isNew());
		jsonGenerator.writeBooleanField("isDirty", data.isDirty());
		jsonGenerator.writeBooleanField("isSavable", data.isSavable());
		jsonGenerator.writeBooleanField("isDeleted", data.isDeleted());

		for (IFieldData fieldData : data.getFields()) {
			if (fieldData.getValue() == null) {
				continue;
			}
			if (User.PROPERTY_PASSWORD.getName().equals(fieldData.getName())) {
				jsonGenerator.writeStringField(fieldData.getName(), User.PASSWORD_MASK);
			} else if (fieldData.getValueType() == Boolean.class) {
				jsonGenerator.writeBooleanField(fieldData.getName(), (Boolean) fieldData.getValue());
			} else if (fieldData.getValueType() == BigDecimal.class) {
				jsonGenerator.writeNumberField(fieldData.getName(), (BigDecimal) fieldData.getValue());
			} else if (fieldData.getValueType() == Integer.class) {
				jsonGenerator.writeNumberField(fieldData.getName(), (Integer) fieldData.getValue());
			} else if (fieldData.getValueType() == Short.class) {
				jsonGenerator.writeNumberField(fieldData.getName(), (Short) fieldData.getValue());
			} else if (fieldData.getValueType() == DateTime.class) {
				if (fieldData.getValue() != DateTime.MIN_VALUE) {
					jsonGenerator.writeStringField(fieldData.getName(),
							fieldData.getValue() instanceof DateTime
									? ((DateTime) fieldData.getValue()).toString(DateTime.FORMAT_DATETIME)
									: "");
				}
			} else if (fieldData.getValueType().isEnum()) {
				jsonGenerator.writeStringField(fieldData.getName(), fieldData.getValue().toString());
			} else {
				jsonGenerator.writeStringField(fieldData.getName(), fieldData.getValue().toString());
			}
		}

		jsonGenerator.writeArrayFieldStart("UserFields");
		for (IUserField userField : data.getUserFields()) {
			if (DataConvert.isNullOrEmpty(userField.getName())) {
				continue;
			}
			if (userField.getValue() == null) {
				continue;
			}
			jsonGenerator.writeStartObject();
			jsonGenerator.writeStringField("Name", userField.getName());
			jsonGenerator.writeStringField("ValueType", userField.getValueType().toString());
			jsonGenerator.writeStringField("Value", String.valueOf(userField.getValue()));
			jsonGenerator.writeEndObject();
		}
		jsonGenerator.writeEndArray();

		jsonGenerator.writeEndObject();
	}

	protected void writeTo(IOperationInformation data, JsonGenerator jsonGenerator) throws IOException {
		jsonGenerator.writeStartObject();
		jsonGenerator.writeStringField("type", data.getClass().getSimpleName());
		jsonGenerator.writeStringField("Tag", data.getTag());
		jsonGenerator.writeStringField("Name", data.getName());
		jsonGenerator.writeStringField("Content", data.getContent());
		jsonGenerator.writeEndObject();
	}

}
