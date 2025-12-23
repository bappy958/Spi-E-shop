import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardNavbar from '../components/DashboardNavbar';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { theme } = useTheme();

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={`min-h-screen bg-academic-50 dark:bg-academic-900 transition-colors duration-300 ${theme}`}>
            <DashboardNavbar onSidebarToggle={handleSidebarToggle} />

            <div className="flex">
                <div className="hidden lg:block">
                    <DashboardSidebar isOpen={true} onClose={() => { }} isMobile={false} />
                </div>
                <div className="lg:hidden">
                    <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} isMobile={true} />
                </div>

                <main className="flex-1 overflow-x-hidden min-h-[calc(100vh-64px)]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
