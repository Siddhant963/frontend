import React, { useContext } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartContext } from '../components/Cartcontext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, handleRemoveItem, handleOrderComplete, handleUpdateQuantity } = useContext(CartContext);

  const onUpdateQuantity = (itemId, quantity) => {
    handleUpdateQuantity(itemId, quantity);
  };

  const onRemoveItem = (itemId) => {
    handleRemoveItem(itemId);
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <Link to="/" className="text-amber-800 hover:text-amber-900">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Your Cart</h2>
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b">
              <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
                <img src={`http://localhost:3000/${item.imageUrl}`} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-amber-800">₹{(item.price && !isNaN(item.price)) ? item.price.toFixed(2) : '0.00'}</p>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto sm:ml-auto">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpdateQuantity(item._id, Math.max(0, item.quantity - 1))}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="flex items-center ml-4">
                  <span className="font-semibold mr-4">₹{(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => onRemoveItem(item._id)}
                    className="p-1 rounded-full hover:bg-gray-100 text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-8 border-t pt-8">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{(!isNaN(total) && total !== null) ? total.toFixed(2) : '0.00'}</span>
            </div>
            <div className="mt-6">
              <Link
                to="/Check-Out"
                className="block w-full bg-amber-800 text-white py-3 px-4 rounded-md text-center hover:bg-amber-900 transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
