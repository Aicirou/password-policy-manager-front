import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { User, PasswordPolicy } from '../types';
import { validatePassword } from '../utils/passwordValidation';

interface Store {
  users: User[];
  currentUser: User | null;
  passwordPolicy: PasswordPolicy;
  addUser: (user: User) => void;
  updatePasswordPolicy: (policy: Partial<PasswordPolicy>) => void;
  changePassword: (userId: string, currentPassword: string, newPassword: string) => string | null;
  login: (username: string, password: string) => User | null;
  logout: () => void;
}

const defaultPolicy: PasswordPolicy = {
  minLength: 8,
  requireUpperCase: true,
  requireLowerCase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  expirationDays: 90,
  preventReuse: true,
};

const initialUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    password: 'Admin123!',
    passwordLastChanged: new Date(),
    passwordExpired: false,
  },
  {
    id: '2',
    username: 'demo',
    email: 'demo@example.com',
    role: 'user',
    password: 'Demo123!',
    passwordLastChanged: new Date(),
    passwordExpired: false,
  }
];

export const useStore = create<Store>()(
  devtools(
    persist(
      (set, get) => ({
        users: initialUsers,
        currentUser: null,
        passwordPolicy: defaultPolicy,
        addUser: (user) =>
          set((state) => ({ users: [...state.users, user] }), false, 'addUser'),
        updatePasswordPolicy: (policy) =>
          set(
            (state) => ({
              passwordPolicy: { ...state.passwordPolicy, ...policy },
            }),
            false,
            'updatePasswordPolicy'
          ),
        changePassword: (userId, currentPassword, newPassword) => {
          const user = get().users.find((u) => u.id === userId);
          if (!user) return 'User not found';
          if (user.password !== currentPassword) return 'Current password is incorrect';

          const validationError = validatePassword(newPassword, get().passwordPolicy);
          if (validationError) return validationError;

          set(
            (state) => ({
              users: state.users.map((u) =>
                u.id === userId
                  ? {
                      ...u,
                      password: newPassword,
                      passwordLastChanged: new Date(),
                      passwordExpired: false,
                    }
                  : u
              ),
              currentUser:
                state.currentUser?.id === userId
                  ? {
                      ...state.currentUser,
                      passwordLastChanged: new Date(),
                      passwordExpired: false,
                    }
                  : state.currentUser,
            }),
            false,
            'changePassword'
          );
          return null;
        },
        login: (username, password) => {
          const user = get().users.find(
            (u) => u.username === username && u.password === password
          );
          if (user) {
            set({ currentUser: user }, false, 'login');
          }
          return user || null;
        },
        logout: () => set({ currentUser: null }, false, 'logout'),
      }),
      {
        name: 'password-policy-store',
      }
    )
  )
);