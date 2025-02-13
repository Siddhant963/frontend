import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('profile'); // Tabs: 'profile' or 'orders'
  const userEmail = sessionStorage.getItem('email'); // Retrieve email from sessionStorage
  const navigate = useNavigate();

  // Fetch user details and orders
  useEffect(() => {
     const fetchUserDetails = async () => {
       try {
              const token = Cookies.get('token');
        if (!token || !userEmail) {
          console.error('No token or email found');
          navigate('/login'); // Redirect to login if no token or email
          return;
        }


         // Fetch user details
         const userResponse = await axios.get(`http://localhost:3000/users/getprofile?email=${userEmail}`);
         console.log('User Details Response:', userResponse.data);
         setUserDetails(userResponse.data);
   
         if (userResponse.data && userResponse.data._id) {
           // Fetch orders for the user
           const ordersResponse = await axios.get(`http://localhost:3000/order/getOrder?userId=${userResponse.data._id}`, {
             headers: {
               Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Add auth header if needed
             },
           });
           console.log('Orders Response:', ordersResponse.data);
   
           if (Array.isArray(ordersResponse.data)) {
             setOrders(ordersResponse.data);
           } else {
             console.error('Invalid orders data:', ordersResponse.data);
           }
         }
       } catch (error) {
         console.error('Error fetching data:', error);
       }
     };
   
     fetchUserDetails();
   }, [userEmail, navigate]);
   

  if (!userDetails) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-4 px-6 text-center font-semibold ${
              activeTab === 'profile' ? 'bg-amber-800 text-white' : 'bg-gray-100 text-gray-700'
            } hover:bg-amber-700 hover:text-white transition-colors`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-4 px-6 text-center font-semibold ${
              activeTab === 'orders' ? 'bg-amber-800 text-white' : 'bg-gray-100 text-gray-700'
            } hover:bg-amber-700 hover:text-white transition-colors`}
          >
            Orders
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">User Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-lg text-gray-900">{userDetails.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-lg text-gray-900">{userDetails.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact</label>
                <p className="mt-1 text-lg text-gray-900">{userDetails.contact}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <p className="mt-1 text-lg text-gray-900">{userDetails.address || 'No address provided'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Order History</h2>
            {orders.length === 0 ? (
              <p className="text-gray-700">No orders found.</p>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-amber-900">Order ID: {order._id}</h3>
                      <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="space-y-2">
                      {order.products.map((product) => (
                        <div key={product._id} className="flex justify-between">
                          <span>{product.productname} × {product.quantity}</span>
                          <span>₹{(product.price * product.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>₹{order.totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;