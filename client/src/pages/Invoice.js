import React from 'react';

const Invoice = () => {
    const cartItems = window.data || {};
    const cartTotalAmount = Object.values(cartItems).reduce((prev, item) => (
        prev + (item.sellingPrice * item.count)
    ), 0);
    console.log(cartItems);

    return (
        <>
            <div id="receipt-content" className="text-left mx-auto w-1/3 text-sm p-6 overflow-auto">
                <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-teal-500 rounded-full inline-block" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <h2 className="text-xl font-semibold">WCD</h2>
                    <p>CABANG KONOHA SELATAN</p>
                </div>
                <div className="flex mt-4 text-xs">
                    <div className="flex-grow">No: <span x-text="receiptNo">TWPOS-KS-1661881019</span></div>
                    <div x-text="receiptDate">30/08/22 18.36</div>
                </div>
                <hr className="my-2" />
                <div>
                    <table className="w-full text-xs">
                        <thead>
                            <tr>
                                <th className="py-1 w-1/12 text-center">#</th>
                                <th className="py-1 text-left">Item</th>
                                <th className="py-1 w-2/12 text-center">Qty</th>
                                <th className="py-1 w-3/12 text-right">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                // check if data is available
                                !!Object.values(cartItems).length &&
                                Object.values(cartItems).map((item, index) => {
                                    return (
                                        <tr key={index} className="even:bg-gray-100 odd:bg-gray-200">
                                            <td className="py-2 text-center">{index+1}</td>
                                            <td className="py-2 text-left">
                                                <span x-text="item.name">{item.productName}</span>
                                                <br />
                                                <small x-text="priceFormat(item.price)">₦. {item.sellingPrice}</small>
                                            </td>
                                            <td className="py-2 text-center" x-text="item.qty">{item.count}</td>
                                            <td className="py-2 text-right" x-text="priceFormat(item.qty * item.price)">₦. {item.sellingPrice * item.count}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <hr className="my-2" />
                <div>
                    <div className="flex font-semibold">
                        <div className="flex-grow">TOTAL</div>
                        <div x-text="priceFormat(getTotalPrice())">₦. {cartTotalAmount}</div>
                    </div>
                    <div className="flex text-xs font-semibold">
                        <div className="flex-grow">PAY AMOUNT</div>
                        <div x-text="priceFormat(cash)">₦. 100.000</div>
                    </div>
                    <hr className="my-2" />
                    <div className="flex text-xs font-semibold">
                        <div className="flex-grow">CHANGE</div>
                        <div x-text="priceFormat(change)">₦. 70.000</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Invoice;