import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Stats = () => {
    let navigate = useNavigate();

    const [stats, setStats] = useState({
        totalProduct: 0,
        lowStockProduct: 0,
        outOfStockProduct: 0,
        saleThisMonth: 0
    });

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(() => {
        // send a get request to the server to fetch products
        (async () => {
            const rawResponse = await fetch(`/api/stats`, {
                method: 'GET',
            });
            const content = await rawResponse.json();
            const status = rawResponse.status;
            // Redirect the user to login page if status == 401
            if (status === 401) {
                // redirect to login page
                navigate("/login");
                return false;
            }
            // check if there is an error in the response
            if (content.error) {
                alert(content.message);
            } else {
                // update statistics
                setStats({ ...content.data });
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="bg-teal-50 flex-wrap py-2 px-10">
            <div className="flex flex-col justify-evenly md:flex-row">
                <div className="flex items-center justify-evenly p-6 bg-white w-64 rounded-xl mx-4 mt-2 shadow-lg md:mx-2">
                    <div>
                        <span className="text-sm font-semibold text-gray-400">Total Sales (This Month)</span>
                        <h1 className="text-2xl font-bold">₦{numberWithCommas(stats.saleThisMonth)}</h1>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                    </div>
                </div>
                <div className="flex items-center justify-evenly p-6 bg-white w-64 rounded-xl mx-4 mt-2 shadow-lg md:mx-2">
                    <div>
                        <span className="text-sm font-semibold text-gray-400">Total Products</span>
                        <h1 className="text-2xl font-bold">{stats.totalProduct}</h1>
                    </div>
                    <div>
                        <svg className="h-8 w-8 text-teal-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 114.58">
                            <path d="M118.13,9.54a3.25,3.25,0,0,1,2.2.41,3.28,3.28,0,0,1,2,3l.57,78.83a3.29,3.29,0,0,1-1.59,3L89.12,113.93a3.29,3.29,0,0,1-2,.65,3.07,3.07,0,0,1-.53,0L3.11,105.25A3.28,3.28,0,0,1,0,102V21.78H0A3.28,3.28,0,0,1,2,18.7L43.89.27h0A3.19,3.19,0,0,1,45.63,0l72.5,9.51Zm-37.26,1.7-24.67,14,30.38,3.88,22.5-14.18-28.21-3.7Zm-29,20L50.75,64.62,38.23,56.09,25.72,63.17l2.53-34.91L6.55,25.49V99.05l77.33,8.6V35.36l-32-4.09Zm-19.7-9.09L56.12,8,45.7,6.62,15.24,20l16.95,2.17ZM90.44,34.41v71.12l25.9-15.44-.52-71.68-25.38,16Z" />
                        </svg>
                    </div>
                </div>
                <div className="flex items-center justify-evenly p-6 bg-white w-64 rounded-xl mx-4 mt-2 shadow-lg md:mx-2">
                    <div>
                        <span className="text-sm font-semibold text-gray-400">Low Stock Products</span>
                        <h1 className="text-2xl font-bold">{stats.lowStockProduct}</h1>
                    </div>
                    <div>
                        <svg className="h-8 w-8 text-yellow-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 114.58">
                            <path d="M118.13,9.54a3.25,3.25,0,0,1,2.2.41,3.28,3.28,0,0,1,2,3l.57,78.83a3.29,3.29,0,0,1-1.59,3L89.12,113.93a3.29,3.29,0,0,1-2,.65,3.07,3.07,0,0,1-.53,0L3.11,105.25A3.28,3.28,0,0,1,0,102V21.78H0A3.28,3.28,0,0,1,2,18.7L43.89.27h0A3.19,3.19,0,0,1,45.63,0l72.5,9.51Zm-37.26,1.7-24.67,14,30.38,3.88,22.5-14.18-28.21-3.7Zm-29,20L50.75,64.62,38.23,56.09,25.72,63.17l2.53-34.91L6.55,25.49V99.05l77.33,8.6V35.36l-32-4.09Zm-19.7-9.09L56.12,8,45.7,6.62,15.24,20l16.95,2.17ZM90.44,34.41v71.12l25.9-15.44-.52-71.68-25.38,16Z" />
                        </svg>
                    </div>
                </div>
                <div className="flex items-center justify-evenly p-6 bg-white w-64 rounded-xl mx-4 mt-2 shadow-lg md:mx-2">
                    <div>
                        <span className="text-sm font-semibold text-gray-400">Out of Stock Products</span>
                        <h1 className="text-2xl font-bold">{stats.outOfStockProduct}</h1>
                    </div>
                    <div>
                        <svg className="h-8 w-8 text-red-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 114.58">
                            <path d="M118.13,9.54a3.25,3.25,0,0,1,2.2.41,3.28,3.28,0,0,1,2,3l.57,78.83a3.29,3.29,0,0,1-1.59,3L89.12,113.93a3.29,3.29,0,0,1-2,.65,3.07,3.07,0,0,1-.53,0L3.11,105.25A3.28,3.28,0,0,1,0,102V21.78H0A3.28,3.28,0,0,1,2,18.7L43.89.27h0A3.19,3.19,0,0,1,45.63,0l72.5,9.51Zm-37.26,1.7-24.67,14,30.38,3.88,22.5-14.18-28.21-3.7Zm-29,20L50.75,64.62,38.23,56.09,25.72,63.17l2.53-34.91L6.55,25.49V99.05l77.33,8.6V35.36l-32-4.09Zm-19.7-9.09L56.12,8,45.7,6.62,15.24,20l16.95,2.17ZM90.44,34.41v71.12l25.9-15.44-.52-71.68-25.38,16Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats;