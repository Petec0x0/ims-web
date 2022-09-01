import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from 'components/ProgressBar';

const Cart = () => {
    const baseUrl = `${window.location.origin}`;
    let navigate = useNavigate();
    const [queryItems, setQueryItems] = useState([]);
    const [queryString, setQueryString] = useState('');

    const handleSearchItem = (e) => {
        const query = e.target.value;
        setQueryString(e.target.value);
        // exit function if query is empty
        if (!query) {
            // empty query items list
            setQueryItems([]);
            return false;
        }

        // send a get request to the server to fetch products
        (async () => {
            const rawResponse = await fetch(`/api/products/search?query=${query}`, {
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
                // update products
                setQueryItems([...content.data]);
            }
        })();
    }

    const [cartItems, setCartItems] = useState({});

    const handleAddToCart = (item) => {
        // empty query items list
        setQueryItems([]);
        setQueryString('');
        // add quantity 1 to any selected item
        item.count = 1;
        setCartItems({
            ...cartItems,
            [item._id]: item
        });
    }

    const cartTotalAmount = Object.values(cartItems).reduce((prev, item) => (
        prev + (item.sellingPrice * item.count)
    ), 0);

    const handleItemCountChange = (event, _id) => {
        setCartItems({
            ...cartItems,
            [_id]: {
                ...cartItems[_id],
                count: event.target.value
            }
        });
    }

    const handleLeaveCountChange = (event, _id) => {
        // if count is less than 1 update it to 1
        if (!(event.target.value) || (event.target.value < 1)) {
            setCartItems({
                ...cartItems,
                [_id]: {
                    ...cartItems[_id],
                    count: 1
                }
            });
        }
    }

    const handleRemoveFromCart = (_id) => {
        // destructure assignment
        const { [_id]: value, ...otherItems } = cartItems;
        setCartItems({ ...otherItems });
    }

    // for monitoring when a http request is sent
    const [submitted, setSubmitted] = useState(false);

    const handleSaveOrder = (e) => {
        e.preventDefault();
        // make sure cartItems is not empty before continuing
        if (!Object.values(cartItems).length) {
            // exit function
            return false;
        }

        // prepare the post data
        // "products"
        const sales = Object.values(cartItems).map(item => {
            return {
                referenceId: `SA${(new Date()).getTime().toString()}`,
                productId: item._id,
                quantity: (item.count > 0) ? item.count : 1,
                subTotal: (item.sellingPrice * item.count),
            }
        });

        setSubmitted(true);
        // send a post request to the server
        (async () => {
            const rawResponse = await fetch('/api/sales', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        referenceId: `ORD${(new Date()).getTime().toString()}`,
                        customerId: null,
                        grandTotal: cartTotalAmount,
                        sales: sales
                    }
                )
            });
            const content = await rawResponse.json();
            // stop the progress bar
            setSubmitted(false);
            // check if there is an error in the response
            if (content.error) {
                alert(content.message);
            } else {
                const WinPrint = window.open(`${baseUrl}/invoice/ORD${(new Date()).getTime().toString()}`, '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
                WinPrint.data = cartItems;
                setCartItems({});
            }
        })();
    }

    return (
        <div className="px-4 py-1">

            <div className="bg-gray-50 py-1 flex flex-col items-center justify-center overflow-hidden">
                <input
                    onChange={handleSearchItem}
                    value={queryString}
                    type="search" placeholder="Search Here..."
                    className="py-3 px-4 w-full rounded shadow font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-200 duration-100 shadow-gray-100 lg:w-1/2" />

                <ul className="w-1/2">
                    {
                        // map through returned searched items
                        queryItems.map((item, index) => {
                            return (
                                <li key={index}
                                    onClick={() => handleAddToCart(item)}
                                    className="cursor-pointer w-full text-gray-700 p-4 mt-2 bg-white">
                                    {item.productName}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            <form className="grid grid-cols-12 gap-5 bg-white rounded-lg p-2 xs:p-5" action="#">
                <div className="col-span-12 lg:col-span-8">
                    {/* <!-- Element Responsive --> */}
                    {
                        Object.values(cartItems).map((item, index) => {
                            return (
                                <div key={index} className="flex flex-col xs:flex-row lg:hidden gap-2 w-full p-2 transition-all-300 hover:bg-gray-100">
                                    <div className="content flex items-center">
                                        <div className="flex items-center">
                                            <div className="border rounded-lg h-[30px] w-[30px] min-w-[30px] overflow-hidden">
                                                <span >
                                                    <img className="w-full h-full object-cover" src={`${baseUrl}/${item.thumbnailPath}`} alt="product" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2 w-full">
                                        <div className="flex flex-col gap-2 w-full">
                                            <div className="content">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-light xs:hidden">{item.productName}</span>
                                                    <span className="font-bold clamp-2 break-all" >{item.productName}</span>
                                                </div>
                                            </div>
                                            <div className="content">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-light lg:hidden">Unit Price</span>
                                                    <div className="flex gap-2 items-center">
                                                        <span className="font-bold text-primary">₦{item.sellingPrice}</span>
                                                        <small className="text-xs text-primary line-through">₦{item.mainPrice}</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-light">Subtotal</span>
                                                    <span className="font-bold text-primary">₦{item.sellingPrice * item.count}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content flex items-center">
                                            <div className="flex items-center gap-x-4 gap-y-1">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-light">Quantity</span>
                                                    <div className="quantity inline-flex bg-white rounded-lg shadow">
                                                        <input
                                                            onBlur={(e) => handleLeaveCountChange(e, item._id)}
                                                            onChange={(e) => handleItemCountChange(e, item._id)}
                                                            className="quantity-value input-number w-12 text-center text-lg p-1 bg-transparent text-gray-400 border-none focus:ring-0 focus:border-none"
                                                            type="number"
                                                            min="1"
                                                            value={item.count} />
                                                    </div>
                                                </div>
                                                <div onClick={() => handleRemoveFromCart(item._id)} className="tippy tippy-remove text-slate-400 hover:text-primary cursor-pointer transition-all-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash fill-current" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {/* <!-- Element Desktop --> */}
                    <div className="overflow-x-auto hidden lg:block">
                        <table className="w-full min-w-[800px] text-left table-auto">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className="p-2">Product Name</th>
                                    <th className="p-2">Unit Price</th>
                                    <th className="p-2">Quantity</th>
                                    <th className="p-2">Subtotal</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.values(cartItems).map((item, index) => {
                                        return (
                                            <tr key={index} className="hover:bg-gray-100">
                                                <td className="p-2">
                                                    <div className="border rounded-lg h-[30px] w-[30px] min-w-[30px] overflow-hidden">
                                                        <span >
                                                            <img className="w-full h-full object-cover" src={`${baseUrl}/${item.thumbnailPath}`} alt={item.productName} />
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-2">
                                                    <span className="font-bold clamp-2 break-all" >{item.productName}</span>
                                                </td>
                                                <td className="p-2">
                                                    <span className="font-bold text-primary">₦{item.sellingPrice}</span>
                                                </td>
                                                <td className="p-2">
                                                    <div className="quantity inline-flex bg-white rounded-lg shadow">
                                                        <input
                                                            onBlur={(e) => handleLeaveCountChange(e, item._id)}
                                                            onChange={(e) => handleItemCountChange(e, item._id)}
                                                            className="quantity-value input-number w-12 text-center text-lg p-1 bg-transparent text-gray-400 border-none focus:ring-0 focus:border-none"
                                                            type="number"
                                                            min="1"
                                                            value={item.count} />
                                                    </div>
                                                </td>
                                                <td className="p-2">
                                                    <span className="font-bold text-primary">₦{item.sellingPrice * item.count}</span>
                                                </td>
                                                <td className="p-2">
                                                    <div onClick={() => handleRemoveFromCart(item._id)} className="tippy tippy-remove btn-delete text-slate-400 hover:text-primary transition-all-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash fill-current" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                        </svg>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-4">
                    <div className="border-2 rounded-lg p-4">
                        <span className="font-bold text-lg text-center inline-block mb-10">Summary of your purchase:</span>
                        <div className="py-4">
                            <div className="flex justify-between my-2">
                                <span>Subtotal:</span>
                                <span>₦{cartTotalAmount}</span>
                            </div>
                            <div className="flex justify-between my-2">
                                <span>Vat:</span>
                                <span>₦0.00</span>
                            </div>
                            <div className="flex justify-between my-2">
                                <span>Discount:</span>
                                <span>₦0.00</span>
                            </div>
                        </div>
                        <div className="uppercase flex justify-between font-bold text-xl py-4 border-t-2 border-gray-200">
                            <span>Total:</span>
                            <span>₦{cartTotalAmount}</span>
                        </div>

                        {
                            // show the progress bar if data is submited and being processed
                            (submitted) ? (
                                <ProgressBar />
                            ) : ""
                        }
                        <button onClick={handleSaveOrder} className="btn-view-shopping-cart btn-effect flex justify-center items-center w-full p-2 bg-primary rounded-lg transition-all-300">
                            <span className="font-bold uppercase text-white">Save & View</span>
                        </button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Cart;