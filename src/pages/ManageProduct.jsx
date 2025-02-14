import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://backend-twocups.onrender.com/product/getallproduct');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Delete a product
  const handleDelete = async (productId) => {
    try {
    const res =   await axios.get(`https://backend-twocups.onrender.com/product/deleteproduct?id=${productId}`);
    console.log(res.data);
      // Remove the deleted product from the state
      setProducts(products.filter((product) => product._id !== productId));
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <img src={"https://backend-twocups.onrender.com/"+product.imageUrl} alt={product.name} className="w-32 h-32 object-cover mt-2" />
                <p className="text-sm text-gray-500">
                  Price: ₹{product.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Category: {product.category}
                </p>
                <p className="text-sm text-gray-500">
                  Created At: {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProduct;