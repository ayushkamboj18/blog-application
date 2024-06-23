import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { toast } from 'react-toastify';

const Profile = () => {
  const REACT_APP_API_KEY = process.env.REACT_APP_API;

  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: ''
  });
  const [blogHistory, setBlogHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_KEY}/profile`, {
          params: { user }
        });
        setProfile(response.data);
      } catch (err) {
        console.log('Error in fetching profile info', err);
      }
    };

    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_KEY}/history`, {
          params: { user }
        });
        setBlogHistory(response.data);
      } catch (err) {
        console.log('Error in fetching blog history', err);
      }
    };

    fetchProfile();
    fetchHistory();
  }, [user]);

  const notifySuccess = () => toast.success("Blog deleted!");

  const handleDelete = async (title) => {
    try {
      await axios.delete(`${REACT_APP_API_KEY}/delete`, { data: { title } });
      notifySuccess();
      setBlogHistory(blogHistory.filter(blog => blog.title !== title));
    } catch (error) {
      console.log('Error deleting blog', error);
    }
  };

  const handleUpdate = (blog) => {
    navigate('/updateblogpost', { state: { title: blog.title } });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-red-400 to-pink-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">Profile</h2>
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <h3 className="text-2xl font-semibold text-gray-800 mr-2">Name:</h3>
            <p className="text-gray-600 text-lg">{profile.name}</p>
          </div>
          <div className="flex items-center">
            <h3 className="text-2xl font-semibold text-gray-800 mr-2">Email:</h3>
            <p className="text-gray-600 text-lg">{profile.email}</p>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Blog History:</h3>
          <ul className="space-y-4">
            {blogHistory.map((blog, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <div className='flex justify-between cursor-pointer'>
                  <h4 className="text-xl font-semibold text-gray-700">{blog.title}</h4>
                  <div className='flex'>
                    <GrUpdate onClick={() => handleUpdate(blog)} className='text-2xl mr-4 hover:text-blue-600 cursor-pointer' />
                    <MdDelete onClick={() => handleDelete(blog.title)} className="text-2xl hover:text-red-600 cursor-pointer" />
                  </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
