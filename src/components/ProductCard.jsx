import React, { useContext } from 'react';
import { ShoppingCart, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartContext } from './Cartcontext';

function ProductCard(props) {
  const { _id, name, description, price, imageUrl } = props; // Destructure props to get the necessary data
  const { addToCart, handleRemoveItem, handleOrderComplete } = useContext(CartContext); // Get the addToCart function from the CartContext

  const handleAddToCart = () => {
    const product = { _id, name, description, price, imageUrl };
    addToCart(product); // Add product to cart
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-2 my-3">
      <img src={`https://backend-twocups.onrender.com/${imageUrl}`} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600 mt-1">{description}</p>
        <p className="text-amber-800 font-bold mt-2">₹{price}</p>

        <div className="mt-4 flex space-x-2">
          <Link to={{ pathname: '/cart', state: { name: name } }}>
            <button
              onClick={handleAddToCart} // Call the handleAddToCart function when the button is clicked
              className="flex-1 bg-amber-100 text-amber-800 py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-amber-200"
            >
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </button>
          </Link>
          
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
