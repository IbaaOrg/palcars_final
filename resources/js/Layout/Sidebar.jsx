import React, { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logo from '../../../public/logo1.png';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, NavLink } from "react-router-dom";
import { Ri24HoursLine } from "react-icons/ri";
import { MdCarCrash } from "react-icons/md";
import { BiSolidCarMechanic } from "react-icons/bi";

function Sidebar() {

    const [isListOpen, setIsListOpen] = useState(false);

    const toggleList = () => {
        setIsListOpen(!isListOpen);
    };
  return (
    <div className='bg-white sidebar p-2 sidebarMain'>

        <hr className='text-dark'/>
        <div className='list-group list-group-flush pt-2'>

            <NavLink to={"HomeDashbord"} className='main-btn list-group-item list-group-item-action py-2'>
                  <i class="bi bi-speedometer2 fs-4 me-2"></i>
                <span className='fs-5'>Dashbord</span>
            </NavLink>
            <br/>
             
              <NavLink to={"VehiclesDashbord"} className='main-btn  list-group-item list-group-item-action py-2 d-flex justify-between ' onClick={toggleList}>
              <div> 
                  <i className="bi bi-car-front  fs-4 me-2"></i>
                  <span className='fs-5'>Vehicles</span>
               </div>

              <div className=' text-end'>   {!isListOpen ? (
                          <i class="bi bi-caret-down text-end"></i>
                      ):(

                              <i class="bi bi-caret-left text-end"></i>
                      )}
               </div>

                   
              
              </NavLink>
              {isListOpen && (
                  <nav className='pt-2 pb-2 d-flex flex-column gap-2'>
                      <NavLink to={"addvehical"} className='toggle-btn list-group-item list-group-item-action py-1 border'>
                          <i className="bi bi-plus  fs-3 me-1"></i>
                      <span className=''>Add Vehicles</span>
                  </NavLink>
                  <NavLink to={"rented"} className='toggle-btn list-group-item list-group-item-action py-3 border d-flex align-items-center gap-2'>
                  <MdCarCrash size={20} className=''/>
                      <span className=''>Rented Vehicles</span>
                  </NavLink>
                  <NavLink to={"maintend"} className='toggle-btn list-group-item list-group-item-action py-3 border d-flex align-items-center gap-2'>
                  <BiSolidCarMechanic size={20}/>
                      <span className=''>maintained vehicles</span>
                  </NavLink>

                  
              </nav>
              )}
              <NavLink  to={"AllWorkingHours"} className='main-btn  list-group-item list-group-item-action py-2 d-flex gap-1 align-items-center'>
              <Ri24HoursLine  size={25}/>
                  <span className='fs-5'>Working Hours</span>
              </NavLink>
           
              <NavLink  to={"EmployeeDashbord"} className='main-btn  list-group-item list-group-item-action py-2'>
                  <i className='bi bi-people fs-4 me-2'></i>
                  <span className='fs-5'>Employees</span>
              </NavLink>
              <NavLink  to={"RenterDashbord"} className='main-btn  list-group-item list-group-item-action py-2'>
                  <i className='bi bi-people fs-4 me-2'></i>
                  <span className='fs-5'>Renters</span>
              </NavLink>
              <NavLink  to={"ChatsDashbord"} className='main-btn  list-group-item list-group-item-action py-2'>
                  <i class="bi bi-chat-left-text fs-4 me-2"></i>

                  <span className='fs-5'>Chats</span>
              </NavLink>
        
              <NavLink  to={"ExpensesDashbord"} className='main-btn  list-group-item list-group-item-action py-2'>
                  <i className='bi bi-cash-coin fs-4 me-2'></i>
                  <span className='fs-5'>Expenses</span>
              </NavLink>
             {/*  <NavLink to={"ExpensesDashbord"} className='main-btn  list-group-item list-group-item-action py-2'>
                  <i className='bi bi-cash-coin fs-4 me-2'></i>
                  <span className='fs-5'>Deals</span>
              </NavLink> */}
              <NavLink to={"LocationDashbord"} className='main-btn  list-group-item list-group-item-action py-2'>
                  <i class="bi bi-geo-alt fs-4 me-2"></i>
                  <span className='fs-5'>Locations</span>
              </NavLink>
              <NavLink to={"DiscountsDashbord"} className='main-btn  list-group-item list-group-item-action py-2'>
                  <i class="bi bi-percent fs-4 me-2"></i>
                  <span className='fs-5'>Discounts</span>
              </NavLink>
              <NavLink to={"NotesDashboard"} className='main-btn  list-group-item list-group-item-action py-2'>
                    <i class="bi bi-journal-medical  fs-4 me-2"></i>
                    <span className='fs-5'>Notes</span>
              </NavLink>
        </div>
    </div>
)
}

export default Sidebar
