import React from 'react'
import {MdAssignment} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css'

const NavBar = () => {

  const navigate = useNavigate();

  const removeToken = () => {
    Cookies.remove('token'); // Remove the token from cookies
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <MdAssignment size={40} />

        <span className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Detalis of Checklists </span>
        </span>

         <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button onClick={removeToken} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
        </div>
      
      </div>
    </nav>
  );
};

export default NavBar;
