package org.colorcoding.ibas.bobas.ownership.test.fantasy;

import javax.xml.bind.annotation.XmlElement;

import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.ownership.IDataOwnership;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.BOCriteria;

public class TestData extends BOCriteria implements IDataOwnership {

	private static final long serialVersionUID = 7721933583217654377L;
	private final static Class<?> MY_CLASS = TestData.class;
	private static final String PROPERTY_DATAOWNER_NAME = "DataOwner";

	public static final IPropertyInfo<Integer> PROPERTY_DATAOWNER = registerProperty(PROPERTY_DATAOWNER_NAME,
			Integer.class, MY_CLASS);

	@Override
	@XmlElement(name = PROPERTY_DATAOWNER_NAME)
	public Integer getDataOwner() {
		return this.getProperty(PROPERTY_CREATEUSERSIGN);
	}

	@Override
	public void setDataOwner(Integer value) {
		this.setProperty(PROPERTY_CREATEUSERSIGN, value);
	}

}
