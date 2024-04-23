import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { FaHeart } from "react-icons/fa";
import logo from "../../../../public/logo1.png";
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
} from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import DialogLogin from "../Dialog/DialogLogin";
import "../../../css/HeaderStyle/Header.css";
import NaveBar from "./Navbar";
import Dialog from "../Dialog/Dialog";
import axios from "axios";

import Login from "../../Auth/Login/Login";
import SignUp from "../../Auth/Login/SignUp";
import logout from './../../NetWorking/logout';

import { data } from "autoprefixer";
import { TranslateContext } from "../../Context/Translate";
import { useLocation, useNavigate } from "react-router-dom";

function Header({ islogined }) {
    const { changeLanguage, translates } = useContext(TranslateContext);
  const navigator = useNavigate()


    const [role, setRole] = useState("");
    const [username, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [countUnreadNotification, setCountUnreadNotification] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [goTo, setGoTo] = useState("");
    const getCountNotification = async () => {
        const token = localStorage.getItem("token");
        if (token ) {
            try {
                const response = await axios.get("/countNotifications", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const { unread_count } = await response.data.data; // Assuming response structure is { data: { unread_count: ... } }
                setCountUnreadNotification(unread_count);
            } catch (error) {
                console.error(
                    "Error fetching count of unread notifications:",
                    error
                );
            }
        }
    };

    const getNotifications = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const response = await axios.get("/notifications", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const { data } = await response.data; // Assuming response structure is { data: [...] }
                setNotifications([...data]);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        }
    };
    const getuser = async () => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const response = await axios.get("/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const res = response.data;
                if (res) {
                    setRole(res.data.role);
                    setUserName(res.data.username);
                    setUser(res.data);
                    console.log(res);
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log("Token not found in local storage");
        }
    };
    const Translate = async (e) => {
        changeLanguage(e);
    };
    const marksRead = async () => {
        const token = localStorage.getItem("token");

        const res = await axios.get("/markallread", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        getNotifications();
        setCountUnreadNotification(0);
        console.log(res);
    };
    useEffect(() => {
        getuser();
        getCountNotification();
        getNotifications();
    }, []);

    // useEffect(() => {
    //     getNotifications();
    //     getCountNotification();
    // }, [notifications]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            getCountNotification();
            getNotifications();
        }, 300000);

        return () => clearInterval(intervalId);
    }, [countUnreadNotification]);

    // Rest of your component code...
    // const user = useContext(UserContext)
    //  useEffect(() => {

    //     setUseUser(user);

    // }, []);

    const [isDialogOpen, setDialogOpen] = useState(false);

    const openDialog = () => {
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };

    const [isSignOpen, setSignOpen] = useState(false);

    const openDialogSign = () => {
        setSignOpen(true);
    };

    const closeDialogSign = () => {
        setSignOpen(false);
    };

    const [openlogin, setOpenlogin] = useState(false);
    const [opensignup, setOpensignup] = useState(false);
    const [showprofile, setShowprofile] = useState(false);


    const out = async () => {
        await logout((out) => {

            navigator("/")

            window.location.reload()

        })
        }


    return (
        <div class="d-flex  justify-content-around">
            <nav class="navbar bg-body-tertiary  ">
                <div class="container-fluid">
                    <div className={`nav-logo d-flex align-middle`}>
                        <a href="/">
                            <img
                                src={logo}
                                alt="logo"
                                className="nav-logo-img"
                            />
                        </a>
                    </div>

                    {/* search */}
                    {role === "Company" ? <div></div> : <NaveBar />}
                   

                    <div class="hstack gap-1">
                        

                        <div class="nav-item dropdown d-flex align-items-center justify-content-center translate">
                            <Link
                                class="nav-link "
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="bi bi-translate fs-3 me-2 text-black"></i>
                            </Link>
                            <ul class="dropdown-menu">
                                <li>
                                    <span
                                        class="dropdown-item"
                                        data-lang="ar"
                                        onClick={(e) => Translate(e)}
                                    >
                                        {translates.Arabic}
                                    </span>
                                </li>
                                <li>
                                    <span
                                        class="dropdown-item"
                                        data-lang="en"
                                        onClick={(e) => Translate(e)}
                                    >
                                        {translates.English}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        {user&&<div className="d-flex  d-flex align-items-center justify-content-center border rounded-circle p-2">
                        <FaHeart size={20} className="text-black"/>

                        </div>}
                        <div className=" d-flex mx-2 ">
                            {user && (
                                <div className="nav-item dropdown">
                                    <a
                                        className="nav-link text-black"
                                        href="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i className="bi bi-bell-fill fs-4 me-1 position-relative "></i>
                                        {countUnreadNotification &&
                                        countUnreadNotification > 0 ? (
                                            <span className="position-absolute  bg-danger border border-danger rounded-circle circle-notification py-1">
                                                {countUnreadNotification}
                                            </span>
                                        ) : (
                                            <span className="position-absolute  bg-danger border border-danger rounded-circle circle-notification py-1">
                                                {""}
                                            </span>
                                        )}
                                    </a>
                                    <ul
                                        className="dropdown-menu"
                                        aria-labelledby="navbarDropdown"
                                    >
                                        <li className="head text-light bg-dark">
                                            <div className="row">
                                                <div className="col-lg-12 col-sm-12 col-12">
                                                    <span>
                                                        Notifications{" "}
                                                        {countUnreadNotification &&
                                                            countUnreadNotification}{" "}
                                                    </span>
                                                    <Link
                                                        className="float-right text-light"
                                                        onClick={marksRead}
                                                    >
                                                        Mark all as read
                                                    </Link>
                                                </div>
                                            </div>
                                        </li>

                                        {notifications &&
                                            notifications.map(
                                                (notification, index) => (
                                                    <li
                                                        class="notification-box "
                                                        key={index}
                                                    >
                                                        {notification.data.content.includes(
                                                            "car"
                                                        ) ? (
                                                            <NavLink
                                                                  
                                                                className={
                                                                    "text-black"
                                                                }
                                                                to={`/cars/${notification.data.comment_id}`}
                                                            >
                                                                <div class=" d-flex justify-content-center fw-bold ">
                                                                    <div class="col-lg-3 col-sm-3 col-3 text-center">
                                                                        <img
                                                                            src={
                                                                                notification
                                                                                    .data
                                                                                    .user_photo
                                                                            }
                                                                            width={
                                                                                70
                                                                            }
                                                                            height={
                                                                                70
                                                                            }
                                                                            class=" rounded-circle border border-black"
                                                                        />
                                                                    </div>
                                                                    <div class="col-lg-8 col-sm-8 col-8">
                                                                        <strong>
                                                                            {
                                                                                notification
                                                                                    .data
                                                                                    .comment_create
                                                                            }
                                                                        </strong>
                                                                        <div>
                                                                            {
                                                                                notification
                                                                                    .data
                                                                                    .content
                                                                            }
                                                                        </div>
                                                                        <small class="fw-bold font-color">
                                                                            {
                                                                                notification.timeago
                                                                            }{" "}
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                            </NavLink>
                                                        ) : (
                                                            <NavLink
                                                                className={
                                                                    "text-black"
                                                                }
                                                                to={"/about"}
                                                            >
                                                                <div class="row d-flex justify-content-center fw-bold ">
                                                                    <div class="col-lg-3 col-sm-3 col-3 text-center">
                                                                        <img
                                                                            src={
                                                                                notification
                                                                                    .data
                                                                                    .user_photo
                                                                            }
                                                                            width={
                                                                                70
                                                                            }
                                                                            height={
                                                                                70
                                                                            }
                                                                            class=" rounded-circle border border-black"
                                                                        />
                                                                    </div>
                                                                    <div class="col-lg-8 col-sm-8 col-8">
                                                                        <strong>
                                                                            {
                                                                                notification
                                                                                    .data
                                                                                    .comment_create
                                                                            }
                                                                        </strong>
                                                                        <div>
                                                                            {
                                                                                notification
                                                                                    .data
                                                                                    .content
                                                                            }
                                                                        </div>
                                                                        <small class="fw-bold font-color">
                                                                            {
                                                                                notification.timeago
                                                                            }{" "}
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                            </NavLink>
                                                        )}
                                                    </li>
                                                )
                                            )}

                                        <li className="footer bg-dark text-center">
                                            <a href="#" className="text-light">
                                                View All
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <div class="d-flex justify-content-around align-items-center">
                        {islogined ? (
                            <>
                                <NavLink to="/profile">
                                    {/* <i class="bi bi-person-fill"></i>*/}
                                    {user && (
                                        <img
                                            src={user.photo_user}
                                            className="rounded-circle userPhoto"
                                            
                                        />
                                    )}
                                </NavLink>
                                {user && <p className="   fw-bold">{user.name}</p>}

                                {role === "Company" ? (
                                    <NavLink
                                        to="/dashbord"
                                        class="btn btn-primary dashbord ml-5 "
                                    >
                                        {" "}
                                        Dashbord
                                    </NavLink>
                                ) : (
                                    <div></div>
                                )}
                                <button type="button" class="btn btn-outline-danger" onClick={out} > Logout</button>

                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className=" fw-bold border-end border-primary px-2 "
                                >
                                    {" "}
                                    {translates.Login}
                                </NavLink>
                                <NavLink to="/role" className="fw-bold">
                                    {" "}
                                    {translates.Register}
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
