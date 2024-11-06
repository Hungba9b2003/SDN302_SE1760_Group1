import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import MyOrders from "./pages/MyOrders/MyOrders";
import Login from "./pages/Authentication/Login";
import ForgetPassword from "./pages/Authentication/ForgetPassword";
import Register from "./pages/Authentication/Register";
import Detail from "./pages/Detail/Detail";
import CreateProductPopup from "./pages/AdminResPages/CreateProductPopup";
import UpdateProductPopup from "./pages/AdminResPages/UpdateProductPopup";
import AdminResDashboard from "./components/AdminComponents/AdminResDashboard";
import AdminResRevenueReport from "./pages/AdminResPages/AdminResRevenueReport";
import AdminResFeedbackRating from "./pages/AdminResPages/AdminResFeedbackRating";
import AdminResProduct from "./pages/AdminResPages/AdminResProduct";
import StoreContextProvider from "./Context/StoreContext";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import AdminDashboard from "./components/AdminComponents/AdminDashboard";
import AdminAccount from "./pages/AdminPages/AdminAccount";
import AdminCustomer from "./pages/AdminPages/AdminCustomer";
import AdminReport from "./pages/AdminPages/AdminReport";
import AdminFeedback from "./pages/AdminPages/AdminFeedback";
import AdminRestaurant from "./pages/AdminPages/AdminRestaurant";
import AdminOrder from "./pages/AdminPages/AdminOrder";
import AdminLayout from "./components/AdminComponents/AdminLayout";

const App = () => {
  const location = useLocation();
  const [createProduct, setCreateProduct] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);
  return (
    <>
      {!location.pathname.includes("/admin") && <Navbar />}

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

              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="account" element={<AdminAccount />} />
                <Route path="customer" element={<AdminCustomer />} />
                <Route path="restaurant" element={<AdminRestaurant />} />
                <Route path="order" element={<AdminOrder />} />
                <Route path="report" element={<AdminReport />} />
                <Route path="feedback" element={<AdminFeedback />} />
              </Route>

              <Route path="/detail/:food_id" element={<Detail />} />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route
                path="/adminres/dashboard"
                element={<AdminResDashboard />}
              />
              <Route
                path="/adminres/revenue-report"
                element={<AdminResRevenueReport />}
              />
              <Route
                path="/adminres/manage"
                element={
                  <AdminResProduct
                    setCreateProduct={setCreateProduct}
                    setUpdateProduct={setUpdateProduct}
                  />
                }
              />
              <Route
                path="/adminres/feedback-rating"
                element={<AdminResFeedbackRating />}
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
