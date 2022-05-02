import React from 'react';

const DashboardHeader = () => {
    return (
        <div className="flex justify-between">
            <div>
                <h4 className="text-sm font-bold text-teal-600">Hi Andrei,</h4>
                {/* <h1 className="text-4xl font-bold text-teal-900 mt-">Welcome to Venus!</h1> */}
            </div>
            <div>
                <div className="flex items-center border rounded-lg bg-white w-max py-2 px-4 space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input className="outline-none" type="text" placeholder="Search" />
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader;