import React from 'react';
import { useStore } from '../store/useStore';
import { Check, X } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export default function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const policy = useStore((state) => state.passwordPolicy);

  const requirements = [
    {
      label: `At least ${policy.minLength} characters`,
      met: password.length >= policy.minLength,
    },
    {
      label: 'Contains uppercase letter',
      met: !policy.requireUpperCase || /[A-Z]/.test(password),
      show: policy.requireUpperCase,
    },
    {
      label: 'Contains lowercase letter',
      met: !policy.requireLowerCase || /[a-z]/.test(password),
      show: policy.requireLowerCase,
    },
    {
      label: 'Contains number',
      met: !policy.requireNumbers || /\d/.test(password),
      show: policy.requireNumbers,
    },
    {
      label: 'Contains special character',
      met: !policy.requireSpecialChars || /[^A-Za-z0-9]/.test(password),
      show: policy.requireSpecialChars,
    },
  ];

  return (
    <div className="mt-2 space-y-2 text-sm">
      {requirements
        .filter((req) => req.show !== false)
        .map((requirement, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 ${
              requirement.met ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {requirement.met ? (
              <Check className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
            <span>{requirement.label}</span>
          </div>
        ))}
    </div>
  );
}