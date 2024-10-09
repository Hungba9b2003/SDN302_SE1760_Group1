<<<<<<< HEAD
import React, { useState } from "react";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import MyOrders from "./pages/MyOrders/MyOrders";
import Login from "./pages/Authentication/Login";
import ForgetPassword from "./pages/Authentication/ForgetPassword";
import Register from "./pages/Authentication/Register";
import CreateProductPopup from "./pages/ManageProducts/CreateProductPopup";
import ManageProducts from "./pages/ManageProducts/ManageProducts";
import UpdateProductPopup from "./pages/ManageProducts/UpdateProductPopup";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./components/AdminComponents/AdminDashboard";
import AdminRevenueReport from "./pages/AdminPages/AdminRevenueReport";
import AdminUsers from "./pages/AdminPages/AdminUser";
import AdminFeedbackRating from "./pages/AdminPages/AdminFeedbackRating";
import AdminProduct from "./pages/AdminPages/AdminProduct";
import Detail from "./pages/Detail/Detail";
import "bootstrap/dist/css/bootstrap.min.css";
import StoreContextProvider from "./Context/StoreContext";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import "./index.css";
=======
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart/Cart';
import LoginPopup from './components/LoginPopup/LoginPopup';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import MyOrders from './pages/MyOrders/MyOrders';
import CreateProductPopup from './pages/AdminResPages/CreateProductPopup';
import UpdateProductPopup from './pages/AdminResPages/UpdateProductPopup';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminResDashboard from './components/AdminComponents/AdminResDashboard';
import AdminResRevenueReport from './pages/AdminResPages/AdminResRevenueReport';
import AdminResFeedbackRating from './pages/AdminResPages/AdminResFeedbackRating';
import AdminResProduct from './pages/AdminResPages/AdminResProduct';
>>>>>>> hoanlq

const App = () => {
  const location = useLocation();
  const [createProduct, setCreateProduct] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);
<<<<<<< HEAD
  return (
    <>
      {!location.pathname.includes("/admin") && <Navbar />}
=======
  
  // Lấy thông tin vị trí hiện tại
  const location = useLocation();
  
  // Kiểm tra nếu đường dẫn bắt đầu bằng '/admin'
  const isAdminRoute = location.pathname.startsWith('/adminres');

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
      {createProduct ? <CreateProductPopup setCreateProduct={setCreateProduct} /> : null}
      {updateProduct ? <UpdateProductPopup setUpdateProduct={setUpdateProduct} /> : null}
      <div className='app'>
        {/* Chỉ hiển thị Navbar nếu không phải đường dẫn admin */}
        {!isAdminRoute && <Navbar setShowLogin={setShowLogin} />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/myorder' element={<MyOrders />} />
          <Route path="/adminres/dashboard" element={<AdminResDashboard />} />
          <Route path="/adminres/revenue-report" element={<AdminResRevenueReport />} />
          <Route path="/adminres/manage" element={<AdminResProduct setCreateProduct={setCreateProduct} setUpdateProduct={setUpdateProduct} />} />
          <Route path="/adminres/feedback-rating" element={<AdminResFeedbackRating />} />
        </Routes>
      </div>
      {/* Chỉ hiển thị Footer nếu không phải đường dẫn admin */}
      {!isAdminRoute && <Footer />}
    </>
  );
}
>>>>>>> hoanlq

      {createProduct ? (
        <CreateProductPopup setCreateProduct={setCreateProduct} />
      ) : null}
      {updateProduct ? (
        <UpdateProductPopup setUpdateProduct={setUpdateProduct} />
      ) : null}
      <div className={location.pathname !== "/order-history" ? "app" : ""}>
        <>
          <StoreContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/authentication/login" element={<Login />} />
              <Route path="/authentication/register" element={<Register />} />
              <Route
                path="/authentication/forgetPassword"
                element={<ForgetPassword />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<PlaceOrder />} />
              <Route path="/myorder" element={<MyOrders />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route
                path="/admin/revenue-report"
                element={<AdminRevenueReport />}
              />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/product" element={<AdminProduct />} />
              <Route
                path="/admin/feedback-rating"
                element={<AdminFeedbackRating />}
              />
              <Route path="/detail/:food_id" element={<Detail />} />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route
                path="/manage"
                element={
                  <ManageProducts
                    setCreateProduct={setCreateProduct}
                    setUpdateProduct={setUpdateProduct}
                  />
                }
              />
            </Routes>
          </StoreContextProvider>
        </>
      </div>
      {!location.pathname.includes("/authentication") && <Footer />}
    </>
  );
};

export default App;
