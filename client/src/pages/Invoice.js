import React from 'react';

const Invoice = () => {
    const referenceId = window.referenceId || '';
    const paidAmount = window.paidAmount || 0;
    const cartItems = window.data || {};

    const cartTotalAmount = Object.values(cartItems).reduce((prev, item) => (
        prev + (item.sellingPrice * item.count)
    ), 0);
    console.log(cartItems);

    // eslint-disable-next-line no-extend-native  
    Date.prototype.yyyymmdd = function () {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();

        return [
            (dd > 9 ? '' : '0') + dd,
            (mm > 9 ? '' : '0') + mm,
            this.getFullYear(),
        ].join('/');
    };

    return (
        <>
            <div id="receipt-content" className="text-left mx-auto w-1/2 text-sm p-6 overflow-auto">
                <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-teal-500 rounded-full inline-block" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <h2 className="text-xl font-semibold">Wine Cave & Drinks</h2>
                    <p>Shop number 8 Nipost shopping mall total roundabout, Nsukka.</p>
                </div>
                <div className="flex mt-4 text-xs">
                    <div className="flex-grow">No: <span x-text="receiptNo">{referenceId}</span></div>
                    <div x-text="receiptDate">{new Date().yyyymmdd()}</div>
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
                                            <td className="py-2 text-center">{index + 1}</td>
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
                        <div x-text="priceFormat(cash)">₦. {paidAmount}</div>
                    </div>
                    <hr className="my-2" />
                    <div className="flex text-xs font-semibold">
                        <div className="flex-grow">BALANCE</div>
                        <div x-text="priceFormat(change)">₦. {paidAmount - cartTotalAmount}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Invoice;