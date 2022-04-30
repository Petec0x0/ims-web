import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from 'images/DashboardIcon';
import DashboardLogo from 'images/DashboardLogo';
import InventoryIcon from 'images/InventoryIcon';
import SalesIcon from 'images/SalesIcon';
import CustomerIcon from 'images/CustomerIcon';
import SupplierIcon from 'images/SupplierIcon';
import BrandsIcon from 'images/BrandsIcon';
import CategoriesIcon from 'images/CategoriesIcon';
import SettingsIcon from 'images/SettingsIcon';
import LogoutIcon from 'images/LogoutIcon';

const DashboardLayout = () => {
    const { pathname } = useLocation();

    return (
        <div className="min-h-screen flex">
            <div className="py-12 px-10 w-1/4">
                <div className="flex space-2 items-center border-b-2 pb-4">
                    <div>
                        <DashboardLogo />
                    </div>
                    <div className="ml-3">
                        <h1 className="text-3xl font-bold text-teal-600">IMS</h1>
                        <p className="text-center text-sm text-teal-600 mt-1 font-serif">DASHBOARD</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4 mt-6 p-2 bg-teal-600 rounded-md">
                    <div>
                        <DashboardIcon />
                    </div>
                    <div>
                        <p className="text-lg text-white font-semibold">Dashboard</p>
                    </div>
                </div>
                <div className="mt-8">
                    <ul className="space-y-10">
                        <li>
                            <Link to="/" className={`${(pathname.includes('inventory')) ? 'text-teal-600':'text-gray-500'} flex items-center text-sm font-semibold hover:text-teal-600 transition duration-200`}>
                                <InventoryIcon />
                                Inventory
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className={`${(pathname.includes('sales')) ? 'text-teal-600':'text-gray-500'} flex items-center text-sm font-semibold hover:text-teal-600 transition duration-200`}>
                                <SalesIcon />
                                Sales
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className={`${(pathname.includes('customers')) ? 'text-teal-600':'text-gray-500'} flex items-center text-sm font-semibold hover:text-teal-600 transition duration-200`}>
                                <CustomerIcon />
                                Customers
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className={`${(pathname.includes('suppliers')) ? 'text-teal-600':'text-gray-500'} flex items-center text-sm font-semibold hover:text-teal-600 transition duration-200`}>
                                <SupplierIcon />
                                Suppliers
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className={`${(pathname.includes('brands')) ? 'text-teal-600':'text-gray-500'} flex items-center text-sm font-semibold hover:text-teal-600 transition duration-200`}>
                                <BrandsIcon />
                                Brands
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className={`${(pathname.includes('categories')) ? 'text-teal-600':'text-gray-500'} flex items-center text-sm font-semibold hover:text-teal-600 transition duration-200`}>
                                <CategoriesIcon />
                                Categories
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className={`${(pathname.includes('sub-categories')) ? 'text-teal-600':'text-gray-500'} flex items-center text-sm font-semibold hover:text-teal-600 transition duration-200`}>
                                <CategoriesIcon />
                                Sub-categories
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className={`${(pathname.includes('settings')) ? 'text-teal-600':'text-gray-500'} flex items-center text-sm font-semibold hover:text-teal-600 transition duration-200`}>
                                <SettingsIcon />
                                Settings
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex mt-20 space-x-4 items-center">
                    <div>
                        <LogoutIcon />
                    </div>
                    <Link to="/" className="block font-semibold text-gray-500 hover:text-teal-600 transition duration-200">Logout</Link>
                </div>
            </div>

            <Outlet />

        </div>
    )
}

export default DashboardLayout