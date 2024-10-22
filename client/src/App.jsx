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
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./components/AdminComponents/AdminDashboard";
import AdminRevenueReport from "./pages/AdminPages/AdminRevenueReport";
import AdminUsers from "./pages/AdminPages/AdminUser";
import AdminFeedbackRating from "./pages/AdminPages/AdminFeedbackRating";
import AdminProduct from "./pages/AdminPages/AdminProduct";
import Detail from "./pages/Detail/Detail";
import CreateProductPopup from "./pages/AdminResPages/CreateProductPopup";
import UpdateProductPopup from "./pages/AdminResPages/UpdateProductPopup";
import AdminResDashboard from "./components/AdminComponents/AdminResDashboard";
import AdminResRevenueReport from "./pages/AdminResPages/AdminResRevenueReport";
import AdminResFeedbackRating from "./pages/AdminResPages/AdminResFeedbackRating";
import AdminResProduct from "./pages/AdminResPages/AdminResProduct";
import StoreContextProvider from "./Context/StoreContext";
import OrderHistory from "./components/OrderHistory/OrderHistory";

import "./index.css";

const App = () => {
  const location = useLocation();
  const [createProduct, setCreateProduct] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);

  // Điều kiện để ẩn Navbar ở các trang admin
  const hideNavbar = location.pathname.includes("/admin") || location.pathname.includes("/adminres");

  // Điều kiện để ẩn Footer ở các trang authentication và adminres
  const hideFooter = location.pathname.includes("/authentication") || location.pathname.includes("/adminres");

  return (
    <>
      {!hideNavbar && <Navbar />}

      {createProduct ? (
        <CreateProductPopup setCreateProduct={setCreateProduct} />
      ) : null}
      {updateProduct ? (
        <UpdateProductPopup setUpdateProduct={setUpdateProduct} />
      ) : null}
      <div className={location.pathname !== "/order-history" ? "app" : ""}>
        <StoreContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/authentication/login" element={<Login />} />
            <Route path="/authentication/register" element={<Register />} />
            <Route path="/authentication/forgetPassword" element={<ForgetPassword />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/myorder" element={<MyOrders />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/revenue-report" element={<AdminRevenueReport />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/product" element={<AdminProduct />} />
            <Route path="/admin/feedback-rating" element={<AdminFeedbackRating />} />
            <Route path="/detail/:food_id" element={<Detail />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/adminres/dashboard" element={<AdminResDashboard />} />
            <Route path="/adminres/revenue-report" element={<AdminResRevenueReport />} />
            <Route path="/adminres/manage" element={<AdminResProduct setCreateProduct={setCreateProduct} setUpdateProduct={setUpdateProduct} />} />
            <Route path="/adminres/feedback-rating" element={<AdminResFeedbackRating />} />
          </Routes>
        </StoreContextProvider>
      </div>
      {!hideFooter && <Footer />}
    </>
  );
};

export default App;