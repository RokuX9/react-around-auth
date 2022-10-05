import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ loggedIn, location, userEmail, ...props }) {
  console.log(props.className);
  const renderElements = () => {
    if (!loggedIn) {
      if (location.pathname === "/signin") {
        return (
          <NavLink className="navbar__link" to="/signup">
            Sign Up
          </NavLink>
        );
      } else {
        return (
          <NavLink className="navbar__link" to="/signin">
            Sign In
          </NavLink>
        );
      }
    } else {
      <p className="navbar__text">{userEmail}</p>;
      <NavLink className="navbar__link" to="/login">
        Log Out
      </NavLink>;
    }
  };
  return (
    <nav className={props.className + (loggedIn ? " navbar_logged" : "")}>
      {renderElements()}
    </nav>
  );
}

export default Navbar;
