import React from 'react';
import { Outlet } from "react-router-dom";
import onboard_bg from 'images/bg-1.jpg';

const Layout = () => {
    return (
        <div className="bg-gray-100" style={{height: '777px'}}>
            <Outlet />
        </div>
    )
}

export default Layout;
