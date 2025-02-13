import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to verify token and set session values
  const tokenverify = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users/verifytoken', {
        withCredentials: true, // Ensure cookies are sent
      });

      if (response.data) {
        sessionStorage.setItem('userId', response.data.data.id);
        sessionStorage.setItem('email', response.data.data.email);
      }
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Login request
      const response = await axios.post('http://localhost:3000/users/login', {
        email,
        password,
      });

      // console.log(response.data);
      
      // Set token in cookies
      Cookies.set('token', response.data.token, { expires: 1 });
      if(response.data.isadmin){ 
        navigate('/admin');
      }
     else{
       // Verify token and set session values
       await tokenverify();

       // Redirect to home page
       navigate('/');
     }
    } catch (err) {
      console.error(err);
      setError('Invalid credentials'); // Set error message on failure
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold text-amber-900">Login</h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="userId"
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-800 hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;