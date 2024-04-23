import React, { useState, useEffect, useRef } from 'react';
import logo from '../../../../public/logo1.png';
import '../../../css/HeaderStyle/Header.css';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, NavLink } from "react-router-dom";
import Contact from './../../Pages/ContactUs/Contact';
import axios from 'axios';
import { useContext } from 'react';
import { TranslateContext } from '../../Context/Translate';
import { FaBars, FaTimes } from "react-icons/fa";

function NaveBar() {
    const {changeLanguage,translates}=useContext(TranslateContext);
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );
    };
    return (
        <header>
            <nav >

                <NavLink to="/" className={({ isActive }) => isActive ? "active" : "navlink"}>{translates.Home}</NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? " active" : "navlink"}>{translates.About}</NavLink>
                <NavLink to="/cars" className={({ isActive }) => isActive ? " active" : " navlink"}>{translates.Cars}</NavLink>
                <NavLink to="/discounts" className={({ isActive }) => isActive ? " active" : " navlink"}>{translates.Deals}</NavLink>
                <NavLink to="/contact" className={({ isActive }) => isActive ? "p active" : "navlink"}>{translates.ContactUs}</NavLink>
                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>

            </nav>
            <button
                className="nav-btn"
                onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default NaveBar;