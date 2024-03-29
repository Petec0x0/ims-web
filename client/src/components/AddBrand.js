import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Alert from './Alert';
import ProgressBar from './ProgressBar';

const AddBrand = () => {
  const navigate = useNavigate();
  const refreshPage = () => {
    navigate(0);
  }
  // states for storing form data
  const [formInputData, setFormInputData] = useState({
    brandName: '', status: ''
  });
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ msg: '', color: '' });

  const handleFormInput = (e) => {
    setFormInputData({
      ...formInputData,
      [e.target.name]: e.target.value
    });
  }

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // make sure none of the inputs is empty
    if (formInputData.brandName === '' || formInputData.status === '') {
      setAlertMsg({ msg: "Please fill all the required fields", color: 'red' });
      setError(true);
    } else {
      setError(false);
      setSubmitted(true);

      // send form data as post request to the server
      (async () => {
        const rawResponse = await fetch('/api/brands', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formInputData)
        });
        const content = await rawResponse.json();
        // stop the progress bar
        setSubmitted(false);
        // check if there is an error in the response
        if (content.error) {
          setAlertMsg({ msg: content.message, color: 'red' });
          setError(true);
        } else {
          setAlertMsg({ msg: content.message, color: 'green' });
          setError(true);
          // refresh page
          refreshPage();
        }
      })();
    }
  }

  return (
    <>
      <div className="w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
        <div className="grid  gap-8 grid-cols-1">
          <div className="flex flex-col ">
            <div className="form">
              {
                // show the alert message if the fields are left empty
                (error) ? (
                  <Alert errorMsg={alertMsg.msg} color={alertMsg.color} />
                ) : ""
              }
              {
                // show the progress bar if data is submited and being processed
                (submitted) ? (
                  <ProgressBar />
                ) : ""
              }

              <div className="md:w-4/5 mx-auto">
                <div className="flex flex-wrap -m-2">
                  <div className="p-2 md:w-1/2">
                    <div className="relative">
                      <label htmlFor="name" className="leading-7 text-sm text-gray-600">Brand Name</label>
                      <input onChange={handleFormInput} type="text" id="brandName" name="brandName" className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" />
                    </div>
                  </div>
                  <div className="p-2 md:w-1/2">
                    <div className="relative">
                      <label htmlFor="message" className="leading-7 text-sm text-gray-600">Status</label>
                      <select onChange={handleFormInput} type="text" id="status" name="status" className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4">
                        <option value="">Select status</option>
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                      </select>
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <button onClick={handleSubmit} className="flex mx-auto text-white bg-primary border-0 py-2 px-8 focus:outline-none hover:bg-primary rounded text-lg">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddBrand;