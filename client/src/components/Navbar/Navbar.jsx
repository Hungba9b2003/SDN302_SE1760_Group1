import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import axios from "axios";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, foodListAPI, setSearchQuery, searchQuery } =
    useContext(StoreContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearchInput = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const searchResults = searchQuery
    ? foodListAPI.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      navigate(`/detail/${searchResults[0]._id}`);
    }
  };

  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setToken("");
  };

  useEffect(() => {
    const checkToken = async () => {
      const currentToken = localStorage.getItem("token");
      setToken(currentToken);
      if (currentToken) {
        try {
          await axios.post("http://localhost:5000/api/auth/check-token", {
            token: currentToken,
          });
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Token không hợp lệ:", error.response.data.message);
          handleLogout();
        }
      } else {
        handleLogout();
      }
    };

    if (location.pathname === "/") {
      checkToken();
    }
  }, [location.pathname, navigate]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div
      className="navbar"
      style={{ paddingTop: "20px", paddingLeft: "8vw", paddingRight: "8vw" }}
    >
      <Link to="/">
        <img className="logo" src={assets.logo} alt="Logo" />
      </Link>
      {location.pathname.includes("/authentication") ? (
        <>
          <Link to="#" className="navbar-search-icon py-5"></Link>
          <a style={{ color: "#ee4d2d" }}>You need help?</a>
        </>
      ) : (
        <>
          <ul className="navbar-menu">
            <Link
              to="/"
              onClick={() => setMenu("home")}
              className={`${menu === "home" ? "active" : ""}`}
            >
              Home
            </Link>
            <a
              href="#explore-menu"
              onClick={() => setMenu("menu")}
              className={`${menu === "menu" ? "active" : ""}`}
            >
              Menu
            </a>
          </ul>

          <div className="navbar-right">
            <Link
              to="#"
              className="navbar-search-icon"
              onClick={toggleSearchInput}
            >
              <img src={assets.search_icon} alt="search" />
            </Link>

            {isSearchVisible && (
              <div className="search-container">
                <form onSubmit={handleSearch} className="search-form">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm sản phẩm..."
                    className="search-input"
                  />
                  <button className="search-button" type="submit">
                    Find
                  </button>
                </form>

                {searchQuery && (
                  <div className="search-suggestions">
                    {searchResults.length > 0 ? (
                      searchResults.map((item) => (
                        <Link
                          to={`/detail/${item._id}`}
                          key={item._id}
                          className="suggestion-item"
                          onClick={() => setIsSearchVisible(false)}
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

            {isLoggedIn ? (
              <>
                <div className="navbar-right">
                  <Link to="/cart" className="navbar-search-icon">
                    <img src={assets.basket_icon} alt="Basket" />
                    <div
                      className={getTotalCartAmount() > 0 ? "dot" : ""}
                    ></div>
                  </Link>
                  <Dropdown>
                    <Dropdown.Toggle
                      style={{
                        backgroundColor: "#ee4d2d",
                        borderColor: "white",
                        color: "white",
                      }}
                      id="dropdown-basic"
                    >
                      <Image
                        src="data:image/png;base64,..."
                        roundedCircle
                        width="30"
                        height="30"
                        className="me-2"
                      />
                      <span style={{ color: "White" }}>Hung</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="/order-history">
                        Order History
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Profile</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </>
            ) : (
              <div
                className="navbar-right"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Link to="/cart" className="navbar-search-icon">
                  <img src={assets.basket_icon} alt="Basket" />
                  <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
                </Link>

                <Link to="/authentication/login" className="navbar-search-icon">
                  <button>Sign In</button>
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
