import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, foodListAPI } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State quản lý input tìm kiếm
  const [searchTerm, setSearchTerm] = useState(""); // State quản lý giá trị tìm kiếm

  // Hàm xử lý khi nhấn vào biểu tượng tìm kiếm
  const toggleSearchInput = () => {
    setIsSearchVisible(!isSearchVisible); // Bật/tắt hiển thị input
  };

  // Lọc các sản phẩm dựa trên từ khóa tìm kiếm
  const searchResults = foodListAPI.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hàm xử lý khi nhấn tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      navigate(`/detail/${searchResults[0]._id}`); // Điều hướng đến trang chi tiết sản phẩm đầu tiên
    }
  };

  return (
    <div className="navbar" style={{ padding: "20px 8vw" }}>
      <Link to="/">
        <img className="logo" src={assets.logo} alt="" />
      </Link>
      {location.pathname.includes("/authentication") ? (
        <Link to="#" className="navbar-search-icon">
          <a style={{ color: "#ee4d2d" }}>Bạn cần sự trợ giúp ?</a>
        </Link>
      ) : (
        <>
          <ul className="navbar-menu">
            <Link
              to="/"
              onClick={() => setMenu("home")}
              className={`${menu === "home" ? "active" : ""}`}
            >
              home
            </Link>
            <a
              href="#explore-menu"
              onClick={() => setMenu("menu")}
              className={`${menu === "menu" ? "active" : ""}`}
            >
              menu
            </a>

            <Link
              to="/adminres/dashboard"
              className={`${menu === "manage" ? "active" : ""}`}
            >
              restaurant
            </Link>
          </ul>
          <div className="navbar-right">
            {/* Biểu tượng tìm kiếm */}
            <Link
              to="#"
              className="navbar-search-icon"
              onClick={toggleSearchInput}
            >
              <img src={assets.search_icon} alt="search" />
            </Link>

            {/* Hiển thị input tìm kiếm khi isSearchVisible = true */}
            {isSearchVisible && (
              <div className="search-container">
                <form onSubmit={handleSearch} className="search-form">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm kiếm sản phẩm..."
                    className="search-input"
                  />
                  <button type="submit">Find</button>
                </form>

                {/* Hiển thị danh sách gợi ý khi có từ khóa tìm kiếm */}
                {searchTerm && (
                  <div className="search-suggestions">
                    {searchResults.length > 0 ? (
                      searchResults.map((item) => (
                        <Link
                          to={`/detail/${item._id}`}
                          key={item._id}
                          className="suggestion-item"
                          onClick={() => setIsSearchVisible(false)} // Đóng ô tìm kiếm khi nhấn vào gợi ý
                        >
                          {item.name}
                        </Link>
                      ))
                    ) : (
                      <div className="no-results">Không tìm thấy sản phẩm</div>
                    )}
                  </div>
                )}
              </div>
            )}

            <Link to="/cart" className="navbar-search-icon">
              <img src={assets.basket_icon} alt="" />
              <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
            </Link>
            <Link to="/authentication/login" className="navbar-search-icon">
              <button>Sign In</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
