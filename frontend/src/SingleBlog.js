import React from "react";
import { Link } from "react-router-dom";

function SingleBlog({ title, author, date, content, id }) {
 

  return (
    <div className="">
      <div className="max-w-3xl mx-auto bg-white mt-8 shadow-md rounded-md p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-2">
          By: <strong className="text-orange-500">{author}</strong> on {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
        <p className="text-gray-700 mb-4" style={{ maxHeight: '120px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {content.slice(0, 200)}...
        </p>
        <Link
          to={`/blog/${id}`}
          className="bg-orange-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default SingleBlog;
