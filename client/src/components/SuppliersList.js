import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import waitingIllustration from 'images/waiting-for-customer.svg';
import SupplierEditModal from './SupplierEditModal';

const SuppliersList = () => {
  let navigate = useNavigate();
  const [itemDetails, setItemDetails] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // states for storing form data
  const [formInputData, setFormInputData] = useState({
    supplierContact: '', status: '',
  });

  const toggleEditModal = (itemDetails = {}) => {
    // update item details based on the selected item
    setItemDetails(itemDetails);
    // update (controlled) input data
    setFormInputData({
      supplierContact: itemDetails.supplierContact,
      status: itemDetails.status,
    });
    // open modal
    setIsEditModalOpen(!isEditModalOpen);
  }

  const [suppliers, setSuppliers] = useState({});

  const handleDeleteItem = (_id) => {
    // make user confirm delete before proceeding
    if (!window.confirm('Are you sure you want to delete this item?')) {
      // exit function if false
      return false;
    }
    const { [_id]: value, ...newDataObj } = suppliers;

    // delete supplier from server
    // send a delete request to the server to delete supplier
    (async () => {
      const rawResponse = await fetch('/api/suppliers', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ supplierId: _id })
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
        setSuppliers({ ...newDataObj });
      }
    })();
  }

  useEffect(() => {
    // send a get request to the server to fetch Suppliers
    (async () => {
      const rawResponse = await fetch(`/api/suppliers`, {
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
        // update suppliers state
        const dataObj = {};
        content.data.map(item => dataObj[item._id] = item)
        setSuppliers({ ...dataObj });
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
                <th className="px-4 py-3">Supplier Name</th>
                <th className="px-4 py-3">Supplier Contact</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y ">
              {
                (Object.values(suppliers).length) ? (
                  Object.values(suppliers).map((supplier, index) => {
                    return (
                      <tr key={index} className="text-gray-700 cursor-pointer hover:bg-gray-200">
                        <td className="px-4 py-3 text-sm">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center text-sm">
                            <div>
                              <p className="font-semibold">{supplier.supplierName}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {supplier.supplierContact}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {
                            (supplier.status === 'available') ?
                              <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">{supplier.status}</span>
                              :
                              <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">{supplier.status}</span>
                          }
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-4 text-sm">
                            <button onClick={() => toggleEditModal(supplier)} className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-teal-600 rounded-lg focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                              </svg>
                            </button>
                            <button onClick={() => handleDeleteItem(supplier._id)} className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-teal-600 rounded-lg focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
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
            (Object.values(suppliers) === undefined || Object.values(suppliers).length === 0) ? (
              <>
                <h3 className="text-center text-gray-600 p-4 text-lg">Your suppliers will appear here</h3>
                <div className="flex">
                  <img className="self-center mx-auto" src={waitingIllustration} alt="illustration" />
                </div>
              </>
            ) : ''
          }
        </div>
      </div>

      <SupplierEditModal
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

export default SuppliersList;