import React, { useState } from 'react';
import SuppliersList from 'components/SuppliersList';
import AddSuppliers from 'components/AddSuppliers';

const Suppliers = () => {
  const [isAllItems, setIsAllItems] = useState(true);
  const [isAddItem, setIsAddItem] = useState(false);

  const toggleTab = () => {
    setIsAllItems(!isAllItems);
    setIsAddItem(!isAddItem);
  }
  
  return (
    <div className="bg-teal-50 flex-grow py-12 px-10">
      <div className="w-full mt-4 rounded">
        {/* <!-- Tabs --> */}
        <ul id="tabs" className="inline-flex w-full px-1 pt-2 ">
          <li className="px-4 py-2 font-semibold rounded-t">
            <button onClick={toggleTab} className={`${isAllItems ? 'bg-teal-600 text-white' : 'bg-white text-teal-700'} rounded-lg px-7 py-3 font-bold text-sm drop-shadow-lg`}>
              Suppliers
            </button>
          </li>
          <li className="px-4 py-2 font-semibold rounded-t">
            <button onClick={toggleTab} className={`${isAddItem ? 'bg-teal-600 text-white' : 'bg-white text-teal-700'} rounded-lg px-7 py-3 font-bold text-sm drop-shadow-lg`}>
              <span className="align-middle">Add Suppliers</span>
            </button>
          </li>
        </ul>

        {/* <!-- Tab Contents --> */}
        <div id="tab-contents">
          <div className={`${isAllItems ? '' : 'hidden'} p-4`}>
            <SuppliersList />
          </div>
          <div className={`${isAddItem ? '' : 'hidden'} p-4`}>
            <AddSuppliers />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Suppliers;