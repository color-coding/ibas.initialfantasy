package org.colorcoding.ibas.initialfantasy.test.bo;

import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.initialfantasy.bo.applications.ApplicationModule;

import junit.framework.TestCase;

public class testApplicationModule extends TestCase {

	public void testBasic() {
		ApplicationModule module = new ApplicationModule();
		module.setModuleId("");
		module.setModuleName("");
		module.setActivated(emYesNo.YES);
		System.out.println(module.toString("xml"));
	}
}
