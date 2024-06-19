import React, { useContext, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Logo from "../../../public/logo1.png";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Outlet,
    NavLink,
} from "react-router-dom";
import { Ri24HoursLine } from "react-icons/ri";
import { MdCarCrash } from "react-icons/md";
import { BiSolidCarMechanic } from "react-icons/bi";
import { UserContext } from "../Context/User";
import { TranslateContext } from "./../Context/Translate";
import '../../css/DialogStyle/sidebar.css'

function Sidebar() {
    const { translates } = useContext(TranslateContext);
    const [isListOpen, setIsListOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleList = () => {
        setIsListOpen(!isListOpen);
    };

    const closeList = () => {
        setIsListOpen(false);
        setMenuOpen(false); // إغلاق القائمة الرئيسية أيضًا عند تحديد عنصر
    };

    return (
        <div className="bg-white sidebar p-1 sidebarMain">
           <div className="header-container bg-white">
    <div className="hamburger fs-4 bg-gray text-dark" onClick={toggleMenu}>
        ☰
    </div> 
    <h2 className="fs-5 fw-bold text-primary pt-4 p-3 text-center">
        Palestine cars
    </h2>
</div>

            <div style={{ width: '260px' }}  class="list-group-container" className={`list-group-container ${menuOpen ? 'show' : ''}`}>
                <hr className="text-dark" />

                <NavLink
                    to={"HomeDashbord"}
                    className="main-btn list-group-item list-group-item-action py-2 px-1"
                    onClick={closeList}
                    style={{ width: '260px' }} 
                >
                    <i className="bi bi-speedometer2 fs-4 me-2"></i>
                    <span className="fs-5">{translates.Dashbord}</span>
                </NavLink>

                <NavLink
                    to={"VehiclesDashbord"}
                    className="main-btn list-group-item list-group-item-action py-2 d-flex justify-between align-items-center px-1"
                    onClick={toggleList}
                    style={{ width: '260px' }} 
                >
                    <div>
                        <i className="bi bi-car-front fs-4 me-2"></i>
                        <span className="fs-5">{translates.Vehicles}</span>
                    </div>
                    <div className="text-end">
                        {!isListOpen ? (
                            <i className="bi bi-caret-down text-end"></i>
                        ) : (
                            <i className="bi bi-caret-left text-end"></i>
                        )}
                    </div>
                </NavLink>

                {isListOpen && (
                    <nav className="pt-2 pb-2 d-flex flex-column gap-2">
                        <NavLink
                            to={"addvehical"}
                            className="toggle-btn list-group-item list-group-item-action py-1 border d-flex flex-wrap align-items-center px-1"
                            onClick={closeList}
                            style={{ width: '260px' }} 
                        >
                            <i className="bi bi-plus fs-3 me-1"></i>
                            <span>{translates.AddVehicles}</span>
                        </NavLink>
                        <NavLink
                            to={"rented"}
                            className="toggle-btn list-group-item list-group-item-action py-3 border d-flex flex-wrap align-items-center gap-2 px-1"
                            onClick={closeList}
                            style={{ width: '260px' }} 
                        >
                            <MdCarCrash size={20} />
                            <span>{translates.RentedVehicles}</span>
                        </NavLink>
                        <NavLink
                            to={"maintend"}
                            className="toggle-btn list-group-item list-group-item-action py-3 border d-flex flex-wrap align-items-center gap-2 px-1"
                            onClick={closeList}
                            style={{ width: '260px' }} 
                        >
                            <BiSolidCarMechanic size={20} />
                            <span>{translates.maintainedvehicles}</span>
                        </NavLink>
                    </nav>
                )}

                <NavLink
                    to={"AllWorkingHours"}
                    className="main-btn list-group-item list-group-item-action py-2 d-flex flex-wrap gap-1 align-items-center  px-1 "
                    style={{ width: '260px' }} 
                    onClick={closeList}
                >
                    <Ri24HoursLine size={25} />
                    <span className="fs-5">{translates.WorkingHours}</span>
                </NavLink>

                <NavLink
                    to={"EmployeeDashbord"}
                    className="main-btn list-group-item list-group-item-action py-2"
                    onClick={closeList}
                >
                    <i className="bi bi-people fs-4 me-2"></i>
                    <span className="fs-5">{translates.Employees}</span>
                </NavLink>

                <NavLink
                    to={"RenterDashbord"}
                    className="main-btn list-group-item list-group-item-action py-2"
                    onClick={closeList}
                >
                    <i className="bi bi-people fs-4 me-2"></i>
                    <span className="fs-5">{translates.Renters}</span>
                </NavLink>

                <NavLink
                    to={"ChatsDashbord"}
                    className="main-btn list-group-item list-group-item-action py-2"
                    onClick={closeList}
                >
                    <i className="bi bi-chat-left-text fs-4 me-2"></i>
                    <span className="fs-5">{translates.Chats}</span>
                </NavLink>

                <NavLink
                    to={"ExpensesDashbord"}
                    className="main-btn list-group-item list-group-item-action py-2"
                    onClick={closeList}
                >
                    <i className="bi bi-cash-coin fs-4 me-2"></i>
                    <span className="fs-5">{translates.Expenses}</span>
                </NavLink>

                <NavLink
                    to={"LocationDashbord"}
                    className="main-btn list-group-item list-group-item-action py-2"
                    onClick={closeList}
                >
                    <i className="bi bi-geo-alt fs-4 me-2"></i>
                    <span className="fs-5">{translates.Locations}</span>
                </NavLink>

                <NavLink
                    to={"DiscountsDashbord"}
                    className="main-btn list-group-item list-group-item-action py-2"
                    onClick={closeList}
                >
                    <i className="bi bi-percent fs-4 me-2"></i>
                    <span className="fs-5">{translates.Discounts}</span>
                </NavLink>

                <NavLink
                    to={"NotesDashboard"}
                    className="main-btn list-group-item list-group-item-action py-2"
                    onClick={closeList}
                >
                    <i className="bi bi-journal-medical fs-4 me-2"></i>
                    <span className="fs-5">{translates.Notes}</span>
                </NavLink>
            </div>
        </div>
    );
}

export default Sidebar;

