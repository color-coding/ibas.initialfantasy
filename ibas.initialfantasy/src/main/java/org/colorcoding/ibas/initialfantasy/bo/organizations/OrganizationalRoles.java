package org.colorcoding.ibas.initialfantasy.bo.organizations;

import javax.xml.bind.annotation.*;
import org.colorcoding.ibas.bobas.bo.*;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
* 组织-角色 集合
*/
@XmlType(name = OrganizationalRoles.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ OrganizationalRole.class })
public class OrganizationalRoles extends BusinessObjects<IOrganizationalRole, IOrganizationalStructure> implements IOrganizationalRoles {

    /**
    * 业务对象名称
    */
    public static final String BUSINESS_OBJECT_NAME = "OrganizationalRoles";

    /**
     * 序列化版本标记
     */
    private static final long serialVersionUID = 2203570072849716942L;

    /**
     * 构造方法
     */
    public OrganizationalRoles() {
        super();
    }

    /**
     * 构造方法
     * @param parent 父项对象
     */
    public OrganizationalRoles(IOrganizationalStructure parent) {
        super(parent);
    }

    /**
     * 元素类型
     */
    public Class<?> getElementType() {
        return OrganizationalRole.class;
    }

    /**
    * 创建组织-角色
    * 
    * @return 组织-角色
    */
    public IOrganizationalRole create() {
        IOrganizationalRole item = new OrganizationalRole();
        if (this.add(item)) {
            return item;
        }
        return null;
    }

}
