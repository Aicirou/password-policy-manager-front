import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useStore } from './store/useStore';
import AdminDashboard from './components/AdminDashboard';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  const currentUser = useStore((state) => state.currentUser);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute role="user">
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                currentUser ? (
                  <Navigate
                    to={currentUser.role === 'admin' ? '/admin' : '/profile'}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;