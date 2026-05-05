import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import NotFound from '../pages/NotFound';

const VALID_PATHS = ['/', '/gallery', '/blog', '/comments', '/donation', '/contact', '/donation-settings'];
const isBlogPath = (p) => p === '/blog' || p.startsWith('/blog/');

const MainLayout = () => {
    const { isAuthenticated } = useAuth();
    const { pathname } = useLocation();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarCollapsed(true);
            } else {
                setIsSidebarCollapsed(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initialize on mount
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const is404 = !VALID_PATHS.some(p => pathname === `/admin${p === '/' ? '' : p}`) && !isBlogPath(pathname.replace('/admin', ''));

    // If not authenticated: show 404 with "Go to Login" for unknown paths, else redirect to login
    if (!isAuthenticated) {
        if (is404) return <NotFound />;
        return <Navigate to="login" replace />;
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Topbar isSidebarCollapsed={isSidebarCollapsed} setIsSidebarCollapsed={setIsSidebarCollapsed} />

                {/* Page Content scrollable area */}
                <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
