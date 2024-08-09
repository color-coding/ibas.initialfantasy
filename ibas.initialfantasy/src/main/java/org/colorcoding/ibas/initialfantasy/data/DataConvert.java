package org.colorcoding.ibas.initialfantasy.data;

import java.io.IOException;
import java.io.StringWriter;
import java.math.BigDecimal;

import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.bo.IBusinessObjects;
import org.colorcoding.ibas.bobas.core.fields.IFieldData;
import org.colorcoding.ibas.bobas.core.fields.IManagedFields;
import org.colorcoding.ibas.bobas.data.DateTime;

/**
 * 数据转换
 * 
 */
public class DataConvert extends org.colorcoding.ibas.bobas.data.DataConvert {

	public static String toString(IManagedFields data) throws IOException {
		if (data == null) {
			return DataConvert.STRING_VALUE_EMPTY;
		}
		try (StringWriter writer = new StringWriter()) {
			writeString(writer, data);
			writer.flush();
			return writer.toString();
		}
	}

	private final static String TEMPLATE_FIELD_NAME = "\"%s\":";
	private final static String TEMPLATE_STRING_VALUE = "\"%s\"";
	private final static String TEMPLATE_NUMBER_VALUE = "%s";

	private static void writeString(StringWriter writer, IManagedFields data) {
		writer.append("{");
		writer.append(String.format(TEMPLATE_FIELD_NAME, "type"));
		writer.append(String.format(TEMPLATE_STRING_VALUE, data.getClass().getSimpleName()));
		for (IFieldData field : data.getFields()) {
			if (field.getValue() == null) {
				continue;
			}
			if (field.getValue() == DateTime.MIN_VALUE) {
				continue;
			}
			writer.append(",");
			writer.append(String.format(TEMPLATE_FIELD_NAME, field.getName()));
			if (IBusinessObject.class.isAssignableFrom(field.getValueType())) {
				// 对象
				if (field.getValue() instanceof IBusinessObject) {
					if (field.getValue() instanceof IManagedFields) {
						writeString(writer, (IManagedFields) field.getValue());
					}
				}
			} else if (IBusinessObjects.class.isAssignableFrom(field.getValueType())) {
				// 对象数组
				writer.append("[");
				if (field.getValue() instanceof IBusinessObjects) {
					IBusinessObjects<?, ?> values = (IBusinessObjects<?, ?>) field.getValue();
					for (IBusinessObject item : values) {
						if (item instanceof IManagedFields) {
							if (values.indexOf(item) > 0) {
								writer.append(",");
							}
							writeString(writer, (IManagedFields) item);
						}
					}
				}
				writer.append("]");
			} else if (field.getValueType() == BigDecimal.class) {
				writer.append(String.format(TEMPLATE_NUMBER_VALUE, DataConvert.toString(field.getValue())));
			} else if (field.getValueType() == Integer.class) {
				writer.append(String.format(TEMPLATE_NUMBER_VALUE, DataConvert.toString(field.getValue())));
			} else if (field.getValueType() == Short.class) {
				writer.append(String.format(TEMPLATE_NUMBER_VALUE, DataConvert.toString(field.getValue())));
			} else if (field.getValueType() == Long.class) {
				writer.append(String.format(TEMPLATE_NUMBER_VALUE, DataConvert.toString(field.getValue())));
			} else if (field.getValueType() == DateTime.class) {
				writer.append(String.format(TEMPLATE_STRING_VALUE, DataConvert.toString(field.getValue())));
			} else if (field.getValueType().isEnum()) {
				writer.append(String.format(TEMPLATE_STRING_VALUE, DataConvert.toString(field.getValue())));
			} else {
				writer.append(String.format(TEMPLATE_STRING_VALUE,
						DataConvert.toString(field.getValue()).replace("\\", "\\\\").replace("\"", "\\\"")
								.replace("\b", "\\b").replace("\f", "\\f").replace("\n", "\\n").replace("\r", "\\r")
								.replace("\t", "\\t")));
			}
		}
		writer.append("}");
	}
}
