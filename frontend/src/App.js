import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Signin from "./Signin";
import Signup from "./SignUp"
import Blogdetail from "./BlogDetail"
import BlogForm from "./BlogForm";
import Footer from "./Footer"
import Profile from "./Profile";
import UpdateBlogForm from "./UpdateBlogForm"
import { toast, ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/new" element={<BlogForm />} />
          <Route path="/blog/:id" element={<Blogdetail/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/updateblogpost" element={<UpdateBlogForm/>} />
          
        </Routes>
      </div>
      <Footer/>
      <ToastContainer 
        autoClose={2000}
        limit={1}
        closeButton={false}
        position="top-center"
      />
    </>
  );
}

export default App;
