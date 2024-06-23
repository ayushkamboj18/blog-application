import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

function BlogForm() {
  const REACT_APP_API_KEY = process.env.REACT_APP_API;

  const navigate = useNavigate();
  const {user} = useAuth()

  const notifySuccess = () => toast.success("Blog Created");

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    content: "",
    author:user
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post(`${REACT_APP_API_KEY}/new`, formData)
      .then((result) => {
        if (result.data === "success") {
          console.log("successfully published");
        }
        notifySuccess();
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mx-auto p-20 bg-slate-800 text-white">
      <h1 className="text-4xl font-bold text-center text-orange-500 mb-6">
        Create a New Blog Post
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-white"
          >
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
        {/* picture upload */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-white"
          >
            Image Upload
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="block text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600"
            accept="image/*"
            required
          />
        </div>
        {/* blog content */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-white"
          >
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
        {/* publish button */}
        <div className="text-center">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default BlogForm;
