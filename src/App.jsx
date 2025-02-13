import React from 'react';
import Navbar from './components/Navbar';
import Carausal from './components/Carausal';
import Footer from './components/Footer';
import Product from './pages/Product';
import Cart from './pages/Cart';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import CheckOut from './pages/Checkout';
import CategoryCard from './pages/CategoryCard';
import { CartProvider } from './components/Cartcontext';
import OrderSummary from './pages/OrderSummary';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import AdminNav from './components/AdminNav';
import ManageCategory from './pages/ManageCategory';
import ManageProduct from './pages/ManageProduct';
import AddCategory from './pages/AddCategory';
import AddProduct from './pages/AddProduct';
import AllOrders from './pages/AllOrders';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-amber-50">
            <Routes>
              {/* Admin Routes */}
              <Route
                path="/admin/*"
                element={
                  <>
                    <AdminNav />
                    <main className="pt-16">
                      <Routes>
                        <Route path="managecategory" element={<ManageCategory />} />
                        <Route path="manageproducts" element={<ManageProduct />} />
                        <Route path="addcategory" element={<AddCategory />} />
                        <Route path="addproduct" element={<AddProduct />} />
                        <Route path="allorders" element={<AllOrders />} />
                      </Routes>
                    </main>
                    <Footer />
                  </>
                }
              />

              {/* Public Routes */}
              <Route
                path="/*"
                element={
                  <>
                    <Navbar />
                    <main className="pt-16">
                      <Routes>
                        <Route
                          path="/"
                          element={
                            <>
                              <Carausal />
                              <section className="max-w-7xl mx-auto px-4 py-12">
                                <h2 className="text-3xl font-bold text-amber-900 mb-8">Our Specialties</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                  <CategoryCard />
                                </div>
                              </section>
                            </>
                          }
                        />
                        <Route path="/products/:id" element={<Product />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/register" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/Check-Out" element={<CheckOut />} />
                        <Route path="/order-summary" element={<OrderSummary />} />
                        <Route path="/profile" element={<Profile />} />
                      </Routes>
                    </main>
                    <Footer />
                  </>
                }
              />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;