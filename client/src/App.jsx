import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";

import AdminDashboard from "./components/AdminComponents/AdminDashboard";
import AdminRevenueReport from "./pages/AdminPages/AdminRevenueReport";
import AdminUsers from "./pages/AdminPages/AdminUser";
import AdminFeedbackRating from "./pages/AdminPages/AdminFeedbackRating";
import AdminProduct from "./pages/AdminPages/AdminProduct";

const App = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/myorder" element={<MyOrders />} /> */}

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/revenue-report" element={<AdminRevenueReport />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/product" element={<AdminProduct />} />
        <Route
          path="/admin/feedback-rating"
          element={<AdminFeedbackRating />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
