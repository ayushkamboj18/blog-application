import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';


function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  }); 
  
  const notifySuccess = () => toast.success("Registered successfully!");

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
    axios.post('http://localhost:5000/register',formData)
    {
      notifySuccess();
      navigate('/signin')
    }
    }
    catch(err){
      console.log(err);
    }  
  };

  function handleChanges(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleClick() {
    navigate("/Signin");
  }

  return (
    <div>
      <div className="h-screen flex justify-center items-center bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <button className="text-cyan-600" onClick={handleClick}>back to login</button>
        <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* name and email */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChanges}
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="email"
                type="email"
                name="email"
                value={formData.email}
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
                value={formData.password}
                onChange={handleChanges}
                required
              />
            </div>
          </div>
          <button
            className="bg-orange-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default Signup;