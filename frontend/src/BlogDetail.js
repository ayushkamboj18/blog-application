import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "./AuthContext";
import { useNavigate } from 'react-router-dom';
import { ShimmerSectionHeader } from "react-shimmer-effects";


function BlogList() {
  const REACT_APP_API_KEY = process.env.REACT_APP_API;
  const navigate = useNavigate();
  const { id } = useParams();
  const {user} = useAuth();
  const [blogs, setBlogs] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ comment: "" ,author: user, createdAt: Date});

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_KEY}/blogs/${id}`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_KEY}/blogs/${id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(user){
        await axios.post(`${REACT_APP_API_KEY}/blogs/${id}/comments`, newComment);
        fetchComments(); // Refresh comments
      }
      else{
        navigate('/signin');
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (!blogs) {
    return (
      <div className="container mx-auto p-4">
        <ShimmerSectionHeader />
        <ShimmerSectionHeader center />
        <ShimmerSectionHeader center />
        <ShimmerSectionHeader center />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center">Blog Posts</h1>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <h1 className="text-4xl mb-3 font-bold text-orange-600">{blogs.title}</h1>
        <p className="text-gray-600 mb-2">
          By: <strong className="text-orange-500">{blogs.author}</strong> on {new Date(blogs.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
        <div className="bg-slate-100 p-5 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4 text-xl leading-9">
            {blogs.content}
          </p>
        </div>
      </div>

      {/* comments section */}

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Leave a Comment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              value={newComment.comment}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              // onClick={handleCommentSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="containerayush kamboj mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Comments : </h2>
        {comments.map((comment, index) => (
          <div key={index} className="mb-4">
          <div className="flex items-start">
            <FaUserCircle className="text-3xl"/>
            <p className="font-bold ml-3 text-xl ">{comment.author.toUpperCase()}</p>
            <p className="text-gray-600 mb-2 ml-2 mt-2 text-xs">
            {new Date(blogs.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
            <p className="ml-10">{comment.comment}</p>
          </div>
        ))}
      </div> 
      
    </div>
  );
}

export default BlogList;
