import React, { useState } from "react";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import MyOrders from "./pages/MyOrders/MyOrders";
import CreateProductPopup from "./pages/ManageProducts/CreateProductPopup";
import ManageProducts from "./pages/ManageProducts/ManageProducts";
import UpdateProductPopup from "./pages/ManageProducts/UpdateProductPopup";
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  const location = useLocation();
  const [createProduct, setCreateProduct] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);

  // Kiểm tra nếu đường dẫn bắt đầu bằng '/admin'
  const isAdminRoute = location.pathname.startsWith("/adminres");

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
      {createProduct ? (
        <CreateProductPopup setCreateProduct={setCreateProduct} />
      ) : null}
      {updateProduct ? (
        <UpdateProductPopup setUpdateProduct={setUpdateProduct} />
      ) : null}
      <div className="app">
        {!isAdminRoute && <Navbar setShowLogin={setShowLogin} />}
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
      </div>
      {!location.pathname.includes("/authentication") && <Footer />}
    </>
  );
};

export default App;
