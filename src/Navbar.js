
// src/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase'; // update path as needed

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <h1 className="text-xl font-bold text-blue-700">Water Footprint App</h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/history")}
          className="text-blue-600 hover:underline"
        >
          History
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
