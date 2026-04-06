export type ValidationResult = { valid: boolean; error?: string };

export function validateUsername(username: unknown): ValidationResult {
	if (typeof username !== 'string') {
		return { valid: false, error: 'Username must be a string' };
	}

	const trimmed = username.trim();

	if (trimmed.length < 3) {
		return { valid: false, error: 'Username must be at least 3 characters long' };
	}

	if (trimmed.length > 31) {
		return { valid: false, error: 'Username must be 31 characters or less' };
	}

	if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
		return {
			valid: false,
			error: 'Username can only contain letters, numbers, underscores, and hyphens'
		};
	}

	if (/^[_-]/.test(trimmed)) {
		return { valid: false, error: 'Username cannot start with an underscore or hyphen' };
	}

	if (/[_-]$/.test(trimmed)) {
		return { valid: false, error: 'Username cannot end with an underscore or hyphen' };
	}

	if (/^\d+$/.test(trimmed)) {
		return { valid: false, error: 'Username cannot be all numbers' };
	}

	return { valid: true };
}

export function validatePassword(password: unknown): password is string {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}

export function buildRateLimitKey(parts: Array<string | null | undefined>): string {
	return parts.filter((p): p is string => typeof p === 'string' && p.length > 0).join(':');
}
