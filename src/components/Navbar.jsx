import React, { useContext, useState } from 'react';
import { ShoppingCart, Coffee, Menu, X, User, Search, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from './Cartcontext';
import Cookies from 'js-cookie';
import axios from 'axios';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const Logout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://backend-twocups.onrender.com/users/logout');
      // console.log(response.data);
      Cookies.remove('token');
      navigate('/login');
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <nav className="bg-amber-800 text-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Coffee className="h-8 w-8" />
              <span>Two Cups</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="hover:text-amber-200">
                Home
              </Link>
             
              <Link to="/cart" onClick={handleLinkClick} className="relative hover:text-amber-200">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </Link>
              {Cookies.get('token') ? (
                <>
                  <Link to="/profile" onClick={handleLinkClick} className="hover:text-amber-200 flex items-center space-x-1">
                    <User size={18} />
                    <span>Profile</span>
                  </Link>
                  <Link to="/logout" onClick={Logout} className="hover:text-amber-200 flex items-center space-x-1">
                    <LogOut size={18} />
                    <span>Logout</span>
                  </Link>
                </>
              ) : (
                <Link to="/login" onClick={handleLinkClick} className="hover:text-amber-200 flex items-center space-x-1">
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <Link to="/" onClick={handleLinkClick} className="block px-4 py-2 text-sm text-white hover:bg-amber-900 hover:text-amber-200">
                Home
              </Link>
              
              <Link to="/cart" onClick={handleLinkClick} className="relative block px-4 py-2 text-sm text-white hover:bg-amber-900 hover:text-amber-200">
                <ShoppingCart className="h-6 w-6 inline" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </Link>
              {Cookies.get('token') ? (
                <>
                  <Link to="/profile" onClick={handleLinkClick} className="block px-4 py-2 text-sm text-white hover:bg-amber-900 hover:text-amber-200">
                    <User size={18} /> Profile
                  </Link>
                  <Link to="/logout" onClick={Logout} className="block px-4 py-2 text-sm text-white hover:bg-amber-900 hover:text-amber-200">
                    <LogOut size={18} /> Logout
                  </Link>
                </>
              ) : (
                <Link to="/login" onClick={handleLinkClick} className="block px-4 py-2 text-sm text-white hover:bg-amber-900 hover:text-amber-200">
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
