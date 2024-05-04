import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const handleLogout = () => {
		actions.Logout();
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="flex container">
				<div className="collapse navbar-collapse container" id="navbarNav">
					<ul className="navbar-nav flex justify-around container">
						{store.token ? (
							<>
								<li className="nav-item">
									<Link className="nav-link" to="/private">
										Private
									</Link>
								</li>
								<li className="nav-item">
									<button className="nav-link btn" onClick={handleLogout}>
										Logout
									</button>
								</li>
							</>
						) : (
							<>
								<li className="nav-item">
									<Link className="nav-link" to="/">
										Login
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/signup">
										Signup
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);

};
