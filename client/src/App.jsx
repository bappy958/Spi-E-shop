import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AIChatbot from './components/AIChatbot';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './pages/Home';
import DepartmentPage from './pages/DepartmentPage';
import Dashboard from './pages/Dashboard';

import DashboardNavbar from './components/DashboardNavbar';
import DashboardOverview from './pages/dashboard/DashboardOverview';
import Orders from './pages/dashboard/Orders';
import Products from './pages/dashboard/Products';
import Customers from './pages/dashboard/Customers';
import { useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Profile from './pages/dashboard/Profile';
import MyCart from './pages/dashboard/MyCart';
import MyOrders from './pages/dashboard/MyOrders';
import SuggestionList from './pages/dashboard/SuggestionList';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLoginClick = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
  };

  const handleSignupClick = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  };

  // Show sidebar on all pages except maybe some specific ones
  const showSidebar = !location.pathname.includes('/admin') && !location.pathname.includes('/dashboard');
  const isDashboard = location.pathname.includes('/dashboard');

  return (
    <AuthProvider>
      <AppContent
        isDashboard={isDashboard}
        theme={theme}
        handleSidebarToggle={handleSidebarToggle}
        isSidebarOpen={isSidebarOpen}
        handleLoginClick={handleLoginClick}
        showSidebar={showSidebar}
        handleSignupClick={handleSignupClick}
        isLoginOpen={isLoginOpen}
        isSignupOpen={isSignupOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setIsLoginOpen={setIsLoginOpen}
        setIsSignupOpen={setIsSignupOpen}
      />
    </AuthProvider>
  );
}

function AppContent({
  isDashboard,
  theme,
  handleSidebarToggle,
  isSidebarOpen,
  handleLoginClick,
  showSidebar,
  handleSignupClick,
  isLoginOpen,
  isSignupOpen,
  setIsSidebarOpen,
  setIsLoginOpen,
  setIsSignupOpen
}) {
  const { isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-academic-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className={`min-h-screen bg-academic-50 dark:bg-academic-900 transition-colors duration-300 ${theme}`}>
      {!isDashboard && (
        <Navbar
          onSidebarToggle={handleSidebarToggle}
          isSidebarOpen={isSidebarOpen}
          onUserClick={handleLoginClick}
        />
      )}


      <div className="flex">
        {/* Regular Sidebar */}
        {showSidebar && (
          <>
            <div className="hidden lg:block">
              <Sidebar isOpen={true} onClose={() => setIsSidebarOpen(false)} />
            </div>
            <div className="lg:hidden">
              <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            </div>
          </>
        )}

        {/* Home & Department Routes */}
        {!isDashboard && (
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/department/:deptName" element={<DepartmentPage />} />

              {/* Catch-all: redirect unknown routes to home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
        )}

        {/* Dashboard Routes - fully handled by Dashboard Layout */}
        {isDashboard && (
          <main className="w-full">
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requireVerified={false}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardOverview />} />
                <Route path="activity" element={<DashboardOverview />} />
                <Route path="traffic" element={<DashboardOverview />} />
                <Route path="statistic" element={<DashboardOverview />} />
                <Route path="orders" element={<Orders />} />
                <Route path="orders" element={<Orders />} />
                <Route path="profile" element={<ProfileWrapper />} />

                {/* User Dashboard Routes */}
                <Route path="my-cart" element={<MyCart />} />
                <Route path="my-orders" element={<MyOrders />} />
                <Route path="suggestion-list" element={<SuggestionList />} />

                <Route path="settings" element={<div>Settings Component</div>} />
                <Route path="help" element={<div>Help Component</div>} />

                {/* Admin-Only Routes */}
                <Route
                  path="products"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <Products />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="products/add"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <div>Add Product Component</div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="products/categories"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <div>Categories Component</div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="transaction"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <div>Transaction Component</div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="stores"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <div>Stores Component</div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="reports"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <div>Reports Component</div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="customers"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <Customers />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="role-management"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <div>Role Management Component</div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="log-activity"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <div>Log Activity Component</div>
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </main>
        )}
      </div>

      {/* AI Chatbot */}
      <AIChatbot />

      {/* Auth Modals */}
      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignup={handleSignupClick}
      />
      <Signup
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSwitchToLogin={handleLoginClick}
      />
    </div>
  );
}


const ProfileWrapper = () => {
  console.log('Rendering ProfileWrapper');
  return <Profile />;
};

export default App;
