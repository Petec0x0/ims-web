import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import waitingIllustration from 'images/waiting-for-customer.svg';
import CustomerEditModal from './CustomerEditModal';

const CustomerList = () => {
  let navigate = useNavigate();
  const [itemDetails, setItemDetails] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // states for storing form data
  const [formInputData, setFormInputData] = useState({
    customerContact: '', customerAddress: '',
  });

  const toggleEditModal = (itemDetails = {}) => {
    // update item details based on the selected item
    setItemDetails(itemDetails);
    // update (controlled) input data
    setFormInputData({
      customerContact: itemDetails.customerContact,
      customerAddress: itemDetails.customerAddress,
    });
    // open modal
    setIsEditModalOpen(!isEditModalOpen);
  }

  const [customers, setCustomers] = useState({});

  const handleDeleteItem = (_id) => {
    // make user confirm delete before proceeding
    if (!window.confirm('Are you sure you want to delete this item?')) {
      // exit function if false
      return false;
    }
    const { [_id]: value, ...newDataObj } = customers;

    // delete customer from server
    // send a delete request to the server to delete customer
    (async () => {
      const rawResponse = await fetch('/api/customers', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ customerId: _id })
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
        setCustomers({ ...newDataObj });
      }
    })();
  }

  useEffect(() => {
    // send a get request to the server to fetch Customers
    (async () => {
      const rawResponse = await fetch(`/api/customers`, {
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
        // update customers state
        const dataObj = {};
        content.data.map(item => dataObj[item._id] = item)
        setCustomers({ ...dataObj });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="md:mx-16">
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50 ">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Customer Name</th>
                <th className="px-4 py-3">Customer Contact</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y ">
              {
                (Object.values(customers).length) ? (
                  Object.values(customers).map((customer, index) => {
                    return (
                      <tr key={index} className="text-gray-700 cursor-pointer hover:bg-gray-200">
                        <td className="px-4 py-3 text-sm">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center text-sm">
                            <div>
                              <p className="font-semibold">{customer.customerName}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {customer.customerContact}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {customer.customerAddress}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-4 text-sm">
                            <button onClick={() => toggleEditModal(customer)} className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-teal-600 rounded-lg focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                              </svg>
                            </button>
                            <button onClick={() => handleDeleteItem(customer._id)} className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-teal-600 rounded-lg focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
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
              }
            </tbody>
          </table>
          {
            (Object.values(customers) === undefined || Object.values(customers).length === 0) ? (
              <>
                <h3 className="text-center text-gray-600 p-4 text-lg">Your customers will appear here</h3>
                <div className="flex">
                  <img className="self-center mx-auto" src={waitingIllustration} alt="illustration" />
                </div>
              </>
            ) : ''
          }
        </div>
      </div>

      <CustomerEditModal
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

export default CustomerList;