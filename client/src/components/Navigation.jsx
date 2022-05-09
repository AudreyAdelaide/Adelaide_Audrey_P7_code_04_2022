import React, { useState } from "react";
// import { Routes, Route, Link, Navigate } from "react-router-dom";
// import logo from "./logo.svg";
import logo from "../images/icon.svg";

import { NavLink, useNavigate } from "react-router-dom";

import { BiMenuAltRight } from "react-icons/bi";

import UserLoggedIn from "./UserLoggedIn";

function Navigation() {
    const navigate = useNavigate();
    let user = localStorage.getItem("user_id");

    const loggout = () => {
        sessionStorage.removeItem("isAuthenticate");
        window.location.reload(true);
        // navigate("/", { replace: true });
    };

    const token_test = sessionStorage.getItem("isAuthenticate");

    let user_id;
    if (token_test) {
        user_id = JSON.parse(token_test).id;
    } else {
        user_id = "";
    }

    // nav responsive
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    return (
        <div className="navigation">
            <div className="container navigation__container">
                <NavLink to="/Home" className="navigation__branding">
                    <img className="navigation__branding--logo" src={logo} alt="Logo Groupomania" />
                    <h1 className="navigation__branding--title">Groupomania</h1>
                </NavLink>

                <div
                    className="navigation__responsive"
                    onClick={() => {
                        setIsNavExpanded(!isNavExpanded);
                    }}
                >
                    <BiMenuAltRight />
                </div>

                <nav className={isNavExpanded ? "navigation__nav expanded" : "navigation__nav"}>
                    {user}
                    <ul className="navigation__nav--items">
                        <li className="navigation__nav--item">
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li className="navigation__nav--item">
                            <NavLink to="/profile">
                                {/* Afficher la photo de profile et le prénom de l'utilisateur connecté */}
                                <UserLoggedIn userId={user_id} />
                            </NavLink>
                        </li>
                        <li className="navigation__nav--item">
                            <NavLink className="btn" to="/" onClick={loggout}>
                                Déconnection
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Navigation;