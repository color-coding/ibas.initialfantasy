package org.colorcoding.ibas.initialfantasy.bo.organization;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

class PasswordStorage {

	@SuppressWarnings("serial")
	static public class InvalidHashException extends Exception {
		public InvalidHashException(String message) {
			super(message);
		}

		public InvalidHashException(String message, Throwable source) {
			super(message, source);
		}
	}

	@SuppressWarnings("serial")
	static public class CannotPerformOperationException extends Exception {
		public CannotPerformOperationException(String message) {
			super(message);
		}

		public CannotPerformOperationException(String message, Throwable source) {
			super(message, source);
		}
	}

	public static final String PBKDF2_ALGORITHM = "PBKDF2WithHmacSHA1";
	public static final String HASH_ALGORITHM = "sha1";

	// These constants may be changed without breaking existing hashes.
	public static final int SALT_BYTE_SIZE = 24;
	public static final int HASH_BYTE_SIZE = 18;
	public static final int PBKDF2_ITERATIONS = 64000;

	// These constants define the encoding and may not be changed.
	public static final int HASH_SECTIONS = 5;
	public static final int HASH_ALGORITHM_INDEX = 0;
	public static final int ITERATION_INDEX = 1;
	public static final int HASH_SIZE_INDEX = 2;
	public static final int SALT_INDEX = 3;
	public static final int PBKDF2_INDEX = 4;

	/**
	 * 旧式（MD5 + "="）哈希长度
	 */
	private static final int LEGACY_MD5_LENGTH = 33;

	/**
	 * 判断给定字符串是否已经是密码哈希值。
	 *
	 * 同时识别两种格式：
	 * <ul>
	 * <li>新格式：{@code algorithm:iterations:hashSize:saltBase64:pbkdf2Base64}</li>
	 * <li>旧格式：{@code 32位MD5(hex) + "="}</li>
	 * </ul>
	 * 仅基于内容判断，不再依赖 {@code isLoading()} / {@code isValid()} 等运行时状态，
	 * 用于避免对已加密值再次加密，或将明文意外落库。
	 *
	 * @param value 待检查值
	 * @return true 表示已是哈希值
	 */
	public static boolean isHashed(String value) {
		if (value == null || value.isEmpty()) {
			return false;
		}
		// 旧格式：32位 MD5 hex + "="
		if (value.length() == LEGACY_MD5_LENGTH && value.charAt(LEGACY_MD5_LENGTH - 1) == '=') {
			boolean allHex = true;
			for (int i = 0; i < LEGACY_MD5_LENGTH - 1; i++) {
				char c = value.charAt(i);
				if (!((c >= '0' && c <= '9') || (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F'))) {
					allHex = false;
					break;
				}
			}
			if (allHex) {
				return true;
			}
		}
		// 新格式：PBKDF2 五段
		if (value.indexOf(':') > 0) {
			String[] parts = value.split(":");
			if (parts.length == HASH_SECTIONS && HASH_ALGORITHM.equals(parts[HASH_ALGORITHM_INDEX])) {
				try {
					int iter = Integer.parseInt(parts[ITERATION_INDEX]);
					int size = Integer.parseInt(parts[HASH_SIZE_INDEX]);
					if (iter > 0 && size > 0 && !parts[SALT_INDEX].isEmpty() && !parts[PBKDF2_INDEX].isEmpty()) {
						return true;
					}
				} catch (NumberFormatException e) {
					return false;
				}
			}
		}
		return false;
	}

	public static String createHash(String password) throws CannotPerformOperationException {
		return createHash(password.toCharArray());
	}

	public static String createHash(char[] password) throws CannotPerformOperationException {
		// Generate a random salt
		SecureRandom random = new SecureRandom();
		byte[] salt = new byte[SALT_BYTE_SIZE];
		random.nextBytes(salt);

		// Hash the password
		byte[] hash = pbkdf2(password, salt, PBKDF2_ITERATIONS, HASH_BYTE_SIZE);
		int hashSize = hash.length;

		// format: algorithm:iterations:hashSize:salt:hash
		String parts = HASH_ALGORITHM + ":" + PBKDF2_ITERATIONS + ":" + hashSize + ":" + toBase64(salt) + ":"
				+ toBase64(hash);
		return parts;
	}

	public static boolean verifyPassword(String password, String correctHash)
			throws CannotPerformOperationException, InvalidHashException {
		return verifyPassword(password.toCharArray(), correctHash);
	}

	public static boolean verifyPassword(char[] password, String correctHash)
			throws CannotPerformOperationException, InvalidHashException {
		// Decode the hash into its parameters
		String[] params = correctHash.split(":");
		if (params.length != HASH_SECTIONS) {
			throw new InvalidHashException("Fields are missing from the password hash.");
		}

		// Currently, Java only supports SHA1.
		if (!params[HASH_ALGORITHM_INDEX].equals(HASH_ALGORITHM)) {
			throw new CannotPerformOperationException("Unsupported hash type.");
		}

		int iterations = 0;
		try {
			iterations = Integer.parseInt(params[ITERATION_INDEX]);
		} catch (NumberFormatException ex) {
			throw new InvalidHashException("Could not parse the iteration count as an integer.", ex);
		}

		if (iterations < 1) {
			throw new InvalidHashException("Invalid number of iterations. Must be >= 1.");
		}

		byte[] salt = null;
		try {
			salt = fromBase64(params[SALT_INDEX]);
		} catch (IllegalArgumentException ex) {
			throw new InvalidHashException("Base64 decoding of salt failed.", ex);
		}

		byte[] hash = null;
		try {
			hash = fromBase64(params[PBKDF2_INDEX]);
		} catch (IllegalArgumentException ex) {
			throw new InvalidHashException("Base64 decoding of pbkdf2 output failed.", ex);
		}

		int storedHashSize = 0;
		try {
			storedHashSize = Integer.parseInt(params[HASH_SIZE_INDEX]);
		} catch (NumberFormatException ex) {
			throw new InvalidHashException("Could not parse the hash size as an integer.", ex);
		}

		if (storedHashSize != hash.length) {
			throw new InvalidHashException("Hash length doesn't match stored hash length.");
		}

		// Compute the hash of the provided password, using the same salt,
		// iteration count, and hash length
		byte[] testHash = pbkdf2(password, salt, iterations, hash.length);
		// Compare the hashes in constant time. The password is correct if
		// both hashes match.
		return slowEquals(hash, testHash);
	}

	private static boolean slowEquals(byte[] a, byte[] b) {
		int diff = a.length ^ b.length;
		for (int i = 0; i < a.length && i < b.length; i++)
			diff |= a[i] ^ b[i];
		return diff == 0;
	}

	private static byte[] pbkdf2(char[] password, byte[] salt, int iterations, int bytes)
			throws CannotPerformOperationException {
		try {
			PBEKeySpec spec = new PBEKeySpec(password, salt, iterations, bytes * 8);
			SecretKeyFactory skf = SecretKeyFactory.getInstance(PBKDF2_ALGORITHM);
			return skf.generateSecret(spec).getEncoded();
		} catch (NoSuchAlgorithmException ex) {
			throw new CannotPerformOperationException("Hash algorithm not supported.", ex);
		} catch (InvalidKeySpecException ex) {
			throw new CannotPerformOperationException("Invalid key spec.", ex);
		}
	}

	private static byte[] fromBase64(String hex) throws IllegalArgumentException {
		return Base64.getDecoder().decode(hex);
	}

	private static String toBase64(byte[] array) {
		return Base64.getEncoder().encodeToString(array);
	}

}
