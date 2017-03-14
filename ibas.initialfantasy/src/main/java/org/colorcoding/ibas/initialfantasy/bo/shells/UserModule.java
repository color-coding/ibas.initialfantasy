package org.colorcoding.ibas.initialfantasy.bo.shells;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.initialfantasy.bo.applications.IApplicationModule;

/**
 * 用户应用模块
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "UserModule")
@XmlRootElement(name = "UserModule")
public class UserModule {
	public static UserModule create(IApplicationModule applicationModule) {
		UserModule userApplicationModule = new UserModule();
		userApplicationModule.setModuleId(applicationModule.getModuleId());
		userApplicationModule.setPlatformId(applicationModule.getPlatformId());
		userApplicationModule.setModuleName(applicationModule.getModuleName());

		userApplicationModule.setDataService("");
		userApplicationModule.setViewService("");
		return userApplicationModule;
	}

	private String moduleId;

	@XmlElement(name = "ModuleId")
	public String getModuleId() {
		return this.moduleId;
	}

	public void setModuleId(String value) {
		this.moduleId = value;
	}

	private String platformId;

	@XmlElement(name = "PlatformId")
	public String getPlatformId() {
		return this.platformId;
	}

	public void setPlatformId(String value) {
		this.platformId = value;
	}

	private String moduleName;

	@XmlElement(name = "ModuleName")
	public String getModuleName() {
		return this.moduleName;
	}

	public void setModuleName(String value) {
		this.moduleName = value;
	}

	private String dataService;

	@XmlElement(name = "DataService")
	public String getDataService() {
		return this.dataService;
	}

	public void setDataService(String value) {
		this.dataService = value;
	}

	private String viewService;

	@XmlElement(name = "ViewService")
	public String getViewService() {
		return this.viewService;
	}

	public void setViewService(String value) {
		this.viewService = value;
	}

}
