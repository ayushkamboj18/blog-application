import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateBlogPost = () => {
  const REACT_APP_API_KEY = process.env.REACT_APP_API;

  const location = useLocation();
  const navigate = useNavigate();
  const { title: previousTitle } = location.state || {};

  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_KEY}/blog`, {
          params: { title: previousTitle }
        });
        setFormData(response.data);
      } catch (err) {
        console.log('Error in fetching blog data', err);
      }
    };

    fetchBlogData();
  }, [previousTitle]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      previousTitle: previousTitle,
      title: formData.title,
      content: formData.content
    };
    try {
      const result = await axios.post(`${REACT_APP_API_KEY}/update`, updatedData);
      if (result.data === "success") {
        toast.success("Blog updated successfully!");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mx-auto p-20 bg-slate-800 text-white">
      <h1 className="text-4xl font-bold text-center text-orange-500 mb-6">
        Update Blog Post
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-white">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-black"
            required
          />
        </div>
        {/* Image Upload */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-white">
            Image Upload
          </label>
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            onChange={handleChange}
            className="block text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600"
            accept="image/*"
          />
        </div>
        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-white">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="10"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-black"
            required
          ></textarea>
        </div>
        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlogPost;
