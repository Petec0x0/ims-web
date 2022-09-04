import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import waitingIllustration from 'images/waiting-for-customer.svg';
import InventoryEditModal from './InventoryEditModal';

const InventoryList = () => {
    const baseUrl = `${window.location.origin}`;
    let navigate = useNavigate();
    const [itemDetails, setItemDetails] = useState({});
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // states for storing form data
    const [formInputData, setFormInputData] = useState({
        productName: '', purchasedPrice: '', sellingPrice: '', quantity: ''
    });

    const toggleEditModal = (itemDetails = {}) => {
        // update item details based on the selected item
        setItemDetails(itemDetails);
        // update (controlled) input data
        setFormInputData({
            productName: itemDetails.productName,
            purchasedPrice: itemDetails.purchasedPrice,
            sellingPrice: itemDetails.sellingPrice,
            quantity: itemDetails.quantity
        });
        // open modal
        setIsEditModalOpen(!isEditModalOpen);
    }

    const [isDataReady, setIsDataReady] = useState(false);
    const [products, setProducts] = useState({});

    const handleDeleteItem = (_id) => {
        // make user confirm delete before proceeding
        if (!window.confirm('Are you sure you want to delete this item?')) {
            // exit function if false
            return false;
        }
        const { [_id]: value, ...newDataObj } = products;

        // delete product from server
        // send a delete request to the server to delete product
        (async () => {
            const rawResponse = await fetch('/api/products', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId: _id })
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
                setProducts({ ...newDataObj });
            }
        })();
    }

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
                const dataObj = {};
                content.data.map(item => dataObj[item._id] = item)
                setProducts({ ...dataObj });
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
                        <th className="py-3 px-6 text-center">Instock</th>
                        <th className="py-3 px-6 text-center">Price</th>
                        <th className="py-3 px-6 text-center">Status</th>
                        <th className="px-4 py-3">Actions</th>
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
                            !(Object.values(products) === undefined || Object.values(products).length === 0) ? (
                                Object.values(products).map((product, index) => {
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
                                                <span>{(product.categoryId) ? product.categoryId.categoryName : '[Deleted]'}</span>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <span>{(product.brandId) ? product.brandId.brandName : '[Deleted]'}</span>
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
                                            <td className="px-4 py-3">
                                                <div className="flex items-center space-x-4 text-sm">
                                                    <button onClick={() => toggleEditModal(product)} className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-teal-600 rounded-lg focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                                                        </svg>
                                                    </button>
                                                    <button onClick={() => handleDeleteItem(product._id)} className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-teal-600 rounded-lg focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
                                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })

                            ) : <tr></tr>

                        )
                    }
                </tbody>
            </table>
            {
                (Object.values(products) === undefined || Object.values(products).length === 0) ? (
                    <>
                        <h3 className="text-center text-gray-600 p-4 text-lg">Your inventory will appear here</h3>
                        <div className="flex">
                            <img className="self-center mx-auto" src={waitingIllustration} alt="illustration" />
                        </div>
                    </>
                ) : ''
            }

            <InventoryEditModal
                toggleEditModal={toggleEditModal}
                itemDetails={itemDetails}
                isEditModalOpen={isEditModalOpen}
                formInputData={formInputData}
                setFormInputData={setFormInputData} />
            {
                isEditModalOpen &&
                <div modal-backdrop="" className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>
            }
        </div>

    )
}

export default InventoryList;