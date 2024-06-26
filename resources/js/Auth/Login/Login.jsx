import React, { useState, useRef, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import loginimage from "../../../../public/image/undraw_Login_re_4vu2__1_-removebg-preview.png";
import axios from "axios";
import { BiShowAlt } from "react-icons/bi";
import { IoEyeOffOutline } from "react-icons/io5";
import "../../../css/LoginStyle/Login.css";
import Logo from "../../../../public/logo1.png";
import { signInWithPopup } from "firebase/auth";
import Loading from "../../Componants/UI/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaStarOfLife } from "react-icons/fa";
import { TranslateContext } from "./../../Context/Translate";
import { auth, google } from "../../firebase.js";
import bg5 from "../../../../public/image/bg5.jpg";
import { UserContext } from "../../Context/User.jsx";
function Login(props) {
    const { translates } = useContext(TranslateContext);
    const { setUserToken } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(null);
    const [seccsses, setSeccsses] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [visibale, setVisible] = useState(false);
    const [emailPlaceholder, setEmailPlaceholder] = useState(
        translates.Enteryouremail
    );
    const form = useRef({
        email: null,
        password: null,
    });

    const set = (e) => {
        form.current = { ...form.current, [e.target.name]: e.target.value };
        //console.log(form.current)
    };

    const log = async (e) => {
        e.preventDefault();
        setSeccsses(null);
        setError(null);
        setIsLoading(true);
        if (form.current.email.includes("@employee.ps")) {
            try {
                const response = await axios.post("/login-email", form.current);
                const res = response.data;
                if (res) {
                    setSeccsses(res.data);
                    const token = res.data.token;
                    localStorage.setItem("token", token);
                    if (res.data.role === "Company") {
                        setUserToken(token);
                        navigate("/dashbord");
                    }
                }
            } catch (e) {
                setError(e.response.data.msg);
            } finally {
                setIsLoading(false);
            }
        } else {
            try {
                const response = await axios.post("/login", form.current);
                const res = response.data;
                if (res) {
                    setSeccsses(res.data);
                    const token = res.data.token;
                    localStorage.setItem("token", token);
                    if (res.data.role === "Company") {
                        setUserToken(token);
                        navigate("/dashbord");
                    } else {
                        setUserToken(token);
                        navigate("/profile");
                    }
                }
            } catch (e) {
                setError(e.response.data.msg);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const byGoogle = async () => {
        const res = await signInWithPopup(auth, google);

        localStorage.setItem("token", res.user.accessToken);
        // localStorage.setItem("token",res.user.accessToken)
        navigate("/profile");
    };

    return (
        <div className="d-flex justify-content-around cont">
            <ToastContainer />

            <div>
                <img src={loginimage} className="w-100" />
            </div>
            <div className="form-container m-2">
                <div className="social-buttons">
                    <button className="social-button apple" onClick={byGoogle}>
                        <svg className="icon" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            ></path>
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            ></path>
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            ></path>
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            ></path>
                            <path d="M1 1h22v22H1z" fill="none"></path>
                        </svg>
                        <span>{translates.SignInWithGoogle}</span>
                    </button>
                </div>
                <div className="line"></div>
                {seccsses && (
                    <div className="alert alert-success" role="alert">
                        {seccsses}
                    </div>
                )}
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <div></div>
                <form className="form" onSubmit={log}>
                    <div className="form-group">
                        <label for="email">
                            {translates.Email}
                            <span className=" text-red-600"> *</span>
                        </label>
                        <input
                            required=""
                            placeholder={translates.Enteryouremail}
                            name="email"
                            id="email"
                            type="text"
                            onChange={set}
                        />
                    </div>

                    <div className="form-group">
                        <div className="d-flex">
                            <label htmlFor="password">
                                {translates.Password}
                            </label>
                            <FaStarOfLife size={5} className="text-danger" />
                        </div>
                        <div className="password-input-container">
                            <input
                                type={visibale ? "text" : "password"}
                                required=""
                                id={"password"}
                                name="password"
                                placeholder={translates.Enteryourpassword}
                                className="form-control"
                                onChange={set}
                            />
                            <div className="p-2 icon-container">
                                {visibale ? (
                                    <BiShowAlt
                                        onClick={() => setVisible(false)}
                                    />
                                ) : (
                                    <IoEyeOffOutline
                                        onClick={() => setVisible(true)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <input
                        type={"submit"}
                        value={isLoading ? "Loading..." : `${translates.Login}`}
                        className="form-submit-btn"
                        disabled={isLoading}
                    />
                </form>

                <NavLink
                    className="forgot-password-link link "
                    to="/forgetpassword"
                >
                    <span> {translates.forgetPassword}</span>
                </NavLink>

                <p className="signup-link d-flex gap-2">
                    <span>{translates.account}</span>
                    <NavLink className="signup-link link" to="/register">
                        {translates.signnow}
                    </NavLink>
                </p>
            </div>
        </div>
    );
}

export default Login;
