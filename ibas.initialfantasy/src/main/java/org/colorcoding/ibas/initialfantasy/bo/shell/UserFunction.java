package org.colorcoding.ibas.initialfantasy.bo.shell;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.serialization.Serializable;
import org.colorcoding.ibas.initialfantasy.bo.refunction.IRefunction;
import org.colorcoding.ibas.initialfantasy.bo.refunction.IRefunctionItem;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "UserFunction")
@XmlRootElement(name = "UserFunction")
public class UserFunction extends Serializable {

	private static final long serialVersionUID = -6558972663233179067L;

	public static UserFunction[] create(IRefunction refunction) {
		UserFunction[] functions = new UserFunction[refunction.getRefunctionItems().size()];
		for (int i = 0; i < functions.length; i++) {
			functions[i] = create(refunction.getRefunctionItems().get(i));
		}
		return functions;
	}

	public static UserFunction create(IRefunctionItem refunction) {
		UserFunction function = new UserFunction();
		function.setId(refunction.getFunction());
		function.setDescription(refunction.getDescription());
		function.setIcon(refunction.getImage());
		if (refunction.getRefunctionItems().size() > 0) {
			function.setItems(new UserFunction[refunction.getRefunctionItems().size()]);
			for (int i = 0; i < function.getItems().length; i++) {
				function.getItems()[i] = create(refunction.getRefunctionItems().get(i));
			}
		}
		return function;
	}

	private String id;

	@XmlElement(name = "Id")
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@XmlElement(name = "Description")
	private String description;

	public final String getDescription() {
		return description;
	}

	public final void setDescription(String description) {
		this.description = description;
	}

	@XmlElement(name = "Icon")
	private String icon;

	public final String getIcon() {
		return icon;
	}

	public final void setIcon(String icon) {
		this.icon = icon;
	}

	private UserFunction[] items;

	@XmlElementWrapper(name = "Items")
	@XmlElement(name = "Item", type = UserFunction.class)
	public UserFunction[] getItems() {
		return items;
	}

	public void setItems(UserFunction[] items) {
		this.items = items;
	}

	@Override
	public String toString() {
		return String.format("{fucntion : %s|%s}", this.getId(), this.getDescription());
	}
}
