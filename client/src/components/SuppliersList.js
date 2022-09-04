import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import waitingIllustration from 'images/waiting-for-customer.svg';

const SuppliersList = () => {
  let navigate = useNavigate();
  const [itemDetails, setItemDetails] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleEditModal = (itemDetails = {}) => {
    // update item details based on the selected item
    setItemDetails(itemDetails);
    setIsEditModalOpen(!isEditModalOpen);
  }

  const [supliers, setSupliers] = useState({});

  const handleDeleteItem = (_id) => {
    // make user confirm delete before proceeding
    if (!window.confirm('Are you sure you want to delete this item?')) {
      // exit function if false
      return false;
    }
    const { [_id]: value, ...newDataObj } = supliers;

    // delete suplier from server
    // send a delete request to the server to delete suplier
    (async () => {
      const rawResponse = await fetch('/api/supliers', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ suplierId: _id })
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
        setSupliers({ ...newDataObj });
      }
    })();
  }

  useEffect(() => {
    // send a get request to the server to fetch Suppliers
    (async () => {
      const rawResponse = await fetch(`/api/supliers`, {
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
        // update supliers state
        const dataObj = {};
        content.data.map(item => dataObj[item._id] = item)
        setSupliers({ ...dataObj });
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
                (Object.values(supliers).length) ? (
                  Object.values(supliers).map((suplier, index) => {
                    return (
                      <tr key={index} className="text-gray-700 cursor-pointer hover:bg-gray-200">
                        <td className="px-4 py-3 text-sm">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center text-sm">
                            <div>
                              <p className="font-semibold">{suplier.suplierName}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {suplier.suplierContact}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {
                            (suplier.status === 'available') ?
                              <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">{suplier.status}</span>
                              :
                              <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">{suplier.status}</span>
                          }
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-4 text-sm">
                            <button onClick={() => toggleEditModal(suplier)} className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-teal-600 rounded-lg focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                              </svg>
                            </button>
                            <button onClick={() => handleDeleteItem(suplier._id)} className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-teal-600 rounded-lg focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
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
            (Object.values(supliers) === undefined || Object.values(supliers).length === 0) ? (
              <>
                <h3 className="text-center text-gray-600 p-4 text-lg">Your supliers will appear here</h3>
                <div className="flex">
                  <img className="self-center mx-auto" src={waitingIllustration} alt="illustration" />
                </div>
              </>
            ) : ''
          }
        </div>
      </div>
      <div data-modal-show="true" aria-hidden="true" className={`${isEditModalOpen ? 'flex' : 'hidden'} modal bg-overlay flex flex-col justify-start items-center fixed z-50 h-full w-full inset-0 visible opacity-100 transition-all-300 overflow-auto`}>
        <div className="flex justify-center my-10 w-full">
          <div className="scale-100 w-[900px] min-w-[250px] bg-gray-200 rounded-lg px-3 pb-3 pt-7 mx-3 md:m-5 relative">
            <button onClick={() => toggleEditModal(itemDetails)} className="absolute top-0 right-0 sm:text-white sm:bg-primary sm:hover:bg-teal-500 transition-all-300 sm:top-[-10px] sm:right-[-10px] sm:rounded-lg p-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="block font-bold text-xl">Order Details</span>
                <span className="font-semibold">(#{'kishfi8yh3ibk'})</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline m-1" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                      <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                    </svg>
                    {new Date('2/09/1999').toGMTString()}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-2 sm:p-5">
                <span className="block font-semibold pb-4">Total Summary</span>
                <div className="flex flex-wrap justify-between items-center py-1">
                  <span>Subtotal:</span>
                  <span>
                    ₦{200}
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
                  <span>₦{500}</span>
                </div>
              </div>
              <button onClick={() => toggleEditModal(itemDetails)} className="btn-close-modal btn-effect w-max ml-auto bg-primary text-white uppercase font-bold rounded-lg p-2 px-3" href="/#">
                <span className="text-center">Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {
        isEditModalOpen &&
        <div modal-backdrop="" className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>
      }
    </div>
  )
}

export default SuppliersList;