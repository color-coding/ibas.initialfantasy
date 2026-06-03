package org.colorcoding.ibas.initialfantasy.repository;

import java.util.Map;
import java.util.Map.Entry;

import org.colorcoding.ibas.bobas.common.DateTimes;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.task.Daemon;
import org.colorcoding.ibas.bobas.task.IDaemonTask;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 用户登录失败记录与限制管理器
 * <p>
 * 负责记录用户登录失败次数、判断是否锁定、清除记录，以及定时清理过期数据。
 * 独立于业务仓库，方便单独维护和扩展。
 * </p>
 *
 * @author Niuren.Zhu
 */
public class UserLoginFailTracker {

	/**
	 * 单例实例
	 */
	private static volatile UserLoginFailTracker instance;

	/**
	 * 获取单例实例
	 */
	public static UserLoginFailTracker getInstance() {
		if (instance == null) {
			synchronized (UserLoginFailTracker.class) {
				if (instance == null) {
					instance = new UserLoginFailTracker();
				}
			}
		}
		return instance;
	}

	/**
	 * 私有构造，注册定时清理任务
	 */
	private UserLoginFailTracker() {
		try {
			Daemon.register(new IDaemonTask() {

				@Override
				public void run() {
					long spanTime = getLoginFailSpanTime();
					long now = DateTimes.now().getTime();
					ArrayList<String> keysToRemove = new ArrayList<>();
					for (Entry<String, long[]> item : userLoginLog.entrySet()) {
						long[] logs = item.getValue();
						if (logs == null) {
							keysToRemove.add(item.getKey());
							continue;
						}
						boolean allExpired = true;
						for (int i = 0; i < logs.length; i++) {
							if (logs[i] != 0 && (now - logs[i]) <= spanTime) {
								allExpired = false;
							} else {
								logs[i] = 0;
							}
						}
						if (allExpired) {
							keysToRemove.add(item.getKey());
						}
					}
					// 安全地删除过期条目
					for (String key : keysToRemove) {
						userLoginLog.remove(key);
					}
				}

				@Override
				public boolean isActivated() {
					return true;
				}

				@Override
				public String getName() {
					return "user login log cleaner";
				}

				@Override
				public long getInterval() {
					return 60;
				}
			});
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * 用户登录失败记录
	 * key: 用户编码（小写），统一用 boUser.getCode() 标识
	 * value: long[]，记录每次失败的时间戳，0表示空位
	 */
	private final Map<String, long[]> userLoginLog = new CaseInsensitiveConcurrentMap<>();

	/**
	 * 大小写不敏感的并发Map
	 */
	private static class CaseInsensitiveConcurrentMap<K, V>
			extends java.util.concurrent.ConcurrentHashMap<K, V> {

		private static final long serialVersionUID = 1L;

		/**
		 * 规范化key，字符串统一转小写
		 */
		@SuppressWarnings("unchecked")
		private K normalizeKey(Object key) {
			if (key instanceof String) {
				return (K) ((String) key).toLowerCase();
			}
			return (K) key;
		}

		@Override
		public boolean containsKey(Object key) {
			return super.containsKey(normalizeKey(key));
		}

		@Override
		public V get(Object key) {
			return super.get(normalizeKey(key));
		}

		@Override
		public V put(K key, V value) {
			return super.put(normalizeKey(key), value);
		}

		@Override
		public V remove(Object key) {
			return super.remove(normalizeKey(key));
		}

		@Override
		public V putIfAbsent(K key, V value) {
			return super.putIfAbsent(normalizeKey(key), value);
		}

		@Override
		public boolean remove(Object key, Object value) {
			return super.remove(normalizeKey(key), value);
		}

		@Override
		public V replace(K key, V value) {
			return super.replace(normalizeKey(key), value);
		}

		@Override
		public boolean replace(K key, V oldValue, V newValue) {
			return super.replace(normalizeKey(key), oldValue, newValue);
		}

		@Override
		public V computeIfAbsent(K key, java.util.function.Function<? super K, ? extends V> mappingFunction) {
			return super.computeIfAbsent(normalizeKey(key), mappingFunction);
		}

		@Override
		public V computeIfPresent(K key,
				java.util.function.BiFunction<? super K, ? super V, ? extends V> remappingFunction) {
			return super.computeIfPresent(normalizeKey(key), remappingFunction);
		}

		@Override
		public V compute(K key,
				java.util.function.BiFunction<? super K, ? super V, ? extends V> remappingFunction) {
			return super.compute(normalizeKey(key), remappingFunction);
		}

		@Override
		public V merge(K key, V value,
				java.util.function.BiFunction<? super V, ? super V, ? extends V> remappingFunction) {
			return super.merge(normalizeKey(key), value, remappingFunction);
		}
	}

	/**
	 * 获取登录最大失败次数（可配置）
	 */
	private static int getLoginMaxFailCount() {
		return MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_LOGIN_MAX_FAIL_COUNT, 5);
	}

	/**
	 * 获取登录失败记录时间窗口，单位毫秒（可配置）
	 */
	private static long getLoginFailSpanTime() {
		int spanSeconds = MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_LOGIN_FAIL_SPAN_TIME, 3600);
		return spanSeconds * 1000L;
	}

	/**
	 * 检查指定用户是否已被锁定（失败次数达到上限）
	 *
	 * @param userCode 用户编码
	 * @return true 表示已被锁定
	 */
	public boolean isUserLocked(String userCode) {
		if (Strings.isNullOrEmpty(userCode)) {
			return false;
		}
		long[] userLogs = userLoginLog.get(userCode);
		if (userLogs == null) {
			return false;
		}
		int maxFailCount = getLoginMaxFailCount();
		long now = DateTimes.now().getTime();
		long spanTime = getLoginFailSpanTime();
		int failCount = 0;
		for (long timestamp : userLogs) {
			if (timestamp != 0 && (now - timestamp) <= spanTime) {
				failCount++;
			}
		}
		return failCount >= maxFailCount;
	}

	/**
	 * 记录用户登录失败
	 *
	 * @param userCode 用户编码
	 */
	public void recordLoginFail(String userCode) {
		if (Strings.isNullOrEmpty(userCode)) {
			return;
		}
		int maxFailCount = getLoginMaxFailCount();
		long[] userLogs = userLoginLog.get(userCode);
		if (userLogs == null || userLogs.length != maxFailCount) {
			// 首次记录或配置变更，创建新数组
			long[] newLogs = new long[maxFailCount];
			// 迁移旧的未过期记录
			if (userLogs != null) {
				long now = DateTimes.now().getTime();
				long spanTime = getLoginFailSpanTime();
				int idx = 0;
				for (long ts : userLogs) {
					if (ts != 0 && (now - ts) <= spanTime && idx < newLogs.length) {
						newLogs[idx++] = ts;
					}
				}
			}
			userLoginLog.put(userCode, newLogs);
			userLogs = newLogs;
		}
		// 记录本次失败时间，优先覆盖过期记录
		long now = DateTimes.now().getTime();
		long spanTime = getLoginFailSpanTime();
		boolean recorded = false;
		// 先找空位
		for (int i = 0; i < userLogs.length; i++) {
			if (userLogs[i] == 0) {
				userLogs[i] = now;
				recorded = true;
				break;
			}
		}
		// 没有空位，找过期的覆盖
		if (!recorded) {
			for (int i = 0; i < userLogs.length; i++) {
				if ((now - userLogs[i]) > spanTime) {
					userLogs[i] = now;
					recorded = true;
					break;
				}
			}
		}
		// 如果都未过期且已满，覆盖最旧的记录
		if (!recorded && userLogs.length > 0) {
			int oldestIndex = 0;
			for (int i = 1; i < userLogs.length; i++) {
				if (userLogs[i] < userLogs[oldestIndex]) {
					oldestIndex = i;
				}
			}
			userLogs[oldestIndex] = now;
		}
	}

	/**
	 * 清除用户登录失败记录（登录成功或管理员解锁时调用）
	 *
	 * @param userCode 用户编码
	 */
	public void clearLoginFailLog(String userCode) {
		if (Strings.isNullOrEmpty(userCode)) {
			return;
		}
		userLoginLog.remove(userCode);
	}

	/**
	 * 检查指定用户是否存在登录失败记录
	 *
	 * @param userCode 用户编码
	 * @return true 表示存在失败记录
	 */
	public boolean hasLoginFailLog(String userCode) {
		if (Strings.isNullOrEmpty(userCode)) {
			return false;
		}
		return userLoginLog.containsKey(userCode);
	}

	/**
	 * 获取指定用户的锁定状态
	 *
	 * @param userCode 用户编码
	 * @return 锁定状态
	 */
	public emYesNo getLockedStatus(String userCode) {
		return isUserLocked(userCode) ? emYesNo.YES : emYesNo.NO;
	}
}