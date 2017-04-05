package org.colorcoding.ibas.initialfantasy.bo.shells;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.initialfantasy.bo.bocriteria.BOCriteria;

/**
 * 用户查询
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "UserQuery")
@XmlRootElement(name = "UserQuery")
public class UserQuery {

	public static UserQuery create(BOCriteria boItem) {
		UserQuery query = new UserQuery();
		query.setId(boItem.getApplicationId());
		query.setName(boItem.getName());
		query.setOrder(boItem.getOrder());
		query.setCriteria(boItem.getCriteriaData());
		return query;
	}

	/** 标记 */
	private String id;

	@XmlElement(name = "Id")
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	/** 名称 */
	private String name;

	@XmlElement(name = "Name")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	/** 查询 */
	private String criteria;

	@XmlElement(name = "Criteria")
	public String getCriteria() {
		return criteria;
	}

	public void setCriteria(String criteria) {
		this.criteria = criteria;
	}

	public void setCriteria(ICriteria criteria) {
		if (criteria == null) {
			return;
		}
		this.setCriteria(criteria.toString("json"));
	}

	/** 顺序 */
	private int order;

	@XmlElement(name = "Order")
	public int getOrder() {
		return order;
	}

	public void setOrder(int order) {
		this.order = order;
	}

	@Override
	public String toString() {
		return String.format("{query: %s|%s}", this.getId(), this.getName());
	}
}
