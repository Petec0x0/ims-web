import React, { useEffect, useState } from 'react';
import waitingIllustration from 'images/waiting-for-customer.svg';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // send a get request to the server to fetch Categories
    (async () => {
      const rawResponse = await fetch(`/api/categories`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const content = await rawResponse.json();
      // check if there is an error in the response
      if (content.error) {

      } else {
        // update categories state
        setCategories([...content.data]);
      }
    })();
  }, []);

  return (
    <div className="md:mx-16">
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50 ">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Category Name</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y ">
              {
                (categories.length) ? (
                  categories.map((category, index) => {
                    return (
                      <tr key={index} className="text-gray-700 cursor-pointer hover:bg-gray-200">
                        <td className="px-4 py-3 text-sm">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center text-sm">
                            <div>
                              <p className="font-semibold">{category.categoryName}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {
                            (category.status === 'available') ?
                              <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">{category.status}</span>
                              :
                              <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">{category.status}</span>
                          }
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-4 text-sm">
                            <button className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-teal-600 rounded-lg focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                              </svg>
                            </button>
                            <button className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-teal-600 rounded-lg focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
                              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                ) : ''
              }
            </tbody>
          </table>
          {
            (categories === undefined || categories.length === 0) ? (
              <>
                <h3 className="text-center text-gray-600 p-4 text-lg">Your categories will appear here</h3>
                <div className="flex">
                  <img className="self-center mx-auto" src={waitingIllustration} alt="illustration" />
                </div>
              </>
            ) : ''
          }
        </div>
        <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t bg-gray-50 sm:grid-cols-9 ">
          <span className="flex items-center col-span-3">
            Showing 21-30 of 100
          </span>
          <span className="col-span-2"></span>
          {/* <!-- Pagination --> */}
          <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Table navigation">
              <ul className="inline-flex items-center">
                <li>
                  <button className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-teal" aria-label="Previous">
                    <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
                    </svg>
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 text-white transition-colors duration-150 bg-teal-600 border border-r-0 border-teal-600 rounded-md focus:outline-none focus:shadow-outline-teal">
                    1
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-teal">
                    2
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-teal">
                    3
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-teal">
                    4
                  </button>
                </li>
                <li>
                  <span className="px-3 py-1">...</span>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-teal">
                    8
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-teal">
                    9
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-teal" aria-label="Next">
                    <svg className="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                      <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </span>
        </div>
      </div>
    </div>
  )
}

export default CategoryList;