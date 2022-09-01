import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import waitingIllustration from 'images/waiting-for-customer.svg';

const InventoryList = () => {
    const baseUrl = `${window.location.origin}`;
    let navigate = useNavigate();
    const [isDataReady, setIsDataReady] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // send a get request to the server to fetch products
        (async () => {
            const rawResponse = await fetch('/api/products', {
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
                // update customers
                setProducts([...content.data])
                // stop the progress bar
                setIsDataReady(true);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-full overflow-x-auto">
            <table className="min-w-max w-full table-auto">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Category</th>
                        <th className="py-3 px-6 text-center">Brand</th>
                        <th className="py-3 px-6 text-center">Id</th>
                        <th className="py-3 px-6 text-center">Available</th>
                        <th className="py-3 px-6 text-center">Price</th>
                        <th className="py-3 px-6 text-center">Status</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {
                        // if data is not ready diplay spinners else diplay the table
                        !isDataReady ? (
                            <tr>
                                <td>
                                    <ProgressBar />
                                </td>
                            </tr>
                        ) : (
                            // If there is no customer yet, display a message
                            !(products === undefined || products.length === 0) ? (
                                products.map((product, index) => {
                                    return (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left">
                                                <div className="flex items-center">
                                                    <div className="mr-2">
                                                        <img alt="img" className="w-8 h-8 rounded-md" src={`${baseUrl}/${product.thumbnailPath}`} />
                                                    </div>
                                                    <span>{product.productName}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                <span>{product.categoryId.categoryName}</span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <span>{product.brandId.brandName}</span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <span>{product.referenceId}</span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <span>{product.quantity}</span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <span>NGN {product.sellingPrice}</span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {
                                                    (product.quantity <= 0) ? (
                                                        <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">Out of stock</span>
                                                    ) : (product.quantity <= 5) ? (
                                                        <span className="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs">{product.status}</span>
                                                    ) : (
                                                        <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">{product.status}</span>
                                                    )
                                                }

                                            </td>
                                        </tr>
                                    )
                                })

                            ) : ''

                        )
                    }
                </tbody>
            </table>
            {
                (products === undefined || products.length === 0) ? (
                    <>
                        <h3 className="text-center text-gray-600 p-4 text-lg">Your inventory will appear here</h3>
                        <div className="flex">
                            <img className="self-center mx-auto" src={waitingIllustration} alt="illustration" />
                        </div>
                    </>
                ) : ''
            }
        </div>

    )
}

export default InventoryList;