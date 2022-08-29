import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from 'components/AdminSidebar';
import DashboardFooter from 'components/DashboardFooter';
import DashboardHeader from 'components/DashboardHeader';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = (state = !isSidebarOpen) => {
        setIsSidebarOpen(state);
    }

    // close the sidebar everytime a new page is opened
    const location = useLocation();
    useEffect(() => {
        toggleSidebar(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.key]);

    
    return (
        <div>
            <DashboardHeader
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
            />
            <div className="flex overflow-hidden bg-white pt-16">
                <AdminSidebar
                    isSidebarOpen={isSidebarOpen}
                />
                <div className={`bg-gray-900 opacity-50 ${isSidebarOpen ? '' : 'hidden'} fixed inset-0 z-10`} id="sidebarBackdrop"></div>
                <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
                    <Outlet />
                    <DashboardFooter />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout