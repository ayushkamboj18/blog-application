import React from 'react';
import BlogList from './BlogList';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const {user} = useAuth();
  
  const handleWrite = ()=>{
    if(user){
      navigate('/new')
    }
    else{
      navigate('/signin')
    }
  }
  return (
    <>
      <section className="font-montserrat h-screen flex items-center justify-center bg-gradient-to-r from-custom-pink to-custom-orange">       
       <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
          <h1 className="text-4xl font-bold text-white mb-2">Don't focus on having a great blog. Focus on producing a blog that's great for your readers.</h1>
          <h2 className="text-2xl text-white mb-5">Look at this website and bask in its amazing glory!</h2>
          <a onClick={handleWrite} className="bg-orange-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer">Write a blog</a>
        </div>
      </section>
      <BlogList/>
    </>
  );
}

export default Home;