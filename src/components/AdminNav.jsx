import React, { useState } from 'react';
import { Coffee, Menu, X, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function AdminNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const Logout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/users/logout'); // Added protocol
      // console.log(response.data);
      Cookies.remove('token'); // Remove the token cookie
      navigate('/login'); // Redirect to the login page
      window.location.reload(); // Reload the page to update the UI
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <nav className="bg-amber-800 text-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left Side: Logo and Brand */}
            <div className="flex items-center space-x-2">
              <Coffee className="h-8 w-8" />
              <span>Two Cups - Admin</span>
            </div>

            {/* Desktop Menu Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/admin/addcategory" onClick={handleLinkClick} className="hover:text-amber-200">
                Add Category
              </Link>
              <Link to="/admin/managecategory" onClick={handleLinkClick} className="hover:text-amber-200">
                Manage Category
              </Link>
              <Link to="/admin/manageproducts" onClick={handleLinkClick} className="hover:text-amber-200">
                Manage Products
              </Link>
              <Link to="/admin/addproduct" onClick={handleLinkClick} className="hover:text-amber-200">
                Add Product
              </Link>
              <Link to="/admin/allorders" onClick={handleLinkClick} className="hover:text-amber-200">
                All Orders
              </Link>
              <Link
                to="/admin/logout"
                onClick={Logout}  // Corrected function name
                className="hover:text-amber-200 flex items-center space-x-1"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu Links */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <Link
                to="/admin/addcategory"
                onClick={handleLinkClick}
                className="block px-4 py-2 text-sm text-white hover:bg-amber-900 hover:text-amber-200"
              >
                Add Category
              </Link>
              <Link
                to="/admin/managecategory"
                onClick={handleLinkClick}
                className="block px-4 py-2 text-sm text-white hover:bg-amber-900 hover:text-amber-200"
              >Manage Category</Link>
              <Link
                to="/admin/manageproducts"
                onClick={handleLinkClick}
                className="block px-4 py-2 text-sm text-white hover:bg-amber-900 hover:text-amber-200"
              >Manage Products</Link>
              <Link
                to="/admin/addproduct"
                onClick={handleLinkClick}
                className="block px-4 py-2 text-sm text-white hover:bg-amber-900 hover:text-amber-200"
              >
                Add Product
              </Link>
              <Link
                to="/admin/allorders"
                onClick={handleLinkClick}
                className="block px-4 py-2 text-sm text-white hover:bg-amber-900 hover:text-amber-200"
              >
                All Orders
              </Link>
              <Link
                to="/admin/logout"
                onClick={Logout}  // Corrected function name
                className="block px-4 py-2 text-sm text-white hover:bg-amber-900 hover:text-amber-200 flex items-center space-x-1"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default AdminNav;