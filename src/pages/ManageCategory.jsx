import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/category/findallcategory');
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Delete a category
  const handleDelete = async (categoryId) => {
    try {
      await axios.get(`http://localhost:3000/category/deletecategory?id=${categoryId}`);
      // Remove the deleted category from the state
      setCategories(categories.filter((category) => category._id !== categoryId));
    } catch (err) {
      console.error('Error deleting category:', err);
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
      <h1 className="text-2xl font-bold mb-4">Category List</h1>
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category._id} className="border p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <p className="text-gray-600">{category.description}</p>
                <img src={"http://localhost:3000/"+category.imageUrl} alt={category.name} className="w-32 h-32 object-cover mt-2" />
                <p className="text-sm text-gray-500">
                  Created At: {new Date(category.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(category._id)}
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

export default ManageCategory;
