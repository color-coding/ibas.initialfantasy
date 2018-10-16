package org.colorcoding.ibas.bobas.period.initial;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.ISort;
import org.colorcoding.ibas.bobas.common.SortType;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.data.List;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.bobas.period.IPeriodData;
import org.colorcoding.ibas.bobas.period.IPeriodsManager;
import org.colorcoding.ibas.bobas.period.PeriodException;
import org.colorcoding.ibas.initialfantasy.bo.postingperiod.IPostingPeriod;
import org.colorcoding.ibas.initialfantasy.bo.postingperiod.PostingPeriod;
import org.colorcoding.ibas.initialfantasy.data.emPeriodStatus;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;
import org.colorcoding.ibas.initialfantasy.repository.IBORepositoryInitialFantasyApp;

public class PeriodsManager implements IPeriodsManager {

	@Override
	public void initialize() {
		try {
			ICriteria criteria = new Criteria();
			ISort sort = criteria.getSorts().create();
			sort.setAlias(PostingPeriod.PROPERTY_OBJECTKEY.getName());
			sort.setSortType(SortType.DESCENDING);
			IBORepositoryInitialFantasyApp boRepository = new BORepositoryInitialFantasy();
			boRepository.setUserToken(OrganizationFactory.SYSTEM_USER.getToken());
			IOperationResult<IPostingPeriod> operationResult = boRepository.fetchPostingPeriod(criteria);
			for (IPostingPeriod item : operationResult.getResultObjects()) {
				this.getPeriods().add(new PeriodItem(item));
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	private List<PeriodItem> periods;

	protected final List<PeriodItem> getPeriods() {
		if (this.periods == null) {
			this.periods = new ArrayList<>();
		}
		return periods;
	}

	public PeriodItem getPeriod(DateTime date) {
		return this.getPeriods().firstOrDefault(c -> c.getDateFrom().before(date) && c.getDateTo().after(date));
	}

	public PeriodItem getPeriod(int key) {
		return this.getPeriods().firstOrDefault(c -> c.getKey() == key);
	}

	@Override
	public void applyPeriod(IPeriodData bo) throws PeriodException {
		if (bo.getPostingDate() == null || bo.getPostingDate().equals(DateTime.MIN_VALUE)) {
			bo.setPostingDate(DateTime.getToday());
		}
		PeriodItem periodItem = this.getPeriod(bo.getPostingDate());
		if (periodItem == null) {
			throw new PeriodException(I18N.prop("msg_if_not_found_date_posting_period"));
		}
		bo.setPeriod(periodItem.getKey());
	}

	@Override
	public void checkPeriod(IPeriodData bo) throws PeriodException {
		PeriodItem periodItem = this.getPeriod(bo.getPeriod());
		if (periodItem != null) {
			if (periodItem.getStatus() == emPeriodStatus.LOCKED) {
				throw new PeriodException(I18N.prop("msg_if_posting_period_locked", periodItem.getName()));
			}
			if (periodItem.getStatus() == emPeriodStatus.CLOSED) {
				throw new PeriodException(I18N.prop("msg_if_posting_period_closed", periodItem.getName()));
			}
		}
	}

}

class PeriodItem {
	public PeriodItem() {

	}

	public PeriodItem(IPostingPeriod period) {
		this();
		this.setKey(period.getObjectKey());
		this.setName(period.getName());
		this.setDateFrom(period.getPostingDateFrom());
		this.setDateTo(period.getPostingDateTo());
		this.setStatus(period.getStatus());
		if (this.getName() == null || this.getName().isEmpty()) {
			this.setName(String.valueOf(this.getKey()));
		}
	}

	private int key;

	private String name;

	public final int getKey() {
		return key;
	}

	public final void setKey(int key) {
		this.key = key;
	}

	public final String getName() {
		return name;
	}

	public final void setName(String name) {
		this.name = name;
	}

	private DateTime dateFrom;

	public final DateTime getDateFrom() {
		return dateFrom;
	}

	public final void setDateFrom(DateTime dateFrom) {
		this.dateFrom = dateFrom;
	}

	private DateTime dateTo;

	public final DateTime getDateTo() {
		return dateTo;
	}

	public final void setDateTo(DateTime dateTo) {
		this.dateTo = dateTo;
	}

	private emPeriodStatus status;

	public final emPeriodStatus getStatus() {
		return status;
	}

	public final void setStatus(emPeriodStatus status) {
		this.status = status;
	}

}