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

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [createProduct, setCreateProduct] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);
  
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

export default App;