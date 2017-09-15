package org.colorcoding.ibas.initialfantasy.bo.bofiltering;

import javax.xml.bind.annotation.*;
import org.colorcoding.ibas.bobas.bo.*;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
* 业务对象筛选-条件 集合
*/
@XmlType(name = BOFilteringConditions.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ BOFilteringCondition.class })
public class BOFilteringConditions extends BusinessObjects<IBOFilteringCondition, IBOFiltering> implements IBOFilteringConditions {

    /**
    * 业务对象名称
    */
    public static final String BUSINESS_OBJECT_NAME = "BOFilteringConditions";

    /**
     * 序列化版本标记
     */
    private static final long serialVersionUID = -5127462247580095622L;

    /**
     * 构造方法
     */
    public BOFilteringConditions() {
        super();
    }

    /**
     * 构造方法
     * @param parent 父项对象
     */
    public BOFilteringConditions(IBOFiltering parent) {
        super(parent);
    }

    /**
     * 元素类型
     */
    public Class<?> getElementType() {
        return BOFilteringCondition.class;
    }

    /**
    * 创建业务对象筛选-条件
    * 
    * @return 业务对象筛选-条件
    */
    public IBOFilteringCondition create() {
        IBOFilteringCondition item = new BOFilteringCondition();
        if (this.add(item)) {
            return item;
        }
        return null;
    }

}
