import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../images/icon.svg";

import { useCookies } from "react-cookie";

// Import des icons de la page login
import { BiLogInCircle, BiLockOpenAlt, BiShow, BiHide } from "react-icons/bi";

function Signup() {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["access"]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Expiration du token sous 24h soit 86400 secondes
    const expiresIn = 86400;

    // Message d'erreur
    const [msg, setMsg] = useState("");

    const url = `http://localhost:8080/api/auth/signup`;

    // L'objet user envoyer pour la connexion
    const userObject = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
    };

    // La method
    const postSignup = {
        method: "POST",
        body: JSON.stringify(userObject),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    const Signup = async (e) => {
        e.preventDefault();

        try {
            let res = await fetch(url, postSignup);

            if (res.status === 404) {
                setMsg("Cet utilisateur n'existe pas !");
            } else {
                const dataSignup = await res.json();

                const loginUrl = "http://localhost:8080/api/auth/login";
                const postLogin = {
                    method: "POST",
                    body: JSON.stringify(userObject),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                };

                let resLogin = await fetch(loginUrl, postLogin);

                if (resLogin.status === 404) {
                    setMsg("Cet utilisateur n'existe pas !");
                } else {
                    const data = await resLogin.json();
                    setCookie("access", data.token, { path: "/", maxAge: expiresIn });

                    if (res.ok) {
                        navigate("/", { replace: true });
                        window.location.reload(true);
                    }
                }
            }

            // if (res.ok) {
            // }
        } catch (error) {
            setMsg(error);
        }
    };

    // Pour afficher ou cacher le mot de passe
    const [passwordShown, setPasswordShown] = useState(false);
    const [show, setShow] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
        setShow(!passwordShown);
    };

    return (
        <div className="login">
            <div className="login__container">
                <div className="login__branding">
                    <img src={logo} alt="Logo Groupomania" />
                    <h1 className="login__title">Groupomania</h1>
                </div>
                <div className="login__links">
                    <ul className="login__links--items">
                        <li className="item">
                            <NavLink className="item" to="/">
                                Connexion
                            </NavLink>
                        </li>
                        <p className="item">|</p>
                        <li className="item">
                            <NavLink className="item" to="/signup">
                                Inscription
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <form onSubmit={Signup} className="login__form">
                    <div className="login__input-edit">
                        <div>
                            <label className="login__label">
                                <div className="login__icon">
                                    <BiLogInCircle />
                                </div>
                                <input
                                    className="login__input-text"
                                    type="text"
                                    name="firstName"
                                    placeholder="Prénom"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </label>
                        </div>
                        <div>
                            <label className="login__label">
                                <div className="login__icon">
                                    <BiLogInCircle />
                                </div>
                                <input
                                    className="login__input-text"
                                    type="text"
                                    name="lastName"
                                    placeholder="Nom"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </label>
                        </div>
                        <div>
                            <label className="login__label">
                                <div className="login__icon">
                                    <BiLogInCircle />
                                </div>
                                <input
                                    className="login__input-text"
                                    type="text"
                                    name="email"
                                    placeholder="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                        </div>

                        <div>
                            <label className="login__label">
                                <div className="login__icon">
                                    <BiLockOpenAlt />
                                </div>

                                <div className="login__icon--hideShow">
                                    <span
                                        className="show"
                                        onClick={togglePassword}
                                        style={{ display: show ? "none" : "block" }}
                                    >
                                        <BiShow />
                                    </span>
                                    <span
                                        className="hide"
                                        onClick={togglePassword}
                                        style={{ display: show ? "block" : "none" }}
                                    >
                                        <BiHide />
                                    </span>
                                </div>
                                <input
                                    className="login__input-text"
                                    type={passwordShown ? "text" : "password"}
                                    name="password"
                                    placeholder="******"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>
                        </div>
                    </div>
                    <p>{msg}</p>
                    <input className="login__btn btn" type="submit" value="Connexion" />
                </form>
            </div>
        </div>
    );
    // }
}

export default Signup;
