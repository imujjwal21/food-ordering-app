import { useState } from "react";
import { LOGO_URL }  from "./../utils/constants";
import { useState } from 'react'
import { Link } from "react-router-dom";
import useOnlineStatus from "./useOnlineStatus";

const Header = () => {
  let [btnName, setBtnName] = useState("Login");

  const onlineStatus =  useOnlineStatus()

  return (
    <div className="header">
      <div className="logo-container">
        <img className="log" src={LOGO_URL} />
      </div>

      <div className="nav-items">
        <ul>
          <li>Online Status: {onlineStatus ? "🟢" : "🔴"}</li>
          <li>
            <Link to="/">Home</Link>{" "}
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/Grocery">Grocery</Link>
          </li>
          <li>Cart</li>

          <button
            className="login"
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;  