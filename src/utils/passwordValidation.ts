import { PasswordPolicy } from '../types';

export function validatePassword(
  password: string,
  policy: PasswordPolicy
): string | null {
  if (password.length < policy.minLength) {
    return `Password must be at least ${policy.minLength} characters long`;
  }

  if (policy.requireUpperCase && !/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }

  if (policy.requireLowerCase && !/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }

  if (policy.requireNumbers && !/\d/.test(password)) {
    return 'Password must contain at least one number';
  }

  if (policy.requireSpecialChars && !/[^A-Za-z0-9]/.test(password)) {
    return 'Password must contain at least one special character';
  }

  return null;
}