import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import waitingIllustration from 'images/waiting-for-customer.svg';

const Sales = () => {
  const baseUrl = `${window.location.origin}`;
  let navigate = useNavigate();

  // eslint-disable-next-line no-extend-native  
  Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('-');
  };

  const [startDate, setStartDate] = useState(`${new Date(new Date().setDate(new Date().getDate() - 5)).yyyymmdd()}`);
  const [endDate, setEndDate] = useState(`${new Date(new Date().setDate(new Date().getDate() + 1)).yyyymmdd()}`);

  const [orderDetails, setOrderDetails] = useState({});
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  const toggleOrderDetails = (orderDetails = {}) => {
    // updsate order details based on user selected order
    setOrderDetails(orderDetails);
    setIsOrderDetailsOpen(!isOrderDetailsOpen);
  }

  /**
 * This function formats date properly
 * similar to diffForHumans() function in Laravel
 */
  const getTimeAgo = (date) => {
    const MINUTE = 60,
      HOUR = MINUTE * 60,
      DAY = HOUR * 24,
      WEEK = DAY * 7,
      MONTH = DAY * 30,
      YEAR = DAY * 365

    const secondsAgo = Math.round((+new Date() - date) / 1000)
    let divisor = null
    let unit = null

    if (secondsAgo < MINUTE) {
      return secondsAgo + " seconds ago"
    } else if (secondsAgo < HOUR) {
      [divisor, unit] = [MINUTE, 'minute']
    } else if (secondsAgo < DAY) {
      [divisor, unit] = [HOUR, 'hour']
    } else if (secondsAgo < WEEK) {
      [divisor, unit] = [DAY, 'day']
    } else if (secondsAgo < MONTH) {
      [divisor, unit] = [WEEK, 'week']
    } else if (secondsAgo < YEAR) {
      [divisor, unit] = [MONTH, 'month']
    } else if (secondsAgo > YEAR) {
      [divisor, unit] = [YEAR, 'year']
    }

    let count = Math.floor(secondsAgo / divisor)
    return `${count} ${unit}${(count > 1) ? 's' : ''} ago`
  }

  useEffect(() => {
    // send a get request to the server to fetch ORDERS
    (async () => {
      const rawResponse = await fetch(`/api/sales?startDate=${startDate}&endDate=${endDate}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
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
        // update orders state
        setOrders([...content.data]);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  return (
    <div className="md:mx-16">
      <div className="w-full overflow-hidden rounded-lg shadow-xs">

        <div className="flex items-center justify-center py-4">
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
              </svg>
            </div>
            <input onChange={(e) => { setStartDate(e.target.value) }} value={startDate} name="startDate" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input" placeholder="Select date start" />
          </div>
          <span className="mx-4 text-gray-500">to</span>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
              </svg>
            </div>
            <input onChange={(e) => { setEndDate(e.target.value) }} value={endDate} name="endDate" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input" placeholder="Select date end" />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50 ">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Reference</th>
                <th className="px-4 py-3">Total Payment</th>
                {/* <th className="px-4 py-3">Payment Status</th> */}
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y ">
              {
                (orders.length) ? (
                  orders.map((order, index) => {
                    return (
                      <tr key={index} onClick={() => toggleOrderDetails({ ...order, index: index })} className="text-gray-700 cursor-pointer hover:bg-gray-200">
                        <td className="px-4 py-3 text-sm">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center text-sm">
                            <div>
                              <p className="font-semibold">#{order.referenceId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          ₦{order.grandTotal}
                        </td>
                        {/* <td className="px-4 py-3 text-xs">
                          {
                            (order.payment.status === 'success') ? (
                              <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                                Completed
                              </span>
                            ) : (
                              <span className="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">
                                Pending
                              </span>
                            )
                          }
                        </td> */}
                        <td className="px-4 py-3 text-sm">
                          {getTimeAgo(new Date(order.createdAt))}
                        </td>
                      </tr>
                    )
                  })
                ) : <tr></tr>
              }
            </tbody>
          </table>
          {
            (orders === undefined || orders.length === 0) ? (
              <>
                <h3 className="text-center text-gray-600 p-4 text-lg">Your sales will appear here</h3>
                <div className="flex">
                  <img className="self-center mx-auto" src={waitingIllustration} alt="illustration" />
                </div>
              </>
            ) : ''
          }
        </div>

        {/* // render only when or has a value */}
        {
          !!(Object.values(orderDetails).length) &&
          <div data-modal-show="true" aria-hidden="true" className={`${isOrderDetailsOpen ? 'flex' : 'hidden'} modal bg-overlay flex flex-col justify-start items-center fixed z-50 h-full w-full inset-0 visible opacity-100 transition-all-300 overflow-auto`}>
            <div className="flex justify-center my-10 w-full">
              <div className="scale-100 w-[900px] min-w-[250px] bg-gray-200 rounded-lg px-3 pb-3 pt-7 mx-3 md:m-5 relative">
                <button onClick={() => toggleOrderDetails(orderDetails)} className="absolute top-0 right-0 sm:text-white sm:bg-primary sm:hover:bg-teal-500 transition-all-300 sm:top-[-10px] sm:right-[-10px] sm:rounded-lg p-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </button>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="block font-bold text-xl">Order Details</span>
                    <span className="font-semibold">(#{orderDetails.referenceId})</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline m-1" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                          <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                        </svg>
                        {new Date(orderDetails.createdAt).toGMTString()}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-2 sm:p-5">
                    <span className="block font-semibold pb-4">Products</span>
                    <div className="max-h-[300px] overflow-auto">
                      {
                        orderDetails.sales.map((item, index) => {
                          return (
                            <span key={index} className="cursor-pointer bg-white hover:bg-gray-100 flex flex-col sm:flex-row justify-between items-center gap-5 w-full p-2" href="/#">
                              <div className="border rounded-lg h-[40px] w-[40px] min-w-[40px] overflow-hidden">
                                <img className="w-full h-full object-cover" src={`${baseUrl}/${(item.productId) ? item.productId.thumbnailPath : '[Deleted]'}`} alt="product" />
                              </div>
                              <div className="flex flex-col w-full">
                                <h6 className="font-semibold text-lg clamp-2 break-all">{(item.productId) ? item.productId.productName : '[Deleted]'}</h6>
                                <div className="flex gap-2">
                                  <div className="flex gap-1 leading-7 text-gray-400">
                                    <span>{item.quantity}</span>
                                    <span>X</span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="font-bold text-primary">₦{(item.productId) ? item.productId.sellingPrice : '[Deleted]'}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="font-bold">Total:</span>
                                  <span>₦{item.subTotal}</span>
                                </div>
                              </div>
                            </span>
                          )
                        })
                      }
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-2 sm:p-5">
                    <span className="block font-semibold pb-4">Total Summary</span>
                    <div className="flex flex-wrap justify-between items-center py-1">
                      <span>Subtotal:</span>
                      <span>
                        ₦{
                          orderDetails.sales.reduce((prev, item) => (
                            prev + (item.subTotal)
                          ), 0)
                        }
                      </span>
                    </div>
                    <div className="flex flex-wrap justify-between items-center py-1">
                      <span>Discount:</span>
                      <span>
                        ₦0
                      </span>
                    </div>
                    <div className="flex flex-wrap justify-between items-center font-bold py-1">
                      <span>Total Cost:</span>
                      <span>₦{orderDetails.grandTotal}</span>
                    </div>
                  </div>
                  <button onClick={() => toggleOrderDetails(orderDetails)} className="btn-close-modal btn-effect w-max ml-auto bg-primary text-white uppercase font-bold rounded-lg p-2 px-3" href="/#">
                    <span className="text-center">Close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        }

        {
          isOrderDetailsOpen &&
          <div modal-backdrop="" className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>
        }
      </div>
    </div>
  )
}

export default Sales;