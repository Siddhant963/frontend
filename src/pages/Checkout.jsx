import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../components/Cartcontext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Checkout() {
    const { cartItems, handleOrderComplete } = useContext(CartContext);
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const [Email, setEmail] = useState(sessionStorage.getItem('email'));
    const [contact, setContact] = useState('');
    const [customerData, setCustomerData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to login if token is not available
        if (!Cookies.get('token')) {
            navigate('/login');
            return;
        }

        // Fetch user data if token is available
        getUser();
    }, [Email, navigate]);

    const getUser = async () => {
        try {
            let response = await axios.get(`https://backend-twocups.onrender.com/users/getprofile?email=${Email}`);
            setCustomerData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const order = {
            user: customerData._id,
            totalPrice: total,
            products: cartItems.map(item => ({ product: item._id, productname: item.name,price: item.price, quantity: item.quantity })),
            contact: customerData.contact,
            email: Email
        };

        const finalorder = {
            username: customerData.name,
            user: customerData._id,
            totalPrice: total,
            products: cartItems.map(item => ({ product: item._id, name: item.name, quantity: item.quantity })),
            contact: customerData.contact,
            email: Email
        };

        console.log(order);

        try {
            const orders = await axios.post(`https://backend-twocups.onrender.com/order/addorder?`, order);
            handleOrderComplete();
            localStorage.setItem('order', JSON.stringify(finalorder));
            navigate('/order-summary');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="max-w-2xl mx-auto px-4 py-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Checkout</h2>
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 md:p-6">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={customerData.name}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                required
                                value={customerData.contact}
                                onChange={(e) => setContact(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>
                    </div>
                    <div className="mt-8 border-t pt-6">
                        <h3 className="font-semibold mb-4">Order Summary</h3>
                        <div className="space-y-2">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span>{item.name} × {item.quantity}</span>
                                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t pt-4 mt-4">
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <button
                            type="submit"
                            className="w-full bg-amber-800 text-white py-3 px-4 rounded-md hover:bg-amber-900 transition-colors"
                        >
                            Place Order
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Checkout;