package org.colorcoding.ibas.initialfantasy.bo.approvalrequest;

import javax.xml.bind.annotation.*;
import org.colorcoding.ibas.bobas.bo.*;
import org.colorcoding.ibas.initialfantasy.MyConsts;

/**
* 审批请求步骤 集合
*/
@XmlType(name = ApprovalRequestSteps.BUSINESS_OBJECT_NAME, namespace = MyConsts.NAMESPACE_BO)
@XmlSeeAlso({ ApprovalRequestStep.class })
public class ApprovalRequestSteps extends BusinessObjects<IApprovalRequestStep, IApprovalRequest> implements IApprovalRequestSteps {

    /**
    * 业务对象名称
    */
    public static final String BUSINESS_OBJECT_NAME = "ApprovalRequestSteps";

    /**
     * 序列化版本标记
     */
    private static final long serialVersionUID = 3813998762277190536L;

    /**
     * 构造方法
     */
    public ApprovalRequestSteps() {
        super();
    }

    /**
     * 构造方法
     * @param parent 父项对象
     */
    public ApprovalRequestSteps(IApprovalRequest parent) {
        super(parent);
    }

    /**
     * 元素类型
     */
    public Class<?> getElementType() {
        return ApprovalRequestStep.class;
    }

    /**
    * 创建审批请求步骤
    * 
    * @return 审批请求步骤
    */
    public IApprovalRequestStep create() {
        IApprovalRequestStep item = new ApprovalRequestStep();
        if (this.add(item)) {
            return item;
        }
        return null;
    }

}
