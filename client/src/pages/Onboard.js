import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from 'components/Alert';
import ProgressBar from 'components/ProgressBar';

const Onboard = () => {
  let navigate = useNavigate();

  // States for registration
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState('');

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErroMsg] = useState("");

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the organization change
  const handleOrgaization = (e) => {
    setOrganization(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '' || organization === '') {
      setErroMsg("Please fill all the fields");
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
      // send a post request to the server
      (async () => {
        const rawResponse = await fetch('/api/auth/onboard', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              username: name,
              email: email,
              password: password,
              organizationName: organization
            }
          )
        });
        const content = await rawResponse.json();
        // stop the progress bar
        setSubmitted(false);
        // check if there is an error in the response
        if (content.error) {
          setErroMsg(content.message);
          setError(true);
        } else {
          // redirect to login page
          navigate("/login?signupSuccess=true");
        }
      })();
    }
  }

  return (
    // < !--component -- >
    <div className="mx-auto max-w-6xl p-12">
      <div className="flex flex-col md:flex-row justify-center">
        <div className="md:w-1/2 max-w-md flex flex-col justify-center">
          <div className="md:text-4xl text-xl font-black text-white">Maximize your warehouse efficiency</div>
          <div className="text-xl mt-4 text-white">Unleash your growth potential</div>
          <p className="text-white">Already have an account? <Link className="text-red-500" to="/login">Login</Link></p>
        </div>
        <div className="flex justify-start mt-5 md:justify-end w-full md:w-1/2">
          <div className="bg-white shadow-md flex-auto max-w-sm p-10 pb-20">
            <div className="w-full">
              <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase"><span className="text-red-400 mr-1">*</span> Full Name</div>
              <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                <input onChange={handleName} value={name} placeholder="Jhon Doe" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
              </div>
            </div>
            <div className="w-full">
              <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase"><span className="text-red-400 mr-1">*</span> Email</div>
              <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                <input onChange={handleEmail} value={email} placeholder="jhon@doe.com" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
              </div>
            </div>
            <div className="w-full">
              <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase"><span className="text-red-400 mr-1">*</span>Password</div>
              <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                <input onChange={handlePassword} value={password} placeholder="**********" type="password" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
              </div>
            </div>
            <div className="w-full">
              <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase"><span className="text-red-400 mr-1">*</span>Organization</div>
              <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                <input onChange={handleOrgaization} value={organization} placeholder="Two Star Hotel" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
              </div>
            </div>

            {
              // show the alert message if the fields are left empty
              (error) ? (
                <Alert errorMsg={errorMsg} color="red" />
              ) : ""
            }

            {
              // show the progress bar if data is submited and being processed
              (submitted) ? (
                <ProgressBar />
              ) : ""
            }

            <div className="mt-6 relative">
              <div className="shadow-md font-medium py-2 px-4 text-green-100
                  cursor-pointer bg-teal-600 rounded text-lg tr-mt  absolute text-center w-full"
                onClick={handleSubmit}
              >
                Submit
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Onboard;