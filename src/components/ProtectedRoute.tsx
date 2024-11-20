import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: 'admin' | 'user';
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const currentUser = useStore((state) => state.currentUser);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (role === 'admin' && currentUser.role !== 'admin') {
    return <Navigate to="/profile" />;
  }

  return <>{children}</>;
}