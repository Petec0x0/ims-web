import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from 'components/Alert';
import ProgressBar from 'components/ProgressBar';

const Login = () => {
  let navigate = useNavigate();

  // show a success alert message if signupSuccess
  // exists in the query parameter
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let signupSuccess = params.get('signupSuccess');

  // States for the login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErroMsg] = useState("");

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

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setErroMsg("Please enter all the fields");
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
      // send a post request to the server
      (async () => {
        const rawResponse = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email, password: password })
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
          navigate("/dashboard/overview");
        }
      })();
    }
  }

  return (
    // < !--component -- >
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div
          className="absolute inset-0 bg-gradient-to-r from-teal-300 to-teal-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Login</h1>
            </div>

            {
              // show a success alert message if signupSuccess
              // exists in the query parameter
              (signupSuccess) ? (
                <div className="pt-2">
                  <Alert
                    errorMsg='Onboarded successflly. Login to continue.'
                    color="green"
                  />
                </div>
              ) : ""
            }

            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input onChange={handleEmail} value={email} autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                  <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                </div>
                <div className="relative">
                  <input onChange={handlePassword} value={password}  autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                  <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
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

                <div className="relative">
                  <button onClick={handleSubmit} className="bg-teal-500 text-white rounded-md px-2 py-1">Submit</button>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p>New user? <Link className="text-blue-700" to="/onboard">Onboard yourself</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
