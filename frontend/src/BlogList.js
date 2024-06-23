import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleBlog from "./SingleBlog";

function BlogList() {
  const REACT_APP_API_KEY = process.env.REACT_APP_API;

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_KEY}/blogs`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <div className="font-montserrat min-h-screen bg-gradient-to-r from-red-600 to-yellow-300 p-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Popular Articles for you</h1>
      <div>
        {blogs.map((blog) => (
          <SingleBlog
            key={blog._id}
            id={blog._id}
            title={blog.title}
            author={blog.author}
            date={blog.createdAt}
            content={blog.content}
          />
        ))}
      </div>
    </div>
  );
}

export default BlogList;
