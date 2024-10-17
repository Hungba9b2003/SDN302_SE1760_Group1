import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount } = useContext(StoreContext);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  console.log(isLoggedIn);
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="navbar" style={{ padding: "20px 8vw" }}>
      <Link to="/">
        <img className="logo" src={assets.logo} alt="" />
      </Link>
      {location.pathname.includes("/authentication") ? (
        <>
          <Link to="#" className="navbar-search-icon"></Link>
          <a style={{ color: "#ee4d2d" }}>You need help ?</a>
        </>
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
          {!isLoggedIn ? (
            <>
              <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <Link to="/cart" className="navbar-search-icon">
                  <img src={assets.basket_icon} alt="" />
                  <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
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
                      src={
                        "data:image/png;base64,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"
                      }
                      roundedCircle
                      width="30" // Kích thước avatar
                      height="30"
                      className="me-2"
                    />
                    <span style={{ color: "White" }}>Hung</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/order-history">
                      Order history
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Profile</Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        handleLogout();
                      }}
                    >
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
              <img
                style={{ objectFit: "contain" }}
                src={assets.search_icon}
                alt=""
              />
              <Link to="/cart" className="navbar-search-icon">
                <img src={assets.basket_icon} alt="" />
                <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
              </Link>
              <Link to="/authentication/login" className="navbar-search-icon">
                <button>Sign In</button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Navbar;
