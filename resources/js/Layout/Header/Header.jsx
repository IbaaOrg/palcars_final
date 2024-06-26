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
import logout from "./../../NetWorking/logout";

import { data } from "autoprefixer";
import { TranslateContext } from "../../Context/Translate";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { UserContext } from "../../Context/User";
import { Nav } from "react-bootstrap";

function Header({ islogined }) {
    const { changeLanguage, translates } = useContext(TranslateContext);
    const navigator = useNavigate();

    const { user, userToken, setUserToken } = useContext(UserContext);
    const [countUnreadNotification, setCountUnreadNotification] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const getCountNotification = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get("/countNotifications", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { unread_count } = await response.data.data; // Assuming response structure is { data: { unread_count: ... } }
            if (unread_count > 0) setCountUnreadNotification(unread_count);
            else setCountUnreadNotification("");
        } catch (error) {}
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
    };
    useEffect(() => {
        getCountNotification();
        getNotifications();
    }, [userToken]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            getCountNotification();
            getNotifications();
        }, 300000);

        return () => clearInterval(intervalId);
    }, [countUnreadNotification]);

    const out = async () => {
        await logout((out) => {
            setUserToken(null);
            navigator("/");
        });
    };

    return (
        <div className="d-flex  justify-content-around">
            <nav className="navbar bg-body-tertiary  ">
                <div className="container-fluid">
                    <div className={`nav-logo d-flex align-middle`}>
                        <Link href="/">
                            <img
                                src={logo}
                                alt="logo"
                                className="nav-logo-img"
                            />
                        </Link>
                    </div>

                    {/* search */}
                    {userToken && user.role !== "Renter" ? "" : <NaveBar />}

                    <div className="hstack gap-1">
                        <div className="nav-item dropdown d-flex align-items-center justify-content-center translate">
                            <Link
                                className="nav-link "
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    width="40"
                                    height="40"
                                    src="https://img.icons8.com/small/32/english-to-arabic.png"
                                    alt="english-to-arabic"
                                />
                            </Link>
                            <ul className="dropdown-menu">
                                <li>
                                    <span
                                        className="dropdown-item"
                                        data-lang="ar"
                                        onClick={(e) => Translate(e)}
                                    >
                                        العربية
                                    </span>
                                </li>
                                <li>
                                    <span
                                        className="dropdown-item"
                                        data-lang="en"
                                        onClick={(e) => Translate(e)}
                                    >
                                        English
                                    </span>
                                </li>
                            </ul>
                        </div>
                        {userToken && user && user.role === "Renter" && (
                            <NavLink
                                to="FavoriteList"
                                className="d-flex  d-flex align-items-center justify-content-center border rounded-circle p-2"
                            >
                                <FaHeart size={20} className="text-black" />
                            </NavLink>
                        )}
                        <div className=" d-flex mx-2 ">
                            {userToken && user && (
                                <div className="nav-item dropdown">
                                    <Link
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
                                                {" "}
                                            </span>
                                        )}
                                    </Link>
                                    <ul
                                        className="dropdown-menu"
                                        aria-labelledby="navbarDropdown"
                                    >
                                        <li className="head text-light bg-dark">
                                            <div className="row">
                                                <div className="col-lg-12 col-sm-12 col-12">
                                                    <span>
                                                        Notifications
                                                        {countUnreadNotification &&
                                                            countUnreadNotification}
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
                                                        className="notification-box"
                                                        key={index}
                                                    >
                                                        {
                                                            <NavLink
                                                                className="text-black"
                                                                to={
                                                                    notification.data.content.includes(
                                                                        "car"
                                                                    )
                                                                        ? `/cars/${notification.data.comment_id}`
                                                                        : notification.data.content.includes(
                                                                              "booking"
                                                                          )
                                                                        ? `/profile/booking`
                                                                        : notification.data.content.includes(
                                                                              "note"
                                                                          )
                                                                        ? `/profile/Notes`
                                                                        : `/profile/Messages`
                                                                }
                                                            >
                                                                <div className="d-flex justify-content-center fw-bold">
                                                                    <div className="col-lg-3 col-sm-3 col-3 text-center">
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
                                                                            className="rounded-circle border border-black"
                                                                        />
                                                                    </div>
                                                                    <div className="col-lg-8 col-sm-8 col-8">
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
                                                                        <small className="fw-bold font-color">
                                                                            {
                                                                                notification.timeago
                                                                            }
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                            </NavLink>
                                                        }
                                                    </li>
                                                )
                                            )}

                                        <li className="footer bg-dark text-center">
                                            <Link
                                                href="#"
                                                className="text-light"
                                            >
                                                View All
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="d-flex justify-content-around align-items-center">
                        {userToken ? (
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
                                <div className="nav-item dropdown d-flex align-items-center justify-content-center translate">
                                    <Link
                                        className="nav-link text-black text-capitalize d-flex align-items-center"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {user && user.name}
                                        <IoIosArrowDown
                                            size={30}
                                            className="px-2"
                                        />
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <span
                                                className="dropdown-item"
                                                data-lang="ar"
                                                onClick={(e) =>
                                                    navigator("/profile")
                                                }
                                            >
                                                {translates.MyProfile}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                {user.role === "Company" ? (
                                    <Link
                                        to="/dashbord"
                                        className=" dashbord ml-5 fw-bold"
                                    >
                                        {" "}
                                        {translates.Dashbord}
                                    </Link>
                                ) : (
                                    <div></div>
                                )}
                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    onClick={out}
                                >
                                    {translates.LogOut}
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className=" fw-bold border-end border-primary px-2  fontSizeNav"
                                >
                                    {translates.Login}
                                </NavLink>
                                <NavLink
                                    to="/role"
                                    className="fw-bold fontSizeNav"
                                >
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
