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
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<DashboardOverview />} />
                <Route path="activity" element={<DashboardOverview />} />
                <Route path="traffic" element={<DashboardOverview />} />
                <Route path="statistic" element={<DashboardOverview />} />
                <Route path="orders" element={<Orders />} />
                <Route path="products" element={<Products />} />
                <Route path="products/add" element={<div>Add Product Component</div>} />
                <Route path="products/categories" element={<div>Categories Component</div>} />
                <Route path="transaction" element={<div>Transaction Component</div>} />
                <Route path="stores" element={<div>Stores Component</div>} />
                <Route path="reports" element={<div>Reports Component</div>} />
                <Route path="customers" element={<Customers />} />
                <Route path="role-management" element={<div>Role Management Component</div>} />
                <Route path="log-activity" element={<div>Log Activity Component</div>} />
                <Route path="settings" element={<div>Settings Component</div>} />
                <Route path="help" element={<div>Help Component</div>} />
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

export default App;
