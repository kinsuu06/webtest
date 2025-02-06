import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, username, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  // Handle logout and redirect
  const handleLogout = () => {
    onLogout(); // Call the logout function passed as a prop
    navigate('/'); // Redirect to the homepage
  };

  return (
    <nav className="bg-white shadow-lg py-4">
      <div className="container mx-auto flex justify-between items-center">
        

        {/* Navigation Links */}
        <div className="flex space-x-6 items-center">
          <Link
            to="/"
            className={`text-gray-700 hover:text-purple-600 transition duration-300 ${
              activeLink === '/' ? 'text-purple-600 font-bold' : ''
            }`}
          >
            Home
          </Link>
          
          

          {isLoggedIn ? (
            <>
              <Link
                to="/my-account"
                className="text-gray-700 hover:text-purple-600 transition duration-300"
              >
                <span className="material-icons">My Account</span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            // Single Login Button
            <button
              onClick={() => navigate('/login')}
              className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition duration-300"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
