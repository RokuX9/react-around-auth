import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ loggedIn, history, userEmail, ...props }) {
	const renderElements = () => {
		if (!loggedIn) {
			if (history.location.pathname === "/signin") {
				return (
					<NavLink
						className="navbar__link"
						to="/signup"
					>
						Sign Up
					</NavLink>
				);
			} else {
				return (
					<NavLink
						className="navbar__link"
						to="/signin"
					>
						Sign In
					</NavLink>
				);
			}
		} else {
			return (
				<>
					<NavLink
						className="navbar__text"
						to="/"
					>
						{userEmail}
					</NavLink>
					<a
						className="navbar__link navbar__logout"
						href=""
						onClick={() => {
							localStorage.removeItem("jwt");
							history.push("/signin");
						}}
					>
						Log Out
					</a>
				</>
			);
		}
	};
	return (
		<nav className={props.className + (loggedIn ? " navbar_logged" : "")}>
			{renderElements()}
		</nav>
	);
}

export default Navbar;
