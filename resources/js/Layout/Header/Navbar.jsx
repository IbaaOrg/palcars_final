import React, { useState, useEffect } from 'react';
import logo from '../../../../public/logo1.png';
import '../../../css/HeaderStyle/Header.css';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, NavLink } from "react-router-dom";
import Contact from './../../Pages/ContactUs/Contact';
import axios from 'axios';
import { useContext } from 'react';
import { TranslateContext } from '../../Context/Translate';

function NaveBar() {
    const {changeLanguage,translates}=useContext(TranslateContext);

/*  style={({ isActive }) => ({
                                                                        color: isActive ? '#fff' : '#000',
                                                                        backgroundColor: isActive ? '#007bff' : 'transparent',
                                                                    })} */
    return (
                    <nav >

                        <NavLink to="/" className={({ isActive }) => isActive ? "active" : "navlink"}>{translates.Home}</NavLink>
                        <NavLink to="/about" className={({ isActive }) => isActive ? " active" : "navlink"}>{translates.About}</NavLink>
                        <NavLink to="/cars" className={({ isActive }) => isActive ? " active" : " navlink"}>{translates.Cars}</NavLink>
                        <NavLink to="/discounts" className={({ isActive }) => isActive ? " active" : " navlink"}>{translates.Deals}</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? "p active" : "navlink"}>{translates.ContactUs}</NavLink>


                    </nav>
    );
}

export default NaveBar;