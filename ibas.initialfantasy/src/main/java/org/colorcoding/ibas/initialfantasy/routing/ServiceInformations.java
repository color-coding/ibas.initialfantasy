package org.colorcoding.ibas.initialfantasy.routing;

import java.util.ArrayList;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 服务信息集合
 * 
 * @author Niuren.Zhu
 *
 */
@XmlType(name = "ServiceInformations", namespace = MyConfiguration.NAMESPACE_SERVICE)
@XmlRootElement(name = "ServiceInformations", namespace = MyConfiguration.NAMESPACE_SERVICE)
@XmlSeeAlso({ ServiceInformation.class, ServiceProvider.class })
public class ServiceInformations extends ArrayList<ServiceInformation> {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6631049940850852067L;

}
