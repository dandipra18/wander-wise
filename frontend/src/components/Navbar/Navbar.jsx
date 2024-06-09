// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

// eslint-disable-next-line react/prop-types
function Navbar({ setShowLogin }) {
  const [tour, setTour] = useState("home");
  // eslint-disable-next-line no-unused-vars
  const { getTotalTicketAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Email");
    setToken("");
    navigate("/");
  };

  return (
    <>
      <div className="navbar">
        <Link to={"/"}>
          <img
            onClick={() => setTour("home")}
            src={assets.logo}
            className="logo"
            alt="logo"
          />
        </Link>
        <ul className="navbar-tour">
          <Link
            to="/"
            className={tour === "home" ? "active" : ""}
            onClick={() => setTour("home")}
          >
            Home
          </Link>
          <a
            href="#explore-tour"
            className={tour === "tour" ? "active" : ""}
            onClick={() => setTour("tour")}
          >
            Jelajahi
          </a>
          <a
            href="#articles"
            className={tour === "articles" ? "active" : ""}
            onClick={() => setTour("articles")}
          >
            Artikel
          </a>
          <a
            href="#contact-us"
            className={tour === "contactus" ? "active" : ""}
            onClick={() => setTour("contactus")}
          >
            Contact Us
          </a>
        </ul>
        <div className="navbar-right">
          <div className="navbar-search-icon">
            <Link to={"/ticket"}>
              <img
                onClick={() => setTour("ticket")}
                src={assets.bag_icon}
                alt=""
              />
            </Link>
            <div className={getTotalTicketAmount() > 0 ? "dot" : ""}></div>
          </div>
          {localStorage.getItem("Token") ? (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="profile" />
              <ul className="nav-profile-dropdown">
                <Link to={"/myorders"}>
                  <li>
                    <img src={assets.bag_icon} alt="bag" />
                    <p>Orders</p>
                  </li>
                </Link>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="logout" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)}>Sign In</button>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
