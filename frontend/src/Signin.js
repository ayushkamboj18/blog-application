import React from 'react';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';


function Signin() {
  const REACT_APP_API_KEY = process.env.REACT_APP_API;

  const navigate = useNavigate();
  const { login } = useAuth();
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const notifySuccess = () => toast.success("Logged in successfully!");
  const notifyError = (message) => toast.error(message);

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const result = await axios.post(`${REACT_APP_API_KEY}/login`, formdata)
      if (result.status === 200) {
        const userdata = result.data.user.name;
        login(userdata);
        notifySuccess();
        navigate('/');
      }
    }  
    catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        if (status === 401) {
          notifyError("Password is incorrect");
        } else if (status === 404) {
          notifyError("User does not exist");
        } else {
          notifyError(data.message || "Login failed!");
        }
      } else {
        console.error(err);
      }
    }
  };

  function handleChanges(e) {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  }

  function handleClick() {
    navigate("/Signup");
  }

  return (
    <>
      <div className="h-screen flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 p-8">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4">Sign In</h2>

          <form onSubmit={handleLogin}>
            <div className="flex flex-wrap -mx-3 mb-6">
              {/* email */}
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="email"
                  type="email"
                  name="email"
                  value={formdata.email}
                  onChange={handleChanges}
                  required
                />
              </div>
            </div>
            {/* password */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="password"
                  type="password"
                  name="password"
                  value={formdata.password}
                  onChange={handleChanges}
                  required
                />
              </div>
            </div>
            <button
              className="bg-orange-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Sign In
            </button>
          </form>
      

          <div className="text-center mt-4">
            <h1 className="mb-4 text-xl">Don't have an account?</h1>
            <button
              className="bg-orange-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleClick}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
