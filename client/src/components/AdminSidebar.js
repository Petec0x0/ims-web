import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminSidebar = ({ isSidebarOpen }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // redirect to home page
        navigate('/');
    }

    return (
        <aside id="sidebar" className={`fixed ${isSidebarOpen ? 'flex' : 'hidden'}  z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75`} aria-label="Sidebar">
            <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex-1 px-3 bg-white divide-y space-y-1">
                        <ul className="space-y-2 pb-2">
                            <li>
                                <Link to="overview" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                    <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                    </svg>
                                    <span className="ml-3 flex-1 whitespace-nowrap">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="inventory" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                    <svg className="h-6 w-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 114.58">
                                        <path d="M118.13,9.54a3.25,3.25,0,0,1,2.2.41,3.28,3.28,0,0,1,2,3l.57,78.83a3.29,3.29,0,0,1-1.59,3L89.12,113.93a3.29,3.29,0,0,1-2,.65,3.07,3.07,0,0,1-.53,0L3.11,105.25A3.28,3.28,0,0,1,0,102V21.78H0A3.28,3.28,0,0,1,2,18.7L43.89.27h0A3.19,3.19,0,0,1,45.63,0l72.5,9.51Zm-37.26,1.7-24.67,14,30.38,3.88,22.5-14.18-28.21-3.7Zm-29,20L50.75,64.62,38.23,56.09,25.72,63.17l2.53-34.91L6.55,25.49V99.05l77.33,8.6V35.36l-32-4.09Zm-19.7-9.09L56.12,8,45.7,6.62,15.24,20l16.95,2.17ZM90.44,34.41v71.12l25.9-15.44-.52-71.68-25.38,16Z" />
                                    </svg>
                                    <span className="ml-3 flex-1 whitespace-nowrap">Inventory</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="sales" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                    <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M15.396,2.292H4.604c-0.212,0-0.385,0.174-0.385,0.386v14.646c0,0.212,0.173,0.385,0.385,0.385h10.792c0.211,0,0.385-0.173,0.385-0.385V2.677C15.781,2.465,15.607,2.292,15.396,2.292 M15.01,16.938H4.99v-2.698h1.609c0.156,0.449,0.586,0.771,1.089,0.771c0.638,0,1.156-0.519,1.156-1.156s-0.519-1.156-1.156-1.156c-0.503,0-0.933,0.321-1.089,0.771H4.99v-3.083h1.609c0.156,0.449,0.586,0.771,1.089,0.771c0.638,0,1.156-0.518,1.156-1.156c0-0.638-0.519-1.156-1.156-1.156c-0.503,0-0.933,0.322-1.089,0.771H4.99V6.531h1.609C6.755,6.98,7.185,7.302,7.688,7.302c0.638,0,1.156-0.519,1.156-1.156c0-0.638-0.519-1.156-1.156-1.156c-0.503,0-0.933,0.322-1.089,0.771H4.99V3.062h10.02V16.938z M7.302,13.854c0-0.212,0.173-0.386,0.385-0.386s0.385,0.174,0.385,0.386s-0.173,0.385-0.385,0.385S7.302,14.066,7.302,13.854 M7.302,10c0-0.212,0.173-0.385,0.385-0.385S8.073,9.788,8.073,10s-0.173,0.385-0.385,0.385S7.302,10.212,7.302,10 M7.302,6.146c0-0.212,0.173-0.386,0.385-0.386s0.385,0.174,0.385,0.386S7.899,6.531,7.688,6.531S7.302,6.358,7.302,6.146"></path>
                                    </svg>
                                    <span className="ml-3 flex-1 whitespace-nowrap">Sales</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="customers" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                    <svg className="h-6 w-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 72.19">
                                        <path className="cls-1" d="M72.45,44.22a11.29,11.29,0,0,1-5.34-3.37c3.57-1.35,5.23-5,5.45-11.29.17-4.69-.8-6.93.8-11.56,3.17-9.19,14.92-12.33,21.46-7,5.13-.54,10.3,2.11,11.41,10,.83,5.9-.93,9.75.93,15.19a8.53,8.53,0,0,0,4.37,5.18,12.72,12.72,0,0,1-5.84,2.81,58.72,58.72,0,0,1-9.22,1V48l3.21,5.14L89.31,61.27,79,53.23l2.3-4.92v-3a39.49,39.49,0,0,1-8.81-1.11ZM25.16,37.76a3.13,3.13,0,0,1-1.67-.37,3.87,3.87,0,0,1-1.59-1.88c-.73-1.64-1.31-6,.53-7.2l-.34-.22,0-.48c-.07-.87-.09-1.92-.11-3-.07-4.06-.15-9-3.5-10L17,14.19l.94-1.14a54.24,54.24,0,0,1,8.4-8.31A21.77,21.77,0,0,1,36.07.14a11.89,11.89,0,0,1,9.45,2.58A17.37,17.37,0,0,1,48.06,5.2a10.83,10.83,0,0,1,7.57,4.31,14.83,14.83,0,0,1,2.47,4.85,16.14,16.14,0,0,1,.66,5.49,13,13,0,0,1-3.93,8.9,2.9,2.9,0,0,1,1.22.31c1.4.73,1.45,2.31,1.08,3.64-.36,1.11-.82,2.39-1.26,3.47-.53,1.46-1.3,1.73-2.8,1.58-3.36,14.69-23.67,15.2-27.91,0Zm1.25,11.47,6.8,17.85,3.42-9.73L35,55.52c-1.26-1.84-.82-3.93,1.51-4.31A16.27,16.27,0,0,1,39,51.16a13.48,13.48,0,0,1,2.78.11c2.17.48,2.39,2.58,1.31,4.25l-1.67,1.83,3.41,9.73L51,49.23c4.44,4,14.38,4.8,19.27,7.52C77,60.54,76.5,65.41,78,72.19H0c1.47-6.72,1.64-11.71,8.39-15.44,6-3.34,13.1-3.09,18-7.52Zm79.19,8.34c-1.71-3.42-2.29-4.74-4.8-7.46,3.89,1.51,16.91,4.76,18.93,8.55,2.27,4.25,1.94,9,3.15,13.51H82.58a4.45,4.45,0,0,0-.1-1c-.26-1.19-.45-2.28-.63-3.31-.66-3.81-1.23-7.07-3.27-10l10.47,8.36,11.61-8.84,4.94.12ZM71.21,52.12c2.05-.58,4.25-1.09,6.63-2a20.16,20.16,0,0,0-3.06,4.08c-.69-.49-1.45-1-2.29-1.45h0c-.4-.22-.82-.43-1.26-.62Z" />
                                    </svg>
                                    <span className="ml-3 flex-1 whitespace-nowrap">Customers</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="suppliers" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                    <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 340.88">
                                        <path fill="#1A191C" d="m359.22 83.71-40.13-.27V29.25c0-8.07-3.27-15.36-8.6-20.65C305.2 3.27 297.91 0 289.84 0H29.26C20.37 0 12.38 4.02 7 10.33-.62 19.28.01 27.94.01 38.32V263.2c0 15.91 13.12 30.01 29.25 30.01h47.77c4.4 0 7.93-3.54 7.93-7.93s-3.53-7.92-7.93-7.92v.04H29.21c-7.46 0-13.35-6.95-13.35-14.2V38.09c0-6.96-1.35-13.06 4.01-18.35a13.32 13.32 0 0 1 9.39-3.88h260.58c3.68 0 7.04 1.52 9.46 3.94 2.41 2.42 3.94 5.77 3.94 9.45V277.4h-62.92c-4.39 0-7.93 3.54-7.93 7.93s3.54 7.92 7.93 7.92h70.84c4.39 0 7.93-3.53 7.93-7.92v-9.01h32.03c3.62-82.49 122.08-93.87 134.13 0h26.02c6.7-80.43-33.02-111.69-93.43-118.76-4.34-18.88-12.63-36.4-21.99-53.72-11.13-20.59-13.73-19.76-36.63-20.13zM159.48 43.69c6.18 0 12.23.7 18.03 2.02 5.97 1.35 11.7 3.37 17.09 5.96.58.28.83.99.55 1.57-.09.19-.22.34-.38.45l-6.14 4.94-5.76 4.79c-.33.28-.77.34-1.15.2-3.5-1.27-7.16-2.25-10.92-2.91-3.66-.64-7.45-.98-11.31-.98-17.32 0-33.77 6.81-46.01 19.06-12.26 12.27-19.07 28.68-19.07 46.02 0 26.38 15.93 50.11 40.19 60.15 33.28 13.79 71.42-2.34 85.04-35.26a64.96 64.96 0 0 0 4.93-24.89c0-4.22-.4-8.36-1.21-12.5-.06-.36.04-.72.25-.98l5.2-6.68 5.36-6.69a1.17 1.17 0 0 1 2.01.36c2.95 8.52 4.43 17.48 4.43 26.49 0 10.98-2.19 21.46-6.15 31.01-16.98 41.02-64.5 61.14-105.98 43.96-30.14-12.47-50.12-41.97-50.12-74.97 0-21.57 8.51-42.11 23.76-57.36 15.25-15.25 35.79-23.76 57.36-23.76zm-1.83 189.79c-29.65 0-53.7 24.05-53.7 53.7 0 29.65 24.05 53.7 53.7 53.7 29.65 0 53.69-24.05 53.69-53.7-.04-29.65-24.04-53.7-53.69-53.7zm0 33.06c-11.37 0-20.65 9.22-20.65 20.64 0 11.38 9.23 20.65 20.65 20.65 11.37 0 20.65-9.23 20.65-20.65-.05-11.42-9.28-20.64-20.65-20.64zm260.37-40.96c-29.64 0-53.69 24.05-53.69 53.7 0 29.65 24.05 53.7 53.69 53.7 29.65 0 53.7-24.05 53.7-53.7 0-29.65-24.05-53.7-53.7-53.7zm-20.64 53.7c0 11.38 9.22 20.65 20.64 20.65s20.65-9.23 20.65-20.65c0-11.42-9.23-20.64-20.65-20.64-11.39 0-20.64 9.24-20.64 20.64zm-34.31-172.65-24.19-.45v51.47h51.24c-6.32-18.36-15.67-35.19-27.05-51.02z" />
                                        <path fill="#10A64A" fillRule="nonzero" d="m122.55 112.76 18.14-.24 1.35.35c3.66 2.11 7.11 4.52 10.33 7.26 2.33 1.96 4.55 4.11 6.66 6.44 6.51-10.48 13.44-20.09 20.77-28.93 8.02-9.69 16.54-18.48 25.48-26.5l1.77-.69h19.79l-3.99 4.44c-12.27 13.63-23.39 27.71-33.45 42.24a411.664 411.664 0 0 0-27.05 45l-2.49 4.8-2.28-4.89c-4.22-9.06-9.27-17.37-15.3-24.8-6.02-7.43-13.04-14.02-21.21-19.63l1.48-4.85z" />
                                    </svg>
                                    <span className="ml-3 flex-1 whitespace-nowrap">Suppliers</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="brands" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                    <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M79.4,39.1C76.5,27.2,64,20,50.2,20C33.5,20,20,33.4,20,50s13.5,30,30.3,30c23.2,0,21.4-11.8,14-16.4 c-4.4-2.8-6.8-9.1-2.4-13.6C70,41.6,83.1,55,79.4,39.1z M33.7,60c-3.5,0-6.3-2.8-6.3-6.2s2.8-6.2,6.3-6.2c3.5,0,6.2,2.8,6.2,6.2 S37.2,60,33.7,60z M35,36.2c0-3.5,2.8-6.2,6.2-6.2c3.5,0,6.2,2.8,6.2,6.2s-2.8,6.2-6.2,6.2C37.7,42.5,35,39.8,35,36.2z M48.7,72.5 c-3.5,0-6.2-2.8-6.2-6.2s2.8-6.2,6.2-6.2c3.5,0,6.2,2.8,6.2,6.2S52.2,72.5,48.7,72.5z M60,40c-3.5,0-6.2-2.8-6.2-6.2 s2.8-6.2,6.2-6.2c3.5,0,6.2,2.8,6.2,6.2S63.5,40,60,40z" />
                                    </svg>
                                    <span className="ml-3 flex-1 whitespace-nowrap">Brands</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="categories" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                    <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M61.8,29.4l8.9,8.9l0,0c2,1.9,2,5.1,0,7l0,0L47.5,68.4V47.3V36.6l7.2-7.3C56.6,27.4,59.9,27.4,61.8,29.4z" />
                                        <path d="M37.5,20H25c-2.8,0-5,2.2-5,5v43.8C20,75,25,80,31.2,80s11.2-5,11.2-11.2V25C42.5,22.2,40.2,20,37.5,20z M31.2,73.8c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S34,73.8,31.2,73.8z" />
                                        <path d="M75,57.5h-8.8l-6,6H74L73.9,74H49.8l-6,6H75c2.8,0,5-2.2,5-5V62.5C80,59.8,77.8,57.5,75,57.5L75,57.5z" />
                                    </svg>
                                    <span className="ml-3 flex-1 whitespace-nowrap">Categories</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="sub-categories" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                    <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M61.8,29.4l8.9,8.9l0,0c2,1.9,2,5.1,0,7l0,0L47.5,68.4V47.3V36.6l7.2-7.3C56.6,27.4,59.9,27.4,61.8,29.4z" />
                                        <path d="M37.5,20H25c-2.8,0-5,2.2-5,5v43.8C20,75,25,80,31.2,80s11.2-5,11.2-11.2V25C42.5,22.2,40.2,20,37.5,20z M31.2,73.8c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S34,73.8,31.2,73.8z" />
                                        <path d="M75,57.5h-8.8l-6,6H74L73.9,74H49.8l-6,6H75c2.8,0,5-2.2,5-5V62.5C80,59.8,77.8,57.5,75,57.5L75,57.5z" />
                                    </svg>
                                    <span className="ml-3 flex-1 whitespace-nowrap">Sub-Categories</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                    <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="ml-3 flex-1 whitespace-nowrap">Settings</span>
                                </Link>
                            </li>
                        </ul>
                        <div className="space-y-2 pt-2">
                            <span onClick={handleLogout} className="cursor-pointer text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                                <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path>
                                </svg>
                                <span className="ml-4">Logout</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default AdminSidebar;