import React from 'react';
import { useStore } from '../store/useStore';

export default function PolicySettings() {
  const { passwordPolicy, updatePasswordPolicy } = useStore();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Password Policy Settings</h2>
      
      <div className="grid gap-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Minimum Password Length
          </label>
          <input
            type="number"
            value={passwordPolicy.minLength}
            onChange={(e) =>
              updatePasswordPolicy({ minLength: parseInt(e.target.value) })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Character Requirements
          </label>
          <div className="space-y-2">
            {[
              {
                key: 'requireUpperCase',
                label: 'Require Uppercase Letters',
              },
              {
                key: 'requireLowerCase',
                label: 'Require Lowercase Letters',
              },
              {
                key: 'requireNumbers',
                label: 'Require Numbers',
              },
              {
                key: 'requireSpecialChars',
                label: 'Require Special Characters',
              },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={passwordPolicy[key as keyof typeof passwordPolicy]}
                  onChange={(e) =>
                    updatePasswordPolicy({ [key]: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">{label}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password Expiration (Days)
          </label>
          <input
            type="number"
            value={passwordPolicy.expirationDays}
            onChange={(e) =>
              updatePasswordPolicy({
                expirationDays: parseInt(e.target.value),
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={passwordPolicy.preventReuse}
            onChange={(e) =>
              updatePasswordPolicy({ preventReuse: e.target.checked })
            }
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-700">
            Prevent Password Reuse
          </label>
        </div>
      </div>
    </div>
  );
}