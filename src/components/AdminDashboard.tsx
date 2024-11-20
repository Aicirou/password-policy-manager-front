import React, { useState } from 'react';
import { Plus, Settings, Users } from 'lucide-react';
import { useStore } from '../store/useStore';
import PolicySettings from './PolicySettings';
import UserList from './UserList';
import CreateUser from './CreateUser';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'users' | 'policy'>('users');
  const [showCreateUser, setShowCreateUser] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-between px-6 py-3">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('users')}
                  className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                    activeTab === 'users'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Users size={20} />
                  <span>Users</span>
                </button>
                <button
                  onClick={() => setActiveTab('policy')}
                  className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                    activeTab === 'policy'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Settings size={20} />
                  <span>Password Policy</span>
                </button>
              </div>
              {activeTab === 'users' && (
                <button
                  onClick={() => setShowCreateUser(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-700"
                >
                  <Plus size={20} />
                  <span>Create User</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'users' ? <UserList /> : <PolicySettings />}
          </div>
        </div>
      </div>

      {showCreateUser && (
        <CreateUser onClose={() => setShowCreateUser(false)} />
      )}
    </div>
  );
}