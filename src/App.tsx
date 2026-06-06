import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { Dashboard, Documentation, LoginForm } from "./components/index";

import { AuthProvider, useAuth } from "./contexts/index";
import React from "react";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div>
        <div>Charding...</div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/" replace />
};

function App() {
  

  return (
    <AuthProvider>
      <Router>
        <Toaster/>
        <Routes>
          <Route path="/" element={<LoginForm/>} />
          <Route path="/doc" element={<Documentation/>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
