import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { Dashboard, Documentation, Home } from "./components/index";

import { AuthProvider, useAuth } from "./contexts/index";

type PropsApp = {
  children?: React.ReactNode
}

function ProtectedRoute({ children }: PropsApp) {

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
        <Toaster position="top-right"/>
        <Routes>
          <Route path="/" element={<Home/>} />
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
