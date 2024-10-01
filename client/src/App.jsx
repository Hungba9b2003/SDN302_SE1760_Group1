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
const App = () => {
  const location = useLocation();
  const [createProduct, setCreateProduct] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);
  return (
    <>
      <Navbar />
      {createProduct ? (
        <CreateProductPopup setCreateProduct={setCreateProduct} />
      ) : null}
      {updateProduct ? (
        <UpdateProductPopup setUpdateProduct={setUpdateProduct} />
      ) : null}
      <div className="app">
        <>
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
        </>
      </div>
      {!location.pathname.includes("/authentication") && <Footer />}
    </>
  );
};

export default App;
