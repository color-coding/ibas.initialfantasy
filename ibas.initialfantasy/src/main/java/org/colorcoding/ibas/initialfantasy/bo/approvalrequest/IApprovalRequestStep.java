package org.colorcoding.ibas.initialfantasy.bo.approvalrequest;

import org.colorcoding.ibas.bobas.bo.*;
import org.colorcoding.ibas.bobas.data.*;

/**
* 审批请求步骤 接口
* 
*/
public interface IApprovalRequestStep extends IBOSimpleLine {

    /**
    * 获取-编号
    * 
    * @return 值
    */
    Integer getObjectKey();

    /**
    * 设置-编号
    * 
    * @param value 值
    */
    void setObjectKey(Integer value);


    /**
    * 获取-类型
    * 
    * @return 值
    */
    String getObjectCode();

    /**
    * 设置-类型
    * 
    * @param value 值
    */
    void setObjectCode(String value);


    /**
    * 获取-行号
    * 
    * @return 值
    */
    Integer getLineId();

    /**
    * 设置-行号
    * 
    * @param value 值
    */
    void setLineId(Integer value);


    /**
    * 获取-实例号（版本）
    * 
    * @return 值
    */
    Integer getLogInst();

    /**
    * 设置-实例号（版本）
    * 
    * @param value 值
    */
    void setLogInst(Integer value);


    /**
    * 获取-数据源
    * 
    * @return 值
    */
    String getDataSource();

    /**
    * 设置-数据源
    * 
    * @param value 值
    */
    void setDataSource(String value);


    /**
    * 获取-创建日期
    * 
    * @return 值
    */
    DateTime getCreateDate();

    /**
    * 设置-创建日期
    * 
    * @param value 值
    */
    void setCreateDate(DateTime value);


    /**
    * 获取-创建时间
    * 
    * @return 值
    */
    Short getCreateTime();

    /**
    * 设置-创建时间
    * 
    * @param value 值
    */
    void setCreateTime(Short value);


    /**
    * 获取-修改日期
    * 
    * @return 值
    */
    DateTime getUpdateDate();

    /**
    * 设置-修改日期
    * 
    * @param value 值
    */
    void setUpdateDate(DateTime value);


    /**
    * 获取-修改时间
    * 
    * @return 值
    */
    Short getUpdateTime();

    /**
    * 设置-修改时间
    * 
    * @param value 值
    */
    void setUpdateTime(Short value);


    /**
    * 获取-创建用户
    * 
    * @return 值
    */
    Integer getCreateUserSign();

    /**
    * 设置-创建用户
    * 
    * @param value 值
    */
    void setCreateUserSign(Integer value);


    /**
    * 获取-修改用户
    * 
    * @return 值
    */
    Integer getUpdateUserSign();

    /**
    * 设置-修改用户
    * 
    * @param value 值
    */
    void setUpdateUserSign(Integer value);


    /**
    * 获取-创建动作标识
    * 
    * @return 值
    */
    String getCreateActionId();

    /**
    * 设置-创建动作标识
    * 
    * @param value 值
    */
    void setCreateActionId(String value);


    /**
    * 获取-更新动作标识
    * 
    * @return 值
    */
    String getUpdateActionId();

    /**
    * 设置-更新动作标识
    * 
    * @param value 值
    */
    void setUpdateActionId(String value);


    /**
    * 获取-参考1
    * 
    * @return 值
    */
    String getReference1();

    /**
    * 设置-参考1
    * 
    * @param value 值
    */
    void setReference1(String value);


    /**
    * 获取-参考2
    * 
    * @return 值
    */
    String getReference2();

    /**
    * 设置-参考2
    * 
    * @param value 值
    */
    void setReference2(String value);


    /**
    * 获取-步骤名称
    * 
    * @return 值
    */
    String getStepName();

    /**
    * 设置-步骤名称
    * 
    * @param value 值
    */
    void setStepName(String value);


    /**
    * 获取-步骤所有者
    * 
    * @return 值
    */
    Integer getStepOwner();

    /**
    * 设置-步骤所有者
    * 
    * @param value 值
    */
    void setStepOwner(Integer value);


    /**
    * 获取-步骤执行顺序
    * 
    * @return 值
    */
    Integer getStepOrder();

    /**
    * 设置-步骤执行顺序
    * 
    * @param value 值
    */
    void setStepOrder(Integer value);


    /**
    * 获取-步骤状态
    * 
    * @return 值
    */
    emApprovalStepStatus getStepStatus();

    /**
    * 设置-步骤状态
    * 
    * @param value 值
    */
    void setStepStatus(emApprovalStepStatus value);


    /**
    * 获取-步骤条件
    * 
    * @return 值
    */
    String getStepConditions();

    /**
    * 设置-步骤条件
    * 
    * @param value 值
    */
    void setStepConditions(String value);


    /**
    * 获取-开始时间
    * 
    * @return 值
    */
    DateTime getStartedTime();

    /**
    * 设置-开始时间
    * 
    * @param value 值
    */
    void setStartedTime(DateTime value);


    /**
    * 获取-结束时间
    * 
    * @return 值
    */
    DateTime getFinishedTime();

    /**
    * 设置-结束时间
    * 
    * @param value 值
    */
    void setFinishedTime(DateTime value);


    /**
    * 获取-审批意见
    * 
    * @return 值
    */
    String getJudgment();

    /**
    * 设置-审批意见
    * 
    * @param value 值
    */
    void setJudgment(String value);


    /**
    * 获取-步骤所有者可修改
    * 
    * @return 值
    */
    emYesNo getStepCanModify();

    /**
    * 设置-步骤所有者可修改
    * 
    * @param value 值
    */
    void setStepCanModify(emYesNo value);



}
