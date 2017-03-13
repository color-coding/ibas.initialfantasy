package org.colorcoding.ibas.bobas.approval.fantasy;

import org.colorcoding.ibas.bobas.approval.ApprovalDataProxy;
import org.colorcoding.ibas.bobas.approval.ApprovalProcessException;
import org.colorcoding.ibas.bobas.approval.IApprovalData;
import org.colorcoding.ibas.bobas.approval.IApprovalProcessStep;
import org.colorcoding.ibas.bobas.approval.UnauthorizedException;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.core.BOFactory;
import org.colorcoding.ibas.bobas.core.IBORepository;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.emApprovalStatus;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.organization.IUser;
import org.colorcoding.ibas.initialfantasy.bo.approvalrequest.ApprovalRequest;
import org.colorcoding.ibas.initialfantasy.bo.approvalrequest.ApprovalRequestStep;
import org.colorcoding.ibas.initialfantasy.bo.approvalrequest.IApprovalRequest;
import org.colorcoding.ibas.initialfantasy.bo.approvalrequest.IApprovalRequestStep;
import org.colorcoding.ibas.initialfantasy.bo.approvaltemplate.IApprovalTemplate;
import org.colorcoding.ibas.initialfantasy.bo.approvaltemplate.IApprovalTemplateStep;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;

/**
 * 审批流程
 * 
 * @author Niuren.Zhu
 *
 */
public class ApprovalProcess extends org.colorcoding.ibas.bobas.approval.ApprovalProcess {

	public static ApprovalProcess create(IApprovalTemplate template) {
		ApprovalRequest aq = new ApprovalRequest();
		aq.setApprovalTemplate(template.getObjectKey());
		aq.setApprovalObjectCode(template.getApprovalObjectCode());
		aq.setName(template.getName());
		for (IApprovalTemplateStep item : template.getApprovalTemplateSteps()) {
			ApprovalRequestStep aqStep = new ApprovalRequestStep();
			aqStep.setStepOrder(item.getStepOrder());
			aqStep.setStepCanModify(item.getStepCanModify());
			aqStep.setStepName(item.getStepName());
			aqStep.setStepOwner(item.getStepOwner());
			aqStep.setStepConditions(ApprovalProcessStepCondition.toString(item.getApprovalTemplateStepConditions()));

			aq.getApprovalRequestSteps().add(aqStep);
		}
		return create(aq);
	}

	public static ApprovalProcess create(IApprovalRequest aq) {
		if (aq == null) {
			return null;
		}
		ApprovalProcess approvalProcess = new ApprovalProcess();
		approvalProcess.setApprovalRequest(aq);
		return approvalProcess;
	}

	private IApprovalRequest approvalRequest;

	public IApprovalRequest getApprovalRequest() {
		return approvalRequest;
	}

	public void setApprovalRequest(IApprovalRequest approvalRequest) {
		this.approvalRequest = approvalRequest;
		// 设置代理数据
		ApprovalDataProxy data = new ApprovalDataProxy();
		data.setApprovalStatus(approvalRequest.getApprovalStatus());
		data.setDataOwner(approvalRequest.getApprovalOwner());
		data.setIdentifiers(approvalRequest.getBOKeys());
		data.setObjectCode(approvalRequest.getApprovalObjectCode());
		data.markOld();// 标记状态
		this.approvalData = data;
	}

	private IApprovalData approvalData;

	/**
	 * 审批数据
	 */
	@Override
	public IApprovalData getApprovalData() {
		return this.approvalData;
	}

	@Override
	public void setApprovalData(IApprovalData approvalData) {
		this.approvalData = approvalData;
		if (this.getApprovalData() != null && approvalData != null) {
			// 保存检索值
			this.getApprovalRequest().setBOKeys(approvalData.getIdentifiers());
			// 保存对象语言类型
			this.getApprovalRequest().setClassName(approvalData.getClass().getName());
			// 保存审批所有者
			this.getApprovalRequest().setApprovalOwner(approvalData.getDataOwner());
		}
	}

	@Override
	public boolean isNew() {
		if (this.getApprovalRequest() != null) {
			return this.getApprovalRequest().isNew();
		}
		return false;
	}

	@Override
	public String getName() {
		return this.getApprovalRequest().getName();
	}

	@Override
	public emApprovalStatus getStatus() {
		return this.getApprovalRequest().getApprovalStatus();
	}

	@Override
	protected void setStatus(emApprovalStatus value) {
		this.getApprovalRequest().setApprovalStatus(value);
	}

	@Override
	public DateTime getStartedTime() {
		return this.getApprovalRequest().getStartedTime();
	}

	@Override
	protected void setStartedTime(DateTime value) {
		this.getApprovalRequest().setStartedTime(value);
	}

	@Override
	public DateTime getFinishedTime() {
		return this.getApprovalRequest().getFinishedTime();
	}

	@Override
	protected void setFinishedTime(DateTime value) {
		this.getApprovalRequest().setFinishedTime(value);
	}

	private IApprovalProcessStep[] processSteps;

	@Override
	public IApprovalProcessStep[] getProcessSteps() {
		if (this.processSteps == null && this.getApprovalRequest() != null) {
			IApprovalProcessStep[] steps = new IApprovalProcessStep[this.getApprovalRequest().getApprovalRequestSteps()
					.size()];
			for (int i = 0; i < steps.length; i++) {
				IApprovalRequestStep item = this.getApprovalRequest().getApprovalRequestSteps().get(i);
				steps[i] = new ApprovalProcessStep(item);
			}
			this.processSteps = steps;
		}
		return this.processSteps;
	}

	@Override
	public void saveProcess(IBORepository boRepository) throws ApprovalProcessException {
		try {
			BORepositoryInitialFantasy apRepository = new BORepositoryInitialFantasy();
			apRepository.setRefetchAfterSave(false);// 保存成功后，不重新获取副本
			apRepository.setRepository(boRepository);
			apRepository.setUserToken(org.colorcoding.ibas.bobas.organization.fantasy.User.SYSTEM_USER.getToken());
			IOperationResult<IApprovalRequest> operationResult = apRepository
					.saveApprovalRequest(this.getApprovalRequest());
			if (operationResult.getError() != null) {
				throw operationResult.getError();
			}
			if (operationResult.getResultCode() != 0) {
				throw new ApprovalProcessException(operationResult.getMessage());
			}

		} catch (Exception e) {
			throw new ApprovalProcessException(e);
		}
	}

	@Override
	public void checkToSave(IUser user) throws UnauthorizedException {
		if (Integer.compare(this.getApprovalData().getDataOwner(), user.getId()) != 0) {
			// 修改用户不是数据所有者时
			IApprovalProcessStep tmpStep = this.currentStep();
			if (tmpStep instanceof ApprovalProcessStep) {
				ApprovalProcessStep curStep = (ApprovalProcessStep) tmpStep;
				if (curStep != null && curStep.getOwner() != null) {
					if (curStep.getApprovalRequestStep().getStepCanModify() == emYesNo.YES
							&& curStep.getOwner().equals(user)) {
						// 审批步骤允许此用户编辑
						return;
					}
				}
			}
		}
		super.checkToSave(user);
	}

	public void loadClasses() throws ClassNotFoundException {
		if (this.getApprovalRequest() != null && this.getApprovalRequest().getClassName() != null) {
			BOFactory.create().getClass(this.getApprovalRequest().getClassName());
		}
	}

}
