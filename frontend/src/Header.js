// import { useNavigate } from "react-router-dom";
// import { useAuth } from './AuthContext';
// import { useState} from "react";
// import { toast } from "react-toastify";

// function Header() {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const notifySuccess = () => toast.success("User logout!");


//   const handleLogout = () => {
//     logout();   
//     notifySuccess();
//     navigate('/');
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const closeDropdown = () => {
//     setDropdownOpen(false);
//   };


//   return (
//     <div className="flex justify-between p-4 bg-yellow-50">
//       <h1
//         className="text-4xl cursor-pointer"
//         onClick={() => navigate('/')}
//       >
//         Blog
//       </h1>
//       <div className="relative" >
//         {user ? (
//           <>
//             <span 
//               className="mr-5 text-2xl text-orange-600 cursor-pointer" 
//               onClick={toggleDropdown}
//             >
//               {user.toUpperCase()}
//             </span>
//             {dropdownOpen && (
//               <div 
//                 className="absolute right-3 mt-1 w-48 bg-white border border-gray-300 rounded shadow-lg"
//               >
//                 <button 
//                   onClick={() => navigate('/profile')}
//                   className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                 >
//                   Profile
//                 </button>
//               </div>
//             )}
//             <button
//               onClick={handleLogout}
//               className="bg-transparent hover:bg-orange-500 text-black-700 font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded mr-5"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <button
//               onClick={() => navigate('/signup')}
//               className="bg-transparent hover:bg-orange-500 text-black-700 font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded mr-5"
//             >
//               Sign Up
//             </button>
//             <button
//               onClick={() => navigate('/signin')}
//               className="bg-transparent hover:bg-orange-500 text-black-700 font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded mr-5"
//             >
//               Login
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Header;


import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notifySuccess = () => toast.success("User logout!");

  const handleLogout = () => {
    logout();
    notifySuccess();
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="flex justify-between p-4 bg-yellow-50">
      <h1
        className="text-4xl cursor-pointer"
        onClick={() => navigate('/')}
      >
        Blog
      </h1>
      <div className="relative" ref={dropdownRef}>
        {user ? (
          <>
            <span 
              className="mr-5 text-2xl text-orange-600 cursor-pointer" 
              onClick={toggleDropdown}
            >
              {user.toUpperCase()}
            </span>
            {dropdownOpen && (
              <div 
                className="absolute right-3 mt-1 w-48 bg-white border border-gray-300 rounded shadow-lg"
              >
                <button 
                  onClick={() => navigate('/profile')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </button>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="bg-transparent hover:bg-orange-500 text-black-700 font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded mr-5"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/signup')}
              className="bg-transparent hover:bg-orange-500 text-black-700 font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded mr-5"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate('/signin')}
              className="bg-transparent hover:bg-orange-500 text-black-700 font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded mr-5"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
