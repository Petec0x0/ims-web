import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Alert from './Alert';
import ProgressBar from './ProgressBar';

const BrandEditModal = ({ toggleEditModal, itemDetails, isEditModalOpen, formInputData, setFormInputData }) => {
    const navigate = useNavigate();
    const refreshPage = () => {
        navigate(0);
    }
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
        if (formInputData.status === '') {
            setAlertMsg({ msg: "Please fill all the required fields", color: 'red' });
            setError(true);
            return false;
        }
        setError(false);
        setSubmitted(true);
        // send a patch request to the server to update product
        (async () => {
            const rawResponse = await fetch('/api/brands', {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    brandId: itemDetails._id,
                    ...formInputData
                })
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
                refreshPage();
            }
        })();
    }

    return (
        <>
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
                                <span className="block font-bold text-xl">{itemDetails.brandName}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-400 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline m-1" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                                            <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                        </svg>
                                        {new Date(itemDetails.createdAt).toGMTString()}
                                    </span>
                                </div>
                            </div>
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
                            <div className="bg-white rounded-lg p-2 sm:p-5">
                                <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                                    <div className="w-full flex flex-col mb-3">
                                        <label className="font-semibold text-gray-600 py-2">Brand Status <abbr title="required">*</abbr></label>
                                        <select onChange={handleFormInput} className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full " required="required" name="status">
                                            <option value="">Select status</option>
                                            <option value="available">Available</option>
                                            <option value="unavailable">Unavailable</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                                    <button onClick={handleSubmit} className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">Save</button>
                                </div>
                            </div>
                            <button onClick={() => toggleEditModal(itemDetails)} className="btn-close-modal btn-effect w-max ml-auto bg-primary text-white uppercase font-bold rounded-lg p-2 px-3" href="/#">
                                <span className="text-center">Close</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BrandEditModal;