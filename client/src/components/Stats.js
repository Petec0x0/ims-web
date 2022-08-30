import React from 'react';

const Stats = () => {
    return (
        <div className="bg-teal-50 flex-wrap py-2 px-10">
            <div className="flex flex-col justify-evenly md:flex-row">
                <div className="flex items-center justify-evenly p-6 bg-white w-64 rounded-xl mx-4 mt-2 shadow-lg md:mx-2">
                    <div>
                        <span className="text-sm font-semibold text-gray-400">Total Sales</span>
                        <h1 className="text-2xl font-bold">$682.5</h1>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                        </svg>
                    </div>
                </div>
                <div className="flex items-center justify-evenly p-6 bg-white w-64 rounded-xl mx-4 mt-2 shadow-lg md:mx-2">
                    <div>
                        <span className="text-sm font-semibold text-gray-400">Revenue</span>
                        <h1 className="text-2xl font-bold">$682.5</h1>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                    </div>
                </div>
                <div className="flex items-center justify-evenly p-6 bg-white w-64 rounded-xl mx-4 mt-2 shadow-lg md:mx-2">
                    <div>
                        <span className="text-sm font-semibold text-gray-400">Cost</span>
                        <h1 className="text-2xl font-bold">$682.5</h1>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                    </div>
                </div>
                <div className="flex items-center justify-evenly p-6 bg-white w-64 rounded-xl mx-4 mt-2 shadow-lg md:mx-2">
                    <div>
                        <span className="text-sm font-semibold text-gray-400">Profit</span>
                        <h1 className="text-2xl font-bold">$682.5</h1>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats;