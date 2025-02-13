import React, { useEffect, useState } from 'react';

function OrderSummary() {
    const [order, setOrder] = useState(null); // Initialize as null

    useEffect(() => {
        const savedOrder = localStorage.getItem('order');
        if (savedOrder) {
            setOrder(JSON.parse(savedOrder)); // Parse the string back into an object
        }
    }, []);

    if (!order) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Order not found</h2>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-16">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Status</h2>
                </div>
                <div className="mb-8">
                    <h3 className="font-semibold mb-4">Order Details</h3>
                    <p>Customer: {order.email}</p>
                    <p>Status: <span className="text-green-600 font-semibold capitalize">{order.status || 'Pending'}</span></p>
                    <p>Time: {new Date().toLocaleString()}</p>
                </div>
                <div className="border-t pt-6 mb-6">
                    <h3 className="font-semibold mb-4">Items</h3>
                    {order.products && order.products.map((item, index) => (
                        <div key={index} className="flex justify-between mb-2">
                            <span>{item.name} × {item.quantity}</span>
                            <span>₹{order.totalPrice}</span>
                        </div>
                    ))}
                    <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>₹{order.totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderSummary;