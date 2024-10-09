import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount } = useContext(StoreContext);
  const location = useLocation();
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
              to="/manage"
              className={`${menu === "manage" ? "active" : ""}`}
            >
              manage product
            </Link>
          </ul>
          <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
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
