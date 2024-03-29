package org.colorcoding.ibas.initialfantasy.bo.bonumbering;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.bo.IBOMaxValueKey;
import org.colorcoding.ibas.bobas.common.Condition;
import org.colorcoding.ibas.bobas.common.ConditionOperation;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.core.fields.IFieldDataDb;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.bobas.rule.IBusinessRule;
import org.colorcoding.ibas.bobas.rule.common.BusinessRuleRequired;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 业务对象序列编号方式
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement(name = BOSeriesNumbering.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlType(name = BOSeriesNumbering.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
public class BOSeriesNumbering extends BusinessObject<BOSeriesNumbering> implements IBOSeriesNumbering, IBOMaxValueKey {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 5188494791457733516L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = BOSeriesNumbering.class;

	/**
	 * 数据库表
	 */
	public static final String DB_TABLE_NAME = "${Company}_SYS_NNM1";

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "BOSeriesNumbering";

	/**
	 * 属性名称-对象编码
	 */
	private static final String PROPERTY_OBJECTCODE_NAME = "ObjectCode";

	/**
	 * 对象编码 属性
	 */
	@DbField(name = "ObjectCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = true, uniqueKey = true)
	public static final IPropertyInfo<String> PROPERTY_OBJECTCODE = registerProperty(PROPERTY_OBJECTCODE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-对象编码
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_OBJECTCODE_NAME)
	public final String getObjectCode() {
		return this.getProperty(PROPERTY_OBJECTCODE);
	}

	/**
	 * 设置-对象编码
	 * 
	 * @param value 值
	 */
	public final void setObjectCode(String value) {
		this.setProperty(PROPERTY_OBJECTCODE, value);
	}

	/**
	 * 属性名称-序列
	 */
	private static final String PROPERTY_SERIES_NAME = "Series";

	/**
	 * 序列 属性
	 */
	@DbField(name = "Series", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<Integer> PROPERTY_SERIES = registerProperty(PROPERTY_SERIES_NAME, Integer.class,
			MY_CLASS);

	/**
	 * 获取-序列
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SERIES_NAME)
	public final Integer getSeries() {
		return this.getProperty(PROPERTY_SERIES);
	}

	/**
	 * 设置-序列
	 * 
	 * @param value 值
	 */
	public final void setSeries(Integer value) {
		this.setProperty(PROPERTY_SERIES, value);
	}

	/**
	 * 属性名称-序列名称
	 */
	private static final String PROPERTY_SERIESNAME_NAME = "SeriesName";

	/**
	 * 序列名称 属性
	 */
	@DbField(name = "SeriesName", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false, uniqueKey = true)
	public static final IPropertyInfo<String> PROPERTY_SERIESNAME = registerProperty(PROPERTY_SERIESNAME_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-序列名称
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_SERIESNAME_NAME)
	public final String getSeriesName() {
		return this.getProperty(PROPERTY_SERIESNAME);
	}

	/**
	 * 设置-序列名称
	 * 
	 * @param value 值
	 */
	public final void setSeriesName(String value) {
		this.setProperty(PROPERTY_SERIESNAME, value);
	}

	/**
	 * 属性名称-下一个序号
	 */
	private static final String PROPERTY_NEXTNUMBER_NAME = "NextNumber";

	/**
	 * 下一个序号 属性
	 */
	@DbField(name = "NextNum", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_NEXTNUMBER = registerProperty(PROPERTY_NEXTNUMBER_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-下一个序号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_NEXTNUMBER_NAME)
	public final Integer getNextNumber() {
		return this.getProperty(PROPERTY_NEXTNUMBER);
	}

	/**
	 * 设置-下一个序号
	 * 
	 * @param value 值
	 */
	public final void setNextNumber(Integer value) {
		this.setProperty(PROPERTY_NEXTNUMBER, value);
	}

	/**
	 * 属性名称-已锁定
	 */
	private static final String PROPERTY_LOCKED_NAME = "Locked";

	/**
	 * 已锁定 属性
	 */
	@DbField(name = "Locked", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emYesNo> PROPERTY_LOCKED = registerProperty(PROPERTY_LOCKED_NAME, emYesNo.class,
			MY_CLASS);

	/**
	 * 获取-已锁定
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_LOCKED_NAME)
	public final emYesNo getLocked() {
		return this.getProperty(PROPERTY_LOCKED);
	}

	/**
	 * 设置-已锁定
	 * 
	 * @param value 值
	 */
	public final void setLocked(emYesNo value) {
		this.setProperty(PROPERTY_LOCKED, value);
	}

	/**
	 * 属性名称-模板
	 */
	private static final String PROPERTY_TEMPLATE_NAME = "Template";

	/**
	 * 模板 属性
	 */
	@DbField(name = "Template", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_TEMPLATE = registerProperty(PROPERTY_TEMPLATE_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-模板
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_TEMPLATE_NAME)
	public final String getTemplate() {
		return this.getProperty(PROPERTY_TEMPLATE);
	}

	/**
	 * 设置-模板
	 * 
	 * @param value 值
	 */
	public final void setTemplate(String value) {
		this.setProperty(PROPERTY_TEMPLATE, value);
	}

	/**
	 * 初始化数据
	 */
	@Override
	protected void initialize() {
		super.initialize();
		this.setNextNumber(1);
	}

	@Override
	protected IBusinessRule[] registerRules() {
		return new IBusinessRule[] { // 注册的业务规则
				new BusinessRuleRequired(PROPERTY_OBJECTCODE), // 要求有值
				new BusinessRuleRequired(PROPERTY_SERIESNAME), // 要求有值
				new BusinessRuleRequired(PROPERTY_TEMPLATE), // 要求有值
		};
	}

	@Override
	public IFieldDataDb getMaxValueField() {
		return (IFieldDataDb) this.getField(PROPERTY_SERIES_NAME);
	}

	@Override
	public ICondition[] getMaxValueConditions() {
		return new ICondition[] {
				new Condition(PROPERTY_OBJECTCODE_NAME, ConditionOperation.EQUAL, this.getObjectCode()) };
	}

}
