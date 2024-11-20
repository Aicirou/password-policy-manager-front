export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  password?: string;
  passwordLastChanged: Date;
  passwordExpired: boolean;
}

export interface PasswordPolicy {
  minLength: number;
  requireUpperCase: boolean;
  requireLowerCase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  expirationDays: number;
  preventReuse: boolean;
}

export interface PasswordChangeRequest {
  userId: string;
  currentPassword: string;
  newPassword: string;
}